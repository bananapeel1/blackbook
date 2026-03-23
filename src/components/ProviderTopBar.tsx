"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NotificationBell from "./NotificationBell";

export interface ProviderNavUser {
  id: string;
  fullName: string | null;
  businessName: string;
  unreadCount: number;
}

const providerLinks = [
  { href: "/dashboard/provider", label: "Inbox" },
  { href: "/messages", label: "Messages" },
  { href: "/dashboard/provider/analytics", label: "Analytics" },
  { href: "/dashboard/provider/settings", label: "Settings" },
];

export default function ProviderTopBar({
  user,
}: {
  user: ProviderNavUser;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/30 h-14 flex justify-between items-center px-5 transition-shadow duration-300 ${
        scrolled ? "shadow-lg shadow-black/20" : "shadow-sm"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <Link
          href="/dashboard/provider"
          className="flex items-center gap-2"
        >
          <span className="font-[family-name:var(--font-headline)] font-bold text-white tracking-tight text-lg">
            Blackbook
          </span>
          <span className="bg-amber-500 text-slate-900 px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider leading-none">
            Pro
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-5">
        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-6 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          {providerLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/dashboard/provider" &&
                pathname.startsWith(link.href));
            const isInbox =
              link.href === "/dashboard/provider" &&
              (pathname === "/dashboard/provider" ||
                pathname.startsWith("/dashboard/provider/request"));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors ${
                  isActive || isInbox
                    ? "text-amber-400 border-b-2 border-amber-400"
                    : "hover:text-slate-200"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Notification bell */}
        <div className="[&_button]:hover:bg-slate-800 [&_.material-symbols-outlined]:text-slate-300">
          <NotificationBell initialCount={user.unreadCount} userId={user.id} />
        </div>

        {/* Business name / avatar */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 max-w-[140px] truncate">
            {user.businessName}
          </span>
          <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
            <span className="text-amber-400 text-[10px] font-bold">
              {user.businessName
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
