"use client";

import { useState } from "react";
import type { Keyword } from "@/lib/data";

interface KeywordWallProps {
  keywords: Keyword[];
}

export default function KeywordWall({ keywords }: KeywordWallProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const getDelayClass = (index: number) => {
    const delay = index % 5;
    return delay === 0 ? "" : `keyword-float-delay-${delay}`;
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 py-4">
      {keywords.map((kw, i) => (
        <a
          key={kw.id}
          href={kw.link_url}
          className={`keyword-float ${getDelayClass(i)} px-3 py-1 rounded-full text-sm no-underline transition-all duration-200`}
          style={{
            fontSize: `${0.8 + kw.weight * 0.1}rem`,
            backgroundColor: hoveredId === kw.id ? "var(--color-accent)" : "var(--color-bg-card)",
            color: hoveredId === kw.id ? "white" : "var(--color-text-secondary)",
            fontFamily: "var(--font-ui)",
            opacity: hoveredId !== null && hoveredId !== kw.id ? 0.5 : 1,
          }}
          onMouseEnter={() => setHoveredId(kw.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {kw.word}
        </a>
      ))}
    </div>
  );
}
