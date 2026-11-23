import { dummyAdminEquipments } from "./dummy-admin-equipments";
import { dummyAdminRentals } from "./dummy-admin-rentals";

export type AdminAnalyticsSnapshot = {
  totalUsers: number;
  totalEquipment: number;
  totalBookings: number;
  pendingApprovals: number;
  completedRentals: number;
  totalRevenue: number;
  monthlyBookings: { month: string; bookings: number }[];
};

const today = new Date();

// Display-only numbers for now. Replace this whole snapshot with your API
// response later — the page and shared components only depend on the shape.
export const dummyAdminAnalytics: AdminAnalyticsSnapshot = {
  totalUsers: 1248,
  totalEquipment: dummyAdminEquipments.length,
  totalBookings: dummyAdminRentals.length,
  pendingApprovals: dummyAdminEquipments.filter(
    (item) => item.status === "Pending"
  ).length,
  completedRentals: dummyAdminRentals.filter(
    (item) =>
      item.bookingStatus === "Approved" &&
      new Date(item.rentalEndDate).getTime() < today.getTime()
  ).length,
  totalRevenue: dummyAdminRentals
    .filter((item) => item.paymentStatus && item.bookingStatus !== "Rejected")
    .reduce((sum, item) => sum + Number(item.amount || 0), 0),
  monthlyBookings: [
    { month: "Dec", bookings: 25 },
    { month: "Jan", bookings: 38 },
    { month: "Feb", bookings: 46 },
    { month: "Mar", bookings: 42 },
    { month: "Apr", bookings: 55 },
    { month: "May", bookings: 61 },
    { month: "Jun", bookings: 58 },
    { month: "Jul", bookings: 72 },
    { month: "Aug", bookings: 68 },
    { month: "Sep", bookings: 79 },
    { month: "Oct", bookings: 85 },
    { month: "Nov", bookings: 96 },
  ],
};
