"use client";

import {
  Bell,
  Calendar,
  CheckCircle2,
  Download,
  FileText,
  Link2,
  Settings,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { DashboardCard } from "@/components/shared/dashboard-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { AssistantEntry } from "@/features/assistant";
import { subscriptionsData } from "../mocks/subscriptions";
import { cn } from "@/lib/utils";
import type {
  ConnectorCard,
  RoleDistributionItem,
  UsageAllocation,
} from "../models";

const allocationToneClasses: Record<UsageAllocation["tone"], string> = {
  green: "text-brand-primary",
  blue: "text-info",
  violet: "text-violet-600 dark:text-violet-200",
};

const roleToneClasses: Record<RoleDistributionItem["tone"], string> = {
  green: "bg-brand-primary",
  blue: "bg-info",
  violet: "bg-violet-500",
  neutral: "bg-slate-400 dark:bg-slate-500",
};

const connectorMarkClasses: Record<string, string> = {
  "google-workspace": "text-danger",
  "microsoft-365": "text-info",
  slack: "text-violet-600 dark:text-violet-200",
  "aws-s3": "text-warning",
};

const connectorMarks: Record<string, string> = {
  "google-workspace": "G",
  "microsoft-365": "M",
  slack: "#",
  "aws-s3": "aws",
};

function CardTitleIcon({
  icon: Icon,
  tone = "green",
}: {
  icon: LucideIcon;
  tone?: "green" | "blue" | "violet" | "warning";
}) {
  const toneClasses = {
    green: "bg-brand-mint text-brand-primary",
    blue: "bg-info/10 text-info",
    violet: "bg-violet-500/10 text-violet-600 dark:text-violet-200",
    warning: "bg-warning/10 text-warning",
  };

  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full",
        toneClasses[tone],
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
    </span>
  );
}

function UsageMeter({ allocation }: { allocation: UsageAllocation }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (allocation.value / 100) * circumference;

  return (
    <div className="flex min-w-24 flex-col items-center text-center">
      <div className="relative size-24">
        <svg className="-rotate-90" viewBox="0 0 100 100" aria-hidden="true">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="var(--brand-mint)"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className={allocationToneClasses[allocation.tone]}
          />
        </svg>
        <span className="text-brand-secondary absolute inset-0 flex items-center justify-center text-xl font-bold">
          {allocation.value}%
        </span>
      </div>
      <p className="text-brand-secondary mt-2 font-semibold">
        {allocation.label}
      </p>
      <p className="text-muted-foreground text-xs">{allocation.usedLabel}</p>
      <button
        type="button"
        className="text-brand-primary mt-2 text-xs font-semibold"
      >
        {allocation.actionLabel} {"->"}
      </button>
    </div>
  );
}

function RoleDistributionChart({ items }: { items: RoleDistributionItem[] }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const segments = items.reduce<{
    runningOffset: number;
    segments: Array<{
      item: RoleDistributionItem;
      dash: number;
      offset: number;
    }>;
  }>(
    (accumulator, item) => {
      const dash = (item.percentage / 100) * circumference;

      return {
        runningOffset: accumulator.runningOffset + dash,
        segments: [
          ...accumulator.segments,
          {
            item,
            dash,
            offset: accumulator.runningOffset,
          },
        ],
      };
    },
    { runningOffset: 0, segments: [] },
  ).segments;

  return (
    <svg
      className="size-28 -rotate-90"
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="var(--brand-mint)"
        strokeWidth="16"
      />
      {segments.map(({ item, dash, offset }) => {
        return (
          <circle
            key={item.id}
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="16"
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeDashoffset={-offset}
            className={roleToneClasses[item.tone]}
          />
        );
      })}
      <circle cx="50" cy="50" r="22" fill="var(--surface-white)" />
    </svg>
  );
}

function ToggleRow({
  label,
  description,
  enabled,
}: {
  label: string;
  description: string;
  enabled: boolean;
}) {
  return (
    <div className="border-border-default/70 flex items-center justify-between gap-4 border-b py-2.5 last:border-0">
      <div className="min-w-0">
        <p className="text-brand-secondary text-sm font-semibold">{label}</p>
        <p className="text-muted-foreground mt-0.5 text-xs leading-5">
          {description}
        </p>
      </div>
      <span
        className={cn(
          "flex h-6 w-11 shrink-0 items-center rounded-full px-1",
          enabled
            ? "bg-brand-primary justify-end"
            : "bg-slate-300 dark:bg-slate-600",
        )}
      >
        <span className="bg-surface-white size-4 rounded-full" />
      </span>
    </div>
  );
}

