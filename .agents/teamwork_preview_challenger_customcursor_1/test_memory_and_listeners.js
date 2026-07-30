// Memory & Event Listener Verification Test
class MockEventTarget {
  constructor(name) {
    this.name = name;
    this.listeners = new Map();
  }

  addEventListener(type, listener, options) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type).push({ listener, options });
  }

  removeEventListener(type, listener) {
    if (!this.listeners.has(type)) return;
    const list = this.listeners.get(type);
    const index = list.findIndex(item => item.listener === listener);
    if (index !== -1) {
      list.splice(index, 1);
    }
    if (list.length === 0) {
      this.listeners.delete(type);
    }
  }

  get totalListenerCount() {
    let count = 0;
    for (const list of this.listeners.values()) {
      count += list.length;
    }
    return count;
  }
}

function runMemoryAndListenerTest() {
  console.log('=== STRESS TEST 3: Memory Leaks & Event Listener Lifecycle ===\n');

  const mockWindow = new MockEventTarget('window');
  const mockDocument = new MockEventTarget('document');

  // Simulated React useEffect lifecycle for CustomCursor
  function mountCustomCursor(isTouch = false) {
    if (isTouch) return () => {};

    const mouseX = { set: () => {} };
    const mouseY = { set: () => {} };

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || typeof target.closest !== "function") return;
      const isInteractive = !!target.closest(
        'a, button, input, textarea, select, [role="button"], label, [data-cursor]'
      );
    };

    const handleMouseOut = (e) => {
      if (!e.relatedTarget) {}
    };

    const handleMouseLeave = () => {};
    const handleMouseEnter = () => {};

    mockWindow.addEventListener("mousemove", handleMouseMove, { passive: true });
    mockWindow.addEventListener("mouseover", handleMouseOver, { passive: true });
    mockWindow.addEventListener("mouseout", handleMouseOut, { passive: true });
    mockDocument.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    mockDocument.addEventListener("mouseenter", handleMouseEnter, { passive: true });

    // Cleanup function returned by useEffect
    return () => {
      mockWindow.removeEventListener("mousemove", handleMouseMove);
      mockWindow.removeEventListener("mouseover", handleMouseOver);
      mockWindow.removeEventListener("mouseout", handleMouseOut);
      mockDocument.removeEventListener("mouseleave", handleMouseLeave);
      mockDocument.removeEventListener("mouseenter", handleMouseEnter);
    };
  }

  // Initial State Check
  console.log(`Pre-mount window listener count: ${mockWindow.totalListenerCount}`);
  console.log(`Pre-mount document listener count: ${mockDocument.totalListenerCount}`);

  // Single mount test
  const cleanup = mountCustomCursor(false);
  console.log(`\nAfter mount window listener count: ${mockWindow.totalListenerCount}`);
  console.log(`After mount document listener count: ${mockDocument.totalListenerCount}`);

  // Verify listener types and passive option
  const windowEvents = Array.from(mockWindow.listeners.entries()).map(([type, list]) => ({
    type,
    count: list.length,
    passive: list[0].options?.passive === true
  }));
  const docEvents = Array.from(mockDocument.listeners.entries()).map(([type, list]) => ({
    type,
    count: list.length,
    passive: list[0].options?.passive === true
  }));

  console.log('\nWindow listeners registered:');
  console.table(windowEvents);
  console.log('Document listeners registered:');
  console.table(docEvents);

  // Unmount test
  cleanup();
  console.log(`\nAfter unmount window listener count: ${mockWindow.totalListenerCount}`);
  console.log(`After unmount document listener count: ${mockDocument.totalListenerCount}`);

  // Cycle stress test (10,000 mount/unmount cycles)
  console.log('\n--- Running 10,000 mount / unmount stress cycles ---');
  if (global.gc) global.gc();
  const initialMem = process.memoryUsage().heapUsed;

  for (let i = 0; i < 10000; i++) {
    const unmount = mountCustomCursor(false);
    unmount();
  }

  if (global.gc) global.gc();
  const finalMem = process.memoryUsage().heapUsed;
  const memDiffKB = (finalMem - initialMem) / 1024;

  console.log(`Post-stress window listener count: ${mockWindow.totalListenerCount}`);
  console.log(`Post-stress document listener count: ${mockDocument.totalListenerCount}`);
  console.log(`Heap delta after 10,000 cycles: ${memDiffKB.toFixed(2)} KB`);

  // Touch device check
  console.log('\n--- Checking touch device branch (isTouch = true) ---');
  const touchCleanup = mountCustomCursor(true);
  console.log(`Touch device window listener count: ${mockWindow.totalListenerCount}`);
  console.log(`Touch device document listener count: ${mockDocument.totalListenerCount}`);

  const passed = mockWindow.totalListenerCount === 0 && mockDocument.totalListenerCount === 0;
  console.log(`\nZero Lingering Listener Assertion: ${passed ? 'PASSED' : 'FAILED'}`);
}

runMemoryAndListenerTest();
