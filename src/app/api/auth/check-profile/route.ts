import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const supabaseAdmin = createAdminClient();

    // Use the admin client (bypasses RLS) to look up the profile by email
    const { data: profiles, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("id, email, full_name, role, is_approved")
      .eq("email", email)
      .limit(1);

    if (profileError) {
      console.error("Profile query error:", JSON.stringify(profileError));
      return NextResponse.json(
        {
          error: "Database error while looking up your account.",
          details: profileError.message,
        },
        { status: 500 }
      );
    }

    if (!profiles || profiles.length === 0) {
      return NextResponse.json(
        {
          error: "Your admin account hasn't been fully set up yet.",
          hint: "Please visit /admin/setup to create your account.",
          needsSetup: true,
        },
        { status: 404 }
      );
    }

    const profile = profiles[0];

    return NextResponse.json({
      profile: {
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        role: profile.role,
        is_approved: profile.is_approved,
      },
    });
  } catch (err) {
    console.error("Check-profile error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
