import type { Metadata } from "next";
import { getPortfolioProjects } from "../../lib/github";
import ProjectCard from "../../components/project-card";
import { SectionHeading } from "../../components/primitives";

export const metadata: Metadata = {
  title: "Proyek",
  description: "Kumpulan proyek front-end yang saya buat — dengan stats live dari GitHub.",
};

/**
 * Halaman daftar project — kurasi manual + auto-discovery repo GitHub.
 * Semuanya di-cache 1 jam lewat `next: { revalidate: 3600 }`
 * di lib/github.ts (Data Cache) — repo baru muncul otomatis maksimal
 * 1 jam setelah di-push ke GitHub.
 */
export default async function ProjectsPage() {
  const projects = await getPortfolioProjects();

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