'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import TopAppBar from '@/components/TopAppBar';
import ConciergeFAB from '@/components/ConciergeFAB';
import { useRequestForm } from '@/lib/request-context';
import { createClient } from '@/lib/supabase/client';

export default function RequestConfirmationPage() {
  const { formData, resetFormData } = useRequestForm();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti animation on mount
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Recover pending request from localStorage after login redirect
  useEffect(() => {
    async function recoverPendingRequest() {
      const pending = localStorage.getItem('pending_service_request');
      if (!pending) return;

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      try {
        const parsed = JSON.parse(pending);
        // The payload from step-4 is already mapped to DB columns,
        // just add the user_id
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error: insertError } = await (supabase as any)
          .from('service_requests')
          .insert({
            category_id: parsed.category_id || null,
            location_id: parsed.location_id || null,
            vessel_id: parsed.vessel_id || null,
            title: parsed.title || 'Service request',
            description: parsed.description || null,
            urgency: parsed.urgency || 'standard',
            preferred_date: parsed.preferred_date || null,
            preferred_time: parsed.preferred_time || null,
            flexible_dates: parsed.flexible_dates ?? false,
            budget_min: parsed.budget_min ?? null,
            budget_max: parsed.budget_max ?? null,
            location_name: parsed.location_name || null,
            location_lat: parsed.location_lat ?? null,
            location_lng: parsed.location_lng ?? null,
            berth_info: parsed.berth_info || null,
            attachments: parsed.attachments || [],
            status: 'submitted',
            user_id: user.id,
          });

        if (!insertError) {
          localStorage.removeItem('pending_service_request');
        }
      } catch {
        // Silently fail - user can still see the confirmation page
      }
    }

    recoverPendingRequest();
  }, []);

  // Store summary before reset
  const [summary] = useState({
    categoryName: formData.categoryName,
    locationName: formData.locationName,
    urgency: formData.urgency,
  });

  useEffect(() => {
    // Reset form data after storing the summary
    return () => {
      resetFormData();
    };
  }, [resetFormData]);

  return (
    <>
      <TopAppBar />

      <main className="pt-20 pb-32 px-4 md:px-8 max-w-3xl mx-auto">
        {/* Confetti / Celebration */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10%',
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              >
                <div
                  className="w-2.5 h-2.5 rounded-sm"
                  style={{
                    backgroundColor: [
                      '#1a4a7a',
                      '#c5a44e',
                      '#2d6ca8',
                      '#e8d5a0',
                      '#0d3460',
                      '#d4b968',
                    ][i % 6],
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Success Icon */}
        <div className="text-center mb-8 pt-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-primary-container flex items-center justify-center mb-6 animate-bounce-once">
            <span
              className="material-symbols-outlined text-on-primary-container text-5xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-primary tracking-tight mb-3">
            Request Submitted!
          </h1>
          <p className="text-on-surface-variant text-sm max-w-md mx-auto leading-relaxed">
            Your{' '}
            <span className="font-semibold text-on-surface">
              {summary.categoryName || 'service'}
            </span>{' '}
            request has been sent to{' '}
            <span className="font-bold text-primary">5+ verified providers</span>
            {summary.locationName ? (
              <>
                {' '}
                in{' '}
                <span className="font-semibold text-on-surface">
                  {summary.locationName}
                </span>
              </>
            ) : null}
            .
          </p>
        </div>

        {/* What Happens Next */}
        <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10 mb-6">
          <h2 className="text-sm font-bold text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">
              timeline
            </span>
            What happens next
          </h2>
          <div className="space-y-4">
            {[
              {
                icon: 'notifications_active',
                title: 'Providers notified',
                desc: 'Relevant providers in your area have been alerted about your request.',
              },
              {
                icon: 'request_quote',
                title: 'Quotes incoming',
                desc: 'Expect competitive quotes within 2-24 hours depending on urgency.',
              },
              {
                icon: 'compare_arrows',
                title: 'Compare & accept',
                desc: 'Review quotes, chat with providers, and accept the best offer.',
              },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-on-primary-container text-lg">
                    {step.icon}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-on-surface">
                    {step.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Urgency Badge */}
        {summary.urgency !== 'standard' && (
          <div
            className={`rounded-xl p-4 mb-6 flex items-center gap-3 ${
              summary.urgency === 'emergency'
                ? 'bg-error-container'
                : 'bg-tertiary-fixed'
            }`}
          >
            <span
              className={`material-symbols-outlined text-xl ${
                summary.urgency === 'emergency'
                  ? 'text-on-error-container'
                  : 'text-on-tertiary-fixed-variant'
              }`}
            >
              {summary.urgency === 'emergency' ? 'emergency' : 'priority_high'}
            </span>
            <p
              className={`text-sm font-medium ${
                summary.urgency === 'emergency'
                  ? 'text-on-error-container'
                  : 'text-on-tertiary-fixed-variant'
              }`}
            >
              {summary.urgency === 'emergency'
                ? 'Emergency request - providers are being notified with highest priority.'
                : 'Priority request - providers will fast-track their response.'}
            </p>
          </div>
        )}

        {/* CTAs */}
        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="w-full bg-primary text-on-primary px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">
              dashboard
            </span>
            View Your Requests
          </Link>
          <Link
            href="/request"
            className="w-full bg-surface-container-low text-on-surface border border-outline-variant/30 px-8 py-4 rounded-xl text-sm font-semibold hover:bg-surface-container-high transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Submit Another Request
          </Link>
        </div>
      </main>

      <ConciergeFAB />

      {/* Confetti keyframe animation */}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes bounce-once {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
        }
        :global(.animate-confetti) {
          animation: confetti-fall 3s ease-out forwards;
        }
        :global(.animate-bounce-once) {
          animation: bounce-once 0.6s ease-out;
        }
      `}</style>
    </>
  );
}
