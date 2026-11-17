type Props = {
  num: string;
  mastCenter: string;
  mastRight: React.ReactNode;
  title: React.ReactNode;
  lede: React.ReactNode;
};

/** Page masthead: a monospace catalogue row, then a large sans title and lede. */
export function PageHeader({ num, mastCenter, mastRight, title, lede }: Props) {
  return (
    <section className="border-b border-line-soft px-pad pt-8 pb-16">
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-line-soft pb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">
        <span className="text-ink">N°{num}</span>
        <span className="hidden text-center sm:block">{mastCenter}</span>
        <span className="flex justify-end gap-2">{mastRight}</span>
      </div>

      <div className="mt-10 grid items-end gap-10 md:grid-cols-[1.4fr_1fr]">
        <h1 className="m-0 text-[clamp(48px,8vw,128px)] font-medium leading-[0.92] tracking-[-0.045em]">{title}</h1>
        <p className="m-0 text-[clamp(17px,1.6vw,20px)] leading-[1.5] text-ink-2 [text-wrap:pretty]">{lede}</p>
      </div>
    </section>
  );
}
