import type { OperationalStatus } from "@/types/energy";

export interface ConnectorCard {
  id: string;
  name: string;
  description: string;
  status: OperationalStatus;
  category: string;
}

export interface UsageAllocation {
  id: string;
  label: string;
  value: number;
  usedLabel: string;
  actionLabel: string;
  tone: "green" | "blue" | "violet";
}

export interface RoleDistributionItem {
  id: string;
  role: string;
  count: number;
  percentage: number;
  tone: "green" | "blue" | "violet" | "neutral";
}

export interface InvoiceRow {
  id: string;
  date: string;
  plan: string;
  billingCycle: string;
  amount: string;
  status: OperationalStatus;
}
