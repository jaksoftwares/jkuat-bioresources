-- =========================================================
-- JKUAT BIORESOURCES MANAGEMENT SYSTEM
-- PROFESSIONAL PRODUCTION SCHEMA
-- PostgreSQL / Supabase
-- =========================================================

-- Required extension for UUID generation
create extension if not exists pgcrypto;

-- =========================================================
-- 1. ROLES TABLE
-- Stores all application roles for RBAC
-- =========================================================
create table roles (
    id uuid primary key default gen_random_uuid(),
    name varchar(50) unique not null,
    description text,
    created_at timestamptz default now()
);

comment on table roles is 'System roles for role-based access control';
comment on column roles.name is 'Role name e.g. technical_team, administrator, researcher, public_user';


-- =========================================================
-- 2. USER PROFILES
-- Extends Supabase auth.users
-- =========================================================
create table user_profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name varchar(255) not null,
    email varchar(255) unique not null,
    staff_number varchar(100),
    department varchar(255),
    faculty varchar(255),
    phone varchar(30),
    is_active boolean default true,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

comment on table user_profiles is 'Extended profile information linked to Supabase auth users';


-- =========================================================
-- 3. USER ROLE ASSIGNMENTS
-- Supports multi-role architecture
-- =========================================================
create table user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references user_profiles(id) on delete cascade,
    role_id uuid not null references roles(id) on delete cascade,
    assigned_by uuid references user_profiles(id),
    assigned_at timestamptz default now(),
    unique(user_id, role_id)
);

comment on table user_roles is 'Maps users to one or more roles';


-- =========================================================
-- 4. RESEARCHER PROFILES
-- Scientific and academic metadata
-- =========================================================
create table researchers (
    id uuid primary key default gen_random_uuid(),
    user_id uuid unique not null references user_profiles(id) on delete cascade,
    qualification varchar(100),
    specialization varchar(255),
    research_focus text,
    institution varchar(255) default 'JKUAT',
    created_at timestamptz default now()
);

comment on table researchers is 'Academic metadata for researchers, professors, MSc and PhD students';


