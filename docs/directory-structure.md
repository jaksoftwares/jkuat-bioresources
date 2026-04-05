JKUAT Bioresources – Professional Full Directory Structure
jkuat-bioresources/
│
├── app/
│   ├── (public)/
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── api/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   └── globals.css
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── forms/
│   ├── tables/
│   ├── charts/
│   └── shared/
│
├── features/
│   ├── auth/
│   ├── users/
│   ├── plants/
│   ├── microorganisms/
│   ├── herbarium/
│   ├── reports/
│   ├── search/
│   ├── uploads/
│   └── analytics/
│
├── services/
│
├── repositories/
│
├── lib/
│
├── hooks/
│
├── store/
│
├── types/
│
├── validators/
│
├── constants/
│
├── middleware.ts
│
├── public/
│
├── supabase/
│   ├── migrations/
│   ├── seeds/
│   └── policies/
│
├── tests/
│
├── docs/
│
├── scripts/
│
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md

This is the professional root structure.

Now let’s break it down properly.

1) app/ → Core Application (Frontend + Serverless Backend)

This is the heart of the project.

Public Pages
app/(public)/
│
├── page.tsx
├── about/page.tsx
├── search/page.tsx
│
├── plants/
│   ├── page.tsx
│   └── [id]/page.tsx
│
├── microorganisms/
│   ├── page.tsx
│   └── [id]/page.tsx
│
├── herbarium/
│   ├── page.tsx
│   └── [id]/page.tsx

These are public-facing pages.

Examples:

landing page
public search
public resource view
Auth Pages
app/(auth)/
│
├── login/page.tsx
├── register/page.tsx
├── forgot-password/page.tsx
└── reset-password/page.tsx
Dashboard Pages

This is where admins, researchers, and technical team work.

app/(dashboard)/
│
├── dashboard/page.tsx
│
├── users/
│   ├── page.tsx
│   └── [id]/page.tsx
│
├── plants/
│   ├── page.tsx
│   ├── create/page.tsx
│   ├── [id]/page.tsx
│   └── [id]/edit/page.tsx
│
├── microorganisms/
│   ├── page.tsx
│   ├── create/page.tsx
│   ├── storage-map/page.tsx
│   └── [id]/edit/page.tsx
│
├── herbarium/
│   ├── page.tsx
│   ├── create/page.tsx
│   └── [id]/edit/page.tsx
│
├── reports/
│   └── page.tsx
│
└── settings/
    └── page.tsx

This is very scalable.

2) app/api/ → Full Serverless Backend

This is your backend layer.

Every route becomes a serverless endpoint.

app/api/
│
├── auth/
│   ├── login/route.ts
│   ├── register/route.ts
│   └── roles/route.ts
│
├── users/
│   ├── route.ts
│   └── [id]/route.ts
│
├── plants/
│   ├── route.ts
│   └── [id]/route.ts
│
├── microorganisms/
│   ├── route.ts
│   ├── [id]/route.ts
│   └── storage-map/route.ts
│
├── herbarium/
│   ├── route.ts
│   └── [id]/route.ts
│
├── upload/
│   ├── image/route.ts
│   └── document/route.ts
│
├── import/
│   └── csv/route.ts
│
├── reports/
│   └── route.ts
│
└── analytics/
    └── route.ts

Examples:

GET /api/plants
POST /api/plants
PUT /api/plants/[id]
DELETE /api/plants/[id]

This is the backend.

3) features/ → Domain Modules (VERY IMPORTANT)

This is where business domains live.

This is what makes the project enterprise-grade.

features/
│
├── auth/
├── users/
├── plants/
├── microorganisms/
├── herbarium/
├── reports/
├── analytics/
├── search/
└── uploads/

Each feature should contain:

features/plants/
│
├── components/
├── hooks/
├── services/
├── schemas/
├── utils/
└── types.ts

This keeps everything modular.

4) components/ → Shared UI Components

Reusable UI elements.

components/
│
├── ui/
│   ├── button.tsx
│   ├── modal.tsx
│   ├── card.tsx
│   └── input.tsx
│
├── layout/
│   ├── navbar.tsx
│   ├── sidebar.tsx
│   └── footer.tsx
│
├── forms/
│   ├── plant-form.tsx
│   ├── microorganism-form.tsx
│   └── herbarium-form.tsx
│
├── tables/
│   ├── plants-table.tsx
│   ├── microorganism-table.tsx
│   └── users-table.tsx
│
└── charts/
5) services/ → Business Logic Layer

This is where all major application logic should go.

services/
│
├── auth.service.ts
├── users.service.ts
├── plants.service.ts
├── microorganisms.service.ts
├── herbarium.service.ts
├── upload.service.ts
├── report.service.ts
└── analytics.service.ts

Examples:

validation
access checks
transformations
integrations

Never place complex logic directly in routes.

6) repositories/ → Database Access Layer

Very important.

This separates database logic from business logic.

repositories/
│
├── user.repository.ts
├── plant.repository.ts
├── microorganism.repository.ts
├── herbarium.repository.ts
└── audit.repository.ts

Example:

export class PlantRepository {
  async findAll() {}
  async findById(id: string) {}
  async create(data: PlantInput) {}
}

Professional architecture.

7) lib/ → Integrations + Helpers

This folder holds integrations and utilities.

lib/
│
├── supabase/
│   ├── client.ts
│   ├── server.ts
│   └── admin.ts
│
├── cloudinary.ts
├── auth.ts
├── permissions.ts
├── csv-parser.ts
├── excel-parser.ts
├── pdf-generator.ts
└── logger.ts

Examples:

Supabase client
Cloudinary config
CSV utilities
8) types/ → Central TypeScript Models

Very important for data-heavy systems.

types/
│
├── user.ts
├── role.ts
├── plant.ts
├── microorganism.ts
├── herbarium.ts
├── report.ts
└── api.ts

Example:

export interface Plant {
  id: string
  scientificName: string
  localNames: string[]
  medicinalValue?: string
}
9) validators/ → Zod Schemas

Very important.

validators/
│
├── auth.schema.ts
├── user.schema.ts
├── plant.schema.ts
├── microorganism.schema.ts
└── herbarium.schema.ts

This keeps validation centralized.

10) store/ → Client State

For Zustand / React Query helpers.

store/
│
├── auth.store.ts
├── filters.store.ts
└── ui.store.ts
11) hooks/
hooks/
│
├── use-auth.ts
├── use-upload.ts
├── use-search.ts
└── use-role.ts
12) supabase/ → Database Infrastructure

VERY IMPORTANT.

supabase/
│
├── migrations/
│   ├── 001_users.sql
│   ├── 002_plants.sql
│   ├── 003_microorganisms.sql
│   └── 004_herbarium.sql
│
├── seeds/
│   └── sample-data.sql
│
└── policies/
    └── rls-policies.sql

This keeps schema versioned professionally.

13) docs/

Very important for serious projects.

docs/
│
├── architecture.md
├── api-documentation.md
├── database-schema.md
├── deployment.md
└── user-flow.md
14) tests/
tests/
│
├── unit/
├── integration/
└── e2e/
PROFESSIONAL RECOMMENDATION

This structure is production-ready and scalable.

It can comfortably support:

10k+ records
multiple departments