"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SERIES } from "@/content/series";
import { PRINTS } from "@/content/shop";

const INTENTS = [
  { letter: "A", id: "print", strong: "A print", em: "Editioned or made to order" },
  { letter: "B", id: "editorial", strong: "Editorial / licensing", em: "Pitch, license, or assignment" },
  { letter: "C", id: "other", strong: "Something else", em: "Presets, collab, hello" },
] as const;

type Intent = (typeof INTENTS)[number]["id"];

function deriveIntent(type: string | null): Intent | null {
  switch (type) {
    case "print":
      return "print";
    case "editorial":
      return "editorial";
    case "preset-pack":
    case "other":
      return "other";
    default:
      return null;
  }
}

function deriveContext(args: {
  type: string | null;
  series: string | null;
  printId: string | null;
  size: string | null;
}): string | null {
  const { type, series, printId, size } = args;
  if (printId) {
    const p = PRINTS.find((x) => x.id === printId);
    if (!p) return null;
    return [p.id, p.title.replace(/\.$/, ""), size].filter(Boolean).join(" · ");
  }
  if (series) {
    const s = SERIES.find((x) => x.slug === series);
    return s ? `${s.title} series` : null;
  }
  if (type === "preset-pack") return "Lightroom presets · Full pack";
  return null;
}

export function ContactForm() {
  const params = useSearchParams();
  const typeParam = params.get("type");
  const seriesParam = params.get("series");
  const printIdParam = params.get("id");
  const sizeParam = params.get("size");

  const initialIntent = useMemo(() => deriveIntent(typeParam), [typeParam]);

  const context = useMemo(
    () => deriveContext({ type: typeParam, series: seriesParam, printId: printIdParam, size: sizeParam }),
    [typeParam, seriesParam, printIdParam, sizeParam],
  );

  const [intent, setIntent] = useState<Intent | null>(initialIntent);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    if (intent) data.set("intent", intent);
    if (context) data.set("context", context);
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
      {context && (
        <div className="-mb-5 flex items-baseline justify-between gap-3 border border-line bg-paper px-5 py-3">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
            Re:
          </span>
          <span className="flex-1 font-sans text-[16px] text-ink">
            {context}
          </span>
          <a
            href="/contact"
            className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3 hover:text-accent"
          >
            Clear
          </a>
        </div>
      )}

      {/* Intent picker */}
      <div className="flex flex-col gap-5">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-3">
          01 · What&apos;s this about?
        </span>
        <div className="grid gap-3 md:grid-cols-3">
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
                <span className="flex flex-col gap-1 font-sans">
                  <strong className="font-medium text-[17px] text-ink">{it.strong}</strong>
                  <span className={`text-[14px] ${on ? "text-ink" : "text-ink-2"}`}>{it.em}</span>
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
          label={<>04 · Company or outlet <em className="font-sans text-[13px] italic text-ink-3 normal-case">(if applicable)</em></>}
          id="company"
          placeholder="Gallery · Magazine · Studio"
        />
        <Field label="05 · Rough timing" id="when" placeholder="Next 4 weeks · June · flexible · etc." />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-3">
        <label htmlFor="message" className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-3">
          06 · What are you after?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Two or three sentences. I'll read every word. Don't worry about pitching — just describe what's in your head."
          className="min-h-[120px] w-full resize-y border border-line-soft bg-transparent px-4 py-3.5 font-sans text-[17px] text-ink outline-none placeholder:text-ink-3 focus:border-ink"
        />
      </div>

      <p className="m-0 font-sans italic text-[15px] leading-[1.5] text-ink-2">
        You&apos;ll get a personal reply within two business days. If we&apos;ve worked together before, just say so — I&apos;ll find our last thread.
      </p>

      <button
        type="submit"
        disabled={state === "sending"}
        className="
          inline-flex w-fit items-center gap-3 self-start bg-ink px-6 py-3.5
          font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-bg
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
      <label htmlFor={id} className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-3">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full border-b border-line-soft bg-transparent py-3 font-sans text-[17px] text-ink outline-none placeholder:text-ink-3 focus:border-ink"
      />
    </div>
  );
}
