import TopAppBar from "@/components/TopAppBar";
import BottomNav from "@/components/BottomNav";
import ConciergeFAB from "@/components/ConciergeFAB";
import Link from "next/link";

const activeRequests = [
  {
    id: "hull-maintenance",
    title: "Hull Maintenance",
    provider: "3 providers responding",
    status: "Collecting Quotes",
    statusColor: "bg-secondary-container text-on-secondary-container",
    icon: "directions_boat",
    date: "Submitted Sep 12",
  },
  {
    id: "fuel-delivery",
    title: "Fuel Delivery",
    provider: "Action needed from you",
    status: "Action Required",
    statusColor: "bg-error-container text-on-error-container",
    icon: "local_gas_station",
    date: "Submitted Sep 10",
  },
];

const recentMessages = [
  {
    name: "Azure Technical",
    message: "We can schedule the inspection for Thursday morning if that...",
    time: "2m ago",
    unread: true,
  },
  {
    name: "Riviera Detailing",
    message: "The teak samples have arrived. Would you like to review...",
    time: "1h ago",
    unread: false,
  },
];

const upcomingServices = [
  {
    day: "18",
    month: "Sep",
    title: "Generator Service",
    provider: "Azure Technical Marine",
    time: "09:00 - 12:00",
  },
  {
    day: "21",
    month: "Sep",
    title: "Hull Inspection",
    provider: "Riviera Detailing Co.",
    time: "14:00 - 16:00",
  },
];

const savedProviders = [
  {
    id: "azure-technical",
    name: "Azure Technical",
    specialty: "Engineering",
    rating: 4.9,
  },
  {
    id: "riviera-detailing",
    name: "Riviera Detailing",
    specialty: "Finishing & Teak",
    rating: 4.8,
  },
  {
    id: "cote-azur-props",
    name: "Cote d'Azur Props",
    specialty: "Propulsion",
    rating: 5.0,
  },
];

export default function DashboardPage() {
  return (
    <>
      <TopAppBar />

      <main className="pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-10">
          <p className="text-on-tertiary-container text-xs font-bold uppercase tracking-widest mb-1">
            Week of September 15 - 21
          </p>
          <h1 className="font-[family-name:var(--font-headline)] text-3xl md:text-5xl font-extrabold text-primary tracking-tight leading-none">
            Welcome, Captain
          </h1>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Active Requests - 8 cols */}
          <div className="md:col-span-8 bg-surface-container-low rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold text-primary">
                Active Requests
              </h2>
              <Link
                href="/request"
                className="text-xs font-bold uppercase tracking-widest text-on-tertiary-container flex items-center gap-1 hover:gap-2 transition-all"
              >
                New Request
                <span className="material-symbols-outlined text-sm">add</span>
              </Link>
            </div>
            <div className="space-y-4">
              {activeRequests.map((request) => (
                <Link
                  key={request.id}
                  href={`/quotes`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container-high transition-colors group"
                >
                  <div className="bg-secondary-container w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-2xl">
                      {request.icon}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-on-surface">
                        {request.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${request.statusColor}`}
                      >
                        {request.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-on-surface-variant text-sm">
                        {request.provider}
                      </p>
                      <span className="text-outline text-[10px] uppercase tracking-widest font-semibold">
                        {request.date}
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
                    chevron_right
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Messages - 4 cols */}
          <div className="md:col-span-4 bg-surface-container-low rounded-2xl p-6">
            <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold text-primary mb-6">
              Recent Messages
            </h2>
            <div className="space-y-4">
              {recentMessages.map((msg) => (
                <div
                  key={msg.name}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-lg">
                      person
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-on-surface">
                        {msg.name}
                      </p>
                      <span className="text-[10px] text-outline uppercase tracking-widest font-semibold">
                        {msg.time}
                      </span>
                    </div>
                    <p className="text-on-surface-variant text-sm truncate">
                      {msg.message}
                    </p>
                  </div>
                  {msg.unread && (
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  )}
                </div>
              ))}
            </div>
            <Link
              href="/messages"
              className="mt-6 block w-full py-3 bg-surface-container-highest text-primary text-center text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-surface-container-high transition-colors"
            >
              View All Messages
            </Link>
          </div>

          {/* Upcoming Services - 5 cols */}
          <div className="md:col-span-5 bg-surface-container-low rounded-2xl p-6">
            <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold text-primary mb-6">
              Upcoming Services
            </h2>
            <div className="space-y-4">
              {upcomingServices.map((service) => (
                <div
                  key={service.title}
                  className="flex items-center gap-4 group"
                >
                  <div className="bg-primary rounded-xl w-14 h-14 flex flex-col items-center justify-center shrink-0">
                    <span className="text-white text-lg font-bold leading-none">
                      {service.day}
                    </span>
                    <span className="text-white/60 text-[10px] uppercase tracking-wider font-semibold">
                      {service.month}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-on-surface text-sm">
                      {service.title}
                    </h3>
                    <p className="text-on-surface-variant text-xs">
                      {service.provider}
                    </p>
                    <p className="text-outline text-[10px] uppercase tracking-widest font-semibold mt-1">
                      {service.time}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
                    chevron_right
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Blackbook - 7 cols */}
          <div className="md:col-span-7 bg-surface-container-low rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold text-primary">
                Saved Blackbook
              </h2>
              <Link
                href="/discover"
                className="text-xs font-bold uppercase tracking-widest text-on-tertiary-container flex items-center gap-1 hover:gap-2 transition-all"
              >
                Discover More
                <span className="material-symbols-outlined text-sm">east</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {savedProviders.map((provider) => (
                <Link
                  key={provider.id}
                  href={`/provider/${provider.id}`}
                  className="bg-surface-container-lowest rounded-xl p-5 text-center hover:shadow-lg hover:shadow-primary-container/10 transition-all group"
                >
                  <div className="w-14 h-14 rounded-full bg-secondary-container mx-auto mb-3 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-2xl">
                      engineering
                    </span>
                  </div>
                  <h3 className="font-semibold text-on-surface text-sm mb-1">
                    {provider.name}
                  </h3>
                  <p className="text-on-surface-variant text-xs mb-2">
                    {provider.specialty}
                  </p>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-primary font-bold text-sm">
                      {provider.rating}
                    </span>
                    <span
                      className="material-symbols-outlined text-primary text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <ConciergeFAB />
      <BottomNav />
    </>
  );
}
