
# ── scaffold.ps1 – Create all missing dirs & stub files ──────────────────────
Set-Location $PSScriptRoot/..

$dirs = @(
  # App – public route group
  "app/(public)",
  "app/(public)/about",
  "app/(public)/search",
  "app/(public)/plants",
  "app/(public)/plants/[id]",
  "app/(public)/microorganisms",
  "app/(public)/microorganisms/[id]",
  "app/(public)/herbarium",
  "app/(public)/herbarium/[id]",

  # App – auth route group
  "app/(auth)/login",
  "app/(auth)/register",
  "app/(auth)/forgot-password",
  "app/(auth)/reset-password",

  # App – dashboard route group
  "app/(dashboard)/dashboard",
  "app/(dashboard)/users",
  "app/(dashboard)/users/[id]",
  "app/(dashboard)/plants",
  "app/(dashboard)/plants/create",
  "app/(dashboard)/plants/[id]",
  "app/(dashboard)/plants/[id]/edit",
  "app/(dashboard)/microorganisms",
  "app/(dashboard)/microorganisms/create",
  "app/(dashboard)/microorganisms/storage-map",
  "app/(dashboard)/microorganisms/[id]/edit",
  "app/(dashboard)/herbarium",
  "app/(dashboard)/herbarium/create",
  "app/(dashboard)/herbarium/[id]/edit",
  "app/(dashboard)/reports",
  "app/(dashboard)/settings",

  # API routes
  "app/api/auth/login",
  "app/api/auth/register",
  "app/api/auth/roles",
  "app/api/users",
  "app/api/users/[id]",
  "app/api/plants",
  "app/api/plants/[id]",
  "app/api/microorganisms",
  "app/api/microorganisms/[id]",
  "app/api/microorganisms/storage-map",
  "app/api/herbarium",
  "app/api/herbarium/[id]",
  "app/api/upload/image",
  "app/api/upload/document",
  "app/api/import/csv",
  "app/api/reports",
  "app/api/analytics",

  # Shared components
  "components/ui",
  "components/layout",
  "components/forms",
  "components/tables",
  "components/charts",
  "components/shared",

  # Feature modules
  "features/auth/components",
  "features/auth/hooks",
  "features/auth/services",
  "features/auth/schemas",
  "features/auth/utils",
  "features/users/components",
  "features/users/hooks",
  "features/users/services",
  "features/users/schemas",
  "features/users/utils",
  "features/plants/components",
  "features/plants/hooks",
  "features/plants/services",
  "features/plants/schemas",
  "features/plants/utils",
  "features/microorganisms/components",
  "features/microorganisms/hooks",
  "features/microorganisms/services",
  "features/microorganisms/schemas",
  "features/microorganisms/utils",
  "features/herbarium/components",
  "features/herbarium/hooks",
  "features/herbarium/services",
  "features/herbarium/schemas",
  "features/herbarium/utils",
  "features/reports/components",
  "features/reports/hooks",
  "features/reports/services",
  "features/reports/schemas",
  "features/reports/utils",
  "features/analytics/components",
  "features/analytics/hooks",
  "features/analytics/services",
  "features/analytics/schemas",
  "features/analytics/utils",
  "features/search/components",
  "features/search/hooks",
  "features/search/services",
  "features/search/schemas",
  "features/search/utils",
  "features/uploads/components",
  "features/uploads/hooks",
  "features/uploads/services",
  "features/uploads/schemas",
  "features/uploads/utils",

  # Business logic / infra
  "services",
  "repositories",
  "lib/supabase",
  "hooks",
  "store",
  "types",
  "validators",
  "constants",

  # Supabase infra
  "supabase/migrations",
  "supabase/seeds",
  "supabase/policies",

  # Tests
  "tests/unit",
  "tests/integration",
  "tests/e2e",

  # Additional docs
  "docs"
)

foreach ($d in $dirs) {
  New-Item -ItemType Directory -Force -Path $d | Out-Null
  Write-Host "DIR  $d"
}

