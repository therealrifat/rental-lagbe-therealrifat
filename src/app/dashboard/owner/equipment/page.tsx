import React from "react";

import EquipmentActions from "@/components/owner/equipment-actions";
import { getMyEquipments } from "@/lib/api/users";
import { getUserSessionServer } from "@/lib/core/session-server";
import type { EquipmentRecord } from "@/types/equipment";

const categoryLabels: Record<string, string> = {
  "construction-equipment": "Construction Equipment",
  "photography-equipment": "Photography Equipment",
  "vehicles-transportation": "Vehicles & Transportation",
  "agriculture-equipment": "Agriculture Equipment",
  electronics: "Electronics",
  "event-equipment": "Event Equipment",
  "cleaning-equipment": "Cleaning Equipment",
  "material-handling": "Material Handling",
  "power-equipment": "Power Equipment",
};

const statusStyles: Record<string, string> = {
  Pending: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  Approved: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Rejected: "bg-destructive/10 text-destructive",
};

const formatCategory = (category?: string) => {
  if (!category) return "—";
  if (categoryLabels[category]) return categoryLabels[category];
  return category
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const StatusBadge = ({ status }: { status?: string }) => {
  const value = status || "Pending";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
        statusStyles[value] ?? "bg-muted text-muted-foreground"
      }`}
    >
      {value}
    </span>
  );
};

const MyEquipments = async () => {
  const userInfo = await getUserSessionServer();
  const ownerId = userInfo?.user.id;

  if (!ownerId) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
        Please log in to view your equipment.
      </div>
    );
  }

  const result = await getMyEquipments(ownerId);
  
  const equipments: EquipmentRecord[] = Array.isArray(result) ? result : [];

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">My Equipments</h1>
        <p className="text-sm text-muted-foreground">
          Manage the equipment you listed for rent and check its approval
          status.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-muted/50 text-xs tracking-wide text-muted-foreground uppercase">
            <tr>
              <th scope="col" className="px-3 py-3 font-medium lg:px-4">
                Equipment Name
              </th>
              <th scope="col" className="px-3 py-3 font-medium lg:px-4">
                Category
              </th>
              <th scope="col" className="px-3 py-3 font-medium lg:px-4">
                Rental Price
              </th>
              <th scope="col" className="px-3 py-3 font-medium lg:px-4">
                Available Quantity
              </th>
              <th scope="col" className="px-3 py-3 font-medium lg:px-4">
                Status
              </th>
              <th scope="col" className="px-3 py-3 font-medium lg:px-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {equipments.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-muted-foreground"
                >
                  No equipment added yet.
                </td>
              </tr>
            ) : (
              equipments.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-border transition-colors hover:bg-muted/40"
                >
                  <td className="px-3 py-3 font-medium lg:px-4">
                    {item.equipmentName}
                  </td>
                  <td className="px-3 py-3 lg:px-4">
                    {formatCategory(item.category)}
                  </td>
                  <td className="px-3 py-3 lg:px-4">{item.price}</td>
                  <td className="px-3 py-3 lg:px-4">{item.quantity}</td>
                  <td className="px-3 py-3 lg:px-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-3 py-3 lg:px-4">
                    <EquipmentActions equipment={item} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEquipments;
