import { AuthGuard } from "@/components/shared/auth-guard";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { VipasAssistant } from "@/features/assistant";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <DashboardShell assistant={<VipasAssistant />}>{children}</DashboardShell>
    </AuthGuard>
  );
}
