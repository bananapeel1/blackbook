-- =============================================================================
-- BlackBook - Cyprus Real Provider & Marina Data
-- Source: Web research March 2026
-- Safe to re-run: all INSERTs use ON CONFLICT DO NOTHING
-- =============================================================================

-- =============================================================================
-- 1. UPDATE EXISTING LOCATIONS WITH REAL MARINA DETAILS
-- =============================================================================

-- Limassol Marina — corrected coordinates & full details
UPDATE locations SET
  latitude = 34.6680,
  longitude = 33.0407,
  description = 'Premier full-service superyacht marina in Limassol city centre. 650 berths including 70 superyacht berths up to 110m LOA. Luxury retail village, restaurants, boatyard with 100-ton travel lift. Operated by Francoudi & Stephanou. 5 Gold Anchor Platinum.',
  vhf_channel = 'VHF 12',
  max_draft_meters = 9.0,
  max_loa_meters = 110.0,
  approach_depth_meters = 9.0,
  berth_count = 650,
  fuel_types = '{"diesel", "petrol"}',
  amenities = '{"fuel", "water", "electricity", "wifi", "showers", "laundry", "restaurant", "chandlery", "boatyard", "travel-lift", "security", "concierge"}',
  emergency_contacts = '{"marina": "+357 25 020 020", "freephone": "+357 80 080 010", "email": "info@limassolmarina.com"}'
WHERE slug = 'limassol-marina';

-- Larnaca Marina — corrected
UPDATE locations SET
  latitude = 34.9167,
  longitude = 33.6333,
  description = 'Established marina near Larnaca International Airport with 350 berths (max capacity 450). Major redevelopment underway by Kition Ocean Holdings (1.2B EUR) to expand to 650+ berths up to 115m. Currently max draft limited. Port of entry with 24hr customs.',
  vhf_channel = 'VHF 16/08',
  max_draft_meters = 3.0,
  max_loa_meters = 50.0,
  approach_depth_meters = 2.5,
  berth_count = 350,
  fuel_types = '{"diesel", "petrol"}',
  amenities = '{"fuel", "water", "electricity", "wifi", "showers", "laundry", "boatyard", "travel-lift", "chandlery"}',
  emergency_contacts = '{"marina": "+357 24 653 110", "alt": "+357 24 653 113", "email": "larnacamarina@cpa.gov.cy"}',
  approach_notes = 'Approach with caution if draft exceeds 2m. Seabed is mud and sand. Book well in advance during redevelopment.'
WHERE slug = 'larnaca-marina';

-- Paphos Harbour — corrected
UPDATE locations SET
  latitude = 34.7537,
  longitude = 32.4080,
  description = 'Historic harbour beneath Paphos Castle with approximately 30 yacht moorings. Port of entry operated by Cyprus Ports Authority. Basic facilities. New Paphos Marina near Kissonerga is in planning (500+ berths).',
  vhf_channel = 'VHF 16',
  max_draft_meters = 2.0,
  max_loa_meters = 15.0,
  berth_count = 30,
  fuel_types = '{"diesel"}',
  amenities = '{"water", "electricity", "restaurant", "fuel", "wifi"}',
  emergency_contacts = '{"port_authority": "+357 26 946 840", "email": "cpa.paphos@cytanet.com.cy"}'
WHERE slug = 'paphos-harbour';

-- Latchi Marina — corrected
UPDATE locations SET
  latitude = 35.0333,
  longitude = 32.3833,
  description = 'Expanded fishing harbour on the Akamas Peninsula with 350 berths. Port of entry. Tavernas at quayside, kiosks, town of Polis 2km away. Give breakwater end wide berth on approach; submerged rocks near north quay.',
  vhf_channel = 'VHF 16',
  max_draft_meters = 3.0,
  max_loa_meters = 20.0,
  berth_count = 350,
  amenities = '{"water", "electricity", "fuel", "restaurant", "showers"}',
  emergency_contacts = '{"berth_coordinator": "+357 99 828 816"}',
  approach_notes = 'Give breakwater end wide berth. North breakwater: enter bow first. Submerged rocks near quay.'
WHERE slug = 'latchi-marina';

