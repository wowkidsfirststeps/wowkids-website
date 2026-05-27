import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();

    // Check if any super admin already exists
    const { data: existingSuperAdmins, error: checkError } = await supabase
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

    // Wait a moment for the trigger to create the profile, then call the setup function
    // The trigger will create a basic profile, and the setup function will upgrade it
    const { error: setupError } = await supabase.rpc("setup_super_admin", {
      target_user_id: authData.user.id,
      target_email: email,
      target_name: fullName || "Super Admin",
    });

    if (setupError) {
      // If the RPC call failed (e.g., the function doesn't exist yet),
      // try direct update as fallback
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ role: "super_admin", is_approved: true })
        .eq("id", authData.user.id);

      if (updateError) {
        return NextResponse.json(
          {
            error:
              "Account created but couldn't set admin role. Please run the SQL update from the deployment guide manually.",
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message:
        "Super Admin account created successfully! You can now log in at /admin/login with your email and password.",
      credentials: {
        loginUrl: "/admin/login",
        email: email,
        note: "Please save these credentials securely.",
      },
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
