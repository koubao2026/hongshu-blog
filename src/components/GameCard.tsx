"use client";

import Link from "next/link";
import { Game } from "@/lib/data";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/games/${game.slug}`} className="block no-underline">
      <div
        className="rounded-xl overflow-hidden shadow-sm border transition-all hover:shadow-md"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "white",
          maxWidth: "var(--max-width-card)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--color-primary-light)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--color-border)";
        }}
      >
        {/* 桌游封面 - 正方形 */}
        <div
          className="w-full aspect-square flex items-center justify-center text-5xl"
          style={{ backgroundColor: "var(--color-bg-card)" }}
        >
          🎲
        </div>
        <div className="p-4">
          <h3
            className="text-base font-semibold mb-1"
            style={{
              color: "var(--color-primary)",
              fontFamily: "var(--font-serif-cn)",
            }}
          >
            {game.name}
          </h3>
          <div
            className="text-xs mb-2 flex flex-wrap gap-2"
            style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-ui)" }}
          >
            <span>👤{game.min_players}-{game.max_players}人</span>
            <span>⏱️{game.play_time}分钟</span>
            <span>🎯{game.min_age}岁+</span>
          </div>
          <p
            className="text-sm"
            style={{
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-serif-cn)",
            }}
          >
            {game.highlight}
          </p>
        </div>
      </div>
    </Link>
  );
}
