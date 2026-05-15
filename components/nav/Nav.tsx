import Link from "next/link";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  return (
    <header
      className="
        sticky top-0 z-50 grid grid-cols-[auto_1fr_auto] items-center gap-8
        px-pad py-4 border-b border-line-soft backdrop-blur-md
        bg-[color-mix(in_srgb,var(--hp-bg)_92%,transparent)]
      "
    >
      <Link href="/" className="grid grid-cols-[auto_auto] grid-rows-[auto_auto] items-center gap-x-3">
        <span
          className="
            row-span-2 flex h-[38px] w-[38px] items-center justify-center
            rounded-full border border-line font-mono text-[11px] font-semibold tracking-[0.02em]
          "
        >
          M·P
        </span>
        <span className="font-serif text-[18px] font-normal leading-none tracking-[-0.01em]">
          Manuel Peña
        </span>
        <span className="mt-1 font-mono text-[9.5px] uppercase leading-none tracking-[0.16em] text-ink-3">
          Street &amp; Portraits · NYC
        </span>
      </Link>

      <NavLinks />

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Link
          href="/contact"
          className="
            inline-flex items-center gap-2 rounded-full bg-ink px-[18px] py-3
            font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-bg
            transition-opacity duration-[260ms] ease-editorial hover:opacity-[0.88]
          "
        >
          Book a session<span aria-hidden>↗</span>
        </Link>
      </div>
    </header>
  );
}
