import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import UserProfile from "./user-profile";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = async () => {
  const links = (
    <>
      <Link href={"/"}>Home</Link>
      <Link href={"/equipment"}>All Equipment</Link>
      <Link href={"/"}>About Us</Link>
    </>
  );

  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={"/"} className="flex shrink-0 items-center">
          <Image
            src={"/image/logo.png"}
            width={120}
            height={44}
            alt="rentalLagbe logo"
            className="h-auto w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium [&>a]:transition-colors [&>a:hover]:text-muted-foreground md:flex">
          {links}
        </nav>

        <div className="hidden items-center md:flex">
          <UserProfile />
        </div>

        <Sheet>
          <SheetTrigger
            render={<Button variant="ghost" size="icon" className="md:hidden" />}
          >
            <Menu className="size-5" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>

          <SheetContent side="right" className="w-4/5 sm:max-w-xs">
            <SheetHeader className="pr-10">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Navigation and account links
              </SheetDescription>
            </SheetHeader>

            <nav className="flex flex-col gap-1 px-2 text-sm font-medium [&>a]:rounded-lg [&>a]:px-3 [&>a]:py-2 [&>a:hover]:bg-muted">
              {links}
            </nav>

            <div className="mt-auto border-t px-2 pt-4 [&>div]:justify-start">
              <UserProfile />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
