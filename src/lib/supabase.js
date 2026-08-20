import { createClient } from "@supabase/supabase-js";

// Vite exposes only variables prefixed with VITE_.
// Normalize the URL so accidental spaces/quotes don't crash the whole app.
const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const url = typeof rawUrl === "string"
  ? rawUrl.trim().replace(/^['\"]|['\"]$/g, "")
  : "";

const anonKey = typeof rawAnonKey === "string"
  ? rawAnonKey.trim().replace(/^['\"]|['\"]$/g, "")
  : "";

const validSupabaseUrl = /^https?:\/\/[^\s/]+(?:\/[^\s]*)?$/i.test(url);

export const supabase = validSupabaseUrl && anonKey
  ? createClient(url, anonKey)
  : null;

if (!supabase && import.meta.env.DEV) {
  console.warn(
    "Supabase is not connected. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
  );
}
