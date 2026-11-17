import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/journal/mdx-components";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { findSeries } from "@/content/series";
import { formatPostDate, getJournalPost, getJournalPosts } from "@/lib/journal";

export function generateStaticParams() {
  return getJournalPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/journal/[slug]">) {
  const { slug } = await props.params;
  const post = getJournalPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.type === "essay" ? post.dek : post.excerpt,
  };
}

export default async function JournalPostPage(props: PageProps<"/journal/[slug]">) {
  const { slug } = await props.params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  const allPosts = getJournalPosts();
  const idx = allPosts.findIndex((p) => p.slug === slug);
  const older = idx < allPosts.length - 1 ? allPosts[idx + 1] : null;
  const newer = idx > 0 ? allPosts[idx - 1] : null;
  const series = post.series ? findSeries(post.series) : null;

  const isLetter = post.type === "letter";

  return (
    <>
      {/* Mast row */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-line-soft px-pad pt-7 pb-4 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-2">
        <span>
          <span className="font-semibold text-ink">
            {isLetter ? "Letter" : "Essay"}
          </span>
          <span className="ml-3 text-ink-3">
            {isLetter
              ? `Vol 01 · Week ${String(post.weekNumber).padStart(2, "0")}`
              : `${post.readingMinutes} min read`}
          </span>
        </span>
        <span className="text-center">{formatPostDate(post.date)}</span>
        <span className="justify-self-end">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-ink-3 transition-colors duration-[260ms] ease-editorial hover:text-ink"
          >
            <span aria-hidden>←</span> All entries
          </Link>
        </span>
      </div>

      {/* Hero */}
      <section className="px-pad pt-7">
        <figure
          className={`relative m-0 w-full overflow-hidden bg-bg-2 ${
            isLetter
              ? "mx-auto aspect-[4/5] max-h-[78vh] max-w-[760px]"
              : "aspect-[16/9]"
          }`}
        >
          <Image
            src={post.hero.src}
            alt={post.hero.alt}
            fill
            priority
            sizes={isLetter ? "(min-width: 768px) 760px, 100vw" : "100vw"}
            className="object-cover"
          />
        </figure>
      </section>

      {/* Title + body */}
      <section className="px-pad py-pad-y">
        <article
          className={`mx-auto flex flex-col gap-8 ${
            isLetter ? "max-w-[640px] text-center" : "max-w-[720px]"
          }`}
        >
          <header className="flex flex-col gap-4">
            <h1
              className={`m-0 text-balance font-serif text-ink ${
                isLetter
                  ? "font-light text-[clamp(28px,3.4vw,44px)] leading-[1.15] tracking-[-0.02em]"
                  : "font-extralight text-[clamp(40px,5.4vw,80px)] leading-[1.02] tracking-[-0.03em]"
              }`}
            >
              {post.title}
            </h1>
            {!isLetter && (
              <p className="m-0 max-w-[58ch] font-serif font-light text-[clamp(18px,2vw,24px)] leading-[1.4] tracking-[-0.01em] text-ink-2">
                {post.dek}
              </p>
            )}
          </header>

          <div className={isLetter ? "mx-auto max-w-[58ch] text-left" : ""}>
            <MDXRemote source={post.body} components={mdxComponents} />
          </div>

          {series && (
            <Link
              href={`/work/${series.slug}`}
              className="mt-4 inline-flex items-center gap-2 self-start border-t border-line-hair pt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-ink hover:text-accent"
            >
              <span>From the {series.title} series</span>
              <span aria-hidden>↗</span>
            </Link>
          )}
        </article>
      </section>

      {/* Older / Newer */}
      {(older || newer) && (
        <section className="border-t border-line-hair px-pad py-pad-y">
          <div className="mx-auto grid max-w-[960px] gap-8 md:grid-cols-2">
            {older ? (
              <Link href={`/journal/${older.slug}`} className="group flex flex-col gap-2">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
                  <span aria-hidden>←</span> Older · {older.type === "essay" ? "Essay" : "Letter"}
                </span>
                <span className="font-serif text-[20px] leading-[1.2] text-ink transition-colors group-hover:text-accent">
                  {older.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {newer ? (
              <Link
                href={`/journal/${newer.slug}`}
                className="group flex flex-col items-end gap-2 text-right md:col-start-2"
              >
                <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
                  Newer · {newer.type === "essay" ? "Essay" : "Letter"} <span aria-hidden>→</span>
                </span>
                <span className="font-serif text-[20px] leading-[1.2] text-ink transition-colors group-hover:text-accent">
                  {newer.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="bg-paper px-pad py-pad-y">
        <div className="mx-auto flex max-w-[640px] flex-col items-center gap-6 text-center">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
            The letter
          </span>
          <h2 className="m-0 font-serif font-extralight text-[clamp(28px,3vw,40px)] leading-[1.1] tracking-[-0.02em]">
            Get the next one in your inbox.
          </h2>
          <div className="w-full max-w-[420px]">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
