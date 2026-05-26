import Image from "next/image";
import Link from "next/link";
import { SectionHead } from "@/components/ui/SectionHead";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { PricingGuideForm } from "@/components/forms/PricingGuideForm";
import { TIERS, PROCESS, FAQS, PORTRAITS_SAMPLES } from "@/content/tiers";

export const metadata = { title: "Portraits" };

export default function PortraitsPage() {
  return (
    <>
      {/* Two-column hero */}
      <section className="grid items-stretch md:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col gap-10 border-b border-line-soft px-pad pt-7 pb-14 md:border-b-0 md:border-r">
          <div className="grid grid-cols-[auto_1fr_1fr] items-center border-b border-line pb-7 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-2">
            <div>
              <span className="font-serif text-[32px] font-light italic tracking-[-0.02em] leading-none text-ink normal-case [text-transform:none]">
                § 03
              </span>
            </div>
            <div className="text-center">Personal-branding portraits · NYC</div>
            <div className="flex justify-end gap-2 text-ink-3">
              <span>Booking through Aug</span><span>·</span><span>10-day delivery</span>
            </div>
          </div>

          <h1 className="m-0 font-serif font-extralight text-[clamp(54px,9vw,140px)] leading-[0.9] tracking-[-0.04em]">
            The portrait<br />that doesn&apos;t look<br />like a <em>headshot</em>.
          </h1>

          <p className="m-0 max-w-[52ch] font-serif font-light text-[clamp(18px,1.8vw,22px)] leading-[1.5] text-ink-2">
            For founders, partners, authors, operators, and the occasional artist. One light, one camera, on location in the city. The brief I take is simple: <em>&quot;Make me look like someone you&apos;d want to read about — not someone who just got out of a meeting.&quot;</em>
          </p>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-bg-2 md:aspect-auto">
          <Image
            src="/images/photos/wedding-3.jpg"
            alt="Editorial portrait, daylight"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Portfolio strip — 3×3 grid, all 4/5 */}
      <section className="px-pad py-pad-y">
        <SectionHead num="03.A" label="Recent sittings" date="2024 — 2026" />
        <div className="grid grid-cols-2 gap-4 pt-7 md:grid-cols-3">
          {PORTRAITS_SAMPLES.map((src) => (
            <div key={src} className="relative aspect-[4/5] w-full overflow-hidden bg-bg-2 group">
              <Image
                src={src}
                alt="Portrait sample"
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-[700ms] ease-editorial group-hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="px-pad pb-pad-y">
        <SectionHead num="03.B" label="Process" date="~3 weeks, end-to-end" />
        <div className="grid gap-0 pt-7 md:grid-cols-4">
          {PROCESS.map((step, i) => (
            <div
              key={step.letter}
              className={`flex flex-col gap-3 pb-4 ${i < PROCESS.length - 1 ? "md:border-r md:border-line-hair md:pr-6" : ""} ${i > 0 ? "md:pl-6" : ""}`}
            >
              <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-accent">
                {step.letter}
              </span>
              <h3 className="m-0 font-serif font-light text-[clamp(24px,2.2vw,32px)] leading-none tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="m-0 font-serif font-light text-[15.5px] leading-[1.5] text-ink-2">
                {step.description}
              </p>
              <span className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-3">
                {step.when}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Tiers — dark section */}
      <section className="bg-dark text-dark-fg px-pad py-pad-y">
        <div className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-[18px] pb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-dark-fg/70">
          <span className="font-semibold text-dark-fg">§ 03.C</span>
          <span className="font-medium">Three tiers</span>
          <span aria-hidden className="h-px bg-white/15" />
          <span>All prices NYC · USD · before tax</span>
        </div>

        <div className="grid items-stretch gap-6 pt-8 md:grid-cols-3">
          {TIERS.map((t) => (
            <article
              key={t.name}
              className={`
                relative flex flex-col gap-6 border p-8
                ${
                  t.featured
                    ? "bg-dark-fg text-dark border-dark-fg -translate-y-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]"
                    : "border-dark-fg/20"
                }
              `}
            >
              {t.featured && (
                <span className="absolute -top-3 left-8 inline-block bg-accent px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                  Most booked
                </span>
              )}
              <header className="flex flex-col gap-2">
                <span className={`font-mono text-[14px] font-semibold ${t.featured ? "text-accent" : "text-dark-fg/60"}`}>
                  {t.letter}
                </span>
                <h3 className="m-0 font-serif font-light text-[36px] leading-none tracking-[-0.02em]">
                  {t.name}
                </h3>
                <span className={`font-serif font-light text-[15px] ${t.featured ? "text-dark/70" : "text-dark-fg/70"}`}>
                  {t.description}
                </span>
              </header>
              <div className={`flex items-baseline gap-1 border-y py-5 ${t.featured ? "border-dark/15" : "border-dark-fg/20"}`}>
                <span className={`font-mono text-[14px] ${t.featured ? "text-dark/60" : "text-dark-fg/60"}`}>$</span>
                <span className="font-serif font-light text-[56px] leading-none tracking-[-0.03em]">
                  {t.price}
                </span>
              </div>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className={`flex gap-3 font-serif font-light text-[15.5px] leading-[1.4] ${t.featured ? "text-dark" : "text-dark-fg/90"}`}
                  >
                    <span className={t.featured ? "text-dark/40" : "text-dark-fg/40"}>·</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={t.cta.href}
                className={`
                  mt-auto inline-flex items-center justify-center gap-2 rounded-full px-5 py-3
                  font-mono text-[11px] font-medium uppercase tracking-[0.14em]
                  transition-colors duration-[260ms] ease-editorial
                  ${
                    t.featured
                      ? "bg-dark text-dark-fg border border-dark hover:bg-accent hover:border-accent"
                      : "border border-dark-fg/30 text-dark-fg hover:bg-dark-fg hover:text-dark"
                  }
                `}
              >
                {t.cta.label} <span aria-hidden>↗</span>
              </Link>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-[64ch] text-center font-serif font-light text-[15.5px] italic text-dark-fg/70">
          Every booking starts with a sales call — 30 minutes, coffee, no contract. Studio rentals at Lift (Chelsea), Studio M (Brooklyn), or Pier 59 available if you&apos;d rather not shoot on location.
        </p>
      </section>

      {/* Pricing guide PDF — Kit lead magnet */}
      <aside className="mx-pad my-pad-y grid items-center gap-12 border border-line bg-paper p-9 md:grid-cols-[1fr_1fr] md:p-12">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">
            Pricing guide
          </span>
          <h3 className="m-0 font-serif font-extralight text-[clamp(32px,4vw,52px)] leading-[1.05] tracking-[-0.025em]">
            Take it <em>with you</em>.
          </h3>
          <p className="m-0 max-w-[48ch] font-serif font-light text-[17px] leading-[1.55] text-ink-2">
            A one-page PDF of the three tiers, the process, and the questions clients ask before booking. Useful for forwarding to a partner or sitting with the numbers for a day.
          </p>
        </div>
        <PricingGuideForm />
      </aside>

      {/* FAQ */}
      <section className="px-pad py-pad-y">
        <SectionHead num="03.D" label="Common questions" date="The honest version" />
        <div className="grid gap-x-16 gap-y-10 pt-7 md:grid-cols-2">
          {FAQS.map((f) => (
            <div key={f.q} className="flex flex-col gap-3 border-b border-line-hair pb-8">
              <p className="m-0 font-serif italic text-[19px] leading-[1.35] text-ink">
                {f.q}
              </p>
              <p className="m-0 font-serif font-light text-[16.5px] leading-[1.55] text-ink-2">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <ClosingCta
        eyebrow="§ 03.E · Inquire"
        headline={<>Start with a <em>conversation</em>.</>}
        body="A 30-minute sales call is the first step for every portrait booking. I'll come to a coffee shop or jump on a Zoom — your call. Reply within two business days. Always."
        actions={[
          { label: "Inquire about a portrait", href: "/contact?type=portrait", primary: true },
          { label: "hi@mannydevelops.com", href: "mailto:hi@mannydevelops.com" },
        ]}
      />
    </>
  );
}
