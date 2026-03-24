'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import SaveProviderButton from '@/components/SaveProviderButton';

export default function DiscoverClient({
  providers: initialProviders,
  locations,
  initialSearch,
}: {
  providers: any[];
  locations: any[];
  initialSearch?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState(initialSearch || '');
  const [emergencyOnly, setEmergencyOnly] = useState(searchParams.get('emergency') === '1');
  const [ratingFilter, setRatingFilter] = useState(searchParams.get('rating') === '1');
  const [showMapPlaceholder, setShowMapPlaceholder] = useState(false);

  // Debounced search value for URL sync
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery]);

  // Sync filter state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (emergencyOnly) params.set('emergency', '1');
    if (ratingFilter) params.set('rating', '1');
    const qs = params.toString();
    router.replace(`${pathname}${qs ? '?' + qs : ''}`, { scroll: false });
  }, [debouncedSearch, emergencyOnly, ratingFilter, router, pathname]);

  const filteredProviders = useMemo(() => {
    let result = initialProviders;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => {
        const nameMatch = p.business_name?.toLowerCase().includes(q);
        const descMatch = p.description?.toLowerCase().includes(q);
        const serviceMatch = p.provider_services?.some(
          (ps: any) =>
            ps.service_categories?.name?.toLowerCase().includes(q) ||
            ps.description?.toLowerCase().includes(q)
        );
        return nameMatch || descMatch || serviceMatch;
      });
    }

    // Emergency filter
    if (emergencyOnly) {
      result = result.filter((p) => p.emergency_available);
    }

    // Rating filter (4.5+)
    if (ratingFilter) {
      result = result.filter((p) => Number(p.avg_rating) >= 4.5);
    }

    return result;
  }, [initialProviders, searchQuery, emergencyOnly, ratingFilter]);

  return (
    <>
      {/* Context & Toggle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-1">
          <p className="text-on-tertiary-container text-xs font-bold uppercase tracking-widest">
            Global Discovery
          </p>
          <h1 className="font-[family-name:var(--font-headline)] text-3xl md:text-5xl font-extrabold text-primary tracking-tight leading-none">
            Eastern Mediterranean
          </h1>
          <p className="text-on-surface-variant">
            Showing {filteredProviders.length} verified providers across{' '}
            {locations.length} locations.
          </p>
        </div>
        <div className="flex items-center bg-surface-container-low p-1 rounded-xl w-fit">
          <button
            onClick={() => setShowMapPlaceholder(false)}
            className={`px-6 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
              !showMapPlaceholder
                ? 'bg-surface-container-lowest shadow-sm text-primary font-semibold'
                : 'text-on-surface-variant font-medium hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-lg">list</span>
            List
          </button>
          <button
            onClick={() => setShowMapPlaceholder(true)}
            className={`px-6 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
              showMapPlaceholder
                ? 'bg-surface-container-lowest shadow-sm text-primary font-semibold'
                : 'text-on-surface-variant font-medium hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-lg">map</span>
            Map
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <div className="md:col-span-2 bg-surface-container-low rounded-xl p-4 flex items-center gap-4 hover:bg-surface-container-high transition-all">
          <span className="material-symbols-outlined text-on-surface-variant">
            search
          </span>
          <input
            className="bg-transparent border-none focus:ring-0 w-full text-on-surface placeholder:text-outline/60 font-medium outline-none"
            placeholder="Search yacht detailing, engine repair..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          onClick={() => setEmergencyOnly((prev) => !prev)}
          className={`bg-surface-container-low rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-surface-container-high transition-all ${
            emergencyOnly ? 'ring-2 ring-primary' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-on-surface-variant">
              bolt
            </span>
            <span className="text-sm font-semibold text-on-surface">
              {emergencyOnly ? 'Emergency Only' : 'Urgency'}
            </span>
          </div>
          <span className="material-symbols-outlined text-outline">
            {emergencyOnly ? 'check' : 'expand_more'}
          </span>
        </button>
        <button
          onClick={() => setRatingFilter((prev) => !prev)}
          className={`bg-surface-container-low rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-surface-container-high transition-all ${
            ratingFilter ? 'ring-2 ring-primary' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-on-surface-variant">
              star
            </span>
            <span className="text-sm font-semibold text-on-surface">
              Rating 4.5+
            </span>
          </div>
          <span className="material-symbols-outlined text-outline">
            {ratingFilter ? 'check' : 'expand_more'}
          </span>
        </button>
      </section>

      {/* Map placeholder */}
      {showMapPlaceholder ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-surface-container-low rounded-2xl">
          <div className="bg-secondary-container w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-primary text-4xl">
              map
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-primary mb-2">
            Map Coming Soon
          </h2>
          <p className="text-on-surface-variant text-sm max-w-md">
            We&apos;re working on an interactive map to help you discover providers by location. Stay tuned!
          </p>
        </div>
      ) : (
        /* Provider List */
        <div className="space-y-6 stagger-children">
          {filteredProviders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="material-symbols-outlined text-on-surface-variant text-4xl mb-4">
                search_off
              </span>
              <p className="text-on-surface-variant text-sm">
                No providers match your filters. Try adjusting your search.
              </p>
            </div>
          ) : (
            filteredProviders.map((provider) => {
              const primaryService = provider.provider_services?.[0];
              const categoryName =
                primaryService?.service_categories?.name || 'Marine Services';

              const coverageLocations =
                provider.provider_coverage
                  ?.map(
                    (pc: { locations: { name: string } | null }) =>
                      pc.locations?.name
                  )
                  .filter(Boolean)
                  .slice(0, 2)
                  .join(', ') || 'Eastern Med';

              const isVerified =
                provider.verification_status === 'verified' ||
                provider.verification_status === 'premium';
              const isPremium = provider.verification_status === 'premium';
              const isAvailable = provider.availability === 'available';

              return (
                <Link
                  key={provider.id}
                  href={`/provider/${provider.slug}`}
                  className="group relative bg-surface-container-low rounded-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-500 hover:shadow-2xl hover:shadow-primary-container/5 block card-hover"
                >
                  <div className="w-full md:w-72 h-48 md:h-auto overflow-hidden relative bg-primary-container/20">
                    {isPremium && (
                      <div className="absolute top-4 left-4 flex gap-2 z-10">
                        <span className="bg-primary/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          Premium
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 z-10">
                      <SaveProviderButton providerId={provider.id} size="sm" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary-container/40 text-6xl">
                        sailing
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-primary">
                            {provider.business_name}
                          </h3>
                          <p className="text-on-tertiary-container font-medium text-sm">
                            {categoryName} &bull; {coverageLocations}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-1 text-primary">
                            <span className="font-bold">
                              {Number(provider.avg_rating).toFixed(1)}
                            </span>
                            <span
                              className="material-symbols-outlined text-sm"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              star
                            </span>
                          </div>
                          <span className="text-[10px] text-outline uppercase font-bold tracking-tighter">
                            {provider.total_reviews} Reviews
                          </span>
                        </div>
                      </div>
                      {provider.description && (
                        <p className="text-on-surface-variant text-sm mt-2 line-clamp-2">
                          {provider.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {isVerified && (
                          <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                            <span
                              className="material-symbols-outlined text-xs"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              verified
                            </span>
                            {isPremium ? 'Premium' : 'Verified'}
                          </span>
                        )}
                        {provider.avg_response_time_minutes &&
                          provider.avg_response_time_minutes <= 30 && (
                            <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                              <span className="material-symbols-outlined text-xs">
                                timer
                              </span>
                              Fast Responder
                            </span>
                          )}
                        {provider.emergency_available && (
                          <span className="bg-error-container text-on-error-container px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">
                              notification_important
                            </span>
                            Emergency
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-8 flex items-center justify-between border-t border-outline-variant/20 pt-6">
                      {isAvailable ? (
                        <div className="flex items-center gap-2 text-on-surface-variant font-medium text-xs">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          Available now
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-on-surface-variant text-xs">
                          <span className="material-symbols-outlined text-sm">
                            language
                          </span>
                          {provider.languages?.join(', ')}
                        </div>
                      )}
                      <span className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold text-sm tracking-tight hover:bg-primary-container transition-all active:scale-95">
                        Request Quote
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      )}
    </>
  );
}
