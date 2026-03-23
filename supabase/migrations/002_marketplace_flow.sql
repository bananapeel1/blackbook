-- ============================================
-- MIGRATION 002: Marketplace Flow
-- Fixes critical bugs, adds marketplace tables and functions
-- ============================================

-- ============================================
-- A. FIX: handle_new_user() - copy role from signup metadata
-- Previously only copied full_name and avatar_url, ignoring role
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, role, full_name, avatar_url)
  VALUES (
    new.id,
    CASE
      WHEN new.raw_user_meta_data->>'role' = 'service_provider' THEN 'provider'::user_role
      ELSE 'boat_owner'::user_role
    END,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );

  -- Auto-link provider account if email matches an existing provider
  IF new.raw_user_meta_data->>'role' = 'service_provider' THEN
    UPDATE providers
    SET user_id = new.id
    WHERE email = new.email
      AND user_id IS NULL;
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- B. FIX: Tighten provider request matching RLS
-- Now checks BOTH location coverage AND service category
-- ============================================

DROP POLICY IF EXISTS "Providers can read matching requests" ON service_requests;

CREATE POLICY "Providers can read matching requests" ON service_requests FOR SELECT USING (
  status IN ('submitted', 'collecting_quotes') AND
  EXISTS (
    SELECT 1 FROM providers p
    JOIN provider_coverage pc ON pc.provider_id = p.id
    JOIN provider_services ps ON ps.provider_id = p.id
    WHERE p.user_id = auth.uid()
      AND pc.location_id = service_requests.location_id
      AND (service_requests.category_id IS NULL OR ps.category_id = service_requests.category_id)
  )
);

-- ============================================
-- C. NOTIFICATIONS TABLE
-- ============================================

CREATE TABLE notifications (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('new_request', 'new_quote', 'quote_accepted', 'quote_declined', 'new_message')),
  title text NOT NULL,
  body text,
  data jsonb DEFAULT '{}',
  read_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

CREATE INDEX idx_notifications_user_unread ON notifications (user_id, created_at DESC) WHERE read_at IS NULL;

-- ============================================
-- D. PROVIDER APPLICATIONS TABLE
-- ============================================

