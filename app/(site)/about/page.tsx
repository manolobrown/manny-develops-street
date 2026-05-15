import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { PressList } from "@/components/ui/PressList";
import { PRESS } from "@/content/press";

export const metadata = { title: "About" };

const FACTS: Array<[string, React.ReactNode]> = [
  ["Member", "NYPPA · ICP · ASMP"],
  ["Insurance", "$2M general liability, full year"],
  ["Studio partners", "Lift · Studio M · Pier 59"],
  ["Camera", "Leica Q3 · Fujifilm X-T5"],
  ["Light", "Godox AD200 · 36″ octa"],
  ["Catalog", "Lightroom · 280,515 frames"],
  ["Billing", "Honeybook · Net 15"],
  ["Hours", "Tue – Sat · 9 — 6"],
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        num="06"
        mastCenter="About · Statement · Press"
        mastRight={<span>Working since 2016</span>}
        title={<>Manuel <em>Peña</em></>}
        lede="Brooklyn-born, Manhattan-based. Day job in tech, photographer every other waking hour since 2016. The hybrid practice is the structure I landed on after years of pretending the street work and the portrait work were two different things."
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
          <figcaption className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-3">
            Self-portrait · Inwood · Aug 2024
          </figcaption>
        </figure>

        <div className="flex flex-col gap-14">
          <section className="flex flex-col gap-4">
            <h2 className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-3">
              Artist statement
            </h2>
            <p className="m-0 font-serif font-light text-[clamp(20px,2.2vw,28px)] leading-[1.4] tracking-[-0.012em]">
              Two practices, <em>one eye</em>. The street work earns the right to make portraits that don&apos;t feel like corporate portraits. The portrait work funds another year of street work. The brand is whole because the practice is whole.
            </p>
            <p className="m-0 font-serif font-light text-[17px] leading-[1.55] text-ink-2">
              I photograph what&apos;s already there. On the street, that means six ongoing series picked one neighborhood at a time, shot at the hour when something specific happens. With portrait clients, it means meeting them where they already are — the office, a rooftop, a sidewalk on the walk between meetings — and waiting for the moment where they stop performing.
            </p>
            <p className="m-0 font-serif font-light text-[17px] leading-[1.55] text-ink-2">
              The thing I&apos;m working out, frame by frame, is whether what a street photographer notices about a stranger can become what a portrait photographer notices about a client. I think it can. Every shoot is an argument for that.
            </p>
          </section>

          <section className="flex flex-col gap-4 border-t border-line-hair pt-10">
            <h2 className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-3">
              Currently
            </h2>
            <p className="m-0 font-serif font-light text-[17px] leading-[1.55] text-ink-2">
              <em>Year 1, Month 4</em> of the hybrid plan. Vol. 01 of the zine (<em>Through the Glass</em>) is at press in Brooklyn, shipping June 14. Workshops are running 2× monthly with a waitlist on Soho dates. Three Signature portrait clients booked through August, one editorial pitch out the door to The Cut.
            </p>
            <p className="m-0 font-serif font-light text-[17px] leading-[1.55] text-ink-2">
              Looking for: one founder profile, one author working on a book jacket, and one creative-industry partner who wants a six-frame editorial-style piece for a press kit. Reply within two business days.
            </p>
          </section>

          <section className="flex flex-col gap-4 border-t border-line-hair pt-10">
            <h2 className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-3">
              Bio (short)
            </h2>
            <p className="m-0 font-serif font-light text-[17px] leading-[1.55] text-ink-2">
              Manuel Peña (b. 1989) is a New York street &amp; documentary photographer working primarily with personal-branding portrait clients. His ongoing series have been featured in <em>New York Magazine</em>, <em>Curbed</em>, <em>Document Journal</em>, and <em>The Cut</em>. He is a member of the NYPPA, ICP, and ASMP. He lives in Inwood.
            </p>
          </section>

          <section className="flex flex-col gap-4 border-t border-line-hair pt-10">
            <h2 className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-3">
              Selected press &amp; credits
            </h2>
            <PressList items={PRESS} />
          </section>

          <section className="flex flex-col gap-4 border-t border-line-hair pt-10">
            <h2 className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-3">
              Working details
            </h2>
            <dl className="grid grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-2">
              {FACTS.map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1 border-b border-line-hair py-3">
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-3">{k}</dt>
                  <dd className="m-0 font-serif font-light text-[17px] text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </section>
    </>
  );
}
