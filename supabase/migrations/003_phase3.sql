-- Migration 003: Phase 3 — Contact masking, vessel dimensions, marina enrichment
-- Safe to run multiple times (uses ADD COLUMN IF NOT EXISTS throughout)

-- ============================================================================
-- 1. Message type column
-- ============================================================================
ALTER TABLE messages
  ADD COLUMN IF NOT EXISTS message_type text DEFAULT 'text'
    CHECK (message_type IN ('text', 'system', 'attachment'));

-- ============================================================================
-- 2. Seasonal availability on providers
-- ============================================================================
ALTER TABLE providers
  ADD COLUMN IF NOT EXISTS seasonal_hours jsonb,
  ADD COLUMN IF NOT EXISTS seasonal_notes text;

-- ============================================================================
-- 3. Vessel dimensions
-- ============================================================================
ALTER TABLE vessels
  ADD COLUMN IF NOT EXISTS draft_meters decimal(4,1),
  ADD COLUMN IF NOT EXISTS beam_meters decimal(4,1),
  ADD COLUMN IF NOT EXISTS mast_height_meters decimal(4,1),
  ADD COLUMN IF NOT EXISTS tonnage decimal(7,1),
  ADD COLUMN IF NOT EXISTS hull_material text CHECK (hull_material IN ('fiberglass','steel','aluminum','wood','carbon','other')),
  ADD COLUMN IF NOT EXISTS propulsion text CHECK (propulsion IN ('sail','single_engine','twin_engine','other'));

-- ============================================================================
-- 4. Marina enrichment on locations
-- ============================================================================
ALTER TABLE locations
  ADD COLUMN IF NOT EXISTS vhf_channel text,
  ADD COLUMN IF NOT EXISTS max_draft_meters decimal(4,1),
  ADD COLUMN IF NOT EXISTS max_loa_meters decimal(5,1),
  ADD COLUMN IF NOT EXISTS approach_depth_meters decimal(4,1),
  ADD COLUMN IF NOT EXISTS max_beam_meters decimal(4,1),
  ADD COLUMN IF NOT EXISTS berth_count int,
  ADD COLUMN IF NOT EXISTS fuel_types text[],
  ADD COLUMN IF NOT EXISTS approach_notes text;

-- ============================================================================
-- 5. Vessel type relevance on service_categories
-- ============================================================================
ALTER TABLE service_categories
  ADD COLUMN IF NOT EXISTS vessel_types text[] DEFAULT '{}';

-- ============================================================================
-- 6. Port-specific reviews
-- ============================================================================
ALTER TABLE reviews
  ADD COLUMN IF NOT EXISTS location_id uuid REFERENCES locations(id);

-- ============================================================================
-- 7. Contact masking function
-- ============================================================================
CREATE OR REPLACE FUNCTION get_provider_public(p_slug text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_provider_id uuid;
  v_provider_user_id uuid;
  v_caller_id uuid;
  v_has_accepted_quote boolean := false;
  v_is_own_profile boolean := false;
  v_result jsonb;
BEGIN
  v_caller_id := auth.uid();

  SELECT id, user_id INTO v_provider_id, v_provider_user_id
  FROM providers WHERE slug = p_slug;

  IF v_provider_id IS NULL THEN
    RETURN NULL;
  END IF;

  -- Check if viewing own profile
  IF v_caller_id IS NOT NULL AND v_provider_user_id = v_caller_id THEN
    v_is_own_profile := true;
  END IF;

  -- Check if caller has an accepted quote with this provider
  IF v_caller_id IS NOT NULL AND NOT v_is_own_profile THEN
    SELECT EXISTS(
      SELECT 1 FROM quotes q
      JOIN service_requests sr ON sr.id = q.request_id
      WHERE q.provider_id = v_provider_id
        AND q.status = 'accepted'
        AND sr.user_id = v_caller_id
    ) INTO v_has_accepted_quote;
  END IF;

  SELECT jsonb_build_object(
    'id', p.id,
    'business_name', p.business_name,
    'slug', p.slug,
    'description', p.description,
    'logo_url', p.logo_url,
    'cover_image_url', p.cover_image_url,
    'languages', p.languages,
    'founded_year', p.founded_year,
    'team_size', p.team_size,
    'verification_status', p.verification_status,
    'availability', p.availability,
    'emergency_available', p.emergency_available,
    'seasonal_hours', p.seasonal_hours,
    'seasonal_notes', p.seasonal_notes,
    'avg_rating', p.avg_rating,
    'total_reviews', p.total_reviews,
    'total_jobs', p.total_jobs,
    'reliability_score', p.reliability_score,
    'response_rate', p.response_rate,
    'avg_response_time_minutes', p.avg_response_time_minutes,
    'completion_rate', p.completion_rate,
    'cancellation_rate', p.cancellation_rate,
    'created_at', p.created_at,
    'contact_unlocked', (v_is_own_profile OR v_has_accepted_quote),
    'email', CASE WHEN (v_is_own_profile OR v_has_accepted_quote) THEN p.email ELSE NULL END,
    'phone', CASE WHEN (v_is_own_profile OR v_has_accepted_quote) THEN p.phone ELSE NULL END,
    'whatsapp', CASE WHEN (v_is_own_profile OR v_has_accepted_quote) THEN p.whatsapp ELSE NULL END,
    'website', CASE WHEN (v_is_own_profile OR v_has_accepted_quote) THEN p.website ELSE NULL END
  ) INTO v_result
  FROM providers p WHERE p.id = v_provider_id;

  RETURN v_result;
END;
$$;

-- ============================================================================
-- 8. Update Cyprus marina data with real VHF channels and dimensions
-- ============================================================================
UPDATE locations SET
  vhf_channel = 'VHF 09',
  max_draft_meters = 6.0,
  max_loa_meters = 115.0,
  approach_depth_meters = 8.0,
  max_beam_meters = 22.0,
  berth_count = 650,
  fuel_types = ARRAY['diesel','petrol']
WHERE name ILIKE '%limassol marina%';

UPDATE locations SET
  vhf_channel = 'VHF 16/11',
  max_draft_meters = 3.5,
  max_loa_meters = 40.0,
  approach_depth_meters = 4.0,
  max_beam_meters = 10.0,
  berth_count = 450,
  fuel_types = ARRAY['diesel','petrol']
WHERE name ILIKE '%larnaca marina%';

UPDATE locations SET
  vhf_channel = 'VHF 16',
  max_draft_meters = 3.0,
  max_loa_meters = 25.0,
  approach_depth_meters = 3.5,
  max_beam_meters = 8.0,
  berth_count = 80,
  fuel_types = ARRAY['diesel']
WHERE name ILIKE '%paphos%';

UPDATE locations SET
  vhf_channel = 'VHF 16',
  max_draft_meters = 3.0,
  max_loa_meters = 20.0,
  approach_depth_meters = 3.0,
  max_beam_meters = 7.0,
  berth_count = 120,
  fuel_types = ARRAY['diesel']
WHERE name ILIKE '%latchi%';

UPDATE locations SET
  vhf_channel = 'VHF 16/09',
  max_draft_meters = 4.0,
  max_loa_meters = 60.0,
  approach_depth_meters = 5.0,
  max_beam_meters = 14.0,
  berth_count = 200,
  fuel_types = ARRAY['diesel','petrol']
WHERE name ILIKE '%ayia napa%';
