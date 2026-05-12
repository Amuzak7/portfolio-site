"use client";

import { useEffect, useRef, useState } from "react";

type FormState = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error ?? "送信に失敗しました。再度お試しください。");
        setFormState("error");
        return;
      }

      setFormState("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setErrorMessage("ネットワークエラーが発生しました。接続を確認してください。");
      setFormState("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-6" ref={ref}>
      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <div className="scroll-reveal text-center mb-12">
          <p className="text-[#06B6D4] text-sm font-semibold uppercase tracking-widest mb-3">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4">
            お問い合わせ
          </h2>
          <p className="text-[#64748B]">
            ご質問・ご相談・採用のご連絡などお気軽にどうぞ。
            できる限り早くご返信いたします。
          </p>
        </div>

        {/* Form */}
        <div className="scroll-reveal scroll-reveal-delay-1 bg-[#1E2937] border border-[#06B6D4]/15 rounded-2xl p-8">
          {formState === "success" ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-[#F8FAFC] text-xl font-semibold mb-2">
                メッセージを送信しました！
              </h3>
              <p className="text-[#64748B] mb-6">
                できる限り早くご返信いたします。
              </p>
              <button
                onClick={() => setFormState("idle")}
                className="btn-outline text-sm"
              >
                別のメッセージを送る
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-[#F8FAFC] text-sm font-medium mb-2"
                >
                  お名前 <span className="text-[#06B6D4]">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="山田 太郎"
                  className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder-[#64748B] text-sm focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4] transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-[#F8FAFC] text-sm font-medium mb-2"
                >
                  メールアドレス <span className="text-[#06B6D4]">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder-[#64748B] text-sm focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4] transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-[#F8FAFC] text-sm font-medium mb-2"
                >
                  メッセージ <span className="text-[#06B6D4]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="ご質問やご相談の内容をご記入ください..."
                  className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder-[#64748B] text-sm focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4] transition-colors resize-none"
                />
              </div>

              {/* Error message */}
              {formState === "error" && errorMessage && (
                <div className="flex items-start gap-2 bg-red-950/40 border border-red-500/30 rounded-lg px-4 py-3">
                  <span className="text-red-400 shrink-0 mt-0.5">⚠</span>
                  <p className="text-red-300 text-sm">{errorMessage}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={formState === "sending"}
                className="w-full btn-primary text-center disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {formState === "sending" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle
                        className="opacity-25"
                        cx="12" cy="12" r="10"
                        stroke="currentColor" strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    送信中...
                  </span>
                ) : (
                  "送信する"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
