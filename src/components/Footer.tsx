export function Footer() {
  return (
    <footer className="px-8 md:px-20 py-16 flex justify-between items-center border-t border-[#e7e5e4] bg-[#f5f5f5]">
      <span className="font-body text-[15px] text-[#777169]">©2026 SARIV SYSTEMS</span>
      <div className="flex gap-8">
        <a
          className="font-body text-[15px] text-[#4e4e4e] hover:text-[#0c0a09] transition-colors"
          href="#"
        >
          Digital
        </a>
        <a
          className="font-body text-[15px] text-[#4e4e4e] hover:text-[#0c0a09] transition-colors"
          href="#"
        >
          Physical
        </a>
      </div>
    </footer>
  );
}
