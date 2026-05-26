import Link from "next/link";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export const metadata = { title: "Workshops" };

export default function WorkshopsPage() {
  return (
    <>
      {/* Page header — kept inline since the gated state benefits from a fuller hero than PageHeader gives */}
      <section className="border-b border-line-soft px-pad pt-7 pb-pad-y">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-line pb-7 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-2">
          <div>
            <span className="font-serif text-[32px] font-light italic tracking-[-0.02em] leading-none text-ink normal-case [text-transform:none]">
              § 04
            </span>
          </div>
          <div className="text-center">Saturday walks · Year-round · NYC</div>
          <div className="flex justify-end gap-2 text-ink-3">
            <span>First walks open this fall</span>
          </div>
        </div>

        <div className="mt-12 grid items-end gap-16 md:grid-cols-[1.4fr_1fr]">
          <h1 className="m-0 font-serif font-extralight text-[clamp(64px,11vw,180px)] leading-[0.88] tracking-[-0.04em]">
            Saturday <em>walks</em>.
            <br />
            Three hours.
            <br />
            Coffee on me.
          </h1>
          <p className="m-0 font-serif font-light text-[clamp(18px,1.8vw,22px)] leading-[1.5] tracking-[-0.005em] text-ink-2 [text-wrap:pretty]">
            A small-format photo walk through a part of the city I know cold. You bring the camera you already own. I bring the prompts, the route, and a frankly opinionated edit at the end.
          </p>
        </div>
      </section>

      <section className="px-pad py-pad-y">
        <div className="mx-auto max-w-[860px]">
          <article className="flex flex-col gap-7 border border-line bg-paper px-9 py-12 md:px-12 md:py-14">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">
              Coming soon
            </span>
            <h2 className="m-0 font-serif font-extralight text-[clamp(36px,4.4vw,60px)] leading-[1.05] tracking-[-0.025em]">
              First walks launch <em>this fall</em>.
            </h2>
            <p className="m-0 max-w-[58ch] font-serif font-light text-[18px] leading-[1.55] text-ink-2">
              Five to eight cameras, one neighborhood, one edit at a coffee shop afterward. The first public Saturday walk runs once the route notes are in shape — sometime this fall. The Sunday letter is where the first dates go up.
            </p>
            <div className="border-t border-line-hair pt-6">
              <NewsletterForm />
            </div>
            <p className="m-0 font-serif italic text-[15px] leading-[1.5] text-ink-2">
              Got a private group of four or more asking already?{" "}
              <Link
                href="/contact?type=workshop&kind=private"
                className="text-ink underline decoration-line-soft underline-offset-4 hover:text-accent hover:decoration-accent"
              >
                Send a note
              </Link>
              .
            </p>
          </article>
        </div>
      </section>

      <ClosingCta
        eyebrow="§ 04.A · Pre-launch"
        headline={<>Bring the <em>camera</em>.</>}
        body="iPhone or Leica, it doesn't matter. The looking is the work; the gear is just what you use to record it. Private group rates available for teams of 4+ ahead of the public launch."
        actions={[
          { label: "Book a private group", href: "/contact?type=workshop&kind=private", primary: true },
          { label: "Join the waitlist", href: "#newsletter" },
        ]}
      />
    </>
  );
}
