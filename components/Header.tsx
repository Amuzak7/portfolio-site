"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "AI in Action", href: "#ai-workflow" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0F172A]/95 backdrop-blur-md border-b border-[#06B6D4]/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#"
          className="text-[#F8FAFC] font-bold text-xl tracking-tight hover:text-[#06B6D4] transition-colors"
        >
          <span className="text-[#06B6D4]">&lt;</span>
          Dev
          <span className="text-[#06B6D4]">/&gt;</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#64748B] hover:text-[#06B6D4] text-sm font-medium transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary text-sm">
            お問い合わせ
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="メニューを開く"
        >
          <span
            className={`block h-0.5 w-6 bg-[#F8FAFC] transition-transform duration-200 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-[#F8FAFC] transition-opacity duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-[#F8FAFC] transition-transform duration-200 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1E2937] border-t border-[#06B6D4]/10 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="text-[#64748B] hover:text-[#06B6D4] font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={handleNavClick} className="btn-primary text-sm text-center">
            お問い合わせ
          </a>
        </div>
      )}
    </header>
  );
}
