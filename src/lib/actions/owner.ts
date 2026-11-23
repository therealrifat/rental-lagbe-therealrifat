'use server'
import { Equipment } from "@/types/equipment";
import { protectedMutation } from "../core/session-server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const addedEquipment = async ( data:Equipment ) => {
  const api =`${BASE_URL}/owner/add-equipment`
  // const res = await fetch(`${BASE_URL}/owner/add-equipment`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });
  const res = await protectedMutation(api, "POST", data)

  return res.json()
};



export const deleteMyEquipment = async(id: string)=>{

  const api = `${BASE_URL}/owner/equipment/${id}`
  const res = await protectedMutation(api, "DELETE")
  return res.json()
}

