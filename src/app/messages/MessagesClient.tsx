"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface ConversationPreview {
  id: string;
  requestId: string | null;
  lastMessageAt: string;
  otherUser: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
  lastMessage: {
    content: string;
    createdAt: string;
    isOwn: boolean;
    unread: boolean;
  } | null;
}

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  read_at: string | null;
}

function formatTimeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

function formatMessageTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MessagesClient({
  userId,
  userRole,
  conversations: initialConversations,
}: {
  userId: string;
  userRole: string;
  conversations: ConversationPreview[];
}) {
  const supabase = createClient() as any;
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConvId, setActiveConvId] = useState<string | null>(
    initialConversations[0]?.id ?? null
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [showMobileList, setShowMobileList] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find((c) => c.id === activeConvId);

  // Load messages for active conversation
  const loadMessages = useCallback(
    async (convId: string) => {
      setLoadingMessages(true);
      const { data } = await supabase
        .from("messages")
        .select("id, content, sender_id, created_at, read_at")
        .eq("conversation_id", convId)
        .order("created_at", { ascending: true })
        .limit(100);

      setMessages(data ?? []);
      setLoadingMessages(false);

      // Mark unread messages as read
      await supabase
        .from("messages")
        .update({ read_at: new Date().toISOString() })
        .eq("conversation_id", convId)
        .neq("sender_id", userId)
        .is("read_at", null);
    },
    [supabase, userId]
  );

  // Load messages when active conversation changes
  useEffect(() => {
    if (activeConvId) {
      loadMessages(activeConvId);
    }
  }, [activeConvId, loadMessages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Subscribe to real-time messages
  useEffect(() => {
    if (!activeConvId) return;

    const channel = supabase
      .channel(`messages:${activeConvId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${activeConvId}`,
        },
        (payload: any) => {
          const newMsg = payload.new as Message;
          setMessages((prev) => {
            if (prev.some((m) => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });

          // Mark as read if not from us
          if (newMsg.sender_id !== userId) {
            supabase
              .from("messages")
              .update({ read_at: new Date().toISOString() })
              .eq("id", newMsg.id)
              .then(() => {});
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeConvId, supabase, userId]);

  // Send a message
  async function sendMessage() {
    if (!newMessage.trim() || !activeConvId) return;

    const content = newMessage.trim();
    setNewMessage("");

    // Optimistic update
    const optimisticMsg: Message = {
      id: `temp-${Date.now()}`,
      content,
      sender_id: userId,
      created_at: new Date().toISOString(),
      read_at: null,
    };
    setMessages((prev) => [...prev, optimisticMsg]);

    const { data, error } = await supabase
      .from("messages")
      .insert({
        conversation_id: activeConvId,
        sender_id: userId,
        content,
      })
      .select()
      .single();

    if (error) {
      // Remove optimistic message on error
      setMessages((prev) => prev.filter((m) => m.id !== optimisticMsg.id));
      return;
    }

    // Replace optimistic with real
    setMessages((prev) =>
      prev.map((m) => (m.id === optimisticMsg.id ? data : m))
    );

    // Update conversation last message in sidebar
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId
          ? {
              ...c,
              lastMessageAt: data.created_at,
              lastMessage: {
                content: data.content,
                createdAt: data.created_at,
                isOwn: true,
                unread: false,
              },
            }
          : c
      )
    );

    // Update last_message_at on conversation
    await supabase
      .from("conversations")
      .update({ last_message_at: data.created_at })
      .eq("id", activeConvId);
  }

  function selectConversation(convId: string) {
    setActiveConvId(convId);
    setShowMobileList(false);
    // Clear unread indicator
    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId && c.lastMessage
          ? { ...c, lastMessage: { ...c.lastMessage, unread: false } }
          : c
      )
    );
  }

  // Empty state
  if (conversations.length === 0) {
    return (
      <main className="pt-16 pb-24 md:pb-0 flex items-center justify-center min-h-[80vh]">
        <div className="text-center px-6">
          <div className="w-20 h-20 rounded-2xl bg-secondary-container flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-primary text-4xl">
              chat
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-primary mb-3">
            No Conversations Yet
          </h1>
          <p className="text-on-surface-variant text-sm max-w-sm mx-auto leading-relaxed">
            {userRole === "service_provider"
              ? "Conversations will appear here when you send quotes or message boat owners about their requests."
              : "Conversations will appear here when providers respond to your service requests."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-16 pb-24 md:pb-0 flex flex-col md:flex-row h-[calc(100dvh-64px)]">
      {/* Conversation List - Sidebar */}
      <aside
        className={`w-full md:w-80 lg:w-96 border-r border-outline-variant/10 bg-surface-container-low overflow-y-auto ${
          showMobileList ? "block" : "hidden md:block"
        }`}
      >
        <div className="p-6">
          <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold text-primary mb-4">
            Messages
          </h2>
        </div>
        <div className="space-y-1 px-2">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => selectConversation(conv.id)}
              className={`w-full p-4 rounded-xl flex gap-4 text-left transition-all ${
                conv.id === activeConvId
                  ? "bg-surface-container-lowest shadow-sm"
                  : "hover:bg-surface-container-high"
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-primary text-sm">
                  {conv.otherUser.avatarUrl ? "person" : "person"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4
                    className={`text-sm truncate ${
                      conv.lastMessage?.unread
                        ? "font-bold text-on-surface"
                        : "font-medium text-on-surface"
                    }`}
                  >
                    {conv.otherUser.name}
                  </h4>
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold shrink-0 ml-2">
                    {conv.lastMessage
                      ? formatTimeAgo(conv.lastMessage.createdAt)
                      : ""}
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant truncate">
                  {conv.lastMessage
                    ? `${conv.lastMessage.isOwn ? "You: " : ""}${conv.lastMessage.content}`
                    : "No messages yet"}
                </p>
              </div>
              {conv.lastMessage?.unread && (
                <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1 shrink-0" />
              )}
            </button>
          ))}
        </div>
      </aside>

      {/* Chat Thread */}
      <div
        className={`flex-1 flex flex-col bg-surface ${
          showMobileList ? "hidden md:flex" : "flex"
        }`}
      >
        {activeConv ? (
          <>
            {/* Thread Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/10 bg-surface-container-lowest">
              <div className="flex items-center gap-4">
                {/* Back button on mobile */}
                <button
                  onClick={() => setShowMobileList(true)}
                  className="md:hidden p-1"
                >
                  <span className="material-symbols-outlined text-on-surface-variant">
                    arrow_back
                  </span>
                </button>
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary text-sm">
                    person
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-primary">
                    {activeConv.otherUser.name}
                  </h3>
                  {activeConv.requestId && (
                    <p className="text-xs text-on-surface-variant">
                      Service Request
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
              {loadingMessages ? (
                <div className="flex items-center justify-center py-12">
                  <span className="material-symbols-outlined animate-spin text-primary text-2xl">
                    progress_activity
                  </span>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-on-surface-variant text-sm">
                    No messages yet. Start the conversation!
                  </p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isOwn = msg.sender_id === userId;
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[75%] ${
                          isOwn
                            ? "bg-primary text-white rounded-2xl rounded-tr-none"
                            : "bg-surface-container-low rounded-2xl rounded-tl-none"
                        } px-5 py-3 shadow-sm`}
                      >
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                        <p
                          className={`text-[10px] mt-1.5 ${
                            isOwn ? "text-white/50" : "text-outline"
                          }`}
                        >
                          {formatMessageTime(msg.created_at)}
                          {isOwn && msg.read_at && " · Read"}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-6 py-4 border-t border-outline-variant/10 bg-surface-container-lowest">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex items-end gap-3"
              >
                <div className="flex-1 bg-surface-container-low rounded-xl px-4 py-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 text-sm outline-none"
                    placeholder="Type a message..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-primary text-on-primary w-10 h-10 rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-40"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    send
                  </span>
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-on-surface-variant">Select a conversation</p>
          </div>
        )}
      </div>
    </main>
  );
}
