import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Viewer } from "@/components/photo/Viewer";
import { JsonLd } from "@/components/seo/JsonLd";
import { SERIES, findSeries } from "@/content/series";
import { findPhoto, getSeriesPhotos, photoHref } from "@/lib/photos";
import { SITE, PERSON } from "@/lib/site";

export function generateStaticParams() {
  return SERIES.flatMap((s) => getSeriesPhotos(s.slug).map((p) => ({ slug: s.slug, frame: p.id })));
}

export async function generateMetadata(props: PageProps<"/work/[slug]/[frame]">): Promise<Metadata> {
  const { slug, frame } = await props.params;
  const series = findSeries(slug);
  const photo = findPhoto(slug, frame);
  if (!series || !photo) return { title: "Frame not found" };
  const title = `${photo.label} · ${series.title}`;
  return {
    title,
    description: photo.alt,
    alternates: { canonical: photoHref(photo) },
    openGraph: {
      title,
      description: photo.alt,
      images: [{ url: photo.src, width: photo.width, height: photo.height, alt: photo.alt }],
    },
  };
}

export default async function FramePage(props: PageProps<"/work/[slug]/[frame]">) {
  const { slug, frame } = await props.params;
  const series = findSeries(slug);
  const photos = getSeriesPhotos(slug);
  const index = photos.findIndex((p) => p.id === frame);
  if (!series || index === -1) notFound();
  const photo = photos[index];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Photograph",
          name: `${photo.label} · ${series.title}`,
          description: photo.alt,
          image: `${SITE}${photo.src}`,
          url: `${SITE}${photoHref(photo)}`,
          creator: PERSON,
          isPartOf: { "@type": "CreativeWorkSeries", name: series.title, url: `${SITE}/work/${slug}` },
        }}
      />
      <h1 className="sr-only">
        {series.title}, {photo.label}
      </h1>
      <Viewer mode="page" seriesSlug={slug} seriesTitle={series.title} photos={photos} index={index} />
    </>
  );
}
