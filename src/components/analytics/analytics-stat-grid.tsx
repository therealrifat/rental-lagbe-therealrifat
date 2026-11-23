import AnalyticsStatCard from "./analytics-stat-card";
import type { AnalyticsMetric } from "@/types/analytics";

const AnalyticsStatGrid = ({ metrics }: { metrics: AnalyticsMetric[] }) => {
  const columnClass =
    metrics.length >= 6
      ? "xl:grid-cols-6"
      : metrics.length === 5
        ? "xl:grid-cols-5"
        : metrics.length === 4
          ? "xl:grid-cols-4"
          : "xl:grid-cols-3";

  return (
    <div
      className={`grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:gap-4 lg:grid-cols-3 ${columnClass}`}
    >
      {metrics.map((metric) => (
        <AnalyticsStatCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
};

export default AnalyticsStatGrid;
