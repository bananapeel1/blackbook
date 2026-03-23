import { redirect } from "next/navigation";
import { getProviderForUser } from "@/lib/supabase/queries";
import ProviderSettingsForm from "./ProviderSettingsForm";

export default async function ProviderSettingsPage() {
  const provider = await getProviderForUser();

  if (!provider) {
    redirect("/join");
  }

  return (
    <main className="px-4 md:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-slate-200 w-12 h-12 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-slate-700 text-2xl">
              settings
            </span>
          </div>
          <div>
            <h1 className="font-[family-name:var(--font-headline)] text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
              Settings
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Manage your provider profile and preferences
            </p>
          </div>
        </div>
      </div>

      <ProviderSettingsForm provider={provider} />
    </main>
  );
}
