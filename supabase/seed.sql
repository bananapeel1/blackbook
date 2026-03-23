-- =============================================================================
-- BlackBook Marine Services Marketplace - Seed Data
-- Eastern Mediterranean Coverage
-- =============================================================================

-- =============================================================================
-- 1. SERVICE CATEGORIES
-- =============================================================================

-- ---------------------------------------------------------------------------
-- SERVICE CATEGORIES - Practical
-- ---------------------------------------------------------------------------
INSERT INTO service_categories (id, name, slug, icon, description, parent_id, sort_order, segment) VALUES
  (gen_random_uuid(), 'Marine Mechanics', 'mechanics', 'wrench', 'Engine diagnostics, repair and maintenance for inboard and outboard motors', NULL, 1, 'practical'),
  (gen_random_uuid(), 'Marine Electricians', 'electricians', 'zap', 'Electrical systems installation, troubleshooting and repair', NULL, 2, 'practical'),
  (gen_random_uuid(), 'Marine Plumbing', 'plumbing', 'droplets', 'Plumbing systems, heads, pumps, tanks and freshwater systems', NULL, 3, 'practical'),
  (gen_random_uuid(), 'Rigging Services', 'rigging', 'anchor', 'Standing and running rigging inspection, repair and replacement', NULL, 4, 'practical'),
  (gen_random_uuid(), 'Sail Repair & Making', 'sail-repair', 'wind', 'Sail repairs, modifications, UV cover replacement and new sail fabrication', NULL, 5, 'practical'),
  (gen_random_uuid(), 'Hull Cleaning', 'hull-cleaning', 'paintbrush', 'Underwater hull cleaning, antifouling and polishing services', NULL, 6, 'practical'),
  (gen_random_uuid(), 'Commercial Divers', 'divers', 'glasses', 'Underwater inspection, hull survey, propeller work and salvage operations', NULL, 7, 'practical'),
  (gen_random_uuid(), 'Fuel Delivery', 'fuel-delivery', 'fuel', 'Diesel and petrol delivery direct to your berth or anchorage', NULL, 8, 'practical'),
  (gen_random_uuid(), 'Spare Parts & Supply', 'spare-parts', 'package', 'Marine spare parts sourcing, procurement and express delivery', NULL, 9, 'practical'),
  (gen_random_uuid(), 'Chandlery', 'chandlery', 'shopping-bag', 'Marine hardware, deck gear, safety equipment and consumables', NULL, 10, 'practical'),
  (gen_random_uuid(), 'Marine Refrigeration', 'refrigeration', 'thermometer', 'Refrigeration and freezer system installation, repair and regas', NULL, 11, 'practical'),
  (gen_random_uuid(), 'Generator Services', 'generator-repair', 'battery', 'Generator installation, service, repair and load testing', NULL, 12, 'practical'),
  (gen_random_uuid(), 'Air Conditioning', 'ac-repair', 'snowflake', 'Marine AC systems installation, maintenance and repair', NULL, 13, 'practical'),
  (gen_random_uuid(), 'Watermaker Services', 'watermakers', 'droplet', 'Watermaker installation, membrane replacement and servicing', NULL, 14, 'practical'),
  (gen_random_uuid(), 'Marine Painting', 'painting', 'palette', 'Antifouling, topside painting, gelcoat repair and varnishing', NULL, 15, 'practical');

-- ---------------------------------------------------------------------------
-- SERVICE CATEGORIES - Shore Services
-- ---------------------------------------------------------------------------
INSERT INTO service_categories (id, name, slug, icon, description, parent_id, sort_order, segment) VALUES
  (gen_random_uuid(), 'Taxi & Transfers', 'taxi-transfers', 'car', 'Airport transfers, port-to-port transport and local taxi services', NULL, 20, 'shore'),
  (gen_random_uuid(), 'Provisioning', 'provisioning', 'shopping-cart', 'Full yacht provisioning including fresh produce, dry goods and beverages', NULL, 21, 'shore'),
  (gen_random_uuid(), 'Laundry Services', 'laundry', 'shirt', 'Professional laundry, dry cleaning and linen service for yachts', NULL, 22, 'shore'),
  (gen_random_uuid(), 'Gas Bottle Refill', 'gas-refill', 'flame', 'LPG and propane gas bottle refill, exchange and delivery', NULL, 23, 'shore'),
  (gen_random_uuid(), 'Waste Disposal', 'waste-disposal', 'trash-2', 'Bilge pump-out, waste oil collection and general waste removal', NULL, 24, 'shore'),
  (gen_random_uuid(), 'Yacht Cleaning', 'cleaners', 'sparkles', 'Interior and exterior yacht detailing, deep cleaning and regular maintenance', NULL, 25, 'shore'),
  (gen_random_uuid(), 'Customs & Port Agents', 'customs-agents', 'file-text', 'Port clearance, customs formalities and immigration assistance', NULL, 26, 'shore'),
  (gen_random_uuid(), 'Marina Assistance', 'marina-assistance', 'life-buoy', 'Berth booking, line handling and marina liaison services', NULL, 27, 'shore');

-- ---------------------------------------------------------------------------
-- SERVICE CATEGORIES - Premium
-- ---------------------------------------------------------------------------
INSERT INTO service_categories (id, name, slug, icon, description, parent_id, sort_order, segment) VALUES
  (gen_random_uuid(), 'Private Chef', 'private-chef', 'chef-hat', 'Professional chefs for onboard dining, special occasions and charter catering', NULL, 30, 'premium'),
  (gen_random_uuid(), 'Event Setup', 'event-setup', 'party-popper', 'Onboard event planning, setup and coordination for celebrations', NULL, 31, 'premium'),
  (gen_random_uuid(), 'DJ & Live Music', 'dj-music', 'music', 'Professional DJs, live bands and entertainment for yacht events', NULL, 32, 'premium'),
  (gen_random_uuid(), 'Event Decorators', 'decorators', 'sparkle', 'Themed decorations, table styling and event design for yachts', NULL, 33, 'premium'),
  (gen_random_uuid(), 'Floral Services', 'flowers', 'flower', 'Fresh flower arrangements, bouquets and floral styling for yachts', NULL, 34, 'premium'),
  (gen_random_uuid(), 'Photography & Video', 'photographers', 'camera', 'Professional yacht photography, drone footage and event videography', NULL, 35, 'premium'),
  (gen_random_uuid(), 'Restaurant Bookings', 'restaurant-bookings', 'utensils', 'Priority reservations at top waterfront restaurants and exclusive venues', NULL, 36, 'premium'),
  (gen_random_uuid(), 'Security Services', 'security', 'shield', 'Private security personnel, CCTV monitoring and vessel watch services', NULL, 37, 'premium'),
  (gen_random_uuid(), 'Wellness & Spa', 'wellness-spa', 'heart', 'Onboard massage, yoga instruction, personal training and spa treatments', NULL, 38, 'premium'),
  (gen_random_uuid(), 'VIP Transport', 'vip-transport', 'crown', 'Luxury car service, helicopter transfers and private jet coordination', NULL, 39, 'premium'),
  (gen_random_uuid(), 'Concierge Services', 'concierge', 'star', 'Full concierge including tours, excursions, tickets and lifestyle management', NULL, 40, 'premium');

-- =============================================================================
-- 2. LOCATIONS
-- =============================================================================

-- ---------------------------------------------------------------------------
-- LOCATIONS - Cyprus
-- ---------------------------------------------------------------------------
INSERT INTO locations (id, name, slug, country, region, latitude, longitude, type, description, amenities) VALUES
  (gen_random_uuid(), 'Limassol Marina', 'limassol-marina', 'Cyprus', 'Limassol', 34.6686, 33.0413, 'marina', 'Modern full-service marina in the heart of Limassol with 650 berths up to 110m. Luxury retail village, restaurants and direct city access.', '{"fuel", "water", "electricity", "wifi", "showers", "laundry", "restaurant", "chandlery", "boatyard", "security"}'),
  (gen_random_uuid(), 'Larnaca Marina', 'larnaca-marina', 'Cyprus', 'Larnaca', 34.9167, 33.6333, 'marina', 'Well-established marina with 450 berths near the international airport. Popular winter storage destination with competitive rates.', '{"fuel", "water", "electricity", "wifi", "showers", "laundry", "boatyard", "travel-lift", "chandlery"}'),
  (gen_random_uuid(), 'Paphos Harbour', 'paphos-harbour', 'Cyprus', 'Paphos', 34.7537, 32.4080, 'port', 'Historic harbour beneath Paphos Castle with limited yacht berths. Picturesque setting with waterfront restaurants and UNESCO heritage sites nearby.', '{"water", "electricity", "restaurant", "fuel"}'),
  (gen_random_uuid(), 'Latchi Marina', 'latchi-marina', 'Cyprus', 'Polis Chrysochous', 35.0425, 32.3894, 'marina', 'Small scenic marina on the Akamas Peninsula. Popular stopover for boats cruising the west coast of Cyprus.', '{"water", "electricity", "fuel", "restaurant", "showers"}'),
  (gen_random_uuid(), 'Ayia Napa Marina', 'ayia-napa-marina', 'Cyprus', 'Famagusta', 34.9830, 33.9560, 'marina', 'Modern luxury marina with 600 berths catering to superyachts up to 80m. Premium dining, retail and residential village.', '{"fuel", "water", "electricity", "wifi", "showers", "laundry", "restaurant", "concierge", "helipad", "security"}');

