"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type UserRole = "boat_owner" | "charter_skipper" | "service_provider";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!selectedRole) {
      setError("Please select your account type.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: selectedRole,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  async function handleGoogleSignIn() {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/auth/callback",
      },
    });
    if (error) {
      setError(error.message);
    }
  }

  return (
    <div className="min-h-dvh flex">
      {/* Left branding panel - hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative flex-col items-center justify-center overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full border border-white/20" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full border border-white/20" />
        </div>

        <div className="relative z-10 text-center px-12 max-w-md">
          {/* Anchor icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 rounded-2xl bg-primary-container/60 flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-5xl">
                anchor
              </span>
            </div>
          </div>

          <h1 className="font-[family-name:var(--font-headline)] text-4xl font-bold text-on-primary mb-4">
            Dockside Blackbook
          </h1>
          <p className="text-on-primary/60 text-lg leading-relaxed">
            Join the trusted network of marine professionals and boat owners
            worldwide.
          </p>

          {/* Decorative divider */}
          <div className="mt-10 flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-on-primary/20" />
            <span className="material-symbols-outlined text-on-primary/30 text-sm">
              waves
            </span>
            <div className="w-12 h-px bg-on-primary/20" />
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile branding */}
          <div className="lg:hidden mb-10 text-center">
            <div className="inline-flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-primary text-3xl">
                anchor
              </span>
              <h1 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-primary">
                Dockside Blackbook
              </h1>
            </div>
            <p className="text-on-surface-variant text-sm">
              Marine services marketplace
            </p>
          </div>

          <div className="mb-8">
            <h2 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-on-surface">
              Create your account
            </h2>
            <p className="mt-2 text-on-surface-variant">
              Get started with Dockside Blackbook
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-error-container/30 border border-error/20">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-error text-xl mt-0.5">
                  error
                </span>
                <p className="text-on-error-container text-sm">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-on-surface-variant mb-2"
              >
                Full name
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-xl">
                  person
                </span>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Captain James"
                  className="w-full pl-11 pr-4 py-3.5 bg-surface-container-low border-b-2 border-outline-variant/20 rounded-t-lg text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-on-surface-variant mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-xl">
                  mail
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="captain@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-surface-container-low border-b-2 border-outline-variant/20 rounded-t-lg text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-on-surface-variant mb-2"
              >
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-xl">
                  lock
                </span>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full pl-11 pr-4 py-3.5 bg-surface-container-low border-b-2 border-outline-variant/20 rounded-t-lg text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* User type selector */}
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-3">
                I am a...
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole("boat_owner")}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    selectedRole === "boat_owner"
                      ? "border-primary bg-primary-fixed/10"
                      : "border-outline-variant/20 bg-surface-container-low hover:border-outline-variant/40"
                  }`}
                >
                  <span className={`material-symbols-outlined text-2xl mb-2 ${selectedRole === "boat_owner" ? "text-primary" : "text-on-surface-variant/60"}`}>
                    sailing
                  </span>
                  <p className={`text-xs font-medium ${selectedRole === "boat_owner" ? "text-primary" : "text-on-surface"}`}>
                    Boat Owner
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole("charter_skipper")}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    selectedRole === "charter_skipper"
                      ? "border-primary bg-primary-fixed/10"
                      : "border-outline-variant/20 bg-surface-container-low hover:border-outline-variant/40"
                  }`}
                >
                  <span className={`material-symbols-outlined text-2xl mb-2 ${selectedRole === "charter_skipper" ? "text-primary" : "text-on-surface-variant/60"}`}>
                    captain
                  </span>
                  <p className={`text-xs font-medium ${selectedRole === "charter_skipper" ? "text-primary" : "text-on-surface"}`}>
                    Charter Skipper
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole("service_provider")}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    selectedRole === "service_provider"
                      ? "border-primary bg-primary-fixed/10"
                      : "border-outline-variant/20 bg-surface-container-low hover:border-outline-variant/40"
                  }`}
                >
                  <span className={`material-symbols-outlined text-2xl mb-2 ${selectedRole === "service_provider" ? "text-primary" : "text-on-surface-variant/60"}`}>
                    engineering
                  </span>
                  <p className={`text-xs font-medium ${selectedRole === "service_provider" ? "text-primary" : "text-on-surface"}`}>
                    Service Provider
                  </p>
                </button>
              </div>
            </div>

            {/* Create Account button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-on-primary font-semibold rounded-lg hover:bg-primary-container active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-xl">
                    progress_activity
                  </span>
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-outline-variant/30" />
            <span className="text-sm text-on-surface-variant/60">or</span>
            <div className="flex-1 h-px bg-outline-variant/30" />
          </div>

          {/* Google OAuth */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-3.5 bg-surface-container-highest text-on-surface font-medium rounded-lg hover:bg-surface-container-high active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          {/* Sign in link */}
          <p className="mt-8 text-center text-sm text-on-surface-variant">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
