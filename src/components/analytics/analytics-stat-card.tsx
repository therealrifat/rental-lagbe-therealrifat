import Link from "next/link";

import { Card } from "@/components/ui/card";
import type { AnalyticsMetric, AnalyticsTone } from "@/types/analytics";

const toneStyles: Record<AnalyticsTone, string> = {
  indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  sky: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  violet: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  amber: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  emerald: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  rose: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
};

const AnalyticsStatCard = ({ metric }: { metric: AnalyticsMetric }) => {
  const Icon = metric.icon;

  const content = (
    <Card
      className={`h-full gap-0 p-4 shadow-sm sm:p-5 ${
        metric.href ? "transition-colors hover:bg-muted/50" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {metric.label}
          </p>
          <p className="text-2xl font-bold tabular-nums">{metric.value}</p>
          {metric.hint ? (
            <p className="text-[0.7rem] text-muted-foreground">{metric.hint}</p>
          ) : null}
        </div>
        <span
          className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${toneStyles[metric.tone]}`}
        >
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </div>
    </Card>
  );

  return metric.href ? (
    <Link href={metric.href} className="block h-full">
      {content}
    </Link>
  ) : (
    content
  );
};

export default AnalyticsStatCard;
