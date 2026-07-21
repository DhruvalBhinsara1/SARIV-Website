import Link from "next/link";
import { Mark } from "./Mark";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Identity", href: "/identity" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  return (
    <header className="w-full h-16 px-8 md:px-20 flex items-center justify-between bg-[#f5f5f5] text-[#0c0a09]">
      <Link href="/" className="flex items-center gap-4 group">
        <Mark className="size-6 transition-transform duration-700 group-hover:rotate-180" />
        <span className="font-body text-xl font-bold tracking-widest uppercase">Sariv</span>
      </Link>
      <nav className="hidden md:flex items-center gap-10">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="nav-link relative font-body text-[15px] font-medium text-[#4e4e4e] hover:text-[#0c0a09] transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
