import fs from 'fs';
import path from 'path';

// Mini DOM implementation for empirical testing of CustomCursor logic
class FakeElement {
  constructor(tagName, attributes = {}, parent = null) {
    this.tagName = tagName.toLowerCase();
    this.attributes = attributes;
    this.parentElement = parent;
    this.children = [];
    if (parent) parent.children.push(this);
  }

  getAttribute(attr) {
    return this.attributes[attr] || null;
  }

  hasAttribute(attr) {
    return attr in this.attributes;
  }

  matches(selector) {
    const selectors = selector.split(',').map(s => s.trim());
    return selectors.some(sel => {
      if (sel === 'a' || sel === 'button' || sel === 'input' || sel === 'textarea' || sel === 'select' || sel === 'label') {
        return this.tagName === sel;
      }
      if (sel === '[role="button"]') {
        return this.attributes['role'] === 'button';
      }
      if (sel === '[data-cursor]') {
        return 'data-cursor' in this.attributes;
      }
      return false;
    });
  }

  closest(selector) {
    let current = this;
    while (current) {
      if (current.matches && current.matches(selector)) {
        return current;
      }
      current = current.parentElement;
    }
    return null;
  }
}

// Test State tracker matching CustomCursor state logic
class CustomCursorTester {
  constructor(isTouch = false) {
    this.isTouch = isTouch;
    this.isHovered = false;
    this.hidden = true;
    this.mouseX = 0;
    this.mouseY = 0;
    this.stateUpdatesCount = 0;
    this.reRenderCount = 0;
    this.history = [];
  }

