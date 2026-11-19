"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { GA_ID, resetConsent, setConsent, useConsent } from "@/lib/consent";

/**
 * Google Analytics loads only after the visitor accepts. Until they choose,
 * a small banner asks. Vercel Web Analytics (cookieless) runs separately in
 * the root layout and needs no consent.
 */
export function ConsentedAnalytics() {
  const consent = useConsent();
  if (!GA_ID || consent === "unknown") return null;

  if (consent === "granted") return <GoogleAnalytics gaId={GA_ID} />;
  if (consent === "denied") return null;

  return (
    <aside
      aria-label="Analytics cookies"
      className="
        fixed inset-x-4 bottom-4 z-[70] mx-auto flex max-w-[640px] flex-col gap-4
        bg-ink p-5 text-bg shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)]
        sm:flex-row sm:items-center sm:justify-between sm:gap-6
      "
    >
      <p className="m-0 font-sans text-[14px] leading-[1.5]">
        Can I use Google Analytics to see which photographs people look at? It sets cookies only if you say yes.
      </p>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => setConsent("denied")}
          className="border border-bg/30 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-bg transition-colors hover:border-bg"
        >
          No thanks
        </button>
        <button
          type="button"
          onClick={() => setConsent("granted")}
          className="bg-bg px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink transition-opacity hover:opacity-85"
        >
          Accept
        </button>
      </div>
    </aside>
  );
}

/** Footer link that clears the choice so the banner asks again. */
export function CookieSettingsButton({ className = "" }: { className?: string }) {
  const consent = useConsent();
  if (!GA_ID || consent === "unknown" || consent === null) return null;
  return (
    <button
      type="button"
      onClick={resetConsent}
      className={`cursor-pointer bg-transparent p-0 uppercase tracking-[0.08em] text-ink-3 hover:text-ink ${className}`}
    >
      Cookie settings
    </button>
  );
}
