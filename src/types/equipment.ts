export type Status = "Pending" | "Approved" | "Rejected";

export type Category =
  | "construction-equipment"
  | "photography-equipment"
  | "vehicles-transportation"
  | "agriculture-equipment"
  | "electronics"
  | "event-equipment"
  | "cleaning-equipment"
  | "material-handling"
  | "power-equipment";

export type RentalType = "daily" | "week" | "month" | "weekly" | "monthly";

export type EquipmentCondition = "brand-new" | "excellent" | "good" | "fair";

export interface Equipment {
  equipmentName: string;
  location: string;
  brandName: string;
  price: number; 
  description: string;
  quantity: number;
  terms: string;
  modelName: string;
  image?: Record<string, unknown>;
  category?:  string;
  rentaltype?:  string;
  equipmentCondition?:  string;
  ownerId: string;
  status: Status;
}


export type BookingDocument = {
  rentalStartDate: string;
  rentalEndDate: string;
  quantity: string;
  contactNumber: string;
  deliveryAddress: string;
  notes: string;
  amount: number;
  customerId: string;
  customerName: string;
  equipmentId: string;
  bookingDate: string;
  paymentStatus: boolean;
  bookingStatus: "Pending" | "Approved" | "Rejected";
  equipmentName: string;
  ownerId: string
};


export type RentalRecord = {
  _id: string;
  equipmentName: string;
  rentalStartDate: string;
  rentalEndDate: string;
  bookingDate: string;
  amount: number;
  paymentStatus: boolean;
  bookingStatus: "Pending" | "Approved" | "Rejected";
};
export type EquipmentRecord = Equipment & { _id: string };