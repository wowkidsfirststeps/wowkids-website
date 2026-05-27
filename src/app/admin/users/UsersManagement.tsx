"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import type { Profile } from "@/lib/types";
import { Shield, CheckCircle, XCircle, UserPlus, Loader2 } from "lucide-react";

interface UsersManagementProps {
  profiles: Profile[];
  currentUserId: string;
}

export default function UsersManagement({
  profiles: initialProfiles,
  currentUserId,
}: UsersManagementProps) {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState("");

  const pendingApprovals = profiles.filter(
    (p) => !p.is_approved && p.id !== currentUserId
  );
  const approvedAdmins = profiles.filter(
    (p) => p.is_approved && p.id !== currentUserId
  );

  const handleApprove = async (profileId: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({ is_approved: true })
      .eq("id", profileId);

    if (!error) {
      setProfiles((prev) =>
        prev.map((p) =>
          p.id === profileId ? { ...p, is_approved: true } : p
        )
      );
    }
  };

  const handleReject = async (profileId: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", profileId);

    if (!error) {
      setProfiles((prev) => prev.filter((p) => p.id !== profileId));
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    setAddError("");

    try {
      const supabase = createClient();

      // Sign up the user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: newEmail,
        password: newPassword,
        options: {
          data: {
            full_name: newName,
          },
        },
      });

      if (signUpError) throw new Error(signUpError.message);

      if (!data.user) throw new Error("Failed to create user");

      setShowAddForm(false);
      setNewEmail("");
      setNewPassword("");
      setNewName("");

      // Refresh the page to show new user
      window.location.reload();
    } catch (err) {
      setAddError(
        err instanceof Error ? err.message : "Failed to create admin account."
      );
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Manage Users
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Approve pending admin sign-ups and manage admin accounts.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-primary-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-600 transition-all shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          {showAddForm ? "Cancel" : "Add Admin"}
        </button>
      </div>

      {/* Add Admin Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Create New Admin Account</h3>
          <form onSubmit={handleCreateAdmin} className="space-y-4 max-w-md">
            {addError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {addError}
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
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Temporary Password
              </label>
              <input
                type="text"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={adding}
              className="flex items-center gap-2 bg-primary-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-600 disabled:opacity-50 transition-all"
            >
              {adding ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <UserPlus className="w-4 h-4" />
              )}
              {adding ? "Creating..." : "Create Admin Account"}
            </button>
          </form>
        </div>
      )}

      {/* Pending Approvals */}
      {pendingApprovals.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-yellow-500" />
            Pending Approvals ({pendingApprovals.length})
          </h2>
          <div className="space-y-2">
            {pendingApprovals.map((profile) => (
              <div
                key={profile.id}
                className="bg-white rounded-xl border border-yellow-200 p-4 flex items-center justify-between shadow-sm"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {profile.full_name || "Unnamed"}
                  </p>
                  <p className="text-sm text-gray-500">{profile.email}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(profile.id)}
                    className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors border border-green-200"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(profile.id)}
                    className="flex items-center gap-1 bg-red-50 text-red-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors border border-red-200"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved Admins */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Active Admins ({approvedAdmins.length})
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Email</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Role</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {approvedAdmins.map((profile) => (
                <tr key={profile.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {profile.full_name || "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{profile.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                        profile.role === "super_admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <Shield className="w-3 h-3" />
                      {profile.role.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {new Date(profile.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
              {approvedAdmins.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                    No active admins yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
