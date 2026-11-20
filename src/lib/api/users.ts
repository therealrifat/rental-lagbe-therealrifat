
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getMyEquipments = async(ownerId: string)=>{
  const res = await fetch(`${BASE_URL}/owner/equipment/${ownerId}`)
  return res.json()
  
}


export const getEquipment = async(Id:string)=>{
  const res = await fetch(`${BASE_URL}/equipment/${Id}`)
  return res.json()
}