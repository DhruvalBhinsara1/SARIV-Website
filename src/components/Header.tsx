import Link from "next/link";
import { Mark } from "./Mark";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "FreeFlow", href: "#" },
  { label: "Identity", href: "/identity" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  return (
    <header className="w-full px-8 md:px-20 py-12 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-4 text-white group">
        <Mark className="size-6 text-white transition-transform duration-700 group-hover:rotate-180" />
        <span className="text-xl font-bold tracking-widest uppercase">Sariv</span>
      </Link>
      <nav className="hidden md:flex items-center gap-12">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="nav-link relative text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-500 hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
