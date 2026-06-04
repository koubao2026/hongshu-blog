import { getGames, getCategories } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GameCard from "@/components/GameCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "开箱报告 - 红薯品桌游",
  description: "桌游评测、规则讲解与教育使用指南",
};

export default async function GamesPage() {
  const [games, categories] = await Promise.all([getGames(), getCategories()]);

  const allTypes = Array.from(new Set(games.flatMap((g) => g.game_types)));

  return (
    <>
      <Navbar />
      <main className="py-12 px-6" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="max-w-[1200px] mx-auto">
          <h1
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}
          >
            开箱报告
          </h1>

          {/* 类型筛选 */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span
              className="px-3 py-1 rounded-full text-sm"
              style={{ backgroundColor: "var(--color-primary)", color: "var(--color-text-on-primary)", fontFamily: "var(--font-ui)" }}
            >
              全部
            </span>
            {allTypes.map((type) => (
              <span
                key={type}
                className="px-3 py-1 rounded-full text-sm cursor-pointer"
                style={{ backgroundColor: "var(--color-bg-card)", color: "var(--color-text-secondary)", fontFamily: "var(--font-ui)" }}
              >
                {type}
              </span>
            ))}
          </div>

          {/* 桌游列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
