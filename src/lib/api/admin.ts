import { dummyAdminEquipments } from "@/data/dummy-admin-equipments";
import type { EquipmentRecord } from "@/types/equipment";

// Replace the body with a database/API request when the endpoint is ready.
// The rest of the admin UI consumes this function only, so no other files need to change.
export const getAdminEquipments = async (): Promise<EquipmentRecord[]> => {
  return dummyAdminEquipments;
};


