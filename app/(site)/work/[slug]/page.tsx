import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHead } from "@/components/ui/SectionHead";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { SERIES, findSeries } from "@/content/series";

export function generateStaticParams() {
  return SERIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const series = findSeries(slug);
  if (!series) return { title: "Series not found" };
  return {
    title: series.titleText,
    description: series.description,
  };
}

export default async function SeriesPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const series = findSeries(slug);
  if (!series) notFound();

  return (
    <>
      {/* Mast row */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-line-soft px-pad pt-7 pb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-2">
        <span>
          <span className="font-semibold text-ink">§ 02 · {series.number}</span>
          <span className="ml-3 text-ink-3">{series.category}</span>
        </span>
        <span className="text-center">{series.titleText}</span>
        <span className="justify-self-end">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-ink-3 transition-colors duration-[260ms] ease-editorial hover:text-ink"
          >
            <span aria-hidden>←</span> All work
          </Link>
        </span>
      </div>

      {/* Hero */}
      <section className="px-pad pt-7">
        <figure className="relative m-0 aspect-[4/3] w-full overflow-hidden bg-bg-2">
          <Image
            src={series.image}
            alt={series.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-55% to-[rgba(20,17,13,0.65)]"
          />
          <figcaption className="absolute inset-x-7 bottom-7 z-[2] flex flex-wrap items-end justify-between gap-4 text-white">
            <h1 className="m-0 max-w-[16ch] text-balance font-serif font-extralight text-[clamp(54px,9vw,140px)] leading-[0.9] tracking-[-0.035em]">
              {series.title}
            </h1>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] opacity-90">
              {series.frames} frames · {series.started}
            </span>
          </figcaption>
        </figure>
      </section>

      {/* Body grid: prose + stats */}
      <section className="px-pad py-pad-y">
        <div className="grid items-start gap-16 md:grid-cols-[1.6fr_1fr]">
          <div className="flex flex-col gap-7">
            <p className="m-0 max-w-[58ch] font-serif font-light text-[clamp(20px,2.2vw,28px)] leading-[1.35] tracking-[-0.012em] text-balance">
              {series.description}
            </p>
            {series.longDescription && (
              <p className="m-0 max-w-[58ch] font-serif font-light text-[17px] leading-[1.55] text-ink-2">
                {series.longDescription}
              </p>
            )}
          </div>

          <aside className="md:sticky md:top-[100px] md:self-start">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-line py-6">
              {[
                { t: "Frames", d: series.frames as React.ReactNode },
                { t: "Edit", d: series.edit as React.ReactNode },
                { t: "Status", d: series.status },
                { t: "Started", d: series.started as React.ReactNode },
                ...(series.years ? [{ t: "Years", d: series.years as React.ReactNode }] : []),
                ...(series.locations?.length
                  ? [{ t: "Locations", d: series.locations.join(" · ") as React.ReactNode }]
                  : []),
              ].map(({ t, d }) => (
                <div key={t} className="flex flex-col gap-1">
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-3">{t}</dt>
                  <dd className="m-0 font-serif text-[17px] font-light text-ink">{d}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {/* Conditional frames gallery — populated by CMS later */}
      {series.galleryFrames && series.galleryFrames.length > 0 && (
        <section className="px-pad pb-pad-y">
          <SectionHead num="02.A" label="Frames" date={`${series.galleryFrames.length} of ${series.frames}`} />
          <div className="grid gap-6 pt-7 md:grid-cols-2 lg:grid-cols-3">
            {series.galleryFrames.map((frame, i) => (
              <figure key={i} className="m-0 flex flex-col gap-2">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-bg-2">
                  <Image
                    src={frame.src}
                    alt={frame.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                {frame.caption && (
                  <figcaption className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-3">
                    {frame.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Mid-page CTA strip */}
      <aside
        className="
          mx-pad mb-pad-y grid items-center gap-9 border border-line bg-paper p-9
          md:grid-cols-[auto_1fr_auto]
        "
      >
        <div className="flex flex-col gap-1 font-mono text-[10.5px] uppercase tracking-[0.18em]">
          <span>From this series</span>
          <em className="font-serif text-[24px] font-light not-italic [font-style:italic] tracking-[-0.02em] leading-none text-accent normal-case [text-transform:none]">
            Prints &amp; pitches
          </em>
        </div>
        <p className="m-0 text-balance font-serif font-light text-[clamp(17px,2vw,22px)] leading-[1.4] tracking-[-0.01em] text-ink-2">
          Most frames in {series.titleText} can be made to order as archival prints. Editors: full-resolution research portfolios available on request.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/contact?type=print&series=${series.slug}`}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-[260ms] ease-editorial hover:bg-ink hover:text-bg"
          >
            Request a print <span aria-hidden>↗</span>
          </Link>
          <Link
            href={`/contact?type=editorial&series=${series.slug}`}
            className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink hover:text-accent"
          >
            Editorial inquiry <span aria-hidden>↗</span>
          </Link>
        </div>
      </aside>

      <ClosingCta
        eyebrow="§ 02.C · For editors"
        headline={<>Pitching <em>this</em>?</>}
        body={`Full-resolution research portfolios for ${series.titleText}, project notes, and locations on request. Reply within two business days.`}
        actions={[
          { label: "Request portfolio", href: `/contact?type=editorial&series=${series.slug}`, primary: true },
          { label: "editorial@mannydevelops.com", href: "mailto:editorial@mannydevelops.com" },
        ]}
      />
    </>
  );
}
