import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "红薯品桌游 — 用桌游点亮思维的每一个角落",
    template: "%s | 红薯品桌游",
  },
  description: "12年桌游教育从业者红薯老师的博客。桌游评测、教育方法论、亲子玩法建议，让桌游成为孩子思维的训练场。",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "红薯品桌游",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/style.css"
        />
      </head>
      <body className="min-h-screen" style={{ backgroundColor: "var(--color-bg)" }}>
        {children}
      </body>
    </html>
  );
}
