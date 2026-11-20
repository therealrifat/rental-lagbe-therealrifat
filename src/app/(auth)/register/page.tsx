import Image from "next/image";
import Link from "next/link";

import RegistrationForm from "./../component/registration-form";

const RegistrationPage = () => {
  return (
    <main className="mx-auto w-full max-w-md px-4 py-10 sm:py-14">
      <header className="mb-6 space-y-4 text-center">
        <Link href="/" className="inline-flex w-fit items-center justify-center">
          <Image
            src="/image/logo.png"
            alt="Rental Lagbe"
            width={130}
            height={44}
            className="h-auto w-auto"
          />
        </Link>

        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Join Rental Lagbe today</h1>
          <p className="text-sm text-muted-foreground">
            Create an account to list equipment, book rentals, and manage
            everything in one place.
          </p>
        </div>
      </header>

      <RegistrationForm />
    </main>
  );
};

export default RegistrationPage;
