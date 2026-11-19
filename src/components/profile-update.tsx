"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { UserRole } from "@/types/UserRole";
import { ShieldUser } from "lucide-react";
import Image from "next/image";
import ImageUpload from "./profile/image-upload";
import { authClient } from "@/lib/auth-client";
import { User } from "@/types/User";


const ProfileUpdate =  () => {
 const { data: session } = authClient.useSession()
  const userInfo = session?.user as User | undefined
  const role: UserRole = (userInfo as { role?: UserRole } | undefined)?.role || "customer";
  console.log(userInfo?.id)
 



  const handleProfileInfo = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const userData = Object.fromEntries(formData.entries())

    console.log(userData)


    const respose = await fetch(`http://localhost:8000/users/${userInfo?.id}`,{
      method: "PATCH",
      headers:{"Content-Type" :"application/json"},
      body: JSON.stringify(userData)
    })

    const result = respose.json()

    console.log(result)
    
    

      
  }
  return (
    <Card className="bg-slate-100 max-w-2xl flex mx-auto">
      <CardHeader>
        <div className="flex  mx-auto justify-center items-center gap-7 mb-10">
          <Image
            src={userInfo?.image || "/icon-192.png"}
            width={100}
            height={100}
            alt="userProfile"
            className=" rounded-full border-3 border-orange-300 "
          />
          <div className="space-y-1">
            <h1 className={"text-3xl font-semibold"}>{userInfo?.name}</h1>
            <p className={"text-md text-slate-400 "}>{userInfo?.email}</p>
            <span className="text-sm w-22 text-white bg-orange-600 rounded-2xl py-1 flex gap-1 justify-center">
              {" "}
              <ShieldUser size={20} /> {role.toUpperCase()}
            </span>
          </div>
        </div>

        <CardTitle className="text-center">Update Profile</CardTitle>
        <CardDescription className="text-center">
          Enter your information below to update your profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleProfileInfo}>
          <FieldGroup className="grid grid-cols-2">
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" type="text" placeholder="John Doe" name="name" value={userInfo?.name} required />
            </Field>

            <Field>
              <FieldLabel htmlFor="number">Phone</FieldLabel>
              <Input
                id="number"
                type="number"
                name="phone"
                placeholder="8801723456780"
                value={userInfo?.phone}
                required
              />
            </Field>
            
            <Field>
              <FieldLabel htmlFor="image">Image URL</FieldLabel>
              <ImageUpload />
            </Field>
            <Field>
              <FieldLabel htmlFor="address">Delivary Address</FieldLabel>
              <Input
                id="address"
                type="text"
                placeholder="Bagehat Morrelgang Fulhata Panchakarn"
                name="deliveryAddress"
                value={userInfo?.deliveryAddress}
                required
              />
            </Field>
          </FieldGroup>
          <FieldGroup className="mt-10">
            <Field></Field>
            <Field>
              <Button type="submit">Save and Change</Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>

    </Card>
  );
};

export default ProfileUpdate;
