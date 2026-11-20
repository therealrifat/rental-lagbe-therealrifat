import Image from "next/image";
import Link from "next/link";

import LoginForm from "../component/login-form";

const LogInPage = () => {
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
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to continue browsing and managing your rentals.
          </p>
        </div>
      </header>

      <LoginForm />
    </main>
  );
};

export default LogInPage;
