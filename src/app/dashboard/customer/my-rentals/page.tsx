import { getMyRentals } from "@/lib/api/users";
import { getUserSessionServer } from "@/lib/core/session-server";
import { RentalRecord } from "@/types/equipment";




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

const EmptyState = () => (
  <div className="rounded-xl border border-border bg-card px-4 py-12 text-center text-sm text-muted-foreground">
    No rentals yet.
  </div>
);

const MyRentals = async() => {
    const userinfo = await getUserSessionServer()
 const userId = userinfo?.user.id
const myRentals = await getMyRentals(userId as string)
console.log(myRentals)
 
  const rentals = myRentals;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mb-5 space-y-1 sm:mb-6">
        <h1 className="text-xl font-bold sm:text-2xl">My Rentals</h1>
        <p className="text-xs text-muted-foreground sm:text-sm">
          A record of all the equipment you have booked.
        </p>
      </div>

      {rentals.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Mobile & tablet: one card per booking */}
          <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
            {rentals.map((rental:RentalRecord) => (
              <article
                key={rental._id}
                className="rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:bg-muted/40 sm:p-5"
              >
                <div className="mb-4 flex flex-wrap items-start justify-between gap-2 border-b border-border pb-3">
                  <h2 className="text-sm font-semibold sm:text-base">
                    {rental.equipmentName}
                  </h2>
                  <StatusBadge label={rental.bookingStatus} styles={bookingStyles} />
                </div>

                <dl className="grid grid-cols-1 gap-x-4 gap-y-3 text-xs min-[400px]:grid-cols-2 sm:text-sm">
                  <div>
                    <dt className="text-muted-foreground">Rental Start Date</dt>
                    <dd className="mt-0.5 font-medium">
                      {formatDate(rental.rentalStartDate)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Rental End Date</dt>
                    <dd className="mt-0.5 font-medium">
                      {formatDate(rental.rentalEndDate)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Booking Date</dt>
                    <dd className="mt-0.5 font-medium">
                      {formatDate(rental.bookingDate)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Total Amount</dt>
                    <dd className="mt-0.5 font-semibold">
                      {formatAmount(rental.amount)}
                    </dd>
                  </div>
                  <div className="min-[400px]:col-span-2">
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

          {/* Desktop: full table */}
          <div className="hidden overflow-hidden rounded-xl border border-border bg-card lg:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Equipment Name</th>
                  <th className="px-4 py-3 font-medium">Rental Start Date</th>
                  <th className="px-4 py-3 font-medium">Rental End Date</th>
                  <th className="px-4 py-3 font-medium">Booking Date</th>
                  <th className="px-4 py-3 font-medium">Total Amount</th>
                  <th className="px-4 py-3 font-medium">Payment Status</th>
                  <th className="px-4 py-3 font-medium">Booking Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rentals.map((rental:RentalRecord) => (
                  <tr
                    key={rental._id}
                    className="transition-colors hover:bg-muted/40"
                  >
                    <td className="px-4 py-3 font-medium">
                      {rental.equipmentName}
                    </td>
                    <td className="px-4 py-3">
                      {formatDate(rental.rentalStartDate)}
                    </td>
                    <td className="px-4 py-3">
                      {formatDate(rental.rentalEndDate)}
                    </td>
                    <td className="px-4 py-3">
                      {formatDate(rental.bookingDate)}
                    </td>
                    <td className="px-4 py-3">{formatAmount(rental.amount)}</td>
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

export default MyRentals;
