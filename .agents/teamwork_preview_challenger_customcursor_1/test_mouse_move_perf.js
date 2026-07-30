const { performance } = require('perf_hooks');

// Mock MotionValue as used by Framer Motion
class MotionValue {
  constructor(initial) {
    this.value = initial;
  }
  set(v) {
    this.value = v;
  }
  get() {
    return this.value;
  }
}

// Simulated DOM node for depth scaling comparison
function createDOMTree(depth, branchFactor = 2) {
  if (depth === 0) return { tagName: 'DIV', children: [], querySelector: () => null, closest: () => null };
  const children = [];
  for (let i = 0; i < branchFactor; i++) {
    children.push(createDOMTree(depth - 1, branchFactor));
  }
  const node = {
    tagName: 'DIV',
    children,
    closest: (selector) => {
      // Linear tree traversal up parent chain
      let current = node;
      while (current) {
        if (selector.includes('a') && current.isInteractive) return current;
        current = current.parent;
      }
      return null;
    }
  };
  children.forEach(c => c.parent = node);
  return node;
}

function runBenchmark() {
  console.log('=== STRESS TEST 1: Time Complexity & Layout Thrashing ===\n');

  const mouseX = new MotionValue(0);
  const mouseY = new MotionValue(0);

  // The exact handleMouseMove handler from CustomCursor.tsx
  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  // Test across different DOM tree depths
  const treeDepths = [1, 10, 100, 1000, 5000];
  const iterationsPerDepth = 200000; // 200k mousemove events per depth

  console.log(`Executing ${iterationsPerDepth.toLocaleString()} mousemove updates per DOM depth...`);

  const results = [];

  for (const depth of treeDepths) {
    const rootNode = createDOMTree(depth, 1); // Deep linear chain
    const leafNode = (function getLeaf(n) { return n.children.length ? getLeaf(n.children[0]) : n; })(rootNode);

    // Instrument layout property trap to verify 0 layout thrashing calls
    let layoutAccesses = 0;
    const mockEvent = {
      clientX: 500,
      clientY: 300,
      target: leafNode
    };

    // Proxy check to catch layout property accesses if any were attempted
    Object.defineProperties(mockEvent, {
      offsetHeight: { get() { layoutAccesses++; return 100; } },
      offsetWidth: { get() { layoutAccesses++; return 100; } },
      getBoundingClientRect: { value: () => { layoutAccesses++; return {}; } }
    });

    const start = performance.now();
    for (let i = 0; i < iterationsPerDepth; i++) {
      mockEvent.clientX = i;
      mockEvent.clientY = i * 2;
      handleMouseMove(mockEvent);
    }
    const end = performance.now();
    const totalMs = end - start;
    const nsPerOp = (totalMs * 1e6) / iterationsPerDepth;

    results.push({ depth, totalMs: totalMs.toFixed(3), nsPerOp: nsPerOp.toFixed(2), layoutAccesses });
  }

  console.table(results);

  // Compare with handleMouseOver (which performs element matching)
  console.log('\n--- Comparing handleMouseMove (O(1)) vs handleMouseOver (O(depth)) ---');
  const handleMouseOver = (e, targetNode) => {
    const target = targetNode;
    if (!target || typeof target.closest !== "function") return;
    const isInteractive = !!target.closest(
      'a, button, input, textarea, select, [role="button"], label, [data-cursor]'
    );
  };

  const comparisonResults = [];
  for (const depth of [1, 10, 100, 1000]) {
    const rootNode = createDOMTree(depth, 1);
    const leafNode = (function getLeaf(n) { return n.children.length ? getLeaf(n.children[0]) : n; })(rootNode);
    const mockEvent = { target: leafNode };

    // measure handleMouseMove
    const t0 = performance.now();
    for (let i = 0; i < 100000; i++) handleMouseMove({ clientX: i, clientY: i });
    const moveTime = performance.now() - t0;

    // measure handleMouseOver
    const t1 = performance.now();
    for (let i = 0; i < 100000; i++) handleMouseOver(mockEvent, leafNode);
    const overTime = performance.now() - t1;

    comparisonResults.push({
      depth,
      handleMouseMove_ms: moveTime.toFixed(2),
      handleMouseOver_ms: overTime.toFixed(2),
      overheadRatio: (overTime / moveTime).toFixed(1) + 'x'
    });
  }

  console.table(comparisonResults);

  // Verify O(1) condition
  const variance = Math.max(...results.map(r => parseFloat(r.nsPerOp))) - Math.min(...results.map(r => parseFloat(r.nsPerOp)));
  console.log(`\nMax variance across DOM depths: ${variance.toFixed(2)} ns/op`);
  console.log(`Layout reflow calls detected during mousemove: ${results.reduce((acc, r) => acc + r.layoutAccesses, 0)}`);

  return { results, comparisonResults, variance };
}

runBenchmark();
