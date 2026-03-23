import NavWrapper from "@/components/NavWrapper";
import ConciergeFAB from "@/components/ConciergeFAB";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export const revalidate = 60;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getProvider(slug: string): Promise<any | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("providers")
    .select(`
      *,
      provider_services (
        id,
        description,
        price_min,
        price_max,
        currency,
        emergency_available,
        service_categories (
          name,
          slug,
          icon
        )
      ),
      provider_coverage (
        radius_km,
        is_primary,
        locations (
          name,
          slug,
          country,
          region
        )
      ),
      provider_certifications (
        id,
        name,
        issuer
      )
    `)
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data;
}

export default async function ProviderProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const provider = await getProvider(id);

  if (!provider) {
    notFound();
  }

  const isVerified =
    provider.verification_status === "verified" ||
    provider.verification_status === "premium";
  const isPremium = provider.verification_status === "premium";

  const coverageLocations =
    provider.provider_coverage
      ?.map((pc: { locations: { name: string } | null }) => pc.locations?.name)
      .filter(Boolean) || [];

  return (
    <>
      <NavWrapper />

      <main className="pt-16 pb-32">
        {/* Hero */}
        <section className="relative h-[400px] md:h-[530px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-primary-container" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/80" />
          <div className="relative h-full container mx-auto px-6 flex flex-col justify-end pb-12">
            <div className="flex items-start gap-6">
              <div className="h-20 w-20 md:h-32 md:w-32 rounded-xl bg-surface-container-lowest p-2 shadow-2xl shrink-0">
                <div className="w-full h-full bg-primary flex items-center justify-center rounded-lg">
                  <span className="material-symbols-outlined text-on-primary text-4xl md:text-5xl">
                    sailing
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {isVerified && (
                    <span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded">
                      {isPremium ? "Premium" : "Verified"}
                    </span>
                  )}
                  {provider.avg_response_time_minutes &&
                    provider.avg_response_time_minutes <= 30 && (
                      <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded">
                        Fast Responder
                      </span>
                    )}
                </div>
                <h1 className="font-[family-name:var(--font-headline)] text-3xl md:text-6xl text-white font-bold tracking-tight leading-none">
                  {provider.business_name}
                </h1>
                <div className="flex items-center gap-2 text-white/90">
                  <span
                    className="material-symbols-outlined text-secondary-fixed-dim"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="font-bold text-lg">
                    {Number(provider.avg_rating).toFixed(1)}
                  </span>
                  <span className="text-sm opacity-60">
                    ({provider.total_reviews} Reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main */}
          <div className="lg:col-span-8 space-y-16">
            {/* About */}
            <section>
              <h2 className="font-[family-name:var(--font-headline)] text-3xl text-primary mb-6 tracking-tight">
                About Us
              </h2>
              <div className="bg-surface-container-low p-8 rounded-xl relative overflow-hidden">
                <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl relative z-10">
                  {provider.description}
                </p>
                {coverageLocations.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2 relative z-10">
                    {coverageLocations.map((loc: string) => (
                      <span
                        key={loc}
                        className="bg-surface-container-lowest px-3 py-1 rounded-full text-xs font-semibold text-on-surface-variant"
                      >
                        {loc}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Services */}
            {provider.provider_services?.length > 0 && (
              <section>
                <h2 className="font-[family-name:var(--font-headline)] text-3xl text-primary mb-6 tracking-tight">
                  Services Offered
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {provider.provider_services.map(
                    (service: {
                      id: string;
                      description: string | null;
                      price_min: number | null;
                      price_max: number | null;
                      currency: string;
                      emergency_available: boolean;
                      service_categories: { name: string; icon: string | null } | null;
                    }) => (
                      <div
                        key={service.id}
                        className="bg-surface-container-lowest p-6 rounded-xl ledger-shadow flex gap-4"
                      >
                        <div className="h-12 w-12 rounded bg-primary-container flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-white">
                            {service.service_categories?.icon || "build"}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-primary mb-1">
                            {service.service_categories?.name}
                          </h3>
                          {service.description && (
                            <p className="text-sm text-on-surface-variant">
                              {service.description}
                            </p>
                          )}
                          {service.price_min && service.price_max && (
                            <p className="text-xs text-on-tertiary-container font-semibold mt-2">
                              {service.currency} {service.price_min} - {service.price_max}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </section>
            )}

            {/* Stats */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: provider.total_jobs, label: "Jobs Completed" },
                { value: `${provider.avg_response_time_minutes || "—"}m`, label: "Avg Response" },
                { value: `${Number(provider.completion_rate).toFixed(0)}%`, label: "Completion" },
                { value: provider.team_size || "—", label: "Team Size" },
              ].map((stat) => (
                <div key={stat.label} className="bg-surface-container-low p-6 rounded-xl text-center">
                  <p className="text-2xl font-[family-name:var(--font-headline)] font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* CTA */}
            <div className="bg-primary p-8 rounded-xl text-center">
              <h3 className="font-[family-name:var(--font-headline)] text-xl text-white mb-3">
                Need this service?
              </h3>
              <p className="text-on-primary-container text-sm mb-6">
                Get a quote from {provider.business_name}
              </p>
              <Link
                href="/request"
                className="block w-full py-4 bg-tertiary-fixed text-on-tertiary-fixed font-bold rounded-lg hover:bg-tertiary-fixed-dim transition-colors text-center"
              >
                Request Quote
              </Link>
            </div>

            {/* Contact */}
            <div className="bg-surface-container-low p-6 rounded-xl space-y-4">
              <h3 className="font-[family-name:var(--font-headline)] text-lg text-primary mb-2">
                Contact
              </h3>
              {provider.languages?.length > 0 && (
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant text-sm">translate</span>
                  <span className="text-sm text-on-surface-variant">{provider.languages.join(", ")}</span>
                </div>
              )}
              {provider.founded_year && (
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant text-sm">calendar_month</span>
                  <span className="text-sm text-on-surface-variant">Est. {provider.founded_year}</span>
                </div>
              )}
              {provider.availability === "available" && (
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-on-surface-variant font-medium">Currently Available</span>
                </div>
              )}
            </div>

            {/* Certifications */}
            {provider.provider_certifications?.length > 0 && (
              <section className="bg-primary-container p-8 rounded-xl text-white overflow-hidden relative">
                <div className="relative z-10">
                  <h3 className="font-[family-name:var(--font-headline)] text-xl mb-4">
                    Certifications
                  </h3>
                  <ul className="space-y-3 text-sm text-on-primary-container">
                    {provider.provider_certifications.map(
                      (cert: { id: string; name: string; issuer: string | null }) => (
                        <li key={cert.id} className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-tertiary-fixed text-lg">
                            check_circle
                          </span>
                          {cert.name}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-8xl opacity-10 text-white">
                  verified
                </span>
              </section>
            )}
          </div>
        </div>
      </main>

      <ConciergeFAB />
    </>
  );
}
