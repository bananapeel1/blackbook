"use client";

import { useState } from "react";
import ConciergeOverlay from "./ConciergeOverlay";

export default function ConciergeFAB() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-40 glass-card border border-white/50 shadow-2xl w-16 h-16 rounded-full flex items-center justify-center text-on-tertiary-container hover:scale-110 transition-transform active:scale-95 group"
      >
        <span className="material-symbols-outlined text-3xl transition-transform group-hover:rotate-12">
          support_agent
        </span>
        <div className="absolute right-full mr-4 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Speak to Concierge
        </div>
      </button>

      {isOpen && <ConciergeOverlay onClose={() => setIsOpen(false)} />}
    </>
  );
}
