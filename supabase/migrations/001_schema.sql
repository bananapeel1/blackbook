-- ============================================
-- BLACKBOOK: Marine Services Marketplace Schema
-- ============================================

-- Enable extensions
create extension if not exists "uuid-ossp";
create extension if not exists "vector";

-- ============================================
-- ENUMS
-- ============================================

create type user_role as enum ('boat_owner', 'provider', 'admin');
create type request_status as enum ('draft', 'submitted', 'collecting_quotes', 'quotes_received', 'accepted', 'in_progress', 'completed', 'cancelled');
create type quote_status as enum ('pending', 'sent', 'accepted', 'declined', 'expired');
create type urgency_level as enum ('standard', 'priority', 'emergency');
create type verification_status as enum ('unverified', 'pending', 'verified', 'premium');
create type provider_availability as enum ('available', 'busy', 'unavailable');

-- ============================================
-- PROFILES (extends Supabase auth.users)
-- ============================================

create table profiles (
  id uuid references auth.users on delete cascade primary key,
  role user_role not null default 'boat_owner',
  full_name text,
  avatar_url text,
  phone text,
  preferred_language text default 'en',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- SERVICE CATEGORIES
-- ============================================

create table service_categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  icon text, -- Material Symbols icon name
  description text,
  parent_id uuid references service_categories(id),
  sort_order int default 0,
  segment text check (segment in ('practical', 'shore', 'premium')) default 'practical',
  created_at timestamptz default now()
);

-- ============================================
-- LOCATIONS (Ports, Marinas, Bays)
-- ============================================

create table locations (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  country text not null,
  region text, -- e.g. "French Riviera", "Cyclades"
  latitude decimal(10, 7),
  longitude decimal(10, 7),
  type text check (type in ('marina', 'port', 'bay', 'anchorage')) default 'marina',
  description text,
  emergency_contacts jsonb, -- { "coastguard": "+30...", "port_authority": "..." }
  amenities text[], -- ['fuel', 'water', 'electricity', 'wifi', 'laundry']
  image_url text,
  created_at timestamptz default now()
);

-- ============================================
-- VESSELS
-- ============================================

