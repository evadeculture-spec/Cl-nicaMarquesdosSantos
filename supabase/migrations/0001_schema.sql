-- =============================================================================
-- Clínica Marques dos Santos — schema inicial
-- Postgres + RLS. Todas as tabelas têm Row Level Security ativa.
-- =============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Perfis (extensão de auth.users)
-- ---------------------------------------------------------------------------
create type public.user_role as enum ('patient', 'professional', 'admin');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  phone text,
  role public.user_role not null default 'patient',
  sms_opt_in boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Helper: o utilizador autenticado é admin? (definida antes das políticas que a usam)
create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create policy "profiles: próprio ou admin lê"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "profiles: próprio atualiza"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id and role = 'patient');

-- ---------------------------------------------------------------------------
-- Catálogo clínico
-- ---------------------------------------------------------------------------
create table public.professionals (
  id text primary key,                -- slug estável (ex.: joao-marques-santos)
  profile_id uuid references public.profiles (id),
  name text not null,
  role text not null,
  credentials text,
  bio text,
  focus text[] not null default '{}',
  accepts_online_booking boolean not null default true,
  sort_order int not null default 0,
  published boolean not null default true
);

create table public.specialties (
  slug text primary key,
  name text not null,
  short text,
  description text,
  symptoms text[] not null default '{}',
  approach text,
  sessions text,
  icon text,
  published boolean not null default true
);

create table public.treatments (
  id text primary key,
  name text not null,
  description text,
  duration_minutes int not null,
  price_cents int not null,
  highlight boolean not null default false,
  published boolean not null default true
);

-- Janelas semanais de disponibilidade por profissional
create table public.availability (
  id uuid primary key default gen_random_uuid(),
  professional_id text not null references public.professionals (id) on delete cascade,
  weekday int not null check (weekday between 0 and 6),  -- 0 = domingo
  start_minute int not null check (start_minute between 0 and 1439),
  end_minute int not null check (end_minute > start_minute and end_minute <= 1440),
  unique (professional_id, weekday, start_minute)
);

alter table public.professionals enable row level security;
alter table public.specialties enable row level security;
alter table public.treatments enable row level security;
alter table public.availability enable row level security;

create policy "catálogo público lê publicados" on public.professionals
  for select using (published or public.is_admin());
create policy "catálogo: admin gere" on public.professionals
  for all using (public.is_admin()) with check (public.is_admin());

create policy "especialidades públicas" on public.specialties
  for select using (published or public.is_admin());
create policy "especialidades: admin gere" on public.specialties
  for all using (public.is_admin()) with check (public.is_admin());

create policy "tratamentos públicos" on public.treatments
  for select using (published or public.is_admin());
create policy "tratamentos: admin gere" on public.treatments
  for all using (public.is_admin()) with check (public.is_admin());

create policy "disponibilidade pública" on public.availability
  for select using (true);
create policy "disponibilidade: admin gere" on public.availability
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Marcações
-- ---------------------------------------------------------------------------
create type public.appointment_status as enum
  ('pending', 'confirmed', 'completed', 'cancelled', 'no_show');

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references public.profiles (id),       -- null para convidados
  professional_id text not null references public.professionals (id),
  treatment_id text not null references public.treatments (id),
  scheduled_date date not null,
  scheduled_time time not null,
  status public.appointment_status not null default 'pending',
  patient_name text not null,
  patient_email text not null,
  patient_phone text not null,
  notes text,
  google_event_id text,               -- preenchido pela edge function
  created_at timestamptz not null default now(),
  unique (professional_id, scheduled_date, scheduled_time)
);

alter table public.appointments enable row level security;

-- Convidados marcam via route handler (anon insert restrito a pending)
create policy "marcações: inserir pendente"
  on public.appointments for insert
  with check (status = 'pending');

create policy "marcações: próprio ou staff lê"
  on public.appointments for select
  using (
    patient_id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.professionals p
      where p.id = professional_id and p.profile_id = auth.uid()
    )
  );

create policy "marcações: staff gere"
  on public.appointments for update
  using (public.is_admin())
  with check (public.is_admin());

-- Realtime para o painel admin
alter publication supabase_realtime add table public.appointments;

