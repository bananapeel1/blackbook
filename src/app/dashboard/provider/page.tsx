import Link from "next/link";
import {
  getProviderForUser,
  getMatchingRequests,
  getProviderQuotes,
} from "@/lib/supabase/queries";

function formatTimeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default async function ProviderDashboardPage() {
  const provider = await getProviderForUser();

  if (!provider) {
    return (
      <main className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="bg-secondary-container w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-4xl">
                engineering
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-headline)] text-3xl md:text-5xl font-extrabold text-primary tracking-tight leading-none mb-4">
              Become a Provider
            </h1>
            <p className="text-on-surface-variant text-lg font-light max-w-md mb-8">
              Join Blackbook&apos;s network of trusted marine service providers
              and start receiving requests from boat owners.
            </p>
            <Link
              href="/join"
              className="bg-primary text-on-primary px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-colors"
            >
              Apply Now
            </Link>
          </div>
      </main>
    );
  }

  const [requests, quotes] = await Promise.all([
    getMatchingRequests(provider.id),
    getProviderQuotes(provider.id),
  ]);

  // Compute real KPIs
  const totalEarnings = quotes
    .filter((q: any) => q.status === "accepted")
    .reduce((sum: number, q: any) => sum + (q.amount ?? 0), 0);

  const activeQuoteCount = quotes.filter(
    (q: any) => q.status === "sent" || q.status === "pending"
  ).length;

  const kpis = [
    {
      label: "Total Earnings",
      value: formatCurrency(totalEarnings, "EUR"),
      change: totalEarnings > 0 ? `${quotes.filter((q: any) => q.status === "accepted").length} jobs` : null,
      changePositive: true,
      icon: "account_balance_wallet",
    },
    {
      label: "Active Quotes",
      value: String(activeQuoteCount).padStart(2, "0"),
      change: null,
      icon: "request_quote",
    },
    {
      label: "Service Rating",
      value: `${provider.avg_rating.toFixed(1)}/5.0`,
      change: provider.avg_response_time_minutes
        ? `${provider.avg_response_time_minutes}m response`
        : null,
      changePositive: true,
      icon: "stars",
    },
  ];

  // Active quotes for the schedule section
  const activeQuotes = quotes
    .filter((q: any) => q.status === "accepted" || q.status === "sent")
    .slice(0, 3);

  return (
    <main className="px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="font-[family-name:var(--font-headline)] text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
                Dashboard
              </h1>
              <span
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                  provider.availability === "available"
                    ? "bg-emerald-100 text-emerald-700"
                    : provider.availability === "busy"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {provider.availability === "available"
                  ? "Active"
                  : provider.availability === "busy"
                  ? "Busy"
                  : "Unavailable"}
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">
              Welcome back, {provider.business_name}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/provider/settings"
              className="bg-white text-slate-700 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">
                settings
              </span>
              Settings
            </Link>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="bg-white rounded-xl p-5 flex items-start gap-4 border border-slate-200/60"
            >
              <div className="bg-slate-100 w-11 h-11 rounded-lg flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-slate-700 text-xl">
                  {kpi.icon}
                </span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">
                  {kpi.label}
                </p>
                <p className="font-[family-name:var(--font-headline)] text-2xl font-bold text-slate-900">
                  {kpi.value}
                </p>
                {kpi.change && (
                  <p
                    className={`text-xs font-semibold mt-1 ${
                      kpi.changePositive
                        ? "text-emerald-600"
                        : "text-slate-500"
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* New Requests - 7 cols */}
          <div className="md:col-span-7 bg-white rounded-xl p-5 md:p-6 border border-slate-200/60">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-[family-name:var(--font-headline)] text-lg font-bold text-slate-900">
                New Requests
              </h2>
              <span className="text-xs text-slate-400 font-semibold">
                {requests.length} pending
              </span>
            </div>

            {requests.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-slate-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-slate-400 text-3xl">
                    inbox
                  </span>
                </div>
                <h3 className="font-semibold text-slate-700 text-sm mb-1">
                  No matching requests
                </h3>
                <p className="text-slate-400 text-xs max-w-xs">
                  New service requests matching your coverage zones and
                  categories will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {requests.map((request: any) => (
                  <div
                    key={request.id}
                    className="bg-slate-50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4 border border-slate-100"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="bg-slate-200 w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-slate-700 text-xl">
                          {request.category?.icon ?? "build"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-slate-800 text-sm">
                            {request.title}
                          </h3>
                          {request.urgency === "emergency" && (
                            <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                              Emergency
                            </span>
                          )}
                          {request.urgency === "priority" && (
                            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                              Urgent
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                          {request.category && (
                            <span>{request.category.name}</span>
                          )}
                          {request.location && (
                            <>
                              <span className="text-slate-300">·</span>
                              <span className="flex items-center gap-0.5">
                                <span className="material-symbols-outlined text-xs">
                                  location_on
                                </span>
                                {request.location.name}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          {(request.budget_min || request.budget_max) && (
                            <span className="text-slate-900 font-bold text-sm">
                              {request.budget_min && request.budget_max
                                ? `${formatCurrency(request.budget_min, request.currency)} - ${formatCurrency(request.budget_max, request.currency)}`
                                : request.budget_max
                                ? `Up to ${formatCurrency(request.budget_max, request.currency)}`
                                : `From ${formatCurrency(request.budget_min!, request.currency)}`}
                            </span>
                          )}
                          {request.preferred_date && (
                            <span className="text-slate-400 text-[10px] uppercase tracking-widest font-semibold">
                              {new Date(request.preferred_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </span>
                          )}
                          <span className="text-slate-300 text-[10px] uppercase tracking-widest font-semibold">
                            {formatTimeAgo(request.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/dashboard/provider/request/${request.id}`}
                      className="bg-amber-500 text-slate-900 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-amber-400 transition-colors text-center shrink-0"
                    >
                      Send Quote
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active Quotes - 5 cols */}
          <div className="md:col-span-5 bg-white rounded-xl p-5 border border-slate-200/60">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-[family-name:var(--font-headline)] text-lg font-bold text-slate-900">
                Active Quotes
              </h2>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                {activeQuotes.length} active
              </span>
            </div>

            {activeQuotes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-slate-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-slate-400 text-3xl">
                    request_quote
                  </span>
                </div>
                <h3 className="font-semibold text-slate-700 text-sm mb-1">
                  No active quotes
                </h3>
                <p className="text-slate-400 text-xs max-w-xs">
                  Quotes you send to boat owners will be tracked here.
                </p>
              </div>
            ) : (
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[27px] top-2 bottom-2 w-px bg-slate-200" />

                <div className="space-y-5">
                  {activeQuotes.map((quote: any, i: number) => {
                    const statusLabel =
                      quote.status === "accepted"
                        ? "Accepted"
                        : quote.status === "sent"
                        ? "Sent"
                        : "Pending";
                    const statusColor =
                      quote.status === "accepted"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-600";

                    return (
                      <div key={quote.id} className="flex items-start gap-4">
                        <div className="relative z-10 flex flex-col items-center">
                          <div
                            className={`w-3.5 h-3.5 rounded-full border-2 ${
                              i === 0
                                ? "bg-amber-500 border-amber-500"
                                : "bg-white border-slate-300"
                            }`}
                          />
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-slate-900 font-bold text-sm">
                              {formatCurrency(quote.amount, quote.currency)}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${statusColor}`}
                            >
                              {statusLabel}
                            </span>
                          </div>
                          <h3 className="font-semibold text-slate-700 text-sm">
                            {quote.request?.title ?? "Service Request"}
                          </h3>
                          <p className="text-slate-400 text-xs">
                            {quote.estimated_duration ?? "Duration TBD"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
    </main>
  );
}
