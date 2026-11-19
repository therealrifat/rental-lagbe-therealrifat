"use client";
import LogOut from "@/app/(auth)/component/logout";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";


const UserProfile = () => {
  const { data: session, isPending } = authClient.useSession();

   
const role = (session?.user as { role?: string } | undefined)?.role || "customer";
  return (
    <>
      {isPending ? (
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-8 w-24 px-4" />
          <Skeleton className="h-8 w-24 px-4" />
        </div>
      ) : session?.user ? (
        <div className="flex items-center gap-2.5">
          <Link href={`/dashboard/${role}`} className="border rounded-lg px-5">
            Dashboard
          </Link>
          <LogOut />
        </div>
      ) : (
        <div className="flex items-center gap-2.5">
          <Link
            className="  border-2 border-[#2563EB] px-5 py-1 rounded-lg text-md"
            href={"/login"}
          >
            Login{" "}
          </Link>
          <Link
            className=" border-2 bg-[#2563EB] px-4 py-1 rounded-lg text-md"
            href={"/register"}
          >
            Register
          </Link>
        </div>
      )}
    </>
  );
};

export default UserProfile;
