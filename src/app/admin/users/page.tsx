import { createServerSupabaseClient } from "@/lib/supabase-server";
import UsersManagement from "./UsersManagement";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const supabase = await createServerSupabaseClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get all profiles
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load users: {error.message}</p>
      </div>
    );
  }

  return <UsersManagement profiles={profiles || []} currentUserId={user?.id || ""} />;
}
