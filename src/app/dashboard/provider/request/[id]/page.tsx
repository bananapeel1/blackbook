import { redirect } from "next/navigation";
import Link from "next/link";
import NavWrapper from "@/components/NavWrapper";
import {
  getRequestById,
  getProviderForUser,
} from "@/lib/supabase/queries";
import QuoteForm from "./QuoteForm";

export default async function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [request, provider] = await Promise.all([
    getRequestById(id),
    getProviderForUser(),
  ]);

  if (!provider) {
    redirect("/join");
  }

  if (!request) {
    redirect("/dashboard/provider");
  }

  const urgencyBadge: Record<string, { label: string; color: string }> = {
    emergency: {
      label: "Emergency",
      color: "bg-error-container text-on-error-container",
    },
    priority: {
      label: "Priority",
      color: "bg-error-container text-on-error-container",
    },
    standard: {
      label: "Standard",
      color: "bg-secondary-container text-on-secondary-container",
    },
  };

  const badge = urgencyBadge[request.urgency] ?? urgencyBadge.standard;

  const attachments = Array.isArray(request.attachments)
    ? (request.attachments as Array<{ name?: string; url?: string }>)
    : [];

  return (
    <>
      <NavWrapper />

      <main className="pt-24 pb-40 px-4 md:px-8 max-w-4xl mx-auto">
        {/* Back button */}
        <Link
          href="/dashboard/provider"
          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors mb-6"
        >
          <span className="material-symbols-outlined text-lg">
            arrow_back
          </span>
          Back to Dashboard
        </Link>

        {/* Request Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-[family-name:var(--font-headline)] text-3xl md:text-4xl font-extrabold text-primary tracking-tight leading-none">
              {request.title}
            </h1>
            <span
              className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${badge.color}`}
            >
              {badge.label}
            </span>
          </div>
          <div className="flex items-center gap-3 text-on-surface-variant text-sm">
            <span className="text-[10px] uppercase tracking-widest font-bold text-outline">
              {request.status.replace(/_/g, " ")}
            </span>
          </div>
        </div>

        {/* Request Details Card */}
        <div className="bg-surface-container-low rounded-2xl p-6 md:p-8 mb-6">
          {/* Description */}
          {request.description && (
            <div className="mb-6">
              <h3 className="font-[family-name:var(--font-headline)] text-lg font-bold text-primary mb-3">
                Description
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {request.description}
              </p>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Category */}
            {request.category && (
              <div className="flex items-start gap-3">
                <div className="bg-secondary-container w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-xl">
                    {request.category.icon ?? "category"}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-0.5">
                    Category
                  </p>
                  <p className="text-on-surface text-sm font-semibold">
                    {request.category.name}
                  </p>
                </div>
              </div>
            )}

            {/* Location */}
            {request.location && (
              <div className="flex items-start gap-3">
                <div className="bg-secondary-container w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-xl">
                    location_on
                  </span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-0.5">
                    Location
                  </p>
                  <p className="text-on-surface text-sm font-semibold">
                    {request.location.name}
                  </p>
                  {request.location.region && (
                    <p className="text-on-surface-variant text-xs">
                      {request.location.region}, {request.location.country}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Preferred Date */}
            {request.preferred_date && (
              <div className="flex items-start gap-3">
                <div className="bg-secondary-container w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-xl">
                    calendar_today
                  </span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-0.5">
                    Preferred Date
                  </p>
                  <p className="text-on-surface text-sm font-semibold">
                    {new Date(request.preferred_date).toLocaleDateString(
                      "en-US",
                      { weekday: "long", month: "long", day: "numeric" }
                    )}
                  </p>
                  {request.preferred_time && (
                    <p className="text-on-surface-variant text-xs">
                      {request.preferred_time}
                    </p>
                  )}
                  {request.flexible_dates && (
                    <p className="text-on-surface-variant text-xs">
                      Flexible on dates
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Budget */}
            {(request.budget_min || request.budget_max) && (
              <div className="flex items-start gap-3">
                <div className="bg-secondary-container w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-xl">
                    payments
                  </span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-0.5">
                    Budget Range
                  </p>
                  <p className="text-on-surface text-sm font-semibold">
                    {request.budget_min && request.budget_max
                      ? `${request.currency} ${request.budget_min.toLocaleString()} - ${request.budget_max.toLocaleString()}`
                      : request.budget_max
                      ? `Up to ${request.currency} ${request.budget_max.toLocaleString()}`
                      : `From ${request.currency} ${request.budget_min!.toLocaleString()}`}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Vessel Info */}
          {request.vessel && (
            <div className="mt-6 pt-6 border-t border-outline-variant/20">
              <h3 className="font-[family-name:var(--font-headline)] text-lg font-bold text-primary mb-3">
                Vessel Details
              </h3>
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
                    {request.vessel.manufacturer ?? ""}{" "}
                    {request.vessel.model ?? ""}
                  </p>
                  {request.vessel.year && (
                    <p className="text-on-surface-variant text-xs">
                      Year: {request.vessel.year}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Berth Info */}
          {request.berth_info && (
            <div className="mt-6 pt-6 border-t border-outline-variant/20">
              <h3 className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
                Berth Information
              </h3>
              <p className="text-on-surface text-sm">{request.berth_info}</p>
            </div>
          )}

          {/* Attachments */}
          {attachments.length > 0 && (
            <div className="mt-6 pt-6 border-t border-outline-variant/20">
              <h3 className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-3">
                Attachments
              </h3>
              <div className="space-y-2">
                {attachments.map((att, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-surface-container-lowest rounded-xl px-4 py-3"
                  >
                    <span className="material-symbols-outlined text-primary text-xl">
                      attach_file
                    </span>
                    <span className="text-on-surface text-sm font-medium">
                      {att.name ?? `Attachment ${i + 1}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Location Map Placeholder */}
        {request.location && (
          <div className="bg-surface-container-low rounded-2xl p-6 mb-6">
            <h3 className="font-[family-name:var(--font-headline)] text-lg font-bold text-primary mb-3">
              Location
            </h3>
            <div className="bg-surface-container-highest rounded-xl h-48 flex items-center justify-center">
              <div className="text-center">
                <span className="material-symbols-outlined text-outline text-4xl mb-2">
                  map
                </span>
                <p className="text-on-surface-variant text-sm">
                  {request.location.name}
                </p>
                {request.location.latitude && request.location.longitude && (
                  <p className="text-outline text-xs mt-1">
                    {request.location.latitude.toFixed(4)},{" "}
                    {request.location.longitude.toFixed(4)}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Quote Form */}
        <QuoteForm
          requestId={request.id}
          providerId={provider.id}
          currency={request.currency}
        />
      </main>

    </>
  );
}
