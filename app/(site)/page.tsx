import Image from "next/image";
import Link from "next/link";
import { SectionHead } from "@/components/ui/SectionHead";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const PATHS = [
  {
    href: "/work",
    img: "/images/work/through-the-glass/through-the-glass-2.jpg",
    alt: "Through the Glass series",
    eyebrow: "A · 01",
    role: "Personal practice",
    title: <em>Work</em>,
    body: "Six ongoing series. A zine a year. The street & documentary archive, and the editorial credits that come with it.",
    meta: "6 series · 580+ frames",
    cta: "View the work",
  },
  {
    href: "/portraits",
    img: "/images/photos/wedding-3.jpg",
    alt: "Personal-branding portrait sample",
    eyebrow: "B · 02",
    role: "Studio offering",
    title: <em>Portraits</em>,
    body: "Personal-branding portraits for founders, partners, authors, creatives. Three tiers, on location in the city. Booking now through August.",
    meta: "From $1,495",
    cta: "See the tiers",
  },
  // {
  //   href: "/workshops",
  //   img: "/images/photos/steam.jpg",
  //   alt: "Saturday workshop walk",
  //   eyebrow: "C · 03",
  //   role: "Saturdays",
  //   title: <em>Workshops</em>,
  //   body: "Three-hour neighborhood photo walks. Five to eight cameras, one opinionated edit, coffee at the end. $200/seat.",
  //   meta: "Next: May 23 · 6 / 8 seats",
  //   cta: "Reserve a seat",
  //   status: "Disabled"
  // },
];

const PREVIEW = [
  { img: "/images/work/through-the-glass/through-the-glass-3.jpg", num: "01", cat: "Subway · Daily", title: <>Through the <em>Glass</em></> },
  { img: "/images/photos/shadow.jpg", num: "02", cat: "NYC at Night · Hard light", title: <>Shadow <em>Play</em></> },
  { img: "/images/photos/reflection.jpg", num: "03", cat: "Astor Place. · After rain", title: <em>Reflections</em> },
];

