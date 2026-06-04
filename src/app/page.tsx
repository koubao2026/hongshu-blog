import Link from "next/link";
import { getArticles, getGames, getCategories, getTags, getKeywords, type Tag } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import GameCard from "@/components/GameCard";
import KeywordWall from "@/components/KeywordWall";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "红薯品桌游 - 用桌游点亮思维",
  description: "12年桌游教育经验，分享桌游评测、教育方法论与AI素养课程",
};

export default async function HomePage() {
  const [articles, games, categories, tags, keywords] = await Promise.all([
    getArticles(),
    getGames(),
    getCategories(),
    getTags(),
    getKeywords(),
  ]);

  const latestArticles = articles.slice(0, 6);
  const featuredGames = games.slice(0, 3);

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "var(--color-bg)" }}>
        {/* Hero */}
        <section className="py-16 px-6 text-center" style={{ backgroundColor: "var(--color-primary)" }}>
          <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "var(--color-text-on-primary)", fontFamily: "var(--font-display)" }}>
            红薯品桌游
          </h1>
          <p className="text-lg mb-6" style={{ color: "var(--color-accent-soft)", fontFamily: "var(--font-body)" }}>
            12年桌游教育 · 用桌游点亮思维
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/blog" className="px-6 py-2 rounded-full no-underline font-bold text-sm" style={{ backgroundColor: "var(--color-accent)", color: "white", fontFamily: "var(--font-ui)" }}>
              规则书
            </Link>
            <Link href="/games" className="px-6 py-2 rounded-full no-underline font-bold text-sm" style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "var(--color-text-on-primary)", fontFamily: "var(--font-ui)" }}>
              开箱报告
            </Link>
          </div>
        </section>

        {/* 弹幕墙 */}
        <section className="py-12 px-6">
          <div className="max-w-[1200px] mx-auto">
            <KeywordWall keywords={keywords} />
          </div>
        </section>

        {/* 最新文章 */}
        <section className="py-12 px-6" style={{ backgroundColor: "var(--color-bg-alt)" }}>
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}>
              最新文章
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArticles.map((article) => (
                <ArticleCard key={article.id} article={article} category={categories.find(c => c.id === article.category_id) || categories[0]} tags={article.tag_ids.map(tid => tags.find(t => t.id === tid)).filter((t): t is Tag => !!t)} />
              ))}
            </div>
          </div>
        </section>

        {/* 桌游推荐 */}
        <section className="py-12 px-6">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}>
              桌游推荐
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
