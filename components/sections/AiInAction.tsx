"use client";

import { useEffect, useRef } from "react";

// ──────────────────────────────────────────────
// データ定義
// ──────────────────────────────────────────────
const STATS = [
  { label: "CYCLE TIME", value: "5", unit: "min", note: "議事録 → HTML資料まで" },
  { label: "TEMPLATES", value: "3", unit: "種", note: "対象者別テンプレート" },
  { label: "OUTPUT", value: "1", unit: ".html", note: "ファイルで完結" },
];

const FEATURES = [
  {
    icon: "📐",
    title: "Markdownで定義する運用ルール",
    desc: "「PDF前提ではアコーディオン禁止」「経営層には青基調」など、ルールをMarkdownで明文化。AIにも人間にも読めるドキュメントとして機能します。",
  },
  {
    icon: "🖨️",
    title: "PDF化を前提とした設計",
    desc: "A4余白・改ページ制御・印刷スタイルを組み込み済み。ブラウザの「PDFとして保存」だけで、そのまま配布できる資料が完成します。",
  },
  {
    icon: "📊",
    title: "HTML × Mermaidで視覚化",
    desc: "業務フローや構造図はMermaidで記述。テキストベースなのでAIが直接生成でき、後の修正もコードの差分で管理できます。",
  },
  {
    icon: "🎯",
    title: "対象者別のチューニング",
    desc: "経営層には「全体像と投資対効果」、現場には「具体的な負担と打ち手」。トーンと深さをテンプレート側で切り替えます。",
  },
];

