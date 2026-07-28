"use client";
import React from "react";
import { useSidebar } from "./SidebarContext";

const Backdrop: React.FC = () => {
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();

  if (!isMobileOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-primary/20 backdrop-blur-sm lg:hidden transition-opacity"
      onClick={toggleMobileSidebar}
    />
  );
};

export default Backdrop;
