import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: "var(--color-primary-dark)" }}
      className="text-white/70 py-12 px-6"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg mb-3" style={{ fontFamily: "var(--font-display)" }}>
              🎲 红薯品桌游
            </h3>
            <p className="text-sm" style={{ fontFamily: "var(--font-serif-cn)" }}>
              用桌游点亮思维的每一个角落
            </p>
          </div>
          <div>
            <h4 className="text-white mb-3 text-sm font-medium">导航</h4>
            <div className="flex flex-col gap-2">
              <Link href="/blog" className="text-sm hover:text-white transition-colors">
                规则书（博客）
              </Link>
              <Link href="/games" className="text-sm hover:text-white transition-colors">
                开箱报告（桌游）
              </Link>
              <Link href="/about" className="text-sm hover:text-white transition-colors">
                大厅（关于）
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-white mb-3 text-sm font-medium">订阅与关注</h4>
            <div className="flex flex-col gap-2">
              <Link href="/feed.xml" className="text-sm hover:text-white transition-colors">
                📡 RSS 订阅
              </Link>
              <a
                href="https://www.xiaohongshu.com/user/profile/746599345"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-white transition-colors"
              >
                📕 小红书：红薯品桌游
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} 红薯品桌游. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