# ── Stub files ────────────────────────────────────────────────────────────────
# Helper: write only if file does not already exist
function New-Stub {
  param([string]$Path, [string]$Content)
  if (-not (Test-Path $Path)) {
    Set-Content -Path $Path -Value $Content -Encoding UTF8
    Write-Host "FILE $Path"
  } else {
    Write-Host "SKIP $Path (exists)"
  }
}

# ── app/(public) ──────────────────────────────────────────────────────────────
New-Stub "app/(public)/page.tsx" "export default function PublicHome() { return <div>Public Home</div> }"
New-Stub "app/(public)/about/page.tsx" "export default function AboutPage() { return <div>About</div> }"
New-Stub "app/(public)/search/page.tsx" "export default function SearchPage() { return <div>Search</div> }"
New-Stub "app/(public)/plants/page.tsx" "export default function PlantsPage() { return <div>Plants</div> }"
New-Stub "app/(public)/plants/[id]/page.tsx" "export default function PlantDetailPage() { return <div>Plant Detail</div> }"
New-Stub "app/(public)/microorganisms/page.tsx" "export default function MicroorganismsPage() { return <div>Microorganisms</div> }"
New-Stub "app/(public)/microorganisms/[id]/page.tsx" "export default function MicroorganismDetailPage() { return <div>Microorganism Detail</div> }"
New-Stub "app/(public)/herbarium/page.tsx" "export default function HerbariumPage() { return <div>Herbarium</div> }"
New-Stub "app/(public)/herbarium/[id]/page.tsx" "export default function HerbariumDetailPage() { return <div>Herbarium Detail</div> }"

# ── app/(auth) ────────────────────────────────────────────────────────────────
New-Stub "app/(auth)/login/page.tsx" "export default function LoginPage() { return <div>Login</div> }"
New-Stub "app/(auth)/register/page.tsx" "export default function RegisterPage() { return <div>Register</div> }"
New-Stub "app/(auth)/forgot-password/page.tsx" "export default function ForgotPasswordPage() { return <div>Forgot Password</div> }"
New-Stub "app/(auth)/reset-password/page.tsx" "export default function ResetPasswordPage() { return <div>Reset Password</div> }"

# ── app/(dashboard) ───────────────────────────────────────────────────────────
New-Stub "app/(dashboard)/dashboard/page.tsx" "export default function DashboardPage() { return <div>Dashboard</div> }"
New-Stub "app/(dashboard)/users/page.tsx" "export default function UsersPage() { return <div>Users</div> }"
New-Stub "app/(dashboard)/users/[id]/page.tsx" "export default function UserDetailPage() { return <div>User Detail</div> }"
New-Stub "app/(dashboard)/plants/page.tsx" "export default function PlantsAdminPage() { return <div>Plants Admin</div> }"
New-Stub "app/(dashboard)/plants/create/page.tsx" "export default function CreatePlantPage() { return <div>Create Plant</div> }"
New-Stub "app/(dashboard)/plants/[id]/page.tsx" "export default function PlantAdminDetailPage() { return <div>Plant Admin Detail</div> }"
New-Stub "app/(dashboard)/plants/[id]/edit/page.tsx" "export default function EditPlantPage() { return <div>Edit Plant</div> }"
New-Stub "app/(dashboard)/microorganisms/page.tsx" "export default function MicroorganismsAdminPage() { return <div>Microorganisms Admin</div> }"
New-Stub "app/(dashboard)/microorganisms/create/page.tsx" "export default function CreateMicroorganismPage() { return <div>Create Microorganism</div> }"
New-Stub "app/(dashboard)/microorganisms/storage-map/page.tsx" "export default function StorageMapPage() { return <div>Storage Map</div> }"
New-Stub "app/(dashboard)/microorganisms/[id]/edit/page.tsx" "export default function EditMicroorganismPage() { return <div>Edit Microorganism</div> }"
New-Stub "app/(dashboard)/herbarium/page.tsx" "export default function HerbariumAdminPage() { return <div>Herbarium Admin</div> }"
New-Stub "app/(dashboard)/herbarium/create/page.tsx" "export default function CreateHerbariumPage() { return <div>Create Herbarium</div> }"
New-Stub "app/(dashboard)/herbarium/[id]/edit/page.tsx" "export default function EditHerbariumPage() { return <div>Edit Herbarium</div> }"
New-Stub "app/(dashboard)/reports/page.tsx" "export default function ReportsPage() { return <div>Reports</div> }"
New-Stub "app/(dashboard)/settings/page.tsx" "export default function SettingsPage() { return <div>Settings</div> }"

