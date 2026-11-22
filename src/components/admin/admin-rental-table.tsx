import AdminRentalActions from "@/components/admin/admin-rental-actions";
import StatusBadge from "@/components/shared/status-badge";
import type { AdminRentalRecord } from "@/data/dummy-admin-rentals";

const formatDate = (value?: string) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatAmount = (value?: number) => {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  return `৳${value.toLocaleString("en-US")}`;
};

const shortId = (value?: string) => (value ? `${value.slice(0, 8)}…` : "—");

const CustomerCell = ({ rental }: { rental: AdminRentalRecord }) => (
  <div className="space-y-0.5">
    <p className="font-medium">{rental.customerName || "—"}</p>
    <p className="text-xs text-muted-foreground">
      {rental.contactNumber || "—"}
    </p>
    <p className="text-xs text-muted-foreground">
      {rental.deliveryAddress || "—"}
    </p>
  </div>
);

const OwnerCell = ({ rental }: { rental: AdminRentalRecord }) => (
  <div className="space-y-0.5">
    <p className="font-medium">{rental.ownerName || "Tarek Rahman"}</p>
    <p className="text-xs text-muted-foreground">{rental.ownerEmail || "demo@gmail.com"}</p>
    <p className="text-xs text-muted-foreground">{rental.ownerPhone || "0171586452"}</p>
  </div>
);

const EquipmentCell = ({ rental }: { rental: AdminRentalRecord }) => (
  <div className="space-y-0.5">
    <p className="font-medium">{rental.equipmentName || "—"}</p>
    <p className="font-mono text-xs text-muted-foreground">
      {shortId(rental.equipmentId)}
    </p>
  </div>
);

const EmptyState = ({ statusFilter }: { statusFilter: string }) => (
  <div className="rounded-xl border border-border bg-card px-4 py-12 text-center text-sm text-muted-foreground">
    {statusFilter === "all"
      ? "No rental bookings found."
      : `No ${statusFilter.toLowerCase()} bookings found.`}
  </div>
);

type AdminRentalTableProps = {
  rentals: AdminRentalRecord[];
  statusFilter?: string;
};

const AdminRentalTable = ({
  rentals,
  statusFilter = "all",
}: AdminRentalTableProps) => {
  if (rentals.length === 0) return <EmptyState statusFilter={statusFilter} />;

  return (
    <>
      {/* Mobile & tablet */}
      <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
        {rentals.map((rental) => (
          <article
            key={rental._id}
            className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-3">
              <CustomerCell rental={rental} />
              <StatusBadge
                status={rental.paymentStatus ? "Paid" : "Unpaid"}
              />
            </div>

            <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 text-xs min-[400px]:grid-cols-2 sm:text-sm">
              <div className="min-[400px]:col-span-2">
                <dt className="text-muted-foreground">Owner Information</dt>
                <dd className="mt-1">
                  <OwnerCell rental={rental} />
                </dd>
              </div>
              <div className="min-[400px]:col-span-2">
                <dt className="text-muted-foreground">Equipment Name</dt>
                <dd className="mt-1">
                  <EquipmentCell rental={rental} />
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Rental Duration</dt>
                <dd className="mt-0.5 font-medium">
                  {formatDate(rental.rentalStartDate)} –{" "}
                  {formatDate(rental.rentalEndDate)}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Booking Amount</dt>
                <dd className="mt-0.5 font-semibold">
                  {formatAmount(rental.amount)}
                </dd>
              </div>
            </dl>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
              <span className="text-xs font-medium text-muted-foreground">
                Booking Status
              </span>
              <AdminRentalActions rental={rental} />
            </div>
          </article>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-xl border border-border bg-card lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1180px] text-left text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">
                  Customer Information
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Owner Information
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Equipment Name
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Rental Duration
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Booking Amount
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Payment Status
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Booking Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rentals.map((rental) => (
                <tr
                  key={rental._id}
                  className="transition-colors hover:bg-muted/40"
                >
                  <td className="px-4 py-3">
                    <CustomerCell rental={rental} />
                  </td>
                  <td className="px-4 py-3">
                    <OwnerCell rental={rental} />
                  </td>
                  <td className="px-4 py-3">
                    <EquipmentCell rental={rental} />
                  </td>
                  <td className="px-4 py-3">
                    {formatDate(rental.rentalStartDate)}
                    <span className="mx-1 text-muted-foreground">–</span>
                    {formatDate(rental.rentalEndDate)}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {formatAmount(rental.amount)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      status={rental.paymentStatus ? "Paid" : "Unpaid"}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <AdminRentalActions rental={rental} />
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

export default AdminRentalTable;
