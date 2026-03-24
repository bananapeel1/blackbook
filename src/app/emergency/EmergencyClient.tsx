'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface Location {
  id: string;
  name: string;
  slug: string;
  country: string;
  region: string | null;
}

interface ServiceCategory {
  id: string;
  slug: string;
}

const emergencyCategories = [
  { icon: 'engineering', label: 'Engine', slug: 'mechanics' },
  { icon: 'electrical_services', label: 'Electrical', slug: 'electricians' },
  { icon: 'plumbing', label: 'Plumbing', slug: 'plumbing' },
  { icon: 'local_gas_station', label: 'Fuel', slug: 'fuel-delivery' },
  { icon: 'sailing', label: 'Rigging', slug: 'rigging' },
  { icon: 'scuba_diving', label: 'Hull / Diving', slug: 'hull-cleaning' },
  { icon: 'ac_unit', label: 'AC / Refrigeration', slug: 'ac-repair' },
  { icon: 'handyman', label: 'Other', slug: 'mechanics' },
];

interface EmergencyClientProps {
  locations: Location[];
  categories: ServiceCategory[];
}

export default function EmergencyClient({
  locations,
  categories,
}: EmergencyClientProps) {
  const router = useRouter();
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [locationId, setLocationId] = useState<string>('');
  const [geoStatus, setGeoStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [geoCoords, setGeoCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function getSelectedCategory() {
    return emergencyCategories.find((c) => c.label === selectedLabel) ?? null;
  }

  function getCategoryId(slug: string): string | null {
    const cat = categories.find((c) => c.slug === slug);
    return cat?.id ?? null;
  }

  function handleUseMyLocation() {
    if (!navigator.geolocation) {
      setGeoStatus('error');
      return;
    }
    setGeoStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoStatus('success');
      },
      () => {
        setGeoStatus('error');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  async function handleSubmit() {
    const selected = getSelectedCategory();
    if (!selected) {
      setError('Please select what you need help with.');
      return;
    }
    if (!locationId && !geoCoords) {
      setError('Please select a location or use your current position.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();

      // Check auth
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login?returnUrl=/emergency');
        return;
      }

      const categoryId = getCategoryId(selected.slug);

      const insertPayload: Record<string, unknown> = {
        user_id: user.id,
        category_id: categoryId,
        title: `Emergency: ${selected.label}`,
        description:
          [
            description || 'Emergency assistance requested',
            phone ? `Contact: ${phone}` : '',
          ]
            .filter(Boolean)
            .join('\n\n') || 'Emergency assistance requested',
        urgency: 'emergency' as const,
        status: 'submitted' as const,
        location_id: locationId || null,
        location_lat: geoCoords?.lat ?? null,
        location_lng: geoCoords?.lng ?? null,
      };

      const { error: insertError } = await supabase
        .from('service_requests')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .insert(insertPayload as any);

      if (insertError) {
        console.error('Insert error:', insertError);
        setError('Failed to submit request. Please try again.');
        setSubmitting(false);
        return;
      }

      router.push('/request/confirmation');
    } catch {
      setError('Something went wrong. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <main className="pt-20 pb-32 px-4 md:px-8 max-w-3xl mx-auto">
      {/* Emergency Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto rounded-full bg-error-container flex items-center justify-center mb-4">
          <span
            className="material-symbols-outlined text-on-error-container text-4xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            sos
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-error tracking-tight mb-2">
          Emergency Help
        </h1>
        <p className="text-on-surface-variant text-sm max-w-md mx-auto">
          Get immediate assistance from nearby providers. Your request will be
          broadcast with highest priority.
        </p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 bg-error-container rounded-xl p-4 flex items-center gap-3">
          <span className="material-symbols-outlined text-on-error-container text-lg">
            warning
          </span>
          <p className="text-sm font-medium text-on-error-container">{error}</p>
        </div>
      )}

      {/* Category Selection */}
      <div className="mb-8">
        <label className="text-sm font-semibold text-on-surface block mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-error text-lg">
            emergency
          </span>
          I need help with:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 stagger-children">
          {emergencyCategories.map((cat) => {
            const isSelected = selectedLabel === cat.label;
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => setSelectedLabel(cat.label)}
                className={`relative rounded-xl p-4 cursor-pointer transition-all duration-200 border text-center ${
                  isSelected
                    ? 'bg-error text-on-error border-error shadow-lg scale-[1.02]'
                    : 'bg-surface-container-low text-on-surface border-outline-variant/20 hover:bg-error-container hover:border-error/30'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-2xl mb-2 block ${
                    isSelected ? 'text-on-error' : 'text-error'
                  }`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {cat.icon}
                </span>
                <p
                  className={`text-xs font-bold ${
                    isSelected ? 'text-on-error' : 'text-on-surface'
                  }`}
                >
                  {cat.label}
                </p>
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <span
                      className="material-symbols-outlined text-on-error text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Location */}
      <div className="mb-8">
        <label className="text-sm font-semibold text-on-surface block mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-error text-lg">
            location_on
          </span>
          Where are you?
        </label>
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
              anchor
            </span>
            <select
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl pl-10 pr-4 py-3 text-on-surface text-sm font-medium focus:outline-none focus:ring-2 focus:ring-error/30 focus:border-error transition-all appearance-none"
            >
              <option value="">Select marina or port...</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                  {loc.region ? `, ${loc.region}` : ''} &mdash; {loc.country}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={geoStatus === 'loading'}
            className={`flex-shrink-0 px-4 py-3 rounded-xl text-sm font-bold transition-all active:scale-95 flex items-center gap-2 border ${
              geoStatus === 'success'
                ? 'bg-error text-on-error border-error'
                : 'bg-error-container text-on-error-container border-error/20 hover:bg-error hover:text-on-error'
            }`}
          >
            <span className="material-symbols-outlined text-lg">
              {geoStatus === 'loading'
                ? 'hourglass_empty'
                : geoStatus === 'success'
                  ? 'check'
                  : 'my_location'}
            </span>
            <span className="hidden sm:inline">
              {geoStatus === 'success' ? 'Located' : 'Use My Location'}
            </span>
          </button>
        </div>
        {geoStatus === 'success' && geoCoords && (
          <p className="text-xs text-on-surface-variant mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-error text-sm">
              gps_fixed
            </span>
            GPS coordinates captured: {geoCoords.lat.toFixed(4)},{' '}
            {geoCoords.lng.toFixed(4)}
          </p>
        )}
        {geoStatus === 'error' && (
          <p className="text-xs text-error mt-2">
            Could not get your location. Please select a marina above.
          </p>
        )}
      </div>

      {/* Description */}
      <div className="mb-8">
        <label className="text-sm font-semibold text-on-surface block mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-error text-lg">
            description
          </span>
          What&apos;s happening?
        </label>
        <textarea
          className="w-full h-28 bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 text-on-surface text-sm placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-error/30 focus:border-error resize-none transition-all"
          placeholder="Describe the situation briefly..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Phone */}
      <div className="mb-10">
        <label className="text-sm font-semibold text-on-surface block mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-error text-lg">
            call
          </span>
          Your contact number
        </label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
            phone
          </span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+357 99 123456"
            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl pl-10 pr-4 py-3 text-on-surface text-sm font-medium focus:outline-none focus:ring-2 focus:ring-error/30 focus:border-error transition-all"
          />
        </div>
        <p className="text-xs text-on-surface-variant mt-1.5">
          So providers can reach you immediately
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        disabled={submitting}
        onClick={handleSubmit}
        className="w-full bg-error text-on-error px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed btn-press"
      >
        {submitting ? (
          <>
            <span className="material-symbols-outlined text-lg animate-spin">
              progress_activity
            </span>
            Broadcasting...
          </>
        ) : (
          <>
            <span
              className="material-symbols-outlined text-lg"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              cell_tower
            </span>
            Broadcast Emergency Request
          </>
        )}
      </button>

      <p className="text-center text-xs text-on-surface-variant mt-4">
        Your request will be sent to all available providers in the area with
        highest priority.
      </p>

      {/* Emergency Accent Bar */}
      <div className="mt-8 h-1 bg-gradient-to-r from-error via-error/60 to-error rounded-full" />
    </main>
  );
}
