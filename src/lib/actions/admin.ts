const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const deleteAdminEquipment = async(id:string)=>{
  const res = await fetch(`${BASE_URL}/admin/equipment/${id}`, {
    method: "DELETE"
    
  })
  return res.json()

}