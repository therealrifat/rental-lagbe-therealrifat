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
  price: string; 
  description: string;
  quantity: string;
  terms: string;
  modelName: string;
  image?: Record<string, unknown>;
  category?:  string;
  rentaltype?:  string;
  equipmentCondition?:  string;
  ownerId: string;
  status: Status;
}

export type EquipmentRecord = Equipment & { _id: string };