-- ---------------------------------------------------------------------------
-- LOCATIONS - Greece
-- ---------------------------------------------------------------------------
INSERT INTO locations (id, name, slug, country, region, latitude, longitude, type, description, amenities) VALUES
  (gen_random_uuid(), 'Rhodes Marina', 'rhodes-marina', 'Greece', 'Dodecanese', 36.4440, 28.2260, 'marina', 'Main marina on Rhodes island at Mandraki Harbour. Sheltered location within walking distance of the medieval Old Town.', '{"fuel", "water", "electricity", "showers", "laundry", "chandlery", "restaurant", "wifi"}'),
  (gen_random_uuid(), 'Kos Marina', 'kos-marina', 'Greece', 'Dodecanese', 36.8931, 27.0900, 'marina', 'Centrally located marina on Kos island with 250 berths. Good facilities and easy access to town amenities.', '{"fuel", "water", "electricity", "showers", "wifi", "restaurant"}'),
  (gen_random_uuid(), 'Corfu Marina (Gouvia)', 'corfu-marina', 'Greece', 'Ionian Islands', 39.6534, 19.8511, 'marina', 'Largest marina in the Ionian with 1,237 berths at Gouvia Bay. Full boatyard facilities and well-stocked chandlery.', '{"fuel", "water", "electricity", "wifi", "showers", "laundry", "restaurant", "chandlery", "boatyard", "travel-lift"}'),
  (gen_random_uuid(), 'Lefkada Marina', 'lefkada-marina', 'Greece', 'Ionian Islands', 38.8336, 20.7069, 'marina', 'Popular charter base marina on Lefkada with 620 berths. Gateway to the southern Ionian islands.', '{"fuel", "water", "electricity", "wifi", "showers", "laundry", "chandlery", "boatyard"}'),
  (gen_random_uuid(), 'Piraeus (Zea Marina)', 'piraeus-zea', 'Greece', 'Attica', 37.9375, 23.6514, 'marina', 'Premier superyacht marina near Athens with berths for vessels up to 80m. Full service hub for the Aegean.', '{"fuel", "water", "electricity", "wifi", "showers", "laundry", "restaurant", "chandlery", "boatyard", "security", "concierge"}'),
  (gen_random_uuid(), 'Mykonos New Port', 'mykonos-port', 'Greece', 'Cyclades', 37.4467, 25.3250, 'port', 'Main port of Mykonos with limited berths for yachts. Extremely busy in high season, advance booking essential.', '{"fuel", "water", "electricity", "restaurant"}'),
  (gen_random_uuid(), 'Santorini (Vlychada)', 'santorini-vlychada', 'Greece', 'Cyclades', 36.3530, 25.4300, 'port', 'Small marina on the south coast of Santorini. Sheltered from the caldera winds with basic facilities.', '{"water", "electricity", "fuel", "restaurant"}'),
  (gen_random_uuid(), 'Heraklion Marina', 'heraklion-marina', 'Greece', 'Crete', 35.3425, 25.1348, 'marina', 'Central Crete marina near Venetian harbour. Convenient base for exploring the largest Greek island.', '{"fuel", "water", "electricity", "wifi", "showers", "chandlery", "restaurant", "boatyard"}'),
  (gen_random_uuid(), 'Skiathos Marina', 'skiathos-marina', 'Greece', 'Sporades', 39.1608, 23.4905, 'marina', 'Charming marina on Skiathos island in the northern Sporades. Popular summer destination with good shelter.', '{"fuel", "water", "electricity", "showers", "restaurant", "wifi"}'),
  (gen_random_uuid(), 'Syros (Ermoupoli)', 'syros-ermoupoli', 'Greece', 'Cyclades', 37.4420, 24.9420, 'port', 'Capital of the Cyclades with a working shipyard and yacht repair facilities. Less touristy alternative to Mykonos.', '{"fuel", "water", "electricity", "showers", "boatyard", "chandlery"}'),
  (gen_random_uuid(), 'Zakynthos Marina', 'zakynthos-marina', 'Greece', 'Ionian Islands', 37.7870, 20.8984, 'port', 'Main port on Zakynthos island with seasonal yacht berths. Gateway to the famous Navagio Beach.', '{"fuel", "water", "electricity", "restaurant", "showers"}'),
  (gen_random_uuid(), 'Athens (Alimos Marina)', 'alimos-marina', 'Greece', 'Attica', 37.9100, 23.7110, 'marina', 'Large marina south of Athens centre with over 1,000 berths. Major charter base and winter storage.', '{"fuel", "water", "electricity", "wifi", "showers", "laundry", "restaurant", "chandlery", "boatyard", "travel-lift"}'),
  (gen_random_uuid(), 'Kalamata Marina', 'kalamata-marina', 'Greece', 'Peloponnese', 37.0200, 22.1140, 'marina', 'Modern marina in the Messinian Gulf with 240 berths. Excellent provisions and gateway to the Mani peninsula.', '{"fuel", "water", "electricity", "wifi", "showers", "restaurant", "chandlery"}');

-- ---------------------------------------------------------------------------
-- LOCATIONS - Turkey
-- ---------------------------------------------------------------------------
INSERT INTO locations (id, name, slug, country, region, latitude, longitude, type, description, amenities) VALUES
  (gen_random_uuid(), 'Bodrum Marina (Milta)', 'bodrum-marina', 'Turkey', 'Mugla', 37.0347, 27.4294, 'marina', 'Full-service marina in Bodrum town centre overlooking the Castle of St Peter. Hub for the Turkish Riviera charter fleet.', '{"fuel", "water", "electricity", "wifi", "showers", "laundry", "restaurant", "chandlery", "boatyard", "travel-lift", "security"}'),
  (gen_random_uuid(), 'Marmaris Yacht Marina', 'marmaris-marina', 'Turkey', 'Mugla', 36.8497, 28.2735, 'marina', 'Award-winning Blue Flag marina with 750 berths. Sheltered bay location with extensive boatyard and refit facilities.', '{"fuel", "water", "electricity", "wifi", "showers", "laundry", "restaurant", "chandlery", "boatyard", "travel-lift", "security"}'),
  (gen_random_uuid(), 'Gocek (D-Marin)', 'gocek-marina', 'Turkey', 'Mugla', 36.7558, 28.9425, 'marina', 'Exclusive marina surrounded by pine-clad mountains. Starting point for the famous Twelve Islands cruise.', '{"fuel", "water", "electricity", "wifi", "showers", "laundry", "restaurant", "chandlery", "boatyard", "security", "concierge"}'),
  (gen_random_uuid(), 'Fethiye Ece Marina', 'fethiye-marina', 'Turkey', 'Mugla', 36.6598, 29.1033, 'marina', 'Well-protected marina in Fethiye bay with 460 berths. Affordable base with excellent provisioning options.', '{"fuel", "water", "electricity", "wifi", "showers", "laundry", "chandlery", "boatyard", "restaurant"}'),
  (gen_random_uuid(), 'Antalya Marina', 'antalya-marina', 'Turkey', 'Antalya', 36.8841, 30.6900, 'marina', 'Modern marina adjacent to the historic Kaleici old town. Sheltered from prevailing winds with full services.', '{"fuel", "water", "electricity", "wifi", "showers", "laundry", "restaurant", "chandlery", "security"}'),
  (gen_random_uuid(), 'Kas Harbour', 'kas-harbour', 'Turkey', 'Antalya', 36.1990, 29.6388, 'port', 'Picturesque small harbour in the charming town of Kas. Limited berths but popular anchorage with good holding.', '{"water", "electricity", "fuel", "restaurant", "showers"}');

-- ---------------------------------------------------------------------------
-- LOCATIONS - Montenegro
-- ---------------------------------------------------------------------------
INSERT INTO locations (id, name, slug, country, region, latitude, longitude, type, description, amenities) VALUES
  (gen_random_uuid(), 'Porto Montenegro (Tivat)', 'porto-montenegro', 'Montenegro', 'Bay of Kotor', 42.4310, 18.6894, 'marina', 'World-class superyacht marina with 450 berths up to 250m. Luxury village with five-star hotel, pool, restaurants and full refit yard.', '{"fuel", "water", "electricity", "wifi", "showers", "laundry", "restaurant", "chandlery", "boatyard", "travel-lift", "security", "concierge", "helipad"}'),
  (gen_random_uuid(), 'Kotor Marina', 'kotor-marina', 'Montenegro', 'Bay of Kotor', 42.4247, 18.7712, 'port', 'UNESCO-listed town at the end of the Bay of Kotor. Limited alongside berths with stunning mountain backdrop.', '{"water", "electricity", "restaurant", "showers"}'),
  (gen_random_uuid(), 'Bar Marina', 'bar-marina', 'Montenegro', 'Bar', 42.0894, 19.0956, 'marina', 'Growing marina on the open Adriatic coast of Montenegro. Ferry connections to Bari and affordable winter storage.', '{"fuel", "water", "electricity", "showers", "boatyard", "restaurant"}');

-- =============================================================================
-- 3. PROVIDERS
-- =============================================================================

-- 01: Cyprus - Marine Engineering (Limassol)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'MedTech Marine Engineering', 'medtech-marine', 'Full-service marine engineering company based in Limassol Marina specialising in diesel engine overhauls, shaft alignment and mechanical systems. Authorised Volvo Penta and Yanmar service centre with factory-trained technicians.', 'info@medtechmarine.com.cy', '+357 25 123 456', '+357 96 123 456', '{"English", "Greek", "Russian"}', 2014, 8, 'verified', 'available', true, 95, 98, 15, 97, 1, 4.8, 342, 187);

-- 02: Cyprus - Electricians (Limassol)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'CyMarine Electrics', 'cymarine-electrics', 'Specialist marine electrical contractor covering all Cyprus marinas. Services include NMEA 2000 networking, lithium battery upgrades, LED lighting conversions and complete rewiring projects. Certified for yachts up to MCA Tier 1.', 'service@cymarineelectrics.com', '+357 25 234 567', '+357 97 234 567', '{"English", "Greek"}', 2017, 5, 'verified', 'available', true, 92, 96, 20, 95, 2, 4.7, 198, 112);

