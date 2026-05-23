"use client";

import { useState } from "react";

export function PresetsForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("sending");
    const form = e.currentTarget;
    const email = (new FormData(form).get("email") as string | null)?.trim();
    if (!email) return setState("error");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, form: "presets" }),
      });
      if (!res.ok) throw new Error();
      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="mt-auto flex flex-col gap-2 border-t border-line-hair pt-5">
        <span className="font-serif italic text-[17px] text-ink">
          ✓ Check your inbox to confirm.
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
          Download link arrives right after you click the confirm button.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-auto flex flex-col gap-3">
      <div className="flex overflow-hidden rounded-full border border-line">
        <input
          type="email"
          name="email"
          required
          placeholder="you@somewhere.com"
          aria-label="Email address"
          className="flex-1 border-none bg-transparent px-[18px] py-3 font-sans text-[14px] text-ink outline-none placeholder:text-ink-3"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="
            bg-ink px-[22px] py-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-bg
            transition-opacity hover:opacity-[0.88] disabled:opacity-50
          "
        >
          {state === "sending" ? "Sending…" : state === "error" ? "Try again" : "Send the pack ↗"}
        </button>
      </div>
      <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
        One email · No follow-up sequence · Unsubscribe at the bottom of every email
      </span>
    </form>
  );
}
