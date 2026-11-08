/**
 * Supabase client for the Movocco Android pilot (Level A).
 *
 * SECURITY RULES (from the product spec §16):
 * - Configuration comes from environment variables ONLY (EXPO_PUBLIC_*).
 * - NEVER commit a key. NEVER put a service-role key in the app.
 * - Only the public anon key may ever be used in the app; all privileged
 *   access must be enforced server-side by Row Level Security.
 *
 * STATUS: the movocco Supabase project exists (Paris) and the database
 * schema is applied. With the env vars unset this module exports
 * `supabase === null` and `status === 'not-configured'`, and the app runs
 * on the clearly labelled DEMO dataset only. The vars reach the build as
 * GitHub Actions repo secrets (EXPO_PUBLIC_SUPABASE_URL,
 * EXPO_PUBLIC_SUPABASE_ANON_KEY).
 */
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export type SupabaseStatus = 'not-configured' | 'ready' | 'error';

function readEnv(): { url: string; anonKey: string } | null {
  const url = (process.env.EXPO_PUBLIC_SUPABASE_URL ?? '').trim();
  const anonKey = (process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '').trim();
  if (url === '' || anonKey === '') return null;
  return { url, anonKey };
}

let client: SupabaseClient | null = null;
let status: SupabaseStatus = 'not-configured';

const env = readEnv();
if (env !== null) {
  try {
    // The anon key is public by design; RLS on the database enforces access.
    // A service-role key must NEVER be used here.
    client = createClient(env.url, env.anonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });
    status = 'ready';
  } catch {
    client = null;
    status = 'error';
  }
}

export const supabase: SupabaseClient | null = client;
export const supabaseStatus: SupabaseStatus = status;
