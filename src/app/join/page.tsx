import NavWrapper from "@/components/NavWrapper";
import JoinForm from "./JoinForm";

const benefits = [
  {
    icon: "verified",
    title: "Verified Trust Badge",
    description:
      "Stand out with our exclusive verification mark. Clients trust verified providers 3x more.",
  },
  {
    icon: "groups",
    title: "Direct Access to Superyacht Crews",
    description:
      "Connect with captains and fleet managers actively seeking your services across the Mediterranean.",
  },
  {
    icon: "receipt_long",
    title: "Seamless Quote Management",
    description:
      "Receive, respond to, and manage service requests from a single professional dashboard.",
  },
];

const stats = [
  { value: "2.4k+", label: "Active Vessels" },
  { value: "48", label: "Global Ports" },
  { value: "$120M", label: "Annual Service Flow" },
  { value: "99.8%", label: "Satisfaction Rate" },
];

export default function JoinPage() {
  return (
    <>
      <NavWrapper />

      <main className="pt-16 pb-24 md:pb-0">
        {/* Hero */}
        <section className="relative py-24 md:py-36 px-6 bg-primary overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <span className="material-symbols-outlined text-[400px] text-white absolute -right-20 -top-20">
              sailing
            </span>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <span className="text-tertiary-fixed text-xs uppercase tracking-[0.3em] font-bold mb-4 block">
              For Service Providers
            </span>
            <h1 className="font-[family-name:var(--font-headline)] text-4xl md:text-7xl text-white font-bold tracking-tight mb-6">
              Join the Elite{" "}
              <span className="italic font-normal">Network.</span>
            </h1>
            <p className="text-on-primary-container text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Connect with the Mediterranean&apos;s most discerning yacht
              owners, captains, and charter operators. Grow your business with
              verified, high-value service requests.
            </p>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-24 px-6 md:px-20 bg-surface">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-[family-name:var(--font-headline)] text-4xl font-bold text-primary mb-4">
                Why Providers Choose Us
              </h2>
              <p className="text-on-surface-variant max-w-lg mx-auto">
                Our platform is designed to put your expertise in front of the
                right clients at the right time.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="bg-surface-container-lowest p-8 rounded-xl ledger-shadow text-center"
                >
                  <div className="w-16 h-16 rounded-xl bg-secondary-container flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-primary text-3xl">
                      {benefit.icon}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-headline)] text-xl font-bold text-primary mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-primary-container py-16 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-[family-name:var(--font-headline)] font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-on-primary-container">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-24 px-6 bg-surface-container-low">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl">
            {/* Left Panel */}
            <div className="bg-primary p-12 flex flex-col justify-between">
              <div>
                <h3 className="font-[family-name:var(--font-headline)] text-3xl text-white font-bold mb-4">
                  Start Your Application
                </h3>
                <p className="text-on-primary-container font-light leading-relaxed mb-8">
                  Join a curated network of the Mediterranean&apos;s finest
                  maritime service providers. Our verification process ensures
                  only the highest quality partners.
                </p>
              </div>
              <div className="space-y-4">
                {["Manual Review Process", "Quality Guarantee", "Dedicated Support"].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-3 text-on-primary-container">
                      <span
                        className="material-symbols-outlined text-tertiary-fixed"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Right Panel - Form */}
            <JoinForm />
          </div>
        </section>
      </main>

    </>
  );
}
