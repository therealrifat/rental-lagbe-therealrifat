import { CalendarCheck, CheckCircle2, Clock3, XCircle } from "lucide-react";

type AdminRentalSummaryCardsProps = {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
};

const AdminRentalSummaryCards = ({
  total,
  pending,
  approved,
  rejected,
}: AdminRentalSummaryCardsProps) => {
  const cards = [
    {
      label: "Total",
      value: total,
      icon: CalendarCheck,
      tone: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock3,
      tone: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    },
    {
      label: "Approved",
      value: approved,
      icon: CheckCircle2,
      tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    },
    {
      label: "Rejected",
      value: rejected,
      icon: XCircle,
      tone: "bg-destructive/10 text-destructive",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {cards.map(({ label, value, icon: Icon, tone }) => (
        <div
          key={label}
          className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {label}
              </p>
              <p className="text-2xl font-bold">{value}</p>
            </div>
            <span
              className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${tone}`}
            >
              <Icon className="size-5" />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminRentalSummaryCards;
