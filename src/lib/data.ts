import sampleData from "@/data/sample-data.json";
import { getSupabase } from "./supabase";

// 类型定义
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category_id: number;
  tag_ids: number[];
  published: boolean;
  reading_time: number;
  published_at?: string;
}

export interface Game {
  id: number;
  name: string;
  slug: string;
  cover_image: string;
  description: string;
  rules: string;
  usage_guide: string;
  min_players: number;
  max_players: number;
  min_age: number;
  play_time: number;
  game_types: string[];
  highlight: string;
}

export interface Keyword {
  id: number;
  word: string;
  weight: number;
  link_url: string;
  link_type: string;
}

// 检测是否配置了Supabase
export const isSupabaseReady = () => !!getSupabase();

// ============ 本地JSON数据 ============
const data = sampleData as {
  categories: Category[];
  tags: Tag[];
  articles: Article[];
  games: Game[];
  keywords: Keyword[];
};

// ============ Supabase 数据获取 ============

async function sbGetCategories(): Promise<Category[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data } = await supabase.from("blog_categories").select("*").order("id");
  return data || [];
}

async function sbGetTags(): Promise<Tag[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data } = await supabase.from("blog_tags").select("*").order("id");
  return data || [];
}

async function sbGetArticles(categorySlug?: string): Promise<Article[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  let query = supabase.from("blog_articles").select("*, blog_article_tags(tag_id)").eq("published", true).order("published_at", { ascending: false });
  if (categorySlug) {
    const { data: cat } = await supabase.from("blog_categories").select("id").eq("slug", categorySlug).single();
    if (cat) query = query.eq("category_id", cat.id);
  }
  const { data } = await query;
  if (!data) return [];
  return data.map((a: Record<string, unknown>) => ({
    id: a.id as number,
    title: a.title as string,
    slug: a.slug as string,
    excerpt: (a.excerpt as string) || "",
    content: (a.content as string) || "",
    cover_image: (a.cover_image as string) || "",
    category_id: a.category_id as number,
    tag_ids: ((a.blog_article_tags as Array<{ tag_id: number }>) || []).map((t) => t.tag_id),
    published: a.published as boolean,
    reading_time: (a.reading_time as number) || 5,
    published_at: (a.published_at as string) || undefined,
  }));
}

async function sbGetArticleBySlug(slug: string): Promise<Article | undefined> {
  const supabase = getSupabase();
  if (!supabase) return undefined;
  const { data } = await supabase.from("blog_articles").select("*, blog_article_tags(tag_id)").eq("slug", slug).eq("published", true).single();
  if (!data) return undefined;
  const a = data as Record<string, unknown>;
  return {
    id: a.id as number,
    title: a.title as string,
    slug: a.slug as string,
    excerpt: (a.excerpt as string) || "",
    content: (a.content as string) || "",
    cover_image: (a.cover_image as string) || "",
    category_id: a.category_id as number,
    tag_ids: ((a.blog_article_tags as Array<{ tag_id: number }>) || []).map((t) => t.tag_id),
    published: a.published as boolean,
    reading_time: (a.reading_time as number) || 5,
    published_at: (a.published_at as string) || undefined,
  };
}

async function sbGetGames(): Promise<Game[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data } = await supabase.from("blog_games").select("*").order("id");
  return (data || []) as Game[];
}

async function sbGetGameBySlug(slug: string): Promise<Game | undefined> {
  const supabase = getSupabase();
  if (!supabase) return undefined;
  const { data } = await supabase.from("blog_games").select("*").eq("slug", slug).single();
  return (data as Game) || undefined;
}

async function sbGetKeywords(): Promise<Keyword[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data } = await supabase.from("blog_keywords").select("*").order("weight", { ascending: false });
  return (data || []) as Keyword[];
}

// ============ 统一数据接口（自动切换Supabase/本地） ============

export async function getCategories(): Promise<Category[]> {
  return isSupabaseReady() ? sbGetCategories() : data.categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return data.categories.find((c) => c.slug === slug);
}

export function getCategoryById(id: number): Category | undefined {
  return data.categories.find((c) => c.id === id);
}

export async function getTags(): Promise<Tag[]> {
  return isSupabaseReady() ? sbGetTags() : data.tags;
}

export function getTagById(id: number): Tag | undefined {
  return data.tags.find((t) => t.id === id);
}

export async function getArticles(categorySlug?: string): Promise<Article[]> {
  if (isSupabaseReady()) return sbGetArticles(categorySlug);
  const articles = data.articles.filter((a) => a.published);
  if (!categorySlug) return articles;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return articles;
  return articles.filter((a) => a.category_id === category.id);
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  if (isSupabaseReady()) return sbGetArticleBySlug(slug);
  return data.articles.find((a) => a.slug === slug && a.published);
}

export async function getRelatedArticles(articleId: number, categoryId: number, limit = 3): Promise<Article[]> {
  if (isSupabaseReady()) {
    const sb = getSupabase();
    if (!sb) return data.articles.filter((a) => a.published && a.category_id === categoryId && a.id !== articleId).slice(0, limit);
    const { data: sbData } = await sb.from("blog_articles").select("*").eq("published", true).eq("category_id", categoryId).neq("id", articleId).limit(limit);
    return (sbData || []) as Article[];
  }
  return data.articles.filter((a) => a.published && a.category_id === categoryId && a.id !== articleId).slice(0, limit);
}

export async function getGames(): Promise<Game[]> {
  return isSupabaseReady() ? sbGetGames() : data.games;
}

export async function getGameBySlug(slug: string): Promise<Game | undefined> {
  return isSupabaseReady() ? sbGetGameBySlug(slug) : data.games.find((g) => g.slug === slug);
}

export async function getKeywords(): Promise<Keyword[]> {
  return isSupabaseReady() ? sbGetKeywords() : data.keywords;
}
