export function Footer() {
  return (
    <footer className="px-8 md:px-20 py-24 flex justify-between items-center border-t border-white/5">
      <span className="font-mono text-[10px] tracking-widest text-neutral-700">
        ©2026 SARIV SYSTEMS
      </span>
      <div className="flex gap-8">
        <a
          className="text-[10px] font-bold tracking-widest uppercase hover:text-white transition-colors"
          href="#"
        >
          Digital
        </a>
        <a
          className="text-[10px] font-bold tracking-widest uppercase hover:text-white transition-colors"
          href="#"
        >
          Physical
        </a>
      </div>
    </footer>
  );
}
