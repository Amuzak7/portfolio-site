"use client";

import { useEffect, useRef } from "react";

const STRENGTHS = [
  {
    icon: "⚡",
    title: "AI活用による高速開発",
    desc: "Grok / Claudeを相棒に、アイデアを短期間で動くプロダクトへ",
  },
  {
    icon: "🎯",
    title: "業務課題の的確な把握",
    desc: "「めんどくさい」の本質を見抜き、解決策を設計する視点",
  },
  {
    icon: "🛠️",
    title: "設計から実装まで一貫して実行",
    desc: "自ら考え、自ら作る。実際に動くツールをリリースし続ける実行力",
  },
  {
    icon: "📚",
    title: "継続的な学習と発信",
    desc: "Obsidianで知識を整理しながら、毎日アウトプットを継続",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".scroll-reveal")
              .forEach((el) => el.classList.add("visible"));
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="scroll-reveal text-center mb-16">
          <p className="text-[#06B6D4] text-sm font-semibold uppercase tracking-widest mb-3">
            About Me
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC]">
            AIと共に、実用ツールを作り続ける
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
          {/* Left: text */}
          <div className="scroll-reveal scroll-reveal-delay-1 space-y-5 text-[#64748B] leading-relaxed">
            <p>
              資格はまだありませんが、AIをフル活用して「実際に動くツール」を自ら作り続けています。
            </p>
            <p>
              元々は業務の「めんどくさい」をどうにかしたいという想いから、GrokとClaudeを相棒に
              独学でWeb開発を始めました。Obsidianでアイデアを整理しながら、短期間で実用レベルの
              アプリを次々と開発しています。
            </p>
            <p>
              特に力を入れているのは
              <span className="text-[#F8FAFC] font-medium">
                「無駄な作業を減らし、人々が本当に価値を生む仕事に時間を使えるようにする」
              </span>
              ことです。
            </p>
            <p>
              将来的には企業に直接入り、社内の業務改善を技術で支えるエンジニアとして
              貢献したいと考えています。
            </p>

            {/* Tech stack */}
            <div className="pt-4">
              <p className="text-[#F8FAFC] text-sm font-semibold mb-3">使用技術</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Next.js",
                  "TypeScript",
                  "React",
                  "Tailwind CSS",
                  "Claude API",
                  "Grok",
                  "PostgreSQL",
                  "Prisma",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full bg-[#1E2937] border border-[#06B6D4]/20 text-[#06B6D4]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: projects list */}
          <div className="scroll-reveal scroll-reveal-delay-2">
            <div className="bg-[#1E2937] border border-[#06B6D4]/15 rounded-xl p-6">
              <p className="text-[#F8FAFC] font-semibold mb-4 flex items-center gap-2">
                <span className="text-[#06B6D4]">▸</span> 現在公開中のプロジェクト
              </p>
              <ul className="space-y-3">
                {[
                  { name: "経費精算ツール", note: "領収書処理の自動化（メイン）" },
                  { name: "タスク管理アプリ", note: "シンプルで使いやすい日常ツール" },
                  { name: "BallerVault", note: "バスケスタッツ記録ツール（個人開発）" },
                  { name: "架空アパレルECサイト", note: "フルスタック実装練習" },
                  { name: "架空IT企業コーポレートサイト", note: "デザイン＋実装の総合演習" },
                ].map((project, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#06B6D4] mt-0.5 shrink-0">✓</span>
                    <div>
                      <span className="text-[#F8FAFC] text-sm font-medium">{project.name}</span>
                      <span className="text-[#64748B] text-xs ml-2">— {project.note}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Strengths grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STRENGTHS.map((s, i) => (
            <div
              key={s.title}
              className={`scroll-reveal scroll-reveal-delay-${i + 1} bg-[#1E2937] border border-[#06B6D4]/10 rounded-xl p-5 hover:border-[#06B6D4]/40 transition-all duration-200`}
            >
              <div className="text-2xl mb-3">{s.icon}</div>
              <h3 className="text-[#F8FAFC] font-semibold text-sm mb-2">{s.title}</h3>
              <p className="text-[#64748B] text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
