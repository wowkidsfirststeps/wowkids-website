import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { redirect } from "next/navigation";
import UsersManagement from "./UsersManagement";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const supabase = await createServerSupabaseClient();
  const supabaseAdmin = createAdminClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Use admin client (bypasses RLS) to check if current user is super_admin
  const { data: currentProfile } = await supabaseAdmin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!currentProfile || currentProfile.role !== "super_admin") {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Access Restricted
        </h2>
        <p className="text-gray-500">
          Only Super Admins can access the User Management page.
        </p>
      </div>
    );
  }

  // Fetch all profiles (using admin client to bypass RLS)
  const { data: profiles } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          User Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage admin accounts — approve, reject, or create new admins.
        </p>
      </div>
      <UsersManagement profiles={profiles || []} currentUserId={user.id} />
    </div>
  );
}