-- ---------------------------------------------------------------------------
-- Área do paciente
-- ---------------------------------------------------------------------------
create table public.exercise_plans (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  items jsonb not null default '[]',  -- [{name, sets, frequency}]
  created_by text references public.professionals (id),
  created_at timestamptz not null default now()
);

create table public.patient_documents (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  doc_type text not null,             -- relatório | plano | declaração
  storage_path text not null,         -- bucket privado 'patient-documents'
  created_at timestamptz not null default now()
);

create table public.clinical_reports (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.profiles (id) on delete cascade,
  appointment_id uuid references public.appointments (id),
  summary text not null,
  created_by text references public.professionals (id),
  created_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.profiles (id) on delete cascade,
  appointment_id uuid references public.appointments (id),
  description text not null,
  amount_cents int not null,
  status text not null default 'paid',
  invoice_number text,
  created_at timestamptz not null default now()
);

alter table public.exercise_plans enable row level security;
alter table public.patient_documents enable row level security;
alter table public.clinical_reports enable row level security;
alter table public.payments enable row level security;

create policy "exercícios: próprio lê" on public.exercise_plans
  for select using (patient_id = auth.uid() or public.is_admin());
create policy "exercícios: admin gere" on public.exercise_plans
  for all using (public.is_admin()) with check (public.is_admin());

create policy "documentos: próprio lê" on public.patient_documents
  for select using (patient_id = auth.uid() or public.is_admin());
create policy "documentos: admin gere" on public.patient_documents
  for all using (public.is_admin()) with check (public.is_admin());

create policy "relatórios: próprio lê" on public.clinical_reports
  for select using (patient_id = auth.uid() or public.is_admin());
create policy "relatórios: admin gere" on public.clinical_reports
  for all using (public.is_admin()) with check (public.is_admin());

create policy "pagamentos: próprio lê" on public.payments
  for select using (patient_id = auth.uid() or public.is_admin());
create policy "pagamentos: admin gere" on public.payments
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Conteúdos e comunicação
-- ---------------------------------------------------------------------------
create table public.blog_posts (
  slug text primary key,
  title text not null,
  excerpt text,
  category text,
  author text,
  body jsonb not null default '[]',
  reading_minutes int,
  published boolean not null default false,
  published_at timestamptz
);

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order int not null default 0,
  published boolean not null default true
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  context text,
  quote text not null,
  rating int not null default 5 check (rating between 1 and 5),
  published boolean not null default false
);

create table public.clinical_cases (
  id text primary key,
  title text not null,
  specialty text,
  content jsonb not null default '{}',
  published boolean not null default false
);

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  handled boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.assistant_conversations (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  messages jsonb not null default '[]',
  created_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;
alter table public.faqs enable row level security;
alter table public.testimonials enable row level security;
alter table public.clinical_cases enable row level security;
alter table public.contact_messages enable row level security;
alter table public.assistant_conversations enable row level security;

create policy "blog público" on public.blog_posts
  for select using (published or public.is_admin());
create policy "blog: admin gere" on public.blog_posts
  for all using (public.is_admin()) with check (public.is_admin());

create policy "faqs públicas" on public.faqs
  for select using (published or public.is_admin());
create policy "faqs: admin gere" on public.faqs
  for all using (public.is_admin()) with check (public.is_admin());

create policy "testemunhos públicos" on public.testimonials
  for select using (published or public.is_admin());
create policy "testemunhos: admin gere" on public.testimonials
  for all using (public.is_admin()) with check (public.is_admin());

create policy "casos públicos" on public.clinical_cases
  for select using (published or public.is_admin());
create policy "casos: admin gere" on public.clinical_cases
  for all using (public.is_admin()) with check (public.is_admin());

create policy "contactos: inserir" on public.contact_messages
  for insert with check (true);
create policy "contactos: admin lê e gere" on public.contact_messages
  for select using (public.is_admin());
create policy "contactos: admin atualiza" on public.contact_messages
  for update using (public.is_admin()) with check (public.is_admin());

create policy "assistente: inserir" on public.assistant_conversations
  for insert with check (true);
create policy "assistente: admin lê" on public.assistant_conversations
  for select using (public.is_admin());
