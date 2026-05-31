"use client";

import {
  Bell,
  CheckCircle2,
  Cloud,
  Database,
  Link2,
  MessageSquare,
  Settings,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { AssistantEntry } from "@/components/dashboard/assistant-entry";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { ModuleKpiStrip } from "@/components/dashboard/module-kpi-strip";
import {
  StatusBadge,
  type StatusBadgeVariant,
} from "@/components/dashboard/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { subscriptionsData } from "@/lib/stub/subscriptions";
import type { ConnectorCard, OperationalStatus } from "@/types/energy-modules";

const connectorIconMap: Record<string, LucideIcon> = {
  "google-workspace": Cloud,
  "microsoft-365": Cloud,
  slack: MessageSquare,
  "aws-s3": Database,
  "vipas-rate-db": ShieldCheck,
  accuweather: Link2,
};

const statusVariant: Partial<Record<OperationalStatus, StatusBadgeVariant>> = {
  Connected: "success",
  Enabled: "success",
  Open: "info",
};

const workspaceSettings: Array<{ label: string; value: string }> = [
  { label: "Workspace", value: "Vipas Energy Operations" },
  { label: "Time Zone", value: "Asia/Kolkata" },
  { label: "Currency", value: "INR" },
  { label: "Date Format", value: "DD MMM YYYY" },
];

const notificationSettings: Array<{ label: string; enabled: boolean }> = [
  { label: "Email Notifications", enabled: true },
  { label: "In-app Notifications", enabled: true },
  { label: "Weekly Digest", enabled: true },
  { label: "Marketing Updates", enabled: false },
];

const subscriptionSummaryCards: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Security",
    description: "MFA and RBAC are enabled for the workspace.",
    icon: ShieldCheck,
  },
  {
    title: "Alerts",
    description: "Anomaly and report notifications are visible.",
    icon: Bell,
  },
  {
    title: "Status",
    description: "All visual connector cards are demo-safe.",
    icon: CheckCircle2,
  },
];

function ConnectorTile({ connector }: { connector: ConnectorCard }) {
  const Icon = connectorIconMap[connector.id] ?? Link2;

  return (
    <article className="border-border-default bg-surface-bg flex gap-3 rounded-xl border p-4">
      <span className="bg-brand-mint text-brand-primary flex size-11 shrink-0 items-center justify-center rounded-full">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-brand-secondary font-semibold">
              {connector.name}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              {connector.category}
            </p>
          </div>
          <StatusBadge variant={statusVariant[connector.status] ?? "neutral"}>
            {connector.status}
          </StatusBadge>
        </div>
        <p className="text-brand-text mt-3 text-sm leading-6">
          {connector.description}
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-4"
          disabled
        >
          Configure
        </Button>
      </div>
    </article>
  );
}

export function SubscriptionsSettingsPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
      <section className="max-w-3xl">
        <h1 className="text-brand-secondary text-3xl font-bold tracking-tight sm:text-4xl">
          Subscriptions & Settings
        </h1>
        <p className="text-brand-text mt-3 max-w-2xl text-sm leading-6 sm:text-base">
          Manage enabled modules, connector subscriptions, workspace
          preferences, and visual-only integration actions for the demo.
        </p>
      </section>

      <ModuleKpiStrip kpis={subscriptionsData.kpis} />

      <section className="grid gap-4 xl:grid-cols-12">
        <DashboardCard title="Enabled Modules" className="xl:col-span-5">
          <div className="flex flex-wrap gap-2">
            {subscriptionsData.enabledModules.map((module) => (
              <Badge
                key={module}
                variant="outline"
                className="border-brand-primary/20 bg-brand-mint text-brand-secondary px-3 py-1 text-xs font-semibold"
              >
                {module}
              </Badge>
            ))}
          </div>
          <div className="border-border-default bg-surface-bg mt-5 rounded-xl border p-4">
            <p className="text-brand-secondary font-semibold">
              Enterprise Plan
            </p>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              Includes portfolio analytics, staged reporting data, assistant UI,
              and connector-gated product modules.
            </p>
            <Button type="button" variant="outline" className="mt-4" disabled>
              Manage Plan
            </Button>
          </div>
        </DashboardCard>

        <DashboardCard title="Workspace Settings" className="xl:col-span-3">
          <div className="space-y-4">
            {workspaceSettings.map(({ label, value }) => (
              <div key={label} className="flex justify-between gap-4 text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="text-brand-secondary text-right font-semibold">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Notifications" className="xl:col-span-4">
          <div className="space-y-4">
            {notificationSettings.map(({ label, enabled }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4"
              >
                <span className="text-brand-text text-sm font-medium">
                  {label}
                </span>
                <span
                  className={
                    enabled
                      ? "bg-brand-primary flex h-6 w-11 items-center justify-end rounded-full px-1"
                      : "bg-border-default flex h-6 w-11 items-center rounded-full px-1"
                  }
                >
                  <span className="bg-surface-white size-4 rounded-full" />
                </span>
              </div>
            ))}
          </div>
        </DashboardCard>
      </section>

      <DashboardCard
        title="Integrations & Connected Services"
        description="Connector actions are visual only in this milestone; backend orchestration and subscription enforcement stay server-owned."
        headerAction={
          <Button type="button" variant="outline" disabled>
            <Settings className="size-4" aria-hidden="true" />
            Manage Integrations
          </Button>
        }
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {subscriptionsData.connectors.map((connector) => (
            <ConnectorTile key={connector.id} connector={connector} />
          ))}
        </div>
      </DashboardCard>

      <section className="grid gap-4 md:grid-cols-3">
        {subscriptionSummaryCards.map(({ title, description, icon: Icon }) => {
          return (
            <DashboardCard key={title}>
              <div className="flex items-start gap-3">
                <span className="bg-brand-mint text-brand-primary flex size-10 items-center justify-center rounded-full">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-brand-secondary font-semibold">{title}</p>
                  <p className="text-muted-foreground mt-1 text-sm leading-6">
                    {description}
                  </p>
                </div>
              </div>
            </DashboardCard>
          );
        })}
      </section>

      <div className="ml-auto w-full max-w-96">
        <AssistantEntry />
      </div>
    </main>
  );
}
