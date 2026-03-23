import NavWrapper from "@/components/NavWrapper";
import ConciergeFAB from "@/components/ConciergeFAB";
import Link from "next/link";
import { getVesselsForUser } from "@/lib/supabase/queries";

export default async function VesselsPage() {
  const vessels = await getVesselsForUser();

  return (
    <>
      <NavWrapper />
      <main className="pt-20 pb-32 container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-[family-name:var(--font-headline)] text-4xl md:text-5xl text-primary tracking-tight font-bold">
              My Vessels
            </h1>
            <p className="text-on-surface-variant text-sm mt-2">
              Manage your fleet and vessel specifications
            </p>
          </div>
          <Link
            href="/vessels/new"
            className="bg-primary text-on-primary px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Add Vessel
          </Link>
        </div>

        {vessels.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-2xl p-16 text-center">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-surface-container-high flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-outline text-4xl">sailing</span>
            </div>
            <h3 className="font-[family-name:var(--font-headline)] text-2xl text-primary mb-3">No vessels yet</h3>
            <p className="text-on-surface-variant text-sm max-w-md mx-auto mb-6">
              Add your vessel details to get personalised marina recommendations and smart service matching.
            </p>
            <Link
              href="/vessels/new"
              className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Add Your First Vessel
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vessels.map((vessel: any) => (
              <Link
                key={vessel.id}
                href={`/vessels/${vessel.id}/edit`}
                className="bg-surface-container-lowest rounded-2xl p-6 ledger-shadow hover:scale-[1.02] transition-transform group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-primary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-2xl">
                      {vessel.type === 'sailing_yacht' || vessel.type === 'catamaran' ? 'sailing' : 'directions_boat'}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
                    edit
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-headline)] text-xl text-primary font-bold mb-1">
                  {vessel.name}
                </h3>
                {vessel.manufacturer && (
                  <p className="text-sm text-on-surface-variant">
                    {vessel.manufacturer} {vessel.model} {vessel.year ? `(${vessel.year})` : ''}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap gap-3">
                  {vessel.length_meters && (
                    <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant bg-surface-container-low px-2 py-1 rounded">
                      {vessel.length_meters}m LOA
                    </span>
                  )}
                  {vessel.draft_meters && (
                    <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant bg-surface-container-low px-2 py-1 rounded">
                      {vessel.draft_meters}m draft
                    </span>
                  )}
                  {vessel.beam_meters && (
                    <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant bg-surface-container-low px-2 py-1 rounded">
                      {vessel.beam_meters}m beam
                    </span>
                  )}
                  {vessel.flag && (
                    <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant bg-surface-container-low px-2 py-1 rounded">
                      {vessel.flag}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <ConciergeFAB />
    </>
  );
}
