
-- Roles
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users can view own roles" on public.user_roles for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

-- First signup becomes admin
create or replace function public.bootstrap_first_admin()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end;
$$;
create trigger on_auth_user_created_bootstrap_admin
  after insert on auth.users for each row execute function public.bootstrap_first_admin();

create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

-- Courses
create table public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  tagline text,
  overview text,
  outcomes text[] not null default '{}',
  syllabus text[] not null default '{}',
  practical_details text,
  duration text,
  fee numeric(10,2),
  registration_amount numeric(10,2),
  image_url text,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.courses to anon, authenticated;
grant insert, update, delete on public.courses to authenticated;
grant all on public.courses to service_role;
alter table public.courses enable row level security;
create policy "Public can view active courses" on public.courses for select to anon, authenticated
  using (is_active or public.has_role(auth.uid(), 'admin'));
create policy "Admins insert courses" on public.courses for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update courses" on public.courses for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete courses" on public.courses for delete to authenticated using (public.has_role(auth.uid(), 'admin'));
create trigger courses_touch before update on public.courses for each row execute function public.touch_updated_at();

-- Batches
create table public.batches (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  name text not null,
  start_date date,
  timing text,
  seats int,
  status text not null default 'open' check (status in ('open','filling','closed')),
  created_at timestamptz not null default now()
);
grant select on public.batches to anon, authenticated;
grant insert, update, delete on public.batches to authenticated;
grant all on public.batches to service_role;
alter table public.batches enable row level security;
create policy "Public can view batches" on public.batches for select to anon, authenticated using (true);
create policy "Admins insert batches" on public.batches for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update batches" on public.batches for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete batches" on public.batches for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Registrations
create table public.registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  mobile text not null,
  email text not null,
  course_id uuid references public.courses(id) on delete set null,
  course_title text,
  batch_id uuid references public.batches(id) on delete set null,
  preferred_batch text,
  experience text,
  message text,
  status text not null default 'new' check (status in ('new','contacted','enrolled','cancelled')),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid','pending','paid','failed')),
  amount_due numeric(10,2),
  amount_paid numeric(10,2),
  razorpay_order_id text,
  razorpay_payment_id text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);
grant select, update, delete on public.registrations to authenticated;
grant all on public.registrations to service_role;
alter table public.registrations enable row level security;
create policy "Admins view registrations" on public.registrations for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins update registrations" on public.registrations for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete registrations" on public.registrations for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Enquiries
create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  topic text,
  message text not null,
  status text not null default 'new' check (status in ('new','replied','closed')),
  created_at timestamptz not null default now()
);
grant select, update, delete on public.enquiries to authenticated;
grant all on public.enquiries to service_role;
alter table public.enquiries enable row level security;
create policy "Admins view enquiries" on public.enquiries for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins update enquiries" on public.enquiries for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete enquiries" on public.enquiries for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Gallery
create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  category text not null check (category in ('bridal','hd','reception','party','hairstyling','student')),
  caption text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.gallery_items to anon, authenticated;
grant insert, update, delete on public.gallery_items to authenticated;
grant all on public.gallery_items to service_role;
alter table public.gallery_items enable row level security;
create policy "Public can view gallery" on public.gallery_items for select to anon, authenticated using (true);
create policy "Admins insert gallery" on public.gallery_items for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update gallery" on public.gallery_items for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete gallery" on public.gallery_items for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Testimonials
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  course text,
  quote text not null,
  photo_url text,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.testimonials to anon, authenticated;
grant insert, update, delete on public.testimonials to authenticated;
grant all on public.testimonials to service_role;
alter table public.testimonials enable row level security;
create policy "Public can view published testimonials" on public.testimonials for select to anon, authenticated
  using (is_published or public.has_role(auth.uid(), 'admin'));
create policy "Admins insert testimonials" on public.testimonials for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update testimonials" on public.testimonials for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete testimonials" on public.testimonials for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Site settings (single row)
create table public.site_settings (
  id int primary key default 1 check (id = 1),
  phone_primary text,
  phone_secondary text,
  whatsapp text,
  email text,
  instagram_url text,
  address text,
  map_query text,
  artist_photo_url text,
  updated_at timestamptz not null default now()
);
grant select on public.site_settings to anon, authenticated;
grant update on public.site_settings to authenticated;
grant all on public.site_settings to service_role;
alter table public.site_settings enable row level security;
create policy "Public can view settings" on public.site_settings for select to anon, authenticated using (true);
create policy "Admins update settings" on public.site_settings for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create trigger settings_touch before update on public.site_settings for each row execute function public.touch_updated_at();

