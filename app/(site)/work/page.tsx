import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHead } from "@/components/ui/SectionHead";
import { PressList } from "@/components/ui/PressList";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { SERIES } from "@/content/series";
import { PRESS } from "@/content/press";

export const metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <>
      <PageHeader
        num="02"
        mastCenter="Personal & documentary practice"
        mastRight={
          <>
            <span>6 series</span><span>·</span>
            <span>580+ frames</span><span>·</span>
            <span>2022—now</span>
          </>
        }
        title={<>Personal <em>Work</em></>}
        lede="Six ongoing series. Each picks one neighborhood, one behavior, one hour — and stays there until something honest shows up. The street work is the part of the practice the algorithm can't touch."
      />

      <section className="px-pad">
        {SERIES.map((s, i) => (
          <article
            key={s.number}
            className={`
              grid items-center gap-14 border-b border-line-hair py-16
              md:grid-cols-2
              ${i % 2 === 1 ? "[&>*:first-child]:md:order-2" : ""}
            `}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg-2 group">
              <Image
                src={s.image}
                alt={s.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-[700ms] ease-editorial group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col gap-[18px]">
              <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
                <span className="font-semibold text-accent">{s.number}</span>
                <span>{s.category}</span>
              </div>
              <h2 className="m-0 font-serif font-extralight text-[clamp(36px,4.4vw,68px)] leading-none tracking-[-0.03em]">
                {s.title}
              </h2>
              <p className="m-0 max-w-[50ch] font-serif font-light text-[17px] leading-[1.5] text-ink-2">
                {s.description}
              </p>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-3 border-t border-line-hair pt-4 md:grid-cols-4">
                {[
                  { t: "Frames", d: s.frames as React.ReactNode },
                  { t: "Edit", d: s.edit as React.ReactNode },
                  { t: "Status", d: s.status },
                  { t: "Started", d: s.started as React.ReactNode },
                ].map(({ t, d }) => (
                  <div key={t} className="flex flex-col gap-1">
                    <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-3">{t}</dt>
                    <dd className="m-0 font-serif text-[16px] font-light text-ink">{d}</dd>
                  </div>
                ))}
              </dl>
              <div>
                <Link
                  href="#"
                  className="
                    inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5
                    font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink
                    transition-colors duration-[260ms] ease-editorial
                    hover:bg-ink hover:text-bg
                  "
                >
                  View series <span aria-hidden>↗</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section id="editorial" className="px-pad pb-pad-y">
        <SectionHead num="02.B" label="Editorial credits" date="Selected · 2024 — 2026" />
        <div className="px-pad">
          <PressList items={PRESS} />
        </div>
      </section>

      <ClosingCta
        eyebrow="§ 02.C · For editors"
        headline={<>Pitching <em>this</em>?</>}
        body="Editors: full-resolution research portfolios available on request, plus project notes and locations. Reply within two business days."
        actions={[
          { label: "Request portfolio", href: "/contact?type=editorial", primary: true },
          { label: "editorial@mannydevelops.com", href: "mailto:editorial@mannydevelops.com" },
        ]}
      />
    </>
  );
}
