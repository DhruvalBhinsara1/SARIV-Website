"use client";
import React, { useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarContext";
import {
  Activity,
  Database,
  Search,
  MessageSquare,
  LogOut,
  MoreHorizontal,
  PenTool
} from "lucide-react";
import { Mark } from "@/components/Mark";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

const navItems: NavItem[] = [
  { icon: <Activity className="w-5 h-5" />, name: "Usage", path: "/admin#usage" },
  { icon: <Database className="w-5 h-5" />, name: "Reindex", path: "/admin#reindex" },
  { icon: <Search className="w-5 h-5" />, name: "Debug Retrieval", path: "/admin#retrieval" },
  { icon: <MessageSquare className="w-5 h-5" />, name: "Conversations", path: "/admin#conversations" },
  { icon: <PenTool className="w-5 h-5" />, name: "Journal", path: "/admin/journal" },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const [hash, setHash] = React.useState("");

  useEffect(() => {
    setHash(window.location.hash);
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const isActive = useCallback((path: string) => {
    if (path.startsWith("/admin#")) {
      const targetHash = path.replace("/admin", "");
      return pathname === "/admin" && (hash === targetHash || (hash === "" && targetHash === "#usage"));
    }
    return pathname.startsWith(path);
  }, [pathname, hash]);

  const renderMenuItems = (items: NavItem[]) => (
    <ul className="flex flex-col gap-2">
      {items.map((nav) => {
        const active = isActive(nav.path);
        return (
          <li key={nav.name}>
            <Link
              href={nav.path}
              className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium transition-colors duration-200 ${
                active
                  ? "bg-primary text-surface"
                  : "text-secondary hover:bg-surface-elevated hover:text-primary"
              } ${!isExpanded && !isHovered ? "justify-center" : "justify-start"}`}
            >
              <span className={`shrink-0 flex items-center justify-center`}>
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="text-sm whitespace-nowrap">{nav.name}</span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      className={`fixed top-0 left-0 flex flex-col bg-background h-[100dvh] transition-all duration-300 ease-in-out z-50 border-r border-border 
        ${isExpanded || isMobileOpen ? "w-[260px]" : isHovered ? "w-[260px]" : "w-[80px]"}
        ${isMobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
        lg:translate-x-0 lg:shadow-none`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`py-6 px-5 flex items-center ${!isExpanded && !isHovered ? "justify-center" : "justify-start"} h-[80px] border-b border-border`}>
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
            <Mark className="w-4 h-4 text-surface" />
          </div>
          {(isExpanded || isHovered || isMobileOpen) && (
            <span className="font-display text-lg text-primary overflow-hidden text-ellipsis whitespace-nowrap">
              SARIV Admin
            </span>
          )}
        </Link>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar py-6 px-4">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-muted tracking-widest ${
                  !isExpanded && !isHovered ? "justify-center" : "justify-start"
                }`}
              >
                {(isExpanded || isHovered || isMobileOpen) ? "Overview" : <MoreHorizontal className="w-4 h-4" />}
              </h2>
              {renderMenuItems(navItems)}
            </div>
          </div>
        </nav>
      </div>
      
      <div className="p-4 border-t border-border">
         <button
            onClick={() => {
              fetch("/api/admin/logout", { method: "POST" }).then(() => {
                window.location.href = "/admin/login";
              });
            }}
            className={`group w-full relative flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium transition-colors duration-200 text-secondary hover:bg-error/10 hover:text-error ${!isExpanded && !isHovered ? "justify-center" : "justify-start"}`}
          >
            <span className="shrink-0 flex items-center justify-center">
              <LogOut className="w-5 h-5" />
            </span>
            {(isExpanded || isHovered || isMobileOpen) && (
              <span className="text-sm whitespace-nowrap">Log out</span>
            )}
          </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
