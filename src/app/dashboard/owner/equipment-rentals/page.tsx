import { getOwnerRental } from "@/lib/api/users";
import { getUserSessionServer } from "@/lib/core/session-server";
import type { BookingDocument } from "@/types/equipment";

type RentalRequest = BookingDocument & { _id: string; ownerId: string };




const paymentStyles: Record<string, string> = {
  Paid: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Unpaid: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
};

const bookingStyles: Record<string, string> = {
  Pending: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  Approved: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Rejected: "bg-destructive/10 text-destructive",
};

const formatDate = (value: string) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatAmount = (value: number) => {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  return `৳${value.toLocaleString("en-US")}`;
};

const StatusBadge = ({
  label,
  styles,
}: {
  label: string;
  styles: Record<string, string>;
}) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
      styles[label] ?? "bg-muted text-muted-foreground"
    }`}
  >
    {label}
  </span>
);

const CustomerCell = ({ rental }: { rental: RentalRequest }) => (
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

const EquipmentCell = ({ rental }: { rental: RentalRequest }) => (
  <div className="space-y-0.5">
    <p className="font-medium">{rental.equipmentName || "—"}</p>
    <p className="font-mono text-xs text-muted-foreground">
      {rental.equipmentId ? `${rental.equipmentId.slice(0, 8)}…` : "—"}
    </p>
  </div>
);

const EmptyState = () => (
  <div className="rounded-xl border border-border bg-card px-4 py-12 text-center text-sm text-muted-foreground">
    No equipment rentals yet.
  </div>
);

const EquipmentRentals = async () => {

    const userSession =await getUserSessionServer()
  const result = await getOwnerRental(userSession?.user.id as string);
  const rentals = result;
  console.log(result);
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mb-5 space-y-1 sm:mb-6">
        <h1 className="text-xl font-bold sm:text-2xl">Equipment Rentals</h1>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Review booking requests for the equipment you listed.
        </p>
      </div>

      {rentals.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Mobile & tablet */}
          <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
            {rentals.map((rental: RentalRequest) => (
              <article
                key={rental._id}
                className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5"
              >
                <div className="mb-4 flex flex-wrap items-start justify-between gap-2 border-b border-border pb-3">
                  <CustomerCell rental={rental} />
                  <StatusBadge
                    label={rental.bookingStatus}
                    styles={bookingStyles}
                  />
                </div>

                <dl className="grid grid-cols-1 gap-x-4 gap-y-3 text-xs min-[400px]:grid-cols-2 sm:text-sm">
                  <div className="min-[400px]:col-span-2">
                    <dt className="text-muted-foreground">
                      Equipment Information
                    </dt>
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
                    <dt className="text-muted-foreground">Required Quantity</dt>
                    <dd className="mt-0.5 font-medium">{rental.quantity}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Booking Amount</dt>
                    <dd className="mt-0.5 font-semibold">
                      {formatAmount(rental.amount)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Payment Status</dt>
                    <dd className="mt-1">
                      <StatusBadge
                        label={rental.paymentStatus ? "Paid" : "Unpaid"}
                        styles={paymentStyles}
                      />
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          {/* Desktop */}
          <div className="hidden overflow-hidden rounded-xl border border-border bg-card lg:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Customer Information
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Equipment Information
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Rental Duration
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Required Quantity
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
                {rentals.map((rental: RentalRequest) => (
                  <tr
                    key={rental._id}
                    className="transition-colors hover:bg-muted/40"
                  >
                    <td className="px-4 py-3">
                      <CustomerCell rental={rental} />
                    </td>
                    <td className="px-4 py-3">
                      <EquipmentCell rental={rental} />
                    </td>
                    <td className="px-4 py-3">
                      {formatDate(rental.rentalStartDate)}
                      <span className="mx-1 text-muted-foreground">–</span>
                      {formatDate(rental.rentalEndDate)}
                    </td>
                    <td className="px-4 py-3">{rental.quantity}</td>
                    <td className="px-4 py-3 font-medium">
                      {formatAmount(rental.amount)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge
                        label={rental.paymentStatus ? "Paid" : "Unpaid"}
                        styles={paymentStyles}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge
                        label={rental.bookingStatus}
                        styles={bookingStyles}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default EquipmentRentals;
