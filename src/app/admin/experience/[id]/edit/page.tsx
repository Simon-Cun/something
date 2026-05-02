import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import ExperienceForm from "@/components/admin/ExperienceForm";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exp = await prisma.experience.findUnique({ where: { id: Number(id) } });
  if (!exp) notFound();

  const initial = {
    title: exp.title,
    role: exp.role,
    location: exp.location,
    dateRange: exp.dateRange,
    information: exp.information.join("\n"),
    logoUrl: exp.logoUrl,
    displayOrder: String(exp.displayOrder),
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        <h1 className="mb-1 text-2xl font-bold text-white">Edit Experience</h1>
        <p className="mb-8 text-sm text-gray-500">{exp.title}</p>
        <div className="mx-auto max-w-2xl rounded-xl border border-neutral-800 bg-neutral-950 p-6">
          <ExperienceForm initial={initial} experienceId={exp.id} />
        </div>
      </main>
    </div>
  );
}