-- 03: Cyprus - Hull Cleaning (Limassol/Larnaca)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'AquaClear Diving Services', 'aquaclear-diving', 'Professional underwater hull cleaning and diving services across Cyprus. Hull scrubbing, prop polishing, zinc replacement and underwater inspections with video reporting. Fast turnaround with flexible scheduling.', 'bookings@aquacleardiving.com', '+357 24 345 678', '+357 99 345 678', '{"English", "Greek", "Russian"}', 2019, 4, 'verified', 'available', true, 90, 95, 30, 94, 3, 4.6, 267, 145);

-- 04: Cyprus - Provisioning (Limassol)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Island Provisions Cyprus', 'island-provisions-cy', 'Premium yacht provisioning service delivering fresh local produce, imported speciality items and beverages direct to your berth. Custom menu planning available for charters with dietary requirement expertise.', 'orders@islandprovisions.cy', '+357 25 456 789', '+357 96 456 789', '{"English", "Greek", "French", "Russian"}', 2016, 6, 'premium', 'available', false, 97, 99, 10, 98, 1, 4.9, 512, 298);

-- 05: Cyprus - Concierge (Ayia Napa)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Napa Yacht Concierge', 'napa-yacht-concierge', 'Luxury concierge and lifestyle management for yacht owners and charter guests. Restaurant bookings, VIP club access, helicopter transfers and bespoke island excursions throughout Cyprus.', 'concierge@napayacht.com', '+357 23 567 890', '+357 99 567 890', '{"English", "Greek", "Russian", "Arabic"}', 2021, 3, 'premium', 'available', false, 93, 97, 8, 96, 2, 4.8, 156, 89);

-- 06: Cyprus - Taxi/Transfers (Larnaca)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Marina Express Transfers', 'marina-express-cy', 'Reliable airport and port transfer service covering all Cyprus marinas. Fleet of Mercedes and minibuses with meet-and-greet service. Luggage handling and provisioning stop-offs arranged on request.', 'bookings@marinaexpress.cy', '+357 24 678 901', '+357 96 678 901', '{"English", "Greek", "Russian", "German"}', 2015, 12, 'verified', 'available', true, 88, 92, 12, 93, 4, 4.5, 845, 423);

-- 07: Cyprus - AC Repair (Limassol/Larnaca)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'CoolSea Marine AC', 'coolsea-marine-ac', 'Marine air conditioning specialists covering Limassol and Larnaca. Installation of Webasto, Dometic and Climma systems. Emergency repair service with most common spare parts in stock for same-day fix.', 'service@coolseaac.com', '+357 25 789 012', '+357 97 789 012', '{"English", "Greek"}', 2018, 3, 'verified', 'available', true, 91, 94, 25, 93, 3, 4.6, 134, 76);

-- 08: Greece - Marine Engineering (Rhodes)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Aegean Marine Services', 'aegean-marine-rhodes', 'Established marine workshop on Rhodes serving the Dodecanese islands. Engine rebuilds, gearbox servicing and hydraulic systems. Mobile service available to Kos, Symi and surrounding islands by arrangement.', 'info@aegeanmarineservices.gr', '+30 2241 067 890', '+30 694 567 8901', '{"English", "Greek", "Italian"}', 2008, 7, 'verified', 'available', true, 94, 96, 20, 96, 2, 4.7, 478, 256);

-- 09: Greece - Rigging (Piraeus/Athens)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Poseidon Rigging Hellas', 'poseidon-rigging', 'Expert rigging services based at Zea Marina, Piraeus. Mast stepping, forestay and backstay replacement, furler servicing and full rig inspections. Rod and wire rigging fabricated in-house.', 'workshop@poseidonrigging.gr', '+30 210 456 7890', '+30 697 456 7890', '{"English", "Greek", "French"}', 2005, 6, 'premium', 'available', false, 96, 97, 30, 98, 1, 4.9, 389, 214);

-- 10: Greece - Hull Cleaning (Corfu)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Ionian Dive & Clean', 'ionian-dive-clean', 'Underwater services throughout the Ionian islands from their Gouvia base. Hull cleaning, antifouling inspection, anode replacement and salvage work. Fully insured commercial diving team.', 'info@ioniandive.gr', '+30 2661 045 678', '+30 698 045 6789', '{"English", "Greek", "German"}', 2016, 5, 'verified', 'available', true, 89, 93, 35, 92, 4, 4.5, 312, 167);

-- 11: Greece - Provisioning (Mykonos)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Mykonian Provisions', 'mykonian-provisions', 'High-end yacht provisioning on Mykonos with same-day delivery. Organic local produce, premium wines, imported delicacies and custom hampers. Chef liaison service for detailed menu fulfilment.', 'orders@mykonianprovisions.gr', '+30 2289 012 345', '+30 693 012 3456', '{"English", "Greek", "French", "Italian"}', 2018, 4, 'premium', 'available', false, 95, 98, 12, 97, 1, 4.8, 234, 145);

-- 12: Greece - Private Chef (Santorini/Cyclades)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Caldera Kitchen Chefs', 'caldera-kitchen', 'Private chef service across the Cyclades specialising in modern Greek cuisine with local ingredients. Multi-course dining experiences, sunset canapes and breakfast service for charter yachts.', 'bookings@calderakitchen.gr', '+30 2286 034 567', '+30 694 034 5678', '{"English", "Greek", "French"}', 2020, 5, 'premium', 'available', false, 92, 96, 15, 95, 2, 4.9, 178, 112);

-- 13: Greece - Electricians (Crete)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Crete Marine Electrical', 'crete-marine-electrical', 'Marine electrical specialists based in Heraklion covering all of Crete. Navigation systems, solar panel installation, inverter upgrades and complete vessel rewiring. ABYC certified technicians.', 'info@creteelectrical.gr', '+30 2810 234 567', '+30 697 234 5678', '{"English", "Greek"}', 2012, 4, 'verified', 'available', true, 93, 95, 22, 94, 2, 4.6, 256, 134);

-- 14: Greece - Sail Repair (Lefkada)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Ionian Sails', 'ionian-sails', 'Sail loft in Lefkada marina offering repairs, UV strip replacement and custom sail making. Emergency sail repair service throughout the Ionian with pickup and delivery to your berth or anchorage.', 'sails@ioniansails.gr', '+30 2645 023 456', '+30 698 023 4567', '{"English", "Greek", "German"}', 2010, 4, 'verified', 'available', true, 91, 94, 40, 93, 3, 4.7, 289, 156);

-- 15: Greece - Photography (Mykonos/Santorini)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Aegean Lens Photography', 'aegean-lens', 'Award-winning yacht and lifestyle photography team covering the Cyclades. Drone aerial footage, golden hour portraits, event coverage and social media content creation packages.', 'hello@aegeanlens.com', '+30 2289 056 789', '+30 693 056 7890', '{"English", "Greek", "Italian"}', 2019, 3, 'premium', 'available', false, 94, 97, 18, 96, 1, 4.9, 145, 98);

-- 16: Greece - Cleaning (Athens/Piraeus)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'SparkleYacht Athens', 'sparkleyacht-athens', 'Professional yacht cleaning and detailing service operating from Zea and Alimos marinas. Interior deep cleaning, exterior wash and polish, teak maintenance and post-charter turnaround cleaning.', 'clean@sparkleyacht.gr', '+30 210 567 8901', '+30 694 567 8901', '{"English", "Greek", "Albanian", "Bulgarian"}', 2017, 10, 'verified', 'available', true, 87, 91, 25, 91, 5, 4.4, 567, 289);

-- 17: Greece - Generator Repair (Piraeus)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'GenPower Marine Hellas', 'genpower-marine', 'Generator and power systems specialists at Piraeus. Authorised Onan, Fischer Panda and Kohler service centre. Installation, annual servicing and emergency breakdown repair throughout the Saronic Gulf.', 'service@genpowermarine.gr', '+30 210 678 9012', '+30 697 678 9012', '{"English", "Greek"}', 2009, 5, 'verified', 'available', true, 95, 96, 18, 97, 1, 4.8, 312, 178);

-- 18: Greece - Customs Agent (Piraeus)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Hellas Maritime Agency', 'hellas-maritime-agency', 'Licensed shipping agent handling port clearance, customs formalities and DEKPA transit log procedures for yachts entering and leaving Greek waters. Crew visa assistance and flag state documentation.', 'agency@hellasmaritime.gr', '+30 210 789 0123', '+30 694 789 0123', '{"English", "Greek", "French", "Turkish"}', 2001, 6, 'premium', 'available', false, 97, 99, 10, 99, 0, 4.9, 623, 345);

-- 19: Turkey - Marine Engineering (Bodrum)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Bodrum Marine Workshop', 'bodrum-marine-workshop', 'Full mechanical workshop at Bodrum marina with experienced Turkish and British engineers. Specialising in Caterpillar, MTU and MAN engine systems. Haul-out coordination and project management for refits.', 'info@bodrummarineworkshop.com', '+90 252 316 4567', '+90 532 316 4567', '{"English", "Turkish", "German"}', 2006, 10, 'verified', 'available', true, 93, 95, 20, 95, 2, 4.7, 534, 287);

-- 20: Turkey - Hull Cleaning / Diving (Marmaris)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'DiveClean Turkey', 'diveclean-turkey', 'Professional hull maintenance and commercial diving company based in Marmaris. Rapid hull scrub service, propeller polishing, through-hull inspection and underwater welding. Available across the entire Turkish coast.', 'info@divecleanturkey.com', '+90 252 412 5678', '+90 533 412 5678', '{"English", "Turkish"}', 2015, 6, 'verified', 'available', true, 88, 92, 30, 91, 4, 4.5, 389, 198);