create table vessels (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references profiles(id) on delete cascade not null,
  name text not null,
  type text check (type in ('motor_yacht', 'sailing_yacht', 'catamaran', 'superyacht', 'other')) default 'motor_yacht',
  length_meters decimal(5, 1),
  manufacturer text,
  model text,
  year int,
  flag text, -- country flag
  imo_number text,
  image_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- PROVIDERS
-- ============================================

create table providers (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade unique,
  business_name text not null,
  slug text not null unique,
  description text,
  logo_url text,
  cover_image_url text,

  -- Contact
  email text,
  phone text,
  whatsapp text,
  website text,

  -- Details
  languages text[] default '{"en"}',
  founded_year int,
  team_size int,

  -- Verification
  verification_status verification_status default 'unverified',
  verified_at timestamptz,

  -- Availability
  availability provider_availability default 'available',
  emergency_available boolean default false,

  -- Scoring (private - computed, never exposed raw)
  reliability_score decimal(5, 2) default 0,
  response_rate decimal(5, 2) default 0, -- percentage
  avg_response_time_minutes int,
  completion_rate decimal(5, 2) default 0,
  cancellation_rate decimal(5, 2) default 0,
  avg_rating decimal(3, 2) default 0,
  total_jobs int default 0,
  total_reviews int default 0,

  -- AI
  embedding vector(1536), -- for semantic search

  last_active_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- PROVIDER SERVICES (what each provider offers)
-- ============================================

create table provider_services (
  id uuid default uuid_generate_v4() primary key,
  provider_id uuid references providers(id) on delete cascade not null,
  category_id uuid references service_categories(id) not null,
  description text,
  price_min decimal(10, 2),
  price_max decimal(10, 2),
  currency text default 'EUR',
  emergency_available boolean default false,
  created_at timestamptz default now()
);

-- ============================================
-- PROVIDER COVERAGE ZONES
-- ============================================

create table provider_coverage (
  id uuid default uuid_generate_v4() primary key,
  provider_id uuid references providers(id) on delete cascade not null,
  location_id uuid references locations(id) not null,
  radius_km decimal(5, 1) default 10,
  is_primary boolean default false,
  created_at timestamptz default now(),
  unique(provider_id, location_id)
);

-- ============================================
-- PROVIDER CERTIFICATIONS
-- ============================================

create table provider_certifications (
  id uuid default uuid_generate_v4() primary key,
  provider_id uuid references providers(id) on delete cascade not null,
  name text not null,
  issuer text,
  issued_date date,
  expiry_date date,
  document_url text,
  created_at timestamptz default now()
);

-- ============================================
-- PROVIDER GALLERY
-- ============================================

create table provider_gallery (
  id uuid default uuid_generate_v4() primary key,
  provider_id uuid references providers(id) on delete cascade not null,
  image_url text not null,
  caption text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ============================================
-- SERVICE REQUESTS
-- ============================================

create table service_requests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  vessel_id uuid references vessels(id),
  location_id uuid references locations(id),
  category_id uuid references service_categories(id),

  -- Details
  title text not null,
  description text,
  urgency urgency_level default 'standard',
  status request_status default 'draft',

  -- Schedule
  preferred_date date,
  preferred_time time,
  flexible_dates boolean default false,

  -- Budget
  budget_min decimal(10, 2),
  budget_max decimal(10, 2),
  currency text default 'EUR',

  -- Location override (if not using locations table)
  location_name text,
  location_lat decimal(10, 7),
  location_lng decimal(10, 7),
  berth_info text,

  -- Attachments stored as JSON array
  attachments jsonb default '[]', -- [{ "name": "...", "url": "...", "size": 1234, "type": "image" }]

  -- Matching
  matched_provider_count int default 0,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- QUOTES
-- ============================================

create table quotes (
  id uuid default uuid_generate_v4() primary key,
  request_id uuid references service_requests(id) on delete cascade not null,
  provider_id uuid references providers(id) on delete cascade not null,

  -- Quote details
  amount decimal(10, 2) not null,
  currency text default 'EUR',
  description text,
  estimated_duration text, -- e.g. "2-3 hours"
  warranty_months int,
  earliest_start text, -- e.g. "Immediate", "2-day lead"

  -- Status
  status quote_status default 'pending',

  -- Stripe
  stripe_payment_intent_id text,
  commission_rate decimal(4, 2) default 15.00, -- percentage

  accepted_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  unique(request_id, provider_id)
);

-- ============================================
-- REVIEWS
-- ============================================

create table reviews (
  id uuid default uuid_generate_v4() primary key,
  request_id uuid references service_requests(id) on delete cascade not null,
  quote_id uuid references quotes(id) on delete cascade not null,
  reviewer_id uuid references profiles(id) on delete cascade not null,
  provider_id uuid references providers(id) on delete cascade not null,

  rating int not null check (rating >= 1 and rating <= 5),
  title text,
  body text,

  -- Provider response
  response text,
  response_at timestamptz,

  created_at timestamptz default now(),

  unique(request_id, reviewer_id)
);

-- ============================================
-- MESSAGES
-- ============================================

create table conversations (
  id uuid default uuid_generate_v4() primary key,
  request_id uuid references service_requests(id),
  participant_1 uuid references profiles(id) on delete cascade not null,
  participant_2 uuid references profiles(id) on delete cascade not null,
  last_message_at timestamptz default now(),
  created_at timestamptz default now()
);

create table messages (
  id uuid default uuid_generate_v4() primary key,
  conversation_id uuid references conversations(id) on delete cascade not null,
  sender_id uuid references profiles(id) on delete cascade not null,
  content text,
  attachments jsonb default '[]',
  read_at timestamptz,
  created_at timestamptz default now()
);

-- ============================================
-- SAVED PROVIDERS (Blackbook)
-- ============================================

create table saved_providers (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  provider_id uuid references providers(id) on delete cascade not null,
  notes text,
  created_at timestamptz default now(),
  unique(user_id, provider_id)
);

-- ============================================
-- INDEXES
-- ============================================

create index idx_providers_slug on providers(slug);
create index idx_providers_verification on providers(verification_status);
create index idx_providers_availability on providers(availability);
create index idx_providers_avg_rating on providers(avg_rating desc);
create index idx_provider_services_category on provider_services(category_id);
create index idx_provider_coverage_location on provider_coverage(location_id);
create index idx_service_requests_user on service_requests(user_id);
create index idx_service_requests_status on service_requests(status);
create index idx_service_requests_location on service_requests(location_id);
create index idx_quotes_request on quotes(request_id);
create index idx_quotes_provider on quotes(provider_id);
create index idx_reviews_provider on reviews(provider_id);
create index idx_messages_conversation on messages(conversation_id);
create index idx_locations_country on locations(country);
create index idx_locations_slug on locations(slug);
create index idx_vessels_owner on vessels(owner_id);
create index idx_conversations_participants on conversations(participant_1, participant_2);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

alter table profiles enable row level security;
alter table vessels enable row level security;
alter table providers enable row level security;
alter table provider_services enable row level security;
alter table provider_coverage enable row level security;
alter table provider_certifications enable row level security;
alter table provider_gallery enable row level security;
alter table service_requests enable row level security;
alter table quotes enable row level security;
alter table reviews enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;
alter table saved_providers enable row level security;
alter table service_categories enable row level security;
alter table locations enable row level security;

-- Public read access for categories and locations
create policy "Anyone can read categories" on service_categories for select using (true);
create policy "Anyone can read locations" on locations for select using (true);

-- Profiles: users can read all, update own
create policy "Anyone can read profiles" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

-- Vessels: owners manage their own
create policy "Users can read own vessels" on vessels for select using (auth.uid() = owner_id);
create policy "Users can insert own vessels" on vessels for insert with check (auth.uid() = owner_id);
create policy "Users can update own vessels" on vessels for update using (auth.uid() = owner_id);
create policy "Users can delete own vessels" on vessels for delete using (auth.uid() = owner_id);

-- Providers: public read (limited fields), owner manages
create policy "Anyone can read providers" on providers for select using (true);
create policy "Provider can update own listing" on providers for update using (auth.uid() = user_id);
create policy "Provider can insert own listing" on providers for insert with check (auth.uid() = user_id);

-- Provider services/coverage/certs/gallery: public read, owner manages
create policy "Anyone can read provider services" on provider_services for select using (true);
create policy "Provider manages own services" on provider_services for all using (
  provider_id in (select id from providers where user_id = auth.uid())
);

create policy "Anyone can read provider coverage" on provider_coverage for select using (true);
create policy "Provider manages own coverage" on provider_coverage for all using (
  provider_id in (select id from providers where user_id = auth.uid())
);

create policy "Anyone can read certifications" on provider_certifications for select using (true);
create policy "Provider manages own certs" on provider_certifications for all using (
  provider_id in (select id from providers where user_id = auth.uid())
);

create policy "Anyone can read gallery" on provider_gallery for select using (true);
create policy "Provider manages own gallery" on provider_gallery for all using (
  provider_id in (select id from providers where user_id = auth.uid())
);

-- Service requests: user sees own, providers see requests in their zone
create policy "Users can read own requests" on service_requests for select using (auth.uid() = user_id);
create policy "Providers can read matching requests" on service_requests for select using (
  status in ('submitted', 'collecting_quotes') and
  exists (
    select 1 from providers p
    join provider_coverage pc on pc.provider_id = p.id
    where p.user_id = auth.uid()
    and pc.location_id = service_requests.location_id
  )
);
create policy "Users can insert own requests" on service_requests for insert with check (auth.uid() = user_id);
create policy "Users can update own requests" on service_requests for update using (auth.uid() = user_id);

-- Quotes: request owner and quote provider can see
create policy "Request owner can read quotes" on quotes for select using (
  request_id in (select id from service_requests where user_id = auth.uid())
);
create policy "Provider can read own quotes" on quotes for select using (
  provider_id in (select id from providers where user_id = auth.uid())
);
create policy "Provider can insert quotes" on quotes for insert with check (
  provider_id in (select id from providers where user_id = auth.uid())
);
create policy "Provider can update own quotes" on quotes for update using (
  provider_id in (select id from providers where user_id = auth.uid())
);

-- Reviews: public read, reviewer can write
create policy "Anyone can read reviews" on reviews for select using (true);
create policy "Reviewer can insert review" on reviews for insert with check (auth.uid() = reviewer_id);

-- Conversations & Messages: participants only
create policy "Participants can read conversations" on conversations for select using (
  auth.uid() = participant_1 or auth.uid() = participant_2
);
create policy "Participants can insert conversations" on conversations for insert with check (
  auth.uid() = participant_1 or auth.uid() = participant_2
);

create policy "Participants can read messages" on messages for select using (
  conversation_id in (
    select id from conversations where participant_1 = auth.uid() or participant_2 = auth.uid()
  )
);
create policy "Sender can insert messages" on messages for insert with check (auth.uid() = sender_id);

-- Saved providers: user manages own
create policy "Users can read own saved" on saved_providers for select using (auth.uid() = user_id);
create policy "Users can insert own saved" on saved_providers for insert with check (auth.uid() = user_id);
create policy "Users can delete own saved" on saved_providers for delete using (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at before update on profiles for each row execute function update_updated_at();
create trigger update_vessels_updated_at before update on vessels for each row execute function update_updated_at();
create trigger update_providers_updated_at before update on providers for each row execute function update_updated_at();
create trigger update_service_requests_updated_at before update on service_requests for each row execute function update_updated_at();
create trigger update_quotes_updated_at before update on quotes for each row execute function update_updated_at();

-- Update provider avg_rating when review is added
create or replace function update_provider_rating()
returns trigger as $$
begin
  update providers set
    avg_rating = (select avg(rating)::decimal(3,2) from reviews where provider_id = new.provider_id),
    total_reviews = (select count(*) from reviews where provider_id = new.provider_id)
  where id = new.provider_id;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_review_created
  after insert on reviews
  for each row execute function update_provider_rating();
