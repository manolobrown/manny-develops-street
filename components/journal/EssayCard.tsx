import Image from "next/image";
import Link from "next/link";
import { formatPostDate, type EssayPost } from "@/lib/journal";

export function EssayCard({ post }: { post: EssayPost }) {
  return (
    <Link
      href={`/journal/${post.slug}`}
      className="group block border-b border-line-hair pb-14 last:border-0 last:pb-0"
    >
      <article className="grid items-start gap-8 md:grid-cols-[1.4fr_1fr]">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg-2">
          <Image
            src={post.hero.src}
            alt={post.hero.alt}
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover transition-transform duration-[700ms] ease-editorial group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">
            <span className="font-semibold text-accent">Essay</span>
            <span>·</span>
            <span>{formatPostDate(post.date)}</span>
            <span>·</span>
            <span>{post.readingMinutes} min</span>
          </div>
          <h2 className="m-0 font-serif font-extralight text-[clamp(28px,3.4vw,44px)] leading-[1.05] tracking-[-0.025em] text-ink">
            {post.title}
          </h2>
          <p className="m-0 max-w-[48ch] font-serif font-light text-[17px] leading-[1.55] text-ink-2">
            {post.dek}
          </p>
          <span className="mt-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors group-hover:text-accent">
            Read essay <span aria-hidden>↗</span>
          </span>
        </div>
      </article>
    </Link>
  );
}
