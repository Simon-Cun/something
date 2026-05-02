import { prisma } from "@/lib/db";
import Sidebar from "@/components/admin/Sidebar";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";
import { Plus } from "lucide-react";

export default async function ExperienceAdminPage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { displayOrder: "asc" },
    select: {
      id: true,
      title: true,
      role: true,
      dateRange: true,
      location: true,
      displayOrder: true,
    },
  });

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Experience</h1>
            <p className="mt-1 text-sm text-gray-500">
              {experiences.length} entries total
            </p>
          </div>
          <Link
            href="/admin/experience/new"
            className="flex items-center gap-2 rounded-lg bg-neutral-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
          >
            <Plus size={16} />
            New Entry
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
                  Company
                </th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:table-cell">
                  Role
                </th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase md:table-cell">
                  Dates
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 bg-neutral-950/50">
              {experiences.map((exp) => (
                <tr
                  key={exp.id}
                  className="transition-colors hover:bg-neutral-900/50"
                >
                  <td className="px-4 py-3 text-gray-600">
                    {exp.displayOrder}
                  </td>
                  <td className="px-4 py-3 font-medium text-white">
                    {exp.title}
                  </td>
                  <td className="hidden px-4 py-3 text-gray-400 sm:table-cell">
                    {exp.role}
                  </td>
                  <td className="hidden px-4 py-3 text-gray-400 md:table-cell">
                    {exp.dateRange}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/experience/${exp.id}/edit`}
                        className="rounded-md border border-neutral-800 px-3 py-1.5 text-xs text-gray-300 transition-colors hover:border-gray-500 hover:text-white"
                      >
                        Edit
                      </Link>
                      <DeleteButton
                        id={exp.id}
                        endpoint="/api/experience"
                        label={exp.title}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {experiences.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-gray-600"
                  >
                    No experience entries yet.{" "}
                    <Link
                      href="/admin/experience/new"
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
