import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/photo/Photo";
import { PressList } from "@/components/ui/PressList";
import { SERIES } from "@/content/series";
import { PRESS, PRESS_VERIFIED } from "@/content/press";
import { getAllPhotos, getSeriesPhotos, seriesCover } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Work",
  description: "Six ongoing street photography series from New York — subway windows, nights, steam, hard light, rain and snow.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const totalFrames = getAllPhotos().length;

  return (
    <>
      <header className="px-pad pt-8 pb-12">
        <div className="flex items-center justify-between border-b border-line-soft pb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">
          <span className="text-ink">Work</span>
          <span className="tabular-nums">
            {String(SERIES.length).padStart(2, "0")} series · {totalFrames} frames
          </span>
        </div>
        <p className="mt-10 mb-0 max-w-[52ch] text-[clamp(18px,1.8vw,22px)] leading-[1.45] text-ink-2 [text-wrap:pretty]">
          Six ongoing series. Each picks one neighborhood, one behavior, one hour — and stays there until something
          honest shows up.
        </p>
      </header>

      {/* Series index: large names, hover reveals the cover (desktop); covers inline on mobile. */}
      <ol className="m-0 list-none px-pad pb-pad-y">
        {SERIES.map((s) => {
          const cover = seriesCover(s);
          const count = getSeriesPhotos(s.slug).length;
          return (
            <li key={s.slug} className="border-t border-line-hair last:border-b">
              <Link
                href={`/work/${s.slug}`}
                className="group relative grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-4 py-6 md:grid-cols-[64px_1fr_auto] md:py-5"
              >
                <span className="hidden font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3 md:block">
                  N°{s.number}
                </span>
                <span className="flex items-start gap-2">
                  <span className="text-[clamp(40px,7.5vw,112px)] font-medium leading-[0.95] tracking-[-0.045em] transition-colors duration-[260ms] group-hover:text-ink-2">
                    {s.title}
                  </span>
                  <sup className="mt-[0.6em] font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3 tabular-nums">
                    {String(count).padStart(2, "0")}
                  </sup>
                </span>
                <span className="hidden text-right font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3 sm:block">
                  {s.category}
                  <br />
                  <span className="text-ink-2">{s.status}</span>
                </span>

                {/* Mobile: cover inline */}
                <span className="col-span-full md:hidden">
                  <Photo photo={cover} alt="" sizes="100vw" className="max-h-[60vh] w-auto" />
                </span>

                {/* Desktop: floating cover on hover/focus */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-[22%] top-1/2 z-10 hidden w-[min(28vw,380px)] -translate-y-1/2 opacity-0 transition-opacity duration-[260ms] group-hover:opacity-100 group-focus-visible:opacity-100 md:block"
                >
                  <Photo photo={cover} alt="" sizes="380px" className="w-full" />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      {PRESS_VERIFIED && (
        <section id="editorial" className="px-pad pb-pad-y">
          <h2 className="mb-6 font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-ink-3">
            Editorial credits
          </h2>
          <PressList items={PRESS} />
        </section>
      )}
    </>
  );
}
