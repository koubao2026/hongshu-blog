import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getGameBySlug, getGames, getArticles, isSupabaseReady } from "@/lib/data";
import type { Metadata } from "next";

export async function generateStaticParams() {
  if (isSupabaseReady()) return [];
  const games = await getGames();
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game) return { title: "桌游未找到" };
  return {
    title: `${game.name} - 红薯品桌游`,
    description: game.description,
    openGraph: {
      title: game.name,
      description: game.description,
      type: "article",
    },
  };
}

export default async function GameDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: game.name,
    description: game.description,
    brand: { "@type": "Brand", name: "红薯品桌游" },
  };

  return (
    <>
      <Navbar />
      <main className="py-12 px-6" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="max-w-[800px] mx-auto">
          <Link
            href="/games"
            className="text-sm no-underline mb-6 inline-block"
            style={{ color: "var(--color-accent)", fontFamily: "var(--font-ui)" }}
          >
            ← 返回开箱报告
          </Link>

          <h1
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}
          >
            {game.name}
          </h1>

          {/* 基础信息 */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: "var(--color-accent-soft)", color: "var(--color-accent)", fontFamily: "var(--font-ui)" }}>
              {game.min_players}-{game.max_players}人
            </span>
            <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: "var(--color-accent-soft)", color: "var(--color-accent)", fontFamily: "var(--font-ui)" }}>
              {game.min_age}岁+
            </span>
            <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: "var(--color-accent-soft)", color: "var(--color-accent)", fontFamily: "var(--font-ui)" }}>
              {game.play_time}分钟
            </span>
            {game.game_types.map((type) => (
              <span key={type} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: "var(--color-bg-card)", color: "var(--color-text-secondary)", fontFamily: "var(--font-ui)" }}>
                {type}
              </span>
            ))}
          </div>

          {/* 亮点 */}
          {game.highlight && (
            <div className="p-4 rounded-lg mb-8" style={{ backgroundColor: "var(--color-accent-soft)", borderLeft: "4px solid var(--color-accent)" }}>
              <p className="text-sm font-bold mb-1" style={{ color: "var(--color-accent)", fontFamily: "var(--font-ui)" }}>教学亮点</p>
              <p className="text-sm" style={{ color: "var(--color-text)" }}>{game.highlight}</p>
            </div>
          )}

          {/* 描述 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}>简介</h2>
            <p style={{ lineHeight: 1.8 }}>{game.description}</p>
          </section>

          {/* 规则 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}>规则要点</h2>
            <div style={{ lineHeight: 1.8, whiteSpace: "pre-line" }}>{game.rules}</div>
          </section>

          {/* 使用指南 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}>教学使用指南</h2>
            <p style={{ lineHeight: 1.8 }}>{game.usage_guide}</p>
          </section>

          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </div>
      </main>
      <Footer />
    </>
  );
}