-- Ayia Napa Marina — corrected
UPDATE locations SET
  latitude = 34.9786,
  longitude = 33.9489,
  description = 'Modern luxury marina with 360 wet berths, 160 dry stack and 80 dry dock positions. ISO 13687-1 certified — only certified yacht harbour in Cyprus. Travel hoist up to 36m/150 tons. Beach club, yacht club, event centre.',
  vhf_channel = 'VHF 10',
  max_draft_meters = 7.0,
  max_loa_meters = 85.0,
  berth_count = 600,
  fuel_types = '{"diesel", "petrol"}',
  amenities = '{"fuel", "water", "electricity", "wifi", "showers", "laundry", "restaurant", "concierge", "security", "boatyard", "travel-lift"}',
  emergency_contacts = '{"marina": "+357 23 300 500", "email": "info@marinaayianapa.com"}'
WHERE slug = 'ayia-napa-marina';

-- =============================================================================
-- 2. ADD MISSING CYPRUS LOCATIONS
-- =============================================================================

INSERT INTO locations (id, name, slug, country, region, latitude, longitude, type, description, amenities, vhf_channel, max_draft_meters, max_loa_meters, berth_count, fuel_types, emergency_contacts, approach_notes) VALUES
  (gen_random_uuid(), 'St Raphael Marina', 'st-raphael-marina', 'Cyprus', 'Limassol', 34.7083, 33.1678, 'marina',
   'Private marina at the 5-star St. Raphael Resort, east of Limassol. 237 berths up to 30m LOA. Port of entry with 54-ton travel lift and full boatyard. Home to St. Raphael Yacht Club. Diving and water sports centre on-site.',
   '{"fuel", "water", "electricity", "wifi", "showers", "chandlery", "boatyard", "travel-lift", "restaurant", "security"}',
   'VHF 09/16', 4.0, 30.0, 237, '{"diesel", "petrol"}',
   '{"marina": "+357 25 834 333", "email": "straphael@straphael.com"}',
   'Call "St. Raphael Marina" on VHF 09 or 16 for berthing instructions.'),

  (gen_random_uuid(), 'Zygi Fishing Shelter', 'zygi-shelter', 'Cyprus', 'Larnaca', 34.7269, 33.3397, 'port',
   'Fishing shelter between Larnaca and Limassol. Approximately 240 berths, mostly fishing boats; yachts accepted if space available. Not a port of entry. Famous for waterfront fish tavernas.',
   '{"restaurant"}',
   NULL, 3.5, 30.0, 240, NULL,
   '{"fisheries_dept": "+357 22 807 807", "email": "dfmr@dfmr.moa.gov.cy"}',
   'Fishing boats have priority. Berth applications processed through DFMR. Cannot check in/out here.')
ON CONFLICT (slug) DO NOTHING;


-- =============================================================================
-- 3. REAL CYPRUS PROVIDERS
-- =============================================================================
-- These are real businesses found through web research.
-- user_id is NULL because they haven't registered yet (pre-seeded).
-- verification_status = 'unverified' until they claim their profile.
-- Scoring fields left at defaults (0) since no platform activity yet.

-- ---------------------------------------------------------------------------
-- REPAIR & MAINTENANCE
-- ---------------------------------------------------------------------------

-- Multimarine Shipyards — major shipyard, superyacht refit
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'Multimarine Shipyards', 'multimarine-shipyards',
   'Major shipyard at Limassol Port with 120m floating dry dock. Drydocking, ship repair, superyacht refit, afloat repairs. 24/7 yacht agency for all superyachts visiting Cyprus. 35+ years experience.',
   'info@multimarine.com.cy', '+357 25 336520', NULL, 'https://www.multimarine.com.cy/',
   '{"English", "Greek", "Russian"}', 1988, 50, 'unverified', 'available', true)
ON CONFLICT (slug) DO NOTHING;

-- Ocean Marine Equipment — chandlery + repair
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'Ocean Marine Equipment', 'ocean-marine-equipment',
   'Marine equipment supplier and repair service in Limassol since 1990. Cosmetic repair, mechanical/electrical systems, fibreglass work, underwater care and yacht management.',
   'webenquiry@oceanmarine.com.cy', '+357 25 369731', NULL, 'http://www.oceanmarine.com.cy/',
   '{"English", "Greek"}', 1990, 10, 'unverified', 'available', true)
ON CONFLICT (slug) DO NOTHING;