insert into public.site_settings (id, phone_primary, phone_secondary, whatsapp, instagram_url)
values (1, '+91 98488 99933', '+91 80192 08036', '918019208036', 'https://www.instagram.com/mana_praveen/');

insert into public.courses (slug, title, tagline, overview, outcomes, syllabus, practical_details, sort_order) values
('professional-makeup', 'Professional Makeup Course', 'The complete foundation for a career in makeup artistry.',
 'A comprehensive programme covering skin preparation, colour theory, face mapping and complete looks for every occasion, designed for aspiring professional makeup artists.',
 array['Understand skin types, undertones and skin preparation','Master colour correction, base and contouring','Create day, evening, bridal and editorial looks','Work hygienically with professional products and tools','Build a portfolio and start working with clients'],
 array['Tools, brushes and hygiene','Skin analysis and preparation','Colour theory and correction','Foundation, concealing and setting','Contouring, highlighting and blush','Eye makeup techniques','Brows and lashes','Lip techniques','Complete looks and portfolio shoot'],
 'Hands-on practice on models in every session, with personal correction from the trainer.', 1),
('bridal-makeup', 'Bridal Makeup Course', 'Create timeless, long-lasting bridal looks.',
 'Specialised training in South Indian, North Indian and contemporary bridal looks, including long-wear techniques, draping and complete bridal styling.',
 array['Plan a bridal look around skin, outfit and jewellery','Apply long-lasting, sweat-proof bridal bases','Create traditional and modern bridal eye looks','Coordinate bridal hairstyling and accessories','Manage bridal clients and trial sessions'],
 array['Bridal consultation and trials','Long-wear skin preparation','Traditional bridal looks','Contemporary bridal looks','Bridal eye makeup and lashes','Saree draping and dupatta setting','Jewellery and accessory placement','Reception and engagement looks'],
 'Practice on live models with complete bridal styling from start to finish.', 2),
('hd-makeup', 'HD Makeup Course', 'Flawless, camera-ready skin for high-definition photography and video.',
 'Learn high-definition makeup techniques that look seamless on camera and in person, with a focus on lightweight layering and natural skin finish.',
 array['Understand how makeup reads on HD cameras','Build lightweight, seamless bases','Choose HD-friendly products and textures','Correct skin concerns without heaviness','Create camera-ready looks for shoots and events'],
 array['HD products and textures','Skin prep for camera','Layering and blending techniques','Colour correction for HD','Soft sculpting and highlighting','HD eye and lip looks','Lighting and photography basics'],
 'Practice sessions with photo checks to review how each look appears on camera.', 3),
('party-makeup', 'Party Makeup Course', 'Glamorous looks for parties, receptions and celebrations.',
 'A focused course on quick, glamorous party and occasion makeup, from soft glam to bold evening looks.',
 array['Create soft glam and bold glam looks','Work quickly for party and event clients','Use shimmer, glitter and lashes professionally','Match makeup to outfits and occasions'],
 array['Quick skin preparation','Soft glam base','Smokey and glitter eyes','Cut crease techniques','Lashes and liner styles','Lip combinations','Complete party looks'],
 'Practice on models with timed looks to build speed and confidence.', 4),
('hairstyling', 'Hairstyling Course', 'Bridal and party hairstyles that complete every look.',
 'Learn professional hairstyling for brides, parties and events, from classic buns and braids to modern open styles.',
 array['Prepare hair with the right tools and products','Create buns, braids and open styles','Style bridal hair with flowers and accessories','Use extensions and padding professionally'],
 array['Tools, products and hair prep','Curling and straightening techniques','Basic and advanced braids','Buns and updos','Open and half-up styles','Bridal hairstyles with accessories','Extensions and padding'],
 'Hands-on styling practice on models and mannequins.', 5),
('basic-to-advanced', 'Basic To Advanced Makeup Training', 'Start from zero and grow into a confident makeup artist.',
 'A step-by-step journey for complete beginners that builds from everyday makeup to advanced bridal and HD techniques.',
 array['Learn makeup fundamentals with no prior experience','Progress to advanced bridal and HD techniques','Develop speed, confidence and client skills','Prepare for a professional makeup career'],
 array['Introduction to makeup and tools','Self makeup basics','Skin and base fundamentals','Eye, brow and lip basics','Intermediate party looks','Advanced bridal looks','HD techniques','Hairstyling basics','Career guidance'],
 'Structured practice at every level, guided personally by the trainer.', 6);
