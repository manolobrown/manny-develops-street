import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { PERSON } from "@/lib/site";

export const metadata = {
  title: "About",
  description: "Manuel Peña is a New York street photographer working in six ongoing series.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...PERSON }} />
      <PageHeader
        num="07"
        mastCenter="About · Statement · Press"
        mastRight={<span>Working since 2016</span>}
        title="Manuel Peña"
        lede="Brooklyn-born, Manhattan-based. Day job in tech, photographer every other waking hour since 2016."
      />

      <section className="grid gap-12 px-pad py-pad-y md:grid-cols-[1fr_1.4fr] md:gap-16">
        <figure className="m-0 md:sticky md:top-[100px] md:self-start">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-bg-2">
            <Image
              src="/images/headshot.jpg"
              alt="Manuel Peña"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
            Self-portrait · NYC · Aug 2024
          </figcaption>
        </figure>

        <div className="flex flex-col gap-14">
          <section className="flex flex-col gap-4">
            <h2 className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-3">
              Artist statement
            </h2>
            <p className="m-0 font-sans font-light text-[clamp(20px,2.2vw,28px)] leading-[1.4] tracking-[-0.012em]">
              {/* TODO(manny): statement trimmed to street-only after removing the portrait practice — review the wording. */}
              I photograph what&apos;s already there.
            </p>
            <p className="m-0 font-sans font-light text-[17px] leading-[1.55] text-ink-2">
              On the street, that means six ongoing series picked one neighborhood at a time, shot at the hour when something specific happens — a train line, a season, an hour of night — and staying there until something honest shows up.
            </p>
          </section>

          <section className="flex flex-col gap-4 border-t border-line-hair pt-10">
            <h2 className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-3">
              Bio (short)
            </h2>
            <p className="m-0 font-sans font-light text-[17px] leading-[1.55] text-ink-2">
              Manuel Peña (b. 1979) is a New York street &amp; documentary photographer. His goal is to tell stories using light, shadow, composition and color. He has only one rule: shoot anything that interests you and the pieces will fall into place.
            </p>
          </section>

        </div>
      </section>
    </>
  );
}