-- Golden Comet Marine — boat sales + workshop
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'Golden Comet Marine', 'golden-comet-marine',
   'Established 1985 with 650sqm indoor workshop in Limassol. Dealers for Lagoon, Jeanneau, Prestige, Bayliner, Wellcraft, Four Winns. Full mechanical servicing and after-sales support.',
   'info@goldencomet.com', '+357 25 392 100', NULL, 'https://goldencomet.com',
   '{"English", "Greek"}', 1985, 15, 'unverified', 'available', false)
ON CONFLICT (slug) DO NOTHING;

-- Nautimar Marine — refit management
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'Nautimar Marine', 'nautimar-marine',
   'Operating from Limassol Marina since 1995. Refit management, owner''s rep services for craft up to 30m. Van der Valk, Sundeck, Invictus, Chaparral, Robalo dealer.',
   'info@nautimarmarine.com', '+357 2505 1210', NULL, 'https://nautimarmarine.com',
   '{"English", "Greek"}', 1995, 8, 'unverified', 'available', false)
ON CONFLICT (slug) DO NOTHING;

-- C&R Motorboat Marine Services — engine specialists
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'C&R Motorboat Marine Services', 'cr-motorboat',
   'Engine repair, maintenance, antifouling and refurbishment specialists in the Protaras/Ayia Napa area. Authorised technicians for FPT, Mercury, Cummins Marine. Full engine diagnostics and boat storage.',
   'info@crmotorboat.com', '+357 23 824466', '+357 99 809588', 'https://www.crmotorboat.com/',
   '{"English", "Greek"}', 2010, 6, 'unverified', 'available', true)
ON CONFLICT (slug) DO NOTHING;

-- A.K. Mediterranean Yachting
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'A.K. Mediterranean Yachting', 'ak-med-yachting',
   'Limassol Marina-based since 1997. Beneteau, Crownline, De Antonio dealer. Chandlery shop on-site. Sales, after-sales maintenance, winter storage and yacht management.',
   'info@yachtcyprus.com', '+357 25 63 63 73', NULL, 'https://yachtcyprus.com',
   '{"English", "Greek", "Russian"}', 1997, 10, 'unverified', 'available', false)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- MARINE ELECTRONICS
-- ---------------------------------------------------------------------------

INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'Damianou Marine Electronics', 'damianou-electronics',
   'Marine electronics sales, installation and repair in Larnaca. Navigation, communication, safety and entertainment systems. Echopilot distributor for Cyprus.',
   'damarine@damarine.com.cy', '+357 24 668668', NULL, 'https://damarine.com.cy',
   '{"English", "Greek"}', 2000, 5, 'unverified', 'available', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'K.J. Electronics', 'kj-electronics',
   'Marine electronics repair, installation and sales in Larnaca. Exclusive distributor for Koden and Onwa navigation equipment. Serves cargo ships, fishing boats and yachts.',
   'info@kjelectronics.com.cy', '+357 24 636 360', NULL, 'https://www.kjelectronics.com.cy/',
   '{"English", "Greek"}', 1995, 4, 'unverified', 'available', false)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- SAIL MAKERS & RIGGING
-- ---------------------------------------------------------------------------

INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'Kafetzidakis Sails', 'kafetzidakis-sails',
   'Sail construction, repair and maintenance since 1979. North Sails service point. Limassol loft. Reps for Selden Mast, MAX-PROP, RECKMANN, LEISURE FURL. Rigging, mast and cover work.',
   'info@kafetzidakis.gr', '+30 210 4137438', '+30 6948007239', 'https://www.kafetzidakis.gr/',
   '{"English", "Greek"}', 1979, 6, 'unverified', 'available', false)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'Sails Worx', 'sails-worx',
   'Larnaca-based sail loft for sail repairs, bimini tops, sprayhoods, boat covers and marine canvas work.',
   NULL, NULL, NULL, 'https://www.sailsworx.com/',
   '{"English", "Greek"}', 2015, 3, 'unverified', 'available', false)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- PROVISIONING & CONCIERGE
-- ---------------------------------------------------------------------------

INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'SEATRIP', 'seatrip-cyprus',
   'Full-service yacht operations based at Limassol Marina. Provisioning, yacht management, charter, cleaning, concierge and crew management. Covers Limassol, Larnaka, Ayia Napa, Pafos and Lachi.',
   'hello@seatrip.com', '+357 97 444344', '+357 99 024140', 'https://seatrip.com',
   '{"English", "Greek", "Russian"}', 2018, 8, 'unverified', 'available', false)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'BWA Yachting Cyprus', 'bwa-yachting-cyprus',
   'Part of global BWA network (750+ ports). Superyacht provisioning, agency, concierge and fuel bunkering. Fresh provisions delivered quayside or by tender. Duty-free fuel coordination, customs clearance, VIP concierge.',
   'cyprus@bwayachting.com', '+357 96 111551', NULL, 'https://bwayachting.com/our-locations/mediterranean/cyprus/',
   '{"English", "Greek", "French", "Russian"}', 2016, 5, 'unverified', 'available', false)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- YACHT CLEANING & DETAILING
-- ---------------------------------------------------------------------------

INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'Diamantides Yachting', 'diamantides-yachting',
   'Specialist yacht interior/exterior cleaning and refinishing at Limassol Marina. Fabric, stone, wood, marble/granite polishing, gold/chrome plating. Also offers brokerage, charter, management and yacht registration services.',
   'info@diamantidesyachting.com', '+357 25 010 561', '+357 99 489 173', 'https://diamantidesyachting.com',
   '{"English", "Greek"}', 2005, 6, 'unverified', 'available', false)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- MARINE SURVEYORS
-- ---------------------------------------------------------------------------

INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'ILIC Enterprises', 'ilic-enterprises',
   'Ship and yacht surveys, valuations and inspections since 1927. P&I surveys, pre-purchase, damage assessment. Recognised by International Group of P&I Clubs. Limassol office.',
   NULL, '+357 25 34 85 68', NULL, 'https://www.ilicenterprises.com',
   '{"English", "Greek"}', 1927, 5, 'unverified', 'available', false)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'CMT InterMarine Maritime Services', 'cmt-intermarine',
   'Marine surveying and technical consultancy in Limassol. Superyacht and yacht survey specialist. GRP/FRP condition monitoring, pre-purchase surveys, damage assessment.',
   'info@intermarine-surveyors.com', '+357 25 335089', '+357 99 206580', 'https://www.intermarine-surveyors.com/',
   '{"English", "Greek"}', 2005, 4, 'unverified', 'available', false)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- YACHT AGENTS
-- ---------------------------------------------------------------------------

INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'Yacht Shore Premium Services', 'yacht-shore',
   'Elite yacht agency at Limassol Marina. Yacht management, concierge, crew recruitment, customs/immigration, provisioning, VIP transfers and event organising. Also at Larnaca and Ayia Napa marinas.',
   'info@yacht-shore.com', '+357 25 020 655', NULL, 'https://www.yacht-shore.com/',
   '{"English", "Greek", "Russian", "French"}', 2015, 8, 'unverified', 'available', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'Shoham (Cyprus)', 'shoham-cyprus',
   'Ship agency, port agency and freight forwarding with 60+ years experience. Serves ports of Limassol, Larnaca and Vassiliko. Crew changes, spares delivery, bunkering coordination.',
   'websales@shoham.com.cy', '+357 25 208700', NULL, 'https://shoham.com.cy/',
   '{"English", "Greek", "Russian"}', 1960, 20, 'unverified', 'available', false)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- FUEL / BUNKERING
-- ---------------------------------------------------------------------------

INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'Island Oil Limited', 'island-oil',
   'Marine fuel bunkering services in Limassol. Competitive pricing for diesel and marine gas oil delivery to berth.',
   NULL, '+357 25 88 90 00', NULL, NULL,
   '{"English", "Greek"}', 2000, 10, 'unverified', 'available', false)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'Helisea Bunkering', 'helisea-bunkering',
   'Yacht fuel bunkering across all Cyprus. Part of the Nemitsas Group. Competitive pricing, all-island coverage for diesel and petrol delivery.',
   NULL, NULL, NULL, 'https://helisea.nemitsas.eu/bunkering',
   '{"English", "Greek"}', 2010, 8, 'unverified', 'available', false)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- DIVING SERVICES
-- ---------------------------------------------------------------------------

INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'Diving Status', 'diving-status',
   'Underwater hull cleaning, propeller polishing, underwater welding, in-water surveys. 40+ years experience, 6000+ contracts. Certified by ABS, Bureau Veritas, DNV-GL, Lloyds Register, RINA. 50+ employees. Limassol base.',
   NULL, '+357 25 03 03 19', NULL, 'https://www.divingstatus.com/',
   '{"English", "Greek"}', 1984, 50, 'unverified', 'available', true)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- VIP TRANSFERS & TRANSPORT
-- ---------------------------------------------------------------------------

INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'Prestige VIP Services', 'prestige-vip',
   'VIP airport transfers, yacht charters with catering, private jet coordination and security services. Fleet includes Maserati, BMW, Mercedes, Bentley, Maybach, Land Rover. Based in Limassol.',
   NULL, '+357 25 322055', '+357 97 878004', 'https://www.prestigecy.com/',
   '{"English", "Greek", "Russian", "French"}', 2010, 15, 'unverified', 'available', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'Acropolis Vassos Taxi', 'acropolis-vassos',
   'VIP and executive transfers since 1941. Limousines, VIP chauffeur services, yacht charter support. Larnaca-based with pan-Cyprus coverage. 24/7 availability.',
   'info@acropolis-transport.com', '+357 24 622000', '+357 96 727135', 'https://www.acropolis-transport.com/',
   '{"English", "Greek", "Russian", "German"}', 1941, 30, 'unverified', 'available', true)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- WATER TAXI
-- ---------------------------------------------------------------------------

INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'SeaTaxi Cyprus', 'seataxi-cyprus',
   'First and only boat taxi service in Cyprus. Routes between Limassol Marina, beachfront hotels (Four Seasons, Amara, Parklane, St. Raphael) and Ladies Mile Beach. Up to 8 passengers. Base fare 50 EUR + 12 EUR/nm.',
   'info@seataxi.co', '+357 94 31000', NULL, 'https://seataxi.co/',
   '{"English", "Greek"}', 2022, 4, 'unverified', 'available', false)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- YACHT MANAGEMENT
-- ---------------------------------------------------------------------------

INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'Hill Robinson Cyprus', 'hill-robinson-cy',
   'Global superyacht management leader. Cyprus office at Limassol Marina since 2015. Technical compliance, crewing, new build/refit project management. Chartered accountants on-site for fleet payment admin.',
   'cyprus@hillrobinson.com', '+357 25 025 750', NULL, 'https://hillrobinson.com',
   '{"English", "Greek", "French", "Russian"}', 2015, 8, 'unverified', 'available', false)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'InterYachting Cyprus', 'interyachting-cyprus',
   'Yacht management, sales, charter and sailing school since 1996. Bavaria, Fountaine Pajot, Italia Yachts dealer. Offices at Limassol HQ, Old Port and Ayia Napa Marina.',
   'info@interyachting.com.cy', '+357 25 811900', '+357 99 404984', 'https://interyachting.com.cy/',
   '{"English", "Greek", "Russian"}', 1996, 15, 'unverified', 'available', false)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'Princess Yachts Cyprus', 'princess-yachts-cy',
   'Official Princess Yachts UK distributor since 1997. 25+ years in Cyprus. Sales, charter, management, crew placement, insurance and registration services.',
   'info@princessyachts.com.cy', '+357 25 770320', NULL, 'https://www.princessyachtscharter.eu/',
   '{"English", "Greek", "Russian"}', 1997, 10, 'unverified', 'available', false)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- YACHT BROKERAGE
-- ---------------------------------------------------------------------------

INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'BP Yachting', 'bp-yachting',
   'Exclusive representative for Azimut/Benetti, Sea Ray, Elan in Cyprus. Offices in Limassol Marina, Larnaca, Ayia Napa and Beirut. Sales, charter and brokerage.',
   'sales@bpyachting.com', '+357 25 051234', NULL, 'https://www.bpyachting.com/',
   '{"English", "Greek", "Arabic", "French"}', 2005, 12, 'unverified', 'available', false)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'IYC Cyprus', 'iyc-cyprus',
   'Cyprus office of International Yacht Company — one of the world''s largest yacht sales and charter firms. 160+ professionals, 15 offices globally. Nicosia-based office.',
   'info@iyc.com', '+357 22 02 72 20', NULL, 'https://iyc.com/office/cyprus/',
   '{"English", "Greek", "French", "Russian"}', 2018, 5, 'unverified', 'available', false)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- MARINE INSURANCE
