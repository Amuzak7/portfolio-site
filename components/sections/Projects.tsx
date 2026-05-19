"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ──────────────────────────────────────────────
// アイコン
// ──────────────────────────────────────────────
function GitHubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.745 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ExternalIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// ──────────────────────────────────────────────
// 型定義
// ──────────────────────────────────────────────
type Project = {
  title: string;
  category: string;
  description: string;
  highlights: string[];
  tags: string[];
  image: string;
  hoverImage?: string;
  /** portrait画像（9:16）は "top" を指定 */
  objectPosition?: string;
  /** 開発に使用したAIツール名 */
  aiTool: string;
  /** 趣味・個人プロジェクトかどうか */
  isHobby?: boolean;
  liveUrl: string;
  githubUrl?: string;
  featured?: boolean;
};

// ──────────────────────────────────────────────
// Featured プロジェクト（2件）
// ──────────────────────────────────────────────
const FEATURED_PROJECTS: Project[] = [
  {
    title: "ExpenseFlow — 経費精算ツール",
    category: "AI × 業務効率化",
    description:
      "領収書をアップロードするだけで、Claude Vision APIが金額・日付・用途を自動解析。入金予定と支出を自動で紐づけ、月末の経費処理を大幅に削減する中小企業向けキャッシュフロー管理ツール。",
    highlights: [
      "Claude Vision APIで領収書を自動解析",
      "入金予定と支出の紐づけ管理",
      "Rechartsによるキャッシュフロー可視化",
    ],
    tags: ["Next.js 15", "TypeScript", "Supabase", "Claude Vision", "shadcn/ui", "Recharts"],
    image: "/images/projects/expenseflow-dashboard.png",
    hoverImage: "/images/projects/expenseflow-summary.png",
    aiTool: "Claude Code",
    liveUrl: "https://expenseflow-six.vercel.app/",
    githubUrl: "https://github.com/Amuzak7/expenseflow",
    featured: true,
  },
  {
    title: "Seikyu — 請求書自動生成ツール",
    category: "業務効率化ツール",
    description:
      "顧客情報を登録してワンクリックで適格請求書（インボイス）を発行。自動採番・消費税（10%/軽減8%）計算・PDF/Word 出力まで対応した、個人事業主・中小企業向けの請求書管理ツール。",
    highlights: [
      "PDF・Word形式でワンクリック出力",
      "適格請求書発行事業者登録番号（インボイス）対応",
      "顧客管理・請求書履歴・自社情報設定を一元管理",
    ],
    tags: ["Python", "Streamlit", "SQLite", "fpdf2", "python-docx", "pandas"],
    image: "/images/projects/seikyu-home.png",
    hoverImage: "/images/projects/seikyu-invoice.png",
    aiTool: "Claude Code",
    liveUrl: "https://seikyu-nryd4daxgvv6rejhwn3ao4.streamlit.app/",
    githubUrl: "https://github.com/Amuzak7/Seikyu",
    featured: true,
  },
];

// ──────────────────────────────────────────────
// Side プロジェクト（4件）
// ──────────────────────────────────────────────
const SIDE_PROJECTS: Project[] = [
  {
    title: "タスク管理アプリ",
    category: "生産性ツール",
    description:
      "カレンダービューと優先度管理で、複数タスクを直感的に整理。余計な機能を削ぎ落とした「使い続けられる」日常業務の整理ツール。",
    highlights: ["カレンダービューで期限を可視化", "優先度・ステータス管理"],
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/images/projects/task-home.png",
    hoverImage: "/images/projects/task-calendar.png",
    objectPosition: "top",
    aiTool: "Grok",
    liveUrl: "https://task-portfolio-app.vercel.app/",
    githubUrl: "https://github.com/Amuzak7/task-portfolio-app",
  },
  {
    title: "BallerVault",
    category: "スポーツ × Web",
    description:
      "バスケットボール試合のスタッツをリアルタイムで記録・管理するWebアプリ。インターネット接続不要・サーバー不要でブラウザ完結。IndexedDBでページリロード後もデータを復元できます。",
    highlights: [
      "本格モード（2チーム）・シンプルモード（1チーム）",
      "得点・アシスト・リバウンド等をリアルタイム記録",
      "Excel / PDF 出力・キーボードショートカット対応",
    ],
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "shadcn/ui", "Zustand", "IndexedDB", "SheetJS"],
    image: "/images/projects/ballervault-home.png",
    hoverImage: "/images/projects/ballervault-game.png",
    aiTool: "Claude Code",
    isHobby: true,
    liveUrl: "https://ballervault.vercel.app/",
    githubUrl: "https://github.com/Amuzak7/ballervault",
  },
  {
    title: "CatalystLink — コーポレートサイト",
    category: "コーポレートサイト",
    description:
      "「中小企業の業務をAIで加速する」をテーマにした架空IT企業のコーポレートサイト。AI自動化・社内システム開発・データ活用の3サービスを訴求するデザイン。",
    highlights: ["3サービスの訴求ランディング設計", "アニメーション・レスポンシブ対応"],
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/images/projects/catalyst-home.png",
    hoverImage: "/images/projects/catalyst-about.png",
    aiTool: "Claude Code",
    liveUrl: "https://catalystlink-website.vercel.app/",
  },
  {
    title: "AETHER — アパレルECサイト",
    category: "ECサイト",
    description:
      "架空メンズウェアブランド「AETHER」のECサイト。商品一覧・詳細・カート・ウィッシュリスト・認証機能をフルスタックで実装。",
    highlights: ["商品管理・カート・ウィッシュリスト", "Supabaseによる認証とDB管理"],
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    image: "/images/projects/aether-home.png",
    hoverImage: "/images/projects/aether-products.png",
    aiTool: "Claude Code",
    liveUrl: "https://aether-ecsite.vercel.app/",
    githubUrl: "https://github.com/Amuzak7/aether-ecsite",
  },
];

