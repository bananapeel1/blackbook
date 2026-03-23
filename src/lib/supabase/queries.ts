import { createClient } from "./server";

/* eslint-disable @typescript-eslint/no-explicit-any */

// Untyped client - generated types are stale after migration 002
async function db() {
  return (await createClient()) as any;
}

// Get the provider record linked to the authenticated user
export async function getProviderForUser(): Promise<any | null> {
  try {
    const supabase = await db();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
      .from("providers")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error) {
      // PGRST116 = no rows found, not a real error
      if (error.code === "PGRST116") return null;
      console.error("getProviderForUser error:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("getProviderForUser unexpected error:", err);
    return null;
  }
}

// Get service requests matching a provider's coverage zones and categories
export async function getMatchingRequests(providerId: string): Promise<any[]> {
  try {
    const supabase = await db();

    // Get the provider's coverage location IDs
    const { data: coverage } = await supabase
      .from("provider_coverage")
      .select("location_id")
      .eq("provider_id", providerId);

    // Get the provider's service category IDs
    const { data: services } = await supabase
      .from("provider_services")
      .select("category_id")
      .eq("provider_id", providerId);

    const locationIds = (coverage ?? []).map((c: any) => c.location_id);
    const categoryIds = (services ?? []).map((s: any) => s.category_id);

    if (locationIds.length === 0) return [];

    // Query matching open requests with related data
    let query = supabase
      .from("service_requests")
      .select(
        `
        *,
        location:locations(id, name, slug),
        category:service_categories(id, name, slug, icon),
        vessel:vessels(id, name, type, length_meters, manufacturer, model)
      `
      )
      .in("status", ["submitted", "collecting_quotes"])
      .in("location_id", locationIds)
      .order("created_at", { ascending: false });

    // If provider has specific categories, filter by them
    if (categoryIds.length > 0) {
      query = query.or(
        `category_id.is.null,category_id.in.(${categoryIds.join(",")})`
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("getMatchingRequests error:", error);
      return [];
    }

    return data ?? [];
  } catch (err) {
    console.error("getMatchingRequests unexpected error:", err);
    return [];
  }
}

// Get all quotes submitted by a provider
export async function getProviderQuotes(providerId: string): Promise<any[]> {
  try {
    const supabase = await db();

    const { data, error } = await supabase
      .from("quotes")
      .select(
        `
        *,
        request:service_requests(id, title, status, urgency, preferred_date)
      `
      )
      .eq("provider_id", providerId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("getProviderQuotes error:", error);
      return [];
    }

    return data ?? [];
  } catch (err) {
    console.error("getProviderQuotes unexpected error:", err);
    return [];
  }
}

// Get a single request by ID with location and category details
export async function getRequestById(requestId: string): Promise<any | null> {
  try {
    const supabase = await db();

    const { data, error } = await supabase
      .from("service_requests")
      .select(
        `
        *,
        location:locations(id, name, slug, country, region, latitude, longitude),
        category:service_categories(id, name, slug, icon, segment),
        vessel:vessels(id, name, type, length_meters, manufacturer, model, year)
      `
      )
      .eq("id", requestId)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      console.error("getRequestById error:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("getRequestById unexpected error:", err);
    return null;
  }
}

// Get all quotes for a request with provider details
export async function getQuotesForRequest(requestId: string): Promise<any[]> {
  try {
    const supabase = await db();

    const { data, error } = await supabase
      .from("quotes")
      .select(
        `
        *,
        provider:providers(
          id,
          business_name,
          slug,
          logo_url,
          verification_status,
          avg_rating,
          total_reviews,
          total_jobs,
          reliability_score,
          response_rate
        )
      `
      )
      .eq("request_id", requestId)
      .in("status", ["pending", "sent", "accepted"])
      .order("created_at", { ascending: true });

    if (error) {
      console.error("getQuotesForRequest error:", error);
      return [];
    }

    return data ?? [];
  } catch (err) {
    console.error("getQuotesForRequest unexpected error:", err);
    return [];
  }
}

// Get service requests for the authenticated boat owner
export async function getRequestsForUser(): Promise<any[]> {
  try {
    const supabase = await db();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
      .from("service_requests")
      .select(
        `
        *,
        location:locations(id, name, slug),
        category:service_categories(id, name, slug, icon)
      `
      )
      .eq("user_id", user.id)
      .not("status", "eq", "draft")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("getRequestsForUser error:", error);
      return [];
    }

    return data ?? [];
  } catch (err) {
    console.error("getRequestsForUser unexpected error:", err);
    return [];
  }
}

// Get conversations for the authenticated user with last message preview
export async function getConversationsForUser(): Promise<any[]> {
  try {
    const supabase = await db();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return [];

    const { data: conversations, error } = await supabase
      .from("conversations")
      .select("*")
      .or(`participant_1.eq.${user.id},participant_2.eq.${user.id}`)
      .order("last_message_at", { ascending: false })
      .limit(5);

    if (error) {
      console.error("getConversationsForUser error:", error);
      return [];
    }

    if (!conversations || conversations.length === 0) return [];

    // Enrich each conversation with the other participant's profile and last message
    const enriched = await Promise.all(
      conversations.map(async (conv: any) => {
        const otherUserId =
          conv.participant_1 === user.id
            ? conv.participant_2
            : conv.participant_1;

        const [profileRes, messageRes] = await Promise.all([
          supabase
            .from("profiles")
            .select("id, full_name, avatar_url")
            .eq("id", otherUserId)
            .single(),
          supabase
            .from("messages")
            .select("content, created_at, sender_id, read_at")
            .eq("conversation_id", conv.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .single(),
        ]);

        // Check if the other participant is a provider to get business name
        const providerRes = await supabase
          .from("providers")
          .select("business_name, logo_url")
          .eq("user_id", otherUserId)
          .single();

        const lastMessage = messageRes.data;
        const profile = profileRes.data;
        const provider = providerRes.data;

        return {
          ...conv,
          otherUser: {
            id: otherUserId,
            name:
              provider?.business_name ??
              profile?.full_name ??
              "Unknown",
            avatar_url: provider?.logo_url ?? profile?.avatar_url,
          },
          lastMessage: lastMessage
            ? {
                content: lastMessage.content,
                created_at: lastMessage.created_at,
                isOwn: lastMessage.sender_id === user.id,
                unread:
                  lastMessage.sender_id !== user.id &&
                  !lastMessage.read_at,
              }
            : null,
        };
      })
    );

    return enriched;
  } catch (err) {
    console.error("getConversationsForUser unexpected error:", err);
    return [];
  }
}

// Get unread notification count for authenticated user
export async function getUnreadNotificationCount() {
  try {
    const supabase = await db();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return 0;

    // notifications table added in migration 002, not in generated types
    const { count, error } = await (supabase as any)
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .is("read_at", null);

    if (error) {
      console.error("getUnreadNotificationCount error:", error);
      return 0;
    }

    return count ?? 0;
  } catch (err) {
    console.error("getUnreadNotificationCount unexpected error:", err);
    return 0;
  }
}

export async function getVesselsForUser() {
  try {
    const supabase = await db();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from("vessels")
      .select("*")
      .eq("owner_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("getVesselsForUser error:", error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error("getVesselsForUser unexpected error:", err);
    return [];
  }
}

export async function getVesselById(id: string) {
  try {
    const supabase = await db();
    const { data, error } = await supabase
      .from("vessels")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data;
  } catch {
    return null;
  }
}
