"use client";

import Image from "next/image";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Bell,
  Building2,
  CheckCircle2,
  CreditCard,
  Edit,
  Globe2,
  Hash,
  KeyRound,
  Lock,
  Mail,
  MapPin,
  MoreVertical,
  Phone,
  Plus,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import logoMark from "@/public/brand/vipas-energy-logo.png";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { DataFreshnessIndicator } from "@/components/dashboard/data-freshness-indicator";
import { Button } from "@/components/ui/button";
import { accountData } from "@/lib/stub/account";
import { cn } from "@/lib/utils";
import type {
  AccountActivity,
  AccountDetail,
  AccountSecuritySetting,
  AccountSummaryItem,
  ModuleKpiIcon,
  OperationalStatus,
} from "@/types/energy-modules";

const summaryIconMap: Record<ModuleKpiIcon, LucideIcon> = {
  activity: Activity,
  alert: AlertCircle,
  bar: Activity,
  calendar: Activity,
  cloud: Activity,
  credit: CreditCard,
  database: Activity,
  leaf: Activity,
  shield: ShieldCheck,
  target: Activity,
  users: Users,
  wallet: CreditCard,
  zap: Activity,
};

const detailIconMap: Record<string, LucideIcon> = {
  "Company ID": Hash,
  Industry: Building2,
  Website: Globe2,
  Email: Mail,
  Phone: Phone,
  Address: MapPin,
};

const summaryToneClasses: Record<AccountSummaryItem["tone"], string> = {
  green: "bg-brand-mint text-brand-primary",
  blue: "bg-info/10 text-info",
  violet: "bg-violet-500/10 text-violet-600 dark:text-violet-200",
};

const activityToneClasses: Record<AccountActivity["tone"], string> = {
  green: "bg-brand-mint text-brand-primary",
  blue: "bg-info/10 text-info",
  violet: "bg-violet-500/10 text-violet-600 dark:text-violet-200",
  red: "bg-danger/10 text-danger",
  warning: "bg-warning/10 text-warning",
};

const roleClasses: Record<string, string> = {
  "Account Admin":
    "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-200",
  "Operations Manager": "border-info/20 bg-info/10 text-info",
  Analyst: "border-success/20 bg-success/10 text-success",
  Viewer:
    "border-border-default bg-surface-bg text-muted-foreground dark:border-white/10",
  "Billing Manager": "border-warning/20 bg-warning/10 text-warning",
};

const statusClasses: Partial<Record<OperationalStatus, string>> = {
  Active: "text-success",
  Invited: "text-info",
};

function SummaryTile({ item }: { item: AccountSummaryItem }) {
  const Icon = summaryIconMap[item.icon];

  return (
    <article className="border-border-default bg-surface-white rounded-xl border p-4">
      <span
        className={cn(
          "flex size-11 items-center justify-center rounded-full",
          summaryToneClasses[item.tone],
        )}
      >
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <p className="text-brand-secondary mt-5 text-2xl font-bold tracking-tight">
        {item.id === "health" ? `${item.value}%` : item.value}
      </p>
      <p className="text-brand-text mt-1 text-sm">{item.label}</p>
      {item.supportingText && (
        <p className="text-success mt-0.5 text-sm font-semibold">
          {item.supportingText}
        </p>
      )}
      <button
        type="button"
        className="text-brand-primary mt-5 inline-flex items-center gap-2 text-sm font-semibold"
      >
        {item.actionLabel}
        <ArrowRight className="size-4" aria-hidden="true" />
      </button>
    </article>
  );
}

function DetailRow({ detail }: { detail: AccountDetail }) {
  const Icon = detailIconMap[detail.label] ?? Building2;

  return (
    <div className="grid grid-cols-[1.2rem_8.5rem_minmax(0,1fr)] gap-3 text-sm">
      <Icon
        className="text-muted-foreground mt-0.5 size-4"
        aria-hidden="true"
      />
      <span className="text-muted-foreground">{detail.label}</span>
      <span className="text-brand-secondary font-medium">{detail.value}</span>
    </div>
  );
}

function RoleBadge({ role }: { role: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-md border px-2.5 text-xs font-semibold",
        roleClasses[role] ?? roleClasses.Viewer,
      )}
    >
      {role}
    </span>
  );
}

function StatusDot({ status }: { status: OperationalStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-sm font-semibold",
        statusClasses[status] ?? "text-muted-foreground",
      )}
    >
      <span className="size-2 rounded-full bg-current" />
      {status}
    </span>
  );
}

function SecurityRow({ setting }: { setting: AccountSecuritySetting }) {
  const iconMap: Record<string, LucideIcon> = {
    mfa: Lock,
    password: KeyRound,
    session: Activity,
    "login-alerts": Bell,
  };
  const Icon = iconMap[setting.id] ?? ShieldCheck;

  return (
    <div className="border-border-default/70 flex items-start gap-3 border-b py-3 last:border-0">
      <Icon className="text-muted-foreground mt-1 size-4" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="text-brand-secondary text-sm font-semibold">
          {setting.label}
        </p>
        <p className="text-muted-foreground mt-0.5 text-xs leading-5">
          {setting.description}
        </p>
      </div>
      <span
        className={cn(
          "shrink-0 text-sm font-semibold",
          setting.enabled ? "text-success" : "text-brand-secondary",
        )}
      >
        {setting.value}
      </span>
      {setting.enabled && (
        <CheckCircle2 className="text-success fill-success/10 mt-0.5 size-5 shrink-0" />
      )}
    </div>
  );
}

