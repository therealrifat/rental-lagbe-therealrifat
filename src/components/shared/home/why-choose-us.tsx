"use client";

import {
  BadgeCheck,
  CalendarClock,
  ShieldCheck,
  Wallet,
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

const benefits = [
  {
    title: "Affordable rental prices",
    description:
      "Compare transparent daily, weekly, and monthly rates so you only pay for what you actually need.",
    icon: Wallet,
    tone: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Verified equipment owners",
    description:
      "Every owner is checked and reviewed, giving you confidence before you book any equipment.",
    icon: BadgeCheck,
    tone: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  {
    title: "Flexible rental periods",
    description:
      "Rent by the day, week, or month and adjust your booking as your project timeline changes.",
    icon: CalendarClock,
    tone: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  {
    title: "Secure payments",
    description:
      "Checkout safely with protected payments and a clear record of every transaction.",
    icon: ShieldCheck,
    tone: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="w-full bg-muted/30 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto w-full max-w-6xl space-y-7"
      >
        <motion.div variants={fadeUp} className="space-y-2 text-center">
          <p className="text-xs font-medium tracking-wide text-indigo-600 uppercase dark:text-indigo-400">
            Why choose us
          </p>
          <h2 className="text-2xl font-bold sm:text-3xl">
            Renting made simple, safe, and affordable
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
            Everything you need to get the right equipment without the usual
            hassle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {benefits.map(({ title, description, icon: Icon, tone }) => (
            <motion.article
              key={title}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <span
                className={`flex size-11 items-center justify-center rounded-lg ${tone}`}
              >
                <Icon className="size-5" />
              </span>
              <div className="space-y-2">
                <h3 className="text-base font-semibold">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default WhyChooseUs;
