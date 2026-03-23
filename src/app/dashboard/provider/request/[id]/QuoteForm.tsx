"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface QuoteFormProps {
  requestId: string;
  providerId: string;
  currency: string;
}

export default function QuoteForm({
  requestId,
  providerId,
  currency,
}: QuoteFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedDuration, setEstimatedDuration] = useState("");
  const [warranty, setWarranty] = useState("");
  const [earliestStart, setEarliestStart] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error: rpcError } = await (supabase.rpc as any)("submit_quote", {
        p_request_id: requestId,
        p_provider_id: providerId,
        p_amount: parsedAmount,
        p_currency: currency || "EUR",
        p_description: description || null,
        p_estimated_duration: estimatedDuration || null,
        p_warranty_months: warranty ? parseInt(warranty, 10) : null,
        p_earliest_start: earliestStart || null,
      });

      if (rpcError) {
        console.error("submit_quote error:", rpcError);
        setError(
          rpcError.message || "Failed to submit quote. Please try again."
        );
        setLoading(false);
        return;
      }

      // Success - redirect to provider dashboard
      router.push("/dashboard/provider");
      router.refresh();
    } catch (err) {
      console.error("Unexpected submit error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="bg-surface-container-low rounded-2xl p-6 md:p-8">
      <h3 className="font-[family-name:var(--font-headline)] text-xl font-bold text-primary mb-6">
        Submit Your Quote
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Amount */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
            Quote Amount ({currency || "EUR"})
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm font-semibold">
              {currency === "USD" ? "$" : currency === "GBP" ? "\u00A3" : "\u20AC"}
            </span>
            <input
              type="number"
              step="0.01"
              min="0"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-surface-container-lowest text-on-surface rounded-xl pl-10 pr-4 py-4 text-sm font-semibold placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
            What you&apos;ll do
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your proposed approach, materials, and scope of work..."
            className="w-full bg-surface-container-lowest text-on-surface rounded-xl px-4 py-4 text-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        {/* Duration and Warranty row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
              Estimated Duration
            </label>
            <input
              type="text"
              value={estimatedDuration}
              onChange={(e) => setEstimatedDuration(e.target.value)}
              placeholder="e.g., 2-3 hours"
              className="w-full bg-surface-container-lowest text-on-surface rounded-xl px-4 py-4 text-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
              Warranty (months)
            </label>
            <input
              type="number"
              min="0"
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
              placeholder="e.g., 12"
              className="w-full bg-surface-container-lowest text-on-surface rounded-xl px-4 py-4 text-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Earliest Start */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
            Earliest Start
          </label>
          <input
            type="text"
            value={earliestStart}
            onChange={(e) => setEarliestStart(e.target.value)}
            placeholder="e.g., Tomorrow, Immediate, Monday"
            className="w-full bg-surface-container-lowest text-on-surface rounded-xl px-4 py-4 text-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-error-container text-on-error-container rounded-xl px-4 py-3 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Submit Button - Fixed at bottom */}
        <div className="fixed bottom-20 left-0 right-0 px-4 md:px-8 z-30">
          <div className="max-w-4xl mx-auto">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-lg animate-spin">
                    progress_activity
                  </span>
                  Submitting...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">
                    send
                  </span>
                  Submit Quote
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
