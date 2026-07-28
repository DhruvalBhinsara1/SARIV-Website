"use client";
import React from "react";
import { useSidebar } from "./SidebarContext";
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";

const AppHeader: React.FC = () => {
  const { isExpanded, isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-30 flex w-full bg-background/80 backdrop-blur-md border-b border-border h-[80px]">
      <div className="flex flex-grow items-center justify-between px-4 md:px-6 2xl:px-11">
        
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* Mobile Hamburger Toggle */}
          <button
            onClick={toggleMobileSidebar}
            className="z-50 block rounded-sm bg-surface-elevated p-2 shadow-sm lg:hidden hover:bg-border transition-colors text-primary"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Sidebar Toggle */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={toggleSidebar}
            className="text-secondary hover:text-primary transition-colors p-2 rounded-lg hover:bg-surface-elevated"
          >
            {isExpanded ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
           {/* Add right side elements here (e.g., Theme Toggle, Notifications, User Profile) */}
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                A
              </div>
              <span className="hidden sm:block text-sm font-medium text-primary">Admin</span>
           </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
