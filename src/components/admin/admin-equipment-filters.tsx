"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusOptions = [
  { label: "All Statuses", value: "all" },
  { label: "Pending", value: "Pending" },
  { label: "Approved", value: "Approved" },
  { label: "Rejected", value: "Rejected" },
];

type AdminEquipmentFiltersProps = {
  status: string;
  onStatusChange: (status: string) => void;
};

const AdminEquipmentFilters = ({
  status,
  onStatusChange,
}: AdminEquipmentFiltersProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold">Equipment list</h2>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Review and manage all submitted equipment.
        </p>
      </div>

      <div className="w-full space-y-1.5 sm:w-52">
        <span className="block text-xs font-medium text-muted-foreground">
          Filter by status
        </span>
        <Select
          items={statusOptions}
          value={status}
          onValueChange={(value) => onStatusChange(String(value))}
        >
          <SelectTrigger className="w-full">
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
    </div>
  );
};

export default AdminEquipmentFilters;
