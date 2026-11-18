import Link from "next/link";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  return (
    <header
      className="
        sticky top-0 z-50 grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-2 lg:gap-x-8
        px-pad pt-4 pb-2 lg:py-4 border-b border-line-soft backdrop-blur-md
        bg-[color-mix(in_srgb,var(--hp-bg)_92%,transparent)]
      "
    >
      <Link href="/" className="grid grid-cols-[auto_auto] grid-rows-[auto_auto] items-center gap-x-3">
        <span
          className="
            row-span-2 flex h-[38px] w-[38px] items-center justify-center
            border border-line font-mono text-[11px] tracking-[0.02em]
          "
        >
          M·P
        </span>
        <span className="font-sans text-[17px] font-medium leading-none tracking-[-0.02em]">
          Manuel Peña
        </span>
        <span className="mt-1 whitespace-nowrap font-mono text-[10px] uppercase leading-none tracking-[0.08em] text-ink-3">
          Street Photography · NYC
        </span>
      </Link>

      <NavLinks />

      <div className="col-start-3 row-start-1 flex items-center gap-3 justify-self-end">
        <ThemeToggle />
        <Link
          href="/shop"
          className="
            hidden items-center gap-2 border border-line-soft px-4 py-2.5 sm:inline-flex
            font-mono text-[11px] uppercase tracking-[0.08em] text-ink
            transition-colors duration-[260ms] ease-editorial hover:border-line
          "
        >
          Prints<span aria-hidden>↗</span>
        </Link>
      </div>
    </header>
  );
}
