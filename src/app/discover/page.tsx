import TopAppBar from "@/components/TopAppBar";
import BottomNav from "@/components/BottomNav";
import ConciergeFAB from "@/components/ConciergeFAB";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60; // revalidate every 60 seconds

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getProviders(): Promise<any[]> {
  const supabase = await createClient();

  const { data: providers, error } = await supabase
    .from("providers")
    .select(`
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
    `)
    .order("avg_rating", { ascending: false })
    .limit(20);

  if (error) {
    console.error("Error fetching providers:", error);
    return [];
  }

  return providers || [];
}

async function getLocations() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("locations")
    .select("id, name, slug, country, region")
    .order("name");
  return data || [];
}

export default async function DiscoverPage() {
  const [providers, locations] = await Promise.all([
    getProviders(),
    getLocations(),
  ]);

  return (
    <>
      <TopAppBar />

      <main className="pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
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
              Showing {providers.length} verified providers across{" "}
              {locations.length} locations.
            </p>
          </div>
          <div className="flex items-center bg-surface-container-low p-1 rounded-xl w-fit">
            <button className="px-6 py-2 rounded-lg bg-surface-container-lowest shadow-sm text-primary font-semibold text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">list</span>
              List
            </button>
            <button className="px-6 py-2 rounded-lg text-on-surface-variant font-medium text-sm flex items-center gap-2 hover:bg-surface-container-high transition-colors">
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
            />
          </div>
          <div className="bg-surface-container-low rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-surface-container-high">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-on-surface-variant">
                bolt
              </span>
              <span className="text-sm font-semibold text-on-surface">
                Urgency
              </span>
            </div>
            <span className="material-symbols-outlined text-outline">
              expand_more
            </span>
          </div>
          <div className="bg-surface-container-low rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-surface-container-high">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-on-surface-variant">
                star
              </span>
              <span className="text-sm font-semibold text-on-surface">
                Rating 4.5+
              </span>
            </div>
            <span className="material-symbols-outlined text-outline">
              expand_more
            </span>
          </div>
        </section>

        {/* Provider List */}
        <div className="space-y-6">
          {providers.map((provider) => {
            // Get primary service category
            const primaryService = provider.provider_services?.[0];
            const categoryName =
              primaryService?.service_categories?.name || "Marine Services";

            // Get coverage locations
            const coverageLocations =
              provider.provider_coverage
                ?.map((pc: { locations: { name: string } | null }) => pc.locations?.name)
                .filter(Boolean)
                .slice(0, 2)
                .join(", ") || "Eastern Med";

            const isVerified =
              provider.verification_status === "verified" ||
              provider.verification_status === "premium";
            const isPremium = provider.verification_status === "premium";
            const isAvailable = provider.availability === "available";

            return (
              <Link
                key={provider.id}
                href={`/provider/${provider.slug}`}
                className="group relative bg-surface-container-low rounded-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-500 hover:shadow-2xl hover:shadow-primary-container/5 block"
              >
                <div className="w-full md:w-72 h-48 md:h-auto overflow-hidden relative bg-primary-container/20">
                  {isPremium && (
                    <div className="absolute top-4 left-4 flex gap-2 z-10">
                      <span className="bg-primary/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        Premium
                      </span>
                    </div>
                  )}
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
                          {isPremium ? "Premium" : "Verified"}
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
                        {provider.languages?.join(", ")}
                      </div>
                    )}
                    <span className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold text-sm tracking-tight hover:bg-primary-container transition-all active:scale-95">
                      Request Quote
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <ConciergeFAB />
      <BottomNav />
    </>
  );
}
