"use client";

import { BadgeCheck, Quote, Star } from "lucide-react";
import { motion, type Variants } from "framer-motion";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// Dummy reviews — replace with your API response later.
const reviews = [
  {
    name: "Rahim Uddin",
    initials: "RU",
    location: "Dhaka",
    rating: 5,
    date: "Oct 2026",
    equipment: "Excavator",
    comment:
      "Found a well-maintained excavator at a fair daily rate. The owner was responsive and the equipment arrived on site exactly when promised.",
  },
  {
    name: "Sharmin Akter",
    initials: "SA",
    location: "Chittagong",
    rating: 5,
    date: "Sep 2026",
    equipment: "Pickup truck",
    comment:
      "Booking took just a few minutes. The listing photos matched the vehicle, and checkout felt safe and straightforward.",
  },
  {
    name: "Imran Hossain",
    initials: "IH",
    location: "Sylhet",
    rating: 4,
    date: "Sep 2026",
    equipment: "Concrete mixer",
    comment:
      "Good communication from the owner and flexible weekly rental. Would book again, though I wish more pickup slots were available.",
  },
  {
    name: "Farhana Islam",
    initials: "FI",
    location: "Rajshahi",
    rating: 5,
    date: "Aug 2026",
    equipment: "Generator",
    comment:
      "Verified owner, clear pricing, and no surprises. Rental Lagbe made it easy to compare options before committing.",
  },
];

const RatingStars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`size-4 ${
          index < rating
            ? "fill-amber-400 text-amber-400"
            : "text-muted-foreground/30"
        }`}
      />
    ))}
  </div>
);

const ReviewSections = () => {
  const averageRating = (
    reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <section className="w-full border-t border-border bg-card px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-12 lg:gap-14"
      >
        <motion.div variants={fadeUp} className="lg:col-span-4">
          <p className="text-xs font-medium tracking-wide text-indigo-600 uppercase dark:text-indigo-400">
            Customer reviews
          </p>
          <h2 className="mt-2 text-2xl leading-tight font-bold sm:text-3xl">
            Trusted by renters across Bangladesh
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Real feedback from people who found the right equipment and got their
            projects done on time.
          </p>

          <div className="mt-7 rounded-xl border border-border bg-muted/50 p-5">
            <p className="text-4xl font-bold">{averageRating}</p>
            <div className="mt-2">
              <RatingStars rating={Math.round(Number(averageRating))} />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Average rating from {reviews.length} verified renters
            </p>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:col-span-8">
          {reviews.map((review) => (
            <motion.article
              key={review.name}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="flex h-full flex-col rounded-xl border border-border bg-background p-5 shadow-sm"
            >
              <Quote className="size-6 text-indigo-500/30" aria-hidden="true" />
              <div className="mt-3">
                <RatingStars rating={review.rating} />
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">
                “{review.comment}”
              </p>

              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <Avatar>
                  <AvatarFallback>{review.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 space-y-0.5">
                  <p className="flex items-center gap-1.5 text-sm font-semibold">
                    <span className="truncate">{review.name}</span>
                    <BadgeCheck
                      className="size-3.5 shrink-0 text-emerald-500"
                      aria-label="Verified renter"
                    />
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {review.location} · {review.equipment} · {review.date}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ReviewSections;
