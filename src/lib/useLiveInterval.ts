"use client";

import { useEffect, useRef } from "react";

// Runs `callback` on a fixed interval, skipping ticks while the tab is hidden
// and firing once immediately when it becomes visible again (so a dashboard
// left open in a background tab doesn't burn requests, but catches up fast).
export function useLiveInterval(callback: () => void, intervalMs: number) {
  const savedCallback = useRef(callback);
  savedCallback.current = callback;

  useEffect(() => {
    function tick() {
      if (document.visibilityState === "visible") savedCallback.current();
    }
    const id = setInterval(tick, intervalMs);
    document.addEventListener("visibilitychange", tick);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [intervalMs]);
}
