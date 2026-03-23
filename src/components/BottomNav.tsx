"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface BottomNavUser {
  role: "boat_owner" | "service_provider" | null;
  unreadCount: number;
}

const ownerItems = [
  { href: "/", icon: "anchor", label: "Home" },
  { href: "/discover", icon: "explore", label: "Discover" },
  { href: "/request", icon: "add_circle", label: "Request" },
  { href: "/messages", icon: "chat", label: "Messages" },
  { href: "/dashboard", icon: "dashboard", label: "Dashboard" },
];

const providerItems = [
  { href: "/", icon: "anchor", label: "Home" },
  { href: "/discover", icon: "explore", label: "Discover" },
  { href: "/dashboard/provider", icon: "dashboard", label: "Inbox" },
  { href: "/messages", icon: "chat", label: "Messages" },
  { href: "/dashboard/provider", icon: "settings", label: "Settings" },
];

const guestItems = [
  { href: "/", icon: "anchor", label: "Home" },
  { href: "/discover", icon: "explore", label: "Discover" },
  { href: "/services", icon: "sailing", label: "Services" },
  { href: "/join", icon: "handshake", label: "Join" },
  { href: "/login", icon: "person", label: "Sign In" },
];

export default function BottomNav({ user }: { user?: BottomNavUser | null }) {
  const pathname = usePathname();

  const navItems = user
    ? user.role === "service_provider"
      ? providerItems
      : ownerItems
    : guestItems;

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 pb-safe bg-slate-50/90 backdrop-blur-2xl shadow-[0_-4px_20px_rgba(0,33,71,0.08)]">
      <div className="flex justify-around items-center h-20 px-2 w-full">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              className={`relative flex flex-col items-center justify-center px-3 py-1 transition-all duration-300 ${
                isActive
                  ? "text-slate-900 bg-slate-200/50 rounded-xl"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <span className="material-symbols-outlined mb-1">
                {item.icon}
              </span>
              <span className="font-sans text-[10px] font-semibold uppercase tracking-wider">
                {item.label}
              </span>
              {item.href === "/messages" &&
                user &&
                user.unreadCount > 0 && (
                  <span className="absolute -top-0.5 right-0 w-4 h-4 bg-error text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                    {user.unreadCount > 9 ? "9+" : user.unreadCount}
                  </span>
                )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
