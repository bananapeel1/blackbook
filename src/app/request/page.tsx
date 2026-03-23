import TopAppBar from "@/components/TopAppBar";
import ConciergeFAB from "@/components/ConciergeFAB";
import Link from "next/link";

const serviceTypes = [
  {
    icon: "engineering",
    title: "Engine Repair",
    subtitle: "Mechanical & propulsion",
    active: true,
  },
  {
    icon: "local_shipping",
    title: "Provisioning",
    subtitle: "Supplies & catering",
    active: false,
  },
  {
    icon: "auto_awesome",
    title: "Detailing",
    subtitle: "Hull, teak & finishing",
    active: false,
  },
  {
    icon: "handyman",
    title: "Other Service",
    subtitle: "Custom request",
    active: false,
  },
];

export default function RequestStep1Page() {
  return (
    <>
      <TopAppBar />

      <main className="pt-20 pb-32 px-4 md:px-8 max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-on-secondary-container">
              Step 1 of 4
            </span>
            <span className="text-xs font-semibold text-on-surface-variant">
              Service Details
            </span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: "25%" }}
            />
          </div>
        </div>

        {/* Section Title */}
        <h1 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-primary tracking-tight mb-2">
          What do you need?
        </h1>
        <p className="text-on-surface-variant text-sm mb-8">
          Select the type of service and describe your requirements.
        </p>

        {/* Service Type Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {serviceTypes.map((service) => (
            <div
              key={service.title}
              className={`relative rounded-xl p-5 cursor-pointer transition-all duration-200 border ${
                service.active
                  ? "bg-primary text-on-primary border-primary shadow-lg"
                  : "bg-surface-container-low text-on-surface border-outline-variant/20 hover:bg-surface-container-high"
              }`}
            >
              <span
                className={`material-symbols-outlined text-2xl mb-3 block ${
                  service.active ? "text-on-primary" : "text-primary"
                }`}
              >
                {service.icon}
              </span>
              <h3
                className={`font-semibold text-sm mb-0.5 ${
                  service.active ? "text-on-primary" : "text-on-surface"
                }`}
              >
                {service.title}
              </h3>
              <p
                className={`text-xs ${
                  service.active
                    ? "text-on-primary/70"
                    : "text-on-surface-variant"
                }`}
              >
                {service.subtitle}
              </p>
              {service.active && (
                <div className="absolute top-3 right-3">
                  <span
                    className="material-symbols-outlined text-on-primary text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mb-8">
          <label className="text-sm font-semibold text-on-surface block mb-2">
            Description
          </label>
          <textarea
            className="w-full h-32 bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 text-on-surface text-sm placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none transition-all"
            placeholder="E.g. Port engine overheating after 2000 RPM..."
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <label className="text-sm font-semibold text-on-surface block mb-2">
              Preferred Date
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                calendar_today
              </span>
              <input
                type="date"
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl pl-10 pr-4 py-3 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-on-surface block mb-2">
              Preferred Time
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                schedule
              </span>
              <input
                type="time"
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl pl-10 pr-4 py-3 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/20">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-semibold text-on-surface-variant hover:text-error transition-colors"
          >
            Cancel Request
          </Link>
          <Link
            href="/request/step-2"
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
