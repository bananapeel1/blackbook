-- =============================================================================
-- BlackBook: Replace Demo Cyprus Providers with Real Researched Providers
-- =============================================================================
-- This script removes all demo/fictional Cyprus marine service providers and
-- replaces them with real, researched companies operating in Cyprus.
--
-- IMPORTANT: Only Cyprus demo providers are deleted. Providers from Greece,
-- Turkey, and Montenegro are left untouched.
--
-- All new providers have:
--   user_id = NULL (no platform account yet)
--   verification_status = 'pending'
--   avg_rating = 0, total_reviews = 0, total_jobs = 0
--   availability = 'available'
-- =============================================================================

-- =============================================================================
-- 1. DELETE EXISTING DEMO CYPRUS PROVIDERS AND RELATED DATA
-- =============================================================================

-- Delete in dependency order: certifications, coverage, services, then providers
DELETE FROM provider_certifications WHERE provider_id IN (
  SELECT id FROM providers WHERE slug IN (
    'medtech-marine', 'cymarine-electrics', 'aquaclear-diving',
    'island-provisions-cy', 'napa-yacht-concierge', 'marina-express-cy',
    'coolsea-marine-ac', 'coolmarine-cyprus', 'cyprus-maritime-agents',
    'seaflow-plumbing', 'powermarine-cyprus'
  )
);

DELETE FROM provider_coverage WHERE provider_id IN (
  SELECT id FROM providers WHERE slug IN (
    'medtech-marine', 'cymarine-electrics', 'aquaclear-diving',
    'island-provisions-cy', 'napa-yacht-concierge', 'marina-express-cy',
    'coolsea-marine-ac', 'coolmarine-cyprus', 'cyprus-maritime-agents',
    'seaflow-plumbing', 'powermarine-cyprus'
  )
);

DELETE FROM provider_services WHERE provider_id IN (
  SELECT id FROM providers WHERE slug IN (
    'medtech-marine', 'cymarine-electrics', 'aquaclear-diving',
    'island-provisions-cy', 'napa-yacht-concierge', 'marina-express-cy',
    'coolsea-marine-ac', 'coolmarine-cyprus', 'cyprus-maritime-agents',
    'seaflow-plumbing', 'powermarine-cyprus'
  )
);

DELETE FROM providers WHERE slug IN (
  'medtech-marine', 'cymarine-electrics', 'aquaclear-diving',
  'island-provisions-cy', 'napa-yacht-concierge', 'marina-express-cy',
  'coolsea-marine-ac', 'coolmarine-cyprus', 'cyprus-maritime-agents',
  'seaflow-plumbing', 'powermarine-cyprus'
);


-- =============================================================================
-- 2. INSERT REAL CYPRUS PROVIDERS
-- =============================================================================

