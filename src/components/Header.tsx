"use client";

import * as React from "react";
import Link from "next/link";
import { Mark } from "./Mark";
import { buttonVariants } from "./ui/Button";
import { SidebarProvider, useSidebar, MobileSidebar, SidebarLink } from "./ui/sidebar";
import { cn } from "@/lib/utils";
import { Home, Briefcase, Fingerprint, Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import { Magnetic } from "@/components/ui/Magnetic";

const NAV_LINKS = [
  { label: "Work", href: "/work", icon: <Briefcase className="h-5 w-5 flex-shrink-0" /> },
  { label: "Contact", href: "/contact", icon: <Mail className="h-5 w-5 flex-shrink-0" /> },
];

export function Header() {
  return (
    <SidebarProvider>
      <HeaderContent />
    </SidebarProvider>
  );
}

function HeaderContent() {
  const { open } = useSidebar();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(false);
  const lastScrollY = React.useRef(0);
  const pathname = usePathname();
  const isHome = pathname === "/";

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100 && !open) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 z-[10000] flex w-full flex-col transition-transform duration-500",
        isHidden ? "-translate-y-full" : "translate-y-0",
        isHome && !open ? "text-white" : "text-primary"
      )}
    >
      {/* Background layer as a sibling to avoid Chrome backdrop-filter containing block bug */}
      <div
        className={cn(
          "absolute inset-0 -z-10 h-[72px] w-full transition-all duration-300",
          isScrolled
            ? isHome
              ? "border-b border-white/10 bg-black/20 backdrop-blur-md"
              : "border-b border-border bg-background/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      />
      <div className="flex h-[72px] w-full items-center justify-between px-4 md:px-20 relative z-10">
        <Link 
          href="/" 
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="group flex items-center gap-2 relative z-[10000]"
        >
          <span className={cn("font-body text-xl font-bold uppercase tracking-widest [text-box:trim-both_cap_alphabetic]", isHome || open ? "text-white" : "text-primary")}>
            SARIV
          </span>
          <Mark className={cn("size-6 transition-transform duration-700 group-hover:rotate-180", isHome || open ? "text-white" : "text-primary")} />
        </Link>
      
        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link) => (
              <Magnetic strength={15} key={link.label}>
                <Link
                  href={link.href}
                  className={cn(
                    "nav-link relative font-body text-[15px] font-medium transition-colors block",
                    isHome ? "text-white/80 hover:text-white" : "text-secondary hover:text-primary"
                  )}
                >
                  {link.label}
                </Link>
              </Magnetic>
            ))}
          </nav>
          <div className="hidden md:block">
            <Magnetic strength={20}>
              <Link
                href="/start-project"
                className={cn(
                  buttonVariants({ size: "small" }),
                  isHome ? "bg-white text-black hover:bg-white/90" : ""
                )}
              >
                Start Project
              </Link>
            </Magnetic>
          </div>

          {/* Mobile Sidebar Trigger & Menu */}
          <div className="md:hidden flex items-center">
            <MobileSidebar>
                <div className="flex flex-col gap-6">
                  {NAV_LINKS.map((link, idx) => (
                    <SidebarLink key={idx} link={link} className="text-xl" />
                  ))}
                  <div className="mt-8 border-t border-border pt-8 flex">
                    <Link href="/start-project" className={buttonVariants({ variant: "primary" })}>
                      Start Project
                    </Link>
                  </div>
                </div>
              </MobileSidebar>
          </div>
        </div>
      </div>
    </header>
  );
}
