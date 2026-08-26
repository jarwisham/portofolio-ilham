import type { Metadata } from "next";
import { getProjectsWithStats } from "../../lib/github";
import ProjectCard from "../../components/project-card";
import { SectionHeading } from "../../components/primitives";

export const metadata: Metadata = {
  title: "Proyek",
  description: "Kumpulan proyek front-end yang saya buat — dengan stats live dari GitHub.",
};

/**
 * Halaman daftar project.
 * Statistik GitHub di-cache 1 jam lewat `next: { revalidate: 3600 }`
 * di lib/github.ts (Data Cache) — hemat rate limit tanpa token.
 */
export default async function ProjectsPage() {
  const projects = await getProjectsWithStats();

  return (
    <div className="mx-auto max-w-5xl px-5 pt-32 pb-24" id="projects">
      <SectionHeading eyebrow="Proyek" title="Karya yang saya banggakan" />

      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}