"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  MapPin,
  PackageCheck,
  Wrench,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// Dummy spotlight owners — replace this array with your API response later.
const owners = [
  {
    name: "Karim Sheikh",
    initials: "KS",
    location: "Dhaka",
    equipmentCount: 12,
    completedRentals: 84,
    memberSince: "2023",
    categories: ["Construction", "Material Handling"],
  },
  {
    name: "Nusrat Jahan",
    initials: "NJ",
    location: "Chittagong",
    equipmentCount: 8,
    completedRentals: 56,
    memberSince: "2024",
    categories: ["Vehicles", "Event Equipment"],
  },
  {
    name: "Tanvir Ahmed",
    initials: "TA",
    location: "Rajshahi",
    equipmentCount: 6,
    completedRentals: 41,
    memberSince: "2024",
    categories: ["Photography", "Electronics"],
  },
];

const TrustedEquipment = () => {
  return (
    <section className="w-full px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto w-full max-w-6xl space-y-7"
      >
        <motion.div variants={fadeUp} className="space-y-2 text-center">
          <p className="text-xs font-medium tracking-wide text-indigo-600 uppercase dark:text-indigo-400">
            Owner network
          </p>
          <h2 className="text-2xl font-bold sm:text-3xl">
            Trusted equipment owners
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
            Rent from verified owners with real track records, so you know your
            equipment is ready when you are.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {owners.map((owner) => (
            <motion.article
              key={owner.name}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar size="lg">
                    <AvatarFallback>{owner.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <h3 className="truncate text-base font-semibold">
                        {owner.name}
                      </h3>
                      <BadgeCheck
                        className="size-4 shrink-0 text-emerald-500"
                        aria-label="Verified owner"
                      />
                    </div>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3.5 shrink-0" />
                      {owner.location}, Bangladesh
                    </p>
                  </div>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                  Verified
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 rounded-lg bg-muted/50 p-3 text-center">
                <div className="space-y-1">
                  <PackageCheck className="mx-auto size-4 text-muted-foreground" />
                  <p className="text-base font-semibold">
                    {owner.equipmentCount}
                  </p>
                  <p className="text-[0.7rem] text-muted-foreground">
                    Equipment
                  </p>
                </div>
                <div className="space-y-1">
                  <Wrench className="mx-auto size-4 text-muted-foreground" />
                  <p className="text-base font-semibold">
                    {owner.completedRentals}
                  </p>
                  <p className="text-[0.7rem] text-muted-foreground">Rentals</p>
                </div>
                <div className="space-y-1">
                  <CalendarDays className="mx-auto size-4 text-muted-foreground" />
                  <p className="text-base font-semibold">{owner.memberSince}</p>
                  <p className="text-[0.7rem] text-muted-foreground">Since</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {owner.categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {category}
                  </span>
                ))}
              </div>

              <Link
                href="/equipment"
                className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
              >
                View listings
                <ArrowUpRight className="size-4" />
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center justify-between gap-4 rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-5 sm:flex-row dark:border-indigo-900 dark:bg-indigo-950/40"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-semibold">Own equipment?</h3>
            <p className="text-sm text-muted-foreground">
              List it on Rental Lagbe and start earning from trusted renters.
            </p>
          </div>
          <Button
            render={<Link href="/dashboard/owner/add-equipment" />}
            className="w-full sm:w-auto"
          >
            List your equipment
            <ArrowUpRight className="size-4" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TrustedEquipment;
