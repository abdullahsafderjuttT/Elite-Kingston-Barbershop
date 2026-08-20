-- Elite Kingston Barbershop database
-- Run this file in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service text not null,
  barber text,
  appointment_date date not null,
  appointment_time time not null,
  status text not null default 'pending' check (status in ('pending','confirmed','completed','cancelled')),
  created_at timestamptz not null default now()
);

-- Front-end visitors may submit appointment requests.
alter table public.appointments enable row level security;

drop policy if exists "Public can create appointment requests" on public.appointments;
create policy "Public can create appointment requests"
on public.appointments for insert
to anon, authenticated
with check (true);

-- Do not expose appointment records publicly.
drop policy if exists "Public cannot read appointments" on public.appointments;
create policy "Public cannot read appointments"
on public.appointments for select
to anon
using (false);

create index if not exists appointments_date_idx
on public.appointments (appointment_date, appointment_time);

-- Optional: a simple services table for future CMS/admin expansion.
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  price numeric(10,2) not null,
  duration_minutes integer not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.services enable row level security;

drop policy if exists "Anyone can view active services" on public.services;
create policy "Anyone can view active services"
on public.services for select
to anon, authenticated
using (active = true);

insert into public.services (name, description, price, duration_minutes)
values
('Signature Haircut','Precision cut, styling and a clean finish.',35,45),
('Beard Sculpt','Shape, line-up and conditioning.',25,30),
('Hot Towel Shave','Classic straight-razor experience.',30,35),
('Kids Cut','A sharp, comfortable cut for young gentlemen.',25,30),
('Color & Tone','Professional color and natural-looking tone.',55,60),
('Royal Combo','Haircut, beard sculpt and hot towel finish.',65,75)
on conflict (name) do nothing;
