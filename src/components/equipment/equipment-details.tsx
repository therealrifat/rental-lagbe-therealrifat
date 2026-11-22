import Image from "next/image";
import {
  ImageIcon,
  MapPin,
  UserRound,
} from "lucide-react";

import BookingDialog from "@/components/equipment/booking-dialog";
import FavoriteButton from "@/components/favorites/favorite-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { EquipmentRecord } from "@/types/equipment";
import { getUserInfo } from "@/lib/api/users";
import { redirect } from "next/navigation";
import { getUserSessionServer } from "@/lib/core/session-server";
import { isFavorite } from "@/lib/actions/favorites";

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
  daily: "Daily",
  week: "Weekly",
  weekly: "Weekly",
  month: "Monthly",
  monthly: "Monthly",
};

const conditionLabels: Record<string, string> = {
  "brand-new": "Brand New",
  excellent: "Excellent",
  good: "Good",
  fair: "Fair",
};

const statusStyles: Record<string, string> = {
  Pending: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  Approved: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Rejected: "bg-destructive/10 text-destructive",
};

const formatValue = (value?: string, labels?: Record<string, string>) => {
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

const StatusBadge = ({ status }: { status?: string }) => {
  const value = status || "Pending";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
        statusStyles[value] ?? "bg-muted text-muted-foreground"
      }`}
    >
      {value}
    </span>
  );
};

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-start justify-between gap-4 border-b border-border/70 py-2.5 last:border-0 last:pb-0">
    <dt className="text-sm text-muted-foreground">{label}</dt>
    <dd className="max-w-[60%] text-right text-sm font-medium break-words">
      {value || "—"}
    </dd>
  </div>
);


const EquipmentDetails = async({ item }: { item: EquipmentRecord }) => {
const isLogin =await getUserSessionServer()
 if(!isLogin){
    redirect("/login")
  }

  const initialIsFavorite = await isFavorite(isLogin.user.id, item._id);

  const ownerData = await getUserInfo(item.ownerId)

 
  console.log("kuk",ownerData)


  const imageUrl = resolveImageUrl(item.image);

  // const owner = item as OwnerInfo;
  const ownerName =ownerData.name
  const ownerEmail = ownerData?.email
  const ownerAddress = ownerData?.deliveryAddress
  const ownerPhone = ownerData?.phone 
  const ownerImage = ownerData?.image 
  const ownerInitials = ownerName
    ? ownerName
        .split(" ")
        .map((part:string) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "O";

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold">
            {item.equipmentName || "Untitled equipment"}
          </h1>
          <StatusBadge status={item.status} />
          <FavoriteButton
            customerId={isLogin.user.id}
            equipmentId={item._id}
            equipmentName={item.equipmentName || "this equipment"}
            initialIsFavorite={initialIsFavorite}
            showLabel
          />
        </div>
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          <span>{formatValue(item.category, categoryLabels)}</span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" />
            {item.location || "Location not specified"}
          </span>
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="relative aspect-[4/3] w-full bg-muted">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={item.equipmentName || "Equipment"}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
                  <ImageIcon className="size-10" />
                  <span className="text-sm">No image available</span>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {item.description || "No description provided."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-lg">
                Rental Terms and Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {item.terms || "No rental terms provided."}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-lg">Equipment Information</CardTitle>
              <CardDescription>
                Pricing, availability, and rental details
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-4">
              <dl>
                <DetailRow label="Equipment Name" value={item.equipmentName} />
                <DetailRow
                  label="Category"
                  value={formatValue(item.category, categoryLabels)}
                />
                <DetailRow label="Rental Price" value={item.price} />
                <DetailRow
                  label="Rental Type"
                  value={formatValue(item.rentaltype, rentalTypeLabels)}
                />
                <DetailRow label="Location" value={item.location} />
                <DetailRow
                  label="Available Quantity"
                  value={item.quantity}
                />
                <DetailRow
                  label="Condition"
                  value={formatValue(item.equipmentCondition, conditionLabels)}
                />
                <DetailRow
                  label="Brand"
                  value={item.brandName}
                />
                <DetailRow label="Model" value={item.modelName} />
              </dl>
            </CardContent>

            <CardFooter>
              <BookingDialog
                equipmentName={item.equipmentName || "this equipment"}
                price={item.price || 0}
                rentaltype={item.rentaltype}
                availableQuantity={item.quantity}
                equipmentId={item._id}
                ownerId={item.ownerId}
                
              />
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-lg">Owner Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="flex items-center gap-3">
                <Avatar size="lg">
                  {ownerImage && (
                    <AvatarImage src={ownerImage} alt={ownerName || "Owner"} />
                  )}
                  <AvatarFallback>
                    {ownerName ? (
                      ownerInitials
                    ) : (
                      <UserRound className="size-4" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 space-y-0.5">
                  <p className="truncate text-sm font-medium">
                    {ownerName || "Equipment owner"}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {ownerEmail || ownerPhone || "Contact details unavailable"}
                  </p>
                </div>
              </div>

              <dl>
               
                
                {ownerAddress && <DetailRow label="Address" value={ownerAddress} />}
               
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetails;