-- 01: Black Marlin Marine Services Ltd
INSERT INTO providers (id, user_id, business_name, slug, description, phone, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Black Marlin Marine Services Ltd', 'black-marlin-marine', 'Authorised Volvo Penta dealer offering engine sales, service and genuine parts. Also supplies Teleflex marine controls, Michigan Propellers, Bennett Trim Tabs and marine paints. Based in Limassol since 1999.', '+357 25 721699', 'blackmarlin-marine.com', '{"English", "Greek"}', 1999, 6, 'pending', 'available', false, 0, 0, 0);

-- 02: K.P. Industrial & Marine Ltd (Yanmar Cyprus)
INSERT INTO providers (id, user_id, business_name, slug, description, phone, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'K.P. Industrial & Marine Ltd', 'kp-yanmar-cyprus', 'Authorised Yanmar marine engine dealer for Cyprus since 1960. Also handles Perkins, Deutz engines and FG Wilson generators. HQ in Nicosia with parts stores in Limassol and Paphos.', '+357 22 586300', 'yanmarcyprus.com', '{"English", "Greek"}', 1960, 15, 'pending', 'available', false, 0, 0, 0);

-- 03: Golden Comet Marine
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Golden Comet Marine', 'golden-comet-marine', 'Established marine mechanical services company in Limassol with a 650sqm workshop. Offers boat sales, servicing and repair. One of the longest-running marine businesses in Cyprus, founded in 1963.', 'info@goldencomet.com', '+357 25 392100', 'goldencomet.com', '{"English", "Greek"}', 1963, 10, 'pending', 'available', false, 0, 0, 0);

-- 04: T.D. Auto & Marine Services Ltd
INSERT INTO providers (id, user_id, business_name, slug, description, phone, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'T.D. Auto & Marine Services Ltd', 'td-marine-services', 'All-make inboard engine repair specialist based in Limassol. Covers electrical appliances, OEM and aftermarket parts sourcing. Experienced with a wide range of marine engine brands.', '+357 25 252414', 'tdmarineservices.com', '{"English", "Greek"}', 2005, 5, 'pending', 'available', false, 0, 0, 0);

-- 05: C&R Motorboat Marine Services
INSERT INTO providers (id, user_id, business_name, slug, description, phone, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'C&R Motorboat Marine Services', 'cr-motorboat', 'Marine engine sales and service for inboard and outboard motors. Also offers vessel refurbishment, antifouling and boat storage. Located in Paralimni/Ayia Napa area serving the east coast.', '+357 23 824466', 'crmotorboat.com', '{"English", "Greek", "Russian"}', 2000, 8, 'pending', 'available', false, 0, 0, 0);

-- 06: Latchi Marine Services
INSERT INTO providers (id, user_id, business_name, slug, description, phone, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Latchi Marine Services', 'latchi-marine-services', 'Full mechanical support for outboard and inboard engines at Latchi Harbour. Operates a boat lift for vessels up to 60ft/25 tons. Services include antifouling, winter storage and 24-hour emergency call-out.', '+357 26 271116', 'latchimarineservices.com', '{"English", "Greek"}', 1990, 6, 'pending', 'available', true, 0, 0, 0);

-- 07: Crystal Marine Cyprus
INSERT INTO providers (id, user_id, business_name, slug, description, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Crystal Marine Cyprus', 'crystal-marine-cy', 'Boat maintenance and repair at Latchi Harbour with a 20-tonne hoist for haul-outs. Also offers mast work, boat storage, PADI diving services and RYA training courses.', 'crystalmarinecyprus.com', '{"English", "Greek"}', 2000, 8, 'pending', 'available', false, 0, 0, 0);

-- 08: Multimarine Shipyards
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Multimarine Shipyards', 'multimarine-shipyards', 'Full dry-docking and ship repair facility at Limassol Port. Services include fabrication, welding, superyacht refit and 24/7 yacht agency. One of the largest marine repair operations in Cyprus.', 'info@multimarine.com.cy', '+357 25 336520', 'multimarine.com.cy', '{"English", "Greek", "Russian"}', 1985, 40, 'pending', 'available', true, 0, 0, 0);

-- 09: LA Marine Electricians
INSERT INTO providers (id, user_id, business_name, slug, description, phone, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'LA Marine Electricians', 'la-marine-electricians', 'Marine electrical installation, repair and modification services for all vessel types. Based in Limassol covering the local marina and surrounding areas.', '+357 99 662871', 'lamarine-electricians.com', '{"English", "Greek"}', 2010, 4, 'pending', 'available', false, 0, 0, 0);

-- 10: Damianou Marine Electronics
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Damianou Marine Electronics', 'damianou-marine', 'Marine electronics supply, installation and repair specialist in Larnaca. Covers navigation, communication and safety systems. Authorised warranty service agent for major brands.', 'damarine@damarine.com.cy', '+357 24 668668', 'damarine.com.cy', '{"English", "Greek"}', 1995, 5, 'pending', 'available', false, 0, 0, 0);

-- 11: Ocean Marine Equipment Ltd
INSERT INTO providers (id, user_id, business_name, slug, description, phone, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Ocean Marine Equipment Ltd', 'ocean-marine-equipment', 'Full chandlery and marine services in Limassol. Offerings include marine AC/refrigeration, generator repair, electronics, fibreglass work and rigging. Distributor for multiple international marine brands.', '+357 25 369731', 'oceanmarine.com.cy', '{"English", "Greek"}', 1990, 8, 'pending', 'available', false, 0, 0, 0);

-- 12: Tuti Mare Yachting Ltd
INSERT INTO providers (id, user_id, business_name, slug, description, phone, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Tuti Mare Yachting Ltd', 'tutimare', 'Chandlery, marine equipment, boat sales, electronics and generators. Based in Limassol near the marina, serving the local yachting community since 1998.', '+357 25 431313', 'tutimare.com.cy', '{"English", "Greek"}', 1998, 5, 'pending', 'available', false, 0, 0, 0);

-- 13: NavTech Supplies Ltd
INSERT INTO providers (id, user_id, business_name, slug, description, phone, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'NavTech Supplies Ltd', 'navtech-supplies', 'Marine spare parts supplier in Limassol covering engine spares, pumps, separators and reconditioned parts. Extensive inventory for fast turnaround on common marine components.', '+357 25 889200', 'navtech-supplies.com', '{"English", "Greek"}', 2000, 10, 'pending', 'available', false, 0, 0, 0);

-- 14: Sails & Canvas Worx (Sailsworx)
INSERT INTO providers (id, user_id, business_name, slug, description, phone, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Sails & Canvas Worx', 'sailsworx', 'Sail repairs, new sails, yacht rigging, marine canvas and boat covers. Operates a 700sqm sail loft in Larnaca. Official SPARCRAFT distributor for Cyprus.', '+357 96 404041', 'sailsworx.com', '{"English", "Greek"}', 2010, 6, 'pending', 'available', false, 0, 0, 0);

-- 15: North Sails Cyprus
INSERT INTO providers (id, user_id, business_name, slug, description, phone, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'North Sails Cyprus', 'north-sails-cy', 'Official North Sails loft in Limassol Old Port. Provides new sail construction, sail repair and ongoing sail service for racing and cruising yachts.', '+357 96 754232', 'northsails.com', '{"English", "Greek"}', 2015, 3, 'pending', 'available', false, 0, 0, 0);

-- 16: BEVALDIA Cyprus
INSERT INTO providers (id, user_id, business_name, slug, description, phone, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'BEVALDIA Cyprus', 'bevaldia-cyprus', 'Underwater hull cleaning, propeller polishing, anode replacement, underwater inspections and ultrasonic thickness measurements. ISO-certified with IACS approval. Serves Limassol, Larnaca and Vasiliko.', '+30 210 9582176', 'bevaldia.com', '{"English", "Greek"}', 2005, 12, 'pending', 'available', true, 0, 0, 0);

-- 17: Yacht Shore Premium Services
INSERT INTO providers (id, user_id, business_name, slug, description, phone, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Yacht Shore Premium Services', 'yacht-shore', 'Full-service yacht concierge at Limassol Marina. Services include port agency, customs clearance, bunkering, berth bookings, VIP transfers, provisioning, events, technical assistance and yacht management.', '+357 25 020655', 'yacht-shore.com', '{"English", "Greek", "Russian", "French"}', 2010, 8, 'pending', 'available', true, 0, 0, 0);

-- 18: BWA Yachting Cyprus
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'BWA Yachting Cyprus', 'bwa-yachting-cy', 'International yacht services company offering fuel bunkering, berth reservations, customs clearance, VIP concierge, provisioning and crew assistance at Limassol Marina.', 'cyprus@bwayachting.com', '+357 96 111551', 'bwayachting.com', '{"English", "Greek", "Russian", "French", "Italian"}', 2015, 5, 'pending', 'available', false, 0, 0, 0);

-- 19: SeaTrip Cyprus
INSERT INTO providers (id, user_id, business_name, slug, description, phone, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'SeaTrip Cyprus', 'seatrip-cy', 'Yacht provisioning, yacht cleaning, hull cleaning, yacht management, charter management, catering and event services. Based at Limassol Marina with island-wide coverage.', '+357 97 444344', 'seatrip.com', '{"English", "Greek", "Russian"}', 2015, 6, 'pending', 'available', false, 0, 0, 0);

-- 20: Prestige VIP Services
INSERT INTO providers (id, user_id, business_name, slug, description, phone, whatsapp, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Prestige VIP Services', 'prestige-vip-cy', 'Luxury car rental, chauffeur and limousine transfers, yacht charters and jet charter coordination. Based in Limassol with island-wide service since 1999.', '+357 25 322055', '+357 97 878004', 'prestigecy.com', '{"English", "Greek", "Russian"}', 1999, 15, 'pending', 'available', false, 0, 0, 0);

-- 21: Acropolis Transport
INSERT INTO providers (id, user_id, business_name, slug, description, phone, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Acropolis Transport', 'acropolis-transport', 'Executive chauffeur transfers, limousine hire, airport transfers and VIP services. Based in Larnaca near the international airport with island-wide coverage.', '+357 24 622000', 'acropolis-transport.com', '{"English", "Greek", "Russian", "German"}', 2000, 20, 'pending', 'available', false, 0, 0, 0);

-- 22: Bunkernet Ltd
INSERT INTO providers (id, user_id, business_name, slug, description, phone, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Bunkernet Ltd', 'bunkernet-cy', 'Fuel bunkering, lubricants and additives for yachts. Based in Limassol with delivery capabilities across southern Cyprus marinas.', '+357 25 828915', '{"English", "Greek"}', 2005, 5, 'pending', 'available', false, 0, 0, 0);

-- 23: Island Oil Limited
INSERT INTO providers (id, user_id, business_name, slug, description, phone, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Island Oil Limited', 'island-oil-cy', 'Marine fuel supply, bunkering and lubricants. Established fuel supplier based in Limassol serving yachts and commercial vessels across Cyprus.', '+357 25 889000', '{"English", "Greek"}', 1995, 20, 'pending', 'available', false, 0, 0, 0);

-- 24: MILUX Luxury Cleaning
INSERT INTO providers (id, user_id, business_name, slug, description, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'MILUX Luxury Cleaning', 'milux-cleaning', 'Premium yacht and villa cleaning service using hypoallergenic eco-products and professional Karcher equipment. NDA available for high-profile clients. Based in Limassol.', 'miluxclean.com', '{"English", "Greek", "Russian"}', 2018, 8, 'pending', 'available', false, 0, 0, 0);

-- 25: Cosmea Gardens
INSERT INTO providers (id, user_id, business_name, slug, description, phone, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Cosmea Gardens', 'cosmea-gardens', 'Flower arrangements, bouquets, gift baskets and wedding/event florals with same-day delivery. Long-established florist in Larnaca with island-wide delivery capabilities.', '+357 24 638777', 'cosmeagardens.com', '{"English", "Greek"}', 1980, 8, 'pending', 'available', false, 0, 0, 0);

-- 26: GKA Photo Cyprus
INSERT INTO providers (id, user_id, business_name, slug, description, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'GKA Photo Cyprus', 'gka-photo-cy', 'Yacht photoshoots, reportage photography, underwater photo and video services. Also offers flying dress rental for unique photo experiences. Based in Ayia Napa/Protaras area.', 'gkaphotocyprus.com', '{"English", "Greek", "Russian"}', 2010, 3, 'pending', 'available', false, 0, 0, 0);

-- 27: Lavar Shipping Company
INSERT INTO providers (id, user_id, business_name, slug, description, phone, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Lavar Shipping Company', 'lavar-shipping', 'Ship and yacht agency, customs brokerage, freight forwarding and warehousing services. One of the most established shipping agents in Limassol, operating since 1970.', '+357 25 258800', 'lavarshipping.com', '{"English", "Greek", "Russian"}', 1970, 15, 'pending', 'available', false, 0, 0, 0);

-- 28: Nautimar Marine Marketing
INSERT INTO providers (id, user_id, business_name, slug, description, phone, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Nautimar Marine Marketing', 'nautimar-marine', 'Yacht sales, bespoke builds, refit management and boat service/repair. Based at Limassol Marina offering comprehensive marine marketing and brokerage services.', '+357 25 051210', 'nautimarmarine.com', '{"English", "Greek", "Russian"}', 1995, 8, 'pending', 'available', false, 0, 0, 0);

-- 29: P.G.M. Sport Marine Ltd
INSERT INTO providers (id, user_id, business_name, slug, description, phone, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'P.G.M. Sport Marine Ltd', 'pgm-sport-marine', 'Official Yamaha Motor distributor for Cyprus. Supplies Yamaha outboard engines, WaveRunners, RIBs and genuine spare parts from their Larnaca base.', '+357 24 252524', 'sportmarine.com', '{"English", "Greek"}', 1995, 8, 'pending', 'available', false, 0, 0, 0);

-- 30: G&N Diesel Services
INSERT INTO providers (id, user_id, business_name, slug, description, phone, website, languages, founded_year, team_size, verification_status, availability, emergency_available, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'G&N Diesel Services', 'gn-diesel', 'Specialist diesel fuel pump and injector repair for marine engines. Uses BOSCH diagnostics equipment. Also handles Delphi, Denso and Zexel injection systems. Based in Limassol.', '+357 25 877707', 'gndiesel.com', '{"English", "Greek"}', 2001, 4, 'pending', 'available', false, 0, 0, 0);


-- =============================================================================
-- 3. PROVIDER SERVICES
-- =============================================================================

-- 01: Black Marlin Marine
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'black-marlin-marine'), (SELECT id FROM service_categories WHERE slug = 'mechanics'), 'Volvo Penta engine sales, service and genuine parts', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'black-marlin-marine'), (SELECT id FROM service_categories WHERE slug = 'spare-parts'), 'Teleflex controls, Michigan Propellers, Bennett Trim Tabs', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'black-marlin-marine'), (SELECT id FROM service_categories WHERE slug = 'painting'), 'Marine paints supply and application', false);

-- 02: K.P. Yanmar Cyprus
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'kp-yanmar-cyprus'), (SELECT id FROM service_categories WHERE slug = 'mechanics'), 'Yanmar marine engine sales, service and parts', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'kp-yanmar-cyprus'), (SELECT id FROM service_categories WHERE slug = 'generator-repair'), 'FG Wilson generator sales and service', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'kp-yanmar-cyprus'), (SELECT id FROM service_categories WHERE slug = 'spare-parts'), 'Yanmar, Perkins and Deutz genuine parts', false);

-- 03: Golden Comet Marine
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'golden-comet-marine'), (SELECT id FROM service_categories WHERE slug = 'mechanics'), 'Marine mechanical services, boat servicing and repair', false);

-- 04: T.D. Marine Services
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'td-marine-services'), (SELECT id FROM service_categories WHERE slug = 'mechanics'), 'All-make inboard engine repair and diagnostics', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'td-marine-services'), (SELECT id FROM service_categories WHERE slug = 'electricians'), 'Marine electrical appliance repair', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'td-marine-services'), (SELECT id FROM service_categories WHERE slug = 'spare-parts'), 'OEM and aftermarket marine parts sourcing', false);

