import {
  dummyAdminAnalytics,
  type AdminAnalyticsSnapshot,
} from "@/data/dummy-admin-analytics";
import {
  dummyOwnerAnalytics,
  type OwnerAnalyticsSnapshot,
} from "@/data/dummy-owner-analytics";
import { authFetch, getUserSessionServer } from "../core/session-server";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const userSession = await getUserSessionServer();

export const getAdminAnalytics = async (): Promise<AdminAnalyticsSnapshot> => {
  const adminId = userSession?.user.id;
  const api = `${BASE_URL}/admin/analytics/${adminId}`;
  console.log(api)

 const res  = await authFetch(api);
 const data = res.json()
 return data
  // return dummyAdminAnalytics;
};

export const getOwnerAnalytics = async (): Promise<OwnerAnalyticsSnapshot> => {
  const ownerId = userSession?.user.id;

  const api = `${BASE_URL}/owner/analytics/${ownerId}`;

  const res = await authFetch(api);
  const data = await res.json();

  return data;

  // return dummyOwnerAnalytics;
};
