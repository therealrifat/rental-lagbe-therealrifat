import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getBookingInfo } from "@/lib/api/users";
import { getUserSessionServer } from "@/lib/core/session-server";

export async function POST(request: Request) {
  const userSession = await getUserSessionServer()

  try {
    const formData = await request.formData();

    const bookingId = formData.get("bookingId");
    if (typeof bookingId !== "string") {
      return NextResponse.json({ error: "Invalid bookingId" }, { status: 400 });
    }

    const result = await getBookingInfo(bookingId);
    const amount = result.amount

    const headersList = await headers();
    const origin = headersList.get("origin");

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "bdt",
            product_data: {
              name: "Rental Booking",
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata:{
        bookingId
      },
      customer_email: userSession?.user.email,
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
      integration_identifier: "rental_lagbe_0001",
    });
    return NextResponse.redirect(session.url as string, 303);
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
