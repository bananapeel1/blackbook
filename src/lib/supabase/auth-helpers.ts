import { createClient } from "./server";

/* eslint-disable @typescript-eslint/no-explicit-any */

export type UserRole = "boat_owner" | "service_provider" | null;

export interface AuthUser {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  role: UserRole;
  providerId: string | null;
}

/**
 * Get the authenticated user with their role and provider info (server-side).
 * Returns null if not logged in.
 */
export async function getAuthUser(): Promise<AuthUser | null> {
  try {
    const supabase = (await createClient()) as any;
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    // Get profile with role
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, avatar_url, role")
      .eq("id", user.id)
      .single();

    // Check if they're a provider
    let providerId: string | null = null;
    if (profile?.role === "service_provider") {
      const { data: provider } = await supabase
        .from("providers")
        .select("id")
        .eq("user_id", user.id)
        .single();
      providerId = provider?.id ?? null;
    }

    return {
      id: user.id,
      email: user.email ?? "",
      fullName: profile?.full_name ?? null,
      avatarUrl: profile?.avatar_url ?? null,
      role: (profile?.role as UserRole) ?? null,
      providerId,
    };
  } catch {
    return null;
  }
}
