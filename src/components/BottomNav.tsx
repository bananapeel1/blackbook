"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", icon: "anchor", label: "Home" },
  { href: "/services", icon: "sailing", label: "Services" },
  { href: "/request", icon: "receipt_long", label: "Requests" },
  { href: "/dashboard", icon: "dashboard", label: "Dashboard" },
  { href: "/dashboard#saved", icon: "bookmark", label: "Saved" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 pb-safe bg-slate-50/90 backdrop-blur-2xl shadow-[0_-4px_20px_rgba(0,33,71,0.08)]">
      <div className="flex justify-around items-center h-20 px-2 w-full">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center px-3 py-1 transition-all duration-300 ${
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
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
