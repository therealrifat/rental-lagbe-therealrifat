import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const isLogin = false;
  const links = (
    <>
      <Link href={"/"}>Home</Link>
      <Link href={"/"}>All Equipment</Link>
      <Link href={"/"}>About Us</Link>
    </>)
    const authLinks = <>
    {isLogin ? (
        <>
          <Link href={"/"}>Dashboard </Link>
          <Link href={"/"}>Logout </Link>
        </>
      ) : (
        <Link className="  border-2 border-[#2563EB] px-5 py-1 rounded-lg text-md" href={"/login"}>Login </Link>
      )}
      <Link className=" border-2 bg-[#2563EB] px-4 py-1 rounded-lg text-md" href={"/register"}>Register</Link>
    </>


  return (
    <div className="bg-background z-50 top-0 sticky">
      <div className="max-w-7xl mx-auto py-2.5 max-h-30 flex  justify-between items-center">
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

          <div className="flex gap-5 items-center">{links}
            
          </div>

        
          <div className="flex gap-5 items-center">{authLinks}
            
          </div>

      </div>
    </div>
  );
};

export default Navbar;