-- 05: C&R Motorboat
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cr-motorboat'), (SELECT id FROM service_categories WHERE slug = 'mechanics'), 'Marine engine sales and service for inboard and outboard', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cr-motorboat'), (SELECT id FROM service_categories WHERE slug = 'painting'), 'Vessel refurbishment and antifouling', false);

-- 06: Latchi Marine Services
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'latchi-marine-services'), (SELECT id FROM service_categories WHERE slug = 'mechanics'), 'Full mechanical support for outboard and inboard engines', true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'latchi-marine-services'), (SELECT id FROM service_categories WHERE slug = 'painting'), 'Antifouling application and hull preparation', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'latchi-marine-services'), (SELECT id FROM service_categories WHERE slug = 'marina-assistance'), 'Boat lift (60ft/25 tons), winter storage and 24hr call-out', true);

-- 07: Crystal Marine Cyprus
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'crystal-marine-cy'), (SELECT id FROM service_categories WHERE slug = 'mechanics'), 'Boat maintenance and repair with 20-tonne hoist', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'crystal-marine-cy'), (SELECT id FROM service_categories WHERE slug = 'rigging'), 'Mast work and rigging services', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'crystal-marine-cy'), (SELECT id FROM service_categories WHERE slug = 'painting'), 'Antifouling and hull coatings', false);

