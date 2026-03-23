"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

const vesselTypes = [
  { value: "sailing_yacht", label: "Sailing Yacht" },
  { value: "motor_yacht", label: "Motor Yacht" },
  { value: "catamaran", label: "Catamaran" },
  { value: "superyacht", label: "Superyacht" },
  { value: "rib", label: "RIB" },
  { value: "powerboat", label: "Powerboat" },
  { value: "trawler", label: "Trawler" },
  { value: "other", label: "Other" },
];

const hullMaterials = [
  { value: "fiberglass", label: "Fiberglass / GRP" },
  { value: "steel", label: "Steel" },
  { value: "aluminum", label: "Aluminium" },
  { value: "wood", label: "Wood" },
  { value: "carbon", label: "Carbon Fibre" },
  { value: "other", label: "Other" },
];

const propulsionTypes = [
  { value: "sail", label: "Sail" },
  { value: "single_engine", label: "Single Engine" },
  { value: "twin_engine", label: "Twin Engine" },
  { value: "other", label: "Other" },
];

export default function EditVesselPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [flag, setFlag] = useState("");
  const [lengthMeters, setLengthMeters] = useState("");
  const [draftMeters, setDraftMeters] = useState("");
  const [beamMeters, setBeamMeters] = useState("");
  const [mastHeight, setMastHeight] = useState("");
  const [tonnage, setTonnage] = useState("");
  const [hullMaterial, setHullMaterial] = useState("");
  const [propulsion, setPropulsion] = useState("");
  const [imoNumber, setImoNumber] = useState("");

  useEffect(() => {
    async function fetchVessel() {
      const supabase = createClient();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any).from("vessels").select("*").eq("id", id).single();
      if (error || !data) {
        router.push("/vessels");
        return;
      }
      setName(data.name || "");
      setType(data.type || "");
      setManufacturer(data.manufacturer || "");
      setModel(data.model || "");
      setYear(data.year?.toString() || "");
      setFlag(data.flag || "");
      setLengthMeters(data.length_meters?.toString() || "");
      setDraftMeters(data.draft_meters?.toString() || "");
      setBeamMeters(data.beam_meters?.toString() || "");
      setMastHeight(data.mast_height_meters?.toString() || "");
      setTonnage(data.tonnage?.toString() || "");
      setHullMaterial(data.hull_material || "");
      setPropulsion(data.propulsion || "");
      setImoNumber(data.imo_number || "");
      setFetching(false);
    }
    fetchVessel();
  }, [id, router]);

  const isSailingType = type === "sailing_yacht" || type === "catamaran";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: updateError } = await (supabase as any).from("vessels").update({
        name,
        type: type || null,
        manufacturer: manufacturer || null,
        model: model || null,
        year: year ? parseInt(year) : null,
        flag: flag || null,
        length_meters: lengthMeters ? parseFloat(lengthMeters) : null,
        draft_meters: draftMeters ? parseFloat(draftMeters) : null,
        beam_meters: beamMeters ? parseFloat(beamMeters) : null,
        mast_height_meters: mastHeight ? parseFloat(mastHeight) : null,
        tonnage: tonnage ? parseFloat(tonnage) : null,
        hull_material: hullMaterial || null,
        propulsion: propulsion || null,
        imo_number: imoNumber || null,
      }).eq("id", id);

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }

      router.push("/vessels");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from("vessels").delete().eq("id", id);
    router.push("/vessels");
  }

  if (fetching) {
    return (
      <main className="pt-20 pb-32 container mx-auto px-6 max-w-2xl">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-surface-container-high rounded-lg w-48" />
          <div className="h-6 bg-surface-container-high rounded w-72" />
          <div className="h-96 bg-surface-container-high rounded-2xl" />
        </div>
      </main>
    );
  }

  const inputCls = "w-full bg-surface-container-low border-b-2 border-outline-variant/20 focus:border-primary rounded-t-lg px-4 py-4 text-sm outline-none transition-all focus:bg-surface-container-lowest";
  const labelCls = "block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2";

  return (
    <main className="pt-20 pb-32 container mx-auto px-6 max-w-2xl">
      <Link href="/vessels" className="inline-flex items-center gap-1 text-xs text-on-surface-variant hover:text-primary transition-colors mb-6">
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Back to Vessels
      </Link>

      <h1 className="font-[family-name:var(--font-headline)] text-4xl text-primary tracking-tight font-bold mb-2">
        Edit Vessel
      </h1>
      <p className="text-on-surface-variant text-sm mb-8">{name}</p>

      {error && (
        <div className="mb-6 p-3 rounded-lg bg-error-container/30 border border-error/20">
          <p className="text-on-error-container text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-error text-lg">error</span>
            {error}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <section className="bg-surface-container-lowest rounded-2xl p-8 space-y-6">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">info</span>
            Basic Information
          </h2>
          <div>
            <label className={labelCls}>Vessel Name *</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="e.g. Sea Breeze" type="text" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelCls}>Vessel Type *</label>
              <select required value={type} onChange={(e) => setType(e.target.value)} className={inputCls}>
                <option value="">Select type</option>
                {vesselTypes.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Flag</label>
              <input value={flag} onChange={(e) => setFlag(e.target.value)} className={inputCls} placeholder="e.g. Cyprus" type="text" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelCls}>Manufacturer</label>
              <input value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} className={inputCls} placeholder="e.g. Beneteau" type="text" />
            </div>
            <div>
              <label className={labelCls}>Model</label>
              <input value={model} onChange={(e) => setModel(e.target.value)} className={inputCls} placeholder="e.g. Oceanis 46.1" type="text" />
            </div>
            <div>
              <label className={labelCls}>Year</label>
              <input value={year} onChange={(e) => setYear(e.target.value)} className={inputCls} placeholder="e.g. 2022" type="number" min="1900" max="2030" />
            </div>
          </div>
        </section>

        {/* Dimensions */}
        <section className="bg-surface-container-lowest rounded-2xl p-8 space-y-6">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">straighten</span>
            Dimensions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label className={labelCls}>LOA (meters)</label>
              <input value={lengthMeters} onChange={(e) => setLengthMeters(e.target.value)} className={inputCls} placeholder="e.g. 14.2" type="number" step="0.1" min="1" />
            </div>
            <div>
              <label className={labelCls}>Draft (meters)</label>
              <input value={draftMeters} onChange={(e) => setDraftMeters(e.target.value)} className={inputCls} placeholder="e.g. 2.1" type="number" step="0.1" min="0.1" />
            </div>
            <div>
              <label className={labelCls}>Beam (meters)</label>
              <input value={beamMeters} onChange={(e) => setBeamMeters(e.target.value)} className={inputCls} placeholder="e.g. 4.5" type="number" step="0.1" min="0.5" />
            </div>
            {isSailingType && (
              <div>
                <label className={labelCls}>Mast Height (m)</label>
                <input value={mastHeight} onChange={(e) => setMastHeight(e.target.value)} className={inputCls} placeholder="e.g. 21.5" type="number" step="0.1" min="1" />
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className={labelCls}>Tonnage</label>
              <input value={tonnage} onChange={(e) => setTonnage(e.target.value)} className={inputCls} placeholder="e.g. 12.5" type="number" step="0.1" min="0.1" />
            </div>
            <div>
              <label className={labelCls}>IMO Number</label>
              <input value={imoNumber} onChange={(e) => setImoNumber(e.target.value)} className={inputCls} placeholder="Optional" type="text" />
            </div>
          </div>
        </section>

        {/* Technical */}
        <section className="bg-surface-container-lowest rounded-2xl p-8 space-y-6">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">build</span>
            Technical Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelCls}>Hull Material</label>
              <select value={hullMaterial} onChange={(e) => setHullMaterial(e.target.value)} className={inputCls}>
                <option value="">Select material</option>
                {hullMaterials.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Propulsion</label>
              <select value={propulsion} onChange={(e) => setPropulsion(e.target.value)} className={inputCls}>
                <option value="">Select propulsion</option>
                {propulsionTypes.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-primary text-on-primary py-4 rounded-lg font-bold uppercase tracking-widest text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>

        {/* Delete */}
        <div className="pt-4 border-t border-outline-variant/10">
          {!deleteConfirm ? (
            <button
              type="button"
              onClick={() => setDeleteConfirm(true)}
              className="text-xs text-error font-semibold hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
              Remove this vessel
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <p className="text-xs text-error">Are you sure?</p>
              <button type="button" onClick={handleDelete} className="text-xs bg-error text-white px-3 py-1 rounded font-bold">
                Yes, delete
              </button>
              <button type="button" onClick={() => setDeleteConfirm(false)} className="text-xs text-on-surface-variant hover:underline">
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>
    </main>
  );
}
