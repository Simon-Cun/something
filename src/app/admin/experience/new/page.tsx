import Sidebar from "@/components/admin/Sidebar";
import ExperienceForm from "@/components/admin/ExperienceForm";

export default function NewExperiencePage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        <h1 className="mb-1 text-2xl font-bold text-white">New Experience</h1>
        <p className="mb-8 text-sm text-gray-500">Add a new experience entry</p>
        <div className="mx-auto max-w-2xl rounded-xl border border-neutral-800 bg-neutral-950 p-6">
          <ExperienceForm />
        </div>
      </main>
    </div>
  );
}
