import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio | AIで会社の無駄な時間を削ぎ落とす",
  description:
    "業務効率化ツールを開発している駆け出しWebエンジニアのポートフォリオ。GrokとClaudeを駆使して実用ツールを開発。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={inter.className}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
