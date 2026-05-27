import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import AdminSidebar from "@/components/AdminSidebar";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Use admin client (bypasses RLS) to check the user's profile
  const supabaseAdmin = createAdminClient();
  const { data: profiles, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("role, is_approved, email, full_name")
    .eq("id", user.id);

  if (profileError || !profiles || profiles.length === 0) {
    // No profile found - sign them out
    await supabase.auth.signOut();
    redirect("/admin/login");
  }

  const profile = profiles[0];

  if (!profile.is_approved) {
    // Not approved - sign them out
    await supabase.auth.signOut();
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <AdminSidebar
        userRole={profile.role}
        userEmail={profile.email || user.email}
      />
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
