type Props = {
  num: string; // e.g. "04" or "04.A"
  label: string;
  date?: string;
  className?: string;
};

export function SectionHead({ num, label, date, className = "" }: Props) {
  return (
    <div
      className={`
        grid grid-cols-[auto_auto_1fr_auto] items-center gap-[18px]
        px-pad pt-7 pb-6
        font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2
        ${className}
      `}
    >
      <span className="font-semibold text-ink">§ {num}</span>
      <span className="font-medium">{label}</span>
      <span aria-hidden className="h-px bg-line-soft" />
      {date && <span className="text-ink-3">{date}</span>}
    </div>
  );
}
