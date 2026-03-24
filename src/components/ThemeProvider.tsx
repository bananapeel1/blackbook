'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

type Theme = 'cruiser' | 'superyacht' | 'provider';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    async function detectTheme() {
      // Check localStorage first for instant load
      const cached = localStorage.getItem('bb-theme') as Theme | null;
      if (cached) {
        document.body.setAttribute('data-theme', cached);
      }

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        document.body.removeAttribute('data-theme');
        localStorage.removeItem('bb-theme');
        return;
      }

      const role = user.user_metadata?.role;

      // Provider theme is handled by provider layout, not here
      if (role === 'service_provider') {
        localStorage.setItem('bb-theme', 'provider');
        return;
      }

      // Check for superyacht vessel
      const { data: vessels } = await supabase
        .from('vessels')
        .select('type, length_meters')
        .eq('owner_id', user.id);

      const hasSuperYacht = vessels?.some(
        (v: { type: string; length_meters: number | null }) =>
          (v.type === 'superyacht' || v.type === 'motor_yacht') &&
          v.length_meters && v.length_meters > 24
      );

      if (hasSuperYacht) {
        document.body.setAttribute('data-theme', 'superyacht');
        localStorage.setItem('bb-theme', 'superyacht');
      } else {
        document.body.removeAttribute('data-theme');
        localStorage.removeItem('bb-theme');
      }
    }

    detectTheme();

    // Listen for auth changes
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      detectTheme();
    });

    return () => subscription.unsubscribe();
  }, []);

  return <>{children}</>;
}
