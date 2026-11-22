import Link from "next/link";
import { ArrowRight } from "lucide-react";

import EquipmentCard from "@/components/equipment/equipment-card";
import { Button } from "@/components/ui/button";
import { getFeatureSections } from "@/lib/api/users";
import { getUserSessionServer } from "@/lib/core/session-server";
import type { EquipmentRecord } from "@/types/equipment";

const FeatureSection = async () => {
  const [result, session] = await Promise.all([
    getFeatureSections(),
    getUserSessionServer(),
  ]);

  const payload = result as { data?: unknown } | unknown;
  const list = Array.isArray(payload)
    ? payload
    : Array.isArray((payload as { data?: unknown })?.data)
      ? ((payload as { data: unknown[] }).data as EquipmentRecord[])
      : [];

  // Featured items should already be approved; keep the guard in case the
  // endpoint returns a mixed list.
  const equipments = list
    .filter((item) => !item?.status || item.status === "Approved")
    .slice(0, 6);

  const detailsHref = session ? undefined : "/login";

  return (
    <section className="w-full px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto w-full max-w-7xl space-y-7">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium tracking-wide text-indigo-600 uppercase dark:text-indigo-400">
              Featured equipment
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Popular picks for your next project
            </h2>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Trusted equipment from verified owners, ready to book.
            </p>
          </div>

          <Button render={<Link href="/equipment" />} variant="outline">
            View all equipment
            <ArrowRight className="size-4" />
          </Button>
        </header>

        {equipments.length === 0 ? (
          <div className="rounded-xl border border-border bg-card px-4 py-12 text-center text-sm text-muted-foreground">
            No featured equipment available right now.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-4 xl:grid-cols-6">
            {equipments.map((equipment) => (
              <EquipmentCard
                key={equipment._id}
                equipment={equipment}
                detailsHref={detailsHref}
                compact
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeatureSection;
