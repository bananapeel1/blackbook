-- Phase 3 Expert Features Migration
-- Run this in Supabase SQL Editor

-- 1. Provider capacity signals
ALTER TABLE providers ADD COLUMN IF NOT EXISTS capacity_status text
  CHECK (capacity_status IN ('available','busy_accepting','full','emergency_only'))
  DEFAULT 'available';
ALTER TABLE providers ADD COLUMN IF NOT EXISTS available_from date;
ALTER TABLE providers ADD COLUMN IF NOT EXISTS max_concurrent_jobs int DEFAULT 5;

-- 2. Emergency broadcast flag on requests
ALTER TABLE service_requests ADD COLUMN IF NOT EXISTS is_emergency_broadcast boolean DEFAULT false;

-- 3. Bulk request linking (charter skipper turnaround)
ALTER TABLE service_requests ADD COLUMN IF NOT EXISTS parent_request_id uuid REFERENCES service_requests(id);

-- 4. Seasonal availability table
CREATE TABLE IF NOT EXISTS provider_seasonal_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid REFERENCES providers(id) ON DELETE CASCADE,
  location_id uuid REFERENCES locations(id),
  start_date date NOT NULL,
  end_date date NOT NULL,
  status text CHECK (status IN ('available','restricted','closed')) DEFAULT 'available',
  emergency_only boolean DEFAULT false,
  notes text,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_seasonal_avail ON provider_seasonal_availability(provider_id, start_date, end_date);
ALTER TABLE provider_seasonal_availability ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'provider_seasonal_availability' AND policyname = 'Public read seasonal') THEN
    CREATE POLICY "Public read seasonal" ON provider_seasonal_availability FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'provider_seasonal_availability' AND policyname = 'Provider manages own seasonal') THEN
    CREATE POLICY "Provider manages own seasonal" ON provider_seasonal_availability FOR ALL
      USING (provider_id IN (SELECT id FROM providers WHERE user_id = auth.uid()));
  END IF;
END $$;

-- 5. Messages update policy (mark as read)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'messages' AND policyname = 'Participants can update messages') THEN
    CREATE POLICY "Participants can update messages" ON messages FOR UPDATE
      USING (conversation_id IN (
        SELECT id FROM conversations WHERE participant_1 = auth.uid() OR participant_2 = auth.uid()
      ));
  END IF;
END $$;
