# SARIV Design System

**Version:** 1.0  
**Status:** Canonical Reference

---

## 1. Philosophy

The SARIV Design System exists to ensure that every digital interface we build feels unmistakably like it belongs to the same product family. It is not merely a UI kit; it is a rigid set of principles that govern every visual and interaction decision.

Our goal is not to look modern. **Our goal is to be timeless.**

Every screen, page, and component must communicate:
- Precision
- Craftsmanship
- Intelligence
- Confidence
- Calmness

If a design decision does not actively reinforce these values, it must be removed.

---

## 2. Design Principles

### 2.1 Less, Better
Do fewer things, but do them exceptionally well. Avoid visual clutter at all costs. Every single element on the screen must earn its place. 

### 2.2 Typography Is The Interface
In the absence of heavy graphical elements, typography carries the vast majority of the visual weight. We rely on large, striking headlines, readable body copy, generous line spacing, and high contrast.

### 2.3 Whitespace Is A Component
Whitespace is intentional. It creates rhythm, establishes focus, and communicates confidence. Never fill empty space simply because it exists; allow the layout to breathe.

### 2.4 Motion Has Meaning
Nothing moves simply because it can. Every animation must communicate hierarchy, state changes, progression, or emotion. *(See **[SARIV_MotionSystem.md](file:///Users/dhruvalbhinsara/SARIV-Website/docs/SARIV_MotionSystem.md)** for detailed specifications).*

### 2.5 Products Over Decoration
Users visit our site to understand our products, not to admire our gradients. The product interface itself should always be the hero of the page.

---

## 3. Brand Attributes

The SARIV design language feels:
- **Intelligent:** Data-driven and structured.
- **Calm:** High whitespace, muted palettes.
- **Premium:** Exacting alignment, elegant typography.
- **Technical:** Engineered precision.
- **Intentional:** No arbitrary design choices.

It must never feel:
- **Loud / Trendy / Flashy:** We do not chase fads.
- **Corporate / Sales-focused:** We educate and demonstrate; we do not sell aggressively.

---

## 4. Color System

The palette is intentionally restrained, rendering the interface almost monochromatic. Accent colors exist strictly to create atmosphere (e.g., in subtle background gradients or lighting), never to attract direct attention.

### 4.1 Core Interface Colors
- **Background:** `#FAF9F7` (Off-White)
- **Surface:** `#FFFFFF` (Pure White)
- **Surface Elevated:** `#F4F4F2` (Slightly darker for cards/modals)
- **Primary Text:** `#111111` (Near Black for readability)
- **Secondary Text:** `#555555` (Dark Gray for supporting copy)
- **Muted Text:** `#8A8A8A` (Medium Gray for captions/meta)
- **Borders:** `#E7E7E4` (Light Gray, subtle definition)

### 4.2 Atmospheric Colors
Used only in background gradients, 3D lighting, or noise textures. **Never** use these for text or primary buttons.
- **Mist Blue:** `#DCEFF4`
- **Soft Peach:** `#F5E4DB`
- **Warm Sand:** `#F4EFE8`
- **Pale Lavender:** `#ECE8F4`
- **Fog Green:** `#E8F2EC`

### 4.3 Semantic Colors
Used extremely sparingly, only when communicating critical states.
- **Success:** `#0F9D58`
- **Warning:** `#F4B400`
- **Error:** `#DB4437`
- **Info:** `#4285F4`

---

## 5. Typography System

### 5.1 Typefaces
- **Display:** *Instrument Serif* (or *Canela* / *Cormorant Garamond*). Used exclusively for hero headlines, large statements, and editorial moments.
- **Body:** *Inter*. Used for all readable interface content, subheadings, and data.

### 5.2 Typographic Scale

#### Display (Hero / Editorial)
- **Font:** Instrument Serif
- **Weight:** Regular
- **Size:** `72px` – `120px` (Scaling fluidly down on mobile)
- **Line Height:** `95%` (Tight leading for large text)
- **Letter Spacing:** `-2%`

#### Heading (Sections / Features)
- **Font:** Instrument Serif
- **Weight:** Regular
- **Size:** `48px` – `72px`
- **Line Height:** `110%`

#### Subheading (Supporting Text)
- **Font:** Inter
- **Weight:** Medium
- **Size:** `24px` – `32px`
- **Line Height:** `140%`

#### Body (Paragraphs / UI)
- **Font:** Inter
- **Weight:** Regular
- **Size:** `18px` (Base)
- **Line Height:** `170%` (Generous for readability)
- **Max Width:** `70 characters` (To maintain optimal reading measure)
- **Alignment:** Justified (Text must stretch to align with both left and right margins, preventing ragged edges and giving a highly engineered look).

#### Caption (Metadata / Tags)
- **Font:** Inter
- **Weight:** Medium
- **Size:** `12px` – `14px`
- **Case:** Uppercase optional with slight letter spacing (`1px`).
- **Alignment:** Justified (where applicable for multi-line captions).

---

## 6. Layout & Grid System

### 6.1 Desktop (`1024px` and above)
- **Columns:** 12
- **Max Width:** `1440px`
- **Margins:** `80px`
- **Gutters:** `24px`

### 6.2 Tablet (`768px` – `1023px`)
- **Columns:** 8
- **Margins:** `40px`
- **Gutters:** `16px`

### 6.3 Mobile (Below `768px`)
- **Columns:** 4
- **Margins:** `20px`
- **Gutters:** `16px`

### 6.4 Content Containers
- **Reading Width (Articles/Docs):** `720px` max-width.
- **Medium Width (Forms/Modals):** `1080px` max-width.
- **Large Width (Showcases):** `1280px` max-width.

---

## 7. Spacing System

All padding and margins must be derived from this base `8px` scale. Large sections must be given room to breathe.
- **Scale:** `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`, `128px`, `160px`, `192px`, `256px`.
- **Section Spacing:** Typical vertical spacing between major page sections should be `160px` to `240px`. Never use less than `120px` between distinct chapters of a page.

---

## 8. Geometry & Depth

### 8.1 Border Radius
Avoid "bubbly" interfaces. Corners should be rounded, but structured.
- **Small (`8px`):** Inputs, tooltips, checkboxes.
- **Medium (`16px`):** Buttons, small cards, dropdowns.
- **Large (`24px`):** Feature cards, modals, hero images.
- **Pill (`999px`):** Badges, specific toggle switches.

### 8.2 Shadows & Elevation
Avoid harsh, heavy drop shadows. Rely instead on soft elevation, background blur, ambient lighting, or borders.
- **Standard Elevation:** `0px 8px 40px rgba(0,0,0,0.05)`

### 8.3 Borders
- **Thickness:** `1px`
- **Style:** Solid, subtle (`#E7E7E4`), low contrast. Never use thick or dark borders for layout division.

---

## 9. Foundational UI Principles

### 9.1 Buttons
Buttons must feel calm, not promotional.
- **Primary:** Black background, white text. Lift slightly on hover.
- **Secondary:** Transparent with subtle border. Dark text.
- *(For detailed component specs, refer to **[SARIV_ComponentLibrary.MD](file:///Users/dhruvalbhinsara/SARIV-Website/docs/SARIV_ComponentLibrary.MD)**).*

### 9.2 Iconography
- **Style:** Minimal, rounded corners, `2px` stroke, simple geometry.
- **Rule:** Never use emojis in place of proper iconography.

### 9.3 Imagery
- **Preferred:** High-fidelity product interfaces, architectural photography, abstract geometry, material studies (light on stone, glass, paper).
- **Avoid:** Corporate graphics, stock photography, fake/placeholder dashboards, isometric startup illustrations.

---

## 10. Execution

This design system is strict by design. When in doubt:
1. Strip away the decoration.
2. Increase the whitespace.
3. Enlarge the typography.
4. Let the content speak for itself.
