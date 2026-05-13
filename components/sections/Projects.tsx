"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.745 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

type Project = {
  title: string;
  category: string;
  description: string;
  highlights: string[];
  tags: string[];
  /** メインのスクリーンショット */
  image: string;
  /** ホバー時にクロスフェードで表示するスクリーンショット */
  hoverImage?: string;
  /** portrait画像（9:16）は "top" を指定して上部をクロップ表示 */
  objectPosition?: string;
  /** 開発に使用したAIツール名 */
  aiTool: string;
  liveUrl: string;
  githubUrl?: string;
  featured?: boolean;
};

const PROJECTS: Project[] = [
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
    title: "タスク管理アプリ",
    category: "生産性ツール",
    description:
      "カレンダービューと優先度管理で、複数タスクを直感的に整理。余計な機能を削ぎ落とした「使い続けられる」日常業務の整理ツール。",
    highlights: ["カレンダービューで期限を可視化", "優先度・ステータス管理"],
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/images/projects/task-home.png",
    hoverImage: "/images/projects/task-calendar.png",
    // モバイル縦長スクリーンショット → 上部（ヘッダー＋コンテンツ）を表示
    objectPosition: "top",
    aiTool: "Grok",
    liveUrl: "https://task-portfolio-app.vercel.app/",
    githubUrl: "https://github.com/Amuzak7/task-portfolio-app",
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
];

// ──────────────────────────────────────────────
// 共通: スクリーンショット表示エリア
// ホバー時に hoverImage へクロスフェード
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
      {/* メイン画像: 通常時に表示、ホバーで opacity 0 + scale up */}
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

      {/* ホバー画像: 通常時は非表示、ホバーで opacity 1 */}
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

      {/* ホバーヒント（フェードイン） */}
      {project.hoverImage && (
        <div className="absolute bottom-2 right-2 flex items-center gap-1
                        bg-black/50 backdrop-blur-sm text-white text-[10px]
                        px-2 py-0.5 rounded-full
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-300">
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
      // clipboard API が使えない環境ではフォールバックしない（静かに失敗）
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
      {/* ヘッダー */}
      <p className="flex items-center gap-1.5 text-[#94A3B8] text-xs font-semibold mb-3">
        <span>🔑</span>
        デモアカウントでログインできます
      </p>

      {/* 認証情報 */}
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

      {/* 注釈 */}
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
// Featured カード（全幅・横並びレイアウト）
// ──────────────────────────────────────────────
function FeaturedCard({ project }: { project: Project }) {
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

        <h3 className="text-[#F8FAFC] text-2xl font-bold mb-4 leading-snug">
          {project.title}
        </h3>
        <p className="text-[#64748B] text-sm leading-relaxed mb-5">
          {project.description}
        </p>

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
            <span
              key={tag}
              className="px-2.5 py-1 text-xs rounded-full bg-[#0F172A] border border-[#06B6D4]/25 text-[#06B6D4]"
            >
              {tag}
            </span>
          ))}
          <AiToolLabel tool={project.aiTool} />
        </div>

        <DemoCredentials />

        <div className="flex flex-wrap gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm flex items-center gap-2"
          >
            Live Demo <ExternalIcon />
          </a>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-sm flex items-center gap-2"
            >
              <GitHubIcon /> GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// 通常カード（3カラムグリッド）
// ──────────────────────────────────────────────
function RegularCard({ project, index }: { project: Project; index: number }) {
  return (
    <div
      className={`scroll-reveal scroll-reveal-delay-${index + 1} group project-card overflow-hidden flex flex-col`}
    >
      <ProjectImageArea project={project} className="aspect-video" />

      <div className="p-5 flex flex-col flex-1">
        <p className="text-[#06B6D4] text-xs font-semibold uppercase tracking-wider mb-1.5">
          {project.category}
        </p>
        <h3 className="text-[#F8FAFC] text-lg font-bold mb-2 leading-snug">
          {project.title}
        </h3>
        <p className="text-[#64748B] text-xs leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-full bg-[#0F172A] border border-[#06B6D4]/20 text-[#06B6D4]"
            >
              {tag}
            </span>
          ))}
          <AiToolLabel tool={project.aiTool} />
        </div>

        <div className="flex gap-2">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center btn-primary text-xs py-2 flex items-center justify-center gap-1.5"
          >
            Live Demo <ExternalIcon />
          </a>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-xs py-2 px-3 flex items-center gap-1.5"
            >
              <GitHubIcon />
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

  const [featured, ...rest] = PROJECTS;

  return (
    <section id="projects" className="py-24 px-6 bg-[#0a1120]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="scroll-reveal text-center mb-16">
          <p className="text-[#06B6D4] text-sm font-semibold uppercase tracking-widest mb-3">
            Featured Projects
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4">
            実際に動くプロダクト
          </h2>
          <p className="text-[#64748B] max-w-xl mx-auto text-sm leading-relaxed">
            「作れる」ではなく「動いている」を証明するために、すべて実用レベルで完成させました。
            <br />
            <span className="text-xs text-[#475569]">各カードにホバーすると別の画面をプレビューできます</span>
          </p>
        </div>

        {/* Featured project */}
        <div className="scroll-reveal mb-6">
          <FeaturedCard project={featured} />
        </div>

        {/* Remaining 3 projects */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((project, i) => (
            <RegularCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* 開発継続中のメモ */}
        <div className="scroll-reveal mt-10 flex items-center gap-4">
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
