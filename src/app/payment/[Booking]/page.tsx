import { CreditCard, ShieldCheck } from "lucide-react";

import PayButton from "@/components/payment/pay-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBookingInfo } from "@/lib/api/users";

const paymentStatusStyles: Record<string, string> = {
  Paid: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Unpaid: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
};

const bookingStatusStyles: Record<string, string> = {
  Pending: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  Approved: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Rejected: "bg-destructive/10 text-destructive",
};

type BookingInfo = {
  equipmentName?: string;
  rentalStartDate?: string;
  rentalEndDate?: string;
  quantity?: string;
  bookingDate?: string;
  customerName?: string;
  amount?: number;
  paymentStatus?: boolean;
  bookingStatus?: string;
};

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

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-start justify-between gap-4 border-b border-border/70 py-2.5 last:border-0 last:pb-0">
    <dt className="text-sm text-muted-foreground">{label}</dt>
    <dd className="max-w-[60%] text-right text-sm font-medium break-words">
      {value || "—"}
    </dd>
  </div>
);

const StatusBadge = ({
  label,
  styles,
}: {
  label: string;
  styles: string;
}) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${styles}`}>
    {label}
  </span>
);

const PaymentPage = async ({
  params, searchParams
}: {
  params: Promise<{ Booking: string }>;
  searchParams: Promise<{ canceled: string }>;

}) => {
  const { Booking } = await params;
  const result = await getBookingInfo(Booking).catch(() => null);
  const booking = ((Array.isArray(result) ? result[0] : result) ?? {}) as BookingInfo;
  const amount = Number(booking.amount) || 0;
  const paymentStatus = booking.paymentStatus ? "Paid" : "Unpaid";
  const bookingStatus = booking.bookingStatus || "Pending";


  const { canceled } = await searchParams

  if (canceled) {
    console.log(
      'Order canceled -- continue to shop around and check out when you\'re ready.'
    )
  }
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <header className="mb-6 space-y-1 sm:mb-8">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Secure checkout
        </p>
        <h1 className="text-2xl font-bold sm:text-3xl">Complete your payment</h1>
        <p className="text-sm text-muted-foreground">
          Review your booking details before continuing to payment.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Card>
          <CardHeader className="border-b pb-4">
            <CardTitle>Booking summary</CardTitle>
            <CardDescription>Booking ID: {Booking}</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <dl>
              <DetailRow label="Equipment" value={booking.equipmentName} />
              <DetailRow
                label="Rental Start Date"
                value={formatDate(booking.rentalStartDate)}
              />
              <DetailRow
                label="Rental End Date"
                value={formatDate(booking.rentalEndDate)}
              />
              <DetailRow label="Quantity" value={booking.quantity} />
              <DetailRow label="Booking Date" value={formatDate(booking.bookingDate)} />
              <DetailRow label="Customer" value={booking.customerName} />
              <div className="flex items-start justify-between gap-4 border-b border-border/70 py-2.5 last:border-0 last:pb-0">
                <dt className="text-sm text-muted-foreground">Payment Status</dt>
                <dd className="text-right text-sm font-medium">
                  <StatusBadge
                    label={paymentStatus}
                    styles={paymentStatusStyles[paymentStatus]}
                  />
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4 py-2.5">
                <dt className="text-sm text-muted-foreground">Booking Status</dt>
                <dd className="text-right text-sm font-medium">
                  <StatusBadge
                    label={bookingStatus}
                    styles={
                      bookingStatusStyles[bookingStatus] ??
                      "bg-muted text-muted-foreground"
                    }
                  />
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b pb-4">
              <CardTitle>Payment method</CardTitle>
              <CardDescription>
                You&apos;ll be redirected to Stripe to finish securely.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-3">
                <CreditCard className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Pay with card</p>
                  <p className="text-xs text-muted-foreground">
                    Visa, Mastercard, and other major cards are accepted. No card
                    details are collected on this page.
                  </p>
                </div>
              </div>
              <p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="mt-0.5 size-4 shrink-0" />
                Payments are processed securely by Stripe.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b pb-4">
              <CardTitle>Payment details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Rental amount</span>
                <span className="font-medium">৳{amount.toLocaleString("en-US")}</span>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-4">
                <span className="font-semibold">Total due</span>
                <span className="text-xl font-bold">
                  ৳{amount.toLocaleString("en-US")}
                </span>
              </div>

              <PayButton amount={amount} bookingId={Booking} />

              <p className="text-center text-xs text-muted-foreground">
                By continuing, you agree to complete this payment through Stripe.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default PaymentPage;
