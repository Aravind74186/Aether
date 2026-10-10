import { createClient, SupabaseClient } from "@supabase/supabase-js";

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Ensure URL is normalized to the base project root without trailing slashes or /rest/v1
const supabaseUrl = rawUrl?.trim().replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * Standard client instance for browser and public reads.
 * Respects Row Level Security (RLS) policies.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: false,
      },
    })
  : null;

/**
 * Privileged server-side client instance.
 * Uses the service_role key to bypass RLS for administrative operations (e.g. backend sync, lead triage).
 * MUST only be imported in server components, API routes, or server actions.
 */
export const supabaseAdmin: SupabaseClient | null =
  supabaseUrl && (supabaseServiceRoleKey || supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseServiceRoleKey || supabaseAnonKey!, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
    : null;

/**
 * Helper to test live Supabase database connectivity.
 */
export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  message: string;
}> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      connected: false,
      message: "Supabase environment variables are missing or incomplete in .env",
    };
  }

  try {
    const { error } = await supabase.from("posts").select("id").limit(1);
    if (error && error.code !== "PGRST116") {
      return {
        connected: false,
        message: error.message,
      };
    }
    return {
      connected: true,
      message: "Successfully connected to Supabase database.",
    };
  } catch (err: any) {
    return {
      connected: false,
      message: err.message || "Failed to establish connection to Supabase.",
    };
  }
}
