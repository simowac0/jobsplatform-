// ─── SUPABASE CONFIGURATION ──────────────────────────────────
// 1. Go to https://supabase.com → Create free account → New project
// 2. Settings → API → copy "Project URL" and "anon public" key
// 3. Paste them below

window.SUPABASE_URL  = 'https://YOUR_PROJECT_ID.supabase.co';
window.SUPABASE_ANON = 'YOUR_ANON_PUBLIC_KEY';

// ─── SUPABASE SQL SCHEMA (run in Supabase SQL Editor) ────────
/*
-- PROFILES TABLE
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  first_name  text,
  last_name   text,
  email       text unique,
  role        text default 'jobseeker',
  company     text,
  cv_url      text,
  photo_url   text,
  id_doc_url  text,
  created_at  timestamptz default now()
);

-- Allow users to read/write their own profile
alter table public.profiles enable row level security;
create policy "Users can read own profile"   on public.profiles for select using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- STORAGE BUCKETS (create in Supabase Storage tab)
-- Bucket 1: "cvs"        (private)
-- Bucket 2: "photos"     (public)
-- Bucket 3: "documents"  (private)
*/
