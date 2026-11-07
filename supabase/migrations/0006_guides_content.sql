-- Movocco — 0006_guides_content.sql
--
-- DO NOT APPLY: no Supabase project exists yet. See 0001 header.
--
-- Editorial content: transport guides, destinations, localised content,
-- translation reviews and audit events. Only published, human-reviewed
-- content is visible to travellers; safety-relevant instructions need
-- human-reviewed translations before a language is labelled supported.

create table if not exists public.transport_guides (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  mode_id text references public.transport_modes (id),
  title_en text not null,
  title_fr text not null,
  body_en text,
  body_fr text,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'retired')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.destinations (
  id uuid primary key default gen_random_uuid(),
  place_id uuid references public.places (id) on delete cascade,
  slug text not null unique,
  summary_en text,
  summary_fr text,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'retired')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.localized_content (
  id uuid primary key default gen_random_uuid(),
  key text not null,
  locale text not null check (locale in ('en', 'fr', 'ar', 'darija', 'tachelhit', 'es', 'de')),
  value text not null,
  status text not null default 'draft'
    check (status in ('draft', 'reviewed', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (key, locale)
);

create table if not exists public.translation_reviews (
  id uuid primary key default gen_random_uuid(),
  localized_content_id uuid references public.localized_content (id) on delete cascade,
  reviewer text not null,
  decision text not null check (decision in ('approved', 'needs-changes')),
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid,
  action text not null,
  record_table text,
  record_id uuid,
  detail jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.transport_guides enable row level security;
alter table public.destinations enable row level security;
alter table public.localized_content enable row level security;
alter table public.translation_reviews enable row level security;
alter table public.audit_events enable row level security;

create policy "public read published guides" on public.transport_guides
  for select using (status = 'published');
create policy "public read published destinations" on public.destinations
  for select using (status = 'published');
create policy "public read published content" on public.localized_content
  for select using (status = 'published');
-- Translation reviews and audit events are admin-only; no public read policy.
