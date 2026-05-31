"use client";

import Image from "next/image";
import { Edit, Mail, MapPin, Phone, Plus, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import logoMark from "@/docs/Vipas Files/Final Logo Files/Vipas Energy Final Logo Transparant.png";
import { AssistantEntry } from "@/components/dashboard/assistant-entry";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { ModuleKpiStrip } from "@/components/dashboard/module-kpi-strip";
import {
  StatusBadge,
  type StatusBadgeVariant,
} from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { accountData } from "@/lib/stub/account";
import type { OperationalStatus } from "@/types/energy-modules";

const statusVariant: Partial<Record<OperationalStatus, StatusBadgeVariant>> = {
  Active: "success",
  Invited: "info",
  Enabled: "success",
  Good: "success",
};

const accountContactCards: Array<{
  title: string;
  value: string;
  icon: LucideIcon;
}> = [
  {
    title: "Registered Office",
    value: "Koramangala, Bengaluru",
    icon: MapPin,
  },
  {
    title: "Primary Email",
    value: "info@vipasenergy.com",
    icon: Mail,
  },
  {
    title: "Support Phone",
    value: "+91 80 1234 5678",
    icon: Phone,
  },
];

export function ManageAccountPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
      <section className="max-w-3xl">
        <h1 className="text-brand-secondary text-3xl font-bold tracking-tight sm:text-4xl">
          Manage Account
        </h1>
        <p className="text-brand-text mt-3 max-w-2xl text-sm leading-6 sm:text-base">
          Maintain company profile, roles, contacts, subscription details, and
          account health without making real update calls in this milestone.
        </p>
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <DashboardCard
          title="Company Profile"
          className="xl:col-span-5"
          headerAction={
            <Button type="button" variant="outline" size="sm" disabled>
              <Edit className="size-4" aria-hidden="true" />
              Edit
            </Button>
          }
        >
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="border-border-default bg-surface-bg flex size-28 shrink-0 items-center justify-center rounded-xl border">
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
                {accountData.summary}
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            {accountData.details.map((detail) => (
              <div
                key={detail.label}
                className="grid gap-2 text-sm sm:grid-cols-[10rem_minmax(0,1fr)]"
              >
                <span className="text-muted-foreground">{detail.label}</span>
                <span className="text-brand-secondary font-semibold">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        </DashboardCard>

        <div className="xl:col-span-7">
          <ModuleKpiStrip kpis={accountData.kpis} />
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <DashboardCard
          title="Plan & Subscription Details"
          className="xl:col-span-4"
        >
          <div className="space-y-4">
            {accountData.planDetails.map((detail) => (
              <div key={detail.label} className="flex justify-between gap-4">
                <span className="text-muted-foreground text-sm">
                  {detail.label}
                </span>
                <span className="text-brand-secondary text-right text-sm font-semibold">
                  {detail.value}
                </span>
              </div>
            ))}
            <StatusBadge variant="success">Active</StatusBadge>
          </div>
        </DashboardCard>

        <DashboardCard title="Billing Contacts" className="xl:col-span-4">
          <div className="space-y-4">
            {accountData.billingContacts.map((contact) => (
              <div
                key={contact.label}
                className="border-border-default bg-surface-bg rounded-xl border p-3"
              >
                <p className="text-brand-secondary font-semibold">
                  {contact.label}
                </p>
                <p className="text-muted-foreground mt-1 text-sm">
                  {contact.value}
                </p>
              </div>
            ))}
            <Button type="button" variant="outline" className="w-full" disabled>
              <Plus className="size-4" aria-hidden="true" />
              Add Billing Contact
            </Button>
          </div>
        </DashboardCard>

        <DashboardCard title="Security Settings" className="xl:col-span-4">
          <div className="space-y-4">
            {[
              ["Multi-Factor Authentication", "Enabled"],
              ["Password Policy", "Enabled"],
              ["Session Timeout", "30 min"],
              ["Login Alerts", "Enabled"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-start gap-3">
                <span className="bg-brand-mint text-brand-primary flex size-9 shrink-0 items-center justify-center rounded-full">
                  <ShieldCheck className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-brand-secondary text-sm font-semibold">
                    {label}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Workspace setting
                  </p>
                </div>
                <span className="text-brand-primary text-xs font-semibold">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </DashboardCard>
      </section>

      <DashboardCard
        title="Users and Roles"
        headerAction={
          <Button type="button" disabled>
            <Plus className="size-4" aria-hidden="true" />
            Add User
          </Button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-border-default text-muted-foreground border-b text-xs">
                <th className="pb-3 font-semibold">Name</th>
                <th className="pb-3 font-semibold">Email</th>
                <th className="pb-3 font-semibold">Role</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Last Active</th>
              </tr>
            </thead>
            <tbody>
              {accountData.users.map((user) => (
                <tr
                  key={user.id}
                  className="border-border-default/70 border-b last:border-0"
                >
                  <td className="text-brand-secondary py-3 font-semibold">
                    {user.name}
                  </td>
                  <td className="text-brand-text py-3">{user.email}</td>
                  <td className="text-brand-text py-3">{user.role}</td>
                  <td className="py-3">
                    <StatusBadge
                      variant={statusVariant[user.status] ?? "neutral"}
                    >
                      {user.status}
                    </StatusBadge>
                  </td>
                  <td className="text-brand-text py-3">{user.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      <section className="grid gap-4 md:grid-cols-3">
        {accountContactCards.map((card) => {
          const Icon = card.icon;
          return (
            <DashboardCard key={card.title}>
              <div className="flex items-center gap-3">
                <span className="bg-brand-mint text-brand-primary flex size-10 items-center justify-center rounded-full">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-brand-secondary text-sm font-semibold">
                    {card.title}
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {card.value}
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
