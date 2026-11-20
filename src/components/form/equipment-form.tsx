"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { User } from "@/types/User";
import { authClient } from "@/lib/auth-client";
import { addedEquipment } from "@/lib/actions/owner";
import { Equipment } from "@/types/equipment";

const items = [
 
  { label: "Construction Equipment", value: "construction-equipment" },
  { label: "Photography Equipment", value: "photography-equipment" },
  { label: "Vehicles & Transportation", value: "vehicles-transportation" },
  { label: "Agriculture Equipment", value: "agriculture-equipment" },
  { label: "Electronics", value: "electronics" },
  { label: "Event Equipment", value: "event-equipment" },
  { label: "Cleaning Equipment", value: "cleaning-equipment" },
  { label: "Material Handling", value: "material-handling" },
  { label: "Power Equipment", value: "power-equipment" },
];
const rentalType = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "week" },
  { label: "Monthly", value: "month" },
];

const conditionItems = [
  { label: "Brand New", value: "brand-new" },
  { label: "Excellent", value: "excellent" },
  { label: "Good", value: "good" },
  { label: "Fair", value: "fair" },
];

const EquipmentForm = () => {
  const [category, setCategory] = useState<string | null>("construction-equipment");
  const [rental, setRental] = useState<string | null>("daily");
  const [condition, setCondition] = useState<string | null>("brand-new");
 

  const { data: session } = authClient.useSession();
    const userInfo = session?.user as User | undefined;


  const handleEquipmentForm = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const equipment = {
      ...userData,
      category: category,
      rentaltype: rental??"",
      equipmentCondition:condition,
      ownerId: userInfo?.id,
      status: "Pending" 

    } as Equipment;


    const result = await addedEquipment(equipment)
console.log(result)


    
  };

  return (
    <form onSubmit={handleEquipmentForm}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">List New Machinery or Gear</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Provide accurate specs, images, and rental rates to get verified and
            rented faster.
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Equipment Name *</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            name="equipmentName"
            required
          />
        </Field>
        <Field>
          <FieldLabel>Categroy</FieldLabel>
          <Select
            items={items}
            value={category}
            onValueChange={(value) => setCategory(value)}
          >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category </SelectLabel>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="location">Location *</FieldLabel>
          <Input
            id="location"
            type="text"
            placeholder="John Doe"
            name="location"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="brandName">Brand Name *</FieldLabel>
          <Input
            id="brandName"
            type="text"
            placeholder="100"
            name="brandName"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="price">Rental Price *</FieldLabel>
          <Input
            id="price"
            type="number"
            placeholder="100"
            name="price"
            required
          />
        </Field>

        <Field>
          <FieldLabel>Rental Type</FieldLabel>
          <Select
            items={rentalType}
            value={rental}
            defaultValue={rental}
            onValueChange={(value) => setRental(value)}
          >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Rental Type</SelectLabel>
                {rentalType.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="textarea-message">Description</FieldLabel>
          <FieldDescription>Enter your message below.</FieldDescription>
          <Textarea
            id="textarea-message"
            name="description"
            placeholder="Type your message here."
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="quantity">Available Quantity *</FieldLabel>
          <Input
            id="quantity"
            type="text"
            placeholder="100"
            name="quantity"
            required
          />
        </Field>

        <Field>
          <FieldLabel>Equipment Condition</FieldLabel>
          <Select
            items={conditionItems}
            value={condition}
      
            onValueChange={(value) => setCondition(value)}
          >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category </SelectLabel>
                {conditionItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="terms">Rental Terms and Conditions *</FieldLabel>
          <Input
            id="terms"
            type="text"
            placeholder="100"
            name="terms"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="modelName">Model *</FieldLabel>
          <Input
            id="modelName"
            type="text"
            placeholder="Model"
            name="modelName"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="image">Image *</FieldLabel>
          <Input
            id="image"
            type="file"
            placeholder="100"
            name="image"
            required
          />
        </Field>

        <Field>
          <Button type="submit">Add Equipment</Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default EquipmentForm;
