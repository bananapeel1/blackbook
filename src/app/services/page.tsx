import NavWrapper from "@/components/NavWrapper";
import ConciergeFAB from "@/components/ConciergeFAB";
import Link from "next/link";

const services = [
  {
    title: "Private Chef",
    description:
      "Access to the region's most exclusive culinary talent. Bespoke menus sourced from local markets and private docks, executed in your galley or shore-side villa.",
    badge: "Michelin Standard",
    cta: "Request Bespoke Service",
    span: "md:col-span-8",
    minHeight: "min-h-[500px]",
    featured: true,
  },
  {
    title: "Custom Provisions",
    description:
      "Artisanal sourcing from the ledger of elite suppliers. Every vintage, every harvest, precisely as requested.",
    badge: null,
    cta: "View Supplier List",
    span: "md:col-span-4",
    minHeight: "min-h-[500px]",
    dark: true,
  },
  {
    title: "Floral Designs",
    description:
      "Sculptural botanical installations designed for high-salinity environments.",
    badge: null,
    cta: "Inquire",
    span: "md:col-span-5",
    minHeight: "min-h-[400px]",
  },
  {
    title: "Air & Sea Transfers",
    description:
      "Seamless transition from deck to destination via our partner fleet of AW139s and executive tenders.",
    badge: "Rapid Transit",
    cta: null,
    span: "md:col-span-7",
    minHeight: "min-h-[200px]",
    icons: ["helicopter", "directions_boat", "airport_shuttle"],
  },
  {
    title: "Chauffeur Service",
    description:
      "Discreet, professional navigation for shore excursions and logistics.",
    badge: null,
    cta: null,
    span: "md:col-span-7",
    minHeight: "min-h-[200px]",
    dark: true,
  },
];

