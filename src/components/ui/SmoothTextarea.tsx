"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type SmoothTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  wrapperClassName?: string;
};

function getCaretCoordinates(element: HTMLTextAreaElement, position: number) {
  const div = document.createElement("div");
  document.body.appendChild(div);

  const style = div.style;
  const computed = window.getComputedStyle(element);

  style.whiteSpace = "pre-wrap";
  style.wordWrap = "break-word";
  style.position = "absolute";
  style.visibility = "hidden";

  const properties = [
    "direction", "boxSizing", "width", "height", "overflowX", "overflowY",
    "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth",
    "borderStyle", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
    "fontStyle", "fontVariant", "fontWeight", "fontStretch", "fontSize", "fontSizeAdjust",
    "lineHeight", "fontFamily", "textAlign", "textTransform", "textIndent",
    "textDecoration", "letterSpacing", "wordSpacing", "tabSize", "MozTabSize"
  ];

  properties.forEach(prop => {
    // @ts-expect-error - TS doesn't like indexing style with dynamic keys
    style[prop] = computed[prop as keyof CSSStyleDeclaration];
  });

  div.textContent = element.value.substring(0, position);

  const span = document.createElement("span");
  span.textContent = element.value.substring(position) || ".";
  div.appendChild(span);

  const coordinates = {
    top: span.offsetTop + parseInt(computed.borderTopWidth || "0"),
    left: span.offsetLeft + parseInt(computed.borderLeftWidth || "0"),
    height: parseInt(computed.lineHeight || "0")
  };

  document.body.removeChild(div);
  return coordinates;
}

export const SmoothTextarea = React.forwardRef<HTMLTextAreaElement, SmoothTextareaProps>(
  ({ className, wrapperClassName, value, defaultValue, onChange, onBlur, placeholder, style, ...props }, forwardedRef) => {
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const caretX = useMotionValue(0);
    const caretY = useMotionValue(0);
    const caretOpacity = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const internalInputRef = useRef<HTMLTextAreaElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalInputRef.current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef]
    );

    const isControlled = value !== undefined;
    const inputValue = isControlled ? String(value) : internalValue;

    const springConfig = prefersReducedMotion
      ? { stiffness: 10000, damping: 100, mass: 0.1 }
      : { stiffness: 500, damping: 30, mass: 0.5 };
    
    const springCaretX = useSpring(caretX, springConfig);
    const springCaretY = useSpring(caretY, springConfig);

    const getCaretIndex = (target: HTMLTextAreaElement) => {
      const selectionStart = target.selectionStart ?? 0;
      const selectionEnd = target.selectionEnd ?? 0;
      if (selectionStart === selectionEnd) return selectionStart;
      return target.selectionDirection === "backward" ? selectionStart : selectionEnd;
    };

    const updateCaretFromInput = (target: HTMLTextAreaElement) => {
      const selectionStart = target.selectionStart ?? 0;
      const selectionEnd = target.selectionEnd ?? 0;
      const hasSelection = selectionStart !== selectionEnd;
      const caretIndex = getCaretIndex(target);
      
      const coordinates = getCaretCoordinates(target, caretIndex);
      
      const scrollLeft = target.scrollLeft;
      const scrollTop = target.scrollTop;

      // Adding 1px offset to match standard caret position better
      caretX.set(coordinates.left - scrollLeft + 1);
      caretY.set(coordinates.top - scrollTop);

      if (hasSelection) {
        caretOpacity.set(0);
        return;
      }
      caretOpacity.set(1);
    };

    const updateCaretRef = useRef(updateCaretFromInput);
    updateCaretRef.current = updateCaretFromInput;
    const caretOpacityRef = useRef(caretOpacity);
    caretOpacityRef.current = caretOpacity;

    useEffect(() => {
      const input = internalInputRef.current;
      if (input && document.activeElement === input) {
        updateCaretRef.current(input);
      }
    }, [inputValue]);

    useEffect(() => {
      const input = internalInputRef.current;
      const container = containerRef.current;
      if (!input || !container) return;

      const updateCaretIfFocused = () => {
        if (document.activeElement === input) {
          updateCaretRef.current(input);
        }
      };

      const handleSelectionChange = () => {
        if (document.activeElement !== input) return;
        requestAnimationFrame(() => {
          if (document.activeElement === input) {
            updateCaretRef.current(input);
          }
        });
      };

      document.addEventListener("selectionchange", handleSelectionChange);
      document.fonts.addEventListener("loadingdone", updateCaretIfFocused);
      void document.fonts.ready.then(updateCaretIfFocused);
      input.addEventListener("scroll", updateCaretIfFocused);
      
      const resizeObserver = new ResizeObserver(updateCaretIfFocused);
      resizeObserver.observe(input);

      updateCaretIfFocused();

      return () => {
        document.removeEventListener("selectionchange", handleSelectionChange);
        document.fonts.removeEventListener("loadingdone", updateCaretIfFocused);
        input.removeEventListener("scroll", updateCaretIfFocused);
        resizeObserver.disconnect();
      };
    }, []);

    return (
      <div className={cn("relative w-full", wrapperClassName)}>
        <div ref={containerRef} className="relative p-0 overflow-hidden w-full h-full rounded-md">
          <textarea
            {...props}
            ref={setRefs}
            placeholder={placeholder}
            className={cn(
              "flex min-h-[160px] w-full rounded-md border border-border bg-surface px-4 py-3 text-base text-primary placeholder:text-muted focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors font-body resize-y relative z-10 bg-transparent",
              className
            )}
            style={{ ...style, caretColor: "transparent" }}
            value={inputValue}
            onChange={(e) => {
              if (!isControlled) setInternalValue(e.target.value);
              onChange?.(e);
              requestAnimationFrame(() => {
                updateCaretRef.current(e.target);
              });
            }}
            onBlur={(e) => {
              caretOpacityRef.current.set(0);
              onBlur?.(e);
            }}
          />
          <div className="absolute inset-0 bg-surface rounded-md pointer-events-none z-0" />
          <motion.div
            className="bg-primary pointer-events-none absolute top-0 left-0 h-[1.2em] w-[2px] z-20"
            style={{ x: springCaretX, y: springCaretY, opacity: caretOpacity }}
          />
        </div>
      </div>
    );
  }
);

SmoothTextarea.displayName = "SmoothTextarea";