# ── app/api routes ────────────────────────────────────────────────────────────
New-Stub "app/api/auth/login/route.ts" "import { NextResponse } from 'next/server'; export async function POST() { return NextResponse.json({ message: 'login' }) }"
New-Stub "app/api/auth/register/route.ts" "import { NextResponse } from 'next/server'; export async function POST() { return NextResponse.json({ message: 'register' }) }"
New-Stub "app/api/auth/roles/route.ts" "import { NextResponse } from 'next/server'; export async function GET() { return NextResponse.json({ roles: [] }) }"
New-Stub "app/api/users/route.ts" "import { NextResponse } from 'next/server'; export async function GET() { return NextResponse.json({ users: [] }) }"
New-Stub "app/api/users/[id]/route.ts" "import { NextResponse } from 'next/server'; export async function GET() { return NextResponse.json({}) } export async function PUT() { return NextResponse.json({}) } export async function DELETE() { return NextResponse.json({}) }"
New-Stub "app/api/plants/route.ts" "import { NextResponse } from 'next/server'; export async function GET() { return NextResponse.json({ plants: [] }) } export async function POST() { return NextResponse.json({}) }"
New-Stub "app/api/plants/[id]/route.ts" "import { NextResponse } from 'next/server'; export async function GET() { return NextResponse.json({}) } export async function PUT() { return NextResponse.json({}) } export async function DELETE() { return NextResponse.json({}) }"
New-Stub "app/api/microorganisms/route.ts" "import { NextResponse } from 'next/server'; export async function GET() { return NextResponse.json({ microorganisms: [] }) } export async function POST() { return NextResponse.json({}) }"
New-Stub "app/api/microorganisms/[id]/route.ts" "import { NextResponse } from 'next/server'; export async function GET() { return NextResponse.json({}) } export async function PUT() { return NextResponse.json({}) } export async function DELETE() { return NextResponse.json({}) }"
New-Stub "app/api/microorganisms/storage-map/route.ts" "import { NextResponse } from 'next/server'; export async function GET() { return NextResponse.json({ storageMap: [] }) }"
New-Stub "app/api/herbarium/route.ts" "import { NextResponse } from 'next/server'; export async function GET() { return NextResponse.json({ herbarium: [] }) } export async function POST() { return NextResponse.json({}) }"
New-Stub "app/api/herbarium/[id]/route.ts" "import { NextResponse } from 'next/server'; export async function GET() { return NextResponse.json({}) } export async function PUT() { return NextResponse.json({}) } export async function DELETE() { return NextResponse.json({}) }"
New-Stub "app/api/upload/image/route.ts" "import { NextResponse } from 'next/server'; export async function POST() { return NextResponse.json({ url: '' }) }"
New-Stub "app/api/upload/document/route.ts" "import { NextResponse } from 'next/server'; export async function POST() { return NextResponse.json({ url: '' }) }"
New-Stub "app/api/import/csv/route.ts" "import { NextResponse } from 'next/server'; export async function POST() { return NextResponse.json({ imported: 0 }) }"
New-Stub "app/api/reports/route.ts" "import { NextResponse } from 'next/server'; export async function GET() { return NextResponse.json({ reports: [] }) }"
New-Stub "app/api/analytics/route.ts" "import { NextResponse } from 'next/server'; export async function GET() { return NextResponse.json({ analytics: {} }) }"

# ── app root special files ─────────────────────────────────────────────────────
New-Stub "app/loading.tsx" "export default function Loading() { return <div>Loading...</div> }"
New-Stub "app/error.tsx" "'use client'; export default function Error({ error, reset }: { error: Error; reset: () => void }) { return <div><h2>Something went wrong.</h2><button onClick={reset}>Try again</button></div> }"
New-Stub "app/not-found.tsx" "export default function NotFound() { return <div>404 – Page not found</div> }"

