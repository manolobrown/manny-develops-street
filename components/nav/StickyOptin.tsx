"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "mp-optin-dismissed";

export function StickyOptin() {
  const [state, setState] = useState<"hidden" | "shown" | "thanks" | "dismissed">("hidden");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(STORAGE_KEY) === "1") {
      setState("dismissed");
      return;
    }
    const onScroll = () => {
      if (window.scrollY > 600) setState((s) => (s === "hidden" ? "shown" : s));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(STORAGE_KEY, "1");
    setState("dismissed");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) return;
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, form: "sticky" }),
      });
    } catch {
      // Show the thank-you regardless — the subscriber experience shouldn't
      // hinge on a flaky network call. The server logs the failure.
    }
    setState("thanks");
    setTimeout(dismiss, 1400);
  };

  if (state === "hidden" || state === "dismissed") return null;

  return (
    <div
      role="dialog"
      aria-label="Free preset pack"
      className="
        fixed left-1/2 bottom-[18px] z-[60] -translate-x-1/2
        flex items-center gap-[18px]
        rounded-full bg-ink text-bg
        py-2.5 pl-[22px] pr-3.5
        shadow-[0_16px_40px_-12px_rgba(0,0,0,0.35)]
        max-w-[calc(100%-32px)]
        animate-[so-rise_0.45s_cubic-bezier(0.2,0.6,0.2,1)]
      "
      style={{ ['--rise' as string]: '' }}
    >
      {state === "shown" && (
        <>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] opacity-70 whitespace-nowrap">
            ★ Free · Lightroom preset pack
          </span>
          <span className="font-serif text-[17px] tracking-[-0.005em] whitespace-nowrap">
            Three presets, on the house. <em className="italic text-bg">One email.</em>
          </span>
          <form
            onSubmit={onSubmit}
            className="flex items-center gap-1 rounded-full bg-white/10 py-1 pl-3.5 pr-1"
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-[180px] border-none bg-transparent text-[13px] text-bg outline-none
                font-sans placeholder:text-white/50
              "
            />
            <button
              type="submit"
              className="
                rounded-full bg-bg text-ink px-3.5 py-2
                font-mono text-[10px] font-medium uppercase tracking-[0.14em] whitespace-nowrap
              "
            >
              Send it ↗
            </button>
          </form>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="
              flex h-7 w-7 items-center justify-center rounded-full
              border border-white/20 bg-transparent text-bg text-[12px]
              transition-[border-color] duration-[260ms] ease-editorial hover:border-white/40
            "
          >
            ✕
          </button>
        </>
      )}
      {state === "thanks" && (
        <span className="font-serif text-[16px] px-2">✓ On its way — check your inbox.</span>
      )}
    </div>
  );
}
