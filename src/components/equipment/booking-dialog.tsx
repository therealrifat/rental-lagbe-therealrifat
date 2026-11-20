"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

type BookingDialogProps = {
  equipmentName: string;
  price: string;
  rentaltype?: string;
};

const rentalTypeLabels: Record<string, string> = {
  daily: "Daily",
  week: "Weekly",
  weekly: "Weekly",
  month: "Monthly",
  monthly: "Monthly",
};

const BookingDialog = ({
  equipmentName,
  price,
  rentaltype,
}: BookingDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button size="lg" className="w-full sm:w-auto" />}
      >
        Book Now
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Equipment</DialogTitle>
          <DialogDescription>
            Request {equipmentName || "this equipment"} for your rental period.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            setOpen(false);
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="rental-start">Rental Start Date *</FieldLabel>
              <Input
                id="rental-start"
                name="rentalStartDate"
                type="date"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="rental-end">Rental End Date *</FieldLabel>
              <Input
                id="rental-end"
                name="rentalEndDate"
                type="date"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="booking-quantity">
                Required Quantity *
              </FieldLabel>
              <Input
                id="booking-quantity"
                name="quantity"
                type="number"
                min={1}
                defaultValue={1}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="contact-number">Contact Number *</FieldLabel>
              <Input
                id="contact-number"
                name="contactNumber"
                type="tel"
                placeholder="e.g. 01712345678"
                required
              />
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="delivery-address">
              Delivery Address *
            </FieldLabel>
            <Input
              id="delivery-address"
              name="deliveryAddress"
              type="text"
              placeholder="e.g. Dhaka, Bangladesh"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="booking-notes">Additional Notes</FieldLabel>
            <Textarea
              id="booking-notes"
              name="notes"
              placeholder="Anything the owner should know..."
            />
          </Field>

          <div className="rounded-lg border border-border bg-muted/40 p-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Rental price</span>
              <span className="font-medium">{price || "—"}</span>
            </div>
            <div className="mt-1 flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Rental type</span>
              <span className="font-medium">
                {rentaltype ? (rentalTypeLabels[rentaltype] ?? rentaltype) : "—"}
              </span>
            </div>

            <Separator className="my-3" />

            <div className="flex items-center justify-between gap-4">
              <span className="font-medium">Total amount</span>
              <span className="font-medium">Calculated on confirmation</span>
            </div>
            <FieldDescription className="mt-2">
              Availability is checked before payment. Payment is the next step.
            </FieldDescription>
          </div>

          <DialogFooter>
            <DialogClose render={<Button variant="outline" type="button" />}>
              Cancel
            </DialogClose>
            <Button type="submit">Confirm Booking</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
