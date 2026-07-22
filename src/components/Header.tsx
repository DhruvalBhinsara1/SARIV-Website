"use client";

import * as React from "react";
import Link from "next/link";
import { Mark } from "./Mark";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Identity", href: "/identity" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-[72px] w-full items-center justify-between px-4 transition-all duration-300 md:px-20",
        isScrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Link href="/" className="group flex items-center gap-4">
        <Mark className="size-6 text-primary transition-transform duration-700 group-hover:rotate-180" />
        <span className="font-body text-xl font-bold uppercase tracking-widest text-primary">
          Sariv
        </span>
      </Link>
      
      <div className="flex items-center gap-8">
        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="nav-link relative font-body text-[15px] font-medium text-secondary transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button variant="primary" size="small">
            Start Project
          </Button>
        </div>
      </div>
    </header>
  );
}
