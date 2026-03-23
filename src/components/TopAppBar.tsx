"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NotificationBell from "./NotificationBell";

export interface NavUser {
  fullName: string | null;
  role: "boat_owner" | "service_provider" | null;
  unreadCount: number;
}

const ownerLinks = [
  { href: "/", label: "Home" },
  { href: "/discover", label: "Discover" },
  { href: "/request", label: "Request" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/messages", label: "Messages" },
];

const providerLinks = [
  { href: "/", label: "Home" },
  { href: "/discover", label: "Discover" },
  { href: "/dashboard/provider", label: "Dashboard" },
  { href: "/messages", label: "Messages" },
];

const guestLinks = [
  { href: "/", label: "Home" },
  { href: "/discover", label: "Discover" },
  { href: "/services", label: "Services" },
  { href: "/join", label: "For Providers" },
];

export default function TopAppBar({ user }: { user?: NavUser | null }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = user
    ? user.role === "service_provider"
      ? providerLinks
      : ownerLinks
    : guestLinks;

  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : null;

  return (
    <header
      className={`fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-xl border-b border-slate-200/20 h-16 flex justify-between items-center px-6 transition-shadow duration-300 ${
        scrolled ? "shadow-lg" : "shadow-sm"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-slate-900">
          location_on
        </span>
        <Link
          href="/"
          className="font-[family-name:var(--font-headline)] font-bold text-slate-900 tracking-tighter text-xl md:text-2xl"
        >
          Dockside Blackbook
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <nav className="hidden md:flex items-center gap-8 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative ${
                  isActive
                    ? "text-slate-900 border-b-2 border-primary pb-1"
                    : "hover:opacity-80 transition-opacity"
                }`}
              >
                {link.label}
                {link.href === "/messages" && user && user.unreadCount > 0 && (
                  <span className="absolute -top-2 -right-3 w-4 h-4 bg-error text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                    {user.unreadCount > 9 ? "9+" : user.unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {user ? (
          <div className="flex items-center gap-2">
            <NotificationBell initialCount={user.unreadCount} />
            <div className="w-8 h-8 rounded-full bg-primary-container overflow-hidden border border-outline-variant/30 cursor-pointer hover:scale-95 active:scale-90 transition-transform">
              <div className="w-full h-full bg-primary-container flex items-center justify-center text-on-primary text-xs font-bold">
                {initials || "U"}
              </div>
            </div>
          </div>
        ) : (
          <Link
            href="/login"
            className="bg-primary text-on-primary px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
