import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ReadingProgress";
import ArticleCard from "@/components/ArticleCard";
import { getArticleBySlug, getArticles, getCategories, getTags, getCategoryById, getRelatedArticles, getTagById, isSupabaseReady, type Tag } from "@/lib/data";
import type { Metadata } from "next";

export async function generateStaticParams() {
  // 无Supabase时从本地JSON生成路径；有Supabase时返回空（需ISR或动态渲染）
  if (isSupabaseReady()) return [];
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "文章未找到" };

  const category = getCategoryById(article.category_id);
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.published_at,
      authors: ["红薯老师"],
      tags: article.tag_ids.map((id) => getTagById(id)?.name).filter((t): t is string => !!t),
    },
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const category = getCategoryById(article.category_id);
  const articleTags = article.tag_ids.map((id) => getTagById(id)).filter(Boolean) as NonNullable<ReturnType<typeof getTagById>>[];
  const [related, categories, tags] = await Promise.all([
    getRelatedArticles(article.id, article.category_id),
    getCategories(),
    getTags(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    author: { "@type": "Person", name: "红薯老师" },
    publisher: { "@type": "Organization", name: "红薯品桌游" },
    wordCount: article.content.length,
  };

  return (
    <>
      <ReadingProgress />
      <Navbar />
      <article className="py-12 px-6" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center gap-3 mb-4">
            {category && (
              <Link
                href={`/blog?category=${category.slug}`}
                className="text-xs px-2 py-1 rounded-full no-underline"
                style={{
                  backgroundColor: "var(--color-accent-soft)",
                  color: "var(--color-accent)",
                  fontFamily: "var(--font-ui)",
                }}
              >
                {category.name}
              </Link>
            )}
            <span className="text-xs" style={{ color: "var(--color-text-light)", fontFamily: "var(--font-ui)" }}>
              {article.reading_time}分钟阅读
            </span>
          </div>

          <h1
            className="text-2xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)", lineHeight: 1.3 }}
          >
            {article.title}
          </h1>

          <div
            className="w-full h-48 md:h-64 rounded-lg mb-8 flex items-center justify-center"
            style={{ backgroundColor: "var(--color-bg-card)" }}
          >
            <span style={{ color: "var(--color-text-light)" }}>封面图</span>
          </div>

          {articleTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {articleTags.map((tag) => (
                <span
                  key={tag.id}
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ backgroundColor: "var(--color-bg-card)", color: "var(--color-text-secondary)", fontFamily: "var(--font-ui)" }}
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}

          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, "<br/>").replace(/## (.+)/g, '<h2>$1</h2>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }}
          />

          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

          {related.length > 0 && (
            <section className="mt-16 pt-8" style={{ borderTop: "1px solid var(--color-border)" }}>
              <h2 className="text-xl font-bold mb-6" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}>
                相关文章
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.map((a) => (
                  <ArticleCard key={a.id} article={a} category={categories.find(c => c.id === a.category_id) || categories[0]} tags={a.tag_ids.map(tid => tags.find(t => t.id === tid)).filter((t): t is Tag => !!t)} />
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
      <Footer />
    </>
  );
}
