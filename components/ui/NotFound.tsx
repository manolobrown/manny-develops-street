import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";

type Props = {
  what: string;
  title: string;
  body: string;
  href: string;
  cta: string;
};

/** Shared 404 body: the same masthead as every other page, plus one way back. */
export function NotFound({ what, title, body, href, cta }: Props) {
  return (
    <>
      <PageHeader label="404" mastCenter={what} mastRight={<span>Page not found</span>} title={title} lede={body} />
      <div className="px-pad py-12">
        <Link
          href={href}
          className="inline-flex items-center gap-2 border border-line px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-ink transition-colors duration-[260ms] ease-editorial hover:bg-ink hover:text-bg"
        >
          {cta} <span aria-hidden>→</span>
        </Link>
      </div>
    </>
  );
}
