import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        num="06"
        mastCenter="Inquiries · Sales calls · Editorial"
        mastRight={<span>Reply in 2 business days</span>}
        title={<>Let&apos;s <em>walk</em> first.</>}
        lede="One form, one inbox, one human reading it — me. Tell me what you're after and I'll route the conversation from there. Every portrait booking starts with a 30-minute sales call."
      />

      <section className="grid gap-16 px-pad py-pad-y md:grid-cols-[1fr_1.6fr]">
        <aside className="flex flex-col gap-10 md:sticky md:top-[100px] md:self-start">
          <div className="flex flex-col gap-3">
            <h2 className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-3">
              Direct lines
            </h2>
            <p className="m-0 font-serif font-light text-[17px] leading-[1.55] text-ink-2">
              For anything fast or specific:
            </p>
            <div className="flex flex-col gap-3 pt-2">
              <a
                href="mailto:hi@mannydevelops.com"
                className="font-serif text-[18px] italic text-ink underline decoration-line-soft underline-offset-4 hover:text-accent hover:decoration-accent"
              >
                hi@mannydevelops.com
              </a>
              <a
                href="mailto:editorial@mannydevelops.com"
                className="font-serif text-[18px] italic text-ink underline decoration-line-soft underline-offset-4 hover:text-accent hover:decoration-accent"
              >
                editorial@mannydevelops.com
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-line-hair pt-10">
            <h2 className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-3">
              Where I work
            </h2>
            <p className="m-0 font-serif font-light text-[17px] leading-[1.55] text-ink-2">
              Based in Manhattan, NYC.
            </p>
            <p className="m-0 font-serif font-light text-[17px] leading-[1.55] text-ink-2">
              Most sessions are on location — your office, a rooftop, a sidewalk between meetings. Studio rentals available at Lift (Chelsea), Studio M (Brooklyn), or Pier 59.
            </p>
            <p className="m-0 pt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
              Tue – Sat · 9 – 6
              <br />
              Closed Sunday &amp; Monday
            </p>
          </div>

          <div className="flex flex-col gap-3 border-t border-line-hair pt-10">
            <h2 className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-3">
              Quick notes
            </h2>
            <p className="m-0 font-serif font-light text-[17px] leading-[1.55] text-ink-2">
              <em>Portraits:</em> include rough date range &amp; intended use. <em>Workshops:</em> tell me which date. <em>Editorial:</em> share the outlet, deadline, and a sentence about the angle. <em>Other:</em> just say what you&apos;ve got and I&apos;ll figure it out.
            </p>
          </div>
        </aside>

        <Suspense fallback={<div className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">Loading form…</div>}>
          <ContactForm />
        </Suspense>
      </section>
    </>
  );
}
