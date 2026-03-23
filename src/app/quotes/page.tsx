import NavWrapper from "@/components/NavWrapper";
import ConciergeFAB from "@/components/ConciergeFAB";
import Link from "next/link";
import { getRequestsForUser } from "@/lib/supabase/queries";

function formatTimeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  collecting_quotes: {
    label: "Collecting Quotes",
    color: "bg-secondary-container text-on-secondary-container",
  },
  quotes_received: {
    label: "Quotes Ready",
    color: "bg-tertiary-container text-on-tertiary-container",
  },
  accepted: {
    label: "Accepted",
    color: "bg-tertiary-container text-on-tertiary-container",
  },
  in_progress: {
    label: "In Progress",
    color: "bg-tertiary-container text-on-tertiary-container",
  },
  submitted: {
    label: "Submitted",
    color: "bg-secondary-container text-on-secondary-container",
  },
};

export default async function QuotesListPage() {
  const requests = await getRequestsForUser();

  // Only show requests that could have quotes
  const requestsWithQuotes = requests.filter(
    (r: any) =>
      r.matched_provider_count > 0 ||
      ["collecting_quotes", "quotes_received", "accepted", "in_progress"].includes(
        r.status
      )
  );

  return (
    <>
      <NavWrapper />

      <main className="pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="font-[family-name:var(--font-headline)] text-3xl md:text-5xl font-extrabold text-primary tracking-tight leading-none mb-2">
              My Quotes
            </h1>
            <p className="text-on-surface-variant text-lg font-light">
              Compare and accept proposals from providers
            </p>
          </div>
          <Link
            href="/dashboard"
            className="text-xs font-bold uppercase tracking-widest text-on-surface-variant flex items-center gap-1 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-lg">
              arrow_back
            </span>
            Dashboard
          </Link>
        </div>

        {requestsWithQuotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-secondary-container w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-4xl">
                request_quote
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-primary mb-2">
              No Quotes Yet
            </h2>
            <p className="text-on-surface-variant text-sm max-w-md mb-8">
              Once you submit a service request, quotes from providers will
              appear here for you to compare.
            </p>
            <Link
              href="/request"
              className="bg-primary text-on-primary px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-colors"
            >
              Create Request
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {requestsWithQuotes.map((request: any) => {
              const status = statusConfig[request.status] ??
                statusConfig.submitted;

              return (
                <Link
                  key={request.id}
                  href={`/quotes/${request.id}`}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-colors group"
                >
                  <div className="bg-secondary-container w-14 h-14 rounded-xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-2xl">
                      {request.category?.icon ?? "request_quote"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-[family-name:var(--font-headline)] text-lg font-bold text-primary">
                        {request.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shrink-0 ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-on-surface-variant text-sm">
                        {request.matched_provider_count} quote
                        {request.matched_provider_count !== 1 ? "s" : ""}
                      </span>
                      {request.category && (
                        <>
                          <span className="text-outline">·</span>
                          <span className="text-on-surface-variant text-sm">
                            {request.category.name}
                          </span>
                        </>
                      )}
                      <span className="text-outline text-[10px] uppercase tracking-widest font-semibold ml-auto">
                        {formatTimeAgo(request.created_at)}
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
                    chevron_right
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      <ConciergeFAB />
    </>
  );
}
