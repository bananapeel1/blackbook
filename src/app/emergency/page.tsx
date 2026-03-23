import NavWrapper from '@/components/NavWrapper';
import ConciergeFAB from '@/components/ConciergeFAB';
import { createClient } from '@/lib/supabase/server';
import EmergencyClient from './EmergencyClient';

export const revalidate = 60;

async function getLocations() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('locations')
    .select('id, name, slug, country, region')
    .order('name');
  return data || [];
}

async function getCategories() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('service_categories')
    .select('id, slug')
    .is('parent_id', null)
    .order('sort_order', { ascending: true });
  return data || [];
}

export default async function EmergencyPage() {
  const [locations, categories] = await Promise.all([
    getLocations(),
    getCategories(),
  ]);

  return (
    <>
      <NavWrapper />

      <EmergencyClient locations={locations} categories={categories} />

      <ConciergeFAB />
    </>
  );
}
