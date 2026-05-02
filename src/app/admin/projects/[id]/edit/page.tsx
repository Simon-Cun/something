import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id: Number(id) },
  });
  if (!project) notFound();

  const initial = {
    title: project.title,
    description: project.description,
    techStack: project.techStack.join("\n"),
    githubUrl: project.githubUrl,
    demoUrl: project.demoUrl ?? "",
    features: project.features.join("\n"),
    role: project.role,
    date: project.date,
    status: project.status,
    color: project.color,
    imageUrl: project.imageUrl,
    imageAlt: project.imageAlt,
    displayOrder: String(project.displayOrder),
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        <h1 className="mb-1 text-2xl font-bold text-white">Edit Project</h1>
        <p className="mb-8 text-sm text-gray-500">{project.title}</p>
        <div className="mx-auto max-w-2xl rounded-xl border border-neutral-800 bg-neutral-950 p-6">
          <ProjectForm initial={initial} projectId={project.id} />
        </div>
      </main>
    </div>
  );
}
