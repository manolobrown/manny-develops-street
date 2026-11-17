import Link from "next/link";

export default function JournalPostNotFound() {
  return (
    <section className="border-b border-line-soft px-pad pt-7 pb-pad-y">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-line pb-7 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-2">
        <div>
          <span className="font-serif text-[32px] font-light italic tracking-[-0.02em] leading-none text-ink normal-case [text-transform:none]">
            § 03 · 404
          </span>
        </div>
        <div className="text-center">Entry not found</div>
        <div className="flex justify-end gap-2 text-ink-3">
          <span>One eye, two practices</span>
        </div>
      </div>

      <div className="mt-12 grid items-end gap-16 md:grid-cols-[1.4fr_1fr]">
        <h1 className="m-0 text-balance font-serif font-extralight text-[clamp(64px,11vw,180px)] leading-[0.88] tracking-[-0.04em]">
          That entry <em>isn&apos;t</em> here.
        </h1>
        <div className="flex flex-col gap-6">
          <p className="m-0 font-serif font-light text-[clamp(18px,1.8vw,22px)] leading-[1.5] tracking-[-0.005em] text-ink-2">
            The URL doesn&apos;t match a letter or essay in the journal. It may have been renamed, or never published.
          </p>
          <div>
            <Link
              href="/journal"
              className="
                inline-flex items-center gap-2 border border-line px-5 py-2.5
                font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-ink
                transition-colors duration-[260ms] ease-editorial
                hover:bg-ink hover:text-bg
              "
            >
              Browse the journal <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
