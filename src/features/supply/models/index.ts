import type { OperationalStatus } from "@/types/energy";

export interface SupplySiteRow {
  id: string;
  supplier: string;
  committedGwh: number;
  deliveredGwh: number;
  fulfillmentPercent: number;
  contractEnd: string;
  status: OperationalStatus;
}

export interface SupplyDeliveryRow {
  id: string;
  deliveryDate: string;
  supplier: string;
  commodity: string;
  quantityGwh: number;
  status: OperationalStatus;
}
