# JKUAT Bioresources - Official SVG Logo System

We have created ONE strong, highly professional master identity for the **JKUAT Bioresources** platform. 

The master symbol perfectly balances your requirements:
- **Leaf Shield Layout:** Representing both biology/agriculture and institutional preservation. Splits cleanly into the two institutional greens.
- **DNA Helix Integration:** Intricately weaves through the core of the leaf without making it overly complex. 
- **Digital Grid / Nodes:** The DNA consists of server-like "nodes" and "rungs", surrounded by a micro-dashed metric ring that signals a digital scientific repository.
- **Colors:** Deep Green (`#006B3F`), Dark Green (`#004F2E`), and Gold Accent (`#C8A24A`).

All versions are in **clean, production-ready vector SVG code**. You don't need any local image files. Simply copy and paste these into your React/Next.js components or save them as `.svg` files in your `/public/` folder.

---

### 1. Primary Logo (Horizontal)
*Best for main navigation bars and headers. Icon on the left, clear typography on the right.*

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 100" width="100%" height="100%">
  <!-- Icon Group -->
  <g transform="translate(0, 0)">
    <circle cx="50" cy="50" r="45" fill="none" stroke="#004F2E" stroke-opacity="0.3" stroke-width="1" stroke-dasharray="3 4"/>
    
    <path d="M 50 8 C 25 18, 12 32, 12 50 C 12 68, 25 82, 50 92 Z" fill="#004F2E"/>
    <path d="M 50 8 C 75 18, 88 32, 88 50 C 88 68, 75 82, 50 92 Z" fill="#006B3F"/>
    
    <path d="M 33 25 Q 75 35, 50 50 T 67 75" fill="none" stroke="#C8A24A" stroke-width="2.5" stroke-linecap="round" />
    <path d="M 67 25 Q 25 35, 50 50 T 33 75" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" />
    
    <circle cx="33" cy="25" r="3.5" fill="#C8A24A" />
    <circle cx="67" cy="25" r="3.5" fill="#FFFFFF" />
    <circle cx="67" cy="75" r="3.5" fill="#FFFFFF" />
    <circle cx="33" cy="75" r="3.5" fill="#C8A24A" />
    <circle cx="50" cy="50" r="4.5" fill="#C8A24A" />
    
    <line x1="43" y1="34" x2="57" y2="34" stroke="#FFFFFF" stroke-opacity="0.8" stroke-width="1.5" />
    <line x1="39" y1="42" x2="61" y2="42" stroke="#C8A24A" stroke-opacity="0.8" stroke-width="1.5" />
    <line x1="39" y1="58" x2="61" y2="58" stroke="#FFFFFF" stroke-opacity="0.8" stroke-width="1.5" />
    <line x1="43" y1="66" x2="57" y2="66" stroke="#C8A24A" stroke-opacity="0.8" stroke-width="1.5" />
  </g>

  <!-- Typography -->
  <text x="115" y="48" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="800" font-size="32" fill="#004F2E" letter-spacing="0.5">JKUAT</text>
  <text x="115" y="82" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="600" font-size="28" fill="#006B3F" letter-spacing="0">Bioresources</text>
</svg>
```

---

### 2. Stacked Version
*Best for footers, login screens, or cover pages.*

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 220" width="100%" height="100%">
  <g transform="translate(100, 10)">
    <circle cx="50" cy="50" r="45" fill="none" stroke="#004F2E" stroke-opacity="0.3" stroke-width="1" stroke-dasharray="3 4"/>
    <path d="M 50 8 C 25 18, 12 32, 12 50 C 12 68, 25 82, 50 92 Z" fill="#004F2E"/>
    <path d="M 50 8 C 75 18, 88 32, 88 50 C 88 68, 75 82, 50 92 Z" fill="#006B3F"/>
    
    <path d="M 33 25 Q 75 35, 50 50 T 67 75" fill="none" stroke="#C8A24A" stroke-width="2.5" stroke-linecap="round" />
    <path d="M 67 25 Q 25 35, 50 50 T 33 75" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" />
    
    <circle cx="33" cy="25" r="3.5" fill="#C8A24A" />
    <circle cx="67" cy="25" r="3.5" fill="#FFFFFF" />
    <circle cx="67" cy="75" r="3.5" fill="#FFFFFF" />
    <circle cx="33" cy="75" r="3.5" fill="#C8A24A" />
    <circle cx="50" cy="50" r="4.5" fill="#C8A24A" />
    
    <line x1="43" y1="34" x2="57" y2="34" stroke="#FFFFFF" stroke-opacity="0.8" stroke-width="1.5" />
    <line x1="39" y1="42" x2="61" y2="42" stroke="#C8A24A" stroke-opacity="0.8" stroke-width="1.5" />
    <line x1="39" y1="58" x2="61" y2="58" stroke="#FFFFFF" stroke-opacity="0.8" stroke-width="1.5" />
    <line x1="43" y1="66" x2="57" y2="66" stroke="#C8A24A" stroke-opacity="0.8" stroke-width="1.5" />
  </g>

  <text x="150" y="155" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="800" font-size="34" fill="#004F2E" letter-spacing="0.5">JKUAT</text>
  <text x="150" y="195" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="600" font-size="28" fill="#006B3F" letter-spacing="0">Bioresources</text>
</svg>
```

