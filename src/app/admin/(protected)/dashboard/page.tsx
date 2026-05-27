import { createServerSupabaseClient } from "@/lib/supabase-server";
import EnquiriesTable from "./EnquiriesTable";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabaseClient();

  const { data: enquiries, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: userData } = await supabase.auth.getUser();
  const userEmail = userData.user?.email;

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load enquiries: {error.message}</p>
      </div>
    );
  }

  const stats = {
    total: enquiries?.length || 0,
    new: enquiries?.filter((e) => e.status === "New").length || 0,
    contacted: enquiries?.filter((e) => e.status === "Contacted").length || 0,
    enrolled: enquiries?.filter((e) => e.status === "Enrolled").length || 0,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome back! Here&apos;s an overview of all parent enquiries.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Enquiries"
          value={stats.total}
          color="bg-primary-500"
        />
        <StatCard
          label="New"
          value={stats.new}
          color="bg-blue-500"
        />
        <StatCard
          label="Contacted"
          value={stats.contacted}
          color="bg-yellow-500"
        />
        <StatCard
          label="Enrolled"
          value={stats.enrolled}
          color="bg-green-500"
        />
      </div>

      {/* Enquiries Table */}
      <EnquiriesTable enquiries={enquiries || []} />
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-3xl font-bold text-gray-900`}>{value}</p>
      <div className={`h-1 rounded-full ${color} mt-2 opacity-50`} />
    </div>
  );
}
