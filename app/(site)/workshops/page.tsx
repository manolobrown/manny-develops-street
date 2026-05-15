import Link from "next/link";
import { SectionHead } from "@/components/ui/SectionHead";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { WORKSHOPS } from "@/content/workshops";

export const metadata = { title: "Workshops" };

const WHAT = [
  {
    tag: "A · The walk",
    h: <>A <em>route</em>, not a tour.</>,
    body: "A defined neighborhood, picked for what it does best at that hour. I'll set five shooting prompts and we'll move on each one. No lecturing, no marching — just looking, together, for three hours.",
  },
  {
    tag: "B · The format",
    h: <>Five to eight cameras. <em>One coffee shop</em>.</>,
    body: "We end at a coffee shop with a laptop on the table. Everyone airdrops me their best six frames; I edit live, project on the laptop, talk through what's working and what isn't. Honest, not harsh.",
  },
  {
    tag: "C · The takeaway",
    h: <>Five photos you&apos;re <em>proud of</em>.</>,
    body: "You leave with five frames you'd actually print, an edited list of next-Saturday assignments, and the start of a small community of photographers who'll keep showing up.",
  },
];

export default function WorkshopsPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-line-soft px-pad pt-7 pb-pad-y">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-line pb-7 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-2">
          <div>
            <span className="font-serif text-[32px] font-light italic tracking-[-0.02em] leading-none text-ink normal-case [text-transform:none]">
              § 04
            </span>
          </div>
          <div className="text-center">Saturday walks · Year-round · NYC</div>
          <div className="flex justify-end gap-2 text-ink-3">
            <span>Next: May 23</span><span>·</span><span>6 / 8 seats</span>
          </div>
        </div>

        <div className="mt-12 grid items-end gap-16 md:grid-cols-[1.4fr_1fr]">
          <h1 className="m-0 font-serif font-extralight text-[clamp(64px,11vw,180px)] leading-[0.88] tracking-[-0.04em]">
            Saturday <em>walks</em>.<br />
            Three hours.<br />
            Coffee on me.
          </h1>
          <p className="m-0 font-serif font-light text-[clamp(18px,1.8vw,22px)] leading-[1.5] text-ink-2 [text-wrap:pretty]">
            A small-format photo walk through a part of the city I know cold. You bring the camera you already own. I bring the prompts, the route, and a frankly opinionated edit at the end.
          </p>
        </div>
      </section>

      {/* What it is */}
      <section className="px-pad py-pad-y">
        <SectionHead num="04.A" label="What it is, what it isn't" date="Beginners welcome. Cameras of any kind." />
        <div className="grid gap-10 pt-7 md:grid-cols-3">
          {WHAT.map((w, i) => (
            <div
              key={w.tag}
              className={`flex flex-col gap-4 ${i < WHAT.length - 1 ? "md:border-r md:border-line-hair md:pr-8" : ""} ${i > 0 ? "md:pl-2" : ""}`}
            >
              <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-accent">
                {w.tag}
              </span>
              <h3 className="m-0 font-serif font-light text-[clamp(26px,2.6vw,38px)] leading-[1.05] tracking-[-0.02em]">
                {w.h}
              </h3>
              <p className="m-0 font-serif font-light text-[16.5px] leading-[1.55] text-ink-2">
                {w.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-line-hair px-pad py-pad-y">
        <SectionHead num="04.B" label="Two formats" date="Open enrollment" />
        <div className="grid gap-6 pt-7 md:grid-cols-2">
          {[
            { letter: "A.", name: <em>The Walk</em>, price: "$200", body: "Three hours, one neighborhood, 5–8 photographers. Saturday mornings, 9 AM – 12 PM. Rain or shine. Coffee on me.", note: "Runs 2× per month · Eventbrite enrollment" },
            { letter: "B.", name: <em>The Intensive</em>, price: "$400", body: "Full Saturday, 10 AM – 6 PM. One project, one neighborhood, edited in front of the room. Max 5 photographers. Lunch included.", note: "Runs 1× per month · Application-based" },
          ].map((p, i) => (
            <article key={i} className="flex flex-col gap-5 border border-line-soft bg-paper p-9">
              <span className="font-mono text-[14px] font-semibold text-accent">{p.letter}</span>
              <h3 className="m-0 font-serif font-light text-[40px] leading-none tracking-[-0.025em]">
                {p.name}
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="font-serif font-light text-[48px] leading-none tracking-[-0.02em]">{p.price}</span>
                <em className="font-serif text-[16px] italic text-ink-3">/ seat</em>
              </div>
              <p className="m-0 font-serif font-light text-[16.5px] leading-[1.55] text-ink-2">{p.body}</p>
              <p className="m-0 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">{p.note}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Upcoming dates */}
      <section className="px-pad py-pad-y">
        <SectionHead num="04.C" label="Upcoming" date="Through August · Reserve below" />
        <ol className="m-0 list-none p-0 pt-4">
          {WORKSHOPS.map((w) => {
            const isFull = w.state === "full";
            const isIntensive = w.state === "intensive";
            return (
              <li
                key={w.date}
                className={`
                  grid items-center gap-4 border-b border-line-hair py-5
                  md:grid-cols-[100px_1fr_auto_auto]
                  ${isFull ? "opacity-70" : ""}
                  ${isIntensive ? "bg-paper px-2" : ""}
                  transition-all duration-[260ms] ease-editorial hover:bg-paper hover:px-2
                `}
              >
                <span className="flex flex-col font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-3">
                  <strong className="font-serif text-[20px] font-normal not-italic [font-style:normal] tracking-[-0.01em] text-ink normal-case [text-transform:none]">{w.date}</strong>
                  <span>{w.weekday} · {w.time}</span>
                </span>
                <span className="font-serif font-light text-[18px] leading-[1.35] text-ink">
                  {isIntensive && (
                    <span className="mr-3 inline-block bg-ink px-2 py-0.5 align-middle font-mono text-[9.5px] font-semibold uppercase tracking-[0.18em] text-bg">
                      Intensive
                    </span>
                  )}
                  {w.title}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
                  {w.seats} · {w.price}
                </span>
                {isFull ? (
                  <Link
                    href={w.href}
                    className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-3 hover:text-accent"
                  >
                    Full · Join waitlist
                  </Link>
                ) : (
                  <Link
                    href={w.href}
                    className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink hover:text-accent"
                  >
                    {isIntensive ? "Apply →" : "Reserve →"}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      {/* Testimonial */}
      <section className="px-pad py-pad-y">
        <SectionHead num="04.D" label="From past walks" date="~ 140 attendees · 2024–26" />
        <div className="mx-auto max-w-[68ch] pt-10 text-center">
          <blockquote className="m-0 font-serif font-extralight text-[clamp(24px,2.8vw,36px)] leading-[1.35] tracking-[-0.012em] text-balance">
            &quot;Three hours with Manny changed how I see <em>my own block</em>. I&apos;ve taken walks with bigger names — none of them edited my photos in front of me at a coffee shop. That&apos;s the thing I keep recommending him for.&quot;
          </blockquote>
          <span className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
            — P. Tanaka · partner, Greenpoint design studio · 3× attendee
          </span>
        </div>
      </section>

      <ClosingCta
        eyebrow="§ 04.E · Reserve a seat"
        headline={<>Bring the <em>camera</em>.</>}
        body="iPhone or Leica, it doesn't matter. The looking is the work; the gear is just what you use to record it. Private group rates available for teams of 4+."
        actions={[
          { label: "Reserve a public walk", href: "/contact?type=workshop", primary: true },
          { label: "Book a private group", href: "/contact?type=private" },
        ]}
      />
    </>
  );
}