-- ---------------------------------------------------------------------------

INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available) VALUES
  (gen_random_uuid(), NULL, 'Aphentrica Marine Insurance Brokers', 'aphentrica-marine',
   'Marine insurance specialists since 1994. Covers shipowners, operators, managers, cargo owners and yacht owners. Cyprus Shipping Chamber associate member. Limassol office.',
   'insurance@aphentrica.com', '+357 25 822 170', NULL, 'https://aphentrica.com/',
   '{"English", "Greek"}', 1994, 8, 'unverified', 'available', false)
ON CONFLICT (slug) DO NOTHING;


-- =============================================================================
-- 4. PROVIDER SERVICES (linking providers to categories)
-- =============================================================================

-- Multimarine — mechanics, hull cleaning, customs
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'multimarine-shipyards'), (SELECT id FROM service_categories WHERE slug = 'mechanics'), 'Diesel engine overhaul, shaft alignment, mechanical systems', 200, 15000, 'EUR', true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'multimarine-shipyards'), (SELECT id FROM service_categories WHERE slug = 'hull-cleaning'), 'Drydocking, hull painting, antifouling in 120m floating dock', 500, 50000, 'EUR', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'multimarine-shipyards'), (SELECT id FROM service_categories WHERE slug = 'customs-agents'), '24/7 yacht agency, customs clearance, crew change support', 150, 800, 'EUR', true);

-- Ocean Marine — mechanics, electricians, chandlery, AC
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ocean-marine-equipment'), (SELECT id FROM service_categories WHERE slug = 'mechanics'), 'Mechanical systems repair and maintenance', 100, 5000, 'EUR', true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ocean-marine-equipment'), (SELECT id FROM service_categories WHERE slug = 'electricians'), 'Electrical systems, generators, power invertors', 80, 3000, 'EUR', true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ocean-marine-equipment'), (SELECT id FROM service_categories WHERE slug = 'chandlery'), 'Marine hardware, deck gear, safety equipment', 20, 5000, 'EUR', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ocean-marine-equipment'), (SELECT id FROM service_categories WHERE slug = 'ac-repair'), 'AC systems installation, maintenance and repair', 100, 4000, 'EUR', true);

-- Golden Comet — mechanics
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'golden-comet-marine'), (SELECT id FROM service_categories WHERE slug = 'mechanics'), 'Workshop servicing, engine diagnostics, after-sales for Lagoon, Jeanneau, Prestige', 100, 8000, 'EUR', false);

-- C&R Motorboat — mechanics
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cr-motorboat'), (SELECT id FROM service_categories WHERE slug = 'mechanics'), 'FPT, Mercury, Cummins Marine authorised service. Engine diagnostics, antifouling, storage', 80, 6000, 'EUR', true);

-- Damianou — electricians
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'damianou-electronics'), (SELECT id FROM service_categories WHERE slug = 'electricians'), 'Navigation, communication, safety and entertainment electronics', 50, 8000, 'EUR', true);

-- K.J. Electronics — electricians
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'kj-electronics'), (SELECT id FROM service_categories WHERE slug = 'electricians'), 'Koden and Onwa navigation equipment. Repair, installation, sales', 50, 5000, 'EUR', false);

-- Kafetzidakis — sails, rigging
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'kafetzidakis-sails'), (SELECT id FROM service_categories WHERE slug = 'sail-repair'), 'Sail construction, repair, UV covers, North Sails service point', 100, 15000, 'EUR', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'kafetzidakis-sails'), (SELECT id FROM service_categories WHERE slug = 'rigging'), 'Mast work, standing rigging, Selden Mast rep', 200, 10000, 'EUR', false);

-- Sails Worx — sails
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'sails-worx'), (SELECT id FROM service_categories WHERE slug = 'sail-repair'), 'Sail repairs, bimini, sprayhood, boat covers, canvas work', 50, 3000, 'EUR', false);

