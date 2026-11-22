import {
  dummyFavorites,
  type FavoriteRecord,
} from "@/data/dummy-favorites";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// TODO: replace each function body with your API call.

export const getFavorites = async (
  customerId: string,
): Promise<FavoriteRecord[]> => {
  void customerId;
  return dummyFavorites;
};

export const isFavorite = async (
  customerId: string,
  equipmentId: string,
): Promise<boolean> => {
  void customerId;
  return dummyFavorites.some((item) => item.equipmentId === equipmentId);
};

export const addFavorite = async (
  customerId: string,
  equipmentId: string,
): Promise<void> => {
  const response = await fetch(`${BASE_URL}/customers/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerId, equipmentId }),
  });

  if (!response.ok) {
    throw new Error(`Failed to add favorite: ${response.status}`);
  }
};

export const removeFavorite = async (
  customerId: string,
  equipmentId: string,
): Promise<void> => {
  void customerId;
  void equipmentId;
};
