import TopAppBar from "@/components/TopAppBar";
import BottomNav from "@/components/BottomNav";
import ConciergeFAB from "@/components/ConciergeFAB";
import Link from "next/link";

const providers = [
  {
    id: "azure-technical",
    name: "Azure Technical Marine",
    specialty: "Marine Engineering & HVAC",
    rating: 4.9,
    reviews: 128,
    badges: ["Verified", "Fast Responder"],
    topRated: true,
    urgency: false,
    available: false,
    quote: "Request Quote",
  },
  {
    id: "riviera-detailing",
    name: "Riviera Detailing Co.",
    specialty: "High-Gloss Finishing & Teak",
    rating: 4.8,
    reviews: 84,
    badges: ["Verified"],
    topRated: false,
    urgency: false,
    available: false,
    lastJob: 'Last serviced MY \'Serenity\' 2 days ago',
    quote: "Request Quote",
  },
  {
    id: "cote-azur-props",
    name: "Cote d'Azur Props",
    specialty: "Propulsion & Stabilization",
    rating: 5.0,
    reviews: 42,
    badges: ["Urgency Available", "Verified"],
    topRated: false,
    urgency: true,
    available: true,
    quote: "Request Quote",
  },
];

export default function DiscoverPage() {
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
              Port de Saint-Tropez
            </h1>
            <p className="text-on-surface-variant">
              Showing {providers.length} verified providers in your immediate
              vicinity.
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
          {providers.map((provider) => (
            <Link
              key={provider.id}
              href={`/provider/${provider.id}`}
              className="group relative bg-surface-container-low rounded-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-500 hover:shadow-2xl hover:shadow-primary-container/5 block"
            >
              <div className="w-full md:w-72 h-48 md:h-auto overflow-hidden relative bg-primary-container/30">
                {provider.topRated && (
                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                    <span className="bg-primary/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      Top Rated
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-primary">
                        {provider.name}
                      </h3>
                      <p className="text-on-tertiary-container font-medium text-sm">
                        Specialist: {provider.specialty}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 text-primary">
                        <span className="font-bold">{provider.rating}</span>
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
                        {provider.reviews} Reviews
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {provider.badges.map((badge) => (
                      <span
                        key={badge}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                          badge === "Urgency Available"
                            ? "bg-error-container text-on-error-container"
                            : "bg-secondary-container text-on-secondary-container"
                        }`}
                      >
                        <span
                          className="material-symbols-outlined text-xs"
                          style={{
                            fontVariationSettings:
                              badge === "Verified" ? "'FILL' 1" : undefined,
                          }}
                        >
                          {badge === "Verified"
                            ? "verified"
                            : badge === "Fast Responder"
                              ? "timer"
                              : "notification_important"}
                        </span>
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-outline-variant/20 pt-6">
                  {provider.available ? (
                    <div className="flex items-center gap-2 text-on-surface-variant font-medium text-xs">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      Available now
                    </div>
                  ) : provider.lastJob ? (
                    <div className="text-xs text-on-surface-variant italic font-medium">
                      &ldquo;{provider.lastJob}&rdquo;
                    </div>
                  ) : (
                    <div />
                  )}
                  <span className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold text-sm tracking-tight hover:bg-primary-container transition-all active:scale-95">
                    Request Quote
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <ConciergeFAB />
      <BottomNav />
    </>
  );
}