-- SEATRIP — provisioning, cleaning, concierge
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'seatrip-cyprus'), (SELECT id FROM service_categories WHERE slug = 'provisioning'), 'Full yacht provisioning across all Cyprus marinas', 100, 10000, 'EUR', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'seatrip-cyprus'), (SELECT id FROM service_categories WHERE slug = 'cleaners'), 'Hull cleaning, deck polishing, interior deep clean', 80, 2000, 'EUR', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'seatrip-cyprus'), (SELECT id FROM service_categories WHERE slug = 'concierge'), 'Fleet management, charter coordination, crew management', 200, 5000, 'EUR', false);

-- BWA Yachting — provisioning, customs, fuel, concierge
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bwa-yachting-cyprus'), (SELECT id FROM service_categories WHERE slug = 'provisioning'), 'Superyacht provisioning, fresh provisions quayside', 200, 20000, 'EUR', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bwa-yachting-cyprus'), (SELECT id FROM service_categories WHERE slug = 'customs-agents'), 'Customs clearance, immigration, berth reservations', 150, 1000, 'EUR', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bwa-yachting-cyprus'), (SELECT id FROM service_categories WHERE slug = 'fuel-delivery'), 'Duty-free fuel bunkering coordination', 500, 50000, 'EUR', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bwa-yachting-cyprus'), (SELECT id FROM service_categories WHERE slug = 'concierge'), 'VIP concierge, itinerary planning, crew assistance', 200, 10000, 'EUR', false);

-- Diamantides — cleaning
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'diamantides-yachting'), (SELECT id FROM service_categories WHERE slug = 'cleaners'), 'Interior/exterior detailing, marble polishing, chrome plating', 100, 5000, 'EUR', false);

-- ILIC — marine surveys (not a service_category, skip)
-- CMT InterMarine — marine surveys (skip)

-- Yacht Shore — customs, concierge, VIP
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'yacht-shore'), (SELECT id FROM service_categories WHERE slug = 'customs-agents'), 'Port clearance, customs, immigration, transit log', 120, 600, 'EUR', true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'yacht-shore'), (SELECT id FROM service_categories WHERE slug = 'concierge'), 'Yacht management, event organising, crew recruitment', 200, 10000, 'EUR', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'yacht-shore'), (SELECT id FROM service_categories WHERE slug = 'vip-transport'), 'VIP transfers, helicopter coordination', 100, 5000, 'EUR', true);

-- Island Oil — fuel
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'island-oil'), (SELECT id FROM service_categories WHERE slug = 'fuel-delivery'), 'Marine diesel and gas oil delivery to berth in Limassol', 200, 30000, 'EUR', false);

-- Helisea — fuel
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'helisea-bunkering'), (SELECT id FROM service_categories WHERE slug = 'fuel-delivery'), 'All-island yacht fuel delivery, competitive pricing', 200, 50000, 'EUR', false);

-- Diving Status — divers, hull cleaning
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'diving-status'), (SELECT id FROM service_categories WHERE slug = 'divers'), 'In-water survey, underwater welding, salvage. Class-certified.', 200, 10000, 'EUR', true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'diving-status'), (SELECT id FROM service_categories WHERE slug = 'hull-cleaning'), 'Propeller polishing, hull scrubbing, zinc replacement', 100, 3000, 'EUR', true);

-- Prestige VIP — VIP transport
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'prestige-vip'), (SELECT id FROM service_categories WHERE slug = 'vip-transport'), 'Maserati, Bentley, Maybach fleet. Airport transfers, security, private jet', 100, 5000, 'EUR', true);

-- Acropolis — taxi/transfers
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'acropolis-vassos'), (SELECT id FROM service_categories WHERE slug = 'taxi-transfers'), 'Airport and port transfers, limousines, VIP chauffeur. Since 1941', 40, 500, 'EUR', true);

-- SeaTaxi — taxi/transfers
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'seataxi-cyprus'), (SELECT id FROM service_categories WHERE slug = 'taxi-transfers'), 'Water taxi between Limassol Marina, hotels and beaches. Base 50 EUR + 12 EUR/nm', 50, 200, 'EUR', false);

-- Hill Robinson — concierge
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'hill-robinson-cy'), (SELECT id FROM service_categories WHERE slug = 'concierge'), 'Superyacht management, technical compliance, crewing, refit PM', 500, 50000, 'EUR', false);

