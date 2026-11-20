import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
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
const items = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
];

const EquipmentForm = () => {
  return (
    <form>
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
          <Select items={items}>
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
          <Button type="submit">Add Equipment</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
      </FieldGroup>
    </form>
  );
};

export default EquipmentForm;
