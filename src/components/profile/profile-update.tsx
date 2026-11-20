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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { UserRole } from "@/types/UserRole";
import { ShieldUser } from "lucide-react";
import ImageUpload from "./image-upload";
import { authClient } from "@/lib/auth-client";
import { User } from "@/types/User";
import { UpdateProfielInfo } from "@/lib/actions/users";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";

const ProfileUpdate = () => {
  const router = useRouter()
  const [isLoading, setLoding] = useState(false);
  const { data: session } = authClient.useSession();
  const userInfo = session?.user as User | undefined;
  const role: UserRole =
    (userInfo as { role?: UserRole } | undefined)?.role || "customer";

  const [editedImage, setEditedImage] = useState("");
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const avatarUrl = (editedImage || userInfo?.image || "").trim();
  const avatarSrc =
    !avatarUrl || failedImage === avatarUrl
      ? "/avatar-placeholder.svg"
      : avatarUrl;

  const handleProfileInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoding(true);

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const result = await UpdateProfielInfo(userInfo?.id as string, userData);
    console.log(result);
    if (result.modifiedCount > 0) {

      setLoding(false)
      router.refresh()

    }

  };
  return (
    <Card className="w-full">
      <CardHeader className="border-b pb-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="size-16 shrink-0 overflow-hidden rounded-full bg-muted ring-1 ring-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarSrc}
              alt={`${userInfo?.name || "User"}'s profile`}
              className="size-full object-cover"
              onError={() => setFailedImage(avatarUrl)}
            />
          </div>

          <div className="min-w-0 space-y-1">
            <h2 className="truncate text-xl font-semibold">
              {userInfo?.name || "Your profile"}
            </h2>
            <p className="truncate text-sm text-muted-foreground">
              {userInfo?.email || "No email available"}
            </p>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
              <ShieldUser className="size-3.5" /> {role.toUpperCase()}
            </span>
          </div>
        </div>

        <CardTitle className="pt-2 text-base">Update Profile</CardTitle>
        <CardDescription>
          Enter your information below to update your profile.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleProfileInfo}>
        <CardContent className="pt-5">
          <FieldGroup className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                name="name"
                defaultValue={userInfo?.name ?? ""}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="number">Phone</FieldLabel>
              <Input
                id="number"
                type="number"
                name="phone"
                placeholder="8801723456780"
                defaultValue={userInfo?.phone ?? ""}
                required
              />
            </Field>

            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="address">Delivery Address</FieldLabel>
              <Input
                id="address"
                type="text"
                placeholder="Bagehat Morrelgang Fulhata Panchakarn"
                name="deliveryAddress"
                defaultValue={userInfo?.deliveryAddress ?? ""}
                required
              />
            </Field>

            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="image">Image URL</FieldLabel>
              <ImageUpload
                image={userInfo?.image ?? ""}
                onPreviewChange={(url) => {
                  setEditedImage(url);
                  setFailedImage(null);
                }}
              />
            </Field>
          </FieldGroup>
        </CardContent>

        <CardFooter className="justify-end">
          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner /> Save and Change
              </>
            ) : (
              "Save and Change"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProfileUpdate;
