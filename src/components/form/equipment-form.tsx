"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
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
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";
import ImageUpload from "../profile/image-upload";
import { useRouter } from "next/navigation";

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
  const router = useRouter()
  const [isLoading, setLoading] = useState(false);
  const [category, setCategory] = useState<string | null>(
    "construction-equipment",
  );
  const [rental, setRental] = useState<string | null>("daily");
  const [condition, setCondition] = useState<string | null>("brand-new");

  const { data: session } = authClient.useSession();
  const userInfo = session?.user as User | undefined;

  const handleEquipmentForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { price, quantity, ...others } = userData;

    const equipment = {
      ...others,
      quantity: Number(quantity),
      price: Number(price),
      category: category,
      rentaltype: rental ?? "",
      equipmentCondition: condition,
      ownerId: userInfo?.id,
      status: "Pending",
    } as Equipment;

    const result = await addedEquipment(equipment);




    if (!result.insertedId) {
      toast.add({
        description: "Somthing Went Wrong",
      });

      setLoading(false);
      return;
    }

    if (result.insertedId) {
      toast.add({
        description: "Add Equipment Sucessfull",
      });

      setLoading(false);
      router.push('/dashboard/owner/equipment')
      return;
    }
  };

  return (
    <form onSubmit={handleEquipmentForm} className="w-full">
      <Card className="w-full">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-lg">Equipment details</CardTitle>
          <CardDescription>
            Provide accurate specs and rental rates to get listed faster.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <FieldSet className="gap-4">
            <FieldLegend variant="label" className="text-sm font-medium">
              Basic information
            </FieldLegend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="name">Equipment Name *</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="e.g. Excavator"
                  name="equipmentName"
                  required
                />
              </Field>

              <Field>
                <FieldLabel>Category</FieldLabel>
                <Select
                  items={items}
                  value={category}
                  onValueChange={(value) => setCategory(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
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
                  placeholder="e.g. Dhaka"
                  name="location"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="brandName">Brand Name *</FieldLabel>
                <Input
                  id="brandName"
                  type="text"
                  placeholder="e.g. Caterpillar"
                  name="brandName"
                  required
                />
              </Field>
            </div>
          </FieldSet>

          <FieldSet className="gap-4 mt-6">
            <FieldLegend variant="label" className="text-sm font-medium">
              Rental &amp; pricing
            </FieldLegend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="price">Rental Price *</FieldLabel>
                <Input
                  id="price"
                  type="number"
                  placeholder="e.g. 500"
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
                  <SelectTrigger className="w-full">
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
                <FieldLabel htmlFor="quantity">Available Quantity *</FieldLabel>
                <Input
                  id="quantity"
                  type="text"
                  placeholder="e.g. 2"
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
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Equipment Condition</SelectLabel>
                      {conditionItems.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="terms">
                  Rental Terms and Conditions *
                </FieldLabel>
                <Input
                  id="terms"
                  type="text"
                  placeholder="e.g. Minimum 3 days, deposit required"
                  name="terms"
                  required
                />
              </Field>
            </div>
          </FieldSet>

          <FieldSet className="gap-4 mt-6">
            <FieldLegend variant="label" className="text-sm font-medium">
              Listing details
            </FieldLegend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="textarea-message">Description</FieldLabel>
                <FieldDescription>
                  Describe the equipment, its specs, and anything renters should
                  know.
                </FieldDescription>
                <Textarea
                  id="textarea-message"
                  name="description"
                  placeholder="e.g. Well-maintained excavator, 2022 model, with operator..."
                />
              </Field>

              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="image">Equipment Image</FieldLabel>

                <ImageUpload name="image" image="" required />
              </Field>
            </div>
          </FieldSet>
        </CardContent>

        <CardFooter className="justify-end">
          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner /> Adding Equipment...
              </>
            ) : (
              "Add Equipment"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default EquipmentForm;
