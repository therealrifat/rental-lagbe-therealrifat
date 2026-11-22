import { dummyAdminEquipments } from "@/data/dummy-admin-equipments";
import type { EquipmentRecord } from "@/types/equipment";

export type FavoriteRecord = {
  _id: string;
  customerId: string;
  equipmentId: string;
  createdAt: string;
  equipment: EquipmentRecord;
};

const favoriteSeeds = [
  {
    _id: "fav-001",
    customerId: "cust-001",
    equipmentId: "admin-eq-001",
    createdAt: "2026-11-18T09:30:00.000Z",
  },
  {
    _id: "fav-002",
    customerId: "cust-001",
    equipmentId: "admin-eq-003",
    createdAt: "2026-11-19T14:15:00.000Z",
  },
  {
    _id: "fav-003",
    customerId: "cust-001",
    equipmentId: "admin-eq-006",
    createdAt: "2026-11-21T11:45:00.000Z",
  },
];

export const dummyFavorites: FavoriteRecord[] = favoriteSeeds.flatMap((seed) => {
  const equipment = dummyAdminEquipments.find(
    (item) => item._id === seed.equipmentId,
  );
  return equipment ? [{ ...seed, equipment }] : [];
});