CREATE TABLE provider_applications (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  email text NOT NULL,
  business_name text NOT NULL,
  service_type text,
  primary_port text,
  phone text,
  message text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  user_id uuid REFERENCES profiles(id),
  provider_id uuid REFERENCES providers(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE provider_applications ENABLE ROW LEVEL SECURITY;
-- Anyone can submit an application (even unauthenticated via service role)
CREATE POLICY "Anyone can insert applications" ON provider_applications FOR INSERT WITH CHECK (true);
-- Users can read their own applications
CREATE POLICY "Users can read own applications" ON provider_applications FOR SELECT USING (
  auth.uid() = user_id OR email = (SELECT email FROM auth.users WHERE id = auth.uid())
);

-- ============================================
-- E. ANALYTICS EVENTS TABLE
-- ============================================

CREATE TABLE analytics_events (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_name text NOT NULL,
  user_id uuid REFERENCES profiles(id),
  provider_id uuid,
  request_id uuid,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
-- No direct read/write via client - use functions only

CREATE INDEX idx_analytics_event_name ON analytics_events (event_name, created_at DESC);

-- Function to track events (callable from client)
CREATE OR REPLACE FUNCTION track_event(
  p_event_name text,
  p_metadata jsonb DEFAULT '{}',
  p_provider_id uuid DEFAULT NULL,
  p_request_id uuid DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  INSERT INTO analytics_events (event_name, user_id, provider_id, request_id, metadata)
  VALUES (p_event_name, auth.uid(), p_provider_id, p_request_id, p_metadata);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- F. SUBMIT QUOTE FUNCTION
-- Atomically: insert quote, update request status, notify owner
-- ============================================

CREATE OR REPLACE FUNCTION submit_quote(
  p_request_id uuid,
  p_provider_id uuid,
  p_amount decimal,
  p_currency text DEFAULT 'EUR',
  p_description text DEFAULT NULL,
  p_estimated_duration text DEFAULT NULL,
  p_warranty_months int DEFAULT NULL,
  p_earliest_start text DEFAULT NULL
)
RETURNS uuid AS $$
DECLARE
  v_quote_id uuid;
  v_request_owner_id uuid;
  v_request_title text;
  v_provider_name text;
BEGIN
  -- Verify the provider belongs to the calling user
  IF NOT EXISTS (
    SELECT 1 FROM providers WHERE id = p_provider_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Not authorized to submit quotes for this provider';
  END IF;

  -- Get request info
  SELECT user_id, title INTO v_request_owner_id, v_request_title
  FROM service_requests WHERE id = p_request_id;

  IF v_request_owner_id IS NULL THEN
    RAISE EXCEPTION 'Request not found';
  END IF;

  -- Get provider name
  SELECT business_name INTO v_provider_name FROM providers WHERE id = p_provider_id;

  -- Insert the quote
  INSERT INTO quotes (request_id, provider_id, amount, currency, description, estimated_duration, warranty_months, earliest_start, status, expires_at)
  VALUES (p_request_id, p_provider_id, p_amount, p_currency, p_description, p_estimated_duration, p_warranty_months, p_earliest_start, 'sent', now() + interval '7 days')
  RETURNING id INTO v_quote_id;

  -- Update request status
  UPDATE service_requests
  SET status = 'collecting_quotes',
      matched_provider_count = matched_provider_count + 1
  WHERE id = p_request_id
    AND status IN ('submitted', 'collecting_quotes');

  -- Notify the request owner
  INSERT INTO notifications (user_id, type, title, body, data)
  VALUES (
    v_request_owner_id,
    'new_quote',
    'New quote received',
    v_provider_name || ' sent a quote for "' || v_request_title || '"',
    jsonb_build_object('request_id', p_request_id, 'quote_id', v_quote_id, 'provider_id', p_provider_id)
  );

  -- Track analytics
  INSERT INTO analytics_events (event_name, user_id, provider_id, request_id, metadata)
  VALUES ('quote_submitted', auth.uid(), p_provider_id, p_request_id, jsonb_build_object('amount', p_amount, 'currency', p_currency));

  RETURN v_quote_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- G. ACCEPT QUOTE FUNCTION
-- Atomically: accept quote, decline others, update request, create conversation, notify
-- ============================================

CREATE OR REPLACE FUNCTION accept_quote(p_quote_id uuid)
RETURNS uuid AS $$
DECLARE
  v_request_id uuid;
  v_provider_id uuid;
  v_provider_user_id uuid;
  v_request_owner_id uuid;
  v_request_title text;
  v_provider_name text;
  v_conversation_id uuid;
BEGIN
  -- Get quote details
  SELECT q.request_id, q.provider_id, p.user_id, sr.user_id, sr.title, p.business_name
  INTO v_request_id, v_provider_id, v_provider_user_id, v_request_owner_id, v_request_title, v_provider_name
  FROM quotes q
  JOIN providers p ON p.id = q.provider_id
  JOIN service_requests sr ON sr.id = q.request_id
  WHERE q.id = p_quote_id;

  -- Verify the caller owns the request
  IF v_request_owner_id != auth.uid() THEN
    RAISE EXCEPTION 'Not authorized to accept this quote';
  END IF;

  -- Accept the target quote
  UPDATE quotes SET status = 'accepted', accepted_at = now()
  WHERE id = p_quote_id;

  -- Decline all other quotes on same request
  UPDATE quotes SET status = 'declined'
  WHERE request_id = v_request_id AND id != p_quote_id AND status IN ('pending', 'sent');

  -- Update request status
  UPDATE service_requests SET status = 'accepted'
  WHERE id = v_request_id;

  -- Create conversation between owner and provider (if provider has a user account)
  IF v_provider_user_id IS NOT NULL THEN
    -- Check if conversation already exists
    SELECT id INTO v_conversation_id
    FROM conversations
    WHERE request_id = v_request_id
      AND ((participant_1 = v_request_owner_id AND participant_2 = v_provider_user_id)
        OR (participant_1 = v_provider_user_id AND participant_2 = v_request_owner_id));

    IF v_conversation_id IS NULL THEN
      INSERT INTO conversations (request_id, participant_1, participant_2)
      VALUES (v_request_id, v_request_owner_id, v_provider_user_id)
      RETURNING id INTO v_conversation_id;
    END IF;

    -- Notify provider
    INSERT INTO notifications (user_id, type, title, body, data)
    VALUES (
      v_provider_user_id,
      'quote_accepted',
      'Quote accepted!',
      'Your quote for "' || v_request_title || '" has been accepted',
      jsonb_build_object('request_id', v_request_id, 'quote_id', p_quote_id, 'conversation_id', v_conversation_id)
    );
  END IF;

  -- Notify declined providers
  INSERT INTO notifications (user_id, type, title, body, data)
  SELECT
    p.user_id,
    'quote_declined',
    'Quote not selected',
    'Another provider was selected for "' || v_request_title || '"',
    jsonb_build_object('request_id', v_request_id, 'quote_id', q.id)
  FROM quotes q
  JOIN providers p ON p.id = q.provider_id
  WHERE q.request_id = v_request_id
    AND q.id != p_quote_id
    AND q.status = 'declined'
    AND p.user_id IS NOT NULL;

  -- Track analytics
  INSERT INTO analytics_events (event_name, user_id, provider_id, request_id, metadata)
  VALUES ('quote_accepted', auth.uid(), v_provider_id, v_request_id, jsonb_build_object('quote_id', p_quote_id));

  RETURN v_conversation_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- H. MESSAGE TRIGGER
-- Auto-update conversation.last_message_at + notify recipient
-- ============================================

CREATE OR REPLACE FUNCTION on_message_created()
RETURNS trigger AS $$
DECLARE
  v_recipient_id uuid;
  v_sender_name text;
BEGIN
  -- Update conversation timestamp
  UPDATE conversations SET last_message_at = now()
  WHERE id = new.conversation_id;

  -- Find the recipient (the participant who is NOT the sender)
  SELECT CASE
    WHEN participant_1 = new.sender_id THEN participant_2
    ELSE participant_1
  END INTO v_recipient_id
  FROM conversations WHERE id = new.conversation_id;

  -- Get sender name
  SELECT full_name INTO v_sender_name FROM profiles WHERE id = new.sender_id;

  -- Notify recipient
  IF v_recipient_id IS NOT NULL THEN
    INSERT INTO notifications (user_id, type, title, body, data)
    VALUES (
      v_recipient_id,
      'new_message',
      'New message from ' || COALESCE(v_sender_name, 'Unknown'),
      LEFT(new.content, 100),
      jsonb_build_object('conversation_id', new.conversation_id, 'message_id', new.id)
    );
  END IF;

  -- Track analytics
  INSERT INTO analytics_events (event_name, user_id, request_id, metadata)
  VALUES ('message_sent', new.sender_id, (SELECT request_id FROM conversations WHERE id = new.conversation_id), jsonb_build_object('conversation_id', new.conversation_id));

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_message_created
  AFTER INSERT ON messages
  FOR EACH ROW EXECUTE FUNCTION on_message_created();

-- ============================================
-- I. ALLOW NOTIFICATIONS INSERT VIA FUNCTIONS
-- (needed because functions run as SECURITY DEFINER)
-- ============================================

-- Allow the system to insert notifications for any user
CREATE POLICY "System can insert notifications" ON notifications FOR INSERT WITH CHECK (true);

-- ============================================
-- J. ENABLE REALTIME FOR MESSAGES
-- ============================================

ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
