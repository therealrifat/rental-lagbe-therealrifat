"use client";

import { useMemo, useState } from "react";

import AdminEquipmentFilters from "@/components/admin/admin-equipment-filters";
import AdminEquipmentTable from "@/components/admin/admin-equipment-table";
import type { EquipmentRecord } from "@/types/equipment";

const AdminEquipmentBrowser = ({
  equipments,
}: {
  equipments: EquipmentRecord[];
}) => {
  const [status, setStatus] = useState("all");

  const filteredEquipments = useMemo(() => {
    if (status === "all") return equipments;
    return equipments.filter((equipment) => equipment.status === status);
  }, [equipments, status]);

  return (
    <div className="space-y-4">
      <AdminEquipmentFilters status={status} onStatusChange={setStatus} />
      <AdminEquipmentTable equipments={filteredEquipments} statusFilter={status} />
    </div>
  );
};

export default AdminEquipmentBrowser;
