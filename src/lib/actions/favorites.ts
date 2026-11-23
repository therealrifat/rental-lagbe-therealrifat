

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// TODO: replace each function body with your API call.

export const getFavorites = async (customerId: string) => {

  const res =await fetch(`${BASE_URL}/customers/favorites/${customerId}`)
  const data =await res.json()
  console.log(data)
  return data
};

// export const isFavorite = async (
//   customerId: string,
//   equipmentId: string,
// ): Promise<boolean> => {
//   void customerId;
//   return
// };

export const addFavorite = async (customerId: string, equipmentId: string) => {
  const response = await fetch(`${BASE_URL}/customers/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerId, equipmentId }),
  });

  return response.json();
};

export const removeFavorite = async (
  customerId: string,
  equipmentId: string,
): Promise<void> => {
  void customerId;
  void equipmentId;
};
