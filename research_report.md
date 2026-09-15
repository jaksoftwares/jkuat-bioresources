# JKUAT Bioresources Catalogue Research Report

## 1. Reference Sites Analysis

We analyzed the four reference websites provided to understand how they present and organize bioresource content, particularly regarding structure, language, layout, CTAs, and overall user experience.

### A. Leibniz Institute DSMZ (dsmz.de)
- **Content Structure:** Highly structured and data-dense. Each culture (e.g., DSM-308) has a dedicated details page. The data is presented in a tabular/list format with clear labels (Name, DSM No., Strain designation, Isolated from, Nagoya Protocol Restrictions, History, Cultivation conditions).
- **Language:** Scientific, professional, and precise. It assumes a high level of domain knowledge from the user.
- **Layout:** Clean, clinical, and somewhat traditional. Uses a sidebar for help topics and related external links (e.g., BacDive, LPSN, MediaDive). The main content area focuses purely on the data.
- **CTAs (Call to Actions):** Primary CTAs are "Add to Cart" and "Open Pricelist" prominently placed at the top right of the item details.
- **Organization:** Hierarchical (Collection > Catalogue > Microorganisms > [Item]).

### B. MACS Collection of Microorganisms - MCM (mcm.aripune.res.in)
- **Content Structure:** Features a prominent search interface upfront (Basic and Advanced search). The advanced search allows building complex queries (AND/OR, Accession Type, Genus, Species, etc.).
- **Language:** Academic and instructional. Includes disclaimers about taxonomy updates (e.g., referring to LPSN).
- **Layout:** Utilitarian and functional. The design is somewhat dated but focuses heavily on the search utility rather than browsing.
- **CTAs:** Primary CTAs revolve around the search functionality ("Search", "Add More" for advanced queries).
- **Organization:** Centered around the search engine to dive into a database of "nearly one thousand deposits of archaea, bacteria, anaerobic fungi and consortia".

### C. Kristu Jayanti Microbial Culture Collection - KJMCC (kristujayanti.edu.in)
- **Content Structure:** More narrative and institutional. Focuses heavily on the mission, vision, and objectives before presenting the catalog.
- **Language:** Educational and welcoming ("Welcome to the...", "Our state-of-the-art facility...").
- **Layout:** Modern, brochure-style layout. Uses hero images (scientists looking into microscopes) and clear, card-based sections for Mission/Vision.
- **CTAs:** Top navigation CTAs for "Culture Catalogue", "Request the Culture", and "Terms & Conditions".
- **Organization:** Acts more as a landing page for the institution's bioresource center rather than a direct database interface.

### D. Culture Collections - UKHSA (culturecollections.org.uk)
- **Content Structure:** Broad and categorized. Supports multiple collections (Cell lines, Bacteria, Viruses, Fungi).
- **Language:** Authoritative, medical, and commercial.
- **Layout:** Professional e-commerce style. Uses large icon-based tiles for primary categories (Cell lines, Bacteria, Viruses, Fungi) and a large carousel for announcements.
- **CTAs:** E-commerce focused ("Log in", "Register", "Quick shop", "Cart") and newsletter signups.
- **Organization:** Category-driven (Products > Services > News), designed to funnel users into specific product silos.

### Summary of Best Practices for JKUAT Bioresources
1. **Search-First approach:** Like MCM, a robust search (basic + advanced) is critical for researchers.
2. **Detailed Item Pages:** Like DSMZ, each item needs a structured, table-like view of its metadata (isolation source, cultivation, history).
3. **Clear Categorization:** Like UKHSA, use clear visual entry points for the main scopes: **Herbarium**, **Plants**, and **Bacteria**.
4. **Institutional Context:** Like KJMCC, maintain a professional landing page that explains the purpose of the JKUAT Bioresources center.

---

## 2. JKUAT Bioresources: Current Structure Analysis

We analyzed the current repository for the JKUAT Bioresources application to understand the existing architecture.

### Tech Stack
The application is built using a modern stack:
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (with a custom typography configured in `globals.css`)
- **Database/Backend:** Supabase
- **UI Components:** Shadcn UI (`components/ui/`)

### Directory Architecture
The project follows a feature-based and clean architecture pattern:

1. **`app/`**: Contains the Next.js routing structure.
   - `(auth)`: Authentication routes.
   - `(public)`: Public-facing pages (likely landing page, public catalog).
   - `dashboard`: Authenticated user/admin dashboard.
   - `api`: API routes.
2. **`features/`**: The core domain logic is neatly separated by scope.
   - `herbarium/`: Logic and components specific to herbarium collections.
   - `plants/`: Logic and components specific to living plants.
   - `microorganisms/`: Logic and components specific to bacteria/microbes.
   - `search/`: Centralized search functionality.
   - `auth/`, `users/`, `reports/`, `uploads/`: Supporting features.
3. **`components/`**: Reusable UI elements.
   - `ui/`: Base Shadcn components.
   - `forms/`, `tables/`, `charts/`: Complex layout components.
   - `public/`: Components for the public-facing site.
   - `dashboard/`: Components for the admin interface.
4. **`repositories/` & `services/`**: Data access layer and business logic layer, keeping the UI components clean and abstracting Supabase calls.
5. **`store/`**: State management (likely Zustand or Redux).
6. **`types/`**: TypeScript interfaces and types for the domain models.
7. **`validators/`**: Zod schemas for form and API validation.

### Scope: Herbarium, Plants, Bacteria
The current architecture in the `features/` directory explicitly supports the three main scopes requested:
- `herbarium/`
- `plants/`
- `microorganisms/` (Bacteria)

### Typography & Aesthetics
The user has specified that the **current typography is to be retained**. The app uses a global CSS setup (`globals.css`) that likely configures modern fonts (often Inter or similar for standard Next.js setups).

---

## 3. Recommendations & Next Steps

To align the JKUAT Bioresources application with the vision of the reference sites while utilizing the modern Next.js architecture, we recommend the following:

1. **Public Catalog Layout (Reference: UKHSA + KJMCC):**
   - The public landing page (`app/(public)/`) should feature three distinct, high-quality visual entry points for **Herbarium**, **Plants**, and **Bacteria (Microorganisms)**.
   - Include a brief institutional mission statement at the top.

2. **Advanced Search Interface (Reference: MCM):**
   - Implement a robust search bar on the public landing page.
   - Create a dedicated advanced search page (`app/(public)/search`) that allows researchers to filter by specific taxonomic ranks, accession numbers, and sources.

3. **Detailed Resource Pages (Reference: DSMZ):**
   - For individual item pages (e.g., `app/(public)/bacteria/[id]`), use a clean, tabular layout displaying all metadata.
   - **CTAs:** Include clear "Request Culture" or "Add to Cart" buttons for authenticated users.

4. **Typography & Styling:**
   - Retain the existing typography as requested.
   - Ensure the UI components (`components/ui`) leverage modern, accessible design patterns (clean borders, subtle shadows, clear data tables).

**Conclusion:** The current codebase is extremely well-structured and perfectly positioned to implement the sophisticated features seen in the reference sites. The feature-driven architecture (`features/herbarium`, `features/plants`, `features/microorganisms`) maps exactly to the desired scope.
