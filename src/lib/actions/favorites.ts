'use server'
import { authFetch, protectedMutation } from "../core/session-server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const getFavorites = async (customerId: string) => {
  const api =`${BASE_URL}/customers/favorites/${customerId}`
  const res = await authFetch(api)
  
  const data = await res.json();

  return data;
};


export const addFavorite = async (customerId: string, equipmentId: string) => {

  const api = `${BASE_URL}/customers/favorites`
 const data = { customerId, equipmentId }
  const response = await protectedMutation(api, "POST", data)

 

  return response.json();
};

export const removeFavorite = async (customerId: string, _id: string) => {
 
  const api = `${BASE_URL}/customers/favorites`
  const data ={ customerId, _id }
  const response = await protectedMutation(api, "DELETE" , data)

  return response.json()
};
