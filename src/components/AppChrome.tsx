"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScrolling } from "@/components/SmoothScrolling";
import GradualBlur from "@/components/ui/GradualBlur";
import { BackToTop } from "@/components/ui/BackToTop";
import { Chatbot } from "@/components/ui/Chatbot";

// The admin dashboard is a separate internal tool — it shouldn't carry the
// marketing site's header, footer, smooth-scroll wrapper, or chat widget.
export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret Admin Login Shortcut: Cmd/Ctrl + Shift + A
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        router.push('/admin/login');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  if (pathname?.startsWith("/admin") && pathname !== "/admin/login") {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <SmoothScrolling>
        {children}
        <div className="relative">
          <Footer />
          {/* Desktop blur - strictly preserved as original */}
          <GradualBlur
            className="hidden md:block"
            position="bottom"
            target="parent"
            height="6rem"
            strength={2}
            divCount={5}
            opacity={1}
          />
          {/* Mobile blur - softer strength prevents banding on small heights, shorter height makes it start lower */}
          <GradualBlur
            className="block md:hidden"
            position="bottom"
            target="parent"
            height="1.5rem"
            strength={0.5}
            divCount={5}
            opacity={1}
          />
        </div>
      </SmoothScrolling>
      <BackToTop />
      <Chatbot />
    </>
  );
}
