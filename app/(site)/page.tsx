import Link from "next/link";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Photo } from "@/components/photo/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SERIES } from "@/content/series";
import { getAllPhotos, getSeriesPhotos, photoBySrc, photoHref, seriesCover, type Photo as PhotoData } from "@/lib/photos";
import { PERSON, SITE, SITE_NAME } from "@/lib/site";

const LEAD = "/images/work/shadow-play/shadow-play-8.jpg";

// The home-page edit: a dozen frames across all six series, set in fixed rows
// so every row fills the width (no orphan on the last line).
const SELECTED_ROWS = [
  [
    "/images/work/through-the-glass/through-the-glass-7.jpg",
    "/images/work/after-dark/after-dark-6.jpg",
    "/images/work/steam-city/steam-city.jpg",
  ],
  [
    "/images/work/reflections/reflections-5.jpg",
    "/images/work/white-out/white-out-5.jpg",
  ],
  [
    "/images/work/through-the-glass/through-the-glass-3.jpg",
    "/images/work/after-dark/after-dark.jpg",
    "/images/work/shadow-play/shadow-play-4.jpg",
    "/images/work/reflections/reflections-7.jpg",
  ],
  [
    "/images/work/steam-city/steam-city-8.jpg",
    "/images/work/after-dark/after-dark-2.jpg",
    "/images/work/white-out/white-out.jpg",
  ],
];

function mustFind(src: string): PhotoData {
  const p = photoBySrc(src);
  if (!p) throw new Error(`Home page references ${src}, which isn't in any series`);
  return p;
}

export default function HomePage() {
  const lead = mustFind(LEAD);
  const rows = SELECTED_ROWS.map((row) => row.map(mustFind));
  const selected = rows.flat();
  const totalFrames = getAllPhotos().length;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE,
          author: PERSON,
        }}
      />

      {/* Lead frame — full viewport, never cropped */}
      <section className="px-pad pt-6">
        <Link href={photoHref(lead)} className="block">
          <Photo
            photo={lead}
            priority
            sizes="100vw"
            className="mx-auto max-h-[calc(100svh-150px)] w-auto"
          />
        </Link>
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">
          <span>
            <span className="text-ink">{lead.label}</span> · {lead.seriesTitle}
          </span>
          <span>New York · 40.71° N 74.00° W</span>
        </div>
      </section>

      {/* Statement */}
      <section className="grid items-end gap-10 px-pad pt-24 pb-20 md:grid-cols-[1.5fr_1fr]">
        <h1 className="m-0 text-[clamp(40px,6vw,96px)] font-medium leading-[0.95] tracking-[-0.04em]">
          Manuel Peña photographs New York at street level.
        </h1>
        <div className="flex flex-col gap-5">
          <p className="m-0 max-w-[40ch] text-[17px] leading-[1.55] text-ink-2 [text-wrap:pretty]">
            Six ongoing series, each with its own rules — a train line, a season, an hour of night. A zine a year pulled
            from the strongest of it.
          </p>
          <dl className="m-0 grid grid-cols-3 gap-4 border-t border-line-soft pt-4 font-mono text-[11px] uppercase tracking-[0.08em]">
            {[
              { t: "Since", d: "2016" },
              { t: "Series", d: String(SERIES.length).padStart(2, "0") },
              { t: "On site", d: String(totalFrames) },
            ].map(({ t, d }) => (
              <div key={t} className="flex flex-col gap-1">
                <dt className="text-ink-3">{t}</dt>
                <dd className="m-0 text-ink">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Selected — justified rows across all series */}
      <section aria-labelledby="selected" className="px-pad pb-pad-y">
        <div className="mb-6 flex items-baseline justify-between border-b border-line-soft pb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">
          <h2 id="selected" className="m-0 font-normal text-ink">
            Selected
          </h2>
          <span className="tabular-nums">{String(selected.length).padStart(2, "0")} frames</span>
        </div>
        {/* Desktop: each row is justified to full width. Phones: one frame per line. */}
        <ol className="m-0 flex list-none flex-col gap-2.5 p-0">
          {rows.map((row, i) => (
            <li key={i}>
              <ol className="m-0 flex list-none flex-col gap-2.5 p-0 md:flex-row">
                {row.map((p) => (
                  <li
                    key={p.src}
                    className="md:[flex:var(--ar)_1_0%]"
                    style={{ "--ar": (p.width / p.height).toFixed(4) } as React.CSSProperties}
                  >
                    <Link href={photoHref(p)} className="group block">
                      <Photo
                        photo={p}
                        sizes="(min-width: 768px) 40vw, 100vw"
                        className="w-full transition-opacity duration-[260ms] group-hover:opacity-85"
                      />
                      <span className="mt-1.5 block font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3 transition-colors group-hover:text-ink">
                        {p.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </section>

      {/* Series */}
      <section aria-labelledby="series" className="px-pad pb-pad-y">
        <div className="mb-6 flex items-baseline justify-between border-b border-line-soft pb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">
          <h2 id="series" className="m-0 font-normal text-ink">
            Series
          </h2>
          <Link href="/work" className="hover:text-ink">
            Index <span aria-hidden>→</span>
          </Link>
        </div>
        <ol className="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-10 p-0 md:grid-cols-3 lg:grid-cols-6">
          {SERIES.map((s) => {
            const cover = seriesCover(s);
            return (
              <li key={s.slug}>
                <Link href={`/work/${s.slug}`} className="group flex flex-col gap-3">
                  <span className="relative block aspect-square">
                    <Photo
                      photo={cover}
                      alt=""
                      sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 50vw"
                      className="absolute bottom-0 left-0 max-h-full w-auto max-w-full transition-opacity duration-[260ms] group-hover:opacity-85"
                    />
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
                      N°{s.number} · {String(getSeriesPhotos(s.slug).length).padStart(2, "0")}
                    </span>
                    <span className="text-[20px] font-medium leading-tight tracking-[-0.02em]">{s.title}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="border-t border-line-soft px-pad py-pad-y">
        <div className="grid items-end gap-10 md:grid-cols-[1.5fr_1fr]">
          <h2 className="m-0 text-[clamp(36px,5vw,72px)] font-medium leading-[0.95] tracking-[-0.04em]">
            New work, straight to your inbox.
          </h2>
          <div className="flex flex-col gap-4">
            <p className="m-0 max-w-[44ch] text-[16px] leading-[1.55] text-ink-2">
              An occasional letter with new photographs and essays — and first word when Vol. 01 of the zine,{" "}
              <em>Through the Glass</em>, opens for reservations.
            </p>
            <NewsletterForm />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
              No sales sequence · Unsubscribe in every email
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
