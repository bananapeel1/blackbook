import TopAppBar from "@/components/TopAppBar";
import BottomNav from "@/components/BottomNav";
import ConciergeFAB from "@/components/ConciergeFAB";
import Link from "next/link";

const categories = [
  {
    title: "Mechanical",
    description: "Precision engineering and expert maintenance for propulsion systems.",
    span: "md:col-span-8",
    image: "/images/mechanical.jpg",
  },
  {
    title: "Concierge",
    description: "Customized logistics and hospitality solutions.",
    span: "md:col-span-4",
    image: "/images/concierge.jpg",
  },
  {
    title: "Provisions",
    description: "Sourcing the finest local ingredients and global delicacies.",
    span: "md:col-span-4",
    image: "/images/provisions.jpg",
  },
  {
    title: "Rigging",
    description: "Specialized mast and sail services for elite racing and cruising yachts.",
    span: "md:col-span-8",
    image: "/images/rigging.jpg",
  },
];

const journalPosts = [
  {
    tag: "Local Guide",
    title: "Local Insider Tips for Port Hercules",
    excerpt: "Navigating the most famous harbour in the world requires local knowledge.",
  },
  {
    tag: "Maintenance",
    title: "Teak Care in Extreme Salinity",
    excerpt: "The Mediterranean salt levels can be brutal on precious woodwork.",
  },
  {
    tag: "Lifestyle",
    title: "St Tropez: Beyond the Pampelonne",
    excerpt: "Where to source the most exclusive vintage wines and hidden seafood markets.",
  },
];

export default function HomePage() {
  return (
    <>
      <TopAppBar />

      <main className="pt-16 pb-24 md:pb-0">
        {/* Hero Section */}
        <section className="relative min-h-[600px] md:h-[750px] flex items-center px-6 md:px-20 overflow-hidden bg-primary-container">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-6 font-[family-name:var(--font-headline)]">
              The Harbour&apos;s <br />
              <span className="italic font-normal">Private Directory.</span>
            </h1>
            <p className="text-on-primary-container text-lg md:text-xl font-light mb-10 max-w-md leading-relaxed">
              Exclusive access to premium maintenance, provisioning, and
              concierge services for the discerning mariner.
            </p>
            <div className="bg-surface-container-lowest p-2 rounded-xl flex flex-col md:flex-row gap-2 shadow-2xl">
              <div className="flex-1 flex items-center px-4 py-3 gap-3 border-b md:border-b-0 md:border-r border-outline-variant/20">
                <span className="material-symbols-outlined text-outline">
                  anchor
                </span>
                <input
                  className="bg-transparent border-none focus:ring-0 w-full text-on-surface outline-none"
                  placeholder="Where are you heading?"
                  type="text"
                />
              </div>
              <Link
                href="/discover"
                className="bg-primary text-on-primary px-8 py-4 rounded-lg uppercase tracking-widest text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                Search Port
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Categories: Bento Grid */}
        <section className="py-24 px-6 md:px-20 bg-surface">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-on-secondary-container mb-2 block font-semibold">
                Our Expertise
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-primary font-[family-name:var(--font-headline)]">
                Refined Services
              </h2>
            </div>
            <div className="hidden md:block">
              <Link
                href="/services"
                className="text-tertiary-container font-semibold flex items-center gap-2 hover:gap-4 transition-all"
              >
                Explore All Categories
                <span className="material-symbols-outlined">east</span>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[600px]">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                href="/services"
                className={`${cat.span} group relative overflow-hidden rounded-xl bg-surface-container-low min-h-[250px]`}
              >
                <div className="absolute inset-0 bg-primary-container" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-0 p-8 z-10">
                  <h3 className="text-white text-3xl font-bold mb-2 font-[family-name:var(--font-headline)]">
                    {cat.title}
                  </h3>
                  <p className="text-white/70 font-light">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-20 border-y border-outline-variant/10 bg-surface-container-low">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex gap-6 items-start">
              <div className="bg-secondary-container p-4 rounded-xl">
                <span className="material-symbols-outlined text-primary text-4xl">
                  verified_user
                </span>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-primary mb-2 font-[family-name:var(--font-headline)]">
                  Verified Local Experts
                </h4>
                <p className="text-on-surface-variant leading-relaxed">
                  Every provider in our ledger undergoes a rigorous vetting
                  process to ensure they meet the gold standard of maritime
                  service.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="bg-secondary-container p-4 rounded-xl">
                <span className="material-symbols-outlined text-primary text-4xl">
                  groups
                </span>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-primary mb-2 font-[family-name:var(--font-headline)]">
                  Trusted by Over 500 Yacht Crews
                </h4>
                <p className="text-on-surface-variant leading-relaxed">
                  From 40ft cruisers to 100m+ superyachts, captains across the
                  Mediterranean rely on the Blackbook for essential support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Journal */}
        <section className="py-24 px-6 md:px-20 bg-background">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4 italic font-[family-name:var(--font-headline)]">
              The Journal
            </h2>
            <p className="text-on-surface-variant max-w-lg mx-auto">
              Insider intelligence and local guides for the world&apos;s most
              prestigious ports.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {journalPosts.map((post) => (
              <article key={post.title} className="group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden rounded-xl mb-6 bg-primary-container/20" />
                <span className="text-[10px] uppercase tracking-widest text-on-tertiary-container bg-tertiary-fixed px-2 py-1 rounded font-semibold">
                  {post.tag}
                </span>
                <h3 className="text-2xl font-bold text-primary mt-4 mb-3 leading-tight group-hover:text-on-primary-container transition-colors font-[family-name:var(--font-headline)]">
                  {post.title}
                </h3>
                <p className="text-on-surface-variant text-sm line-clamp-2">
                  {post.excerpt}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-white text-center relative overflow-hidden">
          <div className="relative z-10 px-6">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 italic font-[family-name:var(--font-headline)]">
              Arrival, Seamlessly Planned.
            </h2>
            <p className="text-on-primary-container text-lg max-w-xl mx-auto mb-12">
              Submit your requirements today and let our vetted local partners
              prepare for your next port of call.
            </p>
            <Link
              href="/request"
              className="inline-block bg-surface-container-lowest text-primary px-10 py-5 rounded-lg uppercase tracking-widest text-sm font-bold shadow-xl hover:-translate-y-1 transition-all"
            >
              Request Services for Your Next Arrival
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-surface-container-high pt-20 pb-28 md:pb-10 px-6 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <span className="font-[family-name:var(--font-headline)] font-bold text-slate-900 tracking-tighter text-3xl block mb-6">
                Dockside Blackbook
              </span>
              <p className="text-on-surface-variant max-w-sm leading-relaxed">
                A curated ecosystem for the maritime elite. Connecting premium
                yacht crews with the world&apos;s most capable service providers.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-primary mb-6">Company</h5>
              <ul className="space-y-4 text-sm text-on-surface-variant">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Our Standard
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Membership
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    The Journal
                  </Link>
                </li>
                <li>
                  <Link
                    href="/join"
                    className="hover:text-primary transition-colors font-bold text-tertiary"
                  >
                    Become a Provider
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-primary mb-6">Connect</h5>
              <ul className="space-y-4 text-sm text-on-surface-variant">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Press Office
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60">
            <p>&copy; 2024 DOCKSIDE BLACKBOOK. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <Link href="#">Privacy</Link>
              <Link href="#">Terms</Link>
              <Link href="#">Cookies</Link>
            </div>
          </div>
        </footer>
      </main>

      <ConciergeFAB />
      <BottomNav />
    </>
  );
}
