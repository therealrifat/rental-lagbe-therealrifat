"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  HardHat,
  Laptop,
  PartyPopper,
  Sprout,
  Truck,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

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

const categories = [
  {
    label: "Construction Equipment",
    value: "construction-equipment",
    icon: HardHat,
    tone: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    label: "Photography Equipment",
    value: "photography-equipment",
    icon: Camera,
    tone: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  {
    label: "Vehicles & Transportation",
    value: "vehicles-transportation",
    icon: Truck,
    tone: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  {
    label: "Agriculture Equipment",
    value: "agriculture-equipment",
    icon: Sprout,
    tone: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    label: "Electronics",
    value: "electronics",
    icon: Laptop,
    tone: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    label: "Event Equipment",
    value: "event-equipment",
    icon: PartyPopper,
    tone: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
];

const CategorySection = () => {
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
            Browse by category
          </p>
          <h2 className="text-2xl font-bold sm:text-3xl">
            Popular equipment categories
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
            From construction sites to creative projects, find the right gear
            for every job.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {categories.map(({ label, value, icon: Icon, tone }) => (
            <motion.div
              key={value}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={`/equipment?category=${value}`}
                className="group flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:border-indigo-300 hover:shadow-md sm:p-5"
              >
                <span
                  className={`flex size-11 items-center justify-center rounded-lg ${tone}`}
                >
                  <Icon className="size-5" />
                </span>

                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm leading-snug font-semibold sm:text-base">
                    {label}
                  </h3>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-600" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CategorySection;
