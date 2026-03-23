import NavWrapper from "@/components/NavWrapper";
import ConciergeFAB from "@/components/ConciergeFAB";
import { createClient } from "@/lib/supabase/server";
import DiscoverClient from "./DiscoverClient";

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

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; emergency?: string; rating?: string }>;
}) {
  const { search } = await searchParams;
  const [providers, locations] = await Promise.all([
    getProviders(),
    getLocations(),
  ]);

  return (
    <>
      <NavWrapper />

      <main className="pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
        <DiscoverClient
          providers={providers}
          locations={locations}
          initialSearch={search}
        />
      </main>

      <ConciergeFAB />
    </>
  );
}