export default function ServicesPage() {
  return (
    <>
      <NavWrapper />

      <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
        {/* Hero Header */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.3em] text-on-secondary-container mb-4 block font-semibold">
                Curated Excellence
              </span>
              <h2 className="font-[family-name:var(--font-headline)] text-5xl md:text-7xl text-primary tracking-tight leading-[1.1] mb-6">
                The Portfolio of{" "}
                <span className="italic text-on-tertiary-container">
                  Privilege.
                </span>
              </h2>
              <p className="text-secondary text-lg md:text-xl font-light leading-relaxed max-w-xl">
                A strictly vetted collection of shore-side essentials, managed
                with the precision of a master mariner. From the galley to the
                helipad, your requirements are our mandate.
              </p>
            </div>
            <div className="hidden lg:block pb-4">
              <div className="w-px h-32 bg-outline-variant/30 mx-auto mb-4" />
              <span className="[writing-mode:vertical-rl] text-[10px] uppercase tracking-widest text-outline">
                Established MMXXIV
              </span>
            </div>
          </div>
        </section>

        {/* Bento Grid Services */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Private Chef - Main Feature */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-xl bg-primary-container min-h-[500px] flex items-end">
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
            <div className="relative p-8 md:p-12 w-full">
              <div className="inline-block px-3 py-1 mb-4 bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold uppercase tracking-wider rounded-full">
                Michelin Standard
              </div>
              <h3 className="font-[family-name:var(--font-headline)] text-3xl md:text-4xl text-white mb-3 tracking-tight">
                Private Chef
              </h3>
              <p className="text-white/70 max-w-md font-light mb-8">
                Access to the region&apos;s most exclusive culinary talent.
                Bespoke menus sourced from local markets and private docks.
              </p>
              <Link
                href="/request"
                className="bg-white text-primary px-8 py-3 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-surface-container-highest transition-colors inline-flex items-center gap-2"
              >
                Request Bespoke Service
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>

          {/* Custom Provisions */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-xl min-h-[500px] flex flex-col">
            <div className="h-1/2 bg-surface-container-high relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&q=80"
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8 flex-grow flex flex-col justify-between bg-primary-container text-white">
              <div>
                <h3 className="font-[family-name:var(--font-headline)] text-2xl mb-2">
                  Custom Provisions
                </h3>
                <p className="text-on-primary-container text-sm font-light leading-relaxed">
                  Artisanal sourcing from the ledger of elite suppliers. Every
                  vintage, every harvest, precisely as requested.
                </p>
              </div>
              <Link
                href="/discover"
                className="text-tertiary-fixed text-xs font-bold uppercase tracking-widest flex items-center gap-2 mt-6 hover:opacity-80 transition-opacity"
              >
                View Supplier List
                <span className="material-symbols-outlined text-sm">
                  north_east
                </span>
              </Link>
            </div>
          </div>

          {/* Floral Designs */}
          <div className="md:col-span-5 group relative overflow-hidden rounded-xl bg-surface-container-lowest border border-outline-variant/10 shadow-sm p-1">
            <div className="aspect-[4/5] rounded-lg overflow-hidden relative bg-surface-container-high">
              <img
                src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&q=80"
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-6 left-6 right-6 glass-card p-6 rounded-lg">
                <h3 className="font-[family-name:var(--font-headline)] text-xl text-primary mb-1">
                  Floral Designs
                </h3>
                <p className="text-secondary text-xs mb-4">
                  Sculptural botanical installations designed for high-salinity
                  environments.
                </p>
                <Link
                  href="/request"
                  className="block w-full py-3 bg-primary text-white text-center text-[10px] font-bold uppercase tracking-widest rounded transition-all active:scale-95"
                >
                  Inquire
                </Link>
              </div>
            </div>
          </div>

          {/* Transport Grid */}
          <div className="md:col-span-7 grid grid-rows-2 gap-6">
            {/* Air & Sea Transfers */}
            <div className="bg-surface-container-low rounded-xl overflow-hidden flex items-stretch">
              <div className="w-1/3 bg-surface-container-high relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                />
              </div>
              <div className="w-2/3 p-8 flex flex-col justify-center">
                <span className="text-on-tertiary-container text-[10px] font-bold uppercase tracking-widest mb-2 block">
                  Rapid Transit
                </span>
                <h3 className="font-[family-name:var(--font-headline)] text-2xl text-primary mb-2">
                  Air &amp; Sea Transfers
                </h3>
                <p className="text-secondary text-sm font-light mb-4">
                  Seamless transition from deck to destination via our partner
                  fleet.
                </p>
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-primary/30">
                    helicopter
                  </span>
                  <span className="material-symbols-outlined text-primary/30">
                    directions_boat
                  </span>
                  <span className="material-symbols-outlined text-primary/30">
                    airport_shuttle
                  </span>
                </div>
              </div>
            </div>

            {/* Chauffeur */}
            <div className="group relative overflow-hidden rounded-xl bg-primary">
              <img
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=800&q=80"
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="relative h-full p-8 flex items-center justify-between">
                <div>
                  <h3 className="font-[family-name:var(--font-headline)] text-2xl text-white mb-2">
                    Chauffeur Service
                  </h3>
                  <p className="text-white/60 text-sm font-light max-w-xs">
                    Discreet, professional navigation for shore excursions and
                    logistics.
                  </p>
                </div>
                <Link
                  href="/request"
                  className="bg-tertiary-fixed text-on-tertiary-fixed w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Section: The Insider Ledger */}
        <section className="mt-24 bg-secondary-fixed p-12 md:p-20 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <span className="material-symbols-outlined text-[160px]">
              history_edu
            </span>
          </div>
          <div className="relative z-10 max-w-3xl">
            <h2 className="font-[family-name:var(--font-headline)] text-4xl text-on-secondary-fixed mb-6 italic tracking-tight">
              The &ldquo;Insider&rdquo; Quality
            </h2>
            <p className="text-on-secondary-fixed-variant text-xl leading-relaxed font-light mb-10">
              What separates the Blackbook from a standard directory is our
              ledger of deep connections. These aren&apos;t just services; they
              are keys to doors that are usually locked.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "24/7", label: "Active Concierge" },
                { value: "150+", label: "Vetted Partners" },
                { value: "Top 5%", label: "Sourcing Quality" },
                { value: "Global", label: "Network Reach" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-[family-name:var(--font-headline)] text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-secondary">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <ConciergeFAB />
    </>
  );
}