-- 08: Multimarine Shipyards
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'multimarine-shipyards'), (SELECT id FROM service_categories WHERE slug = 'mechanics'), 'Dry-docking, ship repairs and superyacht refit', true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'multimarine-shipyards'), (SELECT id FROM service_categories WHERE slug = 'painting'), 'Hull painting and fabrication/welding', true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'multimarine-shipyards'), (SELECT id FROM service_categories WHERE slug = 'customs-agents'), '24/7 yacht agency services', true);

-- 09: LA Marine Electricians
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'la-marine-electricians'), (SELECT id FROM service_categories WHERE slug = 'electricians'), 'Marine electrical installation, repair and modification', false);

-- 10: Damianou Marine Electronics
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'damianou-marine'), (SELECT id FROM service_categories WHERE slug = 'electricians'), 'Marine electronics supply, install and repair for navigation, communication and safety systems', false);

-- 11: Ocean Marine Equipment
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ocean-marine-equipment'), (SELECT id FROM service_categories WHERE slug = 'chandlery'), 'Full chandlery and marine hardware supply', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ocean-marine-equipment'), (SELECT id FROM service_categories WHERE slug = 'ac-repair'), 'Marine AC installation and repair', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ocean-marine-equipment'), (SELECT id FROM service_categories WHERE slug = 'refrigeration'), 'Marine refrigeration systems', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ocean-marine-equipment'), (SELECT id FROM service_categories WHERE slug = 'generator-repair'), 'Generator repair and servicing', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ocean-marine-equipment'), (SELECT id FROM service_categories WHERE slug = 'electricians'), 'Electronics supply and installation', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ocean-marine-equipment'), (SELECT id FROM service_categories WHERE slug = 'rigging'), 'Rigging supplies and services', false);

