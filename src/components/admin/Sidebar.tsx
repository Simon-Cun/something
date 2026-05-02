"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Home, Briefcase, Star, LogOut } from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/home", label: "Home Content", icon: Home },
  { href: "/admin/projects", label: "Projects", icon: Briefcase },
  { href: "/admin/experience", label: "Experience", icon: Star },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside className="flex h-screen w-56 flex-col border-r border-neutral-800 bg-neutral-950">
      <div className="border-b border-neutral-800 px-6 py-5">
        <span className="text-lg font-bold text-white">Admin Portal</span>
        <p className="mt-0.5 text-xs text-gray-500">Portfolio Manager</p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-neutral-900 text-white"
                  : "text-gray-400 hover:bg-neutral-900 hover:text-white"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-neutral-800 p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-400 transition-colors hover:bg-neutral-900 hover:text-red-400"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
