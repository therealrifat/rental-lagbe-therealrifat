import { CircleCheck, Mail } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { paymentVerify } from "@/lib/actions/booking";
import { stripe } from "@/lib/stripe";

type PaymentIntentInfo = {
  id?: string;
  amount?: number;
  amount_received?: number;
  currency?: string;
  created?: number;
};

const formatTransactionDate = (seconds?: number) => {
  if (!seconds) return "—";
  return new Date(seconds * 1000).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatCurrencyAmount = (amount: number, currency: string) => {
  if (!amount) return "—";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  } catch {
    return (amount / 100).toFixed(2);
  }
};

const TransactionRow = ({
  label,
  value,
  strong = false,
  mono = false,
}: {
  label: string;
  value: React.ReactNode;
  strong?: boolean;
  mono?: boolean;
}) => (
  <div className="flex items-start justify-between gap-4 border-b border-border/70 py-2.5 last:border-0 last:pb-0">
    <dt className="shrink-0 text-sm text-muted-foreground">{label}</dt>
    <dd
      className={`max-w-[65%] text-right break-words ${
        strong ? "text-base font-bold" : "text-sm font-medium"
      } ${mono ? "font-mono text-xs" : ""}`}
    >
      {value || "—"}
    </dd>
  </div>
);

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const { status, payment_status, customer_email, metadata, payment_intent, line_items } =
    await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete" && payment_status == "paid") {
    console.log({payment_status, customer_email, metadata, payment_intent});

    const result= await paymentVerify(session_id)

    console.log({result})

    const intent =
      payment_intent && typeof payment_intent === "object"
        ? (payment_intent as PaymentIntentInfo)
        : null;
    const firstItem = line_items?.data?.[0];
    const amountPaid =
      intent?.amount_received ??
      intent?.amount ??
      firstItem?.amount_total ??
      0;
    const currency =
      intent?.currency ?? firstItem?.price?.currency ?? "usd";
    const transactionId = intent?.id ?? session_id;
    const paymentLabel = payment_status
      ? payment_status.charAt(0).toUpperCase() + payment_status.slice(1)
      : "Paid";

    return (
      <main className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6 sm:py-20">
        <section id="success">
          <Card>
            <CardContent className="px-6 py-10 sm:px-10 sm:py-12">
              <div className="flex flex-col items-center text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-emerald-500/10">
                  <CircleCheck className="size-9 text-emerald-600 dark:text-emerald-400" />
                </div>

                <h1 className="mt-5 text-2xl font-bold sm:text-3xl">
                  Payment successful
                </h1>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  Thank you for your payment. Your booking is confirmed and we
                  appreciate your business.
                </p>
              </div>

              <div className="mt-8 rounded-xl border border-border bg-muted/40 p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold">Transaction details</h2>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                    {paymentLabel}
                  </span>
                </div>
                <dl className="text-left">
                  <TransactionRow label="Transaction ID" value={transactionId} mono />
                  <TransactionRow
                    label="Payment Date"
                    value={formatTransactionDate(intent?.created)}
                  />
                  <TransactionRow
                    label="Amount Paid"
                    value={formatCurrencyAmount(amountPaid, currency)}
                    strong
                  />
                  <TransactionRow label="Email" value={customer_email} />
                  {firstItem?.description && (
                    <TransactionRow label="Item" value={firstItem.description} />
                  )}
                </dl>
              </div>

              <div className="mt-4 flex items-start gap-2 rounded-xl border border-border p-4 text-sm">
                <Mail className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <p className="text-muted-foreground">
                  A confirmation email will be sent to{" "}
                  <span className="font-medium text-foreground">
                    {customer_email || "your email address"}
                  </span>
                  . If you have any questions, please email{" "}
                  <a
                    href="mailto:orders@example.com"
                    className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
                  >
                    orders@example.com
                  </a>
                  .
                </p>
              </div>

              <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                <Button
                  render={<Link href="/dashboard/customer/my-rentals" />}
                  className="w-full sm:w-auto"
                >
                  View My Rentals
                </Button>
                <Button
                  render={<Link href="/" />}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    );
  }
}
