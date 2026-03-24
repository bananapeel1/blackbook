import NavWrapper from "@/components/NavWrapper";
import ConciergeFAB from "@/components/ConciergeFAB";
import Link from "next/link";
import {
  getRequestsForUser,
  getConversationsForUser,
} from "@/lib/supabase/queries";

function getMaterialIcon(icon: string | null): string {
  const map: Record<string, string> = {
    wrench: 'build', zap: 'bolt', anchor: 'anchor', fuel: 'local_gas_station',
    'shopping-cart': 'local_shipping', car: 'directions_car', sparkles: 'auto_awesome',
    'chef-hat': 'restaurant', camera: 'photo_camera', flower: 'local_florist',
    droplets: 'water_drop', paintbrush: 'brush', glasses: 'scuba_diving',
    wind: 'air', package: 'inventory_2', 'shopping-bag': 'shopping_bag',
    thermometer: 'thermostat', battery: 'power', snowflake: 'ac_unit',
    droplet: 'water_drop', palette: 'palette', shirt: 'dry_cleaning',
    flame: 'local_fire_department', 'trash-2': 'delete_sweep',
    'file-text': 'description', 'life-buoy': 'support',
    'party-popper': 'celebration', music: 'music_note', sparkle: 'auto_awesome',
    utensils: 'restaurant_menu', shield: 'shield', heart: 'spa',
    crown: 'diamond', star: 'concierge',
  };
  return icon ? (map[icon] ?? 'handyman') : 'handyman';
}

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

const statusConfig: Record<
  string,
  { label: string; color: string }
> = {
  submitted: {
    label: "Submitted",
    color: "bg-secondary-container text-on-secondary-container",
  },
  collecting_quotes: {
    label: "Collecting Quotes",
    color: "bg-secondary-container text-on-secondary-container",
  },
  quotes_received: {
    label: "Action Required",
    color: "bg-error-container text-on-error-container",
  },
  accepted: {
    label: "Accepted",
    color: "bg-tertiary-container text-on-tertiary-container",
  },
  in_progress: {
    label: "In Progress",
    color: "bg-tertiary-container text-on-tertiary-container",
  },
  completed: {
    label: "Completed",
    color: "bg-secondary-container text-on-secondary-container",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-surface-container-highest text-on-surface-variant",
  },
};