// ──────────────────────────────────────────────
// フロー矢印
// ──────────────────────────────────────────────
function FlowArrow() {
  return (
    <div className="hidden md:flex items-center justify-center px-2 shrink-0">
      <svg width="36" height="18" viewBox="0 0 36 18" fill="none">
        <path
          d="M0 9h30M24 3l9 6-9 6"
          stroke="#06B6D4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

function MobileArrow() {
  return (
    <div className="flex md:hidden items-center justify-center py-1">
      <svg width="18" height="28" viewBox="0 0 18 28" fill="none">
        <path
          d="M9 0v24M3 18l6 9 6-9"
          stroke="#06B6D4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

// ──────────────────────────────────────────────
// Section
// ──────────────────────────────────────────────
export default function AiInAction() {
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
      { threshold: 0.05 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="ai-workflow" className="py-24 px-6 bg-[#0a1120]" ref={ref}>
      <div className="max-w-6xl mx-auto">

        {/* ── セクションヘッダー ── */}
        <div className="scroll-reveal text-center mb-16">
          <p className="text-[#06B6D4] text-sm font-semibold uppercase tracking-widest mb-3">
            AI in Action
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4">
            AIを、実務のインフラにする
          </h2>
          <p className="text-[#64748B] max-w-xl mx-auto text-sm leading-relaxed">
            ツールを作るだけでなく、AIを<span className="text-[#F8FAFC]">どう運用に組み込むか</span>を設計する。<br />
            議事録から対象者別HTML資料を短時間で生成する、実践ワークフローの紹介です。
          </p>
        </div>

        {/* ── Stats ── */}
        <div className="scroll-reveal scroll-reveal-delay-1 grid grid-cols-3 gap-6 md:gap-12 mb-16 max-w-lg mx-auto">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-[#06B6D4] text-[10px] font-semibold tracking-[0.2em] uppercase mb-1.5">
                {s.label}
              </p>
              <p className="text-[#F8FAFC] font-bold leading-none" style={{ fontSize: "clamp(28px, 5vw, 40px)" }}>
                {s.value}
                <span className="text-[#64748B] text-lg ml-0.5 font-normal">{s.unit}</span>
              </p>
              <p className="text-[#475569] text-[10px] mt-1.5 leading-snug">{s.note}</p>
            </div>
          ))}
        </div>

        {/* ── ワークフロー図 ── */}
        <div className="scroll-reveal scroll-reveal-delay-2 bg-[#1E2937] border border-[#06B6D4]/15 rounded-2xl p-6 md:p-8 mb-8">
          {/* Card header */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-[#06B6D4] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              Case Study
            </span>
            <span className="text-[#475569] text-xs">
              議事録 → 経営層・現場向けHTML資料 自動生成ワークフロー
            </span>
          </div>

          {/* Flow diagram */}
          <div className="flex flex-col md:flex-row items-stretch gap-3">

            {/* INPUT */}
            <div className="flex-1 bg-[#0F172A] rounded-xl p-4 border border-[#334155]">
              <p className="text-[#06B6D4] text-[10px] font-bold tracking-[0.2em] mb-3">INPUT</p>
              <div className="space-y-2">
                {[
                  "📝 議事録 (.md)",
                  "🗒️ メモ・雑記 (.md)",
                  "📊 既存資料",
                ].map((item) => (
                  <div
                    key={item}
                    className="text-[#94A3B8] text-xs bg-[#1E2937] rounded-lg px-3 py-2 border border-[#2d3a4f]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <FlowArrow />
            <MobileArrow />

            {/* AI ENGINE */}
            <div className="flex-1 bg-[#0F172A] rounded-xl p-4 border border-[#06B6D4]/35 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#06B6D4] text-[#0F172A] text-[9px] font-black px-3 py-0.5 rounded-full tracking-widest whitespace-nowrap">
                AI ENGINE
              </div>
              <p className="text-[#06B6D4] text-[10px] font-bold tracking-[0.2em] mb-3">
                CLAUDE + RULES
              </p>
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/40 flex items-center justify-center text-xl">
                  🤖
                </div>
              </div>
              <div className="space-y-2">
                {[
                  "📐 HTML資料作成ルール.md",
                  "📋 対象者別プロンプト.md",
                ].map((item) => (
                  <div
                    key={item}
                    className="text-[#64748B] text-[10px] rounded-lg px-2.5 py-2 border border-dashed border-[#334155]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <FlowArrow />
            <MobileArrow />

            {/* OUTPUT */}
            <div className="flex-1 bg-[#0F172A] rounded-xl p-4 border border-[#334155]">
              <p className="text-[#06B6D4] text-[10px] font-bold tracking-[0.2em] mb-3">OUTPUT</p>
              <div className="space-y-2">
                {[
                  { label: "👔 経営層向け業務フロー資料", color: "text-[#60A5FA] border-[#60A5FA]/20" },
                  { label: "🛠️ 現場向け負担分析資料", color: "text-[#FBBF24] border-[#FBBF24]/20" },
                  { label: "📄 PDF出力前提レポート", color: "text-[#34D399] border-[#34D399]/20" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`${item.color} text-[10px] font-medium bg-[#1E2937] rounded-lg px-3 py-2 border`}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Insight */}
          <div className="mt-6 pt-5 border-t border-[#334155] text-center">
            <p className="text-sm text-[#64748B]">
              <span className="text-[#F8FAFC] font-semibold">
                人間はルールを書く。AIは資料を書く。
              </span>
              <span className="hidden sm:inline text-[#475569]">
                {" "}— 役割を分けることで、速さと一貫性を両立。
              </span>
            </p>
          </div>
        </div>

        {/* ── 4つの特徴 ── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`scroll-reveal scroll-reveal-delay-${(i % 4) + 1}
                          bg-[#1E2937] border border-[#334155] rounded-xl p-5
                          hover:border-[#06B6D4]/30 transition-colors duration-200`}
            >
              <div className="text-xl mb-2">{f.icon}</div>
              <h3 className="text-[#F8FAFC] font-semibold text-sm mb-1.5">{f.title}</h3>
              <p className="text-[#64748B] text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* ── 詳細資料 CTA ── */}
        <div className="scroll-reveal text-center">
          <a
            href="/workflow/ai-workflow.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#06B6D4]
                       border border-[#06B6D4]/30 rounded-full px-6 py-2.5
                       hover:bg-[#06B6D4]/10 hover:border-[#06B6D4]/60
                       transition-all duration-200"
          >
            <span>このワークフローの詳細資料を見る</span>
            <svg
              width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
          <p className="text-[#475569] text-[10px] mt-2">
            Claude × Obsidian × Tailwind CSS × Mermaid.js で生成したHTML資料
          </p>
        </div>

      </div>
    </section>
  );
}