  handleMouseMove(e) {
    if (this.isTouch) return;
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  handleMouseOver(e) {
    if (this.isTouch) return;
    this.hidden = false;
    const target = e.target;
    if (!target || typeof target.closest !== "function") return;

    const isInteractive = !!target.closest(
      'a, button, input, textarea, select, [role="button"], label, [data-cursor]'
    );

    const prevHovered = this.isHovered;
    // Mirror React functional update logic: setIsHovered((prev) => (prev !== isInteractive ? isInteractive : prev))
    const nextHovered = prevHovered !== isInteractive ? isInteractive : prevHovered;

    if (nextHovered !== prevHovered) {
      this.isHovered = nextHovered;
      this.stateUpdatesCount++;
      this.reRenderCount++;
      this.history.push({ event: 'mouseover', target: target.tagName, isInteractive, isHovered: this.isHovered, stateChanged: true });
    } else {
      this.history.push({ event: 'mouseover', target: target.tagName, isInteractive, isHovered: this.isHovered, stateChanged: false });
    }
  }

  handleMouseOut(e) {
    if (this.isTouch) return;
    if (!e.relatedTarget) {
      this.hidden = true;
      const prevHovered = this.isHovered;
      this.isHovered = false;
      if (prevHovered !== false) {
        this.stateUpdatesCount++;
        this.reRenderCount++;
      }
      this.history.push({ event: 'mouseout', relatedTarget: null, isHovered: false });
    }
  }
}

// Suite Runner
const results = {
  task1_interactive_elements: [],
  task2_non_interactive_elements: [],
  task3_state_transitions_and_flickering: [],
  edge_cases: []
};

console.log("=== RUNNING EMPIRICAL VERIFICATION SUITE FOR CUSTOMCURSOR.TSX ===\n");

// Task 1: Verify Interactive Selectors
const interactiveElements = [
  { tag: 'a', attrs: { href: '/link' }, desc: 'Standard Anchor link <a>' },
  { tag: 'button', attrs: { type: 'button' }, desc: 'Standard <button>' },
  { tag: 'input', attrs: { type: 'text' }, desc: 'Standard <input>' },
  { tag: 'textarea', attrs: {}, desc: 'Standard <textarea>' },
  { tag: 'select', attrs: {}, desc: 'Standard <select>' },
  { tag: 'div', attrs: { role: 'button' }, desc: 'Element with role="button"' },
  { tag: 'label', attrs: { for: 'inp' }, desc: 'Form <label>' },
  { tag: 'div', attrs: { 'data-cursor': 'hover' }, desc: 'Element with [data-cursor]' },
  { tag: 'span', attrs: { 'data-cursor': '' }, desc: 'Span with empty [data-cursor]' },
];

console.log("--- Task 1: Interactive Element Selector Targeting ---");
interactiveElements.forEach(item => {
  const tester = new CustomCursorTester(false);
  const el = new FakeElement(item.tag, item.attrs);
  tester.handleMouseOver({ target: el });
  
  const passed = tester.isHovered === true;
  results.task1_interactive_elements.push({
    desc: item.desc,
    tag: item.tag,
    isHovered: tester.isHovered,
    passed
  });
  console.log(`[${passed ? 'PASS' : 'FAIL'}] ${item.desc} -> isHovered: ${tester.isHovered}`);
});

console.log("\n--- Task 2: Non-Interactive Body Text & Image Protection ---");
const nonInteractiveElements = [
  { tag: 'p', attrs: {}, desc: 'Paragraph <p>' },
  { tag: 'span', attrs: {}, desc: 'Inline <span>' },
  { tag: 'h1', attrs: {}, desc: 'Heading <h1>' },
  { tag: 'h2', attrs: {}, desc: 'Heading <h2>' },
  { tag: 'h3', attrs: {}, desc: 'Heading <h3>' },
  { tag: 'h4', attrs: {}, desc: 'Heading <h4>' },
  { tag: 'h5', attrs: {}, desc: 'Heading <h5>' },
  { tag: 'h6', attrs: {}, desc: 'Heading <h6>' },
  { tag: 'li', attrs: {}, desc: 'List item <li>' },
  { tag: 'img', attrs: { src: 'test.png' }, desc: 'Image <img>' },
  { tag: 'svg', attrs: {}, desc: 'SVG <svg>' },
  { tag: 'div', attrs: {}, desc: 'Generic <div>' },
  { tag: 'article', attrs: {}, desc: 'Semantic <article>' },
  { tag: 'section', attrs: {}, desc: 'Semantic <section>' }
];

nonInteractiveElements.forEach(item => {
  const tester = new CustomCursorTester(false);
  const el = new FakeElement(item.tag, item.attrs);
  tester.handleMouseOver({ target: el });
  
  const passed = tester.isHovered === false;
  results.task2_non_interactive_elements.push({
    desc: item.desc,
    tag: item.tag,
    isHovered: tester.isHovered,
    passed
  });
  console.log(`[${passed ? 'PASS' : 'FAIL'}] ${item.desc} -> isHovered: ${tester.isHovered}`);
});

console.log("\n--- Task 3: State Transition & Flickering Checks ---");

// Test 3.1: Moving mouse inside the same interactive element across nested children
{
  const tester = new CustomCursorTester(false);
  const button = new FakeElement('button');
  const span = new FakeElement('span', {}, button);
  const svg = new FakeElement('svg', {}, span);

  // 1. Enter button
  tester.handleMouseOver({ target: button });
  const step1Hovered = tester.isHovered;
  const updatesAfterStep1 = tester.stateUpdatesCount;

  // 2. Move to inner span
  tester.handleMouseOver({ target: span });
  const step2Hovered = tester.isHovered;
  const updatesAfterStep2 = tester.stateUpdatesCount;

  // 3. Move to inner svg
  tester.handleMouseOver({ target: svg });
  const step3Hovered = tester.isHovered;
  const updatesAfterStep3 = tester.stateUpdatesCount;

  const noFlicker = updatesAfterStep1 === 1 && updatesAfterStep2 === 1 && updatesAfterStep3 === 1;
  const passed = step1Hovered && step2Hovered && step3Hovered && noFlicker;

  results.task3_state_transitions_and_flickering.push({
    test: 'Nested element mouse movement within same interactive parent',
    step1State: step1Hovered,
    step2State: step2Hovered,
    step3State: step3Hovered,
    totalStateUpdates: tester.stateUpdatesCount,
    passed
  });
  console.log(`[${passed ? 'PASS' : 'FAIL'}] Nested movement inside button (button -> span -> svg): State updates=${tester.stateUpdatesCount} (expected 1), isHovered=${tester.isHovered}`);
}

// Test 3.2: Moving mouse between two adjacent interactive elements
{
  const tester = new CustomCursorTester(false);
  const button1 = new FakeElement('button');
  const button2 = new FakeElement('button');

  tester.handleMouseOver({ target: button1 });
  const updates1 = tester.stateUpdatesCount;
  tester.handleMouseOver({ target: button2 });
  const updates2 = tester.stateUpdatesCount;

  const passed = tester.isHovered === true && updates1 === 1 && updates2 === 1;
  results.task3_state_transitions_and_flickering.push({
    test: 'Moving between adjacent interactive elements',
    stateUpdates: updates2,
    passed
  });
  console.log(`[${passed ? 'PASS' : 'FAIL'}] Adjacent interactive element transition (btn1 -> btn2): State updates=${updates2} (expected 1, continuous scale=1), isHovered=${tester.isHovered}`);
}

// Test 3.3: Moving from interactive -> non-interactive -> interactive
{
  const tester = new CustomCursorTester(false);
  const button = new FakeElement('button');
  const paragraph = new FakeElement('p');

  tester.handleMouseOver({ target: button });
  const state1 = tester.isHovered; // true, count=1

  tester.handleMouseOver({ target: paragraph });
  const state2 = tester.isHovered; // false, count=2

  tester.handleMouseOver({ target: button });
  const state3 = tester.isHovered; // true, count=3

  const passed = state1 === true && state2 === false && state3 === true && tester.stateUpdatesCount === 3;
  results.task3_state_transitions_and_flickering.push({
    test: 'Transition interactive -> non-interactive -> interactive',
    stateUpdates: tester.stateUpdatesCount,
    passed
  });
  console.log(`[${passed ? 'PASS' : 'FAIL'}] Interactive -> Non-interactive -> Interactive transition: States=[${state1}, ${state2}, ${state3}], updates=${tester.stateUpdatesCount}`);
}

console.log("\n--- Task 4: Edge Cases & Touch Device Checks ---");

// Test 4.1: Touch device check
{
  const tester = new CustomCursorTester(true); // isTouch = true
  const button = new FakeElement('button');
  tester.handleMouseOver({ target: button });
  const passed = tester.isHovered === false && tester.hidden === true;
  results.edge_cases.push({
    test: 'Touch device suppresses hover',
    passed
  });
  console.log(`[${passed ? 'PASS' : 'FAIL'}] Touch device check: mouseover ignored, isHovered=${tester.isHovered}, hidden=${tester.hidden}`);
}

// Test 4.2: Mouse leaving viewport (mouseout relatedTarget = null)
{
  const tester = new CustomCursorTester(false);
  const button = new FakeElement('button');
  tester.handleMouseOver({ target: button });
  const stateBefore = tester.isHovered;
  
  tester.handleMouseOut({ relatedTarget: null });
  const stateAfter = tester.isHovered;
  const hiddenAfter = tester.hidden;

  const passed = stateBefore === true && stateAfter === false && hiddenAfter === true;
  results.edge_cases.push({
    test: 'Mouse leave viewport via mouseout',
    passed
  });
  console.log(`[${passed ? 'PASS' : 'FAIL'}] Mouse leave viewport (mouseout relatedTarget=null): isHovered=${stateAfter}, hidden=${hiddenAfter}`);
}

// Test 4.3: Target without closest method
{
  const tester = new CustomCursorTester(false);
  // Simulating target as non-element or primitive
  tester.handleMouseOver({ target: {} });
  const passed = tester.isHovered === false;
  results.edge_cases.push({
    test: 'Non-element target without closest method',
    passed
  });
  console.log(`[${passed ? 'PASS' : 'FAIL'}] Non-element target without closest(): Handled gracefully without crash, isHovered=${tester.isHovered}`);
}

// Save detailed JSON results
const outputPath = path.join(process.cwd(), '.agents/teamwork_preview_challenger_customcursor_2/scratch/test_results.json');
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
console.log(`\nDetailed test results written to: ${outputPath}`);
