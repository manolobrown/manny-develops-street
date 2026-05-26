import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { PricingGuideForm } from "@/components/forms/PricingGuideForm";

export const metadata = { title: "Portraits" };

export default function PortraitsPage() {
  return (
    <>
      <PageHeader
        num="03"
        mastCenter="Personal-branding portraits · NYC"
        mastRight={<span>Booking opens late 2026</span>}
        title={<>The portrait that doesn&apos;t look like a <em>headshot</em>.</>}
        lede={
          <>
            For founders, partners, authors, operators, and the occasional artist. One light, one camera, on location in the city. The brief I take is simple: <em>&quot;Make me look like someone you&apos;d want to read about — not someone who just got out of a meeting.&quot;</em>
          </>
        }
      />

      <section className="px-pad py-pad-y">
        <div className="mx-auto max-w-[860px]">
          <article className="flex flex-col gap-7 border border-line bg-paper px-9 py-12 md:px-12 md:py-14">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">
              Coming soon
            </span>
            <h2 className="m-0 font-serif font-extralight text-[clamp(36px,4.4vw,60px)] leading-[1.05] tracking-[-0.025em]">
              Booking opens <em>late 2026</em>.
            </h2>
            <p className="m-0 max-w-[58ch] font-serif font-light text-[18px] leading-[1.55] text-ink-2">
              I&apos;m shooting the portfolio sessions now — the kind of editorial portraits I&apos;d want to read about, not the kind you take in front of a grey backdrop. When booking opens, subscribers get the pricing guide first, then the studio dates.
            </p>
            <div className="border-t border-line-hair pt-6">
              <PricingGuideForm />
            </div>
            <p className="m-0 font-serif italic text-[15px] leading-[1.5] text-ink-2">
              Editor on assignment with a deadline before then?{" "}
              <Link
                href="/contact?type=editorial"
                className="text-ink underline decoration-line-soft underline-offset-4 hover:text-accent hover:decoration-accent"
              >
                Email me directly
              </Link>
              .
            </p>
          </article>
        </div>
      </section>

      <ClosingCta
        eyebrow="§ 03.A · Pre-launch"
        headline={<>Already <em>know</em> what you&apos;re after?</>}
        body="If you've got a portrait need that can't wait — a press kit, an editorial deadline, a partner who's going to sit for it once and never again — send a note. Pre-launch bookings are case-by-case."
        actions={[
          { label: "Start a conversation", href: "/contact?type=portrait", primary: true },
          { label: "hi@mannydevelops.com", href: "mailto:hi@mannydevelops.com" },
        ]}
      />
    </>
  );
}
