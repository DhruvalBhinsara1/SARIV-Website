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
          {/* ponytail: anchored to the document's true end (not the viewport), so it can never cover live content further up the page */}
          <GradualBlur
            responsive={true}
            position="bottom"
            target="parent"
            height="6rem"
            mobileHeight="2rem"
            tabletHeight="4rem"
            strength={2}
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