# ── components ────────────────────────────────────────────────────────────────
New-Stub "components/ui/button.tsx" "export function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) { return <button {...props}>{children}</button> }"
New-Stub "components/ui/modal.tsx" "export function Modal({ children }: { children: React.ReactNode }) { return <div className='modal'>{children}</div> }"
New-Stub "components/ui/card.tsx" "export function Card({ children }: { children: React.ReactNode }) { return <div className='card'>{children}</div> }"
New-Stub "components/ui/input.tsx" "export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) { return <input {...props} /> }"
New-Stub "components/layout/navbar.tsx" "export function Navbar() { return <nav>Navbar</nav> }"
New-Stub "components/layout/sidebar.tsx" "export function Sidebar() { return <aside>Sidebar</aside> }"
New-Stub "components/layout/footer.tsx" "export function Footer() { return <footer>Footer</footer> }"
New-Stub "components/forms/plant-form.tsx" "export function PlantForm() { return <form>Plant Form</form> }"
New-Stub "components/forms/microorganism-form.tsx" "export function MicroorganismForm() { return <form>Microorganism Form</form> }"
New-Stub "components/forms/herbarium-form.tsx" "export function HerbariumForm() { return <form>Herbarium Form</form> }"
New-Stub "components/tables/plants-table.tsx" "export function PlantsTable() { return <table><tbody></tbody></table> }"
New-Stub "components/tables/microorganism-table.tsx" "export function MicroorganismTable() { return <table><tbody></tbody></table> }"
New-Stub "components/tables/users-table.tsx" "export function UsersTable() { return <table><tbody></tbody></table> }"

# ── services ──────────────────────────────────────────────────────────────────
New-Stub "services/auth.service.ts" "// Auth service"
New-Stub "services/users.service.ts" "// Users service"
New-Stub "services/plants.service.ts" "// Plants service"
New-Stub "services/microorganisms.service.ts" "// Microorganisms service"
New-Stub "services/herbarium.service.ts" "// Herbarium service"
New-Stub "services/upload.service.ts" "// Upload service"
New-Stub "services/report.service.ts" "// Report service"
New-Stub "services/analytics.service.ts" "// Analytics service"

# ── repositories ──────────────────────────────────────────────────────────────
New-Stub "repositories/user.repository.ts" "export class UserRepository { async findAll() {} async findById(id: string) {} }"
New-Stub "repositories/plant.repository.ts" "export class PlantRepository { async findAll() {} async findById(id: string) {} async create(data: unknown) {} }"
New-Stub "repositories/microorganism.repository.ts" "export class MicroorganismRepository { async findAll() {} async findById(id: string) {} async create(data: unknown) {} }"
New-Stub "repositories/herbarium.repository.ts" "export class HerbariumRepository { async findAll() {} async findById(id: string) {} async create(data: unknown) {} }"
New-Stub "repositories/audit.repository.ts" "export class AuditRepository { async log(action: string, meta: unknown) {} }"

# ── lib ───────────────────────────────────────────────────────────────────────
New-Stub "lib/supabase/client.ts" "// Supabase browser client"
New-Stub "lib/supabase/server.ts" "// Supabase server client"
New-Stub "lib/supabase/admin.ts" "// Supabase admin client"
New-Stub "lib/auth.ts" "// Auth helpers"
New-Stub "lib/permissions.ts" "// Permission helpers"
New-Stub "lib/cloudinary.ts" "// Cloudinary config"
New-Stub "lib/csv-parser.ts" "// CSV parser utility"
New-Stub "lib/excel-parser.ts" "// Excel parser utility"
New-Stub "lib/pdf-generator.ts" "// PDF generator utility"
New-Stub "lib/logger.ts" "// Application logger"

