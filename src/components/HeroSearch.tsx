'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/discover?search=${encodeURIComponent(trimmed)}`);
    } else {
      router.push('/discover');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface-container-lowest p-2 rounded-xl flex flex-col md:flex-row gap-2 shadow-2xl"
    >
      <div className="flex-1 flex items-center px-4 py-3 gap-3 border-b md:border-b-0 md:border-r border-outline-variant/20">
        <span className="material-symbols-outlined text-outline">anchor</span>
        <input
          className="bg-transparent border-none focus:ring-0 w-full text-on-surface outline-none"
          placeholder="Where are you heading?"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-primary text-on-primary px-8 py-4 rounded-lg uppercase tracking-widest text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
      >
        Search Port
        <span className="material-symbols-outlined text-sm">
          arrow_forward
        </span>
      </button>
    </form>
  );
}