-- 12: Tuti Mare Yachting
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'tutimare'), (SELECT id FROM service_categories WHERE slug = 'chandlery'), 'Chandlery and marine equipment supply', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'tutimare'), (SELECT id FROM service_categories WHERE slug = 'electricians'), 'Marine electronics sales', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'tutimare'), (SELECT id FROM service_categories WHERE slug = 'generator-repair'), 'Generator supply and service', false);

-- 13: NavTech Supplies
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'navtech-supplies'), (SELECT id FROM service_categories WHERE slug = 'spare-parts'), 'Marine spare parts, engine spares, pumps and separators', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'navtech-supplies'), (SELECT id FROM service_categories WHERE slug = 'chandlery'), 'Marine supplies and reconditioned parts', false);

-- 14: Sailsworx
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'sailsworx'), (SELECT id FROM service_categories WHERE slug = 'sail-repair'), 'Sail repairs, new sails and marine canvas work', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'sailsworx'), (SELECT id FROM service_categories WHERE slug = 'rigging'), 'Yacht rigging services and SPARCRAFT products', false);

-- 15: North Sails Cyprus
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'north-sails-cy'), (SELECT id FROM service_categories WHERE slug = 'sail-repair'), 'New sail construction, sail repair and sail service', false);

-- 16: BEVALDIA Cyprus
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bevaldia-cyprus'), (SELECT id FROM service_categories WHERE slug = 'hull-cleaning'), 'Underwater hull cleaning and propeller polishing', true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bevaldia-cyprus'), (SELECT id FROM service_categories WHERE slug = 'divers'), 'Underwater inspections, anode replacement and ultrasonic measurements', true);

