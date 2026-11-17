import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Photo } from "@/components/photo/Photo";
import { SeriesViews } from "@/components/photo/SeriesViews";
import { JsonLd } from "@/components/seo/JsonLd";
import { SERIES, findSeries } from "@/content/series";
import { getSeriesPhotos, photoHref, seriesCover } from "@/lib/photos";
import { PERSON, SITE } from "@/lib/site";

export function generateStaticParams() {
  return SERIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const series = findSeries(slug);
  if (!series) return { title: "Series not found" };
  const cover = seriesCover(series);
  return {
    title: series.title,
    description: series.description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${series.title} — Manuel Peña`,
      description: series.description,
      images: [{ url: cover.src, width: cover.width, height: cover.height, alt: cover.alt }],
    },
  };
}

export default async function SeriesPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const series = findSeries(slug);
  if (!series) notFound();

  const photos = getSeriesPhotos(slug);
  const i = SERIES.indexOf(series);
  const nextSeries = SERIES[(i + 1) % SERIES.length];
  const nextCover = seriesCover(nextSeries);

  const facts = [
    { t: "Frames", d: String(photos.length).padStart(2, "0") },
    { t: "Status", d: series.status },
    series.edit ? { t: "Edit", d: series.edit } : null,
    series.started ? { t: "Started", d: series.started } : null,
  ].filter((x): x is { t: string; d: string } => x !== null);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: series.title,
          description: series.description,
          url: `${SITE}/work/${slug}`,
          creator: PERSON,
          image: photos.map((p) => ({
            "@type": "ImageObject",
            contentUrl: `${SITE}${p.src}`,
            url: `${SITE}${photoHref(p)}`,
            name: p.label,
            description: p.alt,
            width: p.width,
            height: p.height,
          })),
        }}
      />

      {/* Header */}
      <header className="px-pad pt-8 pb-14">
        <div className="flex items-center justify-between border-b border-line-soft pb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">
          <span>
            <span className="text-ink">N°{series.number}</span>
            <span className="mx-2">/</span>
            {series.code}
            <span className="mx-2">/</span>
            {series.category}
          </span>
          <Link href="/work" className="hover:text-ink">
            <span aria-hidden>←</span> All series
          </Link>
        </div>

        <div className="mt-10 grid items-end gap-10 md:grid-cols-[1.5fr_1fr]">
          <h1 className="m-0 text-[clamp(52px,9vw,148px)] font-medium leading-[0.9] tracking-[-0.045em]">
            {series.title}
          </h1>
          <div className="flex flex-col gap-6">
            <p className="m-0 max-w-[46ch] text-[18px] leading-[1.5] text-ink-2 [text-wrap:pretty]">
              {series.description}
            </p>
            <dl className="m-0 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line-soft pt-4">
              {facts.map(({ t, d }) => (
                <div key={t} className="flex flex-col gap-0.5">
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">{t}</dt>
                  <dd className="m-0 text-[15px] text-ink">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </header>

      {series.longDescription && (
        <section className="px-pad pb-20">
          <p className="m-0 ml-auto max-w-[62ch] border-l border-line-soft pl-6 text-[16px] leading-[1.65] text-ink-2 md:mr-[8%]">
            {series.longDescription}
          </p>
        </section>
      )}

      <SeriesViews photos={photos} />

      {/* Prints & editorial */}
      <aside className="mx-pad mb-24 grid gap-6 border-y border-line-soft py-8 md:grid-cols-[1fr_auto] md:items-center">
        <p className="m-0 max-w-[60ch] text-[16px] leading-[1.55] text-ink-2">
          Frames marked <span aria-hidden className="mx-0.5 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-accent" /> Print
          are editioned on Hahnemühle Photo Rag. Any other frame from {series.title} can be printed to order; editors can
          request a full-resolution research portfolio.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/contact?type=print&series=${series.slug}`}
            className="inline-flex items-center gap-2 border border-line px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink transition-colors hover:bg-ink hover:text-bg"
          >
            Ask about a print <span aria-hidden>↗</span>
          </Link>
          <Link
            href={`/contact?type=editorial&series=${series.slug}`}
            className="inline-flex items-center gap-2 px-1 py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-2 hover:text-ink"
          >
            Editorial inquiry <span aria-hidden>↗</span>
          </Link>
        </div>
      </aside>

      {/* Next series */}
      <Link
        href={`/work/${nextSeries.slug}`}
        className="group mx-pad mb-pad-y grid items-end gap-6 md:grid-cols-[1fr_auto]"
      >
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">
            Next series · N°{nextSeries.number}
          </span>
          <span className="text-[clamp(40px,6vw,96px)] font-medium leading-[0.92] tracking-[-0.04em] transition-colors group-hover:text-ink-2">
            {nextSeries.title} <span aria-hidden className="text-ink-3">→</span>
          </span>
        </div>
        <Photo photo={nextCover} alt="" sizes="240px" className="hidden max-h-[180px] w-auto md:block" />
      </Link>
    </>
  );
}
