const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const deleteAdminEquipment = async(id:string)=>{
  const res = await fetch(`${BASE_URL}/admin/equipment/${id}`, {
    method: "DELETE"

  })
  return res.json()

}

export const adminStatusEquipment = async (updateStatus: { id: string; status: string }) => {
  const res = await fetch(`${BASE_URL}/admin/equipment/${updateStatus.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: updateStatus.status }),

  })
  return res.json()

}