// ──────────────────────────────────────────────
// 共通: スクリーンショット表示エリア
// ──────────────────────────────────────────────
function ProjectImageArea({
  project,
  priority = false,
  className = "aspect-video",
}: {
  project: Project;
  priority?: boolean;
  className?: string;
}) {
  const pos = project.objectPosition ?? "center";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={project.image}
        alt={`${project.title} スクリーンショット`}
        fill
        className="object-cover transition-all duration-700 ease-out
                   group-hover:opacity-0 group-hover:scale-105"
        style={{ objectPosition: pos }}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={priority}
      />
      {project.hoverImage && (
        <Image
          src={project.hoverImage}
          alt={`${project.title} サブスクリーンショット`}
          fill
          className="object-cover transition-all duration-700 ease-out
                     opacity-0 scale-[1.03]
                     group-hover:opacity-100 group-hover:scale-100"
          style={{ objectPosition: pos }}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      )}
      {project.hoverImage && (
        <div className="absolute bottom-2 right-2 flex items-center gap-1
                        bg-black/50 backdrop-blur-sm text-white text-[10px]
                        px-2 py-0.5 rounded-full
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>📸</span>
          <span>別の画面</span>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// AIツール表記（全カード共通）
// ──────────────────────────────────────────────
function AiToolLabel({ tool }: { tool: string }) {
  return (
    <p className="flex items-center gap-1 text-[10px] text-[#475569] mt-2">
      <span aria-hidden="true">✦</span>
      {tool}で作成
    </p>
  );
}

// ──────────────────────────────────────────────
// デモアカウント表示（ExpenseFlow 専用）
// ──────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [state, setState] = useState<"idle" | "copied">("idle");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
      setTimeout(() => setState("idle"), 2000);
    } catch {
      // clipboard API が使えない環境ではフォールバックしない
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="shrink-0 text-[10px] px-2 py-0.5 rounded
                 border border-[#334155] text-[#64748B]
                 hover:border-[#06B6D4]/50 hover:text-[#06B6D4]
                 transition-colors duration-150 font-mono"
      aria-label="コピー"
    >
      {state === "copied" ? "✓ コピー済" : "コピー"}
    </button>
  );
}

function DemoCredentials() {
  return (
    <div className="mb-6 rounded-lg border border-[#06B6D4]/15 bg-[#0F172A]/60 px-4 py-3.5">
      <p className="flex items-center gap-1.5 text-[#94A3B8] text-xs font-semibold mb-3">
        <span>🔑</span>
        デモアカウントでログインできます
      </p>
      <div className="space-y-2">
        {[
          { label: "Email",    value: "demo@expenseflow.com" },
          { label: "Password", value: "DemoFlow2026!" },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="w-16 shrink-0 text-[#475569] text-[11px]">{label}</span>
            <code className="flex-1 min-w-0 truncate rounded bg-[#1E2937] px-2.5 py-1
                             font-mono text-[11px] text-[#06B6D4] border border-[#06B6D4]/10">
              {value}
            </code>
            <CopyButton text={value} />
          </div>
        ))}
      </div>
      <ul className="mt-3 space-y-0.5">
        {[
          "領収書の画像読み込みは 30回までご利用いただけます",
          "実際のデータを確認いただけます",
        ].map((note) => (
          <li key={note} className="text-[#475569] text-[10px] leading-relaxed">
            ※ {note}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ──────────────────────────────────────────────
// Featured カード（全幅・横並び）
// ──────────────────────────────────────────────
function FeaturedCard({ project, showDemo = false }: { project: Project; showDemo?: boolean }) {
  return (
    <div className="group project-card overflow-hidden lg:grid lg:grid-cols-[5fr_6fr]">
      <ProjectImageArea project={project} priority className="aspect-video lg:aspect-auto lg:min-h-[280px]" />
      <div className="p-8 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-[#06B6D4] text-[#0F172A] text-xs font-bold px-3 py-1 rounded-full">
            ⭐ Featured
          </span>
          <span className="text-[#06B6D4] text-xs font-semibold uppercase tracking-wider">
            {project.category}
          </span>
        </div>
        <h3 className="text-[#F8FAFC] text-2xl font-bold mb-4 leading-snug">{project.title}</h3>
        <p className="text-[#64748B] text-sm leading-relaxed mb-5">{project.description}</p>
        <ul className="space-y-1.5 mb-6">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-[#94A3B8] text-xs">
              <span className="text-[#06B6D4] mt-0.5 shrink-0">▸</span>
              {h}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 text-xs rounded-full bg-[#0F172A] border border-[#06B6D4]/25 text-[#06B6D4]">
              {tag}
            </span>
          ))}
          <AiToolLabel tool={project.aiTool} />
        </div>
        {showDemo && <DemoCredentials />}
        <div className="flex flex-wrap gap-3">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="btn-primary text-sm flex items-center gap-2">
            Live Demo <ExternalIcon />
          </a>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="btn-outline text-sm flex items-center gap-2">
              <GitHubIcon /> GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Side カード（2×2グリッド・控えめデザイン）
// ──────────────────────────────────────────────
function SideCard({ project, index }: { project: Project; index: number }) {
  return (
    <div
      className={`scroll-reveal scroll-reveal-delay-${(index % 4) + 1}
                  group overflow-hidden flex flex-col rounded-xl
                  bg-[#1E2937] border border-[#334155]
                  hover:border-[#06B6D4]/30 hover:shadow-lg hover:shadow-[#06B6D4]/5
                  hover:-translate-y-1 transition-all duration-200`}
    >
      {/* 画像 */}
      <ProjectImageArea project={project} className="aspect-video" />

      {/* コンテンツ */}
      <div className="p-4 flex flex-col flex-1">
        {/* カテゴリ ＋ 趣味バッジ */}
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <p className="text-[#64748B] text-[10px] font-semibold uppercase tracking-wider">
            {project.category}
          </p>
          {project.isHobby && (
            <span className="text-[9px] px-1.5 py-0.5 rounded-full
                             bg-[#0F172A] border border-[#475569]/50 text-[#475569]">
              個人プロジェクト
            </span>
          )}
        </div>

        <h3 className="text-[#F8FAFC] text-base font-semibold mb-2 leading-snug">
          {project.title}
        </h3>
        <p className="text-[#64748B] text-[11px] leading-relaxed mb-3 flex-1">
          {project.description}
        </p>

        {/* 技術タグ */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.map((tag) => (
            <span key={tag}
              className="px-2 py-0.5 text-[10px] rounded-full
                         bg-[#0F172A] border border-[#334155] text-[#64748B]">
              {tag}
            </span>
          ))}
          <AiToolLabel tool={project.aiTool} />
        </div>

        {/* ボタン */}
        <div className="flex gap-2">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center text-[11px] font-semibold py-1.5 px-3 rounded-md
                       bg-[#06B6D4] text-[#0F172A]
                       hover:bg-[#22D3EE] hover:shadow-[0_0_14px_rgba(6,182,212,0.35)]
                       hover:-translate-y-px transition-all duration-150
                       flex items-center justify-center gap-1">
            Live Demo <ExternalIcon className="w-3 h-3" />
          </a>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="text-[11px] font-semibold py-1.5 px-3 rounded-md
                         border border-[#334155] text-[#64748B]
                         hover:border-[#06B6D4]/50 hover:text-[#06B6D4]
                         transition-all duration-150
                         flex items-center gap-1">
              <GitHubIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Section
// ──────────────────────────────────────────────
export default function Projects() {
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
    <section id="projects" className="py-24 px-6 bg-[#0a1120]" ref={ref}>
      <div className="max-w-6xl mx-auto">

        {/* ── Featured Projects ── */}
        <div className="scroll-reveal text-center mb-16">
          <p className="text-[#06B6D4] text-sm font-semibold uppercase tracking-widest mb-3">
            Featured Projects
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4">
            実際に動くプロダクト
          </h2>
          <p className="text-[#64748B] max-w-xl mx-auto text-sm leading-relaxed">
            「作れる」ではなく「動いている」を証明するために、実用レベルで完成させました。
            <br />
            <span className="text-xs text-[#475569]">各カードにホバーすると別の画面をプレビューできます</span>
          </p>
        </div>

        <div className="scroll-reveal space-y-8 mb-20">
          {FEATURED_PROJECTS.map((project) => (
            <FeaturedCard
              key={project.title}
              project={project}
              showDemo={project.title.startsWith("ExpenseFlow")}
            />
          ))}
        </div>

        {/* ── Side Projects ── */}
        <div className="scroll-reveal text-center mb-10">
          <p className="text-[#64748B] text-xs font-semibold uppercase tracking-widest mb-2">
            Side Projects
          </p>
          <h3 className="text-xl md:text-2xl font-bold text-[#F8FAFC] mb-2">
            その他の制作物
          </h3>
          <p className="text-[#475569] text-xs max-w-md mx-auto leading-relaxed">
            業務ツール以外にも、学習・趣味で作ったプロジェクトです。
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {SIDE_PROJECTS.map((project, i) => (
            <SideCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* 開発継続中のメモ */}
        <div className="scroll-reveal mt-12 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#334155] to-transparent" />
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
            <p className="text-xs text-[#F8FAFC]/60 whitespace-nowrap">
              現在も新しいWebツールの開発を続けています。
            </p>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#334155] to-transparent" />
        </div>

      </div>
    </section>
  );
}
