import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";

const JOURNAL_DIR = path.join(process.cwd(), "content/journal");

const HeroSchema = z.object({
  src: z.string(),
  alt: z.string(),
});

const LetterFrontmatter = z.object({
  type: z.literal("letter"),
  slug: z.string(),
  title: z.string(),
  date: z.string(),
  weekNumber: z.number(),
  hero: HeroSchema,
  series: z.string().optional(),
});

const EssayFrontmatter = z.object({
  type: z.literal("essay"),
  slug: z.string(),
  title: z.string(),
  date: z.string(),
  dek: z.string(),
  hero: HeroSchema,
  series: z.string().optional(),
});

const FrontmatterSchema = z.discriminatedUnion("type", [LetterFrontmatter, EssayFrontmatter]);

export type LetterPost = z.infer<typeof LetterFrontmatter> & {
  body: string;
  excerpt: string;
};

export type EssayPost = z.infer<typeof EssayFrontmatter> & {
  body: string;
  excerpt: string;
  readingMinutes: number;
};

export type JournalPost = LetterPost | EssayPost;

function firstSentence(body: string): string {
  const stripped = body
    .replace(/^---[\s\S]*?---/, "")
    .replace(/^#+\s.*$/gm, "")
    .replace(/^>\s.*$/gm, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\*\*|__|\*|_/g, "")
    .trim();
  const para = stripped.split(/\n\n+/)[0] ?? "";
  const match = para.match(/^.*?[.!?](?:\s|$)/);
  return (match ? match[0] : para).trim();
}

function loadAll(): JournalPost[] {
  if (!fs.existsSync(JOURNAL_DIR)) return [];
  const files = fs.readdirSync(JOURNAL_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files.map<JournalPost>((file) => {
    const raw = fs.readFileSync(path.join(JOURNAL_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    // gray-matter's YAML engine auto-parses unquoted dates into JS Date objects.
    // Normalize back to an ISO date string before Zod validation so the rest of
    // the system can treat dates as opaque strings.
    if (data.date instanceof Date) {
      data.date = data.date.toISOString().slice(0, 10);
    }
    const parsed = FrontmatterSchema.parse(data);
    const excerpt = firstSentence(content);
    if (parsed.type === "essay") {
      return {
        ...parsed,
        body: content,
        excerpt,
        readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
      };
    }
    return { ...parsed, body: content, excerpt };
  });
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function getJournalPosts(): JournalPost[] {
  return loadAll();
}

export function getJournalPost(slug: string): JournalPost | null {
  return loadAll().find((p) => p.slug === slug) ?? null;
}

export function formatPostDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}
