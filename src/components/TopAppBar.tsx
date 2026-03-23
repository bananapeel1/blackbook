"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/discover", label: "Discover" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function TopAppBar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-xl border-b border-slate-200/20 shadow-sm h-16 flex justify-between items-center px-6">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-slate-900">
          location_on
        </span>
        <Link
          href="/"
          className="font-[family-name:var(--font-headline)] font-bold text-slate-900 tracking-tighter text-xl"
        >
          Dockside Blackbook
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <nav className="hidden md:flex items-center gap-8 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? "text-slate-900 border-b-2 border-primary pb-1"
                  : "hover:opacity-80 transition-opacity"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="w-8 h-8 rounded-full bg-primary-container overflow-hidden border border-outline-variant/30 cursor-pointer hover:scale-95 active:scale-90 transition-transform">
          <div className="w-full h-full bg-primary-container flex items-center justify-center text-on-primary text-xs font-bold">
            AG
          </div>
        </div>
      </div>
    </header>
  );
}
