'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TopAppBar from '@/components/TopAppBar';
import ConciergeFAB from '@/components/ConciergeFAB';
import { createClient } from '@/lib/supabase/client';

interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
}

interface Location {
  id: string;
  name: string;
  slug: string;
}

interface Vessel {
  id: string;
  name: string;
  type: string | null;
  length_meters: number | null;
}

const TURNAROUND_SERVICES = [
  { slug: 'cleaning', label: 'Cleaning', icon: 'mop' },
  { slug: 'provisioning', label: 'Provisioning', icon: 'shopping_bag' },
  { slug: 'transfers', label: 'Airport Transfer', icon: 'directions_car' },
  { slug: 'laundry', label: 'Laundry', icon: 'dry_cleaning' },
  { slug: 'fuel', label: 'Fuel Delivery', icon: 'local_gas_station' },
  { slug: 'private-chef', label: 'Private Chef', icon: 'restaurant' },
  { slug: 'floristry', label: 'Flowers / Decorations', icon: 'local_florist' },
];

export default function TurnaroundPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [turnaroundDate, setTurnaroundDate] = useState('');
  const [turnaroundTime, setTurnaroundTime] = useState('');
  const [locationId, setLocationId] = useState('');
  const [vesselId, setVesselId] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [guestCount, setGuestCount] = useState<number | ''>('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();

      const [catRes, locRes, vesselRes] = await Promise.all([
        supabase
          .from('service_categories')
          .select('id, name, slug, icon')
          .is('parent_id', null)
          .order('sort_order', { ascending: true }),
        supabase
          .from('locations')
          .select('id, name, slug')
          .order('name', { ascending: true }),
        (async () => {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return { data: [], error: null };
          return supabase
            .from('vessels')
            .select('id, name, type, length_meters')
            .eq('owner_id', user.id)
            .order('created_at', { ascending: false });
        })(),
      ]);

      if (catRes.data) setCategories(catRes.data as ServiceCategory[]);
      if (locRes.data) setLocations(locRes.data as Location[]);
      if (vesselRes.data) setVessels(vesselRes.data as Vessel[]);
      setLoading(false);
    }
    fetchData();
  }, []);

  function toggleService(slug: string) {
    setSelectedServices((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  function findCategoryBySlug(slug: string): ServiceCategory | undefined {
    return categories.find((c) => c.slug === slug || c.slug.includes(slug));
  }

  const canSubmit =
    turnaroundDate !== '' &&
    locationId !== '' &&
    selectedServices.length > 0 &&
    !submitting;

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError('You must be logged in to submit a turnaround request.');
        setSubmitting(false);
        return;
      }

      // 1. Create the parent "Turnaround" request
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: parentRequest, error: parentError } = await (supabase as any)
        .from('service_requests')
        .insert({
          title: `Charter Turnaround${guestCount ? ` (${guestCount} guests)` : ''}`,
          description: notes || null,
          urgency: 'priority',
          preferred_date: turnaroundDate || null,
          preferred_time: turnaroundTime || null,
          flexible_dates: false,
          vessel_id: vesselId || null,
          location_id: locationId || null,
          status: 'submitted',
          user_id: user.id,
        })
        .select('id')
        .single();

      if (parentError) {
        console.error('Error creating parent request:', parentError);
        setError('Failed to create turnaround request. Please try again.');
        setSubmitting(false);
        return;
      }

      const parentId = parentRequest.id;

      // 2. Create child requests for each selected service
      const childInserts = selectedServices.map((slug) => {
        const serviceInfo = TURNAROUND_SERVICES.find((s) => s.slug === slug);
        const category = findCategoryBySlug(slug);

        return {
          title: serviceInfo?.label || slug,
          description: notes
            ? `Turnaround service: ${serviceInfo?.label}. ${guestCount ? `Guest count: ${guestCount}.` : ''} Notes: ${notes}`
            : `Turnaround service: ${serviceInfo?.label}. ${guestCount ? `Guest count: ${guestCount}.` : ''}`,
          category_id: category?.id || null,
          urgency: 'priority' as const,
          preferred_date: turnaroundDate || null,
          preferred_time: turnaroundTime || null,
          flexible_dates: false,
          vessel_id: vesselId || null,
          location_id: locationId || null,
          parent_request_id: parentId,
          status: 'submitted' as const,
          user_id: user.id,
        };
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: childError } = await (supabase as any)
        .from('service_requests')
        .insert(childInserts);

      if (childError) {
        console.error('Error creating child requests:', childError);
        setError('Turnaround created but some services failed. Check your dashboard.');
        setSubmitting(false);
        return;
      }

      // Success — redirect to confirmation
      router.push('/request/confirmation');
    } catch (err) {
      console.error('Turnaround submission error:', err);
      setError('An unexpected error occurred. Please try again.');
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <>
        <TopAppBar />
        <main className="pt-20 pb-32 px-4 md:px-8 max-w-3xl mx-auto">
          <div className="animate-pulse space-y-6 pt-8">
            <div className="h-8 bg-surface-container-high rounded w-64" />
            <div className="h-4 bg-surface-container-high rounded w-48" />
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-surface-container-high rounded-xl" />
              ))}
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <TopAppBar />

      <main className="pt-20 pb-32 px-4 md:px-8 max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 pt-4">
          <Link
            href="/dashboard"
            className="text-xs font-bold uppercase tracking-widest text-on-surface-variant flex items-center gap-1 mb-4 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Dashboard
          </Link>
          <h1 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-primary tracking-tight mb-2">
            Charter Turnaround
          </h1>
          <p className="text-on-surface-variant text-sm">
            Submit multiple services at once for a guest changeover. One form, multiple requests.
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-error-container rounded-xl p-4 mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-on-error-container">error</span>
            <p className="text-sm text-on-error-container">{error}</p>
          </div>
        )}

        {/* Turnaround Date & Time */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">event</span>
            Turnaround Date
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-on-surface block mb-2">
                Date *
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                  calendar_today
                </span>
                <input
                  type="date"
                  value={turnaroundDate}
                  onChange={(e) => setTurnaroundDate(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl pl-10 pr-4 py-3 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-on-surface block mb-2">
                Guest Arrival Time
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                  schedule
                </span>
                <input
                  type="time"
                  value={turnaroundTime}
                  onChange={(e) => setTurnaroundTime(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl pl-10 pr-4 py-3 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">location_on</span>
            Location *
          </h2>
          <select
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none"
          >
            <option value="">Select a location</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </section>

        {/* Vessel */}
        {vessels.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">directions_boat</span>
              Vessel
            </h2>
            <select
              value={vesselId}
              onChange={(e) => setVesselId(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none"
            >
              <option value="">Select a vessel</option>
              {vessels.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                  {v.length_meters ? ` (${v.length_meters}m)` : ''}
                  {v.type ? ` - ${v.type}` : ''}
                </option>
              ))}
            </select>
          </section>
        )}

        {/* Services Needed */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">checklist</span>
            Services Needed *
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TURNAROUND_SERVICES.map((service) => {
              const isSelected = selectedServices.includes(service.slug);
              return (
                <button
                  key={service.slug}
                  type="button"
                  onClick={() => toggleService(service.slug)}
                  className={`flex items-center gap-3 rounded-xl p-4 border transition-all text-left ${
                    isSelected
                      ? 'bg-primary text-on-primary border-primary shadow-md'
                      : 'bg-surface-container-low text-on-surface border-outline-variant/20 hover:bg-surface-container-high'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-xl ${
                      isSelected ? 'text-on-primary' : 'text-primary'
                    }`}
                  >
                    {service.icon}
                  </span>
                  <span className="text-sm font-semibold">{service.label}</span>
                  {isSelected && (
                    <span
                      className="material-symbols-outlined text-on-primary text-lg ml-auto"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Guest Count */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">group</span>
            Guest Count
          </h2>
          <input
            type="number"
            min="1"
            max="100"
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value ? parseInt(e.target.value, 10) : '')}
            placeholder="Number of guests"
            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface text-sm placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </section>

        {/* Notes */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">notes</span>
            Notes
          </h2>
          <textarea
            className="w-full h-32 bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 text-on-surface text-sm placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none transition-all"
            placeholder="Any special instructions, dietary requirements, guest preferences..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </section>

        {/* Summary */}
        {selectedServices.length > 0 && (
          <div className="bg-primary-container rounded-xl p-4 mb-8">
            <p className="text-sm font-bold text-on-primary-container mb-1">
              {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} selected
            </p>
            <p className="text-xs text-on-primary-container/70">
              {selectedServices
                .map((slug) => TURNAROUND_SERVICES.find((s) => s.slug === slug)?.label)
                .join(', ')}
            </p>
          </div>
        )}
      </main>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/20">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="text-sm font-semibold text-on-surface-variant hover:text-error transition-colors"
          >
            Cancel
          </Link>
          <button
            type="button"
            disabled={!canSubmit}
            onClick={handleSubmit}
            className={`px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center gap-2 ${
              canSubmit
                ? 'bg-primary text-on-primary hover:opacity-90'
                : 'bg-outline-variant/30 text-on-surface-variant cursor-not-allowed'
            }`}
          >
            {submitting ? (
              <>
                <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                Submitting...
              </>
            ) : (
              <>
                Submit Turnaround
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
