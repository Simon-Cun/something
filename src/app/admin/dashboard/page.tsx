import { prisma } from "@/lib/db";
import Sidebar from "@/components/admin/Sidebar";
import Link from "next/link";
import { Briefcase, Star, Eye } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [projectCount, experienceCount, home] = await Promise.all([
    prisma.project.count(),
    prisma.experience.count(),
    prisma.homeContent.findUnique({ where: { id: 1 } }),
  ]);

  const stats = [
    {
      label: "Total Views",
      value: home?.totalViews ?? 0,
      icon: Eye,
      href: null,
    },
    {
      label: "Experiences",
      value: experienceCount,
      icon: Star,
      href: "/admin/experience",
    },
    {
      label: "Projects",
      value: projectCount,
      icon: Briefcase,
      href: "/admin/projects",
    },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        <h1 className="mb-1 text-2xl font-bold text-white">Dashboard</h1>
        <p className="mb-8 text-sm text-gray-500">
          Overview of your portfolio
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map(({ label, value, icon: Icon, href }) => {
            const inner = (
              <div className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-950 p-5 transition-colors hover:border-neutral-700">
                <div>
                  <p className="mb-1 text-sm text-gray-500">{label}</p>
                  <p className="text-2xl font-bold text-white">{value}</p>
                </div>
                <div className="rounded-lg bg-neutral-900 p-3">
                  <Icon size={20} className="text-white" />
                </div>
              </div>
            );
            return href ? (
              <Link key={label} href={href}>
                {inner}
              </Link>
            ) : (
              <div key={label}>{inner}</div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