-- 21: Turkey - Rigging (Marmaris)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Marmaris Rig & Sail', 'marmaris-rig-sail', 'Combined rigging and sail service based at the Marmaris yacht marina boatyard. Navtec hydraulic and Selden spar specialists. Full rig survey, mast pull and refurbishment with competitive Turkish pricing.', 'info@marmarisrig.com', '+90 252 413 6789', '+90 534 413 6789', '{"English", "Turkish", "French"}', 2011, 5, 'verified', 'available', false, 94, 95, 25, 96, 2, 4.7, 234, 134);

-- 22: Turkey - Provisioning (Gocek)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Gocek Fresh Market', 'gocek-fresh-market', 'Boutique provisioning service in Gocek with daily deliveries from local farms and Fethiye fish market. Specialising in Turkish and Mediterranean cuisine ingredients with full gulet fleet provisioning experience.', 'order@gocekfreshmarket.com', '+90 252 645 1234', '+90 535 645 1234', '{"English", "Turkish", "Russian"}', 2018, 3, 'verified', 'available', false, 91, 94, 15, 94, 3, 4.6, 312, 178);

-- 23: Turkey - Electrician (Fethiye)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Lycian Coast Electrics', 'lycian-coast-electrics', 'Marine electrical service covering Fethiye, Gocek and Kas. Solar and wind power installations, battery management systems and Victron equipment specialists. Emergency callout available.', 'service@lycianelectrics.com', '+90 252 614 2345', '+90 536 614 2345', '{"English", "Turkish"}', 2016, 4, 'verified', 'available', true, 90, 93, 28, 92, 3, 4.5, 187, 98);

-- 24: Turkey - Private Chef (Bodrum)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Chef Serkan Marine Dining', 'chef-serkan', 'Award-winning Turkish chef offering onboard dining experiences in Bodrum and the Turquoise Coast. Ottoman and contemporary Turkish tasting menus, seafood BBQ nights and bespoke event catering.', 'bookings@chefserkan.com', '+90 252 316 7890', '+90 537 316 7890', '{"English", "Turkish", "French"}', 2019, 4, 'premium', 'available', false, 96, 98, 10, 97, 1, 4.9, 189, 123);

-- 25: Turkey - Transport (Antalya)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Antalya VIP Transfers', 'antalya-vip-transfers', 'Premium transfer and car hire service covering Antalya, Kas and the Turquoise Coast. Fleet includes S-Class, V-Class and armoured vehicles. Helicopter charter coordination for island or yacht-to-shore transfers.', 'vip@antalyatransfers.com', '+90 242 312 3456', '+90 538 312 3456', '{"English", "Turkish", "Russian", "German"}', 2013, 15, 'premium', 'available', true, 92, 96, 8, 95, 2, 4.7, 456, 234);

-- 26: Turkey - Chandlery (Bodrum)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Milta Chandlers', 'milta-chandlers', 'Well-stocked chandlery at Bodrum Milta marina. Harken, Lewmar, Musto and International Paints stockist. Express parts ordering with courier delivery from Istanbul warehouse within 24 hours.', 'sales@miltachandlers.com', '+90 252 316 8901', '+90 532 316 8901', '{"English", "Turkish"}', 2007, 5, 'verified', 'available', false, 93, 95, 20, 95, 2, 4.6, 678, 345);

-- 27: Turkey - Watermaker (Marmaris/Bodrum)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'PureWater Marine Systems', 'purewater-marine', 'Watermaker installation and servicing covering the Turkish southwest coast. Spectra, Village Marine and Sea Recovery authorised dealer. Membrane replacement, system winterising and troubleshooting.', 'info@purewatermarine.com.tr', '+90 252 413 9012', '+90 533 413 9012', '{"English", "Turkish"}', 2017, 3, 'verified', 'available', false, 90, 92, 35, 93, 3, 4.5, 112, 67);

-- 28: Montenegro - Marine Engineering (Tivat)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Porto Marine Engineering', 'porto-marine-eng', 'Premier marine engineering firm at Porto Montenegro. MTU, Caterpillar and MAN authorised service centre. Full refit project management for superyachts with in-house mechanical, hydraulic and exhaust systems team.', 'service@portomarine.me', '+382 32 661 234', '+382 69 661 234', '{"English", "Montenegrin", "Italian", "Russian"}', 2010, 14, 'premium', 'available', true, 96, 98, 12, 98, 1, 4.9, 423, 234);

-- 29: Montenegro - Concierge (Tivat)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Boka Bay Concierge', 'boka-bay-concierge', 'Luxury lifestyle management and concierge service for the Bay of Kotor. Private tours to Perast and Sveti Stefan, restaurant reservations, event planning and VIP experience coordination for superyacht guests.', 'hello@bokaconcierge.me', '+382 32 662 345', '+382 69 662 345', '{"English", "Montenegrin", "Russian", "Italian", "French"}', 2016, 5, 'premium', 'available', false, 94, 97, 5, 96, 1, 4.8, 267, 156);

-- 30: Montenegro - Security (Tivat/Kotor)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Adriatic Guard Security', 'adriatic-guard', 'Licensed maritime security provider covering Montenegro and the southern Adriatic. Vessel watch, gangway security, close protection and event security. Ex-military personnel with superyacht experience.', 'ops@adriaticguard.me', '+382 32 663 456', '+382 69 663 456', '{"English", "Montenegrin", "Russian"}', 2014, 20, 'verified', 'available', true, 95, 98, 10, 97, 1, 4.7, 234, 123);

-- 31: Greece - Fuel Delivery (Piraeus/Saronic)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Hellenic Fuel Marine', 'hellenic-fuel-marine', 'Licensed marine fuel delivery throughout the Saronic Gulf and Athens Riviera. Duty-free diesel for transit yachts, competitive rates with metered delivery and proper documentation for EU tax exemption.', 'fuel@hellenicfuelmarine.gr', '+30 210 890 1234', '+30 694 890 1234', '{"English", "Greek"}', 2011, 4, 'verified', 'available', true, 92, 94, 45, 94, 3, 4.5, 567, 289);

-- 32: Greece - Laundry (Corfu)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Corfu Yacht Laundry', 'corfu-yacht-laundry', 'Same-day yacht laundry and linen service at Gouvia Marina. Pickup and delivery to your berth, delicate fabric handling, crew uniform pressing and complete bedding changeover for charters.', 'laundry@corfuyacht.gr', '+30 2661 091 234', '+30 698 091 2345', '{"English", "Greek", "Italian"}', 2019, 6, 'verified', 'available', false, 88, 90, 30, 90, 5, 4.3, 345, 178);

-- 33: Turkey - Cleaning (Gocek/Fethiye)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Turquoise Yacht Detailing', 'turquoise-detailing', 'Premium yacht cleaning and valeting across the Gocek and Fethiye bays. Full detailing packages including exterior wash, teak treatment, stainless polishing and interior deep clean. Charter turnaround specialists.', 'bookings@turquoisedetailing.com', '+90 252 645 3456', '+90 535 645 3456', '{"English", "Turkish", "Russian"}', 2020, 8, 'verified', 'available', false, 87, 91, 22, 90, 4, 4.4, 234, 123);

-- 34: Cyprus - Refrigeration (Limassol)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'CoolMarine Cyprus', 'coolmarine-cyprus', 'Marine refrigeration and freezer specialists in Limassol. Isotherm and Frigoboat dealer. Ice-maker installation, cold plate systems and walk-in freezer servicing for superyachts.', 'service@coolmarinecyprus.com', '+357 25 890 123', '+357 96 890 123', '{"English", "Greek"}', 2015, 3, 'verified', 'available', true, 91, 93, 30, 93, 2, 4.6, 145, 78);

-- 35: Greece - Wellness/Spa (Mykonos)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Meltemi Wellness', 'meltemi-wellness', 'Luxury onboard wellness provider across the Cyclades. Licensed therapists offering deep tissue massage, Thai yoga, aromatherapy and beauty treatments. Sunrise yoga sessions and personal training available.', 'book@meltemiwellness.gr', '+30 2289 078 901', '+30 693 078 9012', '{"English", "Greek", "Russian"}', 2021, 6, 'premium', 'available', false, 93, 96, 12, 95, 2, 4.8, 123, 78);

-- 36: Turkey - Event Setup (Bodrum)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Bodrum Yacht Events', 'bodrum-yacht-events', 'Full event production for yacht parties and celebrations along the Turquoise Coast. Sound and lighting, staging, themed decor, catering coordination and entertainment booking. Permit handling included.', 'events@bodrumyachtevents.com', '+90 252 316 0123', '+90 537 316 0123', '{"English", "Turkish", "Russian"}', 2017, 8, 'premium', 'available', false, 91, 95, 20, 94, 2, 4.7, 167, 89);

-- 37: Greece - Spare Parts (Athens)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Marathon Marine Parts', 'marathon-marine-parts', 'Marine spare parts sourcing and express delivery hub in Athens. Extensive warehouse plus global procurement network. Same-day dispatch across Greece, next-day to Turkey and Cyprus via courier.', 'parts@marathonmarine.gr', '+30 210 901 2345', '+30 697 901 2345', '{"English", "Greek"}', 2004, 7, 'verified', 'available', true, 94, 96, 15, 96, 2, 4.7, 789, 412);

-- 38: Turkey - AC Repair (Marmaris)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'AirMar Cooling Systems', 'airmar-cooling', 'Marine AC and refrigeration specialist in Marmaris with over 15 years experience. Webasto and Climma certified. Chilled water systems for superyachts and direct expansion units for sailing yachts.', 'info@airmarcooling.com', '+90 252 412 7890', '+90 533 412 7890', '{"English", "Turkish"}', 2010, 4, 'verified', 'available', true, 92, 94, 25, 94, 2, 4.6, 223, 123);

-- 39: Greece - DJ/Music (Mykonos)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Aegean Sound DJs', 'aegean-sound-djs', 'Premium DJ and entertainment service for yacht parties in the Cyclades. Resident DJs from Mykonos clubs with marine-grade sound systems. Saxophone, percussion and live vocalist acts available.', 'book@aegeansound.gr', '+30 2289 089 012', '+30 693 089 0123', '{"English", "Greek"}', 2020, 4, 'premium', 'available', false, 89, 93, 25, 92, 3, 4.6, 98, 56);

