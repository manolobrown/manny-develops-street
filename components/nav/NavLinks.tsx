"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/nav";

export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Primary"
      className="order-last col-span-full -mx-3 flex min-w-0 gap-1 overflow-x-auto [scrollbar-width:none] md:order-none md:col-span-1 md:mx-0 md:justify-center"
    >
      {NAV_LINKS.map((item) => {
        const isCurrent = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isCurrent ? "page" : undefined}
            className="
              relative shrink-0 px-3 py-2.5 font-mono text-[11px] uppercase
              tracking-[0.08em] text-ink-2 transition-colors duration-[260ms] ease-editorial
              hover:text-ink
              aria-[current=page]:text-ink
              aria-[current=page]:after:content-[''] aria-[current=page]:after:absolute
              aria-[current=page]:after:left-3 aria-[current=page]:after:right-3
              aria-[current=page]:after:bottom-1 aria-[current=page]:after:h-px
              aria-[current=page]:after:bg-accent
            "
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
