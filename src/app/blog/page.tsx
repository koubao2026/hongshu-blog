import Link from "next/link";
import { getArticles, getCategories, getTags, type Tag } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "规则书 - 红薯品桌游",
  description: "桌游教育方法论、使用指南、秒评与课程设计",
};

export default async function BlogPage() {
  const [articles, categories, tags] = await Promise.all([
    getArticles(),
    getCategories(),
    getTags(),
  ]);

  return (
    <>
      <Navbar />
      <main className="py-12 px-6" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="max-w-[1200px] mx-auto">
          <h1
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}
          >
            规则书
          </h1>

          {/* 文章列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} category={categories.find(c => c.id === article.category_id) || categories[0]} tags={article.tag_ids.map(tid => tags.find(t => t.id === tid)).filter((t): t is Tag => !!t)} />
            ))}
          </div>

          {articles.length === 0 && (
            <p className="text-center py-12" style={{ color: "var(--color-text-light)" }}>
              暂无文章
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
