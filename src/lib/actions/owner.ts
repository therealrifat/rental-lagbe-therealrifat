
import { Equipment } from "@/types/equipment";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const addedEquipment = async ( data:Equipment ) => {
  const res = await fetch(`${BASE_URL}/owner/add-equipment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json()
};



