import { createClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase admin client using the service_role key.
 * This bypasses all RLS policies and has full read/write access.
 * ONLY use this on the server side (API routes, server components).
 * NEVER expose this client or its results to the client directly
 * without proper authorization checks.
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase environment variables. " +
        "Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set."
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
