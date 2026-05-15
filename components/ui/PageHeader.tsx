type Props = {
  num: string;
  mastCenter: string;
  mastRight: React.ReactNode;
  title: React.ReactNode;
  lede: React.ReactNode;
};

export function PageHeader({ num, mastCenter, mastRight, title, lede }: Props) {
  return (
    <section className="border-b border-line-soft px-pad pt-7 pb-pad-y">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-line pb-7 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-2">
        <div>
          <span className="font-serif text-[32px] font-light italic tracking-[-0.02em] leading-none text-ink normal-case [text-transform:none]">
            § {num}
          </span>
        </div>
        <div className="text-center">{mastCenter}</div>
        <div className="flex justify-end gap-2 text-ink-3">{mastRight}</div>
      </div>

      <div className="mt-12 grid items-end gap-16 md:grid-cols-[1.4fr_1fr]">
        <h1 className="m-0 text-balance font-serif font-extralight text-[clamp(64px,11vw,180px)] leading-[0.88] tracking-[-0.04em]">
          {title}
        </h1>
        <p className="m-0 font-serif font-light text-[clamp(18px,1.8vw,22px)] leading-[1.5] tracking-[-0.005em] text-ink-2 [text-wrap:pretty]">
          {lede}
        </p>
      </div>
    </section>
  );
}