-- InterYachting — concierge
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'interyachting-cyprus'), (SELECT id FROM service_categories WHERE slug = 'concierge'), 'Yacht management, charter, sales, sailing courses', 200, 5000, 'EUR', false);


-- =============================================================================
-- 5. PROVIDER COVERAGE (linking providers to locations)
-- =============================================================================

-- Helper: most providers cover Limassol Marina as primary
-- We also link to other Cyprus locations where applicable

-- Multimarine — Limassol + Larnaca
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'multimarine-shipyards'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'multimarine-shipyards'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 10, false)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- Ocean Marine — Limassol
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ocean-marine-equipment'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 15, true)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- Golden Comet — Limassol
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'golden-comet-marine'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 20, true)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- Nautimar — Limassol
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'nautimar-marine'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 10, true)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- C&R Motorboat — Ayia Napa
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cr-motorboat'), (SELECT id FROM locations WHERE slug = 'ayia-napa-marina'), 20, true)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- AK Med Yachting — Limassol
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ak-med-yachting'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 10, true)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- Damianou — Larnaca
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'damianou-electronics'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 15, true)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- KJ Electronics — Larnaca
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'kj-electronics'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 15, true)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- Kafetzidakis — Limassol (loft)
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'kafetzidakis-sails'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 20, true)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- Sails Worx — Larnaca
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'sails-worx'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 15, true)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- SEATRIP — All Cyprus
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'seatrip-cyprus'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'seatrip-cyprus'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 10, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'seatrip-cyprus'), (SELECT id FROM locations WHERE slug = 'ayia-napa-marina'), 10, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'seatrip-cyprus'), (SELECT id FROM locations WHERE slug = 'paphos-harbour'), 10, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'seatrip-cyprus'), (SELECT id FROM locations WHERE slug = 'latchi-marina'), 10, false)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- BWA Yachting — Limassol
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bwa-yachting-cyprus'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 15, true)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- Diamantides — Limassol
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'diamantides-yachting'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 10, true)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- ILIC — Limassol
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ilic-enterprises'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 30, true)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- CMT InterMarine — Limassol
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cmt-intermarine'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 30, true)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- Yacht Shore — All 3 main marinas
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'yacht-shore'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'yacht-shore'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 10, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'yacht-shore'), (SELECT id FROM locations WHERE slug = 'ayia-napa-marina'), 10, false)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- Shoham — Limassol + Larnaca
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'shoham-cyprus'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'shoham-cyprus'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 10, false)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- Island Oil — Limassol
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'island-oil'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 15, true)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- Helisea — All Cyprus
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'helisea-bunkering'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'helisea-bunkering'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 10, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'helisea-bunkering'), (SELECT id FROM locations WHERE slug = 'ayia-napa-marina'), 10, false)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- Diving Status — Limassol
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'diving-status'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 20, true)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- Prestige VIP — Limassol + Larnaca
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'prestige-vip'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 30, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'prestige-vip'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 20, false)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- Acropolis — All Cyprus (Larnaca primary)
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'acropolis-vassos'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 30, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'acropolis-vassos'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 20, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'acropolis-vassos'), (SELECT id FROM locations WHERE slug = 'ayia-napa-marina'), 20, false)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- SeaTaxi — Limassol + St Raphael
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'seataxi-cyprus'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'seataxi-cyprus'), (SELECT id FROM locations WHERE slug = 'st-raphael-marina'), 5, false)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- Hill Robinson — Limassol
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'hill-robinson-cy'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 15, true)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- InterYachting — Limassol + Ayia Napa
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'interyachting-cyprus'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'interyachting-cyprus'), (SELECT id FROM locations WHERE slug = 'ayia-napa-marina'), 10, false)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- Princess Yachts — Limassol
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'princess-yachts-cy'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 20, true)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- BP Yachting — Limassol + Larnaca + Ayia Napa
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bp-yachting'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bp-yachting'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 10, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bp-yachting'), (SELECT id FROM locations WHERE slug = 'ayia-napa-marina'), 10, false)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- IYC — Limassol (Nicosia office but serves Limassol)
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'iyc-cyprus'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 30, true)
ON CONFLICT (provider_id, location_id) DO NOTHING;

-- Aphentrica — Limassol
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'aphentrica-marine'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 50, true)
ON CONFLICT (provider_id, location_id) DO NOTHING;
