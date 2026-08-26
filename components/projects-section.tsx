"use client";

import { useState } from "react";
import type { ProjectWithStats } from "../lib/github";
import ProjectCard from "./project-card";
import { SectionHeading } from "./primitives";
import { SparkleIcon } from "./icons";

interface ProjectsSectionProps {
  projects: ProjectWithStats[];
}

const CATEGORIES = [
  { key: "all", label: "Semua Proyek" },
  { key: "web", label: "Web App" },
  { key: "app", label: "Dashboard / App" },
  { key: "experiment", label: "Eksperimen & API" },
] as const;

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-20">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
        <div>
          <p className="mb-3 text-sm font-medium tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
            Karya & Portofolio
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Proyek Unggulan
          </h2>
        </div>

        {/* Filter Kategori */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Proyek */}
      <div className="grid gap-6 sm:grid-cols-2">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {/* Footer Info Proyek */}
      <div className="mt-10 flex items-center justify-between rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-4 dark:border-zinc-800/80 dark:bg-zinc-900/40 text-xs text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <SparkleIcon className="h-4 w-4 text-blue-500" />
          <span>Statistik GitHub diperbarui otomatis melalui GitHub REST API.</span>
        </div>
        <span className="font-mono text-[11px]">{filteredProjects.length} proyek ditampilkan</span>
      </div>
    </section>
  );
}
