const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const addBookingInfo = async ( bookingData ) => {
  const res = await fetch(`${BASE_URL}/customers/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });

  return res.json()
};
