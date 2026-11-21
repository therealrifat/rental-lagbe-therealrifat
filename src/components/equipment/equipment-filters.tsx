"use client";

import { Search, SlidersHorizontal } from "lucide-react";

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

type FilterOption = { label: string; value: string };

const searchByOptions: FilterOption[] = [
  { label: "Equipment Name", value: "name" },
  { label: "Location", value: "location" },
];

const sortOptions: FilterOption[] = [
  { label: "Recently Added", value: "recent" },
  { label: "Price Low to High", value: "price-asc" },
  { label: "Price High to Low", value: "price-desc" },
];

const categoryOptions: FilterOption[] = [
  { label: "All Categories", value: "all" },
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

const rentalTypeOptions: FilterOption[] = [
  { label: "All Rental Types", value: "all" },
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "week" },
  { label: "Monthly", value: "month" },
];

const availabilityOptions: FilterOption[] = [
  { label: "All Availability", value: "all" },
  { label: "Available", value: "available" },
  { label: "Out of stock", value: "out-of-stock" },
];

const FilterSelect = ({
  label,
  options,
  defaultValue,
  className,
}: {
  label: string;
  options: FilterOption[];
  defaultValue: string;
  className?: string;
}) => (
  <div className={`space-y-1.5 ${className ?? ""}`}>
    <span className="block text-xs font-medium text-muted-foreground">
      {label}
    </span>
    <Select items={options} defaultValue={defaultValue}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
);

const EquipmentFilters = () => {
  return (
    <section className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <SlidersHorizontal className="size-4 text-muted-foreground" />
        <h2 className="text-sm font-semibold">Search &amp; Filters</h2>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="min-w-0 flex-1 space-y-1.5">
          <label htmlFor="equipment-search" className="block text-xs font-medium text-muted-foreground">
            Search
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="equipment-search"
              type="search"
              placeholder="Search equipment..."
              className="pl-9"
            />
          </div>
        </div>

        <FilterSelect
          label="Search by"
          options={searchByOptions}
          defaultValue="name"
          className="w-full sm:w-44"
        />

        <FilterSelect
          label="Sort by"
          options={sortOptions}
          defaultValue="recent"
          className="w-full sm:w-52"
        />
      </div>

      <div className="mt-5 grid gap-4 border-t border-border pt-5 sm:grid-cols-2 lg:grid-cols-4">
        <FilterSelect
          label="Equipment Category"
          options={categoryOptions}
          defaultValue="all"
        />
        <FilterSelect
          label="Rental Type"
          options={rentalTypeOptions}
          defaultValue="all"
        />

        <div className="space-y-1.5">
          <span className="block text-xs font-medium text-muted-foreground">
            Price Range
          </span>
          <div className="flex items-center gap-2">
            <Input type="number" min="0" placeholder="Min" aria-label="Minimum price" className="min-w-0" />
            <span className="text-muted-foreground">–</span>
            <Input type="number" min="0" placeholder="Max" aria-label="Maximum price" className="min-w-0" />
          </div>
        </div>

        <FilterSelect
          label="Availability"
          options={availabilityOptions}
          defaultValue="all"
        />
      </div>
    </section>
  );
};

export default EquipmentFilters;
