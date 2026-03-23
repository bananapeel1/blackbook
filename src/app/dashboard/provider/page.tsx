import TopAppBar from "@/components/TopAppBar";
import BottomNav from "@/components/BottomNav";
import ConciergeFAB from "@/components/ConciergeFAB";
import Link from "next/link";

const kpis = [
  {
    label: "Total Earnings",
    value: "$12,450.80",
    change: "+12%",
    changePositive: true,
    icon: "account_balance_wallet",
  },
  {
    label: "Active Quotes",
    value: "08",
    change: null,
    icon: "request_quote",
  },
  {
    label: "Service Rating",
    value: "4.9/5.0",
    change: "14m response",
    changePositive: true,
    icon: "stars",
  },
];

const newRequests = [
  {
    id: "req-001",
    vessel: "MY Blue Horizon II",
    service: "Engine Diagnostics & Repair",
    budget: "$1,200 - $1,500",
    time: "2h ago",
    icon: "manufacturing",
    urgent: true,
  },
  {
    id: "req-002",
    vessel: "SY Windchaser",
    service: "A/C System Inspection",
    budget: "$450 - $600",
    time: "5h ago",
    icon: "ac_unit",
    urgent: false,
  },
];

const schedule = [
  {
    time: "09:00",
    title: "Generator Service",
    vessel: "MY Sovereign",
    status: "In Progress",
    statusColor: "bg-tertiary-container text-on-tertiary-container",
  },
  {
    time: "13:30",
    title: "Pre-Departure Inspection",
    vessel: "SY Athena",
    status: "Upcoming",
    statusColor: "bg-secondary-container text-on-secondary-container",
  },
  {
    time: "16:00",
    title: "A/C Filter Replacement",
    vessel: "MY Carinthia",
    status: "Upcoming",
    statusColor: "bg-secondary-container text-on-secondary-container",
  },
];

export default function ProviderDashboardPage() {
  return (
    <>
      <TopAppBar />

      <main className="pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-[family-name:var(--font-headline)] text-3xl md:text-5xl font-extrabold text-primary tracking-tight leading-none">
                Provider Dashboard
              </h1>
              <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                Active Port
              </span>
            </div>
            <p className="text-on-surface-variant text-lg font-light">
              Welcome back, Captain Miller
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-surface-container-low text-on-surface px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-surface-container-high transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">
                settings
              </span>
              Settings
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="bg-surface-container-low rounded-2xl p-6 flex items-start gap-4"
            >
              <div className="bg-secondary-container w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-2xl">
                  {kpi.icon}
                </span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">
                  {kpi.label}
                </p>
                <p className="font-[family-name:var(--font-headline)] text-2xl font-bold text-primary">
                  {kpi.value}
                </p>
                {kpi.change && (
                  <p
                    className={`text-xs font-semibold mt-1 ${
                      kpi.changePositive
                        ? "text-on-tertiary-container"
                        : "text-on-surface-variant"
                    }`}
                  >
                    {kpi.changePositive && (
                      <span className="material-symbols-outlined text-xs align-middle mr-0.5">
                        trending_up
                      </span>
                    )}
                    {kpi.change}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* New Requests - 7 cols */}
          <div className="md:col-span-7 bg-surface-container-low rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold text-primary">
                New Requests
              </h2>
              <span className="text-xs text-on-surface-variant font-semibold">
                {newRequests.length} pending
              </span>
            </div>
            <div className="space-y-4">
              {newRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-surface-container-lowest rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="bg-secondary-container w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-2xl">
                        {request.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-on-surface text-sm">
                          {request.service}
                        </h3>
                        {request.urgent && (
                          <span className="bg-error-container text-on-error-container px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                            Urgent
                          </span>
                        )}
                      </div>
                      <p className="text-on-surface-variant text-xs">
                        {request.vessel}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-primary font-bold text-sm">
                          {request.budget}
                        </span>
                        <span className="text-outline text-[10px] uppercase tracking-widest font-semibold">
                          {request.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/quotes"
                    className="bg-primary text-on-primary px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-colors text-center shrink-0"
                  >
                    Send Quote
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule - 5 cols */}
          <div className="md:col-span-5 bg-surface-container-low rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold text-primary">
                Today&apos;s Schedule
              </h2>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">
                Sep 15
              </span>
            </div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[27px] top-2 bottom-2 w-px bg-outline-variant/30" />

              <div className="space-y-6">
                {schedule.map((item, i) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-3.5 h-3.5 rounded-full border-2 ${
                          i === 0
                            ? "bg-primary border-primary"
                            : "bg-surface-container-lowest border-outline-variant"
                        }`}
                      />
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-primary font-bold text-sm">
                          {item.time}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${item.statusColor}`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <h3 className="font-semibold text-on-surface text-sm">
                        {item.title}
                      </h3>
                      <p className="text-on-surface-variant text-xs">
                        {item.vessel}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <ConciergeFAB />
      <BottomNav />
    </>
  );
}
