"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

const INTENTS = [
  { letter: "A", id: "portrait", strong: "A portrait session", em: "Essentials · Signature · Executive" },
  { letter: "B", id: "workshop", strong: "A workshop seat", em: "Public walk or full-day intensive" },
  { letter: "C", id: "editorial", strong: "Editorial / press", em: "Pitch, license, or assignment" },
  { letter: "D", id: "other", strong: "Something else", em: "Coffee, hello, collab, idea" },
] as const;

export function ContactForm() {
  const params = useSearchParams();
  const initialIntent =
    params.get("type") ||
    (params.get("tier") ? "portrait" : null);
  const [intent, setIntent] = useState<string | null>(initialIntent);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    if (intent) data.set("intent", intent);
    try {
      const res = await fetch("/api/contact", { method: "POST", body: data });
      if (!res.ok) throw new Error();
      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-10">
      {/* Intent picker */}
      <div className="flex flex-col gap-5">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-3">
          01 · What&apos;s this about?
        </span>
        <div className="grid gap-3 md:grid-cols-2">
          {INTENTS.map((it) => {
            const on = intent === it.id;
            return (
              <button
                type="button"
                key={it.id}
                onClick={() => setIntent(it.id)}
                aria-pressed={on}
                className={`
                  flex items-start gap-4 border p-5 text-left transition-colors duration-[260ms] ease-editorial
                  ${on ? "border-ink bg-paper" : "border-line-soft hover:border-line"}
                `}
              >
                <span className={`font-mono text-[18px] font-semibold ${on ? "text-accent" : "text-ink-3"}`}>
                  {it.letter}
                </span>
                <span className="flex flex-col gap-1 font-serif">
                  <strong className="font-normal text-[17px] text-ink">{it.strong}</strong>
                  <em className={`text-[14px] italic ${on ? "text-accent" : "text-ink-2"}`}>{it.em}</em>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Name + Email */}
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="02 · Your name" id="name" placeholder="First & last" required />
        <Field label="03 · Email" id="email" type="email" placeholder="you@somewhere.com" required />
      </div>

      {/* Company + When */}
      <div className="grid gap-6 md:grid-cols-2">
        <Field
          label={<>04 · Company or outlet <em className="font-serif text-[13px] italic text-ink-3 normal-case">(if applicable)</em></>}
          id="company"
          placeholder="Acme Inc. · NYMag · etc."
        />
        <Field label="05 · Rough timing" id="when" placeholder="Next 4 weeks · June · flexible · etc." />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-3">
        <label htmlFor="message" className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-3">
          06 · What are you after?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Two or three sentences. I'll read every word. Don't worry about pitching — just describe what's in your head."
          className="min-h-[120px] w-full resize-y border border-line-soft bg-transparent px-4 py-3.5 font-serif text-[17px] text-ink outline-none placeholder:text-ink-3 focus:border-ink"
        />
      </div>

      <p className="m-0 font-serif italic text-[15px] leading-[1.5] text-ink-2">
        You&apos;ll get a personal reply within two business days. If you&apos;re a previous client or attendee, just say so — I&apos;ll find our last thread.
      </p>

      <button
        type="submit"
        disabled={state === "sending"}
        className="
          inline-flex w-fit items-center gap-3 self-start rounded-full bg-ink px-6 py-3.5
          font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-bg
          transition-opacity duration-[260ms] ease-editorial
          hover:opacity-[0.88] disabled:opacity-50
        "
      >
        {state === "sent"
          ? "Sent · I'll be in touch"
          : state === "sending"
            ? "Sending…"
            : state === "error"
              ? "Something went wrong · try again"
              : "Send the inquiry"}{" "}
        <span aria-hidden>↗</span>
      </button>
    </form>
  );
}

function Field({
  label,
  id,
  type = "text",
  placeholder,
  required = false,
}: {
  label: React.ReactNode;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id} className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-3">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full border-b border-line-soft bg-transparent py-3 font-serif text-[17px] text-ink outline-none placeholder:text-ink-3 focus:border-ink"
      />
    </div>
  );
}
