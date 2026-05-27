import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();

    // Use admin client (bypasses RLS) to reliably check if a super admin exists
    const supabaseAdmin = createAdminClient();
    const { data: existingSuperAdmins, error: checkError } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("role", "super_admin")
      .eq("is_approved", true)
      .limit(1);

    if (checkError) {
      return NextResponse.json(
        { error: "Failed to check existing admins." },
        { status: 500 }
      );
    }

    if (existingSuperAdmins && existingSuperAdmins.length > 0) {
      return NextResponse.json(
        { error: "A super admin already exists. Setup can only be used once." },
        { status: 400 }
      );
    }

    const { email, password, fullName } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    // Create the user in Supabase Auth with auto-confirm by calling signUp
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || "Super Admin",
        },
      },
    });

    if (signUpError) {
      return NextResponse.json(
        { error: signUpError.message },
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: "Failed to create user account." },
        { status: 500 }
      );
    }

    // Call the setup_super_admin RPC function (SECURITY DEFINER, bypasses RLS)
    const { error: setupError } = await supabase.rpc("setup_super_admin", {
      target_user_id: authData.user.id,
      target_email: email,
      target_name: fullName || "Super Admin",
    });

    if (setupError) {
      // If the RPC call failed, use admin client as fallback (bypasses RLS)
      const { error: updateError } = await supabaseAdmin
        .from("profiles")
        .update({ role: "super_admin", is_approved: true, full_name: fullName || "Super Admin" })
        .eq("id", authData.user.id);

      if (updateError) {
        return NextResponse.json(
          {
            error:
              "Account created but couldn't set admin role. Please run the SQL from schema.sql in Supabase first.",
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message:
        "Super Admin account created successfully! You can now log in at /admin/login with your email and password.",
      loginUrl: "/admin/login",
      email: email,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "An unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}