-- =========================================================
-- 5. PLANT / AIV RECORDS
-- Core plant repository
-- =========================================================
create table plant_records (
    id uuid primary key default gen_random_uuid(),

    scientific_name varchar(255) not null,
    common_name varchar(255),
    family_name varchar(255),
    genus varchar(255),
    species varchar(255),

    category varchar(50) not null,
    description text,

    nutritional_value text,
    medicinal_value text,
    cultural_significance text,

    growth_conditions jsonb,
    region_distribution jsonb,

    -- Cloudinary media links stored directly
    images jsonb default '[]'::jsonb,
    documents jsonb default '[]'::jsonb,

    created_by uuid references user_profiles(id),
    updated_by uuid references user_profiles(id),

    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

comment on table plant_records is 'Stores plants and African Indigenous Vegetables';
comment on column plant_records.images is 'JSONB array of Cloudinary image URLs and metadata';
comment on column plant_records.documents is 'JSONB array of supporting documents and references';


-- =========================================================
-- 6. PLANT LOCAL NAMES
-- Multilingual names support
-- =========================================================
create table plant_local_names (
    id uuid primary key default gen_random_uuid(),
    plant_id uuid not null references plant_records(id) on delete cascade,
    language_code varchar(10) not null,
    local_name varchar(255) not null
);

comment on table plant_local_names is 'Stores multilingual plant names e.g. Swahili, English, Kikuyu';


-- =========================================================
-- 7. PLANT RECOMMENDATIONS
-- Health / dietary / medicinal recommendations
-- =========================================================
create table plant_recommendations (
    id uuid primary key default gen_random_uuid(),
    plant_id uuid not null references plant_records(id) on delete cascade,
    use_case varchar(255),
    recommendation_text text
);

comment on table plant_recommendations is 'Specific plant use recommendations and health benefits';


-- =========================================================
-- 8. HERBARIUM RECORDS
-- Digitized specimen collection
-- =========================================================
create table herbarium_records (
    id uuid primary key default gen_random_uuid(),

    herbarium_code varchar(100) unique not null,

    scientific_name varchar(255) not null,
    common_name varchar(255),

    collector_id uuid references researchers(id),

    collection_date date,

    habitat_description text,
    ecological_notes text,
    medicinal_notes text,

    physical_storage_location varchar(255),

    -- Cloudinary scans and specimen photos
    specimen_images jsonb default '[]'::jsonb,
    supporting_documents jsonb default '[]'::jsonb,

    created_by uuid references user_profiles(id),

    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

comment on table herbarium_records is 'Digitized herbarium plant specimen records';


-- =========================================================
-- 9. MICROORGANISM RECORDS
-- Scientific organism data
-- =========================================================
create table microorganism_records (
    id uuid primary key default gen_random_uuid(),

    scientific_name varchar(255) not null,
    strain_code varchar(100),

    source text,
    isolated_from text,

    optimum_temperature numeric(5,2),
    min_ph numeric(4,2),
    max_ph numeric(4,2),

    growth_medium text,
    characteristics text,
    enzymatic_activity text,

    researcher_id uuid references researchers(id),

    experiment_notes text,
    date_stored date,

    -- Cloudinary microscopy images / attachments
    images jsonb default '[]'::jsonb,
    documents jsonb default '[]'::jsonb,

    created_by uuid references user_profiles(id),

    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

comment on table microorganism_records is 'Stores bacteria, fungi, and microbial research data';


-- =========================================================
-- 10. LAB STORAGE HIERARCHY
-- PROFESSIONAL NORMALIZED STORAGE MODEL
-- =========================================================

create table lab_fridges (
    id uuid primary key default gen_random_uuid(),
    code varchar(50) unique not null,
    description text
);

comment on table lab_fridges is 'Top level fridge storage units';


create table lab_shelves (
    id uuid primary key default gen_random_uuid(),
    fridge_id uuid not null references lab_fridges(id) on delete cascade,
    code varchar(50) not null
);

comment on table lab_shelves is 'Shelves inside fridges';


create table lab_trays (
    id uuid primary key default gen_random_uuid(),
    shelf_id uuid not null references lab_shelves(id) on delete cascade,
    code varchar(50) not null
);

comment on table lab_trays is 'Trays inside shelves';


create table lab_partitions (
    id uuid primary key default gen_random_uuid(),
    tray_id uuid not null references lab_trays(id) on delete cascade,
    code varchar(50) not null
);

comment on table lab_partitions is 'Partitions inside trays';


create table lab_tubes (
    id uuid primary key default gen_random_uuid(),
    partition_id uuid not null references lab_partitions(id) on delete cascade,
    tube_number varchar(50) not null,
    microorganism_id uuid unique references microorganism_records(id)
);

comment on table lab_tubes is 'Final test tube position containing microorganism specimen';


-- =========================================================
-- 11. REFERENCES / SUPPORTING DOCUMENTS
-- Research papers, citations, reports
-- =========================================================
create table references_documents (
    id uuid primary key default gen_random_uuid(),
    resource_type varchar(50) not null,
    resource_id uuid not null,
    title varchar(255),
    citation text,
    document_link text,
    created_at timestamptz default now()
);

comment on table references_documents is 'Stores linked publications, citations, and external documents';


-- =========================================================
-- 12. IMPORT LOGS
-- CSV / Excel import tracking
-- =========================================================
create table import_logs (
    id uuid primary key default gen_random_uuid(),
    file_name varchar(255),
    imported_by uuid references user_profiles(id),
    record_count integer,
    status varchar(50),
    error_log text,
    created_at timestamptz default now()
);

comment on table import_logs is 'Tracks bulk data imports and validation status';


-- =========================================================
-- 13. AUDIT LOGS
-- Data integrity and change tracking
-- =========================================================
create table audit_logs (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references user_profiles(id),
    action varchar(50),
    table_name varchar(100),
    record_id uuid,
    old_data jsonb,
    new_data jsonb,
    created_at timestamptz default now()
);

comment on table audit_logs is 'Tracks create, update, delete operations across the system';


-- =========================================================
-- 14. INDEXES FOR FAST SEARCH
-- =========================================================
create index idx_plant_scientific_name
on plant_records(scientific_name);

create index idx_micro_scientific_name
on microorganism_records(scientific_name);

create index idx_herbarium_code
on herbarium_records(herbarium_code);

create index idx_researcher_user
on researchers(user_id);