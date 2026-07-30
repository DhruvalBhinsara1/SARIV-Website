import fs from 'fs';
import path from 'path';

class DOMNode {
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
      if (['a', 'button', 'input', 'textarea', 'select', 'label'].includes(sel)) {
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

class CursorStateMachine {
  constructor(isTouch = false) {
    this.isTouch = isTouch;
    this.isHovered = false;
    this.hidden = true;
    this.stateSetterInvocations = 0;
    this.stateReRenders = 0;
  }

  handleMouseOver(target) {
    if (this.isTouch) return;
    this.hidden = false;
    if (!target || typeof target.closest !== "function") return;

    const isInteractive = !!target.closest(
      'a, button, input, textarea, select, [role="button"], label, [data-cursor]'
    );

    this.stateSetterInvocations++;

    const prevHovered = this.isHovered;
    const nextHovered = prevHovered !== isInteractive ? isInteractive : prevHovered;

    if (nextHovered !== prevHovered) {
      this.isHovered = nextHovered;
      this.stateReRenders++;
    }
  }

  handleMouseOut(relatedTarget) {
    if (this.isTouch) return;
    if (!relatedTarget) {
      this.hidden = true;
      const prevHovered = this.isHovered;
      const nextHovered = false;
      this.stateSetterInvocations++;
      if (prevHovered !== nextHovered) {
        this.isHovered = false;
        this.stateReRenders++;
      }
    }
  }
}

console.log("=== STRESS TESTING CUSTOMCURSOR BEHAVIOR ===\n");

const stressResults = [];

// Stress Test 1: Complex Real-World DOM Tree Navigation
{
  const root = new DOMNode('body');
  const header = new DOMNode('header', {}, root);
  const nav = new DOMNode('nav', {}, header);
  const anchor = new DOMNode('a', { href: '/' }, nav);
  const logoSpan = new DOMNode('span', {}, anchor);

  const main = new DOMNode('main', {}, root);
  const article = new DOMNode('article', {}, main);
  const h1 = new DOMNode('h1', {}, article);
  const p = new DOMNode('p', {}, article);
  const pSpan = new DOMNode('span', {}, p);
  const button = new DOMNode('button', {}, p);
  const btnSpan = new DOMNode('span', {}, button);
  const btnSvg = new DOMNode('svg', {}, btnSpan);
  const btnPath = new DOMNode('path', {}, btnSvg);

  const stateMachine = new CursorStateMachine(false);

  stateMachine.handleMouseOver(logoSpan);
  const step1 = stateMachine.isHovered === true;

  stateMachine.handleMouseOver(h1);
  const step2 = stateMachine.isHovered === false;

  stateMachine.handleMouseOver(pSpan);
  const step3 = stateMachine.isHovered === false;

  stateMachine.handleMouseOver(btnPath);
  const step4 = stateMachine.isHovered === true;

  const rendersBefore = stateMachine.stateReRenders;
  stateMachine.handleMouseOver(btnSpan);
  const rendersAfter = stateMachine.stateReRenders;
  const step5 = stateMachine.isHovered === true && rendersBefore === rendersAfter;

  const pass = step1 && step2 && step3 && step4 && step5;
  stressResults.push({ name: "Complex DOM Tree Navigation", pass });
  console.log(`[${pass ? 'PASS' : 'FAIL'}] Complex DOM Tree Navigation test`);
}

// Stress Test 2: Rapid Hovering across 100 Elements
{
  const stateMachine = new CursorStateMachine(false);
  const p = new DOMNode('p');
  const btn = new DOMNode('button');

  // Start with btn so first hover transitions false -> true
  stateMachine.handleMouseOver(btn); // 1
  for (let i = 0; i < 49; i++) {
    stateMachine.handleMouseOver(p);   // +1
    stateMachine.handleMouseOver(btn); // +1
  }
  stateMachine.handleMouseOver(p);     // +1 -> total 100 transitions

  const pass = stateMachine.stateReRenders === 100 && stateMachine.isHovered === false;
  stressResults.push({ name: "Rapid 100-Element Oscillating Hover", pass });
  console.log(`[${pass ? 'PASS' : 'FAIL'}] Rapid Oscillating Hover (100 state transitions): Re-renders=${stateMachine.stateReRenders} (expected 100)`);
}

// Stress Test 3: Micro-Movements within 100 Child Elements inside a Single Interactive Button
{
  const stateMachine = new CursorStateMachine(false);
  const btn = new DOMNode('button');
  const children = Array.from({ length: 100 }, (_, i) => new DOMNode('span', { id: `child-${i}` }, btn));

  stateMachine.handleMouseOver(btn);
  const initialRenders = stateMachine.stateReRenders;

  children.forEach(child => stateMachine.handleMouseOver(child));
  const finalRenders = stateMachine.stateReRenders;

  const pass = initialRenders === 1 && finalRenders === 1 && stateMachine.isHovered === true;
  stressResults.push({ name: "100 Micro-Movements inside Single Button", pass });
  console.log(`[${pass ? 'PASS' : 'FAIL'}] 100 Micro-Movements inside Button: Total Re-renders=${finalRenders} (expected 1, zero flickering)`);
}

const outputPath = path.join(process.cwd(), '.agents/teamwork_preview_challenger_customcursor_2/scratch/stress_results.json');
fs.writeFileSync(outputPath, JSON.stringify(stressResults, null, 2));
console.log(`\nStress test results written to ${outputPath}`);
