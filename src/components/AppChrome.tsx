"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScrolling } from "@/components/SmoothScrolling";
import GradualBlur from "@/components/ui/GradualBlur";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { BackToTop } from "@/components/ui/BackToTop";
import { Chatbot } from "@/components/ui/Chatbot";

// The admin dashboard is a separate internal tool — it shouldn't carry the
// marketing site's header, footer, smooth-scroll wrapper, or chat widget.
export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
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
            className="hidden md:block"
            position="bottom"
            target="parent"
            height="6rem"
            strength={2}
            divCount={5}
            opacity={1}
          />
        </div>
      </SmoothScrolling>
      <CustomCursor />
      <BackToTop />
      <Chatbot />
    </>
  );
}
