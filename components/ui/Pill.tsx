import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "solid" | "outline";

type BaseProps = {
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

const base =
  "inline-flex items-center gap-2 rounded-full px-[18px] py-3 font-mono text-[11px] " +
  "font-medium uppercase tracking-[0.14em] transition-all duration-[260ms] ease-editorial";

const variantClass: Record<Variant, string> = {
  solid: "bg-ink text-bg hover:opacity-[0.88]",
  outline: "border border-line text-ink hover:bg-ink hover:text-bg",
};

export function Pill({
  href,
  variant = "solid",
  arrow = false,
  className = "",
  children,
  ...rest
}: BaseProps & ({ href: string } | { href?: undefined } & ComponentProps<"button">)) {
  const content = (
    <>
      {children}
      {arrow && <span aria-hidden>↗</span>}
    </>
  );
  const cls = `${base} ${variantClass[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <button className={cls} {...(rest as ComponentProps<"button">)}>
      {content}
    </button>
  );
}
