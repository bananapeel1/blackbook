import TopAppBar from "./TopAppBar";
import BottomNav from "./BottomNav";
import { getAuthUser } from "@/lib/supabase/auth-helpers";
import { getUnreadNotificationCount } from "@/lib/supabase/queries";

/**
 * Server component that fetches auth state and passes it to the client nav components.
 * Use this instead of importing TopAppBar/BottomNav directly in pages.
 */
export default async function NavWrapper() {
  const authUser = await getAuthUser();
  const unreadCount = authUser ? await getUnreadNotificationCount() : 0;

  const navUser = authUser
    ? {
        id: authUser.id,
        fullName: authUser.fullName,
        role: authUser.role,
        unreadCount,
      }
    : null;

  return (
    <>
      <TopAppBar user={navUser} />
      <BottomNav user={navUser} />
    </>
  );
}
