const statusStyles: Record<string, string> = {
  Pending: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  Approved: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Rejected: "bg-destructive/10 text-destructive",
};

const StatusBadge = ({ status }: { status?: string }) => {
  const value = status || "Pending";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
        statusStyles[value] ?? "bg-muted text-muted-foreground"
      }`}
    >
      {value}
    </span>
  );
};

export default StatusBadge;