-- 40: Cyprus - Customs Agent (Limassol)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Cyprus Maritime Agents', 'cyprus-maritime-agents', 'Licensed port agent handling all yacht clearance procedures in Cyprus. Transit log arrangement, temporary importation, crew visas and coordination with harbour master. Available at all Cyprus ports.', 'agents@cymaritimeagents.com', '+357 25 901 234', '+357 96 901 234', '{"English", "Greek", "Russian", "Turkish"}', 2008, 4, 'verified', 'available', false, 96, 98, 12, 98, 1, 4.8, 456, 234);

-- 41: Greece - Gas Refill (Lefkada/Corfu)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Ionian Gas Services', 'ionian-gas-services', 'LPG gas bottle refill and exchange service across the Ionian islands. Delivery to your berth at Lefkada, Corfu or Zakynthos marinas. Calor, Campingaz and local bottle refills with adaptor supply.', 'gas@ioniangas.gr', '+30 2645 045 678', '+30 698 045 6789', '{"English", "Greek"}', 2020, 2, 'pending', 'available', false, 85, 88, 60, 88, 5, 4.2, 123, 56);

-- 42: Turkey - Waste Disposal (Marmaris)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'EcoMarine Waste Solutions', 'ecomarine-waste', 'Licensed marine waste collection covering Marmaris, Gocek and Fethiye. Bilge water pump-out, used oil collection, sewage holding tank service and general waste removal. Full compliance documentation provided.', 'service@ecomarinewaste.com.tr', '+90 252 412 0123', '+90 534 412 0123', '{"English", "Turkish"}', 2019, 3, 'verified', 'available', false, 87, 90, 45, 89, 4, 4.3, 178, 89);

-- 43: Montenegro - Cleaning (Tivat)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Adriatic Yacht Care', 'adriatic-yacht-care', 'Professional yacht management and cleaning at Porto Montenegro. Weekly wash programmes, antifouling coordination, winterisation packages and full ownership management for absentee owners.', 'care@adriaticyachtcare.me', '+382 32 664 567', '+382 69 664 567', '{"English", "Montenegrin", "Russian", "Italian"}', 2015, 8, 'verified', 'available', false, 90, 93, 20, 92, 3, 4.5, 312, 167);

-- 44: Greece - Marine Painting (Syros)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Neorion Yacht Coatings', 'neorion-yacht-coatings', 'Specialist yacht painting at the Syros shipyard. Awlgrip and International topside systems, copper coat antifouling, gelcoat osmosis treatment and spray application for superyachts up to 60m.', 'paint@neorionyacht.gr', '+30 2281 067 890', '+30 694 067 8901', '{"English", "Greek"}', 2007, 10, 'verified', 'available', false, 95, 96, 40, 97, 1, 4.8, 178, 98);

-- 45: Turkey - Flowers (Bodrum)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Bodrum Bloom Yachting', 'bodrum-bloom', 'Premium floral design for superyachts and events in Bodrum and the Turkish Riviera. Weekly fresh flower arrangements, event installations, table centrepieces and bridal yacht decorations.', 'flowers@bodrumbloom.com', '+90 252 317 2345', '+90 536 317 2345', '{"English", "Turkish"}', 2021, 3, 'verified', 'available', false, 90, 94, 15, 93, 2, 4.7, 89, 45);

-- 46: Cyprus - Plumbing (Larnaca/Limassol)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'SeaFlow Marine Plumbing', 'seaflow-plumbing', 'Marine plumbing contractor covering Cyprus. Jabsco and Raritan head installations, holding tank systems, freshwater pumps, watermaker plumbing and hot water calorifier service.', 'info@seaflowmarine.com.cy', '+357 24 012 345', '+357 97 012 345', '{"English", "Greek"}', 2018, 3, 'pending', 'available', true, 88, 91, 35, 90, 4, 4.4, 156, 78);

-- 47: Turkey - Generator (Bodrum)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Aegean Generator Services', 'aegean-generator', 'Generator and power systems specialists serving the Turkish Aegean coast. Northern Lights, Kohler and Onan certified. New installations, 500-hour services and emergency breakdown repair with rapid response.', 'service@aegeangenerator.com', '+90 252 316 5678', '+90 532 316 5678', '{"English", "Turkish"}', 2013, 4, 'verified', 'available', true, 93, 95, 22, 95, 2, 4.7, 234, 123);

-- 48: Greece - Restaurant Bookings (Mykonos/Cyclades)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Cyclades Table', 'cyclades-table', 'VIP restaurant reservation service across Mykonos, Santorini and Paros. Priority bookings at Nammos, Scorpios and exclusive beach clubs. Private dining arrangements and chef collaboration events.', 'reservations@cycladestable.gr', '+30 2289 090 123', '+30 693 090 1234', '{"English", "Greek", "French", "Italian"}', 2022, 2, 'premium', 'available', false, 91, 96, 8, 94, 3, 4.7, 134, 78);

-- 49: Montenegro - Provisioning (Tivat)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Boka Fresh Provisions', 'boka-fresh-provisions', 'Full yacht provisioning in the Bay of Kotor sourcing from local Montenegrin farms, Italian imports and the Tivat fish market. Complete galley setup for superyachts including cleaning supplies and guest amenities.', 'orders@bokafresh.me', '+382 32 665 678', '+382 69 665 678', '{"English", "Montenegrin", "Italian", "Russian"}', 2018, 4, 'verified', 'available', false, 92, 95, 15, 94, 2, 4.6, 189, 98);

-- 50: Greece - Watermaker (Athens/Piraeus)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'HydroMarine Greece', 'hydromarine-greece', 'Watermaker specialists based at Alimos Marina, Athens. Spectra and Village Marine Tec authorised service centre. System sizing, installation, membrane replacement and annual servicing across the Aegean.', 'info@hydromarine.gr', '+30 210 012 3456', '+30 697 012 3456', '{"English", "Greek"}', 2014, 3, 'verified', 'available', false, 93, 95, 30, 95, 2, 4.6, 145, 78);

-- 51: Turkey - Photography (Bodrum/Gocek)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Blue Voyage Media', 'blue-voyage-media', 'Professional yacht photography and videography along the Turquoise Coast. Cinematic drone footage, lifestyle shooting, social media content packages and event documentation for charter companies.', 'shoot@bluevoyagemedia.com', '+90 252 645 5678', '+90 537 645 5678', '{"English", "Turkish"}', 2020, 3, 'verified', 'available', false, 90, 93, 20, 92, 3, 4.6, 112, 67);

-- 52: Cyprus - Generator (Limassol)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'PowerMarine Cyprus', 'powermarine-cyprus', 'Generator installation, servicing and repair in Cyprus. Cummins Onan and Kohler dealer. Load bank testing, exhaust system upgrades and soundproofing. Emergency callout to all Cyprus marinas.', 'service@powermarine.com.cy', '+357 25 123 890', '+357 96 123 890', '{"English", "Greek", "Russian"}', 2016, 3, 'verified', 'available', true, 92, 94, 20, 94, 2, 4.7, 178, 89);

-- 53: Turkey - Customs/Port Agent (Bodrum)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Bodrum Port Agency', 'bodrum-port-agency', 'Licensed Turkish port agent handling all maritime formalities at Bodrum and surrounding ports. Transit log, crew list, harbour fees and coordination with customs, immigration and coast guard.', 'agency@bodrumportagency.com', '+90 252 316 9012', '+90 532 316 9012', '{"English", "Turkish", "German", "French"}', 2003, 5, 'premium', 'available', false, 97, 99, 10, 99, 0, 4.9, 567, 312);

-- 54: Greece - Divers (Rhodes/Dodecanese)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'Dodecanese Diving Services', 'dodecanese-diving', 'Commercial diving team covering Rhodes, Kos and the Dodecanese islands. Underwater survey, hull inspection, prop repair, lost anchor retrieval and mooring installation. Fully insured with video documentation.', 'dive@dodecanese-diving.gr', '+30 2241 078 901', '+30 694 078 9012', '{"English", "Greek"}', 2014, 4, 'verified', 'available', true, 89, 92, 35, 91, 4, 4.5, 234, 123);

-- 55: Montenegro - Electrician (Tivat)
INSERT INTO providers (id, user_id, business_name, slug, description, email, phone, whatsapp, languages, founded_year, team_size, verification_status, availability, emergency_available, reliability_score, response_rate, avg_response_time_minutes, completion_rate, cancellation_rate, avg_rating, total_jobs, total_reviews) VALUES
  (gen_random_uuid(), NULL, 'MontElec Marine Systems', 'montelec-marine', 'Marine electrical engineering at Porto Montenegro. AV systems, navigation upgrades, shore power installations and complete electrical refit projects. NMEA 2000 and Czone certified technicians on staff.', 'info@montelecmarine.me', '+382 32 666 789', '+382 69 666 789', '{"English", "Montenegrin", "Italian", "Russian"}', 2013, 5, 'verified', 'available', true, 94, 96, 18, 96, 1, 4.7, 198, 112);


-- =============================================================================
-- 4. PROVIDER SERVICES
-- =============================================================================

-- prov_01 MedTech Marine Engineering - mechanics, generator
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'medtech-marine'), (SELECT id FROM service_categories WHERE slug = 'mechanics'), 'Diesel engine diagnostics, servicing and overhauls for Volvo Penta, Yanmar and Cummins', 80, 150, 'EUR', true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'medtech-marine'), (SELECT id FROM service_categories WHERE slug = 'generator-repair'), 'Generator servicing and repair including load testing', 90, 160, 'EUR', true);

