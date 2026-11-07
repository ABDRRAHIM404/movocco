-- Movocco — 0003_fares_calendars.sql
--
-- DO NOT APPLY: no Supabase project exists yet. See 0001 header.
--
-- Calendars, departure times, frequency windows, availability conditions,
-- fare rules, fare observations and duration estimates.
-- Fares are ranges with an explicit basis (per person / per vehicle) and a
-- measurement level. Unknown stays unknown: these columns are nullable and
-- the app renders "unknown" instead of inventing a value.

create table if not exists public.service_calendars (
  id uuid primary key default gen_random_uuid(),
  service_pattern_id uuid not null references public.service_patterns (id) on delete cascade,
  valid_from date,
  valid_to date,
  days_of_week integer[] not null default '{0,1,2,3,4,5,6}',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.departure_times (
  id uuid primary key default gen_random_uuid(),
  service_pattern_id uuid not null references public.service_patterns (id) on delete cascade,
  boarding_point_id uuid references public.boarding_points (id) on delete cascade,
  departure_time time not null,
  calendar_id uuid references public.service_calendars (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.frequency_windows (
  id uuid primary key default gen_random_uuid(),
  service_pattern_id uuid not null references public.service_patterns (id) on delete cascade,
  window_start time not null,
  window_end time not null,
  -- e.g. 'departs-when-full' for shared taxis. Never convert this into a
  -- fake fixed timetable.
  frequency_note text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.availability_conditions (
  id uuid primary key default gen_random_uuid(),
  service_pattern_id uuid not null references public.service_patterns (id) on delete cascade,
  condition_en text not null,
  condition_fr text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.fare_rules (
  id uuid primary key default gen_random_uuid(),
  service_pattern_id uuid references public.service_patterns (id) on delete cascade,
  operator_id uuid references public.operators (id) on delete cascade,
  currency text not null default 'MAD',
  amount_min numeric(10, 2),
  amount_max numeric(10, 2),
  basis text check (basis in ('per-person', 'per-vehicle', 'ticket-class', null)),
  measurement text not null default 'unknown'
    check (measurement in ('published', 'observed', 'estimated', 'unknown')),
  conditions text,
  valid_from date,
  valid_to date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.fare_observations (
  id uuid primary key default gen_random_uuid(),
  fare_rule_id uuid references public.fare_rules (id) on delete cascade,
  observed_amount numeric(10, 2) not null,
  observed_on date not null,
  source_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.duration_estimates (
  id uuid primary key default gen_random_uuid(),
  service_pattern_id uuid references public.service_patterns (id) on delete cascade,
  from_boarding_point_id uuid references public.boarding_points (id) on delete cascade,
  to_boarding_point_id uuid references public.boarding_points (id) on delete cascade,
  duration_min integer,
  duration_max integer,
  measurement text not null default 'unknown'
    check (measurement in ('published', 'observed', 'estimated', 'unknown')),
  created_at timestamptz not null default now()
);

alter table public.service_calendars enable row level security;
alter table public.departure_times enable row level security;
alter table public.frequency_windows enable row level security;
alter table public.availability_conditions enable row level security;
alter table public.fare_rules enable row level security;
alter table public.fare_observations enable row level security;
alter table public.duration_estimates enable row level security;

create policy "public read service_calendars" on public.service_calendars for select using (true);
create policy "public read departure_times" on public.departure_times for select using (true);
create policy "public read frequency_windows" on public.frequency_windows for select using (true);
create policy "public read availability_conditions" on public.availability_conditions for select using (true);
create policy "public read fare_rules" on public.fare_rules for select using (true);
create policy "public read fare_observations" on public.fare_observations for select using (true);
create policy "public read duration_estimates" on public.duration_estimates for select using (true);
