"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/nav";

export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1 justify-center">
      {NAV_LINKS.map((item) => {
        const isCurrent = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isCurrent ? "page" : undefined}
            className="
              relative px-3.5 py-2.5 font-mono text-[11px] font-medium uppercase
              tracking-[0.14em] text-ink-2 transition-colors duration-[260ms] ease-editorial
              hover:text-ink
              aria-[current=page]:text-ink
              aria-[current=page]:after:content-[''] aria-[current=page]:after:absolute
              aria-[current=page]:after:left-3.5 aria-[current=page]:after:right-3.5
              aria-[current=page]:after:bottom-1 aria-[current=page]:after:h-px
              aria-[current=page]:after:bg-ink
            "
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
