import Link from "next/link";
import { ArrowLeft, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

const UnAuthorized = () => {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center px-4 py-10 sm:px-6 sm:py-14">
      <section className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="relative overflow-hidden bg-[#020617] px-6 py-10 text-center text-white sm:px-10 sm:py-12">
          <div
            aria-hidden="true"
            className="absolute -top-16 left-1/2 size-56 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl"
          />
          <div className="relative">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-amber-400/15 text-amber-300 ring-1 ring-amber-300/30">
              <Lock className="size-7" aria-hidden="true" />
            </div>
            <p className="mt-5 text-xs font-semibold tracking-[0.3em] text-slate-400 uppercase">
              Error 403
            </p>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Access denied</h1>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-300">
              You are signed in, but your account does not have permission to view
              this page.
            </p>
          </div>
        </div>

        <div className="space-y-5 p-6 sm:p-8">
          <div className="rounded-xl border border-border bg-muted/50 p-4">
            <p className="text-sm font-semibold">Why am I seeing this?</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Dashboard pages are restricted by account role — customer, owner, or
              admin. Open the dashboard that matches your role, or head back to the
              home page.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button render={<Link href="/" />} className="w-full sm:w-auto">
              <ArrowLeft className="size-4" />
              Back to home
            </Button>
            <Button
              render={<Link href="/equipment" />}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Browse equipment
            </Button>
          </div>

          <p className="flex items-center gap-2 border-t border-border pt-5 text-xs text-muted-foreground">
            <Mail className="size-3.5 shrink-0" />
            Think this is a mistake? Contact us at{" "}
            <a
              href="mailto:hello@rentallagbe.com"
              className="font-medium text-foreground underline underline-offset-2"
            >
              hello@rentallagbe.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default UnAuthorized;
