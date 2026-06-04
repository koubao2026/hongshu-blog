"use client";

import { useState } from "react";
import Link from "next/link";
import { Article, Category, Tag, getTagById } from "@/lib/data";

interface ArticleCardProps {
  article: Article;
  category: Category;
  tags: Tag[];
}

export default function ArticleCard({ article, category, tags }: ArticleCardProps) {
  const [flipped, setFlipped] = useState(false);

  const articleTags = article.tag_ids
    .map((id) => getTagById(id))
    .filter(Boolean) as Tag[];

  return (
    <div
      className="card-perspective cursor-pointer"
      style={{ maxWidth: "var(--max-width-card)" }}
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`card-inner ${flipped ? "card-flipped" : ""}`}>
        {/* 正面 */}
        <div className="card-front rounded-xl overflow-hidden shadow-sm border"
          style={{ borderColor: "var(--color-border)", backgroundColor: "white" }}
        >
          {/* 封面图占位 */}
          <div
            className="w-full aspect-video flex items-center justify-center text-4xl"
            style={{ backgroundColor: "var(--color-bg-card)" }}
          >
            📝
          </div>
          <div className="p-4">
            <span
              className="inline-block text-xs px-2 py-1 rounded-full mb-2"
              style={{
                backgroundColor: "var(--color-accent-soft)",
                color: "var(--color-accent)",
                fontFamily: "var(--font-ui)",
              }}
            >
              {category.name}
            </span>
            <h3
              className="text-base font-semibold mb-2 line-clamp-2"
              style={{
                color: "var(--color-primary)",
                fontFamily: "var(--font-serif-cn)",
              }}
            >
              {article.title}
            </h3>
            <p
              className="text-sm mb-3 line-clamp-3"
              style={{
                color: "var(--color-text-secondary)",
                fontFamily: "var(--font-serif-cn)",
              }}
            >
              {article.excerpt}
            </p>
            <div
              className="text-xs"
              style={{ color: "var(--color-text-light)", fontFamily: "var(--font-ui)" }}
            >
              {article.reading_time}分钟阅读
            </div>
          </div>
        </div>

        {/* 背面 */}
        <div
          className="card-back rounded-xl overflow-hidden shadow-sm border p-5 flex flex-col justify-between"
          style={{
            borderColor: "var(--color-primary-light)",
            backgroundColor: "var(--color-bg-card)",
            minHeight: "100%",
          }}
        >
          <div>
            <span
              className="inline-block text-xs px-2 py-1 rounded-full mb-3"
              style={{
                backgroundColor: "var(--color-accent-soft)",
                color: "var(--color-accent)",
                fontFamily: "var(--font-ui)",
              }}
            >
              {category.name}
            </span>
            <h3
              className="text-sm font-semibold mb-3"
              style={{
                color: "var(--color-primary)",
                fontFamily: "var(--font-serif-cn)",
              }}
            >
              {article.title}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{
                color: "var(--color-text)",
                fontFamily: "var(--font-serif-cn)",
              }}
            >
              {article.excerpt}
            </p>
          </div>
          <div className="mt-4">
            <Link
              href={`/blog/${article.slug}`}
              className="inline-block text-sm font-medium px-4 py-2 rounded-lg text-white transition-colors"
              style={{
                backgroundColor: "var(--color-accent)",
                fontFamily: "var(--font-ui)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              阅读更多 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
