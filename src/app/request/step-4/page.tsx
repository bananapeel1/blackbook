'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TopAppBar from '@/components/TopAppBar';
import ConciergeFAB from '@/components/ConciergeFAB';
import { useRequestForm } from '@/lib/request-context';
import { createClient } from '@/lib/supabase/client';

export default function RequestStep4Page() {
  const router = useRouter();
  const { formData, updateFormData } = useRequestForm();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function formatDate(dateStr: string): string {
    if (!dateStr) return 'Not specified';
    try {
      return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  }

  function formatTime(timeStr: string): string {
    if (!timeStr) return 'Not specified';
    try {
      const [h, m] = timeStr.split(':');
      const hour = parseInt(h, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${m} ${ampm}`;
    } catch {
      return timeStr;
    }
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const requestPayload = {
        title: formData.title || formData.categoryName,
        description: formData.description || null,
        category_id: formData.categoryId || null,
        urgency: formData.urgency,
        preferred_date: formData.preferredDate || null,
        preferred_time: formData.preferredTime || null,
        flexible_dates: formData.flexibleDates,
        vessel_id: formData.vesselId || null,
        location_id: formData.locationId || null,
        location_name: formData.locationName || null,
        location_lat: formData.locationLat,
        location_lng: formData.locationLng,
        berth_info: formData.berthInfo || null,
        budget_min: formData.budgetMin,
        budget_max: formData.budgetMax,
        attachments: JSON.parse(JSON.stringify(formData.attachments)),
        status: 'submitted' as const,
      };

      if (user) {
        // Logged in: insert to Supabase
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error: insertError } = await (supabase as any)
          .from('service_requests')
          .insert({
            ...requestPayload,
            user_id: user.id,
          });

        if (insertError) {
          setError(insertError.message);
          setSubmitting(false);
          return;
        }

        router.push('/request/confirmation');
      } else {
        // Not logged in: save to localStorage and redirect
        localStorage.setItem(
          'pending_service_request',
          JSON.stringify(requestPayload)
        );
        router.push('/login?returnUrl=/request/confirmation');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setSubmitting(false);
    }
  }

  return (
    <>
      <TopAppBar />

      <main className="pt-20 pb-32 px-4 md:px-8 max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-on-secondary-container">
              Step 4 of 4
            </span>
            <span className="text-xs font-semibold text-on-surface-variant">
              Review &amp; Submit
            </span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: '100%' }}
            />
          </div>
        </div>

        {/* Section Title */}
        <h1 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-primary tracking-tight mb-2">
          Review your request
        </h1>
        <p className="text-on-surface-variant text-sm mb-8">
          Confirm all details before submitting to verified providers.
        </p>

        {/* Summary Bento Grid */}
        <div className="grid grid-cols-5 gap-3 mb-8">
          {/* Service Type - 3 cols */}
          <div className="col-span-3 bg-surface-container-low rounded-xl p-5 border border-outline-variant/10">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block mb-3">
              Service Type
            </span>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary-container text-2xl">
                  engineering
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-headline)] text-xl font-bold text-primary">
                {formData.categoryName || 'Not selected'}
              </h3>
            </div>
          </div>

          {/* Vessel - 2 cols */}
          <div className="col-span-2 bg-secondary-fixed rounded-xl p-5 border border-outline-variant/10">
            <span className="text-[10px] uppercase tracking-widest text-on-secondary-fixed-variant font-bold block mb-3">
              Vessel
            </span>
            <h3 className="font-[family-name:var(--font-headline)] text-xl font-bold text-on-secondary-fixed">
              {formData.vesselName || 'Not specified'}
            </h3>
          </div>

          {/* Urgency */}
          <div className="col-span-2 bg-surface-container-low rounded-xl p-5 border border-outline-variant/10">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block mb-3">
              Urgency
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`material-symbols-outlined text-lg ${
                  formData.urgency === 'emergency'
                    ? 'text-error'
                    : formData.urgency === 'priority'
                    ? 'text-tertiary-fixed'
                    : 'text-primary'
                }`}
              >
                {formData.urgency === 'emergency'
                  ? 'emergency'
                  : formData.urgency === 'priority'
                  ? 'priority_high'
                  : 'schedule'}
              </span>
              <span className="text-sm font-bold text-on-surface capitalize">
                {formData.urgency}
              </span>
            </div>
          </div>

          {/* Budget */}
          <div className="col-span-3 bg-surface-container-low rounded-xl p-5 border border-outline-variant/10">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block mb-3">
              Budget Range
            </span>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-xs text-on-surface-variant block mb-1">
                  Min
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm font-semibold">
                    &euro;
                  </span>
                  <input
                    type="number"
                    value={formData.budgetMin ?? ''}
                    onChange={(e) =>
                      updateFormData({
                        budgetMin: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                    placeholder="0"
                    className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-lg pl-7 pr-3 py-2 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>
              <span className="text-on-surface-variant text-xs font-semibold mt-5">
                &ndash;
              </span>
              <div className="flex-1">
                <label className="text-xs text-on-surface-variant block mb-1">
                  Max
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm font-semibold">
                    &euro;
                  </span>
                  <input
                    type="number"
                    value={formData.budgetMax ?? ''}
                    onChange={(e) =>
                      updateFormData({
                        budgetMax: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                    placeholder="0"
                    className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-lg pl-7 pr-3 py-2 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description - full width */}
          <div className="col-span-5 bg-surface-container-low rounded-xl p-5 border border-outline-variant/10">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block mb-3">
              Description
            </span>
            <p className="text-on-surface text-sm italic leading-relaxed">
              {formData.description
                ? `\u201C${formData.description}\u201D`
                : 'No description provided.'}
            </p>
          </div>

          {/* Date / Time / Location */}
          <div className="col-span-5 bg-surface-container-low rounded-xl p-5 border border-outline-variant/10">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block mb-4">
              Schedule &amp; Location
            </span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-lg">
                  calendar_today
                </span>
                <div>
                  <p className="text-xs text-on-surface-variant">Date</p>
                  <p className="text-sm font-semibold text-on-surface">
                    {formatDate(formData.preferredDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-lg">
                  schedule
                </span>
                <div>
                  <p className="text-xs text-on-surface-variant">Time</p>
                  <p className="text-sm font-semibold text-on-surface">
                    {formatTime(formData.preferredTime)}
                  </p>
                </div>
              </div>
              <div className="col-span-2 md:col-span-1 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-lg">
                  location_on
                </span>
                <div>
                  <p className="text-xs text-on-surface-variant">Location</p>
                  <p className="text-sm font-semibold text-on-surface">
                    {formData.locationName || 'Not specified'}
                  </p>
                </div>
              </div>
            </div>
            {formData.flexibleDates && (
              <div className="mt-3 flex items-center gap-2 text-xs text-primary font-medium">
                <span className="material-symbols-outlined text-sm">
                  event_available
                </span>
                Flexible dates
              </div>
            )}
            {formData.berthInfo && (
              <div className="mt-2 flex items-center gap-2 text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-sm">
                  dock
                </span>
                {formData.berthInfo}
              </div>
            )}
            {/* Map thumbnail placeholder */}
            <div className="mt-4 aspect-[16/6] bg-surface-container-highest rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-primary text-2xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  location_on
                </span>
              </div>
            </div>
          </div>

          {/* Reference Files - full width horizontal scroll */}
          <div className="col-span-5 bg-surface-container-low rounded-xl p-5 border border-outline-variant/10">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block mb-3">
              Reference Files
            </span>
            {formData.attachments.length === 0 ? (
              <p className="text-sm text-on-surface-variant">
                No files attached.
              </p>
            ) : (
              <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
                {formData.attachments.map((file, i) => (
                  <div
                    key={`${file.name}-${i}`}
                    className="w-24 h-24 rounded-lg bg-surface-container-highest flex-shrink-0 flex flex-col items-center justify-center p-2"
                  >
                    <span className="material-symbols-outlined text-outline text-2xl">
                      {file.type === 'image' ? 'image' : 'description'}
                    </span>
                    <p className="text-[9px] text-on-surface-variant mt-1 truncate w-full text-center">
                      {file.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-error-container rounded-xl p-4 mb-4 flex items-start gap-3">
            <span className="material-symbols-outlined text-on-error-container text-lg flex-shrink-0 mt-0.5">
              error
            </span>
            <p className="text-sm text-on-error-container">{error}</p>
          </div>
        )}

        {/* Trust Signal */}
        <div className="flex items-center gap-3 bg-surface-container-low rounded-xl p-4 border border-outline-variant/10 mb-8">
          <span
            className="material-symbols-outlined text-primary text-2xl flex-shrink-0"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified_user
          </span>
          <p className="text-sm text-on-surface-variant">
            Your request will be sent to{' '}
            <span className="font-bold text-on-surface">
              5+ verified providers
            </span>{' '}
            in your area for competitive quotes.
          </p>
        </div>
      </main>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/20">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push('/request/step-3')}
            className="border border-outline-variant/30 text-on-surface-variant px-6 py-3 rounded-xl text-sm font-semibold hover:bg-surface-container-low transition-all active:scale-95 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            Edit Details
          </button>
          <button
            type="button"
            disabled={submitting}
            onClick={handleSubmit}
            className={`px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center gap-2 shadow-lg ${
              submitting
                ? 'bg-outline-variant/40 text-on-surface-variant cursor-wait'
                : 'bg-primary text-on-primary hover:opacity-90'
            }`}
          >
            {submitting ? (
              <>
                <span className="material-symbols-outlined text-sm animate-spin">
                  progress_activity
                </span>
                Submitting...
              </>
            ) : (
              <>
                Submit Request
                <span className="material-symbols-outlined text-sm">send</span>
              </>
            )}
          </button>
        </div>
        <div className="h-1 bg-gradient-to-r from-primary via-tertiary-fixed to-primary-fixed" />
      </div>

      <ConciergeFAB />
    </>
  );
}
