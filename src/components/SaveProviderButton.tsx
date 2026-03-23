'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface SaveProviderButtonProps {
  providerId: string;
  size?: 'sm' | 'md';
}

export default function SaveProviderButton({
  providerId,
  size = 'md',
}: SaveProviderButtonProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    let cancelled = false;

    async function checkStatus() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || cancelled) {
        setIsLoading(false);
        return;
      }

      setUserId(user.id);

      const { data } = await supabase
        .from('saved_providers')
        .select('id')
        .eq('user_id', user.id)
        .eq('provider_id', providerId)
        .maybeSingle();

      if (!cancelled) {
        setIsSaved(!!data);
        setIsLoading(false);
      }
    }

    checkStatus();
    return () => {
      cancelled = true;
    };
  }, [providerId, supabase]);

  const handleToggle = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!userId) {
        router.push('/login');
        return;
      }

      const previousState = isSaved;
      setIsSaved(!isSaved);

      try {
        if (previousState) {
          // Remove
          const { error } = await supabase
            .from('saved_providers')
            .delete()
            .eq('user_id', userId)
            .eq('provider_id', providerId);

          if (error) throw error;
        } else {
          // Save
          const { error } = await supabase
            .from('saved_providers')
            .insert({ user_id: userId, provider_id: providerId } as never);

          if (error) throw error;
        }
      } catch {
        // Revert on error
        setIsSaved(previousState);
      }
    },
    [userId, isSaved, providerId, supabase, router]
  );

  // If still loading or no user, render the button but it will redirect to login
  if (isLoading) {
    return (
      <button
        className={`${
          size === 'sm' ? 'w-9 h-9 rounded-lg' : 'w-11 h-11 rounded-xl'
        } bg-surface-container-lowest/80 backdrop-blur-sm flex items-center justify-center transition-all`}
        disabled
      >
        <span
          className={`material-symbols-outlined text-outline ${
            size === 'sm' ? 'text-lg' : 'text-xl'
          }`}
        >
          bookmark
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={`${
        size === 'sm' ? 'w-9 h-9 rounded-lg' : 'w-11 h-11 rounded-xl'
      } bg-surface-container-lowest/80 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-surface-container-lowest hover:scale-105 active:scale-95`}
      aria-label={isSaved ? 'Remove from Blackbook' : 'Save to Blackbook'}
    >
      <span
        className={`material-symbols-outlined ${
          size === 'sm' ? 'text-lg' : 'text-xl'
        } ${isSaved ? 'text-primary' : 'text-outline'}`}
        style={isSaved ? { fontVariationSettings: "'FILL' 1" } : undefined}
      >
        bookmark
      </span>
    </button>
  );
}
