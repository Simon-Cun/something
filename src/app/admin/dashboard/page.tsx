import { prisma } from "@/lib/db";
import Sidebar from "@/components/admin/Sidebar";
import Link from "next/link";
import { Briefcase, Star, Home, ArrowRight } from "lucide-react";

export default async function DashboardPage() {
  const [projectCount, experienceCount, home] = await Promise.all([
    prisma.project.count(),
    prisma.experience.count(),
    prisma.homeContent.findUnique({ where: { id: 1 } }),
  ]);

  const stats = [
    {
      label: "Projects",
      value: projectCount,
      icon: Briefcase,
      href: "/admin/projects",
      color: "text-white",
      bg: "bg-neutral-900",
    },
    {
      label: "Experience",
      value: experienceCount,
      icon: Star,
      href: "/admin/experience",
      color: "text-white",
      bg: "bg-neutral-900",
    },
    {
      label: "Home Content",
      value: home ? "Configured" : "Not set",
      icon: Home,
      href: "/admin/home",
      color: "text-white",
      bg: "bg-neutral-900",
    },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        <h1 className="mb-1 text-2xl font-bold text-white">Dashboard</h1>
        <p className="mb-8 text-sm text-gray-500">
          Overview of your portfolio content
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map(({ label, value, icon: Icon, href, color, bg }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-950 p-5 transition-colors hover:border-neutral-800"
            >
              <div>
                <p className="mb-1 text-sm text-gray-500">{label}</p>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
              </div>
              <div className={`rounded-lg p-3 ${bg}`}>
                <Icon size={20} className={color} />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-sm font-medium tracking-wider text-gray-400 uppercase">
            Quick Actions
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Edit Home Content", href: "/admin/home" },
              { label: "Add New Project", href: "/admin/projects/new" },
              { label: "Add New Experience", href: "/admin/experience/new" },
              { label: "Manage Projects", href: "/admin/projects" },
              { label: "Manage Experience", href: "/admin/experience" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-gray-300 transition-colors hover:border-neutral-700 hover:text-white"
              >
                {label}
                <ArrowRight size={14} className="text-gray-600" />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
