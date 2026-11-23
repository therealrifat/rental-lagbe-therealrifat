import {
  Boxes,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Wallet,
} from "lucide-react";

import AnalyticsBarChart from "@/components/analytics/analytics-bar-chart";
import AnalyticsStatGrid from "@/components/analytics/analytics-stat-grid";
import { getOwnerAnalytics } from "@/lib/api/analytics";
import type { AnalyticsChartConfig, AnalyticsMetric } from "@/types/analytics";

const OwnerDashboard = async () => {
  const stats = await getOwnerAnalytics();

  const metrics: AnalyticsMetric[] = [
    {
      id: "total-equipment",
      label: "Total Equipment",
      value: stats.totalEquipment,
      icon: Boxes,
      tone: "sky",
      hint: "Your listed equipment",
      href: "/dashboard/owner/equipment",
    },
    {
      id: "total-bookings",
      label: "Total Bookings",
      value: stats.totalBookings,
      icon: CalendarCheck,
      tone: "violet",
      hint: "For your equipment",
      href: "/dashboard/owner/equipment-rentals",
    },
    {
      id: "pending-bookings",
      label: "Pending Bookings",
      value: stats.pendingBookings,
      icon: Clock3,
      tone: "amber",
      hint: "Awaiting confirmation",
      href: "/dashboard/owner/equipment-rentals",
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
      hint: "Your total earnings",
    },
  ];

  const chart: AnalyticsChartConfig = {
    data: stats.monthlyBookings.map(({ month, bookings }) => ({
      month,
      bookings,
    })),
    xKey: "month",
    series: [
      { key: "bookings", label: "Bookings", color: "#10b981" },
    ],
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <header className="space-y-1">
        <h1 className="text-xl font-bold sm:text-2xl">Owner Dashboard</h1>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Track your equipment, bookings, and earnings in one place.
        </p>
      </header>

      <AnalyticsStatGrid metrics={metrics} />

      <AnalyticsBarChart
        title="Monthly Booking Statistics"
        description="Bookings made for your equipment each month."
        {...chart}
      />
    </div>
  );
};

export default OwnerDashboard;
