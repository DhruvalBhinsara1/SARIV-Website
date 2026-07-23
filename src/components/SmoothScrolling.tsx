"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useGSAP(
    () => {
      if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      let smoother = ScrollSmoother.get();
      if (!smoother && wrapperRef.current && contentRef.current) {
        smoother = ScrollSmoother.create({
          wrapper: wrapperRef.current,
          content: contentRef.current,
          smooth: 1,
          effects: false,
        });
      }
      smootherRef.current = smoother || null;

      return () => {
        if (smootherRef.current) {
          smootherRef.current.kill();
          smootherRef.current = null;
        }
      };
    },
    { scope: wrapperRef }
  );

  // Reset scroll position on route change
  useEffect(() => {
    // Native reset
    window.scrollTo(0, 0);
    
    // Wait for the new page DOM to paint and establish its height
    const timer = setTimeout(() => {
      const smoother = smootherRef.current || ScrollSmoother.get();
      if (smoother) {
        smoother.scrollTop(0);
        ScrollTrigger.refresh();
      }
    }, 50); // Small delay to prevent clamping to the footer

    return () => clearTimeout(timer);
  }, [pathname]);

  // Global robust ResizeObserver to automatically refresh ScrollTrigger
  // whenever the page content changes height (Next.js soft navigations, images loading, etc).
  // Because `#smooth-wrapper` is fixed, the window never resizes, so GSAP misses these changes natively.
  useEffect(() => {
    if (!contentRef.current) return;

    let rafId: number;
    const observer = new ResizeObserver(() => {
      // Debounce to prevent "ResizeObserver loop limit exceeded" errors in some browsers
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    observer.observe(contentRef.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}

