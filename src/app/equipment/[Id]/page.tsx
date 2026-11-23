import { notFound } from "next/navigation";
import EquipmentDetails from "@/components/equipment/equipment-details";
import { getEquipment } from "@/lib/api/users";
import type { EquipmentRecord } from "@/types/equipment";

const EquipmentDetailsPage = async ({
  params,
}: {
  params: Promise<{ Id: string }>;
}) => {
  const { Id } = await params;

  const result = await getEquipment(Id);
  const item = {
    ...((Array.isArray(result) ? result[0] : result) ?? {}),
  } as EquipmentRecord;

 if (!item) {
    notFound();
  }

  return <EquipmentDetails item={item} />;
};

export default EquipmentDetailsPage;
