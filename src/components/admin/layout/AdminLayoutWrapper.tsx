"use client";

import React from "react";
import { SidebarProvider, useSidebar } from "./SidebarContext";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[260px]"
    : "lg:ml-[80px]";

  return (
    <div className="min-h-[100dvh] xl:flex bg-surface-elevated">
      <AppSidebar />
      <Backdrop />
      <div className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
        <AppHeader />
        <main className="flex-1 p-4 md:p-6 lg:p-8 xl:p-10 mx-auto w-full max-w-7xl overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SidebarProvider>
  );
}