-- prov_02 CyMarine Electrics
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cymarine-electrics'), (SELECT id FROM service_categories WHERE slug = 'electricians'), 'Marine electrical systems from lighting to full vessel rewiring', 75, 140, 'EUR', true);

-- prov_03 AquaClear Diving
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'aquaclear-diving'), (SELECT id FROM service_categories WHERE slug = 'hull-cleaning'), 'Underwater hull scrub with propeller polishing', 150, 500, 'EUR', true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'aquaclear-diving'), (SELECT id FROM service_categories WHERE slug = 'divers'), 'Underwater inspections, zinc replacement and through-hull checks', 200, 600, 'EUR', true);

-- prov_04 Island Provisions
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'island-provisions-cy'), (SELECT id FROM service_categories WHERE slug = 'provisioning'), 'Full yacht provisioning with fresh produce and specialty items', 500, 10000, 'EUR', false);

-- prov_05 Napa Yacht Concierge
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'napa-yacht-concierge'), (SELECT id FROM service_categories WHERE slug = 'concierge'), 'Luxury concierge and lifestyle management', 100, 500, 'EUR', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'napa-yacht-concierge'), (SELECT id FROM service_categories WHERE slug = 'restaurant-bookings'), 'VIP restaurant reservations and private dining', 50, 200, 'EUR', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'napa-yacht-concierge'), (SELECT id FROM service_categories WHERE slug = 'vip-transport'), 'Helicopter and luxury vehicle transfers', 300, 5000, 'EUR', false);

-- prov_06 Marina Express Transfers
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'marina-express-cy'), (SELECT id FROM service_categories WHERE slug = 'taxi-transfers'), 'Airport and port transfers across Cyprus', 40, 200, 'EUR', true);

-- prov_07 CoolSea Marine AC
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'coolsea-marine-ac'), (SELECT id FROM service_categories WHERE slug = 'ac-repair'), 'Marine AC installation, servicing and emergency repair', 85, 160, 'EUR', true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'coolsea-marine-ac'), (SELECT id FROM service_categories WHERE slug = 'refrigeration'), 'Fridge and freezer system repair and regas', 85, 150, 'EUR', true);

-- prov_08 Aegean Marine Services
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'aegean-marine-rhodes'), (SELECT id FROM service_categories WHERE slug = 'mechanics'), 'Full engine rebuilds, gearbox servicing and hydraulics', 70, 130, 'EUR', true);

-- prov_09 Poseidon Rigging
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'poseidon-rigging'), (SELECT id FROM service_categories WHERE slug = 'rigging'), 'Standing and running rigging, rod rigging fabrication', 90, 180, 'EUR', false);

-- prov_10 Ionian Dive & Clean
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ionian-dive-clean'), (SELECT id FROM service_categories WHERE slug = 'hull-cleaning'), 'Hull cleaning and antifouling inspection', 120, 450, 'EUR', true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ionian-dive-clean'), (SELECT id FROM service_categories WHERE slug = 'divers'), 'Commercial diving, salvage and mooring work', 180, 550, 'EUR', true);

-- prov_11 Mykonian Provisions
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'mykonian-provisions'), (SELECT id FROM service_categories WHERE slug = 'provisioning'), 'Premium provisioning with organic and local produce', 800, 15000, 'EUR', false);

-- prov_12 Caldera Kitchen Chefs
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'caldera-kitchen'), (SELECT id FROM service_categories WHERE slug = 'private-chef'), 'Private chef for onboard dining and events', 500, 3000, 'EUR', false);

-- prov_13 Crete Marine Electrical
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'crete-marine-electrical'), (SELECT id FROM service_categories WHERE slug = 'electricians'), 'Marine electrical, solar panels and navigation systems', 65, 120, 'EUR', true);

-- prov_14 Ionian Sails
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ionian-sails'), (SELECT id FROM service_categories WHERE slug = 'sail-repair'), 'Sail repairs, UV strip replacement and custom sails', 100, 5000, 'EUR', true);

-- prov_15 Aegean Lens Photography
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'aegean-lens'), (SELECT id FROM service_categories WHERE slug = 'photographers'), 'Yacht photography, drone footage and event coverage', 400, 2500, 'EUR', false);

-- prov_16 SparkleYacht Athens
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'sparkleyacht-athens'), (SELECT id FROM service_categories WHERE slug = 'cleaners'), 'Interior and exterior yacht detailing', 200, 2000, 'EUR', true);

-- prov_17 GenPower Marine
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'genpower-marine'), (SELECT id FROM service_categories WHERE slug = 'generator-repair'), 'Generator installation, servicing and emergency repair', 85, 160, 'EUR', true);

-- prov_18 Hellas Maritime Agency
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'hellas-maritime-agency'), (SELECT id FROM service_categories WHERE slug = 'customs-agents'), 'Port clearance, customs and transit documentation', 150, 500, 'EUR', false);

-- prov_19 Bodrum Marine Workshop
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bodrum-marine-workshop'), (SELECT id FROM service_categories WHERE slug = 'mechanics'), 'Engine overhaul, shaft alignment and mechanical systems', 60, 120, 'EUR', true);

-- prov_20 DiveClean Turkey
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'diveclean-turkey'), (SELECT id FROM service_categories WHERE slug = 'hull-cleaning'), 'Hull scrub and propeller polishing', 100, 400, 'EUR', true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'diveclean-turkey'), (SELECT id FROM service_categories WHERE slug = 'divers'), 'Underwater inspection, welding and salvage', 150, 500, 'EUR', true);

-- prov_21 Marmaris Rig & Sail
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'marmaris-rig-sail'), (SELECT id FROM service_categories WHERE slug = 'rigging'), 'Rig survey, mast pull and standing rigging', 70, 150, 'EUR', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'marmaris-rig-sail'), (SELECT id FROM service_categories WHERE slug = 'sail-repair'), 'Sail repairs and UV cover replacement', 80, 3000, 'EUR', false);

-- prov_22 Gocek Fresh Market
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'gocek-fresh-market'), (SELECT id FROM service_categories WHERE slug = 'provisioning'), 'Provisioning from local farms and fish market', 300, 8000, 'EUR', false);

-- prov_23 Lycian Coast Electrics
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'lycian-coast-electrics'), (SELECT id FROM service_categories WHERE slug = 'electricians'), 'Solar and battery systems, Victron specialist', 55, 110, 'EUR', true);

-- prov_24 Chef Serkan
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'chef-serkan'), (SELECT id FROM service_categories WHERE slug = 'private-chef'), 'Turkish and Mediterranean private dining', 400, 2500, 'EUR', false);

-- prov_25 Antalya VIP Transfers
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'antalya-vip-transfers'), (SELECT id FROM service_categories WHERE slug = 'vip-transport'), 'Luxury car and helicopter transfers', 200, 5000, 'EUR', true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'antalya-vip-transfers'), (SELECT id FROM service_categories WHERE slug = 'taxi-transfers'), 'Standard airport and port transfers', 50, 300, 'EUR', true);

-- prov_26 Milta Chandlers
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'milta-chandlers'), (SELECT id FROM service_categories WHERE slug = 'chandlery'), 'Marine hardware, safety gear and consumables', 10, 5000, 'EUR', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'milta-chandlers'), (SELECT id FROM service_categories WHERE slug = 'spare-parts'), 'Parts sourcing with 24hr Istanbul courier', 20, 10000, 'EUR', false);

-- prov_27 PureWater Marine
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'purewater-marine'), (SELECT id FROM service_categories WHERE slug = 'watermakers'), 'Watermaker installation, membrane replacement and service', 200, 3000, 'EUR', false);

-- prov_28 Porto Marine Engineering
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'porto-marine-eng'), (SELECT id FROM service_categories WHERE slug = 'mechanics'), 'Superyacht engine systems and refit management', 100, 200, 'EUR', true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'porto-marine-eng'), (SELECT id FROM service_categories WHERE slug = 'generator-repair'), 'Generator servicing and new installations', 100, 200, 'EUR', true);

-- prov_29 Boka Bay Concierge
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'boka-bay-concierge'), (SELECT id FROM service_categories WHERE slug = 'concierge'), 'Full lifestyle management and experience curation', 150, 1000, 'EUR', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'boka-bay-concierge'), (SELECT id FROM service_categories WHERE slug = 'restaurant-bookings'), 'Exclusive restaurant and beach club bookings', 50, 300, 'EUR', false);

-- prov_30 Adriatic Guard
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'adriatic-guard'), (SELECT id FROM service_categories WHERE slug = 'security'), 'Vessel watch, close protection and event security', 300, 2000, 'EUR', true);

-- prov_31 Hellenic Fuel Marine
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'hellenic-fuel-marine'), (SELECT id FROM service_categories WHERE slug = 'fuel-delivery'), 'Duty-free diesel delivery with metered pumping', 500, 50000, 'EUR', true);

-- prov_32 Corfu Yacht Laundry
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'corfu-yacht-laundry'), (SELECT id FROM service_categories WHERE slug = 'laundry'), 'Same-day laundry, pressing and linen service', 50, 500, 'EUR', false);

-- prov_33 Turquoise Yacht Detailing
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'turquoise-detailing'), (SELECT id FROM service_categories WHERE slug = 'cleaners'), 'Full yacht detailing including teak and stainless', 150, 1500, 'EUR', false);

-- prov_34 CoolMarine Cyprus
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'coolmarine-cyprus'), (SELECT id FROM service_categories WHERE slug = 'refrigeration'), 'Marine fridge, freezer and ice-maker systems', 90, 160, 'EUR', true);

-- prov_35 Meltemi Wellness
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'meltemi-wellness'), (SELECT id FROM service_categories WHERE slug = 'wellness-spa'), 'Onboard massage, yoga and personal training', 120, 500, 'EUR', false);

