import Image from "next/image";
import Link from "next/link";

import UserProfile from "./user-profile";

const Navbar = async () => {
  const links = (
    <>
      <Link href={"/"}>Home</Link>
      <Link href={"/"}>All Equipment</Link>
      <Link href={"/"}>About Us</Link>
    </>
  );

  return (
    <div className="bg-background z-50 top-0 sticky">
      <div className="max-w-7xl mx-auto py-2.5 h-16 flex  justify-between items-center">
        <div className="ml-0 cursor-pointer">
          <Link href={"/"}>
            <Image
              src={"/image/logo.png"}
              width={150}
              height={100}
              alt="rentalLagbe logo"
            />
          </Link>
        </div>

        <div className="flex gap-5 items-center">{links}</div>

        <div className="flex gap-5 items-center">
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
