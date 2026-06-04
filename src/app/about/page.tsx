import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "大厅 — 关于红薯老师",
  description: "12年桌游教育从业者，小红书红薯品桌游主理人，2025年埃森展SPIEL TALKS演讲者。",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="py-16 px-6" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="max-w-[800px] mx-auto">
          {/* 头像占位 */}
          <div
            className="w-32 h-32 rounded-full mx-auto mb-8 flex items-center justify-center text-5xl"
            style={{ backgroundColor: "var(--color-bg-card)" }}
          >
            🍠
          </div>

          <h1
            className="text-3xl md:text-4xl font-bold mb-4 text-center"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}
          >
            红薯老师
          </h1>

          <p
            className="text-center mb-8"
            style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-serif-cn)" }}
          >
            用桌游点亮思维的每一个角落
          </p>

          {/* 个人介绍 */}
          <div
            className="space-y-4 leading-relaxed"
            style={{ fontFamily: "var(--font-serif-cn)" }}
          >
            <p>
              我是红薯老师，12年桌游教育从业者，独立桌游设计师和教师。
              小红书/公众号「红薯品桌游」主理人，专注从教育视角评估桌游、分享桌游育儿方法论。
            </p>

            <h2
              className="text-xl font-bold mt-8 mb-3"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}
            >
              🎤 演讲与分享
            </h2>
            <p>
              2025年埃森展 SPIEL TALKS 演讲者，主题《THE POWER OF BOARD GAMES》，
              向全球桌游界分享桌游教育的中国实践。
            </p>

            <h2
              className="text-xl font-bold mt-8 mb-3"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}
            >
              📚 课程与服务
            </h2>
            <div className="space-y-3">
              <div
                className="p-4 rounded-xl"
                style={{ backgroundColor: "var(--color-bg-card)" }}
              >
                <h3 className="font-semibold mb-1" style={{ color: "var(--color-primary)" }}>
                  「玩AI」儿童AI素养课
                </h3>
                <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  5-12岁 · 桌游+AI · 非编程 · 培养AI时代的批判性思维
                </p>
              </div>
              <div
                className="p-4 rounded-xl"
                style={{ backgroundColor: "var(--color-bg-card)" }}
              >
                <h3 className="font-semibold mb-1" style={{ color: "var(--color-primary)" }}>
                  「AI桌游设计师」项目课
                </h3>
                <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  8-12岁 · 5天集训 · 1980-2980元/期 · AI辅助设计桌游
                </p>
              </div>
            </div>

            <h2
              className="text-xl font-bold mt-8 mb-3"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}
            >
              🔗 关注我
            </h2>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.xiaohongshu.com/user/profile/746599345"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors no-underline"
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "white",
                  fontFamily: "var(--font-ui)",
                }}
              >
                📕 小红书：红薯品桌游
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