# ── types ─────────────────────────────────────────────────────────────────────
New-Stub "types/user.ts" "export interface User { id: string; name: string; email: string; role: string }"
New-Stub "types/role.ts" "export type Role = 'technical' | 'admin' | 'researcher' | 'public'"
New-Stub "types/plant.ts" "export interface Plant { id: string; scientificName: string; localNames: string[]; medicinalValue?: string }"
New-Stub "types/microorganism.ts" "export interface Microorganism { id: string; scientificName: string; source: string; researcher: string }"
New-Stub "types/herbarium.ts" "export interface HerbariumSpecimen { id: string; scientificName: string; storageLocation: string }"
New-Stub "types/report.ts" "export interface Report { id: string; title: string; generatedAt: string }"
New-Stub "types/api.ts" "export interface ApiResponse<T> { data: T; error?: string; status: number }"

# ── validators ────────────────────────────────────────────────────────────────
New-Stub "validators/auth.schema.ts" "// Zod schema for auth"
New-Stub "validators/user.schema.ts" "// Zod schema for user"
New-Stub "validators/plant.schema.ts" "// Zod schema for plant"
New-Stub "validators/microorganism.schema.ts" "// Zod schema for microorganism"
New-Stub "validators/herbarium.schema.ts" "// Zod schema for herbarium"

# ── store ─────────────────────────────────────────────────────────────────────
New-Stub "store/auth.store.ts" "// Auth Zustand store"
New-Stub "store/filters.store.ts" "// Filters Zustand store"
New-Stub "store/ui.store.ts" "// UI Zustand store"

# ── hooks ─────────────────────────────────────────────────────────────────────
New-Stub "hooks/use-auth.ts" "// useAuth hook"
New-Stub "hooks/use-upload.ts" "// useUpload hook"
New-Stub "hooks/use-search.ts" "// useSearch hook"
New-Stub "hooks/use-role.ts" "// useRole hook"

# ── constants ─────────────────────────────────────────────────────────────────
New-Stub "constants/index.ts" "// App constants"

# ── middleware ────────────────────────────────────────────────────────────────
New-Stub "middleware.ts" "import { NextResponse } from 'next/server'; import type { NextRequest } from 'next/server'; export function middleware(request: NextRequest) { return NextResponse.next() } export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] }"

# ── .env.local ────────────────────────────────────────────────────────────────
New-Stub ".env.local" "# Environment variables - DO NOT COMMIT`nNEXT_PUBLIC_SUPABASE_URL=`nNEXT_PUBLIC_SUPABASE_ANON_KEY=`nSUPABASE_SERVICE_ROLE_KEY=`nNEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=`nCLOUDINARY_API_KEY=`nCLOUDINARY_API_SECRET="

# ── supabase infra ────────────────────────────────────────────────────────────
New-Stub "supabase/migrations/001_users.sql" "-- Users table migration"
New-Stub "supabase/migrations/002_plants.sql" "-- Plants table migration"
New-Stub "supabase/migrations/003_microorganisms.sql" "-- Microorganisms table migration"
New-Stub "supabase/migrations/004_herbarium.sql" "-- Herbarium table migration"
New-Stub "supabase/seeds/sample-data.sql" "-- Sample seed data"
New-Stub "supabase/policies/rls-policies.sql" "-- Row Level Security policies"

# ── feature types ─────────────────────────────────────────────────────────────
New-Stub "features/auth/types.ts" "// Auth feature types"
New-Stub "features/users/types.ts" "// Users feature types"
New-Stub "features/plants/types.ts" "// Plants feature types"
New-Stub "features/microorganisms/types.ts" "// Microorganisms feature types"
New-Stub "features/herbarium/types.ts" "// Herbarium feature types"
New-Stub "features/reports/types.ts" "// Reports feature types"
New-Stub "features/analytics/types.ts" "// Analytics feature types"
New-Stub "features/search/types.ts" "// Search feature types"
New-Stub "features/uploads/types.ts" "// Uploads feature types"

# ── docs ──────────────────────────────────────────────────────────────────────
New-Stub "docs/architecture.md" "# Architecture"
New-Stub "docs/api-documentation.md" "# API Documentation"
New-Stub "docs/database-schema.md" "# Database Schema"
New-Stub "docs/deployment.md" "# Deployment"
New-Stub "docs/user-flow.md" "# User Flow"

Write-Host ""
Write-Host "=== SCAFFOLD COMPLETE ==="
