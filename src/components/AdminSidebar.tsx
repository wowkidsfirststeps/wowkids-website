"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessagesSquare,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  School,
} from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase";

interface AdminSidebarProps {
  userRole: string | null;
  userEmail?: string;
}

export default function AdminSidebar({ userRole, userEmail }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const isSuperAdmin = userRole === "super_admin";

  const handleLogout = async () => {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const navItems = [
    {
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
  ];

  if (isSuperAdmin) {
    navItems.push({
      href: "/admin/users",
      icon: Users,
      label: "Manage Users",
    });
  }

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${
          collapsed ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        onClick={() => setCollapsed(true)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-gray-900 text-white flex flex-col transition-all duration-300 ${
          collapsed ? "-translate-x-full lg:translate-x-0 lg:w-16" : "w-64 translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-800 flex items-center gap-3">
          <img
            src="/Logo.png"
            alt="WowKids"
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">WowKids</p>
              <p className="text-[10px] text-gray-400 truncate">Admin Panel</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary-500 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User info & logout */}
        <div className="p-3 border-t border-gray-800">
          {!collapsed && userEmail && (
            <p className="text-xs text-gray-500 truncate mb-2 px-1">{userEmail}</p>
          )}
          {!collapsed && (
            <div className="flex items-center gap-2 px-1 mb-2">
              <Shield className="w-3 h-3 text-primary-400" />
              <span className="text-xs text-primary-300 capitalize">
                {userRole?.replace("_", " ") || "Admin"}
              </span>
            </div>
          )}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{loggingOut ? "Logging out..." : "Logout"}</span>}
          </button>

          {/* Collapse button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-full mt-2 px-3 py-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-gray-800 transition-all text-xs"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>
    </>
  );
}
