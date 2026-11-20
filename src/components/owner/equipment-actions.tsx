"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import type { EquipmentRecord } from "@/types/equipment";
import Link from "next/link";

type EquipmentActionsProps = {
  equipment: EquipmentRecord;
};

const EquipmentActions = ({ equipment }: EquipmentActionsProps) => {
  const handleUpdate = () => {
    // TODO: add update logic here

  

  
  };

  const handleDelete = () => {
    // TODO: add delete logic here

    console.log("delete")

  };

  const handleViewDetails = () => {
    // TODO: add view details logic here
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
      <button
        type="button"
        title={`Delete ${equipment.equipmentName}`}
        aria-label={`Delete ${equipment.equipmentName}`}
        className={buttonVariants({ variant: "destructive", size: "icon-sm" })}
        onClick={handleDelete}
      >
        <Trash2 />
      </button>

       
        
    
       
    <Link href={`/equipment/${equipment._id}`}  className={buttonVariants({ variant: "ghost", size: "icon-sm" })}> <Eye /></Link>

      
    </div>
  );
};

export default EquipmentActions;
