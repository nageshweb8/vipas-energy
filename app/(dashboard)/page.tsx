import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { dashboardData } from "@/lib/stub/dashboard";

export default function DashboardOverviewPage() {
  return <DashboardContent data={dashboardData} />;
}