function ConnectorRow({ connector }: { connector: ConnectorCard }) {
  return (
    <div className="border-border-default/70 flex items-center gap-3 border-b px-3 py-2.5 last:border-0">
      <span
        className={cn(
          "flex w-10 shrink-0 items-center justify-center text-lg font-bold",
          connectorMarkClasses[connector.id] ?? "text-brand-primary",
        )}
      >
        {connectorMarks[connector.id] ?? connector.name.slice(0, 1)}
      </span>
      <span className="text-brand-secondary min-w-0 flex-1 font-medium">
        {connector.name}
      </span>
      <span className="text-success inline-flex items-center gap-1.5 text-xs font-semibold">
        {connector.status}
        <CheckCircle2 className="size-4" aria-hidden="true" />
      </span>
    </div>
  );
}

export function SubscriptionsSettingsPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 py-5 sm:px-5 lg:px-6">
      <section className="max-w-4xl">
        <h1 className="text-brand-secondary text-2xl font-bold tracking-tight sm:text-3xl">
          Subscriptions & Settings
        </h1>
        <p className="text-brand-text mt-3 max-w-3xl text-sm leading-6 sm:text-base">
          Manage your subscription plan, users, workspace settings,
          notifications, and preferences to keep your operations running
          smoothly.
        </p>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <DashboardCard>
          <div className="flex items-center gap-3">
            <CardTitleIcon icon={FileText} />
            <h2 className="text-brand-secondary text-base font-semibold">
              Plan Summary
            </h2>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <p className="text-brand-secondary text-xl font-bold">
              {subscriptionsData.planSummary.name}
            </p>
            <StatusBadge variant="success">
              {subscriptionsData.planSummary.status}
            </StatusBadge>
          </div>
          <p className="text-muted-foreground mt-3 max-w-md text-sm leading-6">
            {subscriptionsData.planSummary.description}
          </p>

          <div className="mt-5 grid gap-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Renewal Date</span>
              <span className="text-brand-primary inline-flex items-center gap-2 text-right font-semibold">
                <Calendar className="size-4" aria-hidden="true" />
                {subscriptionsData.planSummary.renewalDate}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Billing Cycle</span>
              <span className="text-brand-secondary text-right font-semibold">
                {subscriptionsData.planSummary.billingCycle}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Amount</span>
              <span className="text-brand-secondary text-right font-semibold">
                {subscriptionsData.planSummary.amount}
              </span>
            </div>
          </div>

          <Button type="button" variant="outline" className="mt-6">
            Manage Plan
          </Button>
        </DashboardCard>

        <DashboardCard>
          <div className="flex items-center gap-3">
            <CardTitleIcon icon={Users} tone="blue" />
            <h2 className="text-brand-secondary text-base font-semibold">
              Usage & Seat Allocation
            </h2>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-3">
            {subscriptionsData.usageAllocation.map((allocation) => (
              <UsageMeter key={allocation.id} allocation={allocation} />
            ))}
          </div>

          <div className="border-info/10 bg-info/5 mt-5 flex flex-col gap-3 rounded-xl border p-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-brand-text text-sm">
              <span className="text-brand-secondary block font-semibold">
                Need more capacity?
              </span>
              <span className="text-info font-semibold">
                Upgrade your plan or add-ons.
              </span>
            </p>
            <Button type="button" variant="outline" size="sm">
              Upgrade Plan
            </Button>
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="flex items-center gap-3">
            <CardTitleIcon icon={Users} tone="blue" />
            <h2 className="text-brand-secondary text-base font-semibold">
              Users & Permissions
            </h2>
          </div>

          <div className="border-border-default mt-5 grid grid-cols-4 gap-3 border-b pb-4">
            {subscriptionsData.userPermissions.map((item) => (
              <div key={item.label}>
                <p className="text-brand-secondary text-xl font-bold">
                  {item.value}
                </p>
                <p className="text-brand-text mt-1 text-sm">{item.label}</p>
              </div>
            ))}
          </div>

          <p className="text-brand-secondary mt-5 font-semibold">
            Role Distribution
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-[7rem_minmax(0,1fr)]">
            <RoleDistributionChart items={subscriptionsData.roleDistribution} />
            <div className="space-y-2.5">
              {subscriptionsData.roleDistribution.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-sm">
                  <span
                    className={cn(
                      "size-2.5 rounded-full",
                      roleToneClasses[item.tone],
                    )}
                  />
                  <span className="text-brand-text min-w-0 flex-1">
                    {item.role}
                  </span>
                  <span className="text-muted-foreground shrink-0">
                    {item.count} ({item.percentage.toFixed(1)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button type="button" variant="outline">
              Manage Users
            </Button>
          </div>
        </DashboardCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <DashboardCard>
          <div className="flex items-center gap-3">
            <CardTitleIcon icon={Settings} tone="violet" />
            <h2 className="text-brand-secondary text-base font-semibold">
              Workspace Settings
            </h2>
          </div>

          <div className="mt-5 space-y-3">
            {subscriptionsData.workspaceSettings.map((setting) => (
              <div
                key={setting.label}
                className="flex justify-between gap-4 text-sm"
              >
                <span className="text-muted-foreground">{setting.label}</span>
                <span className="text-brand-secondary text-right font-semibold">
                  {setting.value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-center">
            <Button type="button" variant="outline">
              Edit Settings
            </Button>
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="flex items-center gap-3">
            <CardTitleIcon icon={Bell} tone="warning" />
            <h2 className="text-brand-secondary text-base font-semibold">
              Notifications & Preferences
            </h2>
          </div>

          <div className="mt-5">
            {subscriptionsData.notifications.map((notification) => (
              <ToggleRow
                key={notification.label}
                label={notification.label}
                description={notification.description}
                enabled={notification.enabled}
              />
            ))}
          </div>

          <div className="mt-5 flex justify-center">
            <Button type="button" variant="outline">
              Manage Preferences
            </Button>
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="flex items-center gap-3">
            <CardTitleIcon icon={Link2} />
            <h2 className="text-brand-secondary text-base font-semibold">
              Integrations & Connected Services
            </h2>
          </div>

          <div className="border-border-default mt-5 overflow-hidden rounded-xl border">
            {subscriptionsData.connectors.map((connector) => (
              <ConnectorRow key={connector.id} connector={connector} />
            ))}
          </div>

          <div className="mt-4 flex justify-center">
            <Button type="button" variant="outline">
              Manage Integrations
            </Button>
          </div>
        </DashboardCard>
      </section>

      <DashboardCard
        title="Billing & Invoice History"
        headerAction={
          <button
            type="button"
            className="text-brand-primary inline-flex items-center gap-2 text-sm font-semibold"
          >
            View all invoices
            <span aria-hidden="true">{"->"}</span>
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-border-default text-brand-secondary border-b">
                <th className="pb-3 font-semibold">Invoice ID</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Plan</th>
                <th className="pb-3 font-semibold">Billing Cycle</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 text-right font-semibold">Download</th>
              </tr>
            </thead>
            <tbody>
              {subscriptionsData.invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-border-default/70 border-b last:border-0"
                >
                  <td className="text-brand-secondary py-2.5 font-medium">
                    {invoice.id}
                  </td>
                  <td className="text-brand-text py-2.5">{invoice.date}</td>
                  <td className="text-brand-text py-2.5">{invoice.plan}</td>
                  <td className="text-brand-text py-2.5">
                    {invoice.billingCycle}
                  </td>
                  <td className="text-brand-text py-2.5">{invoice.amount}</td>
                  <td className="py-2.5">
                    <StatusBadge variant="success">
                      {invoice.status}
                    </StatusBadge>
                  </td>
                  <td className="py-2.5 text-right">
                    <Button type="button" variant="ghost" size="icon">
                      <Download className="size-4" aria-hidden="true" />
                      <span className="sr-only">Download {invoice.id}</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-muted-foreground mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <span>All amounts are in INR (Rs)</span>
          <span>
            Invoices are available for download for the past 24 months.
          </span>
        </div>
      </DashboardCard>

      <div className="ml-auto w-full max-w-md">
        <AssistantEntry />
      </div>
    </main>
  );
}
