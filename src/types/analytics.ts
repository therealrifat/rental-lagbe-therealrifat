import type { LucideIcon } from "lucide-react";

export type AnalyticsTone =
  | "indigo"
  | "sky"
  | "violet"
  | "amber"
  | "emerald"
  | "rose";

/** One metric tile. Labels/icons live in the page, so API responses stay plain data. */
export type AnalyticsMetric = {
  id: string;
  label: string;
  value: string | number;
  icon: LucideIcon;
  tone: AnalyticsTone;
  hint?: string;
  href?: string;
};

export type AnalyticsChartDatum = Record<string, string | number>;

export type AnalyticsBarSeries = {
  key: string;
  label: string;
  color: string;
};

/** Shape accepted by the shared bar chart — usable by admin, owner, or any page. */
export type AnalyticsChartConfig = {
  data: AnalyticsChartDatum[];
  xKey: string;
  series: AnalyticsBarSeries[];
};
