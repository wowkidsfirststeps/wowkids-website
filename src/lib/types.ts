export type EnquiryStatus = "New" | "Contacted" | "Enrolled";

export interface Enquiry {
  id: number;
  parent_name: string;
  child_name: string;
  child_dob: string | null;
  child_age: string | null;
  email: string;
  phone: string;
  preferred_program: string | null;
  comments: string | null;
  status: EnquiryStatus;
  created_at: string;
}

export type AdminRole = "super_admin" | "admin";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: AdminRole;
  is_approved: boolean;
  created_at: string;
}
