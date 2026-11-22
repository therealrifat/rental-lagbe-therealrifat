"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AdminRentalRecord } from "@/data/dummy-admin-rentals";
import type { Status } from "@/types/equipment";
import { adminStatusBooking } from "@/lib/actions/admin";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";

type AdminRentalActionsProps = {
  rental: AdminRentalRecord;
  onBookingStatusChange?: (rental: AdminRentalRecord, status: Status) => void;
};

const statusOptions: { label: string; value: Status }[] = [
  { label: "Pending", value: "Pending" },
  { label: "Approve", value: "Approved" },
  { label: "Reject", value: "Rejected" },
];

const isStatus = (value: string | null): value is Status =>
  value === "Pending" || value === "Approved" || value === "Rejected";

const AdminRentalActions = ({
  rental,
  onBookingStatusChange,
}: AdminRentalActionsProps) => {
  const [bookingStatus, setBookingStatus] = useState<Status>(
    rental.bookingStatus,
  );
  const router = useRouter();
  const handleBookingStatusChange = async (value: string | null) => {
    if (!isStatus(value)) return;

    setBookingStatus(value);
    // TODO: add your database/route logic here, then call onBookingStatusChange.

    const body = { id: rental._id, status: value };
    const result = await adminStatusBooking(body);
    if (result.modifiedCount > 0) {
      toast.add({ description: "Status Update Successfull" });
      router.refresh();
    }
    console.log(result);
    onBookingStatusChange?.(rental, value);
  };

  return (
    <div className="w-32">
      <Select
        items={statusOptions}
        value={bookingStatus}
        onValueChange={handleBookingStatusChange}
      >
        <SelectTrigger
          className="w-full"
          aria-label={`Change booking status for ${rental.customerName}`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Booking Status</SelectLabel>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AdminRentalActions;
