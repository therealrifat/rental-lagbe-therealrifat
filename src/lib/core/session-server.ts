import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getUserSessionServer = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
};

export const requireRole = async (role: string) => {
  const session = await getUserSessionServer();

  if (!session || session.user.role !== role) {
    redirect("/unathorized");
  }
  return session;
};

export const getToken = async () => {
  const session = await getUserSessionServer();
  if (!session || !session.session?.token) {
    redirect("/unathorized");
  }
  return session.session.token;
};

export const authFetch = async (api: string) => {
  const token = await getToken();
  const res = await fetch(api, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const protectedMutation = async (
  api: string,
  method: string,
  data?: unknown,
) => {
  const token = await getToken();
  const res = await fetch(api, {
    method: method,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: data ? JSON.stringify(data) : null,
  });

  return res;
};
