import TopAppBar from "@/components/TopAppBar";
import BottomNav from "@/components/BottomNav";
import ConciergeFAB from "@/components/ConciergeFAB";
import Link from "next/link";

const services = [
  {
    icon: "manufacturing",
    title: "Engine Diagnostics",
    description:
      "Complete propulsion analysis using OEM-certified diagnostic systems.",
  },
  {
    icon: "electrical_services",
    title: "Electrical Systems",
    description:
      "Full electrical auditing, rewiring, and AC/DC system management.",
  },
  {
    icon: "hydraulic",
    title: "Hydraulic Overhaul",
    description:
      "Precision rebuild and maintenance of steering, stabiliser, and crane hydraulics.",
  },
  {
    icon: "emergency",
    title: "24/7 Rapid Response",
    description:
      "Emergency callout within 90 minutes across the Western Mediterranean.",
  },
];

const reviews = [
  {
    name: "Captain J. Hartley",
    vessel: "MY Sovereign",
    rating: 5,
    text: "Exceptional attention to detail on our twin MTU overhaul. The team worked through the night to meet our departure schedule. True professionals.",
    date: "2 weeks ago",
  },
  {
    name: "Chief Eng. S. Novak",
    vessel: "SY Windchaser",
    rating: 5,
    text: "Their hydraulic expertise is unmatched in the region. Fast, clean, and they left the engine room spotless. Highly recommended.",
    date: "1 month ago",
  },
];

const certifications = [
  "MTU Authorized Service Partner",
  "Volvo Penta Gold Standard",
  "Lloyds Register Certified",
];

const galleryPlaceholders = Array.from({ length: 6 });

