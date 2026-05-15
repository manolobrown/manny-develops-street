"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/newsletter", { method: "POST", body: data });
      if (!res.ok) throw new Error();
      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="border-y border-line py-6 font-serif italic text-[17px] text-ink">
        ✓ On its way — check your inbox to confirm.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex overflow-hidden rounded-full border border-line">
      <input
        type="email"
        name="email"
        required
        placeholder="you@somewhere.com"
        className="flex-1 border-none bg-transparent px-[18px] py-3.5 font-sans text-[14px] text-ink outline-none placeholder:text-ink-3"
      />
      <button
        type="submit"
        disabled={state === "sending"}
        className="
          bg-ink px-[22px] py-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-bg
          transition-opacity hover:opacity-[0.88] disabled:opacity-50
        "
      >
        {state === "sending" ? "Sending…" : state === "error" ? "Try again" : "Subscribe"}
      </button>
    </form>
  );
}
