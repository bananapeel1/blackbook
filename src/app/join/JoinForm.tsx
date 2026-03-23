"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function JoinForm() {
  const [companyName, setCompanyName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [primaryPort, setPrimaryPort] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();

      // Check if an application with this email already exists
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: existing } = await (supabase as any)
        .from("provider_applications")
        .select("id")
        .eq("email", contactEmail)
        .single();
      if (existing) {
        setError("An application with this email already exists.");
        setLoading(false);
        return;
      }

      // Insert provider application (pending review)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: insertError } = await (supabase as any).from("provider_applications").insert({
        email: contactEmail,
        business_name: companyName,
        service_type: serviceType,
        primary_port: primaryPort,
        phone: phone || null,
        message: description || null,
        status: 'pending',
      });

      if (insertError) {
        if (insertError.code === "23505") {
          setError("An application with this email already exists.");
        } else {
          setError(insertError.message);
        }
        setLoading(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-surface-container-lowest p-12 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-primary-container flex items-center justify-center mb-6">
          <span
            className="material-symbols-outlined text-on-primary-container text-3xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        </div>
        <h3 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-primary mb-3">
          Application Received
        </h3>
        <p className="text-on-surface-variant text-sm max-w-sm mx-auto leading-relaxed">
          Thank you, <strong>{companyName}</strong>. We&apos;ll review your
          application and get back to you at{" "}
          <strong>{contactEmail}</strong> within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest p-12">
      {error && (
        <div className="mb-6 p-3 rounded-lg bg-error-container/30 border border-error/20">
          <p className="text-on-error-container text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-error text-lg">error</span>
            {error}
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
            Company Name *
          </label>
          <input
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full bg-surface-container-low border-b-2 border-outline-variant/20 focus:border-primary rounded-t-lg px-4 py-4 text-sm outline-none transition-all focus:bg-surface-container-lowest"
            placeholder="Your business name"
            type="text"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
            Service Type *
          </label>
          <select
            required
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full bg-surface-container-low border-b-2 border-outline-variant/20 focus:border-primary rounded-t-lg px-4 py-4 text-sm outline-none transition-all"
          >
            <option value="">Select your primary service</option>
            <option value="Marine Engineering">Marine Engineering</option>
            <option value="Electrical Systems">Electrical Systems</option>
            <option value="Hull & Deck Services">Hull & Deck Services</option>
            <option value="Provisioning">Provisioning</option>
            <option value="Concierge & Hospitality">Concierge & Hospitality</option>
            <option value="Transport & Logistics">Transport & Logistics</option>
            <option value="Rigging & Sails">Rigging & Sails</option>
            <option value="Diving Services">Diving Services</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
            Primary Port / Marina *
          </label>
          <input
            required
            value={primaryPort}
            onChange={(e) => setPrimaryPort(e.target.value)}
            className="w-full bg-surface-container-low border-b-2 border-outline-variant/20 focus:border-primary rounded-t-lg px-4 py-4 text-sm outline-none transition-all focus:bg-surface-container-lowest"
            placeholder="e.g. Limassol Marina"
            type="text"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
            Contact Email *
          </label>
          <input
            required
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            className="w-full bg-surface-container-low border-b-2 border-outline-variant/20 focus:border-primary rounded-t-lg px-4 py-4 text-sm outline-none transition-all focus:bg-surface-container-lowest"
            placeholder="your@email.com"
            type="email"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
            Phone Number
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-surface-container-low border-b-2 border-outline-variant/20 focus:border-primary rounded-t-lg px-4 py-4 text-sm outline-none transition-all focus:bg-surface-container-lowest"
            placeholder="+357 99 000 000"
            type="tel"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
            Brief Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full bg-surface-container-low border-b-2 border-outline-variant/20 focus:border-primary rounded-t-lg px-4 py-4 text-sm outline-none transition-all focus:bg-surface-container-lowest resize-none"
            placeholder="Tell us about your services, experience, and certifications..."
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-on-primary py-4 rounded-lg font-bold uppercase tracking-widest text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all mt-4 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined animate-spin text-lg">
                progress_activity
              </span>
              Submitting...
            </>
          ) : (
            "Submit for Verification"
          )}
        </button>
        <p className="text-[10px] text-center text-on-surface-variant mt-4 uppercase tracking-widest">
          Applications reviewed within 48 hours
        </p>
      </form>
    </div>
  );
}
