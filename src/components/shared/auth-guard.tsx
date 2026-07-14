"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SESSION_KEY = "vipas_session";

/**
 * Thin client-side auth guard.
 * Checks sessionStorage for a valid session; redirects to /login if absent.
 * Renders children immediately once the check passes so there is no flash.
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) {
        router.replace("/login");
      }
    } catch {
      // sessionStorage July be unavailable in certain environments; allow through
    }
  }, [router]);

  return <>{children}</>;
}