-- 17: Yacht Shore
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'yacht-shore'), (SELECT id FROM service_categories WHERE slug = 'concierge'), 'Full yacht concierge, VIP transfers, provisioning and events', true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'yacht-shore'), (SELECT id FROM service_categories WHERE slug = 'customs-agents'), 'Port agent and customs clearance services', true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'yacht-shore'), (SELECT id FROM service_categories WHERE slug = 'fuel-delivery'), 'Bunkering coordination and fuel supply', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'yacht-shore'), (SELECT id FROM service_categories WHERE slug = 'marina-assistance'), 'Berth bookings and marina liaison', true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'yacht-shore'), (SELECT id FROM service_categories WHERE slug = 'provisioning'), 'Yacht provisioning services', false);

-- 18: BWA Yachting
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bwa-yachting-cy'), (SELECT id FROM service_categories WHERE slug = 'concierge'), 'VIP concierge, provisioning and crew assistance', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bwa-yachting-cy'), (SELECT id FROM service_categories WHERE slug = 'customs-agents'), 'Customs clearance and port formalities', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bwa-yachting-cy'), (SELECT id FROM service_categories WHERE slug = 'fuel-delivery'), 'Fuel bunkering coordination', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bwa-yachting-cy'), (SELECT id FROM service_categories WHERE slug = 'marina-assistance'), 'Berth reservations and marina services', false);

-- 19: SeaTrip Cyprus
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'seatrip-cy'), (SELECT id FROM service_categories WHERE slug = 'provisioning'), 'Yacht provisioning and catering', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'seatrip-cy'), (SELECT id FROM service_categories WHERE slug = 'cleaners'), 'Yacht cleaning and detailing', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'seatrip-cy'), (SELECT id FROM service_categories WHERE slug = 'hull-cleaning'), 'Hull cleaning services', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'seatrip-cy'), (SELECT id FROM service_categories WHERE slug = 'concierge'), 'Yacht management and charter management', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'seatrip-cy'), (SELECT id FROM service_categories WHERE slug = 'event-setup'), 'Catering and event services', false);

-- 20: Prestige VIP Services
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'prestige-vip-cy'), (SELECT id FROM service_categories WHERE slug = 'vip-transport'), 'Luxury car rental and chauffeur/limousine transfers', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'prestige-vip-cy'), (SELECT id FROM service_categories WHERE slug = 'taxi-transfers'), 'Airport and port transfers', false);

-- 21: Acropolis Transport
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'acropolis-transport'), (SELECT id FROM service_categories WHERE slug = 'vip-transport'), 'Executive chauffeur and limousine services', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'acropolis-transport'), (SELECT id FROM service_categories WHERE slug = 'taxi-transfers'), 'Airport transfers and VIP transport', false);

-- 22: Bunkernet Ltd
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bunkernet-cy'), (SELECT id FROM service_categories WHERE slug = 'fuel-delivery'), 'Fuel bunkering, lubricants and additives for yachts', false);

-- 23: Island Oil Limited
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'island-oil-cy'), (SELECT id FROM service_categories WHERE slug = 'fuel-delivery'), 'Marine fuel supply, bunkering and lubricants', false);

-- 24: MILUX Cleaning
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'milux-cleaning'), (SELECT id FROM service_categories WHERE slug = 'cleaners'), 'Premium yacht cleaning with hypoallergenic eco-products', false);

-- 25: Cosmea Gardens
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cosmea-gardens'), (SELECT id FROM service_categories WHERE slug = 'flowers'), 'Flower arrangements, bouquets, gift baskets and event florals', false);

-- 26: GKA Photo Cyprus
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'gka-photo-cy'), (SELECT id FROM service_categories WHERE slug = 'photographers'), 'Yacht photoshoots, reportage, underwater photo/video', false);

-- 27: Lavar Shipping
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'lavar-shipping'), (SELECT id FROM service_categories WHERE slug = 'customs-agents'), 'Ship/yacht agency, customs brokerage and freight forwarding', false);

-- 28: Nautimar Marine
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'nautimar-marine'), (SELECT id FROM service_categories WHERE slug = 'mechanics'), 'Boat service, repair and refit management', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'nautimar-marine'), (SELECT id FROM service_categories WHERE slug = 'concierge'), 'Yacht sales and bespoke build coordination', false);

-- 29: P.G.M. Sport Marine
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'pgm-sport-marine'), (SELECT id FROM service_categories WHERE slug = 'mechanics'), 'Yamaha outboard engine sales, service and parts', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'pgm-sport-marine'), (SELECT id FROM service_categories WHERE slug = 'spare-parts'), 'Yamaha genuine spare parts and accessories', false);

-- 30: G&N Diesel Services
INSERT INTO provider_services (id, provider_id, category_id, description, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'gn-diesel'), (SELECT id FROM service_categories WHERE slug = 'mechanics'), 'Diesel fuel pump and injector repair with BOSCH diagnostics', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'gn-diesel'), (SELECT id FROM service_categories WHERE slug = 'spare-parts'), 'Diesel injection system parts (BOSCH, Delphi, Denso, Zexel)', false);


