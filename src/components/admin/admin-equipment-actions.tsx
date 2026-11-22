"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { EquipmentRecord, Status } from "@/types/equipment";
import { deleteAdminEquipment } from "@/lib/actions/admin";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";


type AdminEquipmentActionsProps = {
  equipment: EquipmentRecord;
  onStatusChange?: (equipment: EquipmentRecord, status: Status) => void;
  onUpdate?: (equipment: EquipmentRecord) => void;
  onDelete?: (equipment: EquipmentRecord) => void;
};

const statusOptions: { label: string; value: Status }[] = [
  { label: "Pending", value: "Pending" },
  { label: "Approve", value: "Approved" },
  { label: "Reject", value: "Rejected" },
];

const isStatus = (value: string | null): value is Status =>
  value === "Pending" || value === "Approved" || value === "Rejected";

const AdminEquipmentActions = ({
  equipment,
  onStatusChange,
  onUpdate,
  onDelete,
}: AdminEquipmentActionsProps) => {
  const [status, setStatus] = useState<Status>(equipment.status);
 const router = useRouter()
  const handleStatusChange = (value: string | null) => {
    if (!isStatus(value)) return;

    setStatus(value);
    // TODO: add your database/route logic here, then call onStatusChange.
    
    onStatusChange?.(equipment, value);
  };

  const handleUpdate = () => {
    // TODO: add your update logic here.

    onUpdate?.(equipment);
  };

  const handleDelete = async() => {
    // TODO: add your delete logic here.
    
    const result = await deleteAdminEquipment(equipment._id)

    if(result.deletedCount > 0){
      toast.add({description: "Equipment Delete "})
      router.refresh()
    }


    onDelete?.(equipment);
  };

  return (
    <div
      className="flex flex-wrap items-center gap-2"
      data-equipment-id={equipment._id}
    >
      <div className="w-32">
        <Select
          items={statusOptions}
          value={status}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger
            className="w-full"
            aria-label={`Change status for ${equipment.equipmentName}`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={handleUpdate}
        aria-label={`Update ${equipment.equipmentName}`}
        title={`Update ${equipment.equipmentName}`}
      >
        <Pencil className="size-5" />
      </Button>

      <Button
        type="button"
        size="icon"
        variant="destructive"
        onClick={handleDelete}
        aria-label={`Delete ${equipment.equipmentName}`}
        title={`Delete ${equipment.equipmentName}`}
      >
        <Trash2 className="size-5" />
      </Button>
    </div>
  );
};

export default AdminEquipmentActions;
