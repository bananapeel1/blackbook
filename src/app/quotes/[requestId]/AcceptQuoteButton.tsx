"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface AcceptQuoteButtonProps {
  quoteId: string;
  highlighted?: boolean;
}

export default function AcceptQuoteButton({
  quoteId,
  highlighted = false,
}: AcceptQuoteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAccept() {
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: rpcError } = await (supabase.rpc as any)("accept_quote", {
        p_quote_id: quoteId,
      });

      if (rpcError) {
        console.error("accept_quote error:", rpcError);
        setError(rpcError.message || "Failed to accept quote.");
        setLoading(false);
        return;
      }

      router.push("/messages");
      router.refresh();
    } catch (err) {
      console.error("Unexpected accept error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleAccept}
        disabled={loading}
        className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
          highlighted
            ? "bg-tertiary-fixed text-on-tertiary-fixed hover:opacity-90"
            : "bg-primary text-on-primary hover:bg-primary-container"
        }`}
      >
        {loading ? "Accepting..." : "Accept Proposal"}
      </button>
      {error && (
        <p className="text-xs text-error mt-2 text-center">{error}</p>
      )}
    </div>
  );
}
