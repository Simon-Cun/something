import Sidebar from "@/components/admin/Sidebar";
import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        <h1 className="mb-1 text-2xl font-bold text-white">New Project</h1>
        <p className="mb-8 text-sm text-gray-500">
          Add a new project to your portfolio
        </p>
        <div className="mx-auto max-w-2xl rounded-xl border border-neutral-800 bg-neutral-950 p-6">
          <ProjectForm />
        </div>
      </main>
    </div>
  );
}
