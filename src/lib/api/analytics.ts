// import {
//   dummyAdminAnalytics,
//   type AdminAnalyticsSnapshot,
// } from "@/data/dummy-admin-analytics";
// import {
//   dummyOwnerAnalytics,
//   type OwnerAnalyticsSnapshot,
// } from "@/data/dummy-owner-analytics";
import { authFetch, getUserSessionServer } from "../core/session-server";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;



export const getAdminAnalytics = async () => {
  const userSession = await getUserSessionServer();
  const adminId = userSession?.user.id;
  const api = `${BASE_URL}/admin/analytics/${adminId}`;
  console.log(api)

 const res  = await authFetch(api);
 const data = res.json()
 return data
  // return dummyAdminAnalytics;
};

export const getOwnerAnalytics = async () => {
  const userSession = await getUserSessionServer();
  const ownerId = userSession?.user.id;

  const api = `${BASE_URL}/owner/analytics/${ownerId}`;

  const res = await authFetch(api);
  const data = await res.json();

  return data;

  // return dummyOwnerAnalytics;
};
