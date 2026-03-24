'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TopAppBar from '@/components/TopAppBar';
import ConciergeFAB from '@/components/ConciergeFAB';
import { useRequestForm } from '@/lib/request-context';
import { createClient } from '@/lib/supabase/client';

interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  segment: 'practical' | 'shore' | 'premium';
  sort_order: number;
}

// Map seed icon names (lucide-style) to Material Symbols
const iconMap: Record<string, string> = {
  wrench: 'build',
  zap: 'bolt',
  droplets: 'water_drop',
  anchor: 'anchor',
  wind: 'air',
  paintbrush: 'brush',
  glasses: 'scuba_diving',
  fuel: 'local_gas_station',
  package: 'inventory_2',
  'shopping-bag': 'shopping_bag',
  thermometer: 'thermostat',
  battery: 'power',
  snowflake: 'ac_unit',
  droplet: 'water_drop',
  palette: 'palette',
  car: 'directions_car',
  'shopping-cart': 'local_shipping',
  shirt: 'dry_cleaning',
  flame: 'local_fire_department',
  'trash-2': 'delete_sweep',
  sparkles: 'auto_awesome',
  'file-text': 'description',
  'life-buoy': 'support',
  'chef-hat': 'restaurant',
  'party-popper': 'celebration',
  music: 'music_note',
  sparkle: 'auto_awesome',
  flower: 'local_florist',
  camera: 'photo_camera',
  utensils: 'restaurant_menu',
  shield: 'shield',
  heart: 'spa',
  crown: 'diamond',
  star: 'concierge',
};

const segmentLabels: Record<string, string> = {
  practical: 'Practical Services',
  shore: 'Shore Services',
  premium: 'Premium & Lifestyle',
};

function getTimeUntilArrival(date: string, time: string): string {
  const arrival = new Date(`${date}T${time || '12:00'}`);
  const now = new Date();
  const diff = arrival.getTime() - now.getTime();
  if (diff < 0) return 'Already arrived';
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (days > 0) return `${days} day${days > 1 ? 's' : ''}, ${hours} hour${hours > 1 ? 's' : ''}`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  return 'Less than an hour';
}

