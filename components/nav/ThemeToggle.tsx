"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const noopSubscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // False during server render and hydration, true after: the theme is only
  // known on the client, so the icon waits until then.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="
        flex h-9 w-9 items-center justify-center
        border border-line-soft text-ink-2
        transition-colors duration-[260ms] ease-editorial
        hover:border-line hover:text-ink
      "
    >
      <span aria-hidden className="font-mono text-[12px]">
        {mounted ? (isDark ? "☀" : "☾") : "·"}
      </span>
    </button>
  );
}
