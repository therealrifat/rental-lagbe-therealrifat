import { BookingDocument } from "@/types/equipment";




const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const addBookingInfo = async ( bookingData:BookingDocument ) => {
  const res = await fetch(`${BASE_URL}/customers/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });

  return res.json()
};



export const paymentVerify = async (sessionId: string)=>{
  const res =await fetch(`${BASE_URL}/payment/checkout-verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({sessionId}),

  })
  return res.json()
}