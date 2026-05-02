import { prisma } from "@/lib/db";
import Sidebar from "@/components/admin/Sidebar";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";
import { Plus } from "lucide-react";

export default async function ProjectsAdminPage() {
  const projects = await prisma.project.findMany({
    orderBy: { displayOrder: "asc" },
    select: {
      id: true,
      title: true,
      role: true,
      date: true,
      status: true,
      displayOrder: true,
    },
  });

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Projects</h1>
            <p className="mt-1 text-sm text-gray-500">
              {projects.length} projects total
            </p>
          </div>
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2 rounded-lg bg-neutral-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
          >
            <Plus size={16} />
            New Project
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-neutral-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-950">
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Title
                </th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:table-cell">
                  Role
                </th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase md:table-cell">
                  Date
                </th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase lg:table-cell">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 bg-neutral-950/50">
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="transition-colors hover:bg-neutral-900/50"
                >
                  <td className="px-4 py-3 text-gray-600">
                    {project.displayOrder}
                  </td>
                  <td className="px-4 py-3 font-medium text-white">
                    {project.title}
                  </td>
                  <td className="hidden px-4 py-3 text-gray-400 sm:table-cell">
                    {project.role}
                  </td>
                  <td className="hidden px-4 py-3 text-gray-400 md:table-cell">
                    {project.date}
                  </td>
                  <td className="hidden px-4 py-3 lg:table-cell">
                    <span className="rounded-full bg-neutral-900 px-2.5 py-0.5 text-xs text-gray-300">
                      {project.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="rounded-md border border-neutral-800 px-3 py-1.5 text-xs text-gray-300 transition-colors hover:border-gray-500 hover:text-white"
                      >
                        Edit
                      </Link>
                      <DeleteButton
                        id={project.id}
                        endpoint="/api/projects"
                        label={project.title}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-gray-600"
                  >
                    No projects yet.{" "}
                    <Link
                      href="/admin/projects/new"
                      className="text-gray-300 hover:underline"
                    >
                      Add one
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
