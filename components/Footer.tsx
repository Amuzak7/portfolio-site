export default function Footer() {
  return (
    <footer className="border-t border-[#1E2937] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#64748B] text-sm">
          © 2026 Dev Portfolio. All rights reserved.
        </p>
        <p className="text-[#64748B] text-xs">
          Built with{" "}
          <span className="text-[#06B6D4]">Next.js</span>
          {" · "}
          <span className="text-[#06B6D4]">TypeScript</span>
          {" · "}
          <span className="text-[#06B6D4]">Tailwind CSS</span>
        </p>
      </div>
    </footer>
  );
}
