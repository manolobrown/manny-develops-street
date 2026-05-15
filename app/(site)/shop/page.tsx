import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHead } from "@/components/ui/SectionHead";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { PrintsFilter } from "@/components/shop/PrintsFilter";
import { PRESETS } from "@/content/shop";

export const metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <>
      <PageHeader
        num="05"
        mastCenter="Shop · Prints & Presets"
        mastRight={
          <>
            <span>Ships from NYC</span><span>·</span><span>7 — 10 days worldwide</span>
          </>
        }
        title={<>Take a <em>piece</em> of the city home.</>}
        lede="Archival pigment prints on Hahnemühle Photo Rag, signed and numbered for limited editions. Plus a small set of Lightroom presets, reverse-engineered from my own catalog — three free, the full ten for $38."
      />

      {/* § 05.A · Prints */}
      <section className="px-pad py-pad-y">
        <SectionHead num="05.A" label="Fine-art prints" date="9 editions · Open + Limited" />
        <PrintsFilter />
      </section>

      {/* § 05.B · Presets */}
      <section id="presets" className="bg-paper px-pad py-pad-y">
        <SectionHead num="05.B" label="Lightroom presets · Edit like me" date="10 presets · .xmp + .dng" />

        {/* Provenance story + 2x2 stats */}
        <div className="grid items-center gap-12 pt-10 md:grid-cols-[1.2fr_1fr]">
          <p className="m-0 max-w-[58ch] font-serif font-light text-[clamp(20px,2.2vw,28px)] leading-[1.35] tracking-[-0.012em]">
            These aren&apos;t recipes borrowed from Pinterest. They were <em>reverse-engineered from my actual Lightroom catalog</em> — median values pulled from how I edit each kind of shot, on the streets I actually walk. Real, mine, and tuned for NYC.
          </p>
          <div className="grid grid-cols-2 gap-px border border-line-hair bg-line-hair">
            {[
              { num: "280,515", lbl: "Photos in catalog" },
              { num: <em>1,159</em>, lbl: "Five-star selections" },
              { num: "10", lbl: "Looks distilled" },
              { num: <em>0</em>, lbl: "Borrowed from anyone else" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col gap-1 bg-paper p-6">
                <div className="font-serif font-light text-[clamp(28px,3.4vw,48px)] leading-none tracking-[-0.02em]">
                  {s.num}
                </div>
                <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-3">
                  {s.lbl}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pack row — free vs featured */}
        <div className="grid gap-6 pt-16 md:grid-cols-2">
          {/* Free sampler */}
          <article className="flex flex-col gap-5 border border-line-soft bg-bg p-9">
            <div className="flex items-center justify-between border-b border-line-hair pb-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">3 presets</span>
              <span className="font-serif italic text-[24px] tracking-[-0.01em] text-ink">Free</span>
            </div>
            <h3 className="m-0 font-serif font-extralight text-[40px] leading-none tracking-[-0.025em]">
              <em>Free Sampler</em>
            </h3>
            <p className="m-0 font-serif font-light text-[16.5px] leading-[1.55] text-ink-2">
              Three of the recipes I reach for most. On the house — no email gate, no follow-up sequence.
            </p>
            <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
              {["Street Classic", "Shadow Play", "NYC Golden"].map((p) => (
                <li key={p} className="font-serif font-light text-[16px] text-ink">
                  · {p}
                </li>
              ))}
            </ul>
            <Link
              href="#"
              className="
                mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-line px-5 py-3
                font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink
                transition-colors duration-[260ms] ease-editorial
                hover:bg-ink hover:text-bg
              "
            >
              Download free pack <span aria-hidden>↗</span>
            </Link>
          </article>

          {/* Full pack — featured */}
          <article className="flex flex-col gap-5 bg-dark p-9 text-dark-fg">
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-dark-fg/60">10 presets</span>
              <span className="font-serif text-[28px] font-light tracking-[-0.02em] text-dark-fg">$38</span>
            </div>
            <h3 className="m-0 font-serif font-extralight text-[40px] leading-none tracking-[-0.025em]">
              <em className="text-accent">Full Pack</em>
            </h3>
            <p className="m-0 font-serif font-light text-[16.5px] leading-[1.55] text-dark-fg/80">
              The complete set — every recipe extracted from 280,515 photos and 1,159 five-star selections in my catalog.
            </p>
            <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
              {[
                "All 10 presets",
                ".xmp + .dng formats",
                "Lightroom Classic, CC, Mobile",
                "Install guide PDF",
                "Free updates",
              ].map((p) => (
                <li key={p} className="font-serif font-light text-[16px] text-dark-fg/90">
                  · {p}
                </li>
              ))}
            </ul>
            <Link
              href="/contact?intent=preset-pack"
              className="
                mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-dark-fg px-5 py-3
                font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-dark
                transition-colors duration-[260ms] ease-editorial
                hover:bg-accent hover:text-white
              "
            >
              Buy the full pack <span aria-hidden>↗</span>
            </Link>
          </article>
        </div>

        {/* Preset index */}
        <div className="mt-16 flex items-baseline justify-between border-b border-line py-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-3">
          <span>— Index · 10 presets</span>
          <span>What&apos;s inside the full pack</span>
        </div>

        <div className="grid gap-6 pt-10 md:grid-cols-2">
          {PRESETS.map((p) => (
            <article
              key={p.number}
              className="grid grid-cols-[auto_1fr] gap-5 border border-line-hair bg-bg p-5"
              style={{ ['--preset-accent' as string]: p.accent }}
            >
              <div className="relative aspect-square w-32 overflow-hidden bg-bg-2">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1"
                  style={{ background: "var(--preset-accent)" }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-3">
                    {p.number}
                  </span>
                  <span className="font-serif italic text-[19px] tracking-[-0.01em] text-ink">
                    {p.name}
                  </span>
                </div>
                <div className="font-serif italic text-[13.5px] text-ink-3">{p.source}</div>
                <div className="font-serif font-light text-[15px] leading-[1.5] text-ink-2">
                  {p.description}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-baseline justify-between gap-2 border-t border-line py-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-3">
          <span>Works with Lightroom Classic · CC · Mobile</span>
          <span>.xmp + .dng</span>
        </div>
      </section>

      {/* § 05.C · Print details */}
      <section className="px-pad py-pad-y">
        <SectionHead num="05.C" label="The print details" date="Paper · Editions · Shipping" />
        <div className="grid gap-10 pt-10 md:grid-cols-3">
          {[
            {
              num: "01 · Paper",
              h: <>Hahnemühle <em>Photo Rag</em></>,
              body: "Archival cotton rag, 308 gsm. Museum-grade — the same paper used by major galleries for fine-art editions.",
            },
            {
              num: "02 · Editions",
              h: <>Signed &amp; <em>numbered</em></>,
              body: "Limited editions are signed in pencil and stamped with a numbered certificate of authenticity, hand-packed.",
            },
            {
              num: "03 · Shipping",
              h: <>Worldwide, <em>7 – 10 days</em></>,
              body: "Rolled in a heavy-walled tube for sizes 16×20 and up. Free shipping on orders over $200 in the US.",
            },
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-3">
              <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-accent">
                {item.num}
              </span>
              <h4 className="m-0 font-serif font-light text-[clamp(24px,2.4vw,32px)] leading-[1.05] tracking-[-0.02em]">
                {item.h}
              </h4>
              <p className="m-0 font-serif font-light text-[16.5px] leading-[1.55] text-ink-2">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <ClosingCta
        eyebrow="§ 05.D · Custom & commission"
        headline={<>Looking for a <em>specific</em> frame?</>}
        body="The shop is a slice of the catalog. If you've seen a photo in the Work pages or in the Sunday letter and want it as a print, just ask — most frames can be made to order in a size that fits your wall."
        actions={[
          { label: "Request a custom print", href: "/contact?type=print", primary: true },
          { label: "prints@mannydevelops.com", href: "mailto:prints@mannydevelops.com" },
        ]}
      />
    </>
  );
}
