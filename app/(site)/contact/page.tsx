import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        mastCenter="Prints · Editorial · Hello"
        mastRight={<span>Reply in 2 business days</span>}
        title={<>Let&apos;s <em>walk</em> first.</>}
        lede="One form, one inbox, one human reading it — me. Tell me what you're after and I'll route the conversation from there."
      />

      <section className="grid gap-16 px-pad py-pad-y md:grid-cols-[1fr_1.6fr]">
        <aside className="flex flex-col gap-10 md:sticky md:top-[100px] md:self-start">
          <div className="flex flex-col gap-3">
            <h2 className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-3">
              Direct lines
            </h2>
            <p className="m-0 font-sans font-light text-[17px] leading-[1.55] text-ink-2">
              For anything fast or specific:
            </p>
            <div className="flex flex-col gap-3 pt-2">
              <a
                href="mailto:hi@mannydevelops.com"
                className="font-sans text-[18px] text-ink underline decoration-line-soft underline-offset-4 hover:text-accent hover:decoration-accent"
              >
                hi@mannydevelops.com
              </a>
              <a
                href="mailto:editorial@mannydevelops.com"
                className="font-sans text-[18px] text-ink underline decoration-line-soft underline-offset-4 hover:text-accent hover:decoration-accent"
              >
                editorial@mannydevelops.com
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-line-hair pt-10">
            <h2 className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-3">
              Where I work
            </h2>
            <p className="m-0 font-sans font-light text-[17px] leading-[1.55] text-ink-2">
              Based in Manhattan, NYC.
            </p>
          </div>

          <div className="flex flex-col gap-3 border-t border-line-hair pt-10">
            <h2 className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-3">
              Quick notes
            </h2>
            <p className="m-0 font-sans font-light text-[17px] leading-[1.55] text-ink-2">
              <strong className="font-medium text-ink">Prints:</strong>{" "}name the frame (e.g. TTG·07) and the size you have in mind. <strong className="font-medium text-ink">Editorial:</strong>{" "}share the outlet, deadline, and a sentence about the angle. <strong className="font-medium text-ink">Other:</strong>{" "}just say what you&apos;ve got and I&apos;ll figure it out.
            </p>
          </div>
        </aside>

        <Suspense fallback={<div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">Loading form…</div>}>
          <ContactForm />
        </Suspense>
      </section>
    </>
  );
}