export default async function DashboardPage() {
  const [requests, conversations] = await Promise.all([
    getRequestsForUser(),
    getConversationsForUser(),
  ]);

  // Active requests (not completed or cancelled)
  const activeRequests = requests.filter(
    (r: any) => !["completed", "cancelled"].includes(r.status)
  );

  // Get the current week label
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  const weekLabel = `Week of ${weekStart.toLocaleDateString("en-US", { month: "long", day: "numeric" })} - ${weekEnd.getDate()}`;

  return (
    <>
      <NavWrapper />

      <main className="pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-10">
          <p className="text-on-tertiary-container text-xs font-bold uppercase tracking-widest mb-1">
            {weekLabel}
          </p>
          <h1 className="font-[family-name:var(--font-headline)] text-3xl md:text-5xl font-extrabold text-primary tracking-tight leading-none">
            Welcome, Captain
          </h1>
        </div>

        {/* Quick Repeat — Recent Requests */}
        {requests.filter((r: any) => r.status === 'completed' || r.status === 'submitted').length > 0 && (
          <section className="mb-10">
            <h2 className="font-[family-name:var(--font-headline)] text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">replay</span>
              Quick Repeat
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {requests
                .filter((r: any) => r.status === 'completed' || r.status === 'submitted')
                .slice(0, 4)
                .map((req: any) => (
                  <Link
                    key={`repeat-${req.id}`}
                    href={`/request?repeat=${req.id}`}
                    className="flex items-center gap-4 bg-surface-container-low rounded-xl p-4 border border-outline-variant/10 hover:bg-surface-container-high transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-on-primary-container text-lg">
                        {getMaterialIcon(req.category?.icon ?? null)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-on-surface truncate">
                        {req.title || req.category?.name || 'Service request'}
                      </p>
                      <p className="text-xs text-on-surface-variant truncate">
                        {req.location?.name || 'No location'}
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      arrow_forward
                    </span>
                  </Link>
                ))}
            </div>
          </section>
        )}

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

            {activeRequests.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-secondary-container w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    directions_boat
                  </span>
                </div>
                <h3 className="font-semibold text-on-surface text-sm mb-1">
                  No requests yet
                </h3>
                <p className="text-on-surface-variant text-xs max-w-xs mb-6">
                  Create your first service request to get quotes from trusted
                  marine providers.
                </p>
                <Link
                  href="/request"
                  className="bg-primary text-on-primary px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-colors"
                >
                  Create Request
                </Link>
              </div>
            ) : (
              <div className="space-y-4 stagger-children">
                {activeRequests.map((request: any) => {
                  const status = statusConfig[request.status] ??
                    statusConfig.submitted;
                  const hasQuotes = request.matched_provider_count > 0;

                  return (
                    <Link
                      key={request.id}
                      href={`/quotes/${request.id}`}
                      className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container-high transition-colors group card-hover"
                    >
                      <div className="bg-secondary-container w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-primary text-2xl">
                          {request.category?.icon ?? "directions_boat"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-on-surface">
                            {request.title}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${status.color}`}
                          >
                            {status.label}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-on-surface-variant text-sm">
                            {hasQuotes
                              ? `${request.matched_provider_count} provider${request.matched_provider_count > 1 ? "s" : ""} responding`
                              : "Waiting for providers"}
                          </p>
                          <span className="text-outline text-[10px] uppercase tracking-widest font-semibold">
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
          </div>

          {/* Recent Messages - 4 cols */}
          <div className="md:col-span-4 bg-surface-container-low rounded-2xl p-6">
            <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold text-primary mb-6">
              Recent Messages
            </h2>

            {conversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <span className="material-symbols-outlined text-outline text-3xl mb-2">
                  chat_bubble_outline
                </span>
                <p className="text-on-surface-variant text-xs">
                  No messages yet
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {conversations.map((conv: any) => (
                  <div
                    key={conv.id}
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
                          {conv.otherUser?.name ?? "Unknown"}
                        </p>
                        {conv.lastMessage && (
                          <span className="text-[10px] text-outline uppercase tracking-widest font-semibold">
                            {formatTimeAgo(conv.lastMessage.created_at)}
                          </span>
                        )}
                      </div>
                      <p className="text-on-surface-variant text-sm truncate">
                        {conv.lastMessage?.content ?? "No messages yet"}
                      </p>
                    </div>
                    {conv.lastMessage?.unread && (
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            )}
            <Link
              href="/messages"
              className="mt-6 block w-full py-3 bg-surface-container-highest text-primary text-center text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-surface-container-high transition-colors"
            >
              View All Messages
            </Link>
          </div>

          {/* Upcoming Services - 5 cols (show accepted/in-progress requests as upcoming) */}
          <div className="md:col-span-5 bg-surface-container-low rounded-2xl p-6">
            <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold text-primary mb-6">
              Upcoming Services
            </h2>
            {(() => {
              const upcoming = requests
                .filter(
                  (r: any) =>
                    ["accepted", "in_progress"].includes(r.status) &&
                    r.preferred_date
                )
                .slice(0, 3);

              if (upcoming.length === 0) {
                return (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <span className="material-symbols-outlined text-outline text-3xl mb-2">
                      event_available
                    </span>
                    <p className="text-on-surface-variant text-xs">
                      No upcoming services scheduled
                    </p>
                  </div>
                );
              }

              return (
                <div className="space-y-4">
                  {upcoming.map((service: any) => {
                    const date = new Date(service.preferred_date);
                    return (
                      <div
                        key={service.id}
                        className="flex items-center gap-4 group"
                      >
                        <div className="bg-primary rounded-xl w-14 h-14 flex flex-col items-center justify-center shrink-0">
                          <span className="text-white text-lg font-bold leading-none">
                            {date.getDate()}
                          </span>
                          <span className="text-white/60 text-[10px] uppercase tracking-wider font-semibold">
                            {date.toLocaleDateString("en-US", {
                              month: "short",
                            })}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-on-surface text-sm">
                            {service.title}
                          </h3>
                          <p className="text-on-surface-variant text-xs">
                            {service.category?.name ?? "Service"}
                          </p>
                          {service.preferred_time && (
                            <p className="text-outline text-[10px] uppercase tracking-widest font-semibold mt-1">
                              {service.preferred_time}
                            </p>
                          )}
                        </div>
                        <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
                          chevron_right
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>

          {/* Saved Blackbook - 7 cols (Quick Actions) */}
          <div className="md:col-span-7 bg-surface-container-low rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold text-primary">
                Quick Actions
              </h2>
              <Link
                href="/discover"
                className="text-xs font-bold uppercase tracking-widest text-on-tertiary-container flex items-center gap-1 hover:gap-2 transition-all"
              >
                Discover More
                <span className="material-symbols-outlined text-sm">east</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <Link
                href="/request"
                className="bg-surface-container-lowest rounded-xl p-5 text-center hover:shadow-lg hover:shadow-primary-container/10 transition-all group card-hover"
              >
                <div className="w-14 h-14 rounded-full bg-secondary-container mx-auto mb-3 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl">
                    add_circle
                  </span>
                </div>
                <h3 className="font-semibold text-on-surface text-sm mb-1">
                  New Request
                </h3>
                <p className="text-on-surface-variant text-xs">
                  Get quotes from providers
                </p>
              </Link>
              <Link
                href="/discover"
                className="bg-surface-container-lowest rounded-xl p-5 text-center hover:shadow-lg hover:shadow-primary-container/10 transition-all group card-hover"
              >
                <div className="w-14 h-14 rounded-full bg-secondary-container mx-auto mb-3 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl">
                    explore
                  </span>
                </div>
                <h3 className="font-semibold text-on-surface text-sm mb-1">
                  Find Providers
                </h3>
                <p className="text-on-surface-variant text-xs">
                  Browse the directory
                </p>
              </Link>
              <Link
                href="/messages"
                className="bg-surface-container-lowest rounded-xl p-5 text-center hover:shadow-lg hover:shadow-primary-container/10 transition-all group card-hover"
              >
                <div className="w-14 h-14 rounded-full bg-secondary-container mx-auto mb-3 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl">
                    chat
                  </span>
                </div>
                <h3 className="font-semibold text-on-surface text-sm mb-1">
                  Messages
                </h3>
                <p className="text-on-surface-variant text-xs">
                  Talk to providers
                </p>
              </Link>
            </div>
            <Link
              href="/request/turnaround"
              className="flex items-center gap-4 bg-tertiary-fixed/20 rounded-xl p-4 border border-tertiary-fixed/30 hover:bg-tertiary-fixed/30 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-tertiary-fixed flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-on-tertiary-fixed text-lg">sync</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface">Charter Turnaround</p>
                <p className="text-xs text-on-surface-variant">Bulk request for guest changeover</p>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <ConciergeFAB />
    </>
  );
}
