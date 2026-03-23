import TopAppBar from "@/components/TopAppBar";
import ConciergeFAB from "@/components/ConciergeFAB";
import Link from "next/link";

const vessels = [
  {
    name: "M/Y Serenity",
    specs: "Benetti 45m | 2019 | Flag: Malta",
    selected: true,
  },
  {
    name: "S/Y Azure",
    specs: "Oyster 885 | 2021 | Flag: Cayman Islands",
    selected: false,
  },
];

export default function RequestStep2Page() {
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
              style={{ width: "50%" }}
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
        <div className="space-y-3 mb-4">
          {vessels.map((vessel) => (
            <div
              key={vessel.name}
              className={`flex items-center gap-4 rounded-xl p-4 cursor-pointer transition-all duration-200 border ${
                vessel.selected
                  ? "bg-primary-fixed border-primary shadow-sm"
                  : "bg-surface-container-low border-outline-variant/20 hover:bg-surface-container-high"
              }`}
            >
              {/* Thumbnail placeholder */}
              <div
                className={`w-16 h-16 rounded-lg flex-shrink-0 ${
                  vessel.selected
                    ? "bg-primary-container"
                    : "bg-surface-container-high"
                }`}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-[family-name:var(--font-headline)] font-bold text-primary text-lg">
                  {vessel.name}
                </h3>
                <p className="text-on-surface-variant text-xs truncate">
                  {vessel.specs}
                </p>
              </div>
              {vessel.selected ? (
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
            </div>
          ))}
        </div>

        {/* Register New Vessel */}
        <button className="w-full rounded-xl border-2 border-dashed border-outline-variant/40 p-4 flex items-center justify-center gap-2 text-on-surface-variant text-sm font-semibold hover:bg-surface-container-low hover:border-primary/30 transition-all mb-10">
          <span className="material-symbols-outlined text-lg">add</span>
          Register New Vessel
        </button>

        {/* Location */}
        <div className="mb-4">
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
                defaultValue="Port de Saint-Tropez"
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl pl-10 pr-4 py-3 text-on-surface text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <button className="w-12 h-12 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-center text-primary hover:bg-surface-container-high transition-all flex-shrink-0">
              <span className="material-symbols-outlined">my_location</span>
            </button>
          </div>
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
                Port de Saint-Tropez
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/20">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/request"
            className="text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>
            Back
          </Link>
          <Link
            href="/request/step-3"
            className="bg-primary text-on-primary px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all active:scale-95 flex items-center gap-2"
          >
            Next Step
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </Link>
        </div>
        <div className="h-1 bg-gradient-to-r from-primary via-tertiary-fixed to-primary-fixed" />
      </div>

      <ConciergeFAB />
    </>
  );
}
