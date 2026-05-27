"use client";

import { Suspense, useState, FormEvent } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff, Loader2, LogIn } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw new Error(authError.message);
      }

      // Check if user is approved
      if (data.user) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("is_approved, role")
          .eq("id", data.user.id)
          .single();

        if (profileError) {
          // If there's a database error (e.g. missing RLS policy), surface it
          await supabase.auth.signOut();
          console.error("Profile query error:", profileError);
          setError(
            "Could not verify your account status. Please make sure the database is properly set up by re-running the schema.sql file in Supabase."
          );
          setLoading(false);
          return;
        }

        if (!profile) {
          await supabase.auth.signOut();
          setError(
            "Your admin account hasn't been fully set up yet. Please make sure you have created your account via /admin/setup or contact the Super Admin to approve your account."
          );
          setLoading(false);
          return;
        }

        if (!profile.is_approved) {
          await supabase.auth.signOut();
          setError(
            "Your account is pending approval. A Super Admin needs to approve your account before you can access the dashboard."
          );
          setLoading(false);
          return;
        }
      }

      router.push(searchParams.get("redirect") || "/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-500 text-sm mt-1">
              WowKids First Steps Admin Portal
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@wowkids.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary-500 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <LogIn className="w-5 h-5" />
              )}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
