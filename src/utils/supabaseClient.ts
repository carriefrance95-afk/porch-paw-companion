import { createClient } from '@supabase/supabase-js';

// Try to grab Vite-prefixed keys or look for any injected fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// If the keys are missing, we export a safe dummy object so the entire website doesn't crash on startup
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : new Proxy({}, {
      get: () => {
        throw new Error("Supabase credentials are missing or could not be loaded by Vite. Please check your environment variables.");
      }
    }) as any;