---

### 3. Icon Only
*A beautiful standalone mark for sidebars and app icons.*

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="45" fill="none" stroke="#004F2E" stroke-opacity="0.3" stroke-width="1" stroke-dasharray="3 4"/>
  <path d="M 50 8 C 25 18, 12 32, 12 50 C 12 68, 25 82, 50 92 Z" fill="#004F2E"/>
  <path d="M 50 8 C 75 18, 88 32, 88 50 C 88 68, 75 82, 50 92 Z" fill="#006B3F"/>
  
  <path d="M 33 25 Q 75 35, 50 50 T 67 75" fill="none" stroke="#C8A24A" stroke-width="2.5" stroke-linecap="round" />
  <path d="M 67 25 Q 25 35, 50 50 T 33 75" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" />
  
  <circle cx="33" cy="25" r="3.5" fill="#C8A24A" />
  <circle cx="67" cy="25" r="3.5" fill="#FFFFFF" />
  <circle cx="67" cy="75" r="3.5" fill="#FFFFFF" />
  <circle cx="33" cy="75" r="3.5" fill="#C8A24A" />
  <circle cx="50" cy="50" r="4.5" fill="#C8A24A" />
  
  <line x1="43" y1="34" x2="57" y2="34" stroke="#FFFFFF" stroke-opacity="0.8" stroke-width="1.5" />
  <line x1="39" y1="42" x2="61" y2="42" stroke="#C8A24A" stroke-opacity="0.8" stroke-width="1.5" />
  <line x1="39" y1="58" x2="61" y2="58" stroke="#FFFFFF" stroke-opacity="0.8" stroke-width="1.5" />
  <line x1="43" y1="66" x2="57" y2="66" stroke="#C8A24A" stroke-opacity="0.8" stroke-width="1.5" />
</svg>
```

---

### 4. Monochrome Version (Black)
*Perfect for printed documents, letterheads, or strict black-and-white media. Uses SVG masking to elegantly cut out the DNA strands.*

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 100" width="100%" height="100%">
  <defs>
    <mask id="cutout-black">
      <rect width="100%" height="100%" fill="white" />
      <path d="M 33 25 Q 75 35, 50 50 T 67 75" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" />
      <path d="M 67 25 Q 25 35, 50 50 T 33 75" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" />
      <circle cx="33" cy="25" r="3.5" fill="black" />
      <circle cx="67" cy="25" r="3.5" fill="black" />
      <circle cx="67" cy="75" r="3.5" fill="black" />
      <circle cx="33" cy="75" r="3.5" fill="black" />
      <circle cx="50" cy="50" r="4.5" fill="black" />
      <line x1="43" y1="34" x2="57" y2="34" stroke="black" stroke-width="1.5" />
      <line x1="39" y1="42" x2="61" y2="42" stroke="black" stroke-width="1.5" />
      <line x1="39" y1="58" x2="61" y2="58" stroke="black" stroke-width="1.5" />
      <line x1="43" y1="66" x2="57" y2="66" stroke="black" stroke-width="1.5" />
    </mask>
  </defs>

  <g transform="translate(0, 0)">
    <circle cx="50" cy="50" r="45" fill="none" stroke="#111111" stroke-opacity="0.5" stroke-width="1" stroke-dasharray="3 4"/>
    <g mask="url(#cutout-black)">
      <path d="M 50 8 C 25 18, 12 32, 12 50 C 12 68, 25 82, 50 92 Z" fill="#111111"/>
      <path d="M 50 8 C 75 18, 88 32, 88 50 C 88 68, 75 82, 50 92 Z" fill="#111111"/>
    </g>
  </g>

  <text x="115" y="48" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="800" font-size="32" fill="#111111" letter-spacing="0.5">JKUAT</text>
  <text x="115" y="82" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="600" font-size="28" fill="#111111" letter-spacing="0">Bioresources</text>
</svg>
```

