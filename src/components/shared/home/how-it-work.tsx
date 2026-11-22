"use client";

import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  CreditCard,
  Search,
  Truck,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

import { Button } from "@/components/ui/button";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const steps = [
  {
    number: "01",
    title: "Browse equipment",
    description:
      "Explore verified listings by category, location, and price to find the right gear.",
    icon: Search,
  },
  {
    number: "02",
    title: "Check the details",
    description:
      "Compare features, availability, rental periods, and owner details before you choose.",
    icon: ClipboardList,
  },
  {
    number: "03",
    title: "Book and pay",
    description:
      "Pick your rental dates, confirm the booking, and complete payment securely.",
    icon: CreditCard,
  },
  {
    number: "04",
    title: "Get to work",
    description:
      "Collect your equipment or get it delivered, then get your project moving.",
    icon: Truck,
  },
];

const HowItWork = () => {
  return (
    <section id="how-it-work" className="relative isolate w-full bg-[#020617] px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16"
      >
        <motion.div variants={fadeRight} className="lg:self-start">
          <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">
            How it works
          </p>
          <h2 className="mt-2 text-2xl leading-tight font-bold sm:text-3xl">
            Four steps from search to site
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300">
            Renting equipment should be straightforward. Here is how Rental
            Lagbe gets you from browsing to booked.
          </p>
          <Button
            render={<Link href="/equipment" />}
            variant="secondary"
            className="mt-6"
          >
            Browse equipment
            <ArrowRight className="size-4" />
          </Button>
        </motion.div>

        <div className="space-y-5">
          {steps.map(({ number, title, description, icon: Icon }, index) => (
            <motion.div
              key={number}
              variants={fadeRight}
              className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-4"
            >
              <div className="relative flex justify-center">
                <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-900">
                  {number}
                </span>
                {index < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute top-10 bottom-[-1.25rem] w-px bg-white/25"
                  />
                )}
              </div>

              <div className="rounded-xl border border-white/15 bg-white/5 p-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-white/10">
                    <Icon className="size-4" />
                  </span>
                  <h3 className="text-base font-semibold">{title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWork;
