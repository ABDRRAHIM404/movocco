-- Movocco — 0004_provenance.sql
--
-- DO NOT APPLY: no Supabase project exists yet. See 0001 header.
--
-- Provenance and trust: sources, evidence, field observations, record
-- revisions, review assignments, service disruptions and alerts. Every
-- published transport fact must be traceable to a source, an evidence
-- level, and a review date. Community votes never count as verification.

create table if not exists public.sources (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  url text,
  source_kind text check (source_kind in (
    'official', 'operator', 'field-observation', 'community', 'open-data', 'other'
  )),
  created_at timestamptz not null default now()
);

-- Generic provenance link: which source backs which record, how it was
-- checked, and how fresh it is. `record_table` + `record_id` reference the
-- fact being sourced (e.g. 'fare_rules', '<uuid>').
create table if not exists public.evidence (
  id uuid primary key default gen_random_uuid(),
  source_id uuid references public.sources (id) on delete set null,
  record_table text not null,
  record_id uuid not null,
  evidence_level text not null check (evidence_level in (
    'official', 'admin-verified', 'community-confirmed', 'unconfirmed'
  )),
  measurement text not null default 'unknown'
    check (measurement in ('published', 'observed', 'estimated', 'unknown')),
  freshness text not null default 'review-due'
    check (freshness in ('current', 'review-due', 'outdated')),
  observed_on date,
  reviewed_on date,
  review_owner text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.field_observations (
  id uuid primary key default gen_random_uuid(),
  source_id uuid references public.sources (id) on delete set null,
  record_table text not null,
  record_id uuid not null,
  observed_on date not null,
  observed_by text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.record_revisions (
  id uuid primary key default gen_random_uuid(),
  record_table text not null,
  record_id uuid not null,
  changed_by uuid,
  change_summary text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.review_assignments (
  id uuid primary key default gen_random_uuid(),
  record_table text not null,
  record_id uuid not null,
  reviewer text not null,
  due_on date,
  done_on date,
  created_at timestamptz not null default now()
);

create table if not exists public.service_disruptions (
  id uuid primary key default gen_random_uuid(),
  service_pattern_id uuid references public.service_patterns (id) on delete cascade,
  operator_id uuid references public.operators (id) on delete cascade,
  title_en text not null,
  title_fr text not null,
  detail_en text,
  detail_fr text,
  starts_at timestamptz not null,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.alerts (
  id uuid primary key default gen_random_uuid(),
  disruption_id uuid references public.service_disruptions (id) on delete cascade,
  title_en text not null,
  title_fr text not null,
  body_en text,
  body_fr text,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.sources enable row level security;
alter table public.evidence enable row level security;
alter table public.field_observations enable row level security;
alter table public.record_revisions enable row level security;
alter table public.review_assignments enable row level security;
alter table public.service_disruptions enable row level security;
alter table public.alerts enable row level security;

create policy "public read sources" on public.sources for select using (true);
create policy "public read evidence" on public.evidence for select using (true);
create policy "public read field_observations" on public.field_observations for select using (true);
create policy "public read service_disruptions" on public.service_disruptions for select using (true);
create policy "public read alerts" on public.alerts for select using (true);
-- Revisions and review assignments are admin-only; no public read policy.
