import {
  Boxes,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Users,
  Wallet,
} from "lucide-react";

import AnalyticsBarChart from "@/components/analytics/analytics-bar-chart";
import AnalyticsStatGrid from "@/components/analytics/analytics-stat-grid";
import { getAdminAnalytics } from "@/lib/api/analytics";
import type { AnalyticsChartConfig, AnalyticsMetric } from "@/types/analytics";

const AdminDashboard = async () => {
  const stats = await getAdminAnalytics();

  const metrics: AnalyticsMetric[] = [
    {
      id: "total-users",
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      tone: "indigo",
      hint: "Registered accounts",
      href: "/dashboard/admin/users",
    },
    {
      id: "total-equipment",
      label: "Total Equipment",
      value: stats.totalEquipment,
      icon: Boxes,
      tone: "sky",
      hint: "Listed on the platform",
      href: "/dashboard/admin/all-equipment",
    },
    {
      id: "total-bookings",
      label: "Total Bookings",
      value: stats.totalBookings,
      icon: CalendarCheck,
      tone: "violet",
      hint: "All time",
      href: "/dashboard/admin/all-rentals",
    },
    {
      id: "pending-approvals",
      label: "Pending Approvals",
      value: stats.pendingApprovals,
      icon: Clock3,
      tone: "amber",
      hint: "Equipment awaiting review",
      href: "/dashboard/admin/all-equipment",
    },
    {
      id: "completed-rentals",
      label: "Completed Rentals",
      value: stats.completedRentals,
      icon: CheckCircle2,
      tone: "emerald",
      hint: "Rental period ended",
    },
    {
      id: "total-revenue",
      label: "Total Revenue",
      value: `৳${stats.totalRevenue.toLocaleString("en-BD")}`,
      icon: Wallet,
      tone: "rose",
      hint: "From paid bookings",
    },
  ];

  const chart: AnalyticsChartConfig = {
    data: stats.monthlyBookings.map(
      ({ month, bookings }: { month: string; bookings: number }) => ({
      month,
      bookings,
      }),
    ),
    xKey: "month",
    series: [
      { key: "bookings", label: "Bookings", color: "#6366f1" },
    ],
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <header className="space-y-1">
        <h1 className="text-xl font-bold sm:text-2xl">Admin Dashboard</h1>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Overview of users, equipment, bookings, and revenue across Rental
          Lagbe.
        </p>
      </header>

      <AnalyticsStatGrid metrics={metrics} />

      <AnalyticsBarChart
        title="Monthly Booking Statistics"
        description="Number of bookings created each month across the platform."
        {...chart}
      />
    </div>
  );
};

export default AdminDashboard;
