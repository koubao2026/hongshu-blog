export const dynamic = "force-static";

import { getArticles } from "@/lib/data";

export async function GET() {
  const articles = await getArticles();

  const items = articles
    .map(
      (a) => `    <entry>
      <title>${a.title}</title>
      <link href="https://hongshubgedu.com/blog/${a.slug}" />
      <id>https://hongshubgedu.com/blog/${a.slug}</id>
      <updated>${a.published_at || new Date().toISOString()}</updated>
      <summary>${a.excerpt}</summary>
    </entry>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>红薯品桌游</title>
  <link href="https://hongshubgedu.com" />
  <id>https://hongshubgedu.com</id>
  <updated>${new Date().toISOString()}</updated>
  <description>12年桌游教育经验，分享桌游评测、教育方法论与AI素养课程</description>
${items}
</feed>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
