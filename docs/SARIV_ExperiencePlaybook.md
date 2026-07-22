# SARIV Experience Playbook

**Version:** 1.0  
**Status:** Canonical Reference

---

## 1. Purpose

This document defines the *experience* of using the SARIV website. It goes beyond UI components and layout structures.

Every interaction must make visitors feel that SARIV builds software with exceptional care. If a feature improves functionality but weakens the overarching emotional experience, the experience wins. The feature must be redesigned.

---

## 2. Core Experience Statement

The SARIV website should feel less like browsing a standard corporate website, and more like walking through a carefully curated exhibition.

Visitors should:
- Never feel rushed.
- Never feel overwhelmed by information density.
- Never feel as though they are being aggressively sold to.

Instead, they should feel calmly guided.

---

## 3. The Emotional Journey

Every visitor moves through six defined emotional stages. Every page and section must deliberately move the user forward along this path. Never backward.

1. **Arrival:** *"This feels premium and different."*
2. **Curiosity:** *"What exactly do they build?"*
3. **Understanding:** *"They build serious, well-engineered software."*
4. **Trust:** *"I believe they know exactly what they are doing."*
5. **Excitement:** *"This is exactly the caliber of team we need."*
6. **Action:** *"I am going to contact them."*

---

## 4. The Time Constraints

We design for the reality of short attention spans.

### 4.1 The First Three Seconds
The visitor has not yet read anything. Their brain only asks: *"Does this feel credible?"*
- **Requirements:** Beautiful typography, calm motion, strong spacing, premium lighting, zero clutter, and immediate rendering performance.
- If this moment fails, nothing else matters. The user will leave or their trust will be permanently diminished.

### 4.2 Five Seconds
The visitor now asks: *"What is SARIV?"*
- The homepage hero must answer this immediately. Never rely on the user scrolling. Never hide the value proposition behind vague marketing copy.

### 4.3 Ten Seconds
The visitor asks: *"Why should I trust you?"*
- Show them. Immediately present high-fidelity product previews, exceptional work, or a distinct philosophy. Never start with a long-winded company history.

### 4.4 Thirty Seconds
By this time, the visitor should clearly understand:
1. Who you are.
2. What you build.
3. Who it helps.
4. Why you are different.
5. What they should do next.
- If they do not, the page architecture has failed.

---

## 5. Cognitive Load & Attention Management

Users have strictly limited attention. We must manage it fiercely.

### 5.1 One Primary Idea Per Viewport
Every viewport should contain exactly one primary idea. Everything else on the screen must exist solely to support that idea. Do not force elements to compete for attention.

### 5.2 One Decision Per Screen
- **Good Flow:** Read → Watch → Scroll → Click.
- **Bad Flow:** Read + Compare + Choose + Watch + Click (simultaneously).

### 5.3 Strict Visual Hierarchy
Every viewport must unequivocally answer:
1. What should I notice first?
2. What should I notice second?
3. What should I notice third?
- If the hierarchy is unclear, remove elements until it is.

---

## 6. Interaction & Navigation

### 6.1 Scroll Rhythm
Scrolling should feel like moving through a documentary film. It should have a musical rhythm.
- **Fast:** Introduction (Hero).
- **Slow:** Product reveal (allow time for observation).
- **Medium:** Process explanation.
- **Slow:** Case studies (reading time).
- **Fast:** Call to Action (clear, single intent).

### 6.2 Product Reveal
Never show everything immediately. Reveal complexity progressively. Curiosity is highly valuable; confusion is not.

### 6.3 Hover & Microinteractions
Hover states should acknowledge interaction quietly, not celebrate it.
- **Behavior:** Small movements (`2px` lift), subtle background shifts, quiet confidence.
- *(For technical specifications on motion, refer to **[SARIV_MotionSystem.md](file:///Users/dhruvalbhinsara/SARIV-Website/docs/SARIV_MotionSystem.md)**).*

### 6.4 Loading States
Loading is a critical part of the experience.
- Never show blank white screens.
- Show progress and structural continuity (e.g., Skeleton loaders).

---

## 7. Reading Experience

Walls of text reduce trust and comprehension.
- **Paragraph Limit:** Maximum 3-4 lines per paragraph.
- **Whitespace:** High whitespace increases readability and signals confidence.

---

## 8. Media & Visuals

### 8.1 Images
Every image must answer: *"What does this teach the user?"*
- Never use images merely for decoration. Images must illustrate a concept or demonstrate quality.

### 8.2 Videos
- **Rule:** One idea per video.
- **Duration:** Maximum 20 seconds.
- **Execution:** Loop seamlessly. No unnecessary editing or flashy transitions.

---

## 9. Trust & Delight

### 9.1 Trust
Trust is not built through testimonials alone. It is earned through:
- Design consistency.
- Rendering performance.
- Honest, unexaggerated copywriting.
- Evident craftsmanship.

### 9.2 Delight
Delight must be subtle and structural.
- **Examples of Good Delight:** Perfect animation timing, beautiful typography rendering, smooth scrolling, thoughtful microcopy.
- **Examples of Bad Delight:** Confetti animations, complex hover effects that slow down the UI, "clever" popups.

### 9.3 Surprise
- **Good Surprises:** Unexpected polish, helpful context appearing exactly when needed.
- **Bad Surprises:** Popups, auto-playing audio, random layout shifts, hidden navigation.

---

## 10. Device Specifics (Mobile)

Mobile is not a "shrunk down" version of the desktop site. It is the primary experience for a massive segment of our audience.
- Everything must feel native and thumb-friendly.
- Navigation must be instantly accessible.
- Performance must be flawless on mid-tier devices.

---

## 11. Edge Cases (Errors & Empty States)

### 11.1 Empty States
An empty state should never feel broken. It must explain why it is empty, guide the user, and invite action.

### 11.2 Errors
Errors should reduce anxiety. Never blame the user.
- **Always explain:** What happened, why it happened, and what the user should do next.

---

## 12. Memory Anchors

When a visitor leaves the SARIV website, they should remember:
- The elegant typography.
- The calmness of the interface.
- The precision of the engineering.
- The quality of the product.
- The feeling of trust.

They should **not** remember:
- The animation library used.
- A specific gradient.
- A quirky UI effect.

---

## 13. Experience Quality Checklist

For every new feature, page, or component, ask:
- [ ] Does it simplify the user's journey?
- [ ] Does it clarify the product?
- [ ] Does it reduce friction?
- [ ] Does it reinforce trust?
- [ ] Does it support the overarching narrative?
- [ ] **Crucial:** Would removing it actually improve the experience? (If yes, remove it immediately).

---

## 14. Definition of Exceptional

An exceptional digital experience is one where the interface disappears entirely, the core story remains, and the visitor remembers only how the product made them feel. 

That is the standard for SARIV.
