-- JobsPlatform — Run once in Supabase SQL Editor
-- Fixes: RLS upload errors + missing columns

-- Applications table
create table if not exists public.applications (
  id           uuid primary key default gen_random_uuid(),
  job_id       bigint,
  job_title    text,
  company      text,
  location     text,
  first_name   text,
  last_name    text,
  email        text,
  phone        text,
  city         text,
  postal_code  text,
  address      text,
  birth_date   text,
  cover_letter text,
  cv_url       text,
  id_doc_url   text,
  selfie_url   text,
  video_url    text,
  status       text default 'pending',
  created_at   timestamptz default now()
);

alter table public.applications enable row level security;

drop policy if exists "Allow anonymous application insert" on public.applications;
create policy "Allow anonymous application insert"
  on public.applications for insert to anon, authenticated
  with check (true);

drop policy if exists "Service read applications" on public.applications;
create policy "Service read applications"
  on public.applications for select to authenticated
  using (true);

-- Storage buckets (create manually if missing: cvs, documents, photos — all public or with policies below)
insert into storage.buckets (id, name, public) values ('cvs', 'cvs', false) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('documents', 'documents', false) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('photos', 'photos', true) on conflict do nothing;

drop policy if exists "Allow anon upload cvs" on storage.objects;
create policy "Allow anon upload cvs"
  on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'cvs');

drop policy if exists "Allow anon upload documents" on storage.objects;
create policy "Allow anon upload documents"
  on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'documents');

drop policy if exists "Allow anon upload photos" on storage.objects;
create policy "Allow anon upload photos"
  on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'photos');

drop policy if exists "Allow public read photos" on storage.objects;
create policy "Allow public read photos"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'photos');
