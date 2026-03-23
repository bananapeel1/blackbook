"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface Notification {
  id: string;
  type: string;
  title: string;
  body: string | null;
  data: Record<string, string> | null;
  read_at: string | null;
  created_at: string;
}

function formatTimeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

const typeIcon: Record<string, string> = {
  new_quote: "request_quote",
  quote_accepted: "check_circle",
  quote_declined: "cancel",
  new_message: "chat",
  new_request: "receipt_long",
  request_update: "update",
};

function resolveNotificationLink(n: Notification): string | null {
  const data = n.data;
  if (!data) return null;
  switch (n.type) {
    case "new_quote":
    case "request_update":
      return data.request_id ? `/quotes/${data.request_id}` : null;
    case "quote_accepted":
      return data.conversation_id ? `/messages` : `/dashboard/provider`;
    case "quote_declined":
      return `/dashboard/provider`;
    case "new_message":
      return `/messages`;
    case "new_request":
      return data.request_id ? `/dashboard/provider/request/${data.request_id}` : `/dashboard/provider`;
    default:
      return null;
  }
}

function NotificationItem({
  notification: n,
  onClose,
}: {
  notification: Notification;
  onClose: () => void;
}) {
  const link = resolveNotificationLink(n);

  const content = (
    <>
      <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center shrink-0 mt-0.5">
        <span className="material-symbols-outlined text-primary text-base">
          {typeIcon[n.type] ?? "info"}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm leading-snug ${
            !n.read_at
              ? "font-semibold text-on-surface"
              : "text-on-surface-variant"
          }`}
        >
          {n.title}
        </p>
        {n.body && (
          <p className="text-xs text-on-surface-variant truncate mt-0.5">
            {n.body}
          </p>
        )}
        <p className="text-[10px] text-outline mt-1">
          {formatTimeAgo(n.created_at)}
        </p>
      </div>
      {!n.read_at && (
        <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
      )}
    </>
  );

  const cls = `flex gap-3 px-4 py-3 hover:bg-surface-container-low transition-colors cursor-pointer ${
    !n.read_at ? "bg-primary-container/10" : ""
  }`;

  if (link) {
    return (
      <Link href={link} onClick={onClose} className={cls}>
        {content}
      </Link>
    );
  }

  return <div className={cls}>{content}</div>;
}

export default function NotificationBell({
  initialCount,
  userId,
}: {
  initialCount: number;
  userId: string;
}) {
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Real-time subscription for new notifications
  useEffect(() => {
    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload: { new: Notification }) => {
          setCount((prev) => prev + 1);
          setNotifications((prev) => [payload.new as Notification, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, userId]);

  // Load notifications when opened
  const loadNotifications = useCallback(async () => {
    if (loaded) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase as any)
      .from("notifications")
      .select("id, type, title, body, data, read_at, created_at")
      .order("created_at", { ascending: false })
      .limit(20);
    setNotifications((data as Notification[]) ?? []);
    setLoaded(true);
  }, [loaded, supabase]);

  async function markAllRead() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from("notifications")
      .update({ read_at: new Date().toISOString() })
      .is("read_at", null);
    setCount(0);
    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        read_at: n.read_at ?? new Date().toISOString(),
      }))
    );
  }

  function toggle() {
    setOpen(!open);
    if (!open) loadNotifications();
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={toggle}
        className="relative p-2 hover:bg-slate-100 rounded-full transition-colors"
      >
        <span className="material-symbols-outlined text-slate-600 text-xl">
          notifications
        </span>
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-error text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-80 md:w-96 bg-surface-container-lowest rounded-xl shadow-2xl border border-outline-variant/10 z-[100] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant/10">
            <h3 className="text-sm font-bold text-on-surface">Notifications</h3>
            {count > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs text-primary font-semibold hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {!loaded ? (
              <div className="py-8 text-center">
                <span className="material-symbols-outlined animate-spin text-outline text-2xl">
                  progress_activity
                </span>
              </div>
            ) : notifications.length === 0 ? (
              <div className="py-8 text-center">
                <span className="material-symbols-outlined text-outline text-3xl mb-2 block">
                  notifications_none
                </span>
                <p className="text-sm text-on-surface-variant">
                  No notifications yet
                </p>
              </div>
            ) : (
              notifications.map((n) => (
                <NotificationItem key={n.id} notification={n} onClose={() => setOpen(false)} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
