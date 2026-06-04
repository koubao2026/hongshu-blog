import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{ backgroundColor: "var(--color-primary)" }}
      className="sticky top-0 z-50 h-16 flex items-center px-6"
    >
      <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-white no-underline">
          <span className="text-xl">🎲</span>
          <span
            className="text-lg font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            红薯品桌游
          </span>
        </Link>

        {/* 桌面导航 */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/blog"
            className="text-white/80 hover:text-white transition-colors text-sm"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            规则书
          </Link>
          <Link
            href="/games"
            className="text-white/80 hover:text-white transition-colors text-sm"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            开箱报告
          </Link>
          <Link
            href="/about"
            className="text-white/80 hover:text-white transition-colors text-sm"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            大厅
          </Link>
        </div>

        {/* 手机端汉堡菜单 */}
        <MobileMenu />
      </div>
    </nav>
  );
}

function MobileMenu() {
  return (
    <div className="md:hidden relative group">
      <button
        className="text-white p-2"
        aria-label="菜单"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className="hidden group-hover:block absolute right-0 top-full bg-white shadow-lg rounded-lg py-2 min-w-[140px]">
        <Link
          href="/blog"
          className="block px-4 py-2 text-sm hover:bg-gray-50"
          style={{ color: "var(--color-primary)" }}
        >
          📖 规则书
        </Link>
        <Link
          href="/games"
          className="block px-4 py-2 text-sm hover:bg-gray-50"
          style={{ color: "var(--color-primary)" }}
        >
          🎲 开箱报告
        </Link>
        <Link
          href="/about"
          className="block px-4 py-2 text-sm hover:bg-gray-50"
          style={{ color: "var(--color-primary)" }}
        >
          🏠 大厅
        </Link>
      </div>
    </div>
  );
}
