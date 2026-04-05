-- =========================================================
-- JKUAT BIORESOURCES MANAGEMENT SYSTEM
-- FINAL COMPLETE PRODUCTION SCHEMA FOR SUPABASE
-- Optimized for RBAC, RLS, and Data Integrity
-- =========================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

-- =========================================================
-- ENUMS AND TYPES
-- =========================================================
do $$ begin
    create type bioresource_type as enum ('microorganism', 'plant', 'herbarium');
exception
    when duplicate_object then null;
end $$;

do $$ begin
    create type import_status as enum ('pending', 'processing', 'completed', 'failed');
exception
    when duplicate_object then null;
end $$;

do $$ begin
    create type user_role_enum as enum ('technical_team', 'administrator', 'researcher', 'public_user');
exception
    when duplicate_object then null;
end $$;

-- =========================================================
-- 1. BASE TABLES: ROLES AND PROFILES
-- =========================================================

-- Roles table (internal reference)
create table if not exists roles (
    id uuid primary key default uuid_generate_v4(),
    name user_role_enum unique not null,
    description text,
    created_at timestamptz default now()
);

-- Pre-populate roles
insert into roles (name, description) values 
('technical_team', 'Full system access: integration, maintenance, and backups'),
('administrator', 'Management of users and oversight of platform data integrity'),
('researcher', 'Can register, upload, and manage their own bioresource data'),
('public_user', 'View and search access only')
on conflict (name) do update set description = excluded.description;

-- User Profiles (Extends Supabase auth.users)
create table if not exists user_profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name varchar(255) not null,
    email varchar(255) unique not null,
    staff_number varchar(100),
    department varchar(255),
    faculty varchar(255),
    phone varchar(30),
    is_active boolean default true,
    avatar_url text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- User Role Assignments (Many-to-Many)
create table if not exists user_roles (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid not null references user_profiles(id) on delete cascade,
    role_id uuid not null references roles(id) on delete cascade,
    assigned_by uuid references user_profiles(id),
    assigned_at timestamptz default now(),
    unique(user_id, role_id)
);

-- Researcher Specific Data
create table if not exists researchers (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid unique not null references user_profiles(id) on delete cascade,
    qualification varchar(100),
    specialization varchar(255),
    research_focus text,
    institution varchar(255) default 'JKUAT',
    created_at timestamptz default now()
);

-- =========================================================
-- 2. BIORESOURCES: PLANTS & AIVs
-- =========================================================