export default function ProviderProfilePage() {
  return (
    <>
      <TopAppBar />

      <main className="pt-16 pb-32 md:pb-0">
        {/* Hero Section */}
        <section className="bg-primary-container relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-24">
            <Link
              href="/discover"
              className="inline-flex items-center gap-2 text-white/60 text-xs uppercase tracking-widest font-semibold mb-8 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-sm">
                arrow_back
              </span>
              Back to Discovery
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <h1 className="font-[family-name:var(--font-headline)] text-4xl md:text-6xl text-white font-bold tracking-tight mb-4">
                  Azure Technical Marine
                </h1>
                <p className="text-on-primary-container text-lg font-light mb-6">
                  Marine Engineering &amp; HVAC Specialists
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg">
                      <span className="text-white font-bold text-lg">4.9</span>
                      <span
                        className="material-symbols-outlined text-tertiary-fixed text-sm"
                        style={{
                          fontVariationSettings: "'FILL' 1",
                        }}
                      >
                        star
                      </span>
                    </div>
                    <span className="text-white/60 text-sm">124 reviews</span>
                  </div>
                  <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-xs"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                    Verified
                  </span>
                  <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">
                      timer
                    </span>
                    Fast Responder
                  </span>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <button className="bg-white/10 backdrop-blur-md text-white p-3 rounded-xl hover:bg-white/20 transition-colors">
                  <span className="material-symbols-outlined">bookmark</span>
                </button>
                <button className="bg-white/10 backdrop-blur-md text-white p-3 rounded-xl hover:bg-white/20 transition-colors">
                  <span className="material-symbols-outlined">share</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-6 md:px-20 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Left Column - Main Content */}
            <div className="md:col-span-8 space-y-12">
              {/* About Us */}
              <div>
                <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-primary mb-4">
                  About Us
                </h2>
                <p className="text-on-surface-variant leading-relaxed mb-4">
                  Azure Technical Marine has been the trusted engineering partner
                  for superyachts and commercial vessels across the Western
                  Mediterranean since 2009. Our team of 14 factory-trained
                  engineers specialises in complex propulsion diagnostics,
                  high-voltage electrical systems, and precision hydraulic work.
                </p>
                <p className="text-on-surface-variant leading-relaxed">
                  We hold direct authorisations from MTU, Volvo Penta, and
                  Caterpillar, ensuring OEM-quality service with genuine parts
                  and factory-standard procedures. Our 24/7 rapid response
                  capability means we can have an engineer on your vessel within
                  90 minutes, anywhere from Monaco to Mallorca.
                </p>
              </div>

              {/* Services Grid */}
              <div>
                <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-primary mb-6">
                  Our Services
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.title}
                      className="bg-surface-container-low rounded-xl p-6 hover:bg-surface-container-high transition-colors group"
                    >
                      <div className="bg-secondary-container w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-primary text-2xl">
                          {service.icon}
                        </span>
                      </div>
                      <h3 className="font-[family-name:var(--font-headline)] text-lg font-bold text-primary mb-2">
                        {service.title}
                      </h3>
                      <p className="text-on-surface-variant text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photo Gallery */}
              <div>
                <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-primary mb-6">
                  Photo Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {galleryPlaceholders.map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-xl overflow-hidden ${
                        i === 0
                          ? "col-span-2 row-span-2 aspect-square"
                          : "aspect-[4/3]"
                      }`}
                    >
                      <div className="w-full h-full bg-surface-container-high" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="md:col-span-4 space-y-6">
              {/* Client Reviews */}
              <div className="bg-surface-container-low rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-[family-name:var(--font-headline)] text-lg font-bold text-primary">
                    Client Reviews
                  </h3>
                  <span className="text-xs text-on-surface-variant font-semibold">
                    124 total
                  </span>
                </div>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.name}
                      className="border-b border-outline-variant/20 pb-6 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary text-lg">
                            person
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-on-surface">
                            {review.name}
                          </p>
                          <p className="text-[10px] text-on-surface-variant uppercase tracking-wide">
                            {review.vessel}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <span
                            key={i}
                            className="material-symbols-outlined text-primary text-sm"
                            style={{
                              fontVariationSettings: "'FILL' 1",
                            }}
                          >
                            star
                          </span>
                        ))}
                      </div>
                      <p className="text-on-surface-variant text-sm leading-relaxed">
                        {review.text}
                      </p>
                      <p className="text-outline text-[10px] mt-2 uppercase tracking-widest font-semibold">
                        {review.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-primary rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-tertiary-fixed text-2xl">
                    workspace_premium
                  </span>
                  <h3 className="font-[family-name:var(--font-headline)] text-lg font-bold text-white">
                    Certifications
                  </h3>
                </div>
                <ul className="space-y-4">
                  {certifications.map((cert) => (
                    <li key={cert} className="flex items-center gap-3">
                      <span
                        className="material-symbols-outlined text-tertiary-fixed text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>
                      <span className="text-white/80 text-sm font-medium">
                        {cert}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div className="bg-surface-container-low rounded-2xl p-6">
                <h3 className="font-[family-name:var(--font-headline)] text-lg font-bold text-primary mb-4">
                  Contact
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant">
                      location_on
                    </span>
                    <span className="text-on-surface-variant text-sm">
                      Port de Saint-Tropez, France
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant">
                      schedule
                    </span>
                    <span className="text-on-surface-variant text-sm">
                      24/7 Emergency Available
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant">
                      avg_pace
                    </span>
                    <span className="text-on-surface-variant text-sm">
                      Avg. response: 14 minutes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Floating Request Quote Button */}
        <div className="fixed bottom-20 md:bottom-8 left-0 right-0 z-40 px-6 md:px-0 md:flex md:justify-center">
          <Link
            href="/request"
            className="block w-full md:w-auto bg-primary text-on-primary px-10 py-4 rounded-xl uppercase tracking-widest text-sm font-bold shadow-2xl hover:-translate-y-1 transition-all text-center"
          >
            Request Quote
          </Link>
        </div>
      </main>

      <ConciergeFAB />
      <BottomNav />
    </>
  );
}
