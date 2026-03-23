import NavWrapper from "@/components/NavWrapper";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import MessagesClient from "./MessagesClient";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default async function MessagesPage() {
  const supabase = (await createClient()) as any;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirect=/messages");

  // Get profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  // Get conversations
  const { data: conversations } = await supabase
    .from("conversations")
    .select("*")
    .or(`participant_1.eq.${user.id},participant_2.eq.${user.id}`)
    .order("last_message_at", { ascending: false });

  // Enrich conversations with other participant info and last message
  const enrichedConversations = await Promise.all(
    (conversations ?? []).map(async (conv: any) => {
      const otherUserId =
        conv.participant_1 === user.id
          ? conv.participant_2
          : conv.participant_1;

      const [profileRes, providerRes, lastMsgRes] = await Promise.all([
        supabase
          .from("profiles")
          .select("id, full_name, avatar_url")
          .eq("id", otherUserId)
          .single(),
        supabase
          .from("providers")
          .select("business_name, logo_url")
          .eq("user_id", otherUserId)
          .single(),
        supabase
          .from("messages")
          .select("content, created_at, sender_id, read_at")
          .eq("conversation_id", conv.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single(),
      ]);

      return {
        id: conv.id,
        requestId: conv.request_id,
        lastMessageAt: conv.last_message_at,
        otherUser: {
          id: otherUserId,
          name:
            providerRes.data?.business_name ??
            profileRes.data?.full_name ??
            "Unknown",
          avatarUrl: providerRes.data?.logo_url ?? profileRes.data?.avatar_url,
        },
        lastMessage: lastMsgRes.data
          ? {
              content: lastMsgRes.data.content,
              createdAt: lastMsgRes.data.created_at,
              isOwn: lastMsgRes.data.sender_id === user.id,
              unread:
                lastMsgRes.data.sender_id !== user.id &&
                !lastMsgRes.data.read_at,
            }
          : null,
      };
    })
  );

  return (
    <>
      <NavWrapper />
      <MessagesClient
        userId={user.id}
        userRole={profile?.role ?? "boat_owner"}
        conversations={enrichedConversations}
      />
    </>
  );
}
