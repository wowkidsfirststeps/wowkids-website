"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import type { Profile } from "@/lib/types";
import { format } from "@/lib/format";
import {
  CheckCircle,
  XCircle,
  Shield,
  ShieldAlert,
  UserPlus,
  Loader2,
  UserCheck,
  UserX,
} from "lucide-react";

export default function UsersManagement({
  profiles: initialProfiles,
  currentUserId,
}: {
  profiles: Profile[];
  currentUserId: string;
}) {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [createLoading, setCreateLoading] = useState(false);

  const handleApprove = async (profileId: string) => {
    setActionLoading(`approve-${profileId}`);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("profiles")
        .update({ is_approved: true })
        .eq("id", profileId);

      if (error) throw error;

      setProfiles((prev) =>
        prev.map((p) =>
          p.id === profileId ? { ...p, is_approved: true } : p
        )
      );
    } catch (err) {
      console.error("Failed to approve user:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (profileId: string) => {
    setActionLoading(`reject-${profileId}`);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("profiles")
        .update({ is_approved: false })
        .eq("id", profileId);

      if (error) throw error;

      setProfiles((prev) =>
        prev.map((p) =>
          p.id === profileId ? { ...p, is_approved: false } : p
        )
      );
    } catch (err) {
      console.error("Failed to reject user:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateLoading(true);
    setError("");

    try {
      const res = await fetch("/api/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newEmail,
          password: newPassword,
          fullName: newName || "Admin",
          createAsAdmin: true, // Signal to create as regular admin, not super_admin
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create admin");
      }

      // Refresh the page to see the new user
      window.location.reload();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create admin account."
      );
    } finally {
      setCreateLoading(false);
    }
  };

  const pendingProfiles = profiles.filter((p) => !p.is_approved);
  const approvedProfiles = profiles.filter((p) => p.is_approved);

  return (
    <div className="space-y-8">
      {/* Create New Admin Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2 bg-primary-500 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-primary-600 transition-colors text-sm"
        >
          <UserPlus className="w-4 h-4" />
          {showCreateForm ? "Cancel" : "Create New Admin"}
        </button>
      </div>

      {/* Create Admin Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Create New Admin Account
          </h3>
          <form onSubmit={handleCreateAdmin} className="space-y-4 max-w-md">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                placeholder="e.g. Jane Doe"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
                placeholder="admin@wowkids.com"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                placeholder="At least 8 characters"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={createLoading}
              className="flex items-center gap-2 bg-primary-500 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-primary-600 disabled:opacity-50 transition-colors text-sm"
            >
              {createLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <UserPlus className="w-4 h-4" />
              )}
              {createLoading ? "Creating..." : "Create Admin"}
            </button>
          </form>
        </div>
      )}

      {/* Pending Approvals */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-yellow-500" />
          Pending Approvals
          {pendingProfiles.length > 0 && (
            <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-2 py-0.5 rounded-full">
              {pendingProfiles.length}
            </span>
          )}
        </h2>
        {pendingProfiles.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-gray-500 text-sm">
            No pending admin approvals.
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Name / Email
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pendingProfiles.map((profile) => (
                  <tr key={profile.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-sm text-gray-900">
                        {profile.full_name || "—"}
                      </p>
                      <p className="text-xs text-gray-500">{profile.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                        <ShieldAlert className="w-3 h-3" />
                        {profile.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {format.date(profile.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApprove(profile.id)}
                          disabled={
                            actionLoading === `approve-${profile.id}` ||
                            actionLoading === `reject-${profile.id}`
                          }
                          className="flex items-center gap-1 text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-100 disabled:opacity-50 transition-colors"
                        >
                          {actionLoading === `approve-${profile.id}` ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <CheckCircle className="w-3 h-3" />
                          )}
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(profile.id)}
                          disabled={
                            actionLoading === `approve-${profile.id}` ||
                            actionLoading === `reject-${profile.id}`
                          }
                          className="flex items-center gap-1 text-xs bg-red-50 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-100 disabled:opacity-50 transition-colors"
                        >
                          {actionLoading === `reject-${profile.id}` ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Approved Admins */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary-500" />
          Approved Admins
        </h2>
        {approvedProfiles.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-gray-500 text-sm">
            No approved admins yet.
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Name / Email
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {approvedProfiles.map((profile) => (
                  <tr key={profile.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm text-gray-900">
                          {profile.full_name || "—"}
                        </p>
                        {profile.id === currentUserId && (
                          <span className="text-xs text-primary-600 font-medium">
                            (You)
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{profile.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                          profile.role === "super_admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {profile.role === "super_admin" ? (
                          <Shield className="w-3 h-3" />
                        ) : (
                          <UserCheck className="w-3 h-3" />
                        )}
                        {profile.role === "super_admin"
                          ? "Super Admin"
                          : "Admin"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {format.date(profile.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle className="w-3 h-3" />
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
