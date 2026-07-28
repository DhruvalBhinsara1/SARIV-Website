import { createClient } from "@supabase/supabase-js";

// We use the service role key on the server side to bypass RLS for admin operations
// For client-side read-only operations, we use the anon key if available, otherwise just use service role key for everything as a fallback since it's an admin-managed CMS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only create the client if we have valid credentials to prevent runtime crashes during dev
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey) 
  : null as any;
