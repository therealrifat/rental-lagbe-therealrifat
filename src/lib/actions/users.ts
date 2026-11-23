'use server'
import { protectedMutation } from "../core/session-server";



const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const UpdateProfielInfo = async (id: string, { ...updateInfo }) => {
  const api = `${BASE_URL}/users/${id}`;

  const respose = await protectedMutation(api, "PATCH", updateInfo);
  // const respose = await fetch(`${BASE_URL}/users/${id}`, {
  //   method: "PATCH",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(updateInfo),
  // });

  return respose.json();
};

export const UpdateUserRole = async (userInfo: {
  userId: string;
  role: string;
}) => {
  const respose = await fetch(`${BASE_URL}/users/role/${userInfo.userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userInfo),
  });

  return respose.json();
};
