import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  p: ({ children }) => (
    <p className="m-0 mb-6 max-w-[64ch] font-serif font-light text-[18px] leading-[1.65] text-ink-2">
      {children}
    </p>
  ),
  h2: ({ children }) => (
    <h2 className="m-0 mt-14 mb-4 font-serif font-extralight text-[clamp(28px,3vw,42px)] leading-[1.1] tracking-[-0.02em] text-ink">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="m-0 mt-10 mb-3 font-serif font-light text-[clamp(22px,2.2vw,30px)] leading-[1.15] tracking-[-0.01em] text-ink">
      {children}
    </h3>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-ink underline decoration-line-soft underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-2 border-line pl-6 font-serif italic text-[20px] leading-[1.5] text-ink">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="my-6 ml-6 list-disc font-serif font-light text-[17px] leading-[1.65] text-ink-2 marker:text-ink-3">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-6 ml-6 list-decimal font-serif font-light text-[17px] leading-[1.65] text-ink-2 marker:text-ink-3">
      {children}
    </ol>
  ),
  hr: () => <hr className="my-12 border-0 border-t border-line-hair" />,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  code: ({ children }) => (
    <code className="rounded bg-bg-2 px-1.5 py-0.5 font-mono text-[0.92em] text-ink">{children}</code>
  ),
};