create table if not exists plants (
    id uuid primary key default uuid_generate_v4(),
    
    scientific_name varchar(255) not null,
    common_name varchar(255),
    family_name varchar(255),
    genus varchar(255),
    species varchar(255),
    
    is_aiv boolean default false, -- African Indigenous Vegetable flag
    category varchar(50), -- e.g., Medicinal, Nutritional, Ornamental
    description text,
    
    nutritional_value text,
    medicinal_value text,
    cultural_significance text,
    
    -- Structured growth and distribution
    growth_conditions jsonb default '{}'::jsonb, -- soil, rainfall, temp
    geographic_distribution jsonb default '[]'::jsonb, -- regions
    
    -- Cloudinary media (URLs + metadata)
    images jsonb default '[]'::jsonb,
    documents jsonb default '[]'::jsonb,
    
    created_by uuid references user_profiles(id),
    updated_by uuid references user_profiles(id),
    
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Multilingual support for plant names
create table if not exists plant_local_names (
    id uuid primary key default uuid_generate_v4(),
    plant_id uuid not null references plants(id) on delete cascade,
    language_code varchar(10) not null, -- e.g., 'sw', 'en', 'ky'
    local_name varchar(255) not null,
    unique(plant_id, language_code, local_name)
);

-- Plant health/dietary recommendations
create table if not exists plant_recommendations (
    id uuid primary key default uuid_generate_v4(),
    plant_id uuid not null references plants(id) on delete cascade,
    use_case varchar(255), -- e.g., 'High Blood Pressure', 'Eyesight'
    recommendation_text text,
    created_at timestamptz default now()
);

-- =========================================================
-- 3. BIORESOURCES: HERBARIUM
-- =========================================================

create table if not exists herbarium_specimens (
    id uuid primary key default uuid_generate_v4(),
    
    herbarium_code varchar(100) unique not null, -- Physical reference code
    
    scientific_name varchar(255) not null,
    common_name varchar(255),
    
    collector_id uuid references researchers(id),
    collection_date date,
    
    habitat_description text,
    ecological_notes text,
    medicinal_notes text,
    
    physical_storage_location varchar(255), -- Room/Shelf in physical building
    
    -- Media and scans
    specimen_images jsonb default '[]'::jsonb,
    supporting_documents jsonb default '[]'::jsonb,
    
    created_by uuid references user_profiles(id),
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- =========================================================
-- 4. BIORESOURCES: MICROORGANISMS & STORAGE
-- =========================================================

create table if not exists microorganisms (
    id uuid primary key default uuid_generate_v4(),
    
    scientific_name varchar(255) not null,
    strain_code varchar(100),
    
    source_isolated_from text,
    
    -- Physiological metadata
    optimum_temperature numeric(5,2),
    min_ph numeric(4,2),
    max_ph numeric(4,2),
    
    growth_medium text,
    characteristics text, -- Hydrolyzing capabilities, etc.
    enzymatic_activity text,
    
    researcher_id uuid references researchers(id),
    experiment_details text,
    date_stored date,
    
    -- Media
    microscopy_images jsonb default '[]'::jsonb,
    supporting_docs jsonb default '[]'::jsonb,
    
    created_by uuid references user_profiles(id),
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Hierarchical Storage System for Microorganisms
create table if not exists lab_fridges (
    id uuid primary key default uuid_generate_v4(),
    code varchar(50) unique not null,
    description text
);

create table if not exists lab_shelves (
    id uuid primary key default uuid_generate_v4(),
    fridge_id uuid not null references lab_fridges(id) on delete cascade,
    code varchar(50) not null,
    unique(fridge_id, code)
);

create table if not exists lab_trays (
    id uuid primary key default uuid_generate_v4(),
    shelf_id uuid not null references lab_shelves(id) on delete cascade,
    code varchar(50) not null,
    unique(shelf_id, code)
);

create table if not exists lab_partitions (
    id uuid primary key default uuid_generate_v4(),
    tray_id uuid not null references lab_trays(id) on delete cascade,
    code varchar(50) not null,
    unique(tray_id, code)
);

create table if not exists lab_test_tubes (
    id uuid primary key default uuid_generate_v4(),
    partition_id uuid not null references lab_partitions(id) on delete cascade,
    tube_label varchar(50) not null,
    microorganism_id uuid unique references microorganisms(id),
    unique(partition_id, tube_label)
);

-- =========================================================
-- 5. UTILITY TABLES: AUDIT, IMPORT, REFERENCES
-- =========================================================

-- Support for external references / publications
create table if not exists research_references (
    id uuid primary key default uuid_generate_v4(),
    resource_type bioresource_type not null,
    resource_id uuid not null, -- ID from plants, herbarium_specimens, or microorganisms
    title text not null,
    citation text,
    link text,
    created_at timestamptz default now()
);

-- Track bulk data imports
create table if not exists import_logs (
    id uuid primary key default uuid_generate_v4(),
    file_name varchar(255) not null,
    resource_type bioresource_type not null,
    imported_by uuid references user_profiles(id),
    record_count integer default 0,
    status import_status default 'pending',
    error_details text,
    created_at timestamptz default now()
);

-- System Audit Logs
create table if not exists audit_logs (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references user_profiles(id),
    action varchar(50) not null, -- INSERT, UPDATE, DELETE
    table_name varchar(100) not null,
    record_id uuid,
    old_data jsonb,
    new_data jsonb,
    created_at timestamptz default now()
);

-- =========================================================
-- 6. FUNCTIONS AND TRIGGERS
-- =========================================================

-- Function to update the updated_at timestamp
create or replace function handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Trigger applications for updated_at
do $$ begin
    create trigger update_user_profiles_updated_at before update on user_profiles for each row execute procedure handle_updated_at();
exception when duplicate_object then null; end $$;

do $$ begin
    create trigger update_plants_updated_at before update on plants for each row execute procedure handle_updated_at();
exception when duplicate_object then null; end $$;

do $$ begin
    create trigger update_herbarium_specimens_updated_at before update on herbarium_specimens for each row execute procedure handle_updated_at();
exception when duplicate_object then null; end $$;

do $$ begin
    create trigger update_microorganisms_updated_at before update on microorganisms for each row execute procedure handle_updated_at();
exception when duplicate_object then null; end $$;

-- Trigger to create user profile and default role on signup
create or replace function public.handle_new_user()
returns trigger as $$
declare
  default_role_id uuid;
begin
  -- Get the ID for 'researcher' role
  select id into default_role_id from public.roles where name = 'researcher';

  -- Create the profile
  insert into public.user_profiles (
    id, 
    full_name, 
    email, 
    staff_number, 
    department, 
    faculty
  )
  values (
    new.id, 
    coalesce(new.raw_user_meta_data->>'full_name', 'New User'), 
    new.email,
    new.raw_user_meta_data->>'staff_number',
    new.raw_user_meta_data->>'department',
    new.raw_user_meta_data->>'faculty'
  );

  -- Assign default role
  if default_role_id is not null then
    insert into public.user_roles (user_id, role_id)
    values (new.id, default_role_id);
  end if;

  return new;
end;
$$ language plpgsql security definer;

do $$ begin
    create trigger on_auth_user_created
      after insert on auth.users
      for each row execute procedure public.handle_new_user();
exception when duplicate_object then null; end $$;

-- RBAC helper function
create or replace function public.check_user_role(role_name user_role_enum)
returns boolean as $$
declare
  u_id uuid;
begin
  u_id := auth.uid();
  return exists (
    select 1 from public.user_roles ur
    join public.roles r on ur.role_id = r.id
    where ur.user_id = u_id and r.name = role_name
  );
end;
$$ language plpgsql security definer;

-- =========================================================
-- 7. SECURITY: ROW LEVEL SECURITY (RLS)
-- =========================================================

-- Enable RLS on all tables
alter table user_profiles enable row level security;
alter table user_roles enable row level security;
alter table researchers enable row level security;
alter table plants enable row level security;
alter table plant_local_names enable row level security;
alter table plant_recommendations enable row level security;
alter table herbarium_specimens enable row level security;
alter table microorganisms enable row level security;
alter table lab_fridges enable row level security;
alter table lab_shelves enable row level security;
alter table lab_trays enable row level security;
alter table lab_partitions enable row level security;
alter table lab_test_tubes enable row level security;
alter table research_references enable row level security;
alter table import_logs enable row level security;
alter table audit_logs enable row level security;

-- 7.1. Public Access (Read-only)
-- Allow anyone (even unauthenticated) to view bioresources
do $$ begin
    create policy "Public users can view plants" on plants for select using (true);
exception when duplicate_object then null; end $$;

do $$ begin
    create policy "Public users can view local names" on plant_local_names for select using (true);
exception when duplicate_object then null; end $$;

do $$ begin
    create policy "Public users can view recommendations" on plant_recommendations for select using (true);
exception when duplicate_object then null; end $$;

do $$ begin
    create policy "Public users can view herbarium" on herbarium_specimens for select using (true);
exception when duplicate_object then null; end $$;

do $$ begin
    create policy "Public users can view microorganisms" on microorganisms for select using (true);
exception when duplicate_object then null; end $$;

-- 7.2. Researcher Access
do $$ begin
    create policy "Researchers can insert plants" on plants for insert 
    with check (public.check_user_role('researcher') or public.check_user_role('administrator'));
exception when duplicate_object then null; end $$;

do $$ begin
    create policy "Researchers can update their own plants" on plants for update
    using (auth.uid() = created_by or public.check_user_role('administrator'));
exception when duplicate_object then null; end $$;

do $$ begin
    create policy "Researchers can insert microorganisms" on microorganisms for insert
    with check (public.check_user_role('researcher') or public.check_user_role('administrator'));
exception when duplicate_object then null; end $$;

do $$ begin
    create policy "Researchers can update their own microorganisms" on microorganisms for update
    using (auth.uid() = created_by or public.check_user_role('administrator'));
exception when duplicate_object then null; end $$;

-- 7.3. Administrator/Technical Access
do $$ begin
    create policy "Admins have full access on profiles" on user_profiles using (public.check_user_role('administrator') or public.check_user_role('technical_team'));
exception when duplicate_object then null; end $$;

do $$ begin
    create policy "Admins have full access on roles" on user_roles using (public.check_user_role('administrator') or public.check_user_role('technical_team'));
exception when duplicate_object then null; end $$;

-- =========================================================
-- 8. INDEXES FOR PERFORMANCE
-- =========================================================
create index if not exists idx_plants_sci_name on plants(scientific_name);
create index if not exists idx_plants_common_name on plants(common_name);
create index if not exists idx_herbarium_sci_name on herbarium_specimens(scientific_name);
create index if not exists idx_herbarium_code on herbarium_specimens(herbarium_code);
create index if not exists idx_micro_sci_name on microorganisms(scientific_name);
create index if not exists idx_micro_strain on microorganisms(strain_code);
create index if not exists idx_researcher_user_id on researchers(user_id);

-- =========================================================
-- 9. HELPFUL VIEWS
-- =========================================================

-- Unified search view for microorganisms with their storage location
create or replace view v_microorganism_storage as
select 
    m.id,
    m.scientific_name,
    m.strain_code,
    f.code as fridge_code,
    s.code as shelf_code,
    tr.code as tray_code,
    p.code as partition_code,
    tt.tube_label
from microorganisms m
left join lab_test_tubes tt on m.id = tt.microorganism_id
left join lab_partitions p on tt.partition_id = p.id
left join lab_trays tr on p.tray_id = tr.id
left join lab_shelves s on tr.shelf_id = s.id
left join lab_fridges f on s.fridge_id = f.id;

-- Summary view for AIVs (African Indigenous Vegetables)
create or replace view v_aiv_summary as
select 
    p.*,
    (select array_agg(local_name) from plant_local_names where plant_id = p.id) as local_names
from plants p
where is_aiv = true;