export default function HomePage() {
  return (
    <>
      {/* ───── HERO ───── */}
      <section className="px-pad pt-7">
        {/* Mast row */}
        <div
          className="
            grid grid-cols-[1fr_auto_1fr] items-center
            border-b border-line pb-6
            font-mono text-[11px] uppercase tracking-[0.16em] text-ink-2
          "
        >
          <div className="flex items-baseline gap-3.5">
            <em className="font-serif text-[24px] font-light not-italic [font-style:italic] tracking-[-0.02em] leading-none text-ink normal-case">
              № 01
            </em>
            <span>Manuel Peña · Photographer · New York</span>
          </div>
          <div className="text-center">Spring · 2026</div>
          <div className="flex justify-end gap-2.5 text-ink-3">
            <span>40.7128° N</span>
            <span>·</span>
            <span>74.0060° W</span>
          </div>
        </div>

        {/* Hero image */}
        <figure className="relative my-8 aspect-[16/9] max-h-[78vh] overflow-hidden bg-bg-2">
          <Image
            src="/images/work/through-the-glass/through-the-glass-7.jpg"
            alt="From the Through the Glass series"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-50% to-[rgba(20,17,13,0.55)]"
          />
          <figcaption
            className="
              absolute inset-x-7 bottom-6 z-[2] flex flex-wrap items-end justify-between gap-4
              font-mono text-[11px] uppercase tracking-[0.16em] text-white
            "
          >
            <span className="font-serif text-[16px] italic tracking-[-0.005em] normal-case opacity-90 [text-transform:none]">
              From <em className="not-italic [font-style:italic] text-white">Through the Glass</em>
            </span>
            <span>Vol. 01 · in progress</span>
          </figcaption>
        </figure>

        {/* Position statement */}
        <div className="grid items-end gap-16 border-b border-line py-10 pb-14 md:grid-cols-[1.6fr_1fr]">
          <h1 className="m-0 text-balance font-serif font-extralight text-[clamp(40px,5.8vw,92px)] leading-none tracking-[-0.03em]">
            I'm a New York <em>street &amp; documentary</em> photographer who makes portraits that don't feel like corporate portraits.
          </h1>
          <div className="flex flex-col gap-[18px]">
            <p className="m-0 max-w-[38ch] font-serif font-light text-[17px] leading-[1.5] text-ink-2">
              One eye, two practices. The street work is what makes me interesting. The portrait work is what funds the next year of street work. Each one is the marketing engine for the other.
            </p>
            <div className="mt-1.5 flex flex-col gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
              <span>Working since 2016</span>
              <span>280,515 frames in the catalog</span>
              <span>Based in Manhattan, NY</span>
            </div>
          </div>
        </div>

        {/* Three paths */}
        <nav
          aria-label="Choose a path"
          className="grid gap-7 border-b border-line py-16 pb-20 md:grid-cols-2"
        >
          {PATHS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group relative flex flex-col gap-[18px] text-ink no-underline transition-transform duration-[260ms] ease-editorial hover:-translate-y-1"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-bg-2">
                <Image
                  src={p.img}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[700ms] ease-editorial group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex items-baseline justify-between border-b border-line pb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
                <span className="font-semibold text-accent">{p.eyebrow}</span>
                <span>{p.role}</span>
              </div>
              <h2 className="m-0 font-serif font-light text-[clamp(36px,4vw,56px)] leading-none tracking-[-0.025em]">
                {p.title}
              </h2>
              <p className="m-0 max-w-[32ch] font-serif font-light text-[16.5px] leading-[1.5] text-ink-2">
                {p.body}
              </p>
              <div className="mt-1.5 flex items-baseline justify-between gap-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-3">
                <strong className="font-serif text-[16px] font-normal italic tracking-[-0.01em] text-ink normal-case [text-transform:none]">
                  {p.meta}
                </strong>
                <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                  {p.cta} <span aria-hidden className="transition-transform duration-[260ms] ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent">↗</span>
                </span>
              </div>
            </Link>
          ))}
        </nav>
      </section>

      {/* ───── CURRENTLY NOTE ───── */}
      <aside
        className="
          mx-pad mt-pad-y grid items-center gap-9 border border-line bg-paper p-9
          md:grid-cols-[auto_1fr_auto]
        "
      >
        <div className="flex flex-col gap-1 font-mono text-[10.5px] uppercase tracking-[0.18em]">
          <span>Currently</span>
          <em className="font-serif text-[26px] font-light not-italic [font-style:italic] tracking-[-0.02em] leading-none text-accent normal-case [text-transform:none]">
            May 2026
          </em>
        </div>
        <p className="m-0 text-balance font-serif font-light text-[clamp(20px,2.2vw,28px)] leading-[1.35] tracking-[-0.012em]">
          Vol. 01 of the zine, <em>Through the Glass</em>, is currently <em>in progress</em>. Reservations open.
        </p>
        <Link
          href="#newsletter"
          className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink hover:text-accent"
        >
          Reserve a copy <span aria-hidden>↗</span>
        </Link>
      </aside>

      {/* ───── PREVIEW: FRAMES FROM THE ARCHIVE ───── */}
      <section className="px-pad py-pad-y">
        <div className="grid items-end gap-6 border-b border-line pb-9 md:grid-cols-[1fr_auto]">
          <h2 className="m-0 max-w-[22ch] text-balance font-serif font-extralight text-[clamp(36px,4.2vw,60px)] leading-[1.02] tracking-[-0.025em]">
            A few frames from the <em>archive</em>.
          </h2>
          <Link
            href="/work"
            className="inline-flex items-center gap-2.5 border-b border-line pb-1 font-mono text-[11px] uppercase tracking-[0.16em]"
          >
            All six series <span aria-hidden>↗</span>
          </Link>
        </div>
        <div className="grid gap-7 pt-10 md:grid-cols-3">
          {PREVIEW.map((p) => (
            <article key={p.img} className="flex flex-col gap-4">
              <Link
                href="/work"
                className="group relative block aspect-[4/5] w-full overflow-hidden bg-bg-2"
              >
                <Image
                  src={p.img}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[700ms] ease-editorial group-hover:scale-[1.04]"
                />
              </Link>
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
                  <span className="font-semibold text-ink">{p.num}</span>
                  <span>{p.cat}</span>
                </div>
                <h3 className="m-0 font-serif font-light text-[clamp(28px,2.6vw,36px)] leading-none tracking-[-0.025em]">
                  {p.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ───── ZINE + NEWSLETTER ───── */}
      <section id="newsletter" className="border-b border-line-soft bg-paper px-pad pb-pad-y">
        <SectionHead num="04" label="Zine & Sunday letter" date="Vol. 01 · TBD" />

        <div className="grid items-start gap-20 pt-7 md:grid-cols-2">
          {/* Cover */}
          <div className="sticky top-[100px]">
            <div className="relative aspect-zine overflow-hidden shadow-[0_30px_80px_-20px_rgba(24,20,15,0.25),0_8px_20px_-8px_rgba(24,20,15,0.15)] -rotate-[0.6deg]">
              <Image
                src="/images/work/through-the-glass/through-the-glass.jpg"
                alt="Through the Glass — zine cover"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover [filter:grayscale(0.15)_contrast(1.05)]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/75"
              />
              <div className="absolute inset-0 flex flex-col px-9 py-10 text-white">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-90">
                  Vol. 01 · TBD
                </span>
                <span className="mt-auto text-balance font-serif font-light text-[clamp(48px,6vw,84px)] leading-[0.95] tracking-[-0.03em]">
                  <em className="not-italic [font-style:italic] text-white">Through</em> the <em className="not-italic [font-style:italic] text-white">Glass</em>
                </span>
                <span className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] opacity-90">
                  38 photographs · 64 pages · 7×9 in.
                </span>
                <span className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                  Edition of 100 · $32
                </span>
              </div>
            </div>
          </div>

          {/* Side: newsletter */}
          <div className="flex flex-col gap-7">
            <h2 className="m-0 font-serif font-extralight text-[clamp(40px,5vw,72px)] leading-none tracking-[-0.03em]">
              One photograph,
              <br />
              one paragraph,
              <br />
              every Sunday.
            </h2>
            <p className="m-0 max-w-[44ch] font-serif font-light text-[19px] leading-[1.5] text-ink-2">
              The Sunday letter is the one piece of public-facing work I don't outsource to the algorithm. Reserve a copy of the zine and get the letter in the same gesture — they're really the same project at different speeds.
            </p>
            <div className="flex flex-col gap-3.5 border-y border-line py-6">
              <span className="font-serif italic text-[17px] leading-[1.45] text-ink">
                Reserve Vol. 01 &amp; subscribe to the Sunday letter.
              </span>
              <NewsletterForm />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
                ~ No segmentation, no sales sequence · Unsubscribe at the bottom of every email
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ───── CLOSING CTA ───── */}
      <ClosingCta
        eyebrow="§ 05 · Get in touch"
        headline={<>Let's <em>walk</em> first.</>}
        body="A portrait session, a workshop seat, an editorial pitch, or a coffee to talk about whether any of this is a fit. One form, one inbox, one human reading it."
        actions={[
          { label: "Start an inquiry", href: "/contact", primary: true },
          { label: "hi@mannydevelops.com", href: "mailto:hi@mannydevelops.com" },
        ]}
      />
    </>
  );
}
