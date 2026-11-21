"use client";

import { LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";

const PayButton = ({
  amount,
  bookingId,
}: {
  amount: number;
  bookingId: string;
}) => {
  return (
    <form action="/api/checkout_sessions" method="POST">

       <input
        type="hidden"
        name="bookingId"
        value={bookingId}
      />
      <section>
        <Button
          type="submit"
          role="link"
          data-booking-id={bookingId}
          className="w-full"
        >
          <LockKeyhole className="size-4" />
          Pay ৳{amount.toLocaleString("en-US")}
        </Button>
      </section>
    </form>
  );
};

export default PayButton;


