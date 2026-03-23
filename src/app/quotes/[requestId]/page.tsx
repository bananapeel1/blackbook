import { redirect } from "next/navigation";
import NavWrapper from "@/components/NavWrapper";
import ConciergeFAB from "@/components/ConciergeFAB";
import Link from "next/link";
import {
  getRequestById,
  getQuotesForRequest,
} from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import QuoteList from "./QuoteList";

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

        <QuoteList quotes={quotes} request={request} />
      </main>

      <ConciergeFAB />
    </>
  );
}
