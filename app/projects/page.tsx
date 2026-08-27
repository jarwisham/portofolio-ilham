import type { Metadata } from "next";
import Link from "next/link";
import { getPortfolioProjects } from "../../lib/github";
import ProjectCard from "../../components/project-card";
import { SectionHeading } from "../../components/primitives";
import { ArrowRightIcon } from "../../components/icons";

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
      {/* Tombol kembali ke beranda */}
      <div className="mb-6">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 shadow-sm transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-blue-500 dark:hover:bg-blue-950/40 dark:hover:text-blue-300"
        >
          <ArrowRightIcon className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-0.5" />
          Kembali ke Beranda
        </Link>
      </div>

      <SectionHeading eyebrow="Proyek" title="Karya yang saya banggakan" />

      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}