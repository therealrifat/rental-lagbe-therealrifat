"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { addFavorite } from "@/lib/actions/favorites";

type FavoriteButtonProps = {
  customerId: string;
  equipmentId: string;
  equipmentName: string;
  initialIsFavorite?: boolean;
  showLabel?: boolean;
  className?: string;
};

const FavoriteButton = ({
  customerId,
  equipmentId,
  equipmentName,
  initialIsFavorite = false,
  showLabel = false,
  className,
}: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  const handleAdd = async () => {
    if (isFavorite) return;

    // TODO: replace the API call inside addFavorite with your own logic.

    
    await addFavorite(customerId, equipmentId);
    setIsFavorite(true);
  };

  const label = isFavorite
    ? `${equipmentName} is in your favorites`
    : `Add ${equipmentName} to favorites`;

  return (
    <Button
      type="button"
      size={showLabel ? "sm" : "icon"}
      variant={isFavorite ? "default" : "outline"}
      onClick={handleAdd}
      disabled={isFavorite}
      aria-label={label}
      aria-pressed={isFavorite}
      title={label}
      data-equipment-id={equipmentId}
      className={className}
    >
      <Heart className={`size-5 ${isFavorite ? "fill-current" : ""}`} />
      {showLabel && <span>{isFavorite ? "Saved" : "Add to Favorites"}</span>}
    </Button>
  );
};

export default FavoriteButton;
