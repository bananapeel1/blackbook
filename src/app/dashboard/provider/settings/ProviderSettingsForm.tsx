"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface ProviderData {
  id: string;
  business_name: string;
  description: string | null;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  website: string | null;
  languages: string[] | null;
  availability: string | null;
  emergency_available: boolean;
  capacity_status: string | null;
  available_from: string | null;
}

export default function ProviderSettingsForm({
  provider,
}: {
  provider: ProviderData;
}) {
  const [form, setForm] = useState({
    business_name: provider.business_name ?? "",
    description: provider.description ?? "",
    email: provider.email ?? "",
    phone: provider.phone ?? "",
    whatsapp: provider.whatsapp ?? "",
    website: provider.website ?? "",
    languages: (provider.languages ?? []).join(", "),
    availability: provider.availability ?? "available",
    emergency_available: provider.emergency_available ?? false,
    capacity_status: provider.capacity_status ?? "available",
    available_from: provider.available_from
      ? provider.available_from.slice(0, 10)
      : "",
  });

  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    setFeedback(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      const supabase = createClient();

      const languages = form.languages
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean);

      const { error } = await (supabase as any)
        .from("providers")
        .update({
          business_name: form.business_name,
          description: form.description || null,
          email: form.email || null,
          phone: form.phone || null,
          whatsapp: form.whatsapp || null,
          website: form.website || null,
          languages: languages.length > 0 ? languages : null,
          availability: form.availability,
          emergency_available: form.emergency_available,
          capacity_status: form.capacity_status,
          available_from: form.available_from || null,
        })
        .eq("id", provider.id);

      if (error) {
        setFeedback({ type: "error", message: error.message });
      } else {
        setFeedback({
          type: "success",
          message: "Settings saved successfully.",
        });
      }
    } catch {
      setFeedback({
        type: "error",
        message: "An unexpected error occurred.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Feedback */}
      {feedback && (
        <div
          className={`flex items-center gap-3 px-5 py-4 rounded-xl text-sm font-semibold ${
            feedback.type === "success"
              ? "bg-tertiary-container text-on-tertiary-container"
              : "bg-error-container text-on-error-container"
          }`}
        >
          <span className="material-symbols-outlined text-lg">
            {feedback.type === "success" ? "check_circle" : "error"}
          </span>
          {feedback.message}
        </div>
      )}

      {/* Business Info */}
      <section className="bg-surface-container-low rounded-2xl p-6 md:p-8">
        <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold text-primary mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-2xl">storefront</span>
          Business Information
        </h2>
        <div className="space-y-5">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
              Business Name *
            </label>
            <input
              type="text"
              name="business_name"
              value={form.business_name}
              onChange={handleChange}
              required
              className="w-full bg-surface-container-lowest text-on-surface rounded-xl px-4 py-3 text-sm border border-outline-variant/30 focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Tell boat owners about your services, experience, and specialties..."
              className="w-full bg-surface-container-lowest text-on-surface rounded-xl px-4 py-3 text-sm border border-outline-variant/30 focus:border-primary focus:outline-none transition-colors resize-none"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
              Website
            </label>
            <input
              type="url"
              name="website"
              value={form.website}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full bg-surface-container-lowest text-on-surface rounded-xl px-4 py-3 text-sm border border-outline-variant/30 focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
              Languages
            </label>
            <input
              type="text"
              name="languages"
              value={form.languages}
              onChange={handleChange}
              placeholder="English, Greek, French"
              className="w-full bg-surface-container-lowest text-on-surface rounded-xl px-4 py-3 text-sm border border-outline-variant/30 focus:border-primary focus:outline-none transition-colors"
            />
            <p className="text-on-surface-variant text-xs mt-1.5">
              Separate languages with commas
            </p>
          </div>
        </div>
      </section>

      {/* Contact Details */}
      <section className="bg-surface-container-low rounded-2xl p-6 md:p-8">
        <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold text-primary mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-2xl">
            contact_phone
          </span>
          Contact Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="contact@business.com"
              className="w-full bg-surface-container-lowest text-on-surface rounded-xl px-4 py-3 text-sm border border-outline-variant/30 focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+357 99 123 456"
              className="w-full bg-surface-container-lowest text-on-surface rounded-xl px-4 py-3 text-sm border border-outline-variant/30 focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
              WhatsApp
            </label>
            <input
              type="tel"
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              placeholder="+357 99 123 456"
              className="w-full bg-surface-container-lowest text-on-surface rounded-xl px-4 py-3 text-sm border border-outline-variant/30 focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Availability & Capacity */}
      <section className="bg-surface-container-low rounded-2xl p-6 md:p-8">
        <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold text-primary mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-2xl">
            event_available
          </span>
          Availability & Capacity
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
              Availability
            </label>
            <select
              name="availability"
              value={form.availability}
              onChange={handleChange}
              className="w-full bg-surface-container-lowest text-on-surface rounded-xl px-4 py-3 text-sm border border-outline-variant/30 focus:border-primary focus:outline-none transition-colors appearance-none"
            >
              <option value="available">Available</option>
              <option value="busy">Busy</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
              Capacity Status
            </label>
            <select
              name="capacity_status"
              value={form.capacity_status}
              onChange={handleChange}
              className="w-full bg-surface-container-lowest text-on-surface rounded-xl px-4 py-3 text-sm border border-outline-variant/30 focus:border-primary focus:outline-none transition-colors appearance-none"
            >
              <option value="available">Available</option>
              <option value="busy_accepting">Busy - Still Accepting</option>
              <option value="full">Full</option>
              <option value="emergency_only">Emergency Only</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
              Available From
            </label>
            <input
              type="date"
              name="available_from"
              value={form.available_from}
              onChange={handleChange}
              className="w-full bg-surface-container-lowest text-on-surface rounded-xl px-4 py-3 text-sm border border-outline-variant/30 focus:border-primary focus:outline-none transition-colors"
            />
            <p className="text-on-surface-variant text-xs mt-1.5">
              Leave empty if available now
            </p>
          </div>
          <div className="flex items-center gap-4 sm:pt-6">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="emergency_available"
                checked={form.emergency_available}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-outline-variant/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
            <div>
              <p className="text-on-surface text-sm font-semibold">
                Emergency Available
              </p>
              <p className="text-on-surface-variant text-xs">
                Accept urgent/emergency requests
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
        <Link
          href="/dashboard/provider"
          className="text-on-surface-variant text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-lg">
            arrow_back
          </span>
          Back to Dashboard
        </Link>
        <button
          type="submit"
          disabled={saving}
          className="bg-primary text-on-primary px-10 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          {saving ? (
            <>
              <span className="material-symbols-outlined text-lg animate-spin">
                progress_activity
              </span>
              Saving...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-lg">save</span>
              Save Settings
            </>
          )}
        </button>
      </div>
    </form>
  );
}
