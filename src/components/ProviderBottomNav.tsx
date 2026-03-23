"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const providerNavItems = [
  { href: "/dashboard/provider", icon: "inbox", label: "Inbox" },
  { href: "/messages", icon: "chat", label: "Messages" },
  { href: "/dashboard/provider/analytics", icon: "analytics", label: "Analytics" },
  { href: "/dashboard/provider/settings", icon: "settings", label: "Settings" },
];

export default function ProviderBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 pb-safe bg-slate-900/95 backdrop-blur-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.3)] border-t border-slate-700/30">
      <div className="flex justify-around items-center h-18 px-2 w-full">
        {providerNavItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href === "/dashboard/provider"
              ? pathname.startsWith("/dashboard/provider/request")
              : item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              className={`relative flex flex-col items-center justify-center px-3 py-2 transition-all duration-300 ${
                isActive
                  ? "text-amber-400"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <span
                className={`material-symbols-outlined mb-0.5 text-xl ${
                  isActive ? "text-amber-400" : ""
                }`}
                style={
                  isActive
                    ? { fontVariationSettings: "'FILL' 1, 'wght' 500" }
                    : undefined
                }
              >
                {item.icon}
              </span>
              <span className="font-sans text-[9px] font-semibold uppercase tracking-wider">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute -top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-amber-400 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
