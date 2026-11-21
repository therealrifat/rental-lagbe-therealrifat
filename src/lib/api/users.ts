const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getMyEquipments = async (ownerId: string) => {
  const res = await fetch(`${BASE_URL}/owner/equipment/${ownerId}`);
  return res.json();
};

export const getEquipment = async (Id: string) => {
  const res = await fetch(`${BASE_URL}/equipment/${Id}`);
  return res.json();
};

export const getUserInfo = async (Id: string) => {
  const res = await fetch(`${BASE_URL}/user/${Id}`);

  return res.json();
};

export const getMyRentals = async (userId: string) => {
  const res = await fetch(`${BASE_URL}/customer/myrental/${userId}`);
  return res.json();
};


export const getAllEquipments = async (query="") => {

  const res = await fetch(`${BASE_URL}/equipment?${query}`);
  return res.json();


};



export const getBookingInfo = async (bookId: string) => {
  const res = await fetch(`${BASE_URL}/booking/${bookId}`);
  return res.json();
};


