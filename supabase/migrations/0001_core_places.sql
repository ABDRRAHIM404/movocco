-- Movocco — 0001_core_places.sql
--
-- DO NOT APPLY: no Supabase project exists yet. These migration files are
-- design artefacts only, written from the product spec (§17). They must be
-- reviewed and applied to a real Supabase project only after explicit
-- approval, with Row Level Security reviewed again before any public use.
--
-- Core geography: regions, places, multilingual place names, points of
-- interest. Coordinates are PostGIS geography (WGS84). "Unknown" is a valid
-- value elsewhere in the schema; nothing here invents transport facts.

create extension if not exists postgis;

create table if not exists public.regions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_en text not null,
  name_fr text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.places (
  id uuid primary key default gen_random_uuid(),
  region_id uuid references public.regions (id) on delete set null,
  slug text not null unique,
  kind text not null check (kind in (
    'city', 'town', 'village', 'neighbourhood', 'landmark', 'hotel',
    'airport', 'attraction', 'hub', 'station', 'market', 'beach'
  )),
  -- Approximate centre only. Exact boarding positions live on stops /
  -- boarding_points, never on a neighbourhood centre.
  location geography(Point, 4326),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.place_names (
  id uuid primary key default gen_random_uuid(),
  place_id uuid not null references public.places (id) on delete cascade,
  locale text not null check (locale in ('en', 'fr', 'ar', 'darija', 'tachelhit', 'es', 'de')),
  name text not null,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  unique (place_id, locale, name)
);
create index if not exists place_names_name_idx on public.place_names (locale, name);

create table if not exists public.points_of_interest (
  id uuid primary key default gen_random_uuid(),
  place_id uuid not null references public.places (id) on delete cascade,
  kind text not null,
  description_en text,
  description_fr text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Public read access for places and names; writes are admin-only and are
-- handled by the admin API, not by direct client writes.
alter table public.regions enable row level security;
alter table public.places enable row level security;
alter table public.place_names enable row level security;
alter table public.points_of_interest enable row level security;

create policy "public read regions" on public.regions
  for select using (true);
create policy "public read places" on public.places
  for select using (true);
create policy "public read place_names" on public.place_names
  for select using (true);
create policy "public read points_of_interest" on public.points_of_interest
  for select using (true);
