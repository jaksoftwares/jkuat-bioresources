

# JKUAT BIORESOURCES

# COMPLETE BRANDING + TYPOGRAPHY DOCUMENTATION GUIDE


# 1. BRAND DESIGN PRINCIPLES

Before colors and fonts, define the visual philosophy.

---

## Core Brand Personality

```txt
Academic
Scientific
Clean
Research-focused
Institutional
Trustworthy
Modern
Accessible
```

This should feel like:

```txt
University + Laboratory + Research Portal
```

NOT like:

```txt
Startup / e-commerce / social media
```

Very important.

---

# 2. PRIMARY COLOR SYSTEM (JKUAT CONSISTENT)

From the official university visual feel, green should remain the primary institutional identity. ([JKUAT][1])

I recommend a **refined professional palette inspired by JKUAT’s identity**.

---

## Primary Brand Colors

```css
:root {
  --jkuat-green: #006b3f;
  --jkuat-green-dark: #004f2e;
  --jkuat-green-light: #e8f5ee;

  --jkuat-gold: #c8a24a;
  --jkuat-gold-light: #f7edd4;

  --jkuat-white: #ffffff;
  --jkuat-off-white: #f8faf8;

  --jkuat-gray-900: #1f2937;
  --jkuat-gray-700: #4b5563;
  --jkuat-gray-500: #6b7280;
  --jkuat-gray-200: #e5e7eb;
}
```

---

## Meaning of Colors

---

### JKUAT Green

```txt
#006b3f
```

Use for:

* navbar
* sidebar
* primary buttons
* headings accents
* active tabs
* links
* charts primary color

Represents:

```txt
research
agriculture
life sciences
institutional trust
```

---

### JKUAT Gold

```txt
#c8a24a
```

Use for:

* badges
* special highlights
* analytics indicators
* premium info panels
* active stats cards

Represents:

```txt
prestige
academic excellence
institutional authority
```

---

### Neutral Academic Gray

For scientific readability.

```txt
#1f2937
#4b5563
#6b7280
```

These should dominate text.

---

# 3. TYPOGRAPHY SYSTEM (VERY IMPORTANT)

Typography is where professionalism is won or lost.

For academic systems, avoid decorative fonts.

---

## Recommended Font Stack

For Next.js use `next/font/google`

I strongly recommend:

```txt
Inter
```

because it is:

* professional
* highly readable
* perfect for dashboards
* excellent on data-heavy systems

---

## Setup

```ts
// app/layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-primary",
});
```

---

# 4. TYPOGRAPHY HIERARCHY

This must be documented clearly.

---

## H1 – Page Title

```css
font-size: 32px;
font-weight: 700;
line-height: 40px;
letter-spacing: -0.02em;
```

Example:

```txt
Bioresources Repository
```

---

## H2 – Section Title

```css
font-size: 24px;
font-weight: 600;
line-height: 32px;
```

Example:

```txt
Microorganism Storage Map
```

---

## H3 – Card / Widget Title

```css
font-size: 18px;
font-weight: 600;
line-height: 28px;
```

---

## Body Large

```css
font-size: 16px;
font-weight: 400;
line-height: 26px;
```

---

## Body Standard

```css
font-size: 14px;
font-weight: 400;
line-height: 22px;
```

Perfect for data tables.

---

## Caption / Metadata

```css
font-size: 12px;
font-weight: 400;
line-height: 18px;
color: var(--jkuat-gray-500);
```

Use for:

```txt
created_at
updated_at
researcher metadata
storage locations
```

---

# 5. TAILWIND THEME CONFIGURATION

Very important for consistency.

---

## `tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        jkuat: {
          green: "#006b3f",
          greenDark: "#004f2e",
          greenLight: "#e8f5ee",
          gold: "#c8a24a",
          grayText: "#1f2937",
        },
      },
      fontFamily: {
        sans: ["var(--font-primary)"],
      },
      borderRadius: {
        lg: "12px",
        xl: "16px",
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.06)",
      },
    },
  },
};

export default config;
```

---

# 6. UI COMPONENT DESIGN RULES

This is VERY important.

---

## Cards

All content modules should use uniform cards.

```css
background: white;
border: 1px solid #e5e7eb;
border-radius: 12px;
padding: 24px;
box-shadow: 0 2px 12px rgba(0,0,0,0.06);
```

Examples:

* plant card
* herbarium specimen card
* dashboard analytics

---

## Buttons

---

### Primary Button

```css
background: var(--jkuat-green);
color: white;
font-weight: 600;
border-radius: 10px;
```

---

### Secondary Button

```css
border: 1px solid var(--jkuat-green);
color: var(--jkuat-green);
background: white;
```

---

### Danger Button

```css
background: #dc2626;
color: white;
```

---

# 7. TABLE DESIGN SYSTEM

Since this is a research-heavy platform, tables are critical.

---

## Table Rules

```txt
sticky headers
alternating row hover
soft borders
consistent spacing
```

Example:

```css
thead {
  background: #f8faf8;
  font-weight: 600;
}
```

Perfect for:

* plants
* researchers
* microorganism inventory

---

# 8. FORM DESIGN SYSTEM

Forms must feel scientific and structured.

---

## Label Styling

```css
font-size: 14px;
font-weight: 500;
color: #1f2937;
margin-bottom: 6px;
```

---

## Input Styling

```css
height: 44px;
border-radius: 10px;
border: 1px solid #d1d5db;
padding: 0 14px;
```

---

## Focus State

```css
border-color: var(--jkuat-green);
box-shadow: 0 0 0 3px rgba(0, 107, 63, 0.15);
```

Very professional.

---

# 9. DATA VISUALIZATION COLORS

For analytics dashboards.

---

## Charts Palette

```txt
Primary = JKUAT Green
Secondary = Gold
Neutral = Gray
Success = Green Light
Warning = Amber
Danger = Red
```

Example:

```txt
Research Contributions → Green
Storage Utilization → Gold
Public Access → Gray
```

---

# 10. ICONOGRAPHY

Use:

```txt
lucide-react
```

Keep icons:

```txt
outline
clean
minimal
```

Examples:

```txt
Leaf
Microscope
FlaskConical
Database
Users
BookOpen
MapPinned
```

Perfect for this project.

---

# 11. BRAND CONSISTENCY RULES (IMPORTANT)

This should be in documentation.

---

## Never Do

```txt
Do not use random colors
Do not mix font families
Do not use bright gradients
Do not use rounded playful UI
Do not use flashy shadows
Do not use inconsistent button sizes
```

---

## Always Do

```txt
Use brand green as primary
Maintain consistent spacing
Use typography hierarchy
Use white content surfaces
Use scientific clean layout
```

---

# 12. SPACING SYSTEM

Very important.

Use 8px scale.

```txt
4
8
12
16
24
32
40
48
64
```

Example:

```txt
cards = 24
sections = 32
page blocks = 48
```

---

# 13. PAGE LAYOUT SYSTEM

Professional dashboard layout:

```txt
Sidebar = 280px
Header = 72px
Content max width = 1440px
Card padding = 24px
```

---

This gives you a **full institutional design system guide**.

Honestly, this is exactly what a design lead would hand over before frontend implementation.

Next best step:

I strongly recommend we build a **`theme.ts` / Tailwind design tokens file** directly from this documentation so the entire app stays consistent.

[1]: https://www.jkuat.ac.ke/?utm_source=chatgpt.com "Home - Jomo Kenyatta University of Agriculture and Technology"
