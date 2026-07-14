import type { ModuleKpiIcon, OperationalStatus } from "@/types/energy";

export interface AccountDetail {
  label: string;
  value: string;
}

export interface AccountSummaryItem {
  id: string;
  label: string;
  value: string;
  actionLabel: string;
  icon: ModuleKpiIcon;
  tone: "green" | "blue" | "violet";
  supportingText?: string;
}

export interface AccountBillingContact {
  id: string;
  initials: string;
  name: string;
  email: string;
  phone: string;
  badge?: string;
}

export interface AccountUserRow {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: string;
  status: OperationalStatus;
  lastActive: string;
}

export interface AccountSecuritySetting {
  id: string;
  label: string;
  description: string;
  value: string;
  enabled: boolean;
}

export interface AccountActivity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  tone: "green" | "blue" | "violet" | "red" | "warning";
  icon: ModuleKpiIcon;
}
