
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const UpdateProfielInfo = async (id: string, { ...updateInfo }) => {
  const respose = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateInfo),
  });

  return respose.json();
};