export default function RequestStep1Page() {
  const router = useRouter();
  const { formData, updateFormData } = useRequestForm();
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('service_categories')
        .select('id, name, slug, icon, description, segment, sort_order')
        .is('parent_id', null)
        .order('sort_order', { ascending: true });

      if (!error && data) {
        setCategories(data as ServiceCategory[]);
      }
      setLoading(false);
    }
    fetchCategories();
  }, []);

  const grouped = categories.reduce<Record<string, ServiceCategory[]>>(
    (acc, cat) => {
      if (!acc[cat.segment]) acc[cat.segment] = [];
      acc[cat.segment].push(cat);
      return acc;
    },
    {}
  );

  const segmentOrder = ['practical', 'shore', 'premium'] as const;

  function selectCategory(cat: ServiceCategory) {
    updateFormData({
      categoryId: cat.id,
      categoryName: cat.name,
      title: cat.name,
    });
  }

  function getMaterialIcon(iconName: string | null): string {
    if (!iconName) return 'handyman';
    return iconMap[iconName] ?? 'handyman';
  }

  const canProceed = formData.categoryId !== '';

  return (
    <>
      <TopAppBar />

      <main className="pt-20 pb-32 px-4 md:px-8 max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-on-secondary-container">
              Step 1 of 4
            </span>
            <span className="text-xs font-semibold text-on-surface-variant">
              Service Details
            </span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: '25%' }}
            />
          </div>
        </div>

        {/* Section Title */}
        <h1 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-primary tracking-tight mb-2">
          Plan your arrival
        </h1>
        <p className="text-on-surface-variant text-sm mb-8">
          Tell us when you&apos;re arriving and what you need arranged.
        </p>

        {/* When are you arriving? */}
        <h2 className="text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">flight_land</span>
          When are you arriving?
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-semibold text-on-surface block mb-2">
              Preferred Date
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                calendar_today
              </span>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => updateFormData({ preferredDate: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl pl-10 pr-4 py-3 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-on-surface block mb-2">
              Preferred Time
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                schedule
              </span>
              <input
                type="time"
                value={formData.preferredTime}
                onChange={(e) => updateFormData({ preferredTime: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl pl-10 pr-4 py-3 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>

        {/* Flexible Dates Toggle */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => updateFormData({ flexibleDates: !formData.flexibleDates })}
            className="flex items-center gap-3 text-sm"
          >
            <div
              className={`w-10 h-6 rounded-full transition-all duration-200 flex items-center px-0.5 ${
                formData.flexibleDates ? 'bg-primary' : 'bg-outline-variant/40'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                  formData.flexibleDates ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </div>
            <span className="text-on-surface font-medium">Flexible dates</span>
          </button>
        </div>

        {/* ETA Countdown */}
        {formData.preferredDate && (
          <div className="bg-primary-container rounded-xl p-4 flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-primary text-2xl">schedule</span>
            <div>
              <p className="text-sm font-bold text-on-primary-container">
                Arriving in {getTimeUntilArrival(formData.preferredDate, formData.preferredTime)}
              </p>
              <p className="text-xs text-on-primary-container/70">
                Providers will prioritise based on your arrival window
              </p>
            </div>
          </div>
        )}

        {/* What do you need? */}
        <h2 className="text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">category</span>
          What do you need?
        </h2>

        {/* Service Type Grid - grouped by segment */}
        {loading ? (
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-xl p-5 bg-surface-container-low border border-outline-variant/20 animate-pulse h-28"
              />
            ))}
          </div>
        ) : (
          segmentOrder.map((segment) =>
            grouped[segment] && grouped[segment].length > 0 ? (
              <div key={segment} className="mb-6">
                <h2 className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-3">
                  {segmentLabels[segment]}
                </h2>
                <div className="grid grid-cols-2 gap-3 mb-2">
                  {grouped[segment].map((cat) => {
                    const isActive = formData.categoryId === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => selectCategory(cat)}
                        className={`relative rounded-xl p-5 cursor-pointer transition-all duration-200 border text-left ${
                          isActive
                            ? 'bg-primary text-on-primary border-primary shadow-lg'
                            : 'bg-surface-container-low text-on-surface border-outline-variant/20 hover:bg-surface-container-high'
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-2xl mb-3 block ${
                            isActive ? 'text-on-primary' : 'text-primary'
                          }`}
                        >
                          {getMaterialIcon(cat.icon)}
                        </span>
                        <h3
                          className={`font-semibold text-sm mb-0.5 ${
                            isActive ? 'text-on-primary' : 'text-on-surface'
                          }`}
                        >
                          {cat.name}
                        </h3>
                        <p
                          className={`text-xs line-clamp-1 ${
                            isActive
                              ? 'text-on-primary/70'
                              : 'text-on-surface-variant'
                          }`}
                        >
                          {cat.description}
                        </p>
                        {isActive && (
                          <div className="absolute top-3 right-3">
                            <span
                              className="material-symbols-outlined text-on-primary text-lg"
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
            ) : null
          )
        )}

        {/* Description */}
        <div className="mb-8">
          <label className="text-sm font-semibold text-on-surface block mb-2">
            Description
          </label>
          <textarea
            className="w-full h-32 bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 text-on-surface text-sm placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none transition-all"
            placeholder="E.g. Port engine overheating after 2000 RPM..."
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
          />
        </div>

        {/* Urgency Selector */}
        <div className="mb-8">
          <label className="text-sm font-semibold text-on-surface block mb-2">
            Urgency
          </label>
          <div className="grid grid-cols-3 gap-3">
            {([
              { value: 'standard', label: 'Standard', icon: 'schedule', desc: 'Within a week' },
              { value: 'priority', label: 'Priority', icon: 'priority_high', desc: 'Within 48h' },
              { value: 'emergency', label: 'Emergency', icon: 'emergency', desc: 'ASAP' },
            ] as const).map((opt) => {
              const isActive = formData.urgency === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateFormData({ urgency: opt.value })}
                  className={`rounded-xl p-3 text-center transition-all duration-200 border ${
                    isActive
                      ? opt.value === 'emergency'
                        ? 'bg-error text-on-error border-error shadow-md'
                        : opt.value === 'priority'
                        ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant border-tertiary-fixed shadow-md'
                        : 'bg-primary text-on-primary border-primary shadow-md'
                      : 'bg-surface-container-low text-on-surface border-outline-variant/20 hover:bg-surface-container-high'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-lg mb-1 block ${
                      isActive ? '' : 'text-on-surface-variant'
                    }`}
                  >
                    {opt.icon}
                  </span>
                  <p className="text-xs font-bold">{opt.label}</p>
                  <p className={`text-[10px] mt-0.5 ${isActive ? 'opacity-70' : 'text-on-surface-variant'}`}>
                    {opt.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

      </main>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/20">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="text-sm font-semibold text-on-surface-variant hover:text-error transition-colors"
          >
            Cancel Request
          </button>
          <button
            type="button"
            disabled={!canProceed}
            onClick={() => router.push('/request/step-2')}
            className={`px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center gap-2 ${
              canProceed
                ? 'bg-primary text-on-primary hover:opacity-90'
                : 'bg-outline-variant/30 text-on-surface-variant cursor-not-allowed'
            }`}
          >
            Next Step
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </button>
        </div>
        <div className="h-1 bg-gradient-to-r from-primary via-tertiary-fixed to-primary-fixed" />
      </div>

      <ConciergeFAB />
    </>
  );
}
