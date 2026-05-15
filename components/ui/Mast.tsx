type Props = {
  left: React.ReactNode;
  center?: React.ReactNode;
  right: React.ReactNode;
  className?: string;
};

export function Mast({ left, center, right, className = "" }: Props) {
  return (
    <div
      className={`
        grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-pad pt-7 pb-4
        font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3
        ${className}
      `}
    >
      <span className="justify-self-start">{left}</span>
      <span className="justify-self-center">{center}</span>
      <span className="justify-self-end">{right}</span>
    </div>
  );
}
