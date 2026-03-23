"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  dispatchCard?: {
    serviceType: string;
    location: string;
    urgency: string;
    deadline: string;
  };
  leads?: Array<{
    name: string;
    rating: string;
    badge: string;
    icon: string;
  }>;
}

const initialMessages: Message[] = [];

const suggestions = [
  { icon: "build", label: "Repair my engine" },
  { icon: "restaurant", label: "Book a private chef" },
  { icon: "shopping_cart", label: "Provisioning for guests" },
];

export default function ConciergeOverlay({
  onClose,
}: {
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I've initiated a priority search based on your request. Let me find the best available providers in your area.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        dispatchCard: {
          serviceType: "Service Request",
          location: "Your current port",
          urgency: "Standard",
          deadline: "As soon as available",
        },
        leads: [
          {
            name: "Azure Technical Marine",
            rating: "4.9",
            badge: "Verified Specialist",
            icon: "engineering",
          },
          {
            name: "Riviera Marine Services",
            rating: "4.8",
            badge: "Fast Responder",
            icon: "anchor",
          },
        ],
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1500);
  };

  const handleSuggestion = (label: string) => {
    setInput(label);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative mt-auto bg-surface rounded-t-3xl shadow-2xl flex flex-col max-h-[85dvh] md:max-w-lg md:ml-auto md:mr-6 md:mb-6 md:rounded-3xl md:max-h-[70dvh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span
                className="material-symbols-outlined text-[16px] text-white"
                style={{
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                auto_awesome
              </span>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-headline)] italic text-sm text-primary font-semibold">
                AI Concierge
              </h3>
              <span className="text-[10px] text-on-surface-variant">
                Maritime Intelligence
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-container-high rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-on-surface-variant">
              close
            </span>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-[family-name:var(--font-headline)] tracking-tight text-primary mb-2">
                How can I assist your voyage?
              </h2>
              <p className="text-on-surface-variant text-sm mb-8">
                Your private maritime intelligence and dispatch agent.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestions.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => handleSuggestion(s.label)}
                    className="bg-surface-container-lowest border border-outline-variant px-4 py-2 rounded-full text-xs font-medium text-on-surface hover:bg-secondary-fixed transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {s.icon}
                    </span>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.role === "user" ? (
                <div className="flex flex-col items-end">
                  <div className="max-w-[85%] bg-surface-container-low text-on-surface-variant px-5 py-4 rounded-2xl rounded-tr-none shadow-sm">
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-tighter mt-2 text-outline">
                    Sent {msg.timestamp}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-[14px] text-white"
                        style={{
                          fontVariationSettings: "'FILL' 1",
                        }}
                      >
                        auto_awesome
                      </span>
                    </div>
                    <span className="font-[family-name:var(--font-headline)] italic text-sm text-primary">
                      AI Concierge
                    </span>
                  </div>
                  <div className="max-w-[90%] bg-primary text-white px-6 py-5 rounded-3xl rounded-tl-none shadow-lg space-y-4">
                    <p className="text-sm leading-relaxed">{msg.content}</p>

                    {msg.dispatchCard && (
                      <div className="bg-primary-container border border-on-primary-container/20 p-4 rounded-xl space-y-3">
                        <div className="flex justify-between items-center border-b border-on-primary-container/10 pb-2">
                          <span className="text-[10px] tracking-widest uppercase text-on-primary-container">
                            Drafting Dispatch Request
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim animate-pulse" />
                            <span className="text-[10px] text-tertiary-fixed-dim">
                              Processing
                            </span>
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[9px] uppercase font-bold text-on-primary-container/60 block">
                              Service Type
                            </label>
                            <p className="text-sm font-medium">
                              {msg.dispatchCard.serviceType}
                            </p>
                          </div>
                          <div>
                            <label className="text-[9px] uppercase font-bold text-on-primary-container/60 block">
                              Location
                            </label>
                            <p className="text-sm font-medium">
                              {msg.dispatchCard.location}
                            </p>
                          </div>
                          <div>
                            <label className="text-[9px] uppercase font-bold text-on-primary-container/60 block">
                              Urgency
                            </label>
                            <span className="text-[10px] bg-error/20 text-error px-2 py-0.5 rounded">
                              {msg.dispatchCard.urgency}
                            </span>
                          </div>
                          <div>
                            <label className="text-[9px] uppercase font-bold text-on-primary-container/60 block">
                              Deadline
                            </label>
                            <p className="text-sm font-medium">
                              {msg.dispatchCard.deadline}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {msg.leads && (
                      <div className="space-y-2">
                        <p className="text-sm text-on-primary-container">
                          Available providers:
                        </p>
                        {msg.leads.map((lead) => (
                          <div
                            key={lead.name}
                            className="flex items-center justify-between bg-surface-container-lowest/10 p-3 rounded-lg border border-white/5 hover:bg-surface-container-lowest/20 transition-all cursor-pointer group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-white">
                                  {lead.icon}
                                </span>
                              </div>
                              <div>
                                <p className="text-xs font-bold">
                                  {lead.name}
                                </p>
                                <p className="text-[10px] text-white/60">
                                  {lead.rating} ★ &bull; {lead.badge}
                                </p>
                              </div>
                            </div>
                            <span className="material-symbols-outlined text-sm text-white/40 group-hover:text-white transition-colors">
                              arrow_forward_ios
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="px-4 pb-6 pt-2">
          <div className="glass-effect rounded-2xl p-2 shadow-xl border border-white/20 flex items-end gap-2">
            <button className="p-3 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">add_circle</span>
            </button>
            <div className="flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="w-full bg-transparent border-none focus:ring-0 text-sm py-3 resize-none max-h-32 outline-none"
                placeholder="Ask the Concierge for anything..."
                rows={1}
              />
            </div>
            <button
              onClick={handleSend}
              className="bg-primary text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                send
              </span>
            </button>
          </div>
          <p className="text-[10px] text-center mt-3 text-outline uppercase tracking-[0.2em]">
            Verified Maritime Intelligence powered by Dockside AI
          </p>
        </div>
      </div>
    </div>
  );
}
