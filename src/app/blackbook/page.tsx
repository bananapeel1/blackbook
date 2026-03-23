import { redirect } from 'next/navigation';
import Link from 'next/link';
import NavWrapper from '@/components/NavWrapper';
import ConciergeFAB from '@/components/ConciergeFAB';
import SaveProviderButton from '@/components/SaveProviderButton';
import { getAuthUser } from '@/lib/supabase/auth-helpers';
import { createClient } from '@/lib/supabase/server';

export const revalidate = 0; // always fresh for user-specific data

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getSavedProviders(userId: string): Promise<any[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('saved_providers')
    .select(`
      id,
      created_at,
      providers (
        id,
        business_name,
        slug,
        description,
        avg_rating,
        total_reviews,
        verification_status,
        availability,
        emergency_available,
        avg_response_time_minutes,
        languages,
        provider_services (
          id,
          description,
          price_min,
          price_max,
          service_categories (
            name,
            slug,
            icon
          )
        ),
        provider_coverage (
          locations (
            name,
            slug,
            country
          )
        )
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching saved providers:', error);
    return [];
  }

  return data || [];
}

export default async function BlackbookPage() {
  const authUser = await getAuthUser();

  if (!authUser) {
    redirect('/login');
  }

  const savedProviders = await getSavedProviders(authUser.id);

  return (
    <>
      <NavWrapper />

      <main className="pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-on-tertiary-container text-xs font-bold uppercase tracking-widest">
            Your Network
          </p>
          <h1 className="font-[family-name:var(--font-headline)] text-3xl md:text-5xl font-extrabold text-primary tracking-tight leading-none">
            My Blackbook
          </h1>
          <p className="text-on-surface-variant mt-1">
            Your trusted providers &mdash; {savedProviders.length} saved
          </p>
        </div>

        {/* Content */}
        {savedProviders.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center bg-surface-container-low rounded-2xl">
            <div className="bg-secondary-container w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-4xl">
                bookmark
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-primary mb-2">
              No Saved Providers Yet
            </h2>
            <p className="text-on-surface-variant text-sm max-w-md mb-8">
              Start building your blackbook by saving providers you trust.
              Browse the marketplace to find verified marine service providers.
            </p>
            <Link
              href="/discover"
              className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold text-sm tracking-tight hover:bg-primary-container transition-all active:scale-95"
            >
              Discover Providers
            </Link>
          </div>
        ) : (
          /* Saved Provider List */
          <div className="space-y-6">
            {savedProviders.map((saved) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const provider = saved.providers as any;
              if (!provider) return null;

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
                <div
                  key={saved.id}
                  className="group relative bg-surface-container-low rounded-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-500 hover:shadow-2xl hover:shadow-primary-container/5"
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
                      <SaveProviderButton
                        providerId={provider.id}
                        size="sm"
                      />
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
                              style={{
                                fontVariationSettings: "'FILL' 1",
                              }}
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
                              style={{
                                fontVariationSettings: "'FILL' 1",
                              }}
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
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/provider/${provider.slug}`}
                          className="text-primary font-semibold text-sm hover:underline"
                        >
                          View Profile
                        </Link>
                        <Link
                          href="/request"
                          className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold text-sm tracking-tight hover:bg-primary-container transition-all active:scale-95"
                        >
                          Request Quote
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <ConciergeFAB />
    </>
  );
}
