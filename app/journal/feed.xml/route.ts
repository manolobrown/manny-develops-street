import { getJournalPosts } from "@/lib/journal";
import { SITE } from "@/lib/site";


function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getJournalPosts();
  const buildDate = new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${SITE}/journal/${post.slug}`;
      const description = post.type === "essay" ? post.dek : post.excerpt;
      const category = post.type === "essay" ? "Essay" : "Letter";
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(description)}</description>
      <category>${category}</category>
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Manuel Peña — Journal</title>
    <link>${SITE}/journal</link>
    <atom:link href="${SITE}/journal/feed.xml" rel="self" type="application/rss+xml" />
    <description>Letters and essays from a New York street &amp; documentary photographer.</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
