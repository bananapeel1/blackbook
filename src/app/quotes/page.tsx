import TopAppBar from "@/components/TopAppBar";
import BottomNav from "@/components/BottomNav";
import ConciergeFAB from "@/components/ConciergeFAB";
import Link from "next/link";

const quotes = [
  {
    id: "azure",
    provider: "Azure Technical Marine",
    price: "$2,400",
    label: "Balanced",
    labelColor: "bg-secondary-container text-on-secondary-container",
    leadTime: "2-day lead time",
    trustScore: 92,
    warranty: "12mo warranty",
    certifications: ["Yanmar Certified", "Volvo Penta"],
    highlighted: false,
  },
  {
    id: "precision",
    provider: "Precision Marine",
    price: "$1,950",
    label: "Best Value",
    labelColor: "bg-tertiary-container text-on-tertiary-container",
    leadTime: "4-day lead time",
    trustScore: 84,
    warranty: "6mo warranty",
    certifications: [],
    highlighted: false,
  },
  {
    id: "cote-azur",
    provider: "Cote d'Azur Props",
    price: "$2,800",
    label: "Premium Service",
    labelColor: "bg-primary text-on-primary",
    leadTime: "Immediate",
    trustScore: 98,
    warranty: "24mo warranty",
    certifications: [],
    highlighted: true,
  },
];

