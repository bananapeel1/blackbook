'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import TopAppBar from '@/components/TopAppBar';
import ConciergeFAB from '@/components/ConciergeFAB';
import NewVesselModal from '@/components/NewVesselModal';
import { useRequestForm } from '@/lib/request-context';
import { createClient } from '@/lib/supabase/client';

interface Vessel {
  id: string;
  name: string;
  type: string;
  length_meters: number | null;
  manufacturer: string | null;
  model: string | null;
  year: number | null;
  flag: string | null;
}

interface Location {
  id: string;
  name: string;
  country: string;
  region: string | null;
  latitude: number | null;
  longitude: number | null;
  type: string;
}

export default function RequestStep2Page() {
  const router = useRouter();
  const { formData, updateFormData } = useRequestForm();
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [locationSearch, setLocationSearch] = useState(formData.locationName);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [loadingVessels, setLoadingVessels] = useState(true);
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [showNewVesselModal, setShowNewVesselModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();

      // Try to fetch vessels for logged-in user
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('vessels')
          .select('id, name, type, length_meters, manufacturer, model, year, flag')
          .eq('owner_id', user.id)
          .order('name');
        if (data) setVessels(data);
      }
      setLoadingVessels(false);

      // Fetch all locations
      const { data: locData } = await supabase
        .from('locations')
        .select('id, name, country, region, latitude, longitude, type')
        .order('name');
      if (locData) setLocations(locData as Location[]);
      setLoadingLocations(false);
    }
    fetchData();
  }, []);

  const filteredLocations = useMemo(() => {
    if (!locationSearch.trim()) return locations;
    const q = locationSearch.toLowerCase();
    return locations.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.country.toLowerCase().includes(q) ||
        (l.region && l.region.toLowerCase().includes(q))
    );
  }, [locationSearch, locations]);

  function selectVessel(v: Vessel) {
    updateFormData({
      vesselId: v.id,
      vesselName: v.name,
    });
  }

  function selectLocation(loc: Location) {
    updateFormData({
      locationId: loc.id,
      locationName: loc.name,
      locationLat: loc.latitude,
      locationLng: loc.longitude,
    });
    setLocationSearch(loc.name);
    setShowLocationDropdown(false);
  }

  function formatVesselSpecs(v: Vessel): string {
    const parts: string[] = [];
    if (v.manufacturer) parts.push(v.manufacturer);
    if (v.length_meters) parts.push(`${v.length_meters}m`);
    if (v.year) parts.push(String(v.year));
    if (v.flag) parts.push(`Flag: ${v.flag}`);
    return parts.join(' | ') || v.type.replace('_', ' ');
  }

  return (
    <>
      <TopAppBar />

      <main className="pt-20 pb-32 px-4 md:px-8 max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-on-secondary-container">
              Step 2 of 4
            </span>
            <span className="text-xs font-semibold text-on-surface-variant">
              Vessel &amp; Location
            </span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: '50%' }}
            />
          </div>
        </div>

        {/* Section Title */}
        <h1 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-primary tracking-tight mb-2">
          Select your vessel
        </h1>
        <p className="text-on-surface-variant text-sm mb-8">
          Choose the vessel for this service request and confirm the location.
        </p>

        {/* Vessel Selection */}
        {loadingVessels ? (
          <div className="space-y-3 mb-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="rounded-xl p-4 bg-surface-container-low border border-outline-variant/20 animate-pulse h-20"
              />
            ))}
          </div>
        ) : vessels.length > 0 ? (
          <div className="space-y-3 mb-4">
            {vessels.map((vessel) => {
              const isSelected = formData.vesselId === vessel.id;
              return (
                <button
                  key={vessel.id}
                  type="button"
                  onClick={() => selectVessel(vessel)}
                  className={`w-full flex items-center gap-4 rounded-xl p-4 cursor-pointer transition-all duration-200 border text-left ${
                    isSelected
                      ? 'bg-primary-fixed border-primary shadow-sm'
                      : 'bg-surface-container-low border-outline-variant/20 hover:bg-surface-container-high'
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center ${
                      isSelected
                        ? 'bg-primary-container'
                        : 'bg-surface-container-high'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-2xl ${isSelected ? 'text-on-primary-container' : 'text-on-surface-variant'}`}>
                      sailing
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-[family-name:var(--font-headline)] font-bold text-primary text-lg">
                      {vessel.name}
                    </h3>
                    <p className="text-on-surface-variant text-xs truncate">
                      {formatVesselSpecs(vessel)}
                    </p>
                  </div>
                  {isSelected ? (
                    <span
                      className="material-symbols-outlined text-primary text-2xl flex-shrink-0"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-outline text-2xl flex-shrink-0">
                      radio_button_unchecked
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/20 mb-4 text-center">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2 block">
              directions_boat
            </span>
            <p className="text-sm text-on-surface-variant mb-1">
              No vessels registered yet
            </p>
            <p className="text-xs text-outline">
              You can add a vessel name below or register one after signing in.
            </p>
          </div>
        )}

        {/* Manual vessel name input (when no vessels from DB) */}
        {vessels.length === 0 && (
          <div className="mb-10">
            <label className="text-sm font-semibold text-on-surface block mb-2">
              Vessel Name
            </label>
            <input
              type="text"
              value={formData.vesselName}
              onChange={(e) =>
                updateFormData({ vesselName: e.target.value, vesselId: null })
              }
              placeholder="e.g. M/Y Serenity"
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
        )}

        {/* Register New Vessel */}
        {vessels.length > 0 && (
          <button
            type="button"
            onClick={() => setShowNewVesselModal(true)}
            className="w-full rounded-xl border-2 border-dashed border-outline-variant/40 p-4 flex items-center justify-center gap-2 text-on-surface-variant text-sm font-semibold hover:bg-surface-container-low hover:border-primary/30 transition-all mb-10"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Register New Vessel
          </button>
        )}

        {/* Location */}
        <div className="mb-4 relative">
          <label className="text-sm font-semibold text-on-surface block mb-2">
            Service Location
          </label>
          <div className="relative flex items-center gap-2">
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                location_on
              </span>
              <input
                type="text"
                value={locationSearch}
                onChange={(e) => {
                  setLocationSearch(e.target.value);
                  setShowLocationDropdown(true);
                  if (!e.target.value.trim()) {
                    updateFormData({
                      locationId: null,
                      locationName: '',
                      locationLat: null,
                      locationLng: null,
                    });
                  }
                }}
                onFocus={() => setShowLocationDropdown(true)}
                placeholder="Search marinas, ports..."
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl pl-10 pr-4 py-3 text-on-surface text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Location Dropdown */}
          {showLocationDropdown && !loadingLocations && filteredLocations.length > 0 && (
            <div className="absolute left-0 right-12 mt-1 bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
              {filteredLocations.map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => selectLocation(loc)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-surface-container-low transition-colors border-b border-outline-variant/10 last:border-b-0 ${
                    formData.locationId === loc.id ? 'bg-primary-fixed' : ''
                  }`}
                >
                  <span className="material-symbols-outlined text-primary text-lg flex-shrink-0">
                    {loc.type === 'marina'
                      ? 'anchor'
                      : loc.type === 'port'
                      ? 'directions_boat'
                      : loc.type === 'bay'
                      ? 'water'
                      : 'location_on'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-on-surface truncate">
                      {loc.name}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      {[loc.region, loc.country].filter(Boolean).join(', ')}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Berth Info */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-on-surface block mb-2">
            Berth / Dock Information
          </label>
          <input
            type="text"
            value={formData.berthInfo}
            onChange={(e) => updateFormData({ berthInfo: e.target.value })}
            placeholder="e.g. Berth A-12, East Dock"
            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        {/* Map Placeholder */}
        <div className="aspect-[16/10] bg-surface-container-highest rounded-xl overflow-hidden relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <span
                className="material-symbols-outlined text-primary text-4xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                location_on
              </span>
              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                {formData.locationName || 'Select a location'}
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/20">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push('/request')}
            className="text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>
            Back
          </button>
          <button
            type="button"
            onClick={() => router.push('/request/step-3')}
            className="bg-primary text-on-primary px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all active:scale-95 flex items-center gap-2"
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

      {showNewVesselModal && (
        <NewVesselModal
          onClose={() => setShowNewVesselModal(false)}
          onCreated={(vessel) => {
            setVessels((prev) => [...prev, vessel]);
            selectVessel(vessel);
            setShowNewVesselModal(false);
          }}
        />
      )}
    </>
  );
}
