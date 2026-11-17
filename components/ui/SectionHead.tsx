type Props = {
  label: string;
  date?: string;
  className?: string;
};

export function SectionHead({ label, date, className = "" }: Props) {
  return (
    <div
      className={`
        grid grid-cols-[auto_1fr_auto] items-center gap-[18px]
        pt-7 pb-6
        font-mono text-[11px] uppercase tracking-[0.08em] text-ink-2
        ${className}
      `}
    >
      <span className="font-semibold text-ink">{label}</span>
      <span aria-hidden className="h-px bg-line-soft" />
      {date && <span className="text-ink-3">{date}</span>}
    </div>
  );
}
