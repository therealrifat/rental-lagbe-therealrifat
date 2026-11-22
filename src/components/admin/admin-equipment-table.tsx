import Image from "next/image";

import AdminEquipmentActions from "@/components/admin/admin-equipment-actions";
import StatusBadge from "@/components/shared/status-badge";
import type { EquipmentRecord } from "@/types/equipment";

const FALLBACK_IMAGE = "/equipment-placeholder.svg";

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

const rentalTypeLabels: Record<string, string> = {
  daily: "Daily",
  week: "Weekly",
  weekly: "Weekly",
  month: "Monthly",
  monthly: "Monthly",
};

const formatLabel = (value?: string, labels?: Record<string, string>) => {
  if (!value) return "—";
  if (labels?.[value]) return labels[value];
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const resolveImageUrl = (image: unknown): string => {
  if (typeof image === "string" && image.trim()) return image;
  if (!image || typeof image !== "object") return FALLBACK_IMAGE;

  const record = image as Record<string, unknown>;
  const direct = record.url ?? record.imageUrl ?? record.src;
  if (typeof direct === "string" && direct.trim()) return direct;

  const data = record.data;
  if (data && typeof data === "object") {
    const nested = (data as Record<string, unknown>).url;
    if (typeof nested === "string" && nested.trim()) return nested;
  }

  return FALLBACK_IMAGE;
};

const formatPrice = (price?: number) => {
  if (typeof price !== "number" || Number.isNaN(price)) return "—";
  return `৳${price.toLocaleString("en-US")}`;
};

const EquipmentIdentity = ({ equipment }: { equipment: EquipmentRecord }) => (
  <div className="flex items-center gap-3">
    <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-border">
      <Image
        src={resolveImageUrl(equipment.image)}
        alt={equipment.equipmentName || "Equipment"}
        fill
        unoptimized
        sizes="40px"
        className="object-cover"
      />
    </div>
    <div className="min-w-0 space-y-0.5">
      <p className="truncate font-medium">{equipment.equipmentName || "—"}</p>
      <p className="font-mono text-xs text-muted-foreground">
        {equipment._id ? `${equipment._id.slice(0, 8)}…` : "—"}
      </p>
    </div>
  </div>
);

const EmptyState = ({ statusFilter }: { statusFilter: string }) => (
  <div className="rounded-xl border border-border bg-card px-4 py-12 text-center text-sm text-muted-foreground">
    {statusFilter === "all"
      ? "No equipment found."
      : `No ${statusFilter.toLowerCase()} equipment found.`}
  </div>
);

const AdminEquipmentTable = ({
  equipments,
  statusFilter = "all",
}: {
  equipments: EquipmentRecord[];
  statusFilter?: string;
}) => {
  if (equipments.length === 0)
    return <EmptyState statusFilter={statusFilter} />;

  return (
    <>
      {/* Mobile & tablet */}
      <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
        {equipments.map((equipment) => (
          <article
            key={equipment._id}
            className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-3">
              <EquipmentIdentity equipment={equipment} />
              <StatusBadge status={equipment.status} />
            </div>

            <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 text-xs min-[400px]:grid-cols-2 sm:text-sm">
              <div>
                <dt className="text-muted-foreground">Category</dt>
                <dd className="mt-0.5 font-medium">
                  {formatLabel(equipment.category, categoryLabels)}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Rental Type</dt>
                <dd className="mt-0.5 font-medium">
                  {formatLabel(equipment.rentaltype, rentalTypeLabels)}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Owner</dt>
                <dd className="mt-0.5 truncate font-mono font-medium">
                  {equipment.ownerId ? `${equipment.ownerId.slice(0, 8)}…` : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Price</dt>
                <dd className="mt-0.5 font-semibold">{formatPrice(equipment.price)}</dd>
              </div>
            </dl>

            <div className="mt-4 border-t border-border pt-4">
              <AdminEquipmentActions equipment={equipment} />
            </div>
          </article>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-xl border border-border bg-card lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1040px] text-left text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Equipment</th>
                <th scope="col" className="px-4 py-3 font-medium">Category</th>
                <th scope="col" className="px-4 py-3 font-medium">Owner</th>
                <th scope="col" className="px-4 py-3 font-medium">Price</th>
                <th scope="col" className="px-4 py-3 font-medium">Rental Type</th>
                <th scope="col" className="px-4 py-3 font-medium">Status</th>
                <th scope="col" className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {equipments.map((equipment) => (
                <tr key={equipment._id} className="transition-colors hover:bg-muted/40">
                  <td className="px-4 py-3">
                    <EquipmentIdentity equipment={equipment} />
                  </td>
                  <td className="px-4 py-3">
                    {formatLabel(equipment.category, categoryLabels)}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">
                    {equipment.ownerId ? `${equipment.ownerId.slice(0, 8)}…` : "—"}
                  </td>
                  <td className="px-4 py-3 font-medium">{formatPrice(equipment.price)}</td>
                  <td className="px-4 py-3">
                    {formatLabel(equipment.rentaltype, rentalTypeLabels)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={equipment.status} />
                  </td>
                  <td className="px-4 py-3">
                    <AdminEquipmentActions equipment={equipment} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminEquipmentTable;
