"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/nav";

export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Primary"
      className="order-last col-span-full -mx-1.5 flex min-w-0 justify-between lg:order-none lg:col-span-1 lg:mx-0 lg:justify-center lg:gap-1"
    >
      {NAV_LINKS.map((item) => {
        const isCurrent = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isCurrent ? "page" : undefined}
            className="
              relative shrink-0 px-1.5 py-2.5 font-mono text-[11px] uppercase max-[359px]:px-1 max-[359px]:text-[10px] lg:px-3
              tracking-[0.08em] text-ink-2 transition-colors duration-[260ms] ease-editorial
              hover:text-ink
              aria-[current=page]:text-ink
              aria-[current=page]:after:content-[''] aria-[current=page]:after:absolute
              aria-[current=page]:after:left-1.5 aria-[current=page]:after:right-1.5 lg:aria-[current=page]:after:left-3 lg:aria-[current=page]:after:right-3
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
