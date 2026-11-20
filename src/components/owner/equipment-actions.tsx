"use client";

import { Eye, Pencil } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import type { EquipmentRecord } from "@/types/equipment";
import Link from "next/link";

import DeleteEquipment from "./delete-equipment";

type EquipmentActionsProps = {
  equipment: EquipmentRecord;
};

const EquipmentActions = ({ equipment }: EquipmentActionsProps) => {


  const handleUpdate = () => {
    // TODO: add update logic here
  };



  return (
    <div className="flex items-center gap-1" data-equipment-id={equipment._id}>
      <button
        type="button"
        title={`Update ${equipment.equipmentName}`}
        aria-label={`Update ${equipment.equipmentName}`}
        className={buttonVariants({ variant: "outline", size: "icon-sm" })}
        onClick={handleUpdate}
      >
        <Pencil />
      </button>

      
     <DeleteEquipment equipment={equipment} />



      <Link
        href={`/equipment/${equipment._id}`}
        className={buttonVariants({ variant: "ghost", size: "icon-sm" })}
      >
        {" "}
        <Eye />
      </Link>
    </div>
  );
};

export default EquipmentActions;
