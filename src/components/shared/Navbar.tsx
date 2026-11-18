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
        <Link href={"/"}>Login </Link>
      )}
      <Link href={"/"}>Register</Link>
    </>


  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto py-2.5 max-h-30 flex  justify-between items-center">
        <div className="ml-0 ">
          <Image
            src={"/image/logo.png"}
            width={150}
            height={100}
            alt="rentalLagbe logo"
          />
        </div>

          <div className="flex gap-5">{links}
            
          </div>

        
          <div className="flex gap-5">{authLinks}
            
          </div>

      </div>
    </div>
  );
};

export default Navbar;
