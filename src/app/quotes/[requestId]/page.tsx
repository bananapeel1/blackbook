import { redirect } from "next/navigation";
import NavWrapper from "@/components/NavWrapper";
import ConciergeFAB from "@/components/ConciergeFAB";
import Link from "next/link";
import {
  getRequestById,
  getQuotesForRequest,
} from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import AcceptQuoteButton from "./AcceptQuoteButton";

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function QuoteComparisonPage({
  params,
}: {
  params: Promise<{ requestId: string }>;
}) {
  const { requestId } = await params;

  // Verify user owns this request
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [request, quotes] = await Promise.all([
    getRequestById(requestId),
    getQuotesForRequest(requestId),
  ]);

  if (!request || !user || request.user_id !== user.id) {
    redirect("/dashboard");
  }

  // Sort: highest trust score first, mark the top one as highlighted
  const sortedQuotes = [...quotes].sort(
    (a: any, b: any) =>
      (b.provider?.reliability_score ?? 0) -
      (a.provider?.reliability_score ?? 0)
  );

  const highlightedIndex =
    sortedQuotes.length > 0
      ? sortedQuotes.reduce(
          (bestIdx, q, idx) =>
            (q as any).provider?.reliability_score >
            (sortedQuotes[bestIdx] as any).provider?.reliability_score
              ? idx
              : bestIdx,
          0
        )
      : -1;

  return (
    <>
      <NavWrapper />

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
              {request.title}
            </h1>
            <div className="flex items-center gap-3">
              {sortedQuotes.length > 0 ? (
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-xs"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                  {sortedQuotes.length} Verified Proposal
                  {sortedQuotes.length > 1 ? "s" : ""}
                </span>
              ) : (
                <span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-lg text-xs font-semibold">
                  Waiting for quotes
                </span>
              )}
            </div>
          </div>
          {sortedQuotes.length > 1 && (
            <div className="flex items-center gap-3">
              <button className="bg-surface-container-low text-on-surface px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-surface-container-high transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">
                  filter_list
                </span>
                Sort by Price
              </button>
            </div>
          )}
        </div>

        {/* No quotes state */}
        {sortedQuotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-secondary-container w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-4xl">
                hourglass_empty
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-primary mb-2">
              Waiting for Quotes
            </h2>
            <p className="text-on-surface-variant text-sm max-w-md mb-8">
              Your request has been sent to matching providers. You&apos;ll
              receive notifications as quotes come in.
            </p>
            <Link
              href="/dashboard"
              className="bg-surface-container-low text-on-surface px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-surface-container-high transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        ) : (
          <>
            {/* Quote Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {sortedQuotes.map((quote: any, idx: number) => {
                const isHighlighted = idx === highlightedIndex;
                const provider = quote.provider;
                const trustScore = provider?.reliability_score ?? 0;

                // Label logic
                let label = "Proposal";
                let labelColor =
                  "bg-secondary-container text-on-secondary-container";
                if (isHighlighted) {
                  label = "Premium Service";
                  labelColor = "bg-primary text-on-primary";
                } else if (
                  idx ===
                  sortedQuotes.reduce(
                    (minIdx: number, q: any, i: number) =>
                      q.amount < sortedQuotes[minIdx].amount ? i : minIdx,
                    0
                  )
                ) {
                  label = "Best Value";
                  labelColor =
                    "bg-tertiary-container text-on-tertiary-container";
                }

                return (
                  <div
                    key={quote.id}
                    className={`rounded-2xl p-6 flex flex-col justify-between transition-all ${
                      isHighlighted
                        ? "bg-primary ring-2 ring-tertiary-fixed shadow-2xl shadow-primary-container/20"
                        : "bg-surface-container-low"
                    }`}
                  >
                    <div>
                      {/* Label */}
                      <span
                        className={`inline-block px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider mb-4 ${labelColor}`}
                      >
                        {label}
                      </span>

                      {/* Provider Name */}
                      <h3
                        className={`font-[family-name:var(--font-headline)] text-xl font-bold mb-1 ${
                          isHighlighted ? "text-white" : "text-primary"
                        }`}
                      >
                        {provider?.business_name ?? "Provider"}
                      </h3>

                      {/* Verification badge */}
                      {provider?.verification_status === "verified" ||
                      provider?.verification_status === "premium" ? (
                        <div className="flex items-center gap-1 mb-3">
                          <span
                            className={`material-symbols-outlined text-sm ${
                              isHighlighted
                                ? "text-tertiary-fixed"
                                : "text-primary"
                            }`}
                            style={{
                              fontVariationSettings: "'FILL' 1",
                            }}
                          >
                            verified
                          </span>
                          <span
                            className={`text-xs font-semibold ${
                              isHighlighted
                                ? "text-white/70"
                                : "text-on-surface-variant"
                            }`}
                          >
                            Verified
                          </span>
                        </div>
                      ) : null}

                      {/* Price */}
                      <p
                        className={`font-[family-name:var(--font-headline)] text-4xl font-extrabold tracking-tight mb-4 ${
                          isHighlighted
                            ? "text-tertiary-fixed"
                            : "text-primary"
                        }`}
                      >
                        {formatCurrency(quote.amount, quote.currency)}
                      </p>

                      {/* Details */}
                      <div className="space-y-3 mb-6">
                        {/* Duration */}
                        {quote.estimated_duration && (
                          <div className="flex items-center gap-2">
                            <span
                              className={`material-symbols-outlined text-lg ${
                                isHighlighted
                                  ? "text-white/60"
                                  : "text-on-surface-variant"
                              }`}
                            >
                              schedule
                            </span>
                            <span
                              className={`text-sm ${
                                isHighlighted
                                  ? "text-white/80"
                                  : "text-on-surface-variant"
                              }`}
                            >
                              {quote.estimated_duration}
                            </span>
                          </div>
                        )}

                        {/* Earliest start */}
                        {quote.earliest_start && (
                          <div className="flex items-center gap-2">
                            <span
                              className={`material-symbols-outlined text-lg ${
                                isHighlighted
                                  ? "text-white/60"
                                  : "text-on-surface-variant"
                              }`}
                            >
                              event_available
                            </span>
                            <span
                              className={`text-sm ${
                                isHighlighted
                                  ? "text-white/80"
                                  : "text-on-surface-variant"
                              }`}
                            >
                              {quote.earliest_start}
                            </span>
                          </div>
                        )}

                        {/* Warranty */}
                        {quote.warranty_months && (
                          <div className="flex items-center gap-2">
                            <span
                              className={`material-symbols-outlined text-lg ${
                                isHighlighted
                                  ? "text-white/60"
                                  : "text-on-surface-variant"
                              }`}
                            >
                              shield
                            </span>
                            <span
                              className={`text-sm ${
                                isHighlighted
                                  ? "text-white/80"
                                  : "text-on-surface-variant"
                              }`}
                            >
                              {quote.warranty_months}mo warranty
                            </span>
                          </div>
                        )}

                        {/* Trust Score */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span
                              className={`text-xs font-semibold ${
                                isHighlighted
                                  ? "text-white/60"
                                  : "text-on-surface-variant"
                              }`}
                            >
                              Trust Score
                            </span>
                            <span
                              className={`text-sm font-bold ${
                                isHighlighted
                                  ? "text-tertiary-fixed"
                                  : "text-primary"
                              }`}
                            >
                              {trustScore}%
                            </span>
                          </div>
                          <div
                            className={`w-full h-2 rounded-full ${
                              isHighlighted
                                ? "bg-white/10"
                                : "bg-surface-container-high"
                            }`}
                          >
                            <div
                              className={`h-2 rounded-full ${
                                isHighlighted
                                  ? "bg-tertiary-fixed"
                                  : "bg-primary"
                              }`}
                              style={{ width: `${trustScore}%` }}
                            />
                          </div>
                        </div>

                        {/* Rating */}
                        {provider?.avg_rating > 0 && (
                          <div className="flex items-center gap-2 pt-1">
                            <span
                              className={`material-symbols-outlined text-sm ${
                                isHighlighted
                                  ? "text-tertiary-fixed"
                                  : "text-primary"
                              }`}
                              style={{
                                fontVariationSettings: "'FILL' 1",
                              }}
                            >
                              star
                            </span>
                            <span
                              className={`text-sm font-bold ${
                                isHighlighted
                                  ? "text-white"
                                  : "text-on-surface"
                              }`}
                            >
                              {provider.avg_rating.toFixed(1)}
                            </span>
                            {provider.total_reviews > 0 && (
                              <span
                                className={`text-xs ${
                                  isHighlighted
                                    ? "text-white/60"
                                    : "text-on-surface-variant"
                                }`}
                              >
                                ({provider.total_reviews} review
                                {provider.total_reviews > 1 ? "s" : ""})
                              </span>
                            )}
                          </div>
                        )}

                        {/* Description */}
                        {quote.description && (
                          <p
                            className={`text-sm leading-relaxed pt-2 ${
                              isHighlighted
                                ? "text-white/70"
                                : "text-on-surface-variant"
                            }`}
                          >
                            {quote.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* CTA */}
                    {quote.status !== "accepted" ? (
                      <AcceptQuoteButton
                        quoteId={quote.id}
                        highlighted={isHighlighted}
                      />
                    ) : (
                      <div className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-center bg-tertiary-container text-on-tertiary-container">
                        Accepted
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Request Description - 4 cols */}
              <div className="md:col-span-4 bg-surface-container-low rounded-2xl p-6">
                <h3 className="font-[family-name:var(--font-headline)] text-lg font-bold text-primary mb-4">
                  Request Description
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                  {request.description ?? "No description provided."}
                </p>
                <div className="flex flex-wrap gap-2">
                  {request.category && (
                    <span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                      {request.category.name}
                    </span>
                  )}
                  {request.urgency !== "standard" && (
                    <span className="bg-error-container text-on-error-container px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                      {request.urgency === "emergency"
                        ? "Emergency"
                        : "Priority"}
                    </span>
                  )}
                </div>
              </div>

              {/* Vessel Info - 4 cols */}
              <div className="md:col-span-4 bg-surface-container-low rounded-2xl p-6">
                <h3 className="font-[family-name:var(--font-headline)] text-lg font-bold text-primary mb-4">
                  Vessel Details
                </h3>
                {request.vessel ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-secondary-container w-14 h-14 rounded-xl flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-3xl">
                          sailing
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-on-surface">
                          {request.vessel.name}
                        </h4>
                        <p className="text-on-surface-variant text-sm">
                          {request.vessel.length_meters
                            ? `${request.vessel.length_meters}m `
                            : ""}
                          {request.vessel.manufacturer ?? ""}
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-outline-variant/20 pt-4 space-y-2">
                      {request.location && (
                        <div className="flex items-center justify-between">
                          <span className="text-on-surface-variant text-sm">
                            Location
                          </span>
                          <span className="text-on-surface text-sm font-medium">
                            {request.location.name}
                          </span>
                        </div>
                      )}
                      {request.vessel.type && (
                        <div className="flex items-center justify-between">
                          <span className="text-on-surface-variant text-sm">
                            Type
                          </span>
                          <span className="text-on-surface text-sm font-medium">
                            {request.vessel.type.replace(/_/g, " ")}
                          </span>
                        </div>
                      )}
                      {request.vessel.year && (
                        <div className="flex items-center justify-between">
                          <span className="text-on-surface-variant text-sm">
                            Year
                          </span>
                          <span className="text-on-surface text-sm font-medium">
                            {request.vessel.year}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-on-surface-variant text-sm">
                    No vessel details provided.
                  </p>
                )}
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
                    questions? Our concierge team can guide you through the
                    decision.
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
          </>
        )}
      </main>

      <ConciergeFAB />
    </>
  );
}
