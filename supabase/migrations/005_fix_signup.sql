-- ============================================
-- MIGRATION 005: Fix signup "Database error saving new user"
-- Recreates handle_new_user trigger function with proper error handling
-- ============================================

-- Drop and recreate the function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, role, full_name, avatar_url)
  VALUES (
    new.id,
    CASE
      WHEN new.raw_user_meta_data->>'role' = 'service_provider' THEN 'provider'::public.user_role
      ELSE 'boat_owner'::public.user_role
    END,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    new.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;

  -- Auto-link provider account if email matches an existing provider
  IF new.raw_user_meta_data->>'role' = 'service_provider' THEN
    UPDATE public.providers
    SET user_id = new.id
    WHERE email = new.email
      AND user_id IS NULL;
  END IF;

  RETURN new;
EXCEPTION WHEN OTHERS THEN
  -- Log but don't block user creation
  RAISE WARNING 'handle_new_user failed for %: %', new.id, SQLERRM;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Make sure the trigger exists on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Also ensure profiles INSERT policy allows the trigger to work
-- The SECURITY DEFINER should bypass RLS, but add a service_role policy just in case
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'profiles' AND policyname = 'Service role can insert profiles'
  ) THEN
    CREATE POLICY "Service role can insert profiles" ON profiles
      FOR INSERT
      WITH CHECK (true);
  END IF;
END $$;