---

### 5. White Version
*For dark backgrounds or dark mode aesthetics. Cuts cleanly to reveal the background beneath the strands.*

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 100" width="100%" height="100%">
  <defs>
    <mask id="cutout-white">
      <rect width="100%" height="100%" fill="white" />
      <path d="M 33 25 Q 75 35, 50 50 T 67 75" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" />
      <path d="M 67 25 Q 25 35, 50 50 T 33 75" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" />
      <circle cx="33" cy="25" r="3.5" fill="black" />
      <circle cx="67" cy="25" r="3.5" fill="black" />
      <circle cx="67" cy="75" r="3.5" fill="black" />
      <circle cx="33" cy="75" r="3.5" fill="black" />
      <circle cx="50" cy="50" r="4.5" fill="black" />
      <line x1="43" y1="34" x2="57" y2="34" stroke="black" stroke-width="1.5" />
      <line x1="39" y1="42" x2="61" y2="42" stroke="black" stroke-width="1.5" />
      <line x1="39" y1="58" x2="61" y2="58" stroke="black" stroke-width="1.5" />
      <line x1="43" y1="66" x2="57" y2="66" stroke="black" stroke-width="1.5" />
    </mask>
  </defs>

  <g transform="translate(0, 0)">
    <circle cx="50" cy="50" r="45" fill="none" stroke="#FFFFFF" stroke-opacity="0.4" stroke-width="1" stroke-dasharray="3 4"/>
    <g mask="url(#cutout-white)">
      <path d="M 50 8 C 25 18, 12 32, 12 50 C 12 68, 25 82, 50 92 Z" fill="#FFFFFF"/>
      <path d="M 50 8 C 75 18, 88 32, 88 50 C 88 68, 75 82, 50 92 Z" fill="#FFFFFF"/>
    </g>
  </g>

  <text x="115" y="48" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="800" font-size="32" fill="#FFFFFF" letter-spacing="0.5">JKUAT</text>
  <text x="115" y="82" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="600" font-size="28" fill="#FFFFFF" letter-spacing="0">Bioresources</text>
</svg>
```

---

### 6. Favicon Version
*A simplified scale-up version focusing entirely on the main organic shape for tiny sizes.*

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="6 6 88 88" width="100%" height="100%">
  <path d="M 50 8 C 25 18, 12 32, 12 50 C 12 68, 25 82, 50 92 Z" fill="#004F2E"/>
  <path d="M 50 8 C 75 18, 88 32, 88 50 C 88 68, 75 82, 50 92 Z" fill="#006B3F"/>
  
  <path d="M 33 25 Q 75 35, 50 50 T 67 75" fill="none" stroke="#C8A24A" stroke-width="3" stroke-linecap="round" />
  <path d="M 67 25 Q 25 35, 50 50 T 33 75" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" />
  
  <circle cx="33" cy="25" r="4" fill="#C8A24A" />
  <circle cx="67" cy="25" r="4" fill="#FFFFFF" />
  <circle cx="67" cy="75" r="4" fill="#FFFFFF" />
  <circle cx="33" cy="75" r="4" fill="#C8A24A" />
  <circle cx="50" cy="50" r="5" fill="#C8A24A" />
</svg>
```

---

### 7. Explicit Transparent Variants
*(Note: SVGs natively feature a fully transparent background canvas. Every single code snippet generated above has a transparent background by default and will effortlessly blend over any element you set it against, precisely meeting the "no background" requirement).*

---

### 8. Text-Only Wordmark
*For spaces where only the branding title applies, preserving typographic weight and tracking.*

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 100" width="100%" height="100%">
  <text x="0" y="48" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="800" font-size="32" fill="#004F2E" letter-spacing="0.5">JKUAT</text>
  <text x="0" y="82" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="600" font-size="28" fill="#006B3F" letter-spacing="0">Bioresources</text>
</svg>
```