-- =============================================================================
-- 4. PROVIDER COVERAGE
-- =============================================================================

-- 01: Black Marlin Marine
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'black-marlin-marine'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 50, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'black-marlin-marine'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 50, false);

-- 02: K.P. Yanmar Cyprus
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'kp-yanmar-cyprus'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 80, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'kp-yanmar-cyprus'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 80, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'kp-yanmar-cyprus'), (SELECT id FROM locations WHERE slug = 'paphos-harbour'), 80, false);

-- 03: Golden Comet Marine
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'golden-comet-marine'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 30, true);

-- 04: T.D. Marine Services
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'td-marine-services'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 40, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'td-marine-services'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 40, false);

-- 05: C&R Motorboat
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cr-motorboat'), (SELECT id FROM locations WHERE slug = 'ayia-napa-marina'), 20, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cr-motorboat'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 60, false);

-- 06: Latchi Marine Services
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'latchi-marine-services'), (SELECT id FROM locations WHERE slug = 'latchi-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'latchi-marine-services'), (SELECT id FROM locations WHERE slug = 'paphos-harbour'), 30, false);

-- 07: Crystal Marine Cyprus
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'crystal-marine-cy'), (SELECT id FROM locations WHERE slug = 'latchi-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'crystal-marine-cy'), (SELECT id FROM locations WHERE slug = 'paphos-harbour'), 40, false);

-- 08: Multimarine Shipyards
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'multimarine-shipyards'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'multimarine-shipyards'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 50, false);

-- 09: LA Marine Electricians
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'la-marine-electricians'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 20, true);

-- 10: Damianou Marine Electronics
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'damianou-marine'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'damianou-marine'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 50, false);

-- 11: Ocean Marine Equipment
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ocean-marine-equipment'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ocean-marine-equipment'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 50, false);

-- 12: Tuti Mare Yachting
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'tutimare'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 20, true);

-- 13: NavTech Supplies
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'navtech-supplies'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'navtech-supplies'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 50, false);

-- 14: Sailsworx
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'sailsworx'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'sailsworx'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 50, false);

-- 15: North Sails Cyprus
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'north-sails-cy'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 10, true);

-- 16: BEVALDIA Cyprus
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bevaldia-cyprus'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 30, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bevaldia-cyprus'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 50, false);

-- 17: Yacht Shore
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'yacht-shore'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 5, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'yacht-shore'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 50, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'yacht-shore'), (SELECT id FROM locations WHERE slug = 'paphos-harbour'), 70, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'yacht-shore'), (SELECT id FROM locations WHERE slug = 'latchi-marina'), 80, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'yacht-shore'), (SELECT id FROM locations WHERE slug = 'ayia-napa-marina'), 80, false);

-- 18: BWA Yachting
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bwa-yachting-cy'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 5, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bwa-yachting-cy'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 50, false);

-- 19: SeaTrip Cyprus
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'seatrip-cy'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'seatrip-cy'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 40, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'seatrip-cy'), (SELECT id FROM locations WHERE slug = 'paphos-harbour'), 70, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'seatrip-cy'), (SELECT id FROM locations WHERE slug = 'latchi-marina'), 80, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'seatrip-cy'), (SELECT id FROM locations WHERE slug = 'ayia-napa-marina'), 80, false);

-- 20: Prestige VIP
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'prestige-vip-cy'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'prestige-vip-cy'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 40, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'prestige-vip-cy'), (SELECT id FROM locations WHERE slug = 'paphos-harbour'), 80, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'prestige-vip-cy'), (SELECT id FROM locations WHERE slug = 'ayia-napa-marina'), 60, false);

-- 21: Acropolis Transport
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'acropolis-transport'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'acropolis-transport'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 40, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'acropolis-transport'), (SELECT id FROM locations WHERE slug = 'paphos-harbour'), 80, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'acropolis-transport'), (SELECT id FROM locations WHERE slug = 'ayia-napa-marina'), 40, false);

-- 22: Bunkernet
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bunkernet-cy'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bunkernet-cy'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 50, false);

-- 23: Island Oil
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'island-oil-cy'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'island-oil-cy'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 50, false);

-- 24: MILUX Cleaning
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'milux-cleaning'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'milux-cleaning'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 40, false);

-- 25: Cosmea Gardens
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cosmea-gardens'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cosmea-gardens'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 40, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cosmea-gardens'), (SELECT id FROM locations WHERE slug = 'paphos-harbour'), 80, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cosmea-gardens'), (SELECT id FROM locations WHERE slug = 'ayia-napa-marina'), 30, false);

-- 26: GKA Photo Cyprus
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'gka-photo-cy'), (SELECT id FROM locations WHERE slug = 'ayia-napa-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'gka-photo-cy'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 40, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'gka-photo-cy'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 70, false);

-- 27: Lavar Shipping
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'lavar-shipping'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 5, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'lavar-shipping'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 50, false);

