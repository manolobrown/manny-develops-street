type Props = {
  pressed?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

export function Chip({ pressed = false, onClick, children, className = "" }: Props) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`
        inline-flex items-center rounded-full border border-line-soft px-3.5 py-2
        font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-ink-2
        transition-colors duration-[260ms] ease-editorial
        hover:border-line hover:text-ink
        aria-pressed:bg-ink aria-pressed:text-bg aria-pressed:border-ink
        ${className}
      `}
    >
      {children}
    </button>
  );
}
