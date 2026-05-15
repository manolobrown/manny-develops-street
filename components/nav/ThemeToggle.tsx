"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="
        flex h-9 w-9 items-center justify-center rounded-full
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
