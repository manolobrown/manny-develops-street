import { PageHeader } from "@/components/ui/PageHeader";
import { LetterCard } from "@/components/journal/LetterCard";
import { EssayCard } from "@/components/journal/EssayCard";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { getJournalPosts } from "@/lib/journal";

export const metadata = { title: "Journal" };

export default function JournalPage() {
  const posts = getJournalPosts();

  return (
    <>
      <PageHeader
        label="Journal"
        mastCenter="Essays · Letters"
        mastRight={
          <>
            <span>No fixed schedule</span>
          </>
        }
        title={<em>Journal</em>}
        lede="Essays on street photography, plus an occasional letter with new work. Subscribe to get them in your inbox; the archive lives here."
      />

      <section className="px-pad py-pad-y">
        {posts.length === 0 ? (
          <div className="mx-auto max-w-[640px] text-center">
            <p className="m-0 font-serif italic text-[20px] leading-[1.5] text-ink-2">
              The first letter is on its way. Subscribe below and it&apos;ll land in your inbox before it lands here.
            </p>
          </div>
        ) : (
          <div className="mx-auto flex max-w-[960px] flex-col gap-16">
            {posts.map((post) =>
              post.type === "essay" ? (
                <EssayCard key={post.slug} post={post} />
              ) : (
                <LetterCard key={post.slug} post={post} />
              ),
            )}
          </div>
        )}
      </section>

      <section className="border-t border-line-soft bg-paper px-pad py-pad-y">
        <div className="mx-auto flex max-w-[640px] flex-col items-center gap-6 text-center">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
            The letter
          </span>
          <h2 className="m-0 font-serif font-extralight text-[clamp(28px,3.4vw,44px)] leading-[1.1] tracking-[-0.02em]">
            New work, in your inbox.
          </h2>
          <p className="m-0 max-w-[48ch] font-serif font-light text-[17px] leading-[1.55] text-ink-2">
            A photograph and a few lines when there&apos;s something worth sending, plus each new essay. No fixed schedule.
          </p>
          <div className="w-full max-w-[420px]">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