-- 28: Nautimar Marine
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'nautimar-marine'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 5, true);

-- 29: P.G.M. Sport Marine
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'pgm-sport-marine'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'pgm-sport-marine'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 40, false);

-- 30: G&N Diesel
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'gn-diesel'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'gn-diesel'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 50, false);


-- =============================================================================
-- 5. PROVIDER CERTIFICATIONS
-- =============================================================================

-- 01: Black Marlin Marine
INSERT INTO provider_certifications (id, provider_id, name, issuer) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'black-marlin-marine'), 'Volvo Penta Authorized Dealer', 'Volvo Penta'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'black-marlin-marine'), 'Teleflex Authorized Dealer', 'Teleflex');

-- 02: K.P. Yanmar Cyprus
INSERT INTO provider_certifications (id, provider_id, name, issuer) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'kp-yanmar-cyprus'), 'Authorized Yanmar Dealer', 'Yanmar'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'kp-yanmar-cyprus'), 'Perkins Authorized Dealer', 'Perkins Engines'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'kp-yanmar-cyprus'), 'Deutz Authorized Dealer', 'Deutz');

-- 05: C&R Motorboat
INSERT INTO provider_certifications (id, provider_id, name, issuer) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cr-motorboat'), 'Cummins Authorized Service', 'Cummins'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cr-motorboat'), 'Mercury Dealer', 'Mercury Marine'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cr-motorboat'), 'FPT Marine Engines Dealer', 'FPT Industrial');

-- 06: Latchi Marine Services
INSERT INTO provider_certifications (id, provider_id, name, issuer) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'latchi-marine-services'), 'Suzuki Authorized Dealer', 'Suzuki Marine'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'latchi-marine-services'), 'Mercury Service Agent', 'Mercury Marine');

-- 07: Crystal Marine Cyprus
INSERT INTO provider_certifications (id, provider_id, name, issuer) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'crystal-marine-cy'), 'Volvo Penta Dealer', 'Volvo Penta'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'crystal-marine-cy'), 'International Yacht Paints Applicator', 'International/AkzoNobel'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'crystal-marine-cy'), 'Raymarine Partner', 'Raymarine');

-- 10: Damianou Marine Electronics
INSERT INTO provider_certifications (id, provider_id, name, issuer) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'damianou-marine'), 'Raymarine Warranty Service Agent', 'Raymarine'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'damianou-marine'), 'Echopilot Distributor', 'Echopilot'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'damianou-marine'), 'Veratron Distributor', 'Veratron');

-- 11: Ocean Marine Equipment
INSERT INTO provider_certifications (id, provider_id, name, issuer) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ocean-marine-equipment'), 'Climma AC Distributor', 'Climma'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ocean-marine-equipment'), 'Harken Distributor', 'Harken'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ocean-marine-equipment'), 'Mastervolt Distributor', 'Mastervolt');

-- 12: Tuti Mare
INSERT INTO provider_certifications (id, provider_id, name, issuer) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'tutimare'), 'Dometic Authorized Dealer', 'Dometic');

-- 14: Sailsworx
INSERT INTO provider_certifications (id, provider_id, name, issuer) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'sailsworx'), 'SPARCRAFT Official Distributor', 'SPARCRAFT');

-- 15: North Sails Cyprus
INSERT INTO provider_certifications (id, provider_id, name, issuer) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'north-sails-cy'), 'North Sails Official Loft', 'North Sails');

-- 16: BEVALDIA Cyprus
INSERT INTO provider_certifications (id, provider_id, name, issuer) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bevaldia-cyprus'), 'ISO 9001:2015 Quality Management', 'ISO'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bevaldia-cyprus'), 'ISO 14001:2015 Environmental Management', 'ISO'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bevaldia-cyprus'), 'ISO 45001:2018 Occupational Health & Safety', 'ISO'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bevaldia-cyprus'), 'IACS Approved Service Provider', 'International Association of Classification Societies');

-- 19: SeaTrip Cyprus
INSERT INTO provider_certifications (id, provider_id, name, issuer) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'seatrip-cy'), 'ISO 9001 Certified', 'ISO');

-- 29: P.G.M. Sport Marine
INSERT INTO provider_certifications (id, provider_id, name, issuer) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'pgm-sport-marine'), 'Yamaha Motor Official Distributor', 'Yamaha Motor');

-- 30: G&N Diesel
INSERT INTO provider_certifications (id, provider_id, name, issuer) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'gn-diesel'), 'BOSCH Approved Service Centre', 'BOSCH'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'gn-diesel'), 'Delphi Authorized', 'Delphi Technologies'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'gn-diesel'), 'Denso Authorized', 'Denso'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'gn-diesel'), 'Zexel Authorized', 'Zexel');