function ActivityRow({ activity }: { activity: AccountActivity }) {
  const Icon = summaryIconMap[activity.icon];

  return (
    <div className="grid grid-cols-[2.25rem_minmax(0,1fr)_8rem] gap-3 py-2.5">
      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-full",
          activityToneClasses[activity.tone],
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-brand-secondary text-sm font-semibold">
          {activity.title}
        </p>
        <p className="text-muted-foreground mt-0.5 text-xs leading-5">
          {activity.description}
        </p>
      </div>
      <span className="text-muted-foreground pt-1 text-right text-xs">
        {activity.timestamp}
      </span>
    </div>
  );
}

export function ManageAccountPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
      <section className="max-w-4xl">
        <h1 className="text-brand-secondary text-3xl font-bold tracking-tight sm:text-4xl">
          Manage Account
        </h1>
        <p className="text-brand-text mt-3 max-w-3xl text-sm leading-6 sm:text-base">
          Maintain your company profile, manage user roles, billing contacts,
          security preferences, and monitor account activity.
        </p>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(21rem,0.95fr)_minmax(0,1.85fr)]">
        <div className="flex flex-col gap-5">
          <DashboardCard
            title="Company Profile"
            headerAction={
              <Button type="button" variant="outline" size="sm">
                <Edit className="size-4" aria-hidden="true" />
                Edit
              </Button>
            }
          >
            <div className="flex flex-col gap-5 sm:flex-row">
              <div className="border-border-default bg-surface-white flex size-28 shrink-0 items-center justify-center rounded-xl border">
                <Image
                  src={logoMark}
                  alt=""
                  className="size-20 object-contain"
                  priority
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-brand-secondary text-lg font-bold">
                  {accountData.companyName}
                </p>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {accountData.companySummary}
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-4">
              {accountData.details.map((detail) => (
                <DetailRow key={detail.label} detail={detail} />
              ))}
            </div>
          </DashboardCard>

          <DashboardCard
            title="Billing Contacts"
            headerAction={
              <button
                type="button"
                className="text-brand-primary inline-flex items-center gap-2 text-sm font-semibold"
              >
                Manage
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            }
          >
            <div className="space-y-5">
              {accountData.billingContacts.map((contact) => (
                <div key={contact.id} className="flex items-start gap-3">
                  <span className="bg-muted text-brand-text flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                    {contact.initials}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-brand-secondary font-semibold">
                        {contact.name}
                      </p>
                      {contact.badge && (
                        <span className="border-success/20 bg-success/10 text-success rounded-md border px-2 py-0.5 text-xs font-semibold">
                          {contact.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {contact.email}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {contact.phone}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button type="button" variant="outline" className="mt-6 w-full">
              <Plus className="size-4" aria-hidden="true" />
              Add Billing Contact
            </Button>
          </DashboardCard>
        </div>

        <div className="flex flex-col gap-5">
          <DashboardCard title="Account Summary">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {accountData.summaryItems.map((item) => (
                <SummaryTile key={item.id} item={item} />
              ))}
            </div>
          </DashboardCard>

          <DashboardCard
            title="Users and Roles"
            headerAction={
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="text-brand-primary hidden items-center gap-2 text-sm font-semibold sm:inline-flex"
                >
                  View all users
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
                <Button type="button">
                  <Plus className="size-4" aria-hidden="true" />
                  Add User
                </Button>
              </div>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-border-default text-brand-secondary border-b text-xs">
                    <th className="pb-3 font-semibold">Name</th>
                    <th className="pb-3 font-semibold">Email</th>
                    <th className="pb-3 font-semibold">Role</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Last Active</th>
                    <th className="pb-3 font-semibold">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {accountData.users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-border-default/70 border-b last:border-0"
                    >
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <span className="bg-muted text-brand-text flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                            {user.initials}
                          </span>
                          <span className="text-brand-secondary font-medium">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="text-brand-text py-3">{user.email}</td>
                      <td className="py-3">
                        <RoleBadge role={user.role} />
                      </td>
                      <td className="py-3">
                        <StatusDot status={user.status} />
                      </td>
                      <td className="text-brand-text py-3">
                        {user.lastActive}
                      </td>
                      <td className="py-3 text-right">
                        <Button type="button" variant="ghost" size="icon">
                          <MoreVertical className="size-4" aria-hidden="true" />
                          <span className="sr-only">User actions</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DashboardCard>

          <section className="grid gap-5 lg:grid-cols-2">
            <DashboardCard
              title="Security Settings"
              headerAction={
                <button
                  type="button"
                  className="text-brand-primary inline-flex items-center gap-2 text-sm font-semibold"
                >
                  Manage
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              }
            >
              <div>
                {accountData.securitySettings.map((setting) => (
                  <SecurityRow key={setting.id} setting={setting} />
                ))}
              </div>
            </DashboardCard>

            <DashboardCard
              title="Recent Account Activity"
              headerAction={
                <button
                  type="button"
                  className="text-brand-primary inline-flex items-center gap-2 text-sm font-semibold"
                >
                  View all activity
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              }
            >
              <div className="space-y-1">
                {accountData.recentActivity.map((activity) => (
                  <ActivityRow key={activity.id} activity={activity} />
                ))}
              </div>
            </DashboardCard>
          </section>
        </div>
      </section>

      <DataFreshnessIndicator
        timezoneLabel={accountData.timezoneLabel}
        refreshedLabel={accountData.refreshedLabel}
      />
    </main>
  );
}
