"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import type { Enquiry } from "@/lib/types";
import { format } from "@/lib/format";
import {
  CheckCircle,
  Phone,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  MessageSquare,
} from "lucide-react";

const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-yellow-100 text-yellow-700",
  Enrolled: "bg-green-100 text-green-700",
};

export default function EnquiriesTable({
  enquiries: initialEnquiries,
}: {
  enquiries: Enquiry[];
}) {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const filtered = enquiries.filter((e) => {
    const matchesSearch =
      e.parent_name.toLowerCase().includes(search.toLowerCase()) ||
      e.child_name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search);
    const matchesStatus =
      statusFilter === "all" || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (
    id: number,
    newStatus: Enquiry["status"]
  ) => {
    setUpdatingId(id);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("enquiries")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Search & Filter */}
      <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-2.5 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm bg-white appearance-none"
          >
            <option value="all">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Enrolled">Enrolled</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Table (Desktop) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Parent / Child
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Program
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((enquiry) => (
              <tr
                key={enquiry.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900 text-sm">
                    {enquiry.parent_name}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {enquiry.child_name}
                    {enquiry.child_age && ` (${enquiry.child_age})`}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-gray-900">{enquiry.email}</p>
                  <p className="text-xs text-gray-500">{enquiry.phone}</p>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-700">
                    {enquiry.preferred_program || "—"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {format.date(enquiry.created_at)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusColors[enquiry.status]
                    }`}
                  >
                    {enquiry.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <select
                      value={enquiry.status}
                      onChange={(e) =>
                        handleStatusChange(
                          enquiry.id,
                          e.target.value as Enquiry["status"]
                        )
                      }
                      disabled={updatingId === enquiry.id}
                      className="text-xs px-2 py-1.5 rounded-lg border border-gray-200 focus:border-primary-500 outline-none bg-white"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Enrolled">Enrolled</option>
                    </select>
                    <button
                      onClick={() =>
                        setExpandedId(
                          expandedId === enquiry.id ? null : enquiry.id
                        )
                      }
                      className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                      title="View details"
                    >
                      {expandedId === enquiry.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card View (Mobile) */}
      <div className="md:hidden divide-y divide-gray-100">
        {filtered.map((enquiry) => (
          <div key={enquiry.id} className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  {enquiry.parent_name}
                </p>
                <p className="text-gray-500 text-xs">
                  Child: {enquiry.child_name}
                  {enquiry.child_age && ` (${enquiry.child_age})`}
                </p>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  statusColors[enquiry.status]
                }`}
              >
                {enquiry.status}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
              <span>{enquiry.email}</span>
              <span>{enquiry.phone}</span>
              {enquiry.preferred_program && <span>{enquiry.preferred_program}</span>}
              <span>{format.date(enquiry.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={enquiry.status}
                onChange={(e) =>
                  handleStatusChange(
                    enquiry.id,
                    e.target.value as Enquiry["status"]
                  )
                }
                disabled={updatingId === enquiry.id}
                className="text-xs px-2 py-1.5 rounded-lg border border-gray-200 focus:border-primary-500 outline-none bg-white"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Enrolled">Enrolled</option>
              </select>
              <button
                onClick={() =>
                  setExpandedId(
                    expandedId === enquiry.id ? null : enquiry.id
                  )
                }
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                {expandedId === enquiry.id ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>
            {expandedId === enquiry.id && enquiry.comments && (
              <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                <p className="font-medium text-xs text-gray-500 mb-1">
                  Comments:
                </p>
                {enquiry.comments}
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="font-medium">No enquiries found</p>
          <p className="text-sm">
            {search || statusFilter !== "all"
              ? "Try adjusting your search or filters"
              : "Parent enquiries will appear here once submitted"}
          </p>
        </div>
      )}
    </div>
  );
}
