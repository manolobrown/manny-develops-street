import { notFound } from "next/navigation";
import { Viewer } from "@/components/photo/Viewer";
import { SERIES, findSeries } from "@/content/series";
import { getSeriesPhotos } from "@/lib/photos";

export function generateStaticParams() {
  return SERIES.flatMap((s) => getSeriesPhotos(s.slug).map((p) => ({ slug: s.slug, frame: p.id })));
}

export default async function FrameModal(props: PageProps<"/work/[slug]/[frame]">) {
  const { slug, frame } = await props.params;
  const series = findSeries(slug);
  const photos = getSeriesPhotos(slug);
  const index = photos.findIndex((p) => p.id === frame);
  if (!series || index === -1) notFound();

  return <Viewer mode="modal" seriesSlug={slug} seriesTitle={series.title} photos={photos} index={index} />;
}
