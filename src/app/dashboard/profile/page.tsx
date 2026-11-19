import ProfileUpdate from "@/components/profile/profile-update";
import { getUserSessionServer } from "@/lib/core/session-server";
import { UserRole } from "@/types/UserRole";
import { ShieldUser } from "lucide-react";
import Image from "next/image";

const OwnerProfile = async () => {
  const userInfo = await getUserSessionServer();
  const role:UserRole = userInfo?.user.role ||"customer"

  return (
    <div>
      <div>
        <div className=" flex items-center  my-10 bg-slate-200 h-20 rounded-2xl  ">
          <h1 className="px-5 text-3xl font-bold">Account & Profile </h1>
        </div>
        <div className="flex  mx-auto justify-center items-center gap-7 bg-amber-300">
          <Image
            src={userInfo?.user?.image as string}
            width={100}
            height={100}
            alt="userProfile"
            className=" rounded-full border-3 border-orange-300 "
          />

          <div className="space-y-1">
            <h1 className={"text-3xl font-semibold"}>{userInfo?.user.name}</h1>
            <p className={"text-md text-slate-400 "}>{userInfo?.user.email}</p>
           <span className="text-sm w-22 text-white bg-orange-600 rounded-2xl py-1 flex gap-1 justify-center" > <ShieldUser size={20}/> {role.toUpperCase()}</span>
          </div>




        </div>
        
          <div>
            <ProfileUpdate/>
          </div>
      </div>
    </div>
  );
};

export default OwnerProfile;
