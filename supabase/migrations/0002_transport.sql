-- Movocco — 0002_transport.sql
--
-- DO NOT APPLY: no Supabase project exists yet. See 0001 header.
--
-- Transport network: modes, operators, directional service patterns with
-- ordered stops, hubs, stops, entrances, boarding points and walking
-- connections. A station may contain several entrances / ranks / stop poles.
-- A flexible-area taxi service is not necessarily a fixed route: service
-- patterns support both fixed-stop and service-area shapes.

create table if not exists public.transport_modes (
  id text primary key check (id in (
    'grand-taxi', 'petit-taxi', 'city-bus', 'intercity-bus',
    'ride-hailing', 'rural-shared', 'airport-transfer', 'train'
  )),
  name_en text not null,
  name_fr text not null
);

insert into public.transport_modes (id, name_en, name_fr) values
  ('grand-taxi', 'Grand taxi', 'Grand taxi'),
  ('petit-taxi', 'Petit taxi', 'Petit taxi'),
  ('city-bus', 'City bus', 'Bus urbain'),
  ('intercity-bus', 'Intercity bus', 'Bus interurbain'),
  ('ride-hailing', 'Ride-hailing', 'VTC'),
  ('rural-shared', 'Rural / shared transport', 'Transport rural / partagé'),
  ('airport-transfer', 'Airport transfer', 'Navette aéroport'),
  ('train', 'Train', 'Train')
on conflict (id) do nothing;

create table if not exists public.operators (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  mode_id text references public.transport_modes (id),
  website_url text,
  booking_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.hubs (
  id uuid primary key default gen_random_uuid(),
  place_id uuid references public.places (id) on delete set null,
  slug text not null unique,
  name_en text not null,
  name_fr text not null,
  location geography(Point, 4326),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.stops (
  id uuid primary key default gen_random_uuid(),
  hub_id uuid references public.hubs (id) on delete set null,
  place_id uuid references public.places (id) on delete set null,
  slug text not null unique,
  name_en text not null,
  name_fr text not null,
  location geography(Point, 4326),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.entrances (
  id uuid primary key default gen_random_uuid(),
  hub_id uuid references public.hubs (id) on delete cascade,
  stop_id uuid references public.stops (id) on delete cascade,
  label_en text not null,
  label_fr text not null,
  location geography(Point, 4326),
  access_notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.boarding_points (
  id uuid primary key default gen_random_uuid(),
  stop_id uuid references public.stops (id) on delete cascade,
  label_en text not null,
  label_fr text not null,
  -- Exact boarding position, verified on site. Never a neighbourhood centre.
  location geography(Point, 4326) not null,
  direction text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_patterns (
  id uuid primary key default gen_random_uuid(),
  operator_id uuid references public.operators (id) on delete set null,
  mode_id text not null references public.transport_modes (id),
  slug text not null unique,
  name_en text not null,
  name_fr text not null,
  -- 'fixed' (ordered stops) or 'area' (flexible service area).
  pattern_kind text not null default 'fixed' check (pattern_kind in ('fixed', 'area')),
  direction text,
  -- Publication workflow: only 'published' rows are visible to travellers.
  status text not null default 'draft'
    check (status in ('draft', 'published', 'suspended', 'retired')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_pattern_stops (
  id uuid primary key default gen_random_uuid(),
  service_pattern_id uuid not null references public.service_patterns (id) on delete cascade,
  boarding_point_id uuid references public.boarding_points (id) on delete set null,
  stop_order integer not null,
  boarding_only boolean not null default false,
  alighting_only boolean not null default false,
  unique (service_pattern_id, stop_order)
);

create table if not exists public.walking_connections (
  id uuid primary key default gen_random_uuid(),
  from_boarding_point_id uuid references public.boarding_points (id) on delete cascade,
  to_boarding_point_id uuid references public.boarding_points (id) on delete cascade,
  -- Only validated walking links are stored; proximity alone is not enough.
  duration_min integer,
  accessible boolean,
  notes text,
  created_at timestamptz not null default now(),
  check (from_boarding_point_id <> to_boarding_point_id)
);

-- Travellers only ever see published service patterns. Drafts stay hidden.
alter table public.hubs enable row level security;
alter table public.stops enable row level security;
alter table public.entrances enable row level security;
alter table public.boarding_points enable row level security;
alter table public.service_patterns enable row level security;
alter table public.service_pattern_stops enable row level security;
alter table public.walking_connections enable row level security;
alter table public.operators enable row level security;

create policy "public read hubs" on public.hubs for select using (true);
create policy "public read stops" on public.stops for select using (true);
create policy "public read entrances" on public.entrances for select using (true);
create policy "public read boarding_points" on public.boarding_points for select using (true);
create policy "public read operators" on public.operators for select using (true);
create policy "public read published service_patterns" on public.service_patterns
  for select using (status = 'published');
create policy "public read published pattern stops" on public.service_pattern_stops
  for select using (
    exists (
      select 1 from public.service_patterns sp
      where sp.id = service_pattern_stops.service_pattern_id
        and sp.status = 'published'
    )
  );
create policy "public read walking_connections" on public.walking_connections
  for select using (true);
