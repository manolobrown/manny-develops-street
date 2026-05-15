import Link from "next/link";

type Action = { label: string; href: string; primary?: boolean };

type Props = {
  eyebrow: string;
  headline: React.ReactNode;
  body?: React.ReactNode;
  actions: Action[];
};

export function ClosingCta({ eyebrow, headline, body, actions }: Props) {
  return (
    <section className="bg-dark text-dark-fg px-pad py-pad-y">
      <div className="mx-auto flex max-w-[1080px] flex-col items-center gap-7 text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-dark-fg/60">
          {eyebrow}
        </span>
        <h2 className="m-0 font-serif font-extralight text-[clamp(80px,12vw,200px)] leading-[0.9] tracking-[-0.045em]">
          {headline}
        </h2>
        {body && (
          <p className="m-0 max-w-[64ch] text-balance font-serif font-light text-[clamp(18px,2vw,24px)] leading-[1.45] tracking-[-0.008em] text-dark-fg/80">
            {body}
          </p>
        )}
        <div className="mt-3 flex flex-wrap justify-center gap-3.5">
          {actions.map((a) => (
            <Link
              key={a.href + a.label}
              href={a.href}
              className={`
                inline-flex items-center gap-3 rounded-full px-[26px] py-[18px]
                font-mono text-[12px] font-medium uppercase tracking-[0.14em]
                transition-colors duration-[260ms] ease-editorial
                ${
                  a.primary
                    ? "bg-dark-fg text-dark border border-dark-fg hover:bg-accent hover:text-white hover:border-accent"
                    : "border border-dark-fg/30 text-dark-fg hover:bg-accent hover:text-white hover:border-accent"
                }
              `}
            >
              {a.label} <span aria-hidden>↗</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
