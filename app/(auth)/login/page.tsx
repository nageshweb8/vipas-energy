"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VipasLogo } from "@/components/shared/vipas-logo";
import { useAppDispatch } from "@/store/hooks";
import { setSession } from "@/store/slices/authSlice";

const SESSION_KEY = "vipas_session";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // Derive initials from email local-part (demo only — no real auth)
    const localPart = email.split("@")[0] ?? "User";
    const nameParts = localPart.split(/[._-]/);
    const displayName =
      nameParts.length > 1
        ? `${nameParts[0]} ${nameParts[1]}`
        : (nameParts[0] ?? "Demo User");
    const initials = nameParts
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? "")
      .join("");

    const sessionPayload = {
      email,
      loginTime: new Date().toISOString(),
      rememberMe,
    };

    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionPayload));
    } catch {
      // sessionStorage unavailable — proceed anyway
    }

    dispatch(
      setSession({
        token: "demo-token",
        user: {
          name: displayName,
          initials: initials || "VE",
          company: "Vipas Energy",
        },
      }),
    );

    router.push("/");
  }

  return (
    <main className="bg-brand-mint flex min-h-screen items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <VipasLogo iconSize={44} />
        </div>

        <Card>
          <CardHeader>
            <h1 className="text-brand-secondary text-xl font-bold">
              Welcome back
            </h1>
            <p className="text-text-muted mt-1 text-sm">
              Sign in to access Vipas Energy
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Remember me + Forgot password */}
              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2 select-none">
                  <input
                    type="checkbox"
                    className="border-border-default accent-brand-primary size-4 rounded"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="text-brand-text text-sm">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-brand-primary text-sm hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Inline error */}
              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-center text-xs text-red-600">
                  {error}
                </p>
              )}

              {/* Submit */}
              <Button
                type="submit"
                className="bg-brand-primary hover:bg-brand-primary/90 w-full text-white"
              >
                Sign in
              </Button>

              {/* Helper text */}
              <p className="text-text-muted text-center text-xs">
                Demo access only — authentication will be connected later
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