-- prov_36 Bodrum Yacht Events
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bodrum-yacht-events'), (SELECT id FROM service_categories WHERE slug = 'event-setup'), 'Full event production with sound, lighting and decor', 1000, 20000, 'EUR', false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bodrum-yacht-events'), (SELECT id FROM service_categories WHERE slug = 'decorators'), 'Themed event decorations and styling', 500, 10000, 'EUR', false);

-- prov_37 Marathon Marine Parts
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'marathon-marine-parts'), (SELECT id FROM service_categories WHERE slug = 'spare-parts'), 'Marine parts sourcing with same-day dispatch', 10, 20000, 'EUR', true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'marathon-marine-parts'), (SELECT id FROM service_categories WHERE slug = 'chandlery'), 'Chandlery supplies and safety equipment', 10, 5000, 'EUR', false);

-- prov_38 AirMar Cooling
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'airmar-cooling'), (SELECT id FROM service_categories WHERE slug = 'ac-repair'), 'Marine AC systems from sailing yachts to superyachts', 60, 130, 'EUR', true);

-- prov_39 Aegean Sound DJs
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'aegean-sound-djs'), (SELECT id FROM service_categories WHERE slug = 'dj-music'), 'DJ sets and live music for yacht parties', 800, 5000, 'EUR', false);

-- prov_40 Cyprus Maritime Agents
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cyprus-maritime-agents'), (SELECT id FROM service_categories WHERE slug = 'customs-agents'), 'Port clearance and transit log for Cyprus', 120, 400, 'EUR', false);

-- prov_41 Ionian Gas Services
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ionian-gas-services'), (SELECT id FROM service_categories WHERE slug = 'gas-refill'), 'LPG bottle refill and delivery', 20, 80, 'EUR', false);

-- prov_42 EcoMarine Waste
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ecomarine-waste'), (SELECT id FROM service_categories WHERE slug = 'waste-disposal'), 'Bilge, oil and sewage pump-out with documentation', 100, 500, 'EUR', false);

-- prov_43 Adriatic Yacht Care
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'adriatic-yacht-care'), (SELECT id FROM service_categories WHERE slug = 'cleaners'), 'Yacht management and cleaning packages', 200, 2000, 'EUR', false);

-- prov_44 Neorion Yacht Coatings
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'neorion-yacht-coatings'), (SELECT id FROM service_categories WHERE slug = 'painting'), 'Awlgrip topside, antifouling and gelcoat treatment', 1000, 50000, 'EUR', false);

-- prov_45 Bodrum Bloom
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bodrum-bloom'), (SELECT id FROM service_categories WHERE slug = 'flowers'), 'Fresh flower arrangements and event florals', 100, 3000, 'EUR', false);

-- prov_46 SeaFlow Plumbing
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'seaflow-plumbing'), (SELECT id FROM service_categories WHERE slug = 'plumbing'), 'Marine heads, pumps, tanks and plumbing systems', 70, 130, 'EUR', true);

-- prov_47 Aegean Generator
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'aegean-generator'), (SELECT id FROM service_categories WHERE slug = 'generator-repair'), 'Generator installation, servicing and breakdown repair', 60, 130, 'EUR', true);

-- prov_48 Cyclades Table
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cyclades-table'), (SELECT id FROM service_categories WHERE slug = 'restaurant-bookings'), 'VIP restaurant and beach club reservations', 50, 200, 'EUR', false);

-- prov_49 Boka Fresh Provisions
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'boka-fresh-provisions'), (SELECT id FROM service_categories WHERE slug = 'provisioning'), 'Full provisioning from local and imported sources', 400, 8000, 'EUR', false);

-- prov_50 HydroMarine Greece
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'hydromarine-greece'), (SELECT id FROM service_categories WHERE slug = 'watermakers'), 'Watermaker systems, membranes and servicing', 180, 2500, 'EUR', false);

-- prov_51 Blue Voyage Media
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'blue-voyage-media'), (SELECT id FROM service_categories WHERE slug = 'photographers'), 'Yacht photography, drone and video packages', 300, 2000, 'EUR', false);

-- prov_52 PowerMarine Cyprus
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'powermarine-cyprus'), (SELECT id FROM service_categories WHERE slug = 'generator-repair'), 'Generator servicing with load bank testing', 85, 160, 'EUR', true);

-- prov_53 Bodrum Port Agency
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bodrum-port-agency'), (SELECT id FROM service_categories WHERE slug = 'customs-agents'), 'Turkish port clearance and maritime formalities', 100, 350, 'EUR', false);

-- prov_54 Dodecanese Diving
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'dodecanese-diving'), (SELECT id FROM service_categories WHERE slug = 'divers'), 'Commercial diving, survey and salvage', 180, 600, 'EUR', true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'dodecanese-diving'), (SELECT id FROM service_categories WHERE slug = 'hull-cleaning'), 'Hull cleaning across the Dodecanese', 120, 400, 'EUR', true);

-- prov_55 MontElec Marine
INSERT INTO provider_services (id, provider_id, category_id, description, price_min, price_max, currency, emergency_available) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'montelec-marine'), (SELECT id FROM service_categories WHERE slug = 'electricians'), 'Marine electrical engineering and AV systems', 90, 170, 'EUR', true);


-- =============================================================================
-- 5. PROVIDER COVERAGE
-- =============================================================================

-- Cyprus providers
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'medtech-marine'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'medtech-marine'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 50, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cymarine-electrics'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cymarine-electrics'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 50, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cymarine-electrics'), (SELECT id FROM locations WHERE slug = 'paphos-harbour'), 80, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'aquaclear-diving'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'aquaclear-diving'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 50, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'aquaclear-diving'), (SELECT id FROM locations WHERE slug = 'ayia-napa-marina'), 80, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'island-provisions-cy'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 20, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'island-provisions-cy'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 50, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'island-provisions-cy'), (SELECT id FROM locations WHERE slug = 'ayia-napa-marina'), 80, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'island-provisions-cy'), (SELECT id FROM locations WHERE slug = 'paphos-harbour'), 70, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'napa-yacht-concierge'), (SELECT id FROM locations WHERE slug = 'ayia-napa-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'napa-yacht-concierge'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 70, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'marina-express-cy'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'marina-express-cy'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 50, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'marina-express-cy'), (SELECT id FROM locations WHERE slug = 'ayia-napa-marina'), 40, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'marina-express-cy'), (SELECT id FROM locations WHERE slug = 'paphos-harbour'), 80, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'coolsea-marine-ac'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'coolsea-marine-ac'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 50, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'coolmarine-cyprus'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'coolmarine-cyprus'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 50, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cyprus-maritime-agents'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cyprus-maritime-agents'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 50, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cyprus-maritime-agents'), (SELECT id FROM locations WHERE slug = 'paphos-harbour'), 70, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cyprus-maritime-agents'), (SELECT id FROM locations WHERE slug = 'ayia-napa-marina'), 80, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'seaflow-plumbing'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'seaflow-plumbing'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 50, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'powermarine-cyprus'), (SELECT id FROM locations WHERE slug = 'limassol-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'powermarine-cyprus'), (SELECT id FROM locations WHERE slug = 'larnaca-marina'), 50, false);

-- Greece providers
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'aegean-marine-rhodes'), (SELECT id FROM locations WHERE slug = 'rhodes-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'aegean-marine-rhodes'), (SELECT id FROM locations WHERE slug = 'kos-marina'), 80, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'poseidon-rigging'), (SELECT id FROM locations WHERE slug = 'piraeus-zea'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'poseidon-rigging'), (SELECT id FROM locations WHERE slug = 'alimos-marina'), 15, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ionian-dive-clean'), (SELECT id FROM locations WHERE slug = 'corfu-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ionian-dive-clean'), (SELECT id FROM locations WHERE slug = 'lefkada-marina'), 80, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ionian-dive-clean'), (SELECT id FROM locations WHERE slug = 'zakynthos-marina'), 100, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'mykonian-provisions'), (SELECT id FROM locations WHERE slug = 'mykonos-port'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'mykonian-provisions'), (SELECT id FROM locations WHERE slug = 'syros-ermoupoli'), 40, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'caldera-kitchen'), (SELECT id FROM locations WHERE slug = 'santorini-vlychada'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'caldera-kitchen'), (SELECT id FROM locations WHERE slug = 'mykonos-port'), 100, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'crete-marine-electrical'), (SELECT id FROM locations WHERE slug = 'heraklion-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ionian-sails'), (SELECT id FROM locations WHERE slug = 'lefkada-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ionian-sails'), (SELECT id FROM locations WHERE slug = 'corfu-marina'), 80, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'aegean-lens'), (SELECT id FROM locations WHERE slug = 'mykonos-port'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'aegean-lens'), (SELECT id FROM locations WHERE slug = 'santorini-vlychada'), 100, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'sparkleyacht-athens'), (SELECT id FROM locations WHERE slug = 'piraeus-zea'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'sparkleyacht-athens'), (SELECT id FROM locations WHERE slug = 'alimos-marina'), 15, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'genpower-marine'), (SELECT id FROM locations WHERE slug = 'piraeus-zea'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'genpower-marine'), (SELECT id FROM locations WHERE slug = 'alimos-marina'), 15, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'hellas-maritime-agency'), (SELECT id FROM locations WHERE slug = 'piraeus-zea'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'hellas-maritime-agency'), (SELECT id FROM locations WHERE slug = 'alimos-marina'), 15, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'hellenic-fuel-marine'), (SELECT id FROM locations WHERE slug = 'piraeus-zea'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'hellenic-fuel-marine'), (SELECT id FROM locations WHERE slug = 'alimos-marina'), 15, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'corfu-yacht-laundry'), (SELECT id FROM locations WHERE slug = 'corfu-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'meltemi-wellness'), (SELECT id FROM locations WHERE slug = 'mykonos-port'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'meltemi-wellness'), (SELECT id FROM locations WHERE slug = 'santorini-vlychada'), 100, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'marathon-marine-parts'), (SELECT id FROM locations WHERE slug = 'alimos-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'marathon-marine-parts'), (SELECT id FROM locations WHERE slug = 'piraeus-zea'), 10, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'aegean-sound-djs'), (SELECT id FROM locations WHERE slug = 'mykonos-port'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ionian-gas-services'), (SELECT id FROM locations WHERE slug = 'lefkada-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ionian-gas-services'), (SELECT id FROM locations WHERE slug = 'corfu-marina'), 80, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ionian-gas-services'), (SELECT id FROM locations WHERE slug = 'zakynthos-marina'), 100, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'neorion-yacht-coatings'), (SELECT id FROM locations WHERE slug = 'syros-ermoupoli'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cyclades-table'), (SELECT id FROM locations WHERE slug = 'mykonos-port'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cyclades-table'), (SELECT id FROM locations WHERE slug = 'santorini-vlychada'), 100, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'hydromarine-greece'), (SELECT id FROM locations WHERE slug = 'alimos-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'hydromarine-greece'), (SELECT id FROM locations WHERE slug = 'piraeus-zea'), 10, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'dodecanese-diving'), (SELECT id FROM locations WHERE slug = 'rhodes-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'dodecanese-diving'), (SELECT id FROM locations WHERE slug = 'kos-marina'), 80, false);

-- Turkey providers
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bodrum-marine-workshop'), (SELECT id FROM locations WHERE slug = 'bodrum-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'diveclean-turkey'), (SELECT id FROM locations WHERE slug = 'marmaris-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'diveclean-turkey'), (SELECT id FROM locations WHERE slug = 'gocek-marina'), 60, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'diveclean-turkey'), (SELECT id FROM locations WHERE slug = 'fethiye-marina'), 70, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'marmaris-rig-sail'), (SELECT id FROM locations WHERE slug = 'marmaris-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'gocek-fresh-market'), (SELECT id FROM locations WHERE slug = 'gocek-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'gocek-fresh-market'), (SELECT id FROM locations WHERE slug = 'fethiye-marina'), 30, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'lycian-coast-electrics'), (SELECT id FROM locations WHERE slug = 'fethiye-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'lycian-coast-electrics'), (SELECT id FROM locations WHERE slug = 'gocek-marina'), 30, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'lycian-coast-electrics'), (SELECT id FROM locations WHERE slug = 'kas-harbour'), 80, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'chef-serkan'), (SELECT id FROM locations WHERE slug = 'bodrum-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'chef-serkan'), (SELECT id FROM locations WHERE slug = 'gocek-marina'), 100, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'antalya-vip-transfers'), (SELECT id FROM locations WHERE slug = 'antalya-marina'), 20, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'antalya-vip-transfers'), (SELECT id FROM locations WHERE slug = 'kas-harbour'), 100, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'milta-chandlers'), (SELECT id FROM locations WHERE slug = 'bodrum-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'purewater-marine'), (SELECT id FROM locations WHERE slug = 'marmaris-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'purewater-marine'), (SELECT id FROM locations WHERE slug = 'bodrum-marina'), 80, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'turquoise-detailing'), (SELECT id FROM locations WHERE slug = 'gocek-marina'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'turquoise-detailing'), (SELECT id FROM locations WHERE slug = 'fethiye-marina'), 30, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bodrum-yacht-events'), (SELECT id FROM locations WHERE slug = 'bodrum-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'airmar-cooling'), (SELECT id FROM locations WHERE slug = 'marmaris-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'airmar-cooling'), (SELECT id FROM locations WHERE slug = 'fethiye-marina'), 70, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ecomarine-waste'), (SELECT id FROM locations WHERE slug = 'marmaris-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ecomarine-waste'), (SELECT id FROM locations WHERE slug = 'gocek-marina'), 60, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ecomarine-waste'), (SELECT id FROM locations WHERE slug = 'fethiye-marina'), 70, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bodrum-bloom'), (SELECT id FROM locations WHERE slug = 'bodrum-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'aegean-generator'), (SELECT id FROM locations WHERE slug = 'bodrum-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'aegean-generator'), (SELECT id FROM locations WHERE slug = 'marmaris-marina'), 80, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'blue-voyage-media'), (SELECT id FROM locations WHERE slug = 'bodrum-marina'), 15, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'blue-voyage-media'), (SELECT id FROM locations WHERE slug = 'gocek-marina'), 100, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bodrum-port-agency'), (SELECT id FROM locations WHERE slug = 'bodrum-marina'), 15, true);

