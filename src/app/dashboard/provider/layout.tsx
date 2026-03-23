import ProviderTopBar from "@/components/ProviderTopBar";
import ProviderBottomNav from "@/components/ProviderBottomNav";
import { getAuthUser } from "@/lib/supabase/auth-helpers";
import { getProviderForUser, getUnreadNotificationCount } from "@/lib/supabase/queries";

export default async function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authUser = await getAuthUser();
  const provider = await getProviderForUser();
  const unreadCount = authUser ? await getUnreadNotificationCount() : 0;

  // If no auth user or no provider, render children without the provider chrome
  // (the individual pages handle their own redirect/fallback)
  if (!authUser || !provider) {
    return <>{children}</>;
  }

  const providerNavUser = {
    id: authUser.id,
    fullName: authUser.fullName,
    businessName: provider.business_name ?? "My Business",
    unreadCount,
  };

  return (
    <div className="min-h-dvh bg-slate-50">
      <ProviderTopBar user={providerNavUser} />
      <div className="pt-14 pb-24 md:pb-8">
        {children}
      </div>
      <ProviderBottomNav />
    </div>
  );
}
