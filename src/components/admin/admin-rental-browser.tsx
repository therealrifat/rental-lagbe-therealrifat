"use client";

import { useMemo, useState } from "react";

import AdminRentalFilters from "@/components/admin/admin-rental-filters";
import AdminRentalTable from "@/components/admin/admin-rental-table";
import type { AdminRentalRecord } from "@/data/dummy-admin-rentals";

const AdminRentalBrowser = ({
  rentals,
}: {
  rentals: AdminRentalRecord[];
}) => {
  const [status, setStatus] = useState("all");

  const filteredRentals = useMemo(() => {
    if (status === "all") return rentals;
    return rentals.filter((rental) => rental.bookingStatus === status);
  }, [rentals, status]);

  return (
    <div className="space-y-4">
      <AdminRentalFilters status={status} onStatusChange={setStatus} />
      <AdminRentalTable rentals={filteredRentals} statusFilter={status} />
    </div>
  );
};

export default AdminRentalBrowser;
