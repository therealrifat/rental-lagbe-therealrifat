"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles } from "lucide-react";
import { motion, type Variants } from "framer-motion";

import { Button } from "@/components/ui/button";

const BANNER_IMAGE =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const highlights = [
  { icon: BadgeCheck, label: "Verified equipment" },
  { icon: ShieldCheck, label: "Secure checkout" },
];

const AmbientGlow = () => (
  <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute top-0 left-1/2 size-[26rem] -translate-x-1/2 rounded-full bg-indigo-300/20 blur-[110px]" />
    <div className="absolute right-1/4 bottom-0 size-[18rem] rounded-full bg-violet-300/20 blur-[100px]" />
  </div>
);

const HeroCopy = () => (
  <>
    <motion.span
      variants={fadeUp}
      className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-xs font-medium tracking-wide text-indigo-700"
    >
      <Sparkles className="size-3.5" />
      Rent smarter, build faster
    </motion.span>

    <motion.h1
      variants={fadeUp}
      className="mt-5 text-3xl leading-tight font-bold text-foreground sm:text-4xl lg:text-5xl"
    >
      The right equipment,{" "}
      <span className="text-indigo-600 dark:text-indigo-400">
        right when you need it.
      </span>
    </motion.h1>

    <motion.p
      variants={fadeUp}
      className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
    >
      Rental Lagbe connects renters with trusted equipment owners. Browse
      construction tools, cameras, vehicles, and more — then book and pay
      securely in just a few steps.
    </motion.p>

    <motion.div
      variants={fadeUp}
      className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row"
    >
      <Button render={<Link href="/equipment" />} size="lg" className="w-full sm:w-auto">
        Browse Equipment
        <ArrowRight className="size-4" />
      </Button>
      <Button
        render={<Link href="/dashboard/owner/add-equipment" />}
        size="lg"
        variant="outline"
        className="w-full sm:w-auto"
      >
        List Your Equipment
      </Button>
    </motion.div>
  </>
);

const HeroImage = () => (
  <motion.div
    variants={imageReveal}
    className="relative mx-auto mt-10 w-full max-w-3xl overflow-hidden rounded-2xl shadow-[0_20px_60px_-25px_rgba(15,23,42,0.45)] ring-1 ring-black/5"
  >
    <div className="relative aspect-[21/9] w-full bg-muted">
      <Image
        src={BANNER_IMAGE}
        alt="Construction equipment at a worksite"
        fill
        priority
        unoptimized
        sizes="(max-width: 768px) 100vw, 768px"
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 50%, rgba(15,23,42,0.4) 100%)",
        }}
      />
      <p className="absolute bottom-4 left-5 text-left text-sm font-medium text-white sm:text-base">
        Equipment you can count on, whenever you need it.
      </p>
    </div>
  </motion.div>
);

const TrustHighlights = () => (
  <motion.div
    variants={fadeUp}
    className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground"
  >
    {highlights.map(({ icon: Icon, label }) => (
      <span key={label} className="inline-flex items-center gap-2">
        <Icon className="size-4 text-emerald-500" />
        {label}
      </span>
    ))}
  </motion.div>
);

const Banner = () => (
  <section className="relative isolate w-full px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
    <AmbientGlow />

    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto w-full max-w-5xl text-center"
    >
      <HeroCopy />
      <HeroImage />
      <TrustHighlights />
    </motion.div>
  </section>
);

export default Banner;
