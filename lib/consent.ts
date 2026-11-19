"use client";

import { useSyncExternalStore } from "react";

/**
 * Analytics cookie consent, kept in localStorage and shared by the banner,
 * the footer "Cookie settings" link, Google Analytics and the opt-in bar.
 *
 * - "granted" / "denied": the visitor chose.
 * - null: no choice yet (banner shows).
 * useConsent() also returns "unknown" during server render and hydration.
 */
export type Consent = "granted" | "denied" | null;

const KEY = "mp-analytics-consent";
const EVENT = "mp-consent-change";

/** Google Analytics only runs, and the banner only asks, when an ID is set. */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

function read(): Consent {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function useConsent(): Consent | "unknown" {
  return useSyncExternalStore<Consent | "unknown">(subscribe, read, () => "unknown");
}

export function setConsent(value: Consent) {
  try {
    if (value) window.localStorage.setItem(KEY, value);
    else window.localStorage.removeItem(KEY);
  } catch {
    // Storage blocked: the choice lasts for this page view only.
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Withdraw consent: drop Google Analytics cookies and reload so gtag is gone. */
export function resetConsent() {
  const wasGranted = read() === "granted";
  setConsent(null);
  if (!wasGranted) return;
  const host = window.location.hostname;
  const domains = ["", host, "." + host, "." + host.replace(/^www\./, "")];
  for (const name of document.cookie.split(";").map((c) => c.split("=")[0].trim())) {
    if (!name.startsWith("_ga")) continue;
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
    }
  }
  window.location.reload();
}
