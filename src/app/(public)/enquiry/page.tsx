"use client";

import { useState, FormEvent } from "react";
import { createClient } from "@/lib/supabase";
import { CheckCircle, Loader2, Send, School } from "lucide-react";
import Link from "next/link";

const programs = ["Playgroup", "Pre-Primary", "Day-Care", "Not Sure Yet"];

export default function EnquiryPage() {
  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    childAge: "",
    childDob: "",
    email: "",
    phone: "",
    preferredProgram: "",
    comments: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: submitError } = await supabase.from("enquiries").insert({
        parent_name: formData.parentName,
        child_name: formData.childName,
        child_age: formData.childAge || null,
        child_dob: formData.childDob || null,
        email: formData.email,
        phone: formData.phone,
        preferred_program: formData.preferredProgram || null,
        comments: formData.comments || null,
      });

      if (submitError) throw submitError;

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-16">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You! 🎉
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Your enquiry has been received successfully.
          </p>
          <p className="text-gray-500 mb-8">
            We&apos;ll get back to you within 24 hours. In the meantime, feel free to
            explore more about WowKids First Steps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold border-2 border-primary-200 hover:border-primary-400 transition-colors"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <School className="w-4 h-4" />
            Admissions Open
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Enquire Now
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Fill out the form below and our team will get in touch with you to discuss
            the best program for your child.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm space-y-6"
          >
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Parent Name */}
            <div>
              <label
                htmlFor="parentName"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Parent Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                required
                value={formData.parentName}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
              />
            </div>

            {/* Child Name */}
            <div>
              <label
                htmlFor="childName"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Child&apos;s Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="childName"
                name="childName"
                required
                value={formData.childName}
                onChange={handleChange}
                placeholder="Your child's full name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
              />
            </div>

            {/* Child Age & DOB */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="childAge"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Child&apos;s Age
                </label>
                <input
                  type="text"
                  id="childAge"
                  name="childAge"
                  value={formData.childAge}
                  onChange={handleChange}
                  placeholder="e.g. 2.5 years"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="childDob"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="childDob"
                  name="childDob"
                  value={formData.childDob}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91-XXXXXXXXXX"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Preferred Program */}
            <div>
              <label
                htmlFor="preferredProgram"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Preferred Program
              </label>
              <select
                id="preferredProgram"
                name="preferredProgram"
                value={formData.preferredProgram}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm bg-white"
              >
                <option value="">Select a program...</option>
                {programs.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Comments */}
            <div>
              <label
                htmlFor="comments"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Comments / Questions
              </label>
              <textarea
                id="comments"
                name="comments"
                rows={4}
                value={formData.comments}
                onChange={handleChange}
                placeholder="Any specific questions or special requirements..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 bg-primary-500 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Enquiry
                </>
              )}
            </button>

            <p className="text-xs text-gray-400 text-center">
              Your information is secure and will only be used to process your enquiry.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
