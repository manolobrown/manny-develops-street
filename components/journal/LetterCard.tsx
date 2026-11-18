import Image from "next/image";
import Link from "next/link";
import { formatPostDate, type LetterPost } from "@/lib/journal";

export function LetterCard({ post }: { post: LetterPost }) {
  return (
    <Link
      href={`/journal/${post.slug}`}
      className="group block border-b border-line-hair pb-14 last:border-0 last:pb-0"
    >
      <article className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg-2">
          <Image
            src={post.hero.src}
            alt={post.hero.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-[700ms] ease-editorial group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
            <span className="font-semibold text-ink">Letter</span>
            <span>·</span>
            <span>Vol 01 · Week {String(post.weekNumber).padStart(2, "0")}</span>
            <span>·</span>
            <span>{formatPostDate(post.date)}</span>
          </div>
          <h3 className="m-0 font-serif font-light text-[clamp(22px,2.4vw,32px)] leading-[1.15] tracking-[-0.015em] text-ink">
            {post.title}
          </h3>
          <p className="m-0 max-w-[48ch] font-serif italic text-[16.5px] leading-[1.5] text-ink-2">
            {post.excerpt}
          </p>
          <span className="mt-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors group-hover:text-accent">
            Read letter <span aria-hidden>↗</span>
          </span>
        </div>
      </article>
    </Link>
  );
}