-- Montenegro providers
INSERT INTO provider_coverage (id, provider_id, location_id, radius_km, is_primary) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'porto-marine-eng'), (SELECT id FROM locations WHERE slug = 'porto-montenegro'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'porto-marine-eng'), (SELECT id FROM locations WHERE slug = 'kotor-marina'), 15, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'porto-marine-eng'), (SELECT id FROM locations WHERE slug = 'bar-marina'), 50, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'boka-bay-concierge'), (SELECT id FROM locations WHERE slug = 'porto-montenegro'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'boka-bay-concierge'), (SELECT id FROM locations WHERE slug = 'kotor-marina'), 15, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'adriatic-guard'), (SELECT id FROM locations WHERE slug = 'porto-montenegro'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'adriatic-guard'), (SELECT id FROM locations WHERE slug = 'kotor-marina'), 15, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'adriatic-guard'), (SELECT id FROM locations WHERE slug = 'bar-marina'), 50, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'adriatic-yacht-care'), (SELECT id FROM locations WHERE slug = 'porto-montenegro'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'adriatic-yacht-care'), (SELECT id FROM locations WHERE slug = 'kotor-marina'), 15, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'boka-fresh-provisions'), (SELECT id FROM locations WHERE slug = 'porto-montenegro'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'boka-fresh-provisions'), (SELECT id FROM locations WHERE slug = 'kotor-marina'), 15, false),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'montelec-marine'), (SELECT id FROM locations WHERE slug = 'porto-montenegro'), 10, true),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'montelec-marine'), (SELECT id FROM locations WHERE slug = 'kotor-marina'), 15, false);


-- =============================================================================
-- 6. PROVIDER CERTIFICATIONS
-- =============================================================================
INSERT INTO provider_certifications (id, provider_id, name, issuer) VALUES
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'medtech-marine'), 'Volvo Penta Authorised Service Centre', 'Volvo Penta'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'medtech-marine'), 'Yanmar Marine Diesel Certified', 'Yanmar'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cymarine-electrics'), 'ABYC Marine Electrician', 'ABYC'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'cymarine-electrics'), 'MCA Tier 1 Electrical Certification', 'Maritime & Coastguard Agency'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'aquaclear-diving'), 'PADI Commercial Diver', 'PADI'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'aquaclear-diving'), 'IMCA Diving Division', 'International Marine Contractors Association'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'aegean-marine-rhodes'), 'Caterpillar Marine Certified', 'Caterpillar'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'aegean-marine-rhodes'), 'Cummins Marine Service', 'Cummins'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'poseidon-rigging'), 'Navtec Hydraulic Rigging Certified', 'Navtec'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'poseidon-rigging'), 'Selden Spar Authorised Rigger', 'Selden'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'ionian-dive-clean'), 'HSE Commercial Diving Certificate', 'UK HSE'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'crete-marine-electrical'), 'ABYC Marine Electrical Certification', 'ABYC'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'crete-marine-electrical'), 'Victron Energy Certified Installer', 'Victron Energy'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'genpower-marine'), 'Onan Marine Generator Certified', 'Cummins Onan'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'genpower-marine'), 'Fischer Panda Authorised Service', 'Fischer Panda'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bodrum-marine-workshop'), 'MTU Marine Engine Certified', 'MTU/Rolls-Royce'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'bodrum-marine-workshop'), 'MAN Marine Diesel Service', 'MAN Engines'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'lycian-coast-electrics'), 'Victron Energy Professional', 'Victron Energy'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'purewater-marine'), 'Spectra Watermakers Authorised Dealer', 'Spectra Watermakers'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'purewater-marine'), 'Village Marine Tec Certified', 'Village Marine Tec'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'porto-marine-eng'), 'MTU Authorised Service Centre', 'MTU/Rolls-Royce'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'porto-marine-eng'), 'Caterpillar Marine Certified', 'Caterpillar'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'porto-marine-eng'), 'MAN Marine Authorised Service', 'MAN Engines'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'adriatic-guard'), 'SIA Licensed Security Provider', 'Security Industry Authority'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'coolmarine-cyprus'), 'Isotherm Marine Refrigeration Certified', 'Isotherm'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'coolmarine-cyprus'), 'Frigoboat Authorised Service', 'Frigoboat'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'airmar-cooling'), 'Webasto Marine AC Certified', 'Webasto'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'airmar-cooling'), 'Climma HVAC Authorised Dealer', 'Climma'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'neorion-yacht-coatings'), 'Awlgrip Certified Applicator', 'AkzoNobel'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'neorion-yacht-coatings'), 'International Paints Approved', 'International/AkzoNobel'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'aegean-generator'), 'Northern Lights Generator Certified', 'Northern Lights'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'aegean-generator'), 'Kohler Marine Authorised Service', 'Kohler'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'hydromarine-greece'), 'Spectra Watermakers Authorised', 'Spectra Watermakers'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'hydromarine-greece'), 'Village Marine Tec Service Centre', 'Village Marine Tec'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'powermarine-cyprus'), 'Cummins Onan Marine Certified', 'Cummins Onan'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'powermarine-cyprus'), 'Kohler Marine Generator Service', 'Kohler'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'dodecanese-diving'), 'ADCI Commercial Diver', 'Association of Diving Contractors International'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'montelec-marine'), 'NMEA 2000 Certified Installer', 'NMEA'),
  (gen_random_uuid(), (SELECT id FROM providers WHERE slug = 'montelec-marine'), 'Czone Digital Switching Certified', 'Czone/Mastervolt');
