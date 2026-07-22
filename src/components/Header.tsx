"use client";

import * as React from "react";
import Link from "next/link";
import { Mark } from "./Mark";
import { Button } from "./ui/Button";
import { SidebarProvider, useSidebar, MobileSidebar, SidebarLink } from "./ui/sidebar";
import { cn } from "@/lib/utils";
import { Home, Briefcase, Fingerprint, Mail } from "lucide-react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Work", href: "/work", icon: <Briefcase className="h-5 w-5 flex-shrink-0" /> },
  { label: "Identity", href: "/identity", icon: <Fingerprint className="h-5 w-5 flex-shrink-0" /> },
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
  const pathname = usePathname();
  const isHome = pathname === "/";

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-[10000] flex w-full flex-col transition-all duration-300",
        isHome && !open ? "text-white" : "text-primary",
        isScrolled
          ? isHome
            ? "border-b border-white/10 bg-black/20 backdrop-blur-md"
            : "border-b border-border bg-background/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="flex h-[72px] w-full items-center justify-between px-4 md:px-20">
        <Link href="/" className="group flex items-center gap-4 relative z-[10000]">
          <Mark className={cn("size-6 transition-transform duration-700 group-hover:rotate-180", isHome && !open ? "text-white" : "text-primary")} />
          <span className={cn("font-body text-xl font-bold uppercase tracking-widest", isHome && !open ? "text-white" : "text-primary")}>
            Sariv
          </span>
        </Link>
      
        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "nav-link relative font-body text-[15px] font-medium transition-colors",
                  isHome ? "text-white/80 hover:text-white" : "text-secondary hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:block">
            {isHome ? (
              <Button className="bg-white text-black hover:bg-white/90" size="small">
                Start Project
              </Button>
            ) : (
              <Button variant="primary" size="small">
                Start Project
              </Button>
            )}
          </div>

          {/* Mobile Sidebar Trigger & Menu */}
          <div className="md:hidden flex items-center">
            <MobileSidebar>
                <div className="flex flex-col gap-6">
                  {NAV_LINKS.map((link, idx) => (
                    <SidebarLink key={idx} link={link} className="text-xl" />
                  ))}
                  <div className="mt-8 border-t border-border pt-8 flex">
                    <Button variant="primary">
                      Start Project
                    </Button>
                  </div>
                </div>
              </MobileSidebar>
          </div>
        </div>
      </div>
    </header>
  );
}
