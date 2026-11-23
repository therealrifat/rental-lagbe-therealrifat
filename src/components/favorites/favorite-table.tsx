"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { FavoriteRecord } from "@/data/dummy-favorites";
import { removeFavorite } from "@/lib/actions/favorites";

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

const formatLabel = (value?: string) => {
  if (!value) return "—";
  if (categoryLabels[value]) return categoryLabels[value];
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatDate = (value?: string) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const resolveImageUrl = (image: unknown): string => {
  if (typeof image === "string" && image.trim()) return image;
  if (!image || typeof image !== "object") return FALLBACK_IMAGE;

  const record = image as Record<string, unknown>;
  const direct = record.url ?? record.imageUrl ?? record.src;
  if (typeof direct === "string" && direct.trim()) return direct;

  const data = record.data;
  if (data && typeof data === "object") {
    const nested = (data as Record<string, unknown>).url;
    if (typeof nested === "string" && nested.trim()) return nested;
  }

  return FALLBACK_IMAGE;
};

type FavoriteTableProps = {
  favorites: FavoriteRecord[];
  customerId: string;
};

const FavoriteTable = ({ favorites, customerId }: FavoriteTableProps) => {
  const [items, setItems] = useState(favorites);

  const handleRemove = async (favorite: FavoriteRecord) => {

  
    await removeFavorite(customerId, favorite._id);
    setItems((current) => current.filter((item) => item._id !== favorite._id));
  };

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card px-4 py-12 text-center text-sm text-muted-foreground">
        No favorites yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">
                Equipment
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Category
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Location
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Rental Price
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Saved On
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((favorite) => {
              const equipment = favorite;


              return (
                <tr
                  key={favorite._id}
                  className="transition-colors hover:bg-muted/40"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-border">
                        <Image
                          src={resolveImageUrl(
                            equipment.image ||
                              "https://i.ibb.co/5g3jm1wm/images.jpg",
                          )}
                          alt={equipment.equipmentName || "Equipment"}
                          fill
                          unoptimized
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <Link
                        href={`/equipment/${equipment.equipmentId}`}
                        className="font-medium hover:underline"
                      >
                        {equipment.equipmentName || "Untitled equipment"}
                      </Link>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {formatLabel(equipment.category || "-")}
                  </td>
                  <td className="px-4 py-3">{equipment.location || "—"}</td>
                  <td className="px-4 py-3 font-medium">{equipment.price}</td>
                  <td className="px-4 py-3">
                    {formatDate(favorite.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      onClick={() => handleRemove(favorite)}
                      aria-label={`Remove ${equipment.equipmentName} from favorites`}
                      title={`Remove ${equipment.equipmentName} from favorites`}
                    >
                      <Trash2 className="size-5" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FavoriteTable;
