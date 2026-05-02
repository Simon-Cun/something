"use client";

import { motion } from "motion/react";
import VerticalTitle from "@/components/VerticalTitle";
import HorizontalTitle from "@/components/HorizontalTitle";
import Link from "next/link";
import Image from "next/image";
import LineBreak from "@/components/LineBreak";
import { FaGithub, FaLink } from "react-icons/fa";

export type ProjectItem = {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  demoUrl: string | null;
  features: string[];
  role: string;
  date: string;
  status: string;
  color: string;
  imageUrl: string;
  imageAlt: string;
};

const Projects = ({ projects }: { projects: ProjectItem[] }) => {
  const overlap = 10;

  return (
    <section id="projects" className="relative w-full py-20 md:flex md:pl-10">
      <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-white to-transparent" />

      <div className="top-12.5 hidden md:sticky md:block">
        <VerticalTitle title="PROJECTS" />
      </div>

      <div className="mb-6 flex justify-center md:hidden">
        <div className="sticky top-5 flex w-full justify-center">
          <HorizontalTitle title="PROJECTS" />
        </div>
      </div>

      <div className="flex w-full flex-col gap-0 px-4 md:pl-10">
        <div className="hidden pb-4 md:block">
          <LineBreak />
        </div>

        {projects.map((project, index) => {
          const zIndex = index + 1;

          return (
            <motion.div
              key={project.id}
              className={`flex flex-col gap-6 rounded-2xl border border-white/20 p-5 shadow-lg backdrop-blur-md backdrop-filter md:flex-row md:p-10 ${project.color} md:sticky`}
              style={{
                top: `${index * overlap}px`,
                zIndex,
                marginTop: index === 0 ? 0 : `-${overlap}px`,
              }}
            >
              <div className="flex w-full flex-col gap-4 md:w-2/3">
                <h2 className="text-center text-3xl font-semibold sm:text-4xl md:text-left">
                  {project.title}
                </h2>

                <div className="flex flex-wrap justify-center gap-3 text-sm md:justify-start">
                  <span>{project.role}</span>
                  <span>{project.date}</span>
                  <span>{project.status}</span>
                </div>

                <p className="text-center md:text-left">
                  {project.description}
                </p>

                <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-white/10 px-3 py-1 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <ul className="list-disc pl-6 text-center md:text-left">
                  {project.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>

                <div className="flex justify-center gap-6 md:justify-start">
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    className="flex items-center gap-2 text-xl"
                  >
                    <FaGithub size={20} /> Github
                  </Link>
                  {project.demoUrl && project.demoUrl !== "#" && (
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Demo Site"
                      className="flex items-center gap-2 text-xl"
                    >
                      <FaLink size={20} /> Demo
                    </Link>
                  )}
                </div>
              </div>

              <div className="flex justify-center md:w-1/3">
                <Image
                  src={project.imageUrl}
                  alt={project.imageAlt}
                  width={500}
                  height={300}
                  className="w-full max-w-xs object-contain sm:max-w-md"
                  priority
                  unoptimized
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
