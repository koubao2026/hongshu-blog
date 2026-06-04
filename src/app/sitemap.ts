export const dynamic = "force-static";

import { getArticles, getGames } from "@/lib/data";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, games] = await Promise.all([getArticles(), getGames()]);

  const articleUrls = articles.map((a) => ({
    url: `https://hongshubgedu.com/blog/${a.slug}`,
    lastModified: a.published_at ? new Date(a.published_at) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const gameUrls = games.map((g) => ({
    url: `https://hongshubgedu.com/games/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: "https://hongshubgedu.com", lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: "https://hongshubgedu.com/blog", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: "https://hongshubgedu.com/games", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://hongshubgedu.com/about", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ...articleUrls,
    ...gameUrls,
  ];
}
