import TopAppBar from "@/components/TopAppBar";
import ConciergeFAB from "@/components/ConciergeFAB";
import Link from "next/link";

export default function RequestStep4Page() {
  return (
    <>
      <TopAppBar />

      <main className="pt-20 pb-32 px-4 md:px-8 max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-on-secondary-container">
              Step 4 of 4
            </span>
            <span className="text-xs font-semibold text-on-surface-variant">
              Review &amp; Submit
            </span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        {/* Section Title */}
        <h1 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-primary tracking-tight mb-2">
          Review your request
        </h1>
        <p className="text-on-surface-variant text-sm mb-8">
          Confirm all details before submitting to verified providers.
        </p>

        {/* Summary Bento Grid */}
        <div className="grid grid-cols-5 gap-3 mb-8">
          {/* Service Type - 3 cols */}
          <div className="col-span-3 bg-surface-container-low rounded-xl p-5 border border-outline-variant/10">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block mb-3">
              Service Type
            </span>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary-container text-2xl">
                  engineering
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-headline)] text-xl font-bold text-primary">
                Hull Cleaning
              </h3>
            </div>
          </div>

          {/* Vessel - 2 cols */}
          <div className="col-span-2 bg-secondary-fixed rounded-xl p-5 border border-outline-variant/10">
            <span className="text-[10px] uppercase tracking-widest text-on-secondary-fixed-variant font-bold block mb-3">
              Vessel
            </span>
            <h3 className="font-[family-name:var(--font-headline)] text-xl font-bold text-on-secondary-fixed">
              Serenity
            </h3>
            <p className="text-xs text-on-secondary-fixed-variant mt-1">
              Benetti 45m
            </p>
          </div>

          {/* Description - full width */}
          <div className="col-span-5 bg-surface-container-low rounded-xl p-5 border border-outline-variant/10">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block mb-3">
              Description
            </span>
            <p className="text-on-surface text-sm italic leading-relaxed">
              &ldquo;Port engine overheating after 2000 RPM. Exhaust showing
              slight discoloration. Need full diagnostic and repair before
              departure on Friday.&rdquo;
            </p>
          </div>

          {/* Date / Time / Location */}
          <div className="col-span-5 bg-surface-container-low rounded-xl p-5 border border-outline-variant/10">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block mb-4">
              Schedule &amp; Location
            </span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-lg">
                  calendar_today
                </span>
                <div>
                  <p className="text-xs text-on-surface-variant">Date</p>
                  <p className="text-sm font-semibold text-on-surface">
                    28 Mar 2026
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-lg">
                  schedule
                </span>
                <div>
                  <p className="text-xs text-on-surface-variant">Time</p>
                  <p className="text-sm font-semibold text-on-surface">
                    09:00 AM
                  </p>
                </div>
              </div>
              <div className="col-span-2 md:col-span-1 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-lg">
                  location_on
                </span>
                <div>
                  <p className="text-xs text-on-surface-variant">Location</p>
                  <p className="text-sm font-semibold text-on-surface">
                    Port de Saint-Tropez
                  </p>
                </div>
              </div>
            </div>
            {/* Map thumbnail placeholder */}
            <div className="mt-4 aspect-[16/6] bg-surface-container-highest rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-primary text-2xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  location_on
                </span>
              </div>
            </div>
          </div>

          {/* Reference Files - full width horizontal scroll */}
          <div className="col-span-5 bg-surface-container-low rounded-xl p-5 border border-outline-variant/10">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block mb-3">
              Reference Files
            </span>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-24 h-24 rounded-lg bg-surface-container-highest flex-shrink-0 flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-outline text-2xl">
                    {i <= 2 ? "image" : "description"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Signal */}
        <div className="flex items-center gap-3 bg-surface-container-low rounded-xl p-4 border border-outline-variant/10 mb-8">
          <span
            className="material-symbols-outlined text-primary text-2xl flex-shrink-0"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified_user
          </span>
          <p className="text-sm text-on-surface-variant">
            Your request will be sent to{" "}
            <span className="font-bold text-on-surface">
              5+ verified providers
            </span>{" "}
            in your area for competitive quotes.
          </p>
        </div>
      </main>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/20">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/request/step-3"
            className="border border-outline-variant/30 text-on-surface-variant px-6 py-3 rounded-xl text-sm font-semibold hover:bg-surface-container-low transition-all active:scale-95 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            Edit Details
          </Link>
          <button className="bg-primary text-on-primary px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all active:scale-95 flex items-center gap-2 shadow-lg">
            Submit Request
            <span className="material-symbols-outlined text-sm">send</span>
          </button>
        </div>
        <div className="h-1 bg-gradient-to-r from-primary via-tertiary-fixed to-primary-fixed" />
      </div>

      <ConciergeFAB />
    </>
  );
}
