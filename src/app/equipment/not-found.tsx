import Link from "next/link";
import { ArrowLeft, Boxes, SearchX, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";

const quickLinks = [
  { label: "All equipment", href: "/equipment" },
  { label: "My rentals", href: "/dashboard/customer/my-rentals" },
  { label: "List equipment", href: "/dashboard/owner/add-equipment" },
];

const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center px-4 py-12 sm:px-6">
      <section className="w-full max-w-2xl text-center">
        <div className="relative mx-auto flex size-24 items-center justify-center rounded-3xl border border-dashed border-border bg-muted/50 sm:size-28">
          <Wrench className="size-10 text-muted-foreground" aria-hidden="true" />
          <span className="absolute -right-3 -bottom-3 flex size-11 items-center justify-center rounded-full border border-border bg-card shadow-sm">
            <SearchX className="size-5 text-indigo-500" aria-hidden="true" />
          </span>
        </div>

        <p className="mt-8 text-6xl leading-none font-black tracking-tight text-foreground/10 sm:text-8xl">
          404
        </p>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          The page you are looking for may have moved or never existed. Let us get
          you back to the right equipment.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button render={<Link href="/" />} className="w-full sm:w-auto">
            <ArrowLeft className="size-4" />
            Back to home
          </Button>
          <Button
            render={<Link href="/equipment" />}
            variant="outline"
            className="w-full sm:w-auto"
          >
            <Boxes className="size-4" />
            Browse equipment
          </Button>
        </div>

        <div className="mx-auto mt-10 max-w-md rounded-xl border border-border bg-card p-4 text-left shadow-sm">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Quick links
          </p>
          <nav className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
            {quickLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="rounded-lg px-2 py-1.5 font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
