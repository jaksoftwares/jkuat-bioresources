# JKUAT Bioresources – API & Server Actions Documentation

This document outlines the core API endpoints and Server Actions required to power the JKUAT Bioresources Web Application. These are designed to interact with the [Production Schema](file:///c:/Users/josep/jkuat-bioresources/supabase/migrations/20260405020000_production_complete_schema.sql).

---

## 🔐 1. Authentication & User Profile Module
*Handles user identity, role assignments, and researchers' academic metadata.*

| API / Action Name | Method | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `auth:signIn` | POST | Public | Authenticates users (Email/Staff No). |
| `auth:signUp` | POST | Public | Registers new users (Researchers/Students). |
| `profile:getMe` | GET | Auth | Retrieves the current logged-in user's profile and roles. |
| `profile:update` | PUT | Auth | Updates personal details (name, phone, avatar). |
| `researcher:getDetails` | GET | Public | Gets academic info (specialization, focus) for a specific researcher. |
| `researcher:update` | PUT | Researcher | Updates academic profile (qualifications, focus). |

---

## 🌿 2. Plants & AIVs Module
*Manages general plant knowledge and African Indigenous Vegetables (AIVs).*

| API / Action Name | Method | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `plants:list` | GET | Public | Lists plants with filters (AIV flag, category, family). |
| `plants:get` | GET | Public | Retrieves full details of a specific plant (including local names). |
| `plants:create` | POST | Researcher | Adds a new plant/AIV record. |
| `plants:update` | PUT | Researcher | Updates an existing plant record (Owner/Admin only). |
| `plants:delete` | DELETE | Admin | Removes a plant record. |
| `plants:addLocalName`| POST | Researcher | Adds a multilingual local name to a plant. |
| `plants:addRecommendation`| POST | Researcher | Adds health/nutritional usage recommendations. |

---

## 🧬 3. Microorganisms Module
*Scientific data management for lab specimens (Bacteria, Fungi, etc.).*

| API / Action Name | Method | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `micro:list` | GET | Public | Lists microorganisms with filters (strain code, scientific name). |
| `micro:get` | GET | Public | Retrieves full physiological and experimental data. |
| `micro:create` | POST | Researcher | Registers a new microorganism strain. |
| `micro:update` | PUT | Researcher | Updates physiological data or experiment details. |
| `micro:assignStorage` | POST | Researcher | Maps a microorganism to a specific test tube in the lab hierarchy. |
| `micro:getStorageMap` | GET | Public | Retrieves the visual/hierarchical storage mapping. |

---

## 🏷️ 4. Herbarium Specimen Module
*Digitized archive of physical plant specimens.*

| API / Action Name | Method | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `herbarium:list` | GET | Public | Searchable list of herbarium specimens by code or name. |
| `herbarium:get` | GET | Public | High-res scans and taxonomic details of a specimen. |
| `herbarium:create` | POST | Researcher | Digitizes a physical specimen with code and storage details. |
| `herbarium:update` | PUT | Researcher | Updates habitat notes or physical location. |

---

## 🧊 5. Lab Storage Hierarchy Module
*Inventory management for lab units.*

| API / Action Name | Method | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `storage:listFridges` | GET | Auth | Lists all available fridge units. |
| `storage:getHierarchy` | GET | Auth | Recursive tree of Fridge -> Shelf -> Tray -> Partition. |
| `storage:checkAvailability`| GET | Researcher | Checks if a specific test tube position is occupied. |
| `storage:updateUnit` | PUT | Admin | Edits codes or descriptions of storage units. |

---

## 📊 6. Tools, Imports & Admin
*High-level system management.*

| API / Action Name | Method | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `import:uploadCSV` | POST | Researcher | Bulk imports plant or micro data via CSV template. |
| `import:getStatus` | GET | Researcher | Tracks the progress and errors of a bulk import job. |
| `export:data` | GET | Auth | Generates CSV/PDF exports of search results. |
| `admin:assignRole` | POST | Admin | Changes a user's role (e.g., Public -> Researcher). |
| `admin:getAuditLogs` | GET | Technical | Views system-wide changes for security/integrity checks. |
| `media:upload` | POST | Researcher | Handles image/document uploads (Proxies to Cloudinary). |

---

## 🔍 7. Global Search & Discovery
*Cross-module search capabilities.*

| API / Action Name | Method | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `search:unified` | GET | Public | Unified keyword search across Plants, Micro, and Herbarium. |
| `search:byRegion` | GET | Public | Map-based search for AIVs by geographic distribution. |
| `analytics:summary` | GET | Public | Counts and stats for the landing page dashboard. |

---

> [!TIP]
> **Implementation Note:** In Next.js + Supabase, most **GET** operations can be handled directly by the Supabase client in Client Components (due to RLS). **POST/PUT/DELETE** operations should be implemented as **Server Actions** to ensure strict server-side validation and role checking.
