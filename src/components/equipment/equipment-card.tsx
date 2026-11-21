"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import type { EquipmentRecord } from "@/types/equipment";

const FALLBACK_IMAGE = "/equipment-placeholder.svg";

const categoryLabels: Record<string, string> = {
  "construction-equipment": "Construction Equipment",
  "photography-equipment": "Photography Equipment",
  "vehicles-transportation": "Vehicles & Transportation",
  "agriculture-equipment": "Agriculture Equipment",
  electronics: "Electronics",
  "event-equipment": "Event Equipment",
  "cleaning-equipment": "Cleaning Equipment",
  "material-handling": "Material Handling",
  "power-equipment": "Power Equipment",
};

const rentalTypeLabels: Record<string, string> = {
  daily: "Day",
  week: "Week",
  weekly: "Week",
  month: "Month",
  monthly: "Month",
};

const formatLabel = (value?: string, labels?: Record<string, string>) => {
  if (!value) return "—";
  if (labels?.[value]) return labels[value];
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const resolveImageUrl = (image: unknown): string | null => {
  if (typeof image === "string" && image.trim()) return image;
  if (!image || typeof image !== "object") return null;

  const record = image as Record<string, unknown>;
  const direct = record.url ?? record.imageUrl ?? record.src;
  if (typeof direct === "string" && direct.trim()) return direct;

  const data = record.data;
  if (data && typeof data === "object") {
    const nested = (data as Record<string, unknown>).url;
    if (typeof nested === "string" && nested.trim()) return nested;
  }

  return null;
};

const formatPrice = (price?: string) => {
  const value = Number(price);
  if (!price || Number.isNaN(value)) return "—";
  return `৳${value.toLocaleString("en-US")}`;
};

const EquipmentCard = ({ equipment }: { equipment: EquipmentRecord }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const rawImageUrl = resolveImageUrl(equipment.image);
  const imageUrl = !rawImageUrl || imageFailed ? FALLBACK_IMAGE : rawImageUrl;
  const available = Number(equipment.quantity) > 0;

  return (
    <Card className="h-full gap-0 overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] w-full bg-muted">
        <Image
          src={imageUrl}
          alt={equipment.equipmentName || "Equipment"}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          onError={() => setImageFailed(true)}
        />
        <span
          className={`absolute top-3 right-3 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium shadow-sm ${
            available
              ? "bg-emerald-500/90 text-white"
              : "bg-destructive/90 text-white"
          }`}
        >
          {available ? "Available" : "Out of stock"}
        </span>
      </div>

      <CardContent className="flex flex-1 flex-col gap-2 pt-4 pb-4">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {formatLabel(equipment.category, categoryLabels)}
        </p>
        <h2 className="line-clamp-2 text-base leading-snug font-semibold">
          {equipment.equipmentName || "Untitled equipment"}
        </h2>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" />
          <span className="truncate">{equipment.location || "Location not specified"}</span>
        </p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div>
            <p className="text-lg font-bold">{formatPrice(equipment.price)}</p>
            <p className="text-xs text-muted-foreground">Rental Price</p>
          </div>
          <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
            {formatLabel(equipment.rentaltype, rentalTypeLabels)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4">
        <Button
          render={<Link href={`/equipment/${equipment._id}`} />}
          variant="outline"
          className="w-full"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EquipmentCard;
