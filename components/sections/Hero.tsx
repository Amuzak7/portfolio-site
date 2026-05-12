"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timer = setTimeout(() => {
      el.querySelectorAll(".scroll-reveal").forEach((node) => {
        node.classList.add("visible");
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden dot-grid"
      ref={ref}
    >
      {/* Background glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#06B6D4]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#06B6D4]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="scroll-reveal inline-flex items-center gap-2 bg-[#1E2937] border border-[#06B6D4]/30 rounded-full px-4 py-1.5 text-sm text-[#06B6D4] mb-8">
          <span className="inline-block w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
          駆け出しWebエンジニア
        </div>

        {/* Main headline */}
        <h1 className="scroll-reveal scroll-reveal-delay-1 text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          <span className="gradient-text">会社の無駄な時間を</span>
          <br />
          <span className="text-[#F8FAFC]">AIで削ぎ落とす</span>
        </h1>

        {/* Sub copy */}
        <p className="scroll-reveal scroll-reveal-delay-2 text-[#64748B] text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          未経験からGrokとClaudeを駆使して実用ツールを開発。
          特に経費精算ツールでは、領収書処理の劇的な時短を実現しました。
          <br className="hidden md:block" />
          無駄な作業を減らし、人々が本当に力を入れたい仕事に時間と労力を使えるようにする。
          将来的には企業に直接入り、社内の業務改善を技術で支える存在になりたいと思っています。
        </p>

        {/* CTA buttons */}
        <div className="scroll-reveal scroll-reveal-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#projects" className="btn-primary">
            プロジェクトを見る
          </a>
          <a href="#contact" className="btn-outline">
            お問い合わせ
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-reveal scroll-reveal-delay-4 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#64748B] text-xs">
          <span>Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#64748B] to-transparent animate-bounce" />
        </div>
      </div>
    </section>
  );
}
