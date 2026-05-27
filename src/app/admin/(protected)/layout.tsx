import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
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

  // Get the user's profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, is_approved")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.is_approved) {
    // Not approved or no profile - sign them out
    await supabase.auth.signOut();
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <AdminSidebar
        userRole={profile.role}
        userEmail={user.email}
      />
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
