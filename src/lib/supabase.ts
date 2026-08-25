// @/lib/supabase.ts

import 'server-only'
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

if (!SUPABASE_URL) { throw new Error("SUPABASE_URL is not defined"); }
if (!SUPABASE_SECRET_KEY) { throw new Error("SUPABASE_SECRET_KEY is not defined"); }

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SECRET_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  },
);
