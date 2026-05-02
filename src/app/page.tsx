export const dynamic = "force-dynamic";
export const revalidate = 0;

import Home from "@/components/Home";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/db";

const Page = async () => {
  const [rawHome, rawProjects, rawExperiences] = await Promise.all([
    prisma.homeContent.upsert({
      where: { id: 1 },
      update: {},
      create: { id: 1 },
    }),
    prisma.project.findMany({ orderBy: { displayOrder: "asc" } }),
    prisma.experience.findMany({ orderBy: { displayOrder: "asc" } }),
  ]);

  const home = {
    name: rawHome.name,
    title: rawHome.title,
    bio: rawHome.bio,
    githubUrl: rawHome.githubUrl,
    linkedinUrl: rawHome.linkedinUrl,
    email: rawHome.email,
    resumeUrl: rawHome.resumeUrl,
    profileImage: rawHome.profileImage,
  };

  const projects = rawProjects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    techStack: p.techStack,
    githubUrl: p.githubUrl,
    demoUrl: p.demoUrl,
    features: p.features,
    role: p.role,
    date: p.date,
    status: p.status,
    color: p.color,
    imageUrl: p.imageUrl,
    imageAlt: p.imageAlt,
  }));

  const experiences = rawExperiences.map((e) => ({
    id: e.id,
    title: e.title,
    role: e.role,
    location: e.location,
    dateRange: e.dateRange,
    information: e.information,
    logoUrl: e.logoUrl,
  }));

  return (
    <div className="flex flex-col items-center">
      <Home {...home} />
      <Projects projects={projects} />
      <Experience experiences={experiences} />
      <Footer />
    </div>
  );
};

export default Page;
