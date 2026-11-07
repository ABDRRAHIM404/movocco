-- Movocco — 0005_users_community.sql
--
-- DO NOT APPLY: no Supabase project exists yet. See 0001 header.
--
-- Users, roles, saved journeys, favourites, recent searches, contributions,
-- reports, votes, ratings and moderation. Roles are enforced here, in the
-- database — never by hiding buttons in the app alone.
--
-- Auth identities live in auth.users (Supabase Auth). This file only adds
-- the Movocco profile/role row that references them.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  role text not null default 'traveller'
    check (role in ('traveller', 'moderator', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Helper used by RLS policies below. SECURITY DEFINER so policies can read
-- the caller's role without exposing the profiles table to everyone.
create or replace function public.current_user_role()
returns text
language sql
security definer
stable
as $$
  select role from public.profiles where id = auth.uid();
$$;

create table if not exists public.saved_journeys (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  origin_place_id uuid references public.places (id) on delete set null,
  destination_place_id uuid references public.places (id) on delete set null,
  snapshot_text text not null,
  saved_on date not null default current_date,
  created_at timestamptz not null default now()
);

create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  place_id uuid not null references public.places (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, place_id)
);

create table if not exists public.recent_searches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  origin_place_id uuid references public.places (id) on delete set null,
  destination_place_id uuid references public.places (id) on delete set null,
  searched_at timestamptz not null default now()
);

-- Community submissions enter a moderation queue. They NEVER appear in the
-- published graph until a moderator approves them (status = 'approved').
create table if not exists public.contributions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  kind text not null check (kind in (
    'route', 'service', 'station', 'stop', 'fare-change', 'tip', 'correction', 'disruption'
  )),
  record_table text,
  record_id uuid,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected', 'appealed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  record_table text not null,
  record_id uuid not null,
  reason text not null,
  status text not null default 'open' check (status in ('open', 'resolved', 'dismissed')),
  created_at timestamptz not null default now()
);

create table if not exists public.votes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  contribution_id uuid not null references public.contributions (id) on delete cascade,
  direction integer not null check (direction in (-1, 1)),
  created_at timestamptz not null default now(),
  unique (user_id, contribution_id)
);

create table if not exists public.ratings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  service_pattern_id uuid references public.service_patterns (id) on delete cascade,
  operator_id uuid references public.operators (id) on delete cascade,
  stars integer not null check (stars between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

create table if not exists public.moderation_actions (
  id uuid primary key default gen_random_uuid(),
  contribution_id uuid references public.contributions (id) on delete set null,
  report_id uuid references public.reports (id) on delete set null,
  moderator_id uuid references auth.users (id) on delete set null,
  action text not null check (action in ('approved', 'rejected', 'appealed', 'resolved', 'dismissed')),
  note text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.saved_journeys enable row level security;
alter table public.favorites enable row level security;
alter table public.recent_searches enable row level security;
alter table public.contributions enable row level security;
alter table public.reports enable row level security;
alter table public.votes enable row level security;
alter table public.ratings enable row level security;
alter table public.moderation_actions enable row level security;

-- Users see and manage only their own rows.
create policy "own profile" on public.profiles
  for all using (id = auth.uid());
create policy "own saved_journeys" on public.saved_journeys
  for all using (user_id = auth.uid());
create policy "own favorites" on public.favorites
  for all using (user_id = auth.uid());
create policy "own recent_searches" on public.recent_searches
  for all using (user_id = auth.uid());

-- Authenticated users may submit contributions and reports, and read their own.
create policy "authenticated insert contributions" on public.contributions
  for insert with check (auth.uid() is not null);
create policy "own contributions read" on public.contributions
  for select using (user_id = auth.uid() or public.current_user_role() in ('moderator', 'admin'));
create policy "authenticated insert reports" on public.reports
  for insert with check (auth.uid() is not null);
create policy "own votes" on public.votes
  for all using (user_id = auth.uid());
create policy "own ratings" on public.ratings
  for all using (user_id = auth.uid());

-- Moderation actions are visible to moderators and admins only.
create policy "moderators read moderation_actions" on public.moderation_actions
  for select using (public.current_user_role() in ('moderator', 'admin'));