export default function QuotesPage() {
  return (
    <>
      <TopAppBar />

      <main className="pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-on-surface-variant mb-8">
          <Link
            href="/dashboard"
            className="hover:text-primary transition-colors"
          >
            Requests
          </Link>
          <span className="material-symbols-outlined text-xs text-outline">
            chevron_right
          </span>
          <span className="hover:text-primary transition-colors cursor-pointer">
            Active Service
          </span>
          <span className="material-symbols-outlined text-xs text-outline">
            chevron_right
          </span>
          <span className="text-primary font-semibold">Quote Comparison</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="font-[family-name:var(--font-headline)] text-3xl md:text-5xl font-extrabold text-primary tracking-tight leading-none mb-2">
              Engine Repair
            </h1>
            <div className="flex items-center gap-3">
              <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-xs"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                3 Verified Proposals
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-surface-container-low text-on-surface px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-surface-container-high transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">
                filter_list
              </span>
              Sort by Price
            </button>
          </div>
        </div>

        {/* Quote Cards - 3 col grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all ${
                quote.highlighted
                  ? "bg-primary ring-2 ring-tertiary-fixed shadow-2xl shadow-primary-container/20"
                  : "bg-surface-container-low"
              }`}
            >
              <div>
                {/* Label */}
                <span
                  className={`inline-block px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider mb-4 ${quote.labelColor}`}
                >
                  {quote.label}
                </span>

                {/* Provider Name */}
                <h3
                  className={`font-[family-name:var(--font-headline)] text-xl font-bold mb-1 ${
                    quote.highlighted ? "text-white" : "text-primary"
                  }`}
                >
                  {quote.provider}
                </h3>

                {/* Price */}
                <p
                  className={`font-[family-name:var(--font-headline)] text-4xl font-extrabold tracking-tight mb-4 ${
                    quote.highlighted ? "text-tertiary-fixed" : "text-primary"
                  }`}
                >
                  {quote.price}
                </p>

                {/* Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span
                      className={`material-symbols-outlined text-lg ${
                        quote.highlighted
                          ? "text-white/60"
                          : "text-on-surface-variant"
                      }`}
                    >
                      schedule
                    </span>
                    <span
                      className={`text-sm ${
                        quote.highlighted
                          ? "text-white/80"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {quote.leadTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`material-symbols-outlined text-lg ${
                        quote.highlighted
                          ? "text-white/60"
                          : "text-on-surface-variant"
                      }`}
                    >
                      shield
                    </span>
                    <span
                      className={`text-sm ${
                        quote.highlighted
                          ? "text-white/80"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {quote.warranty}
                    </span>
                  </div>

                  {/* Trust Score */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-xs font-semibold ${
                          quote.highlighted
                            ? "text-white/60"
                            : "text-on-surface-variant"
                        }`}
                      >
                        Trust Score
                      </span>
                      <span
                        className={`text-sm font-bold ${
                          quote.highlighted ? "text-tertiary-fixed" : "text-primary"
                        }`}
                      >
                        {quote.trustScore}%
                      </span>
                    </div>
                    <div
                      className={`w-full h-2 rounded-full ${
                        quote.highlighted
                          ? "bg-white/10"
                          : "bg-surface-container-high"
                      }`}
                    >
                      <div
                        className={`h-2 rounded-full ${
                          quote.highlighted
                            ? "bg-tertiary-fixed"
                            : "bg-primary"
                        }`}
                        style={{ width: `${quote.trustScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Certifications */}
                  {quote.certifications.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {quote.certifications.map((cert) => (
                        <span
                          key={cert}
                          className={`px-2 py-1 rounded text-[10px] font-semibold ${
                            quote.highlighted
                              ? "bg-white/10 text-white/80"
                              : "bg-surface-container-highest text-on-surface-variant"
                          }`}
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* CTA */}
              <button
                className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all active:scale-95 ${
                  quote.highlighted
                    ? "bg-tertiary-fixed text-on-tertiary-fixed hover:opacity-90"
                    : "bg-primary text-on-primary hover:bg-primary-container"
                }`}
              >
                Accept Proposal
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Request Description - 4 cols */}
          <div className="md:col-span-4 bg-surface-container-low rounded-2xl p-6">
            <h3 className="font-[family-name:var(--font-headline)] text-lg font-bold text-primary mb-4">
              Request Description
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
              Port engine showing intermittent loss of power under load.
              Suspected injector issue based on preliminary diagnostics. Full
              inspection and repair required before scheduled departure on
              September 22.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                Engine
              </span>
              <span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                Diagnostics
              </span>
              <span className="bg-error-container text-on-error-container px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                Priority
              </span>
            </div>
          </div>

          {/* Vessel Info - 4 cols */}
          <div className="md:col-span-4 bg-surface-container-low rounded-2xl p-6">
            <h3 className="font-[family-name:var(--font-headline)] text-lg font-bold text-primary mb-4">
              Vessel Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-secondary-container w-14 h-14 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    sailing
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">
                    Blue Horizon II
                  </h4>
                  <p className="text-on-surface-variant text-sm">
                    42ft Azimut
                  </p>
                </div>
              </div>
              <div className="border-t border-outline-variant/20 pt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant text-sm">
                    Home Port
                  </span>
                  <span className="text-on-surface text-sm font-medium">
                    Saint-Tropez
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant text-sm">
                    Engine
                  </span>
                  <span className="text-on-surface text-sm font-medium">
                    Twin Volvo D6
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant text-sm">
                    Last Service
                  </span>
                  <span className="text-on-surface text-sm font-medium">
                    Jun 2024
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Talk to an Agent - 4 cols */}
          <div className="md:col-span-4 bg-primary rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-tertiary-fixed text-3xl">
                  support_agent
                </span>
                <h3 className="font-[family-name:var(--font-headline)] text-lg font-bold text-white">
                  Talk to an Agent
                </h3>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Need help comparing proposals or have specific technical
                questions? Our concierge team can guide you through the decision.
              </p>
            </div>
            <Link
              href="#"
              className="block w-full py-4 bg-tertiary-fixed text-on-tertiary-fixed text-center text-xs font-bold uppercase tracking-widest rounded-xl hover:opacity-90 transition-all active:scale-95"
            >
              Start Conversation
            </Link>
          </div>
        </div>
      </main>

      <ConciergeFAB />
      <BottomNav />
    </>
  );
}
