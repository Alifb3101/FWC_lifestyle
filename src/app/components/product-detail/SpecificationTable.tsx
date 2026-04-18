type SpecificationTableProps = {
  data: Record<string, string | number | boolean | null | undefined>;
};

function normalizeLabel(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
}

export function SpecificationTable({ data }: SpecificationTableProps) {
  const entries = Object.entries(data).filter(
    ([, value]) => value !== null && value !== undefined && value !== ""
  );

  if (entries.length === 0) {
    return (
      <p className="py-5 text-[0.78rem] uppercase tracking-[0.2em] text-neutral-400">
        No details available.
      </p>
    );
  }

  return (
    <div className="divide-y divide-border border-y border-border">
      {entries.map(([key, value]) => (
        <div
          key={key}
          className="grid grid-cols-2 gap-6 py-3.5 text-sm"
        >
          <span className="self-center text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground/90">
            {normalizeLabel(key)}
          </span>
          <span className="self-center text-[0.92rem] font-semibold text-foreground/90 leading-snug">
            {String(value)}
          </span>
        </div>
      ))}
    </div>
  );
}