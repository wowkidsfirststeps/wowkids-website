"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { format } from "@/lib/format";
import type { Enquiry, EnquiryStatus } from "@/lib/types";
import { CheckCircle, Phone, Mail, Calendar, ChevronDown, Loader2 } from "lucide-react";

interface EnquiriesTableProps {
  enquiries: Enquiry[];
}

const statusColors: Record<EnquiryStatus, string> = {
  New: "bg-blue-100 text-blue-700 border-blue-200",
  Contacted: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Enrolled: "bg-green-100 text-green-700 border-green-200",
};

export default function EnquiriesTable({ enquiries: initialEnquiries }: EnquiriesTableProps) {
  const [enquiries, setEnquiries] = useState(initialEnquiries);

  const handleStatusChange = async (id: number, newStatus: EnquiryStatus) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("enquiries")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) {
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;

    const supabase = createClient();
    const { error } = await supabase.from("enquiries").delete().eq("id", id);

    if (!error) {
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  if (enquiries.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
        <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Enquiries Yet</h3>
        <p className="text-gray-500 text-sm">
          Parent enquiries will appear here once the website is live and parents start submitting the form.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Parent</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden sm:table-cell">Child</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">Contact</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden lg:table-cell">Program</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden lg:table-cell">Date</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Status</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {enquiries.map((enquiry) => (
              <tr
                key={enquiry.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{enquiry.parent_name}</p>
                  <p className="text-xs text-gray-500 sm:hidden">{enquiry.phone}</p>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <p className="text-gray-900">{enquiry.child_name}</p>
                  {enquiry.child_age && (
                    <p className="text-xs text-gray-500">Age: {enquiry.child_age}</p>
                  )}
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <div className="space-y-1">
                    <a
                      href={`tel:${enquiry.phone}`}
                      className="flex items-center gap-1 text-gray-600 hover:text-primary-600 text-xs"
                    >
                      <Phone className="w-3 h-3" />
                      {enquiry.phone}
                    </a>
                    <a
                      href={`mailto:${enquiry.email}`}
                      className="flex items-center gap-1 text-gray-600 hover:text-primary-600 text-xs"
                    >
                      <Mail className="w-3 h-3" />
                      {enquiry.email}
                    </a>
                  </div>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span className="text-gray-600">
                    {enquiry.preferred_program || "—"}
                  </span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span className="flex items-center gap-1 text-gray-500 text-xs">
                    <Calendar className="w-3 h-3" />
                    {format.date(enquiry.created_at)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <StatusDropdown
                    current={enquiry.status}
                    onChange={(s) => handleStatusChange(enquiry.id, s)}
                  />
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleDelete(enquiry.id)}
                    className="text-xs text-red-500 hover:text-red-700 hover:underline transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusDropdown({
  current,
  onChange,
}: {
  current: EnquiryStatus;
  onChange: (status: EnquiryStatus) => void;
}) {
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const options: EnquiryStatus[] = ["New", "Contacted", "Enrolled"];

  const handleSelect = async (status: EnquiryStatus) => {
    setOpen(false);
    setUpdating(true);
    await Promise.resolve(onChange(status));
    setUpdating(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        disabled={updating}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${statusColors[current]}`}
      >
        {updating ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : (
          <>
            {current}
            <ChevronDown className="w-3 h-3" />
          </>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1 min-w-[130px]">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`block w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-gray-50 transition-colors ${
                  option === current ? "text-primary-600 bg-primary-50" : "text-gray-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
