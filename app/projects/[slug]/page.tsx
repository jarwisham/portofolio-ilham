import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatCount, getPortfolioProjectBySlug, getPortfolioProjects } from "../../../lib/github";
import { ArrowRightIcon, ArrowUpRightIcon, ForkIcon, GithubIcon, StarIcon } from "../../../components/icons";
import { Badge } from "../../../components/primitives";

type Props = {
  params: Promise<{ slug: string }>;
};

// Bangun statis semua halaman detail saat `next build` —
// termasuk repo yang ditemukan otomatis dari akun GitHub.
export async function generateStaticParams() {
  const projects = await getPortfolioProjects();
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const found = await getPortfolioProjectBySlug(slug);
  if (!found) return {};
  return {
    title: found.title,
    description: found.description,
  };
}

// Icon generik untuk semua project otomatis —
// kalau mau ikon khusus per repo, tambahkan entri kurasi di lib/projects.ts.
const ICON_BG = "bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400";
const EMOJI = "💻";

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const found = await getPortfolioProjectBySlug(slug);
  if (!found) notFound();
  const project = found;

  // Stats sudah terisi saat discovery — baik kurasi manual maupun repo otomatis,
  // dan tetap punya fallback URL walau API GitHub gagal.
  const { githubStats: stats } = found;

  return (
    <article className="mx-auto max-w-3xl px-5 pt-36 pb-24">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
      >
        <ArrowRightIcon className="h-4 w-4 rotate-180" />
        Semua proyek
      </Link>

      {/* Header */}
      <div className="mt-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
              {project.year} · {project.category}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
              {project.title}
            </h1>
            <p className="mt-3 text-lg text-zinc-500 dark:text-zinc-400">{project.tagline}</p>
          </div>
          <span
            className={`hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl sm:flex ${ICON_BG}`}
            aria-hidden
          >
            {EMOJI}
          </span>
        </div>

        <p className="mt-6 leading-relaxed text-zinc-600 dark:text-zinc-400">{project.description}</p>
      </div>

      {/* Stack */}
      <div className="mt-8 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>

      {/* Stats GitHub */}
      {stats && (
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {stats.language && <Badge>{stats.language}</Badge>}
          <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            <StarIcon className="h-3.5 w-3.5" />
            {formatCount(stats.stars)} stars
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            <ForkIcon className="h-3.5 w-3.5" />
            {formatCount(stats.forks)} forks
          </span>
        </div>
      )}

      {/* Fitur — hanya untuk project yang dikurasi manual (repo otomatis belum punya) */}
      {project.features.length > 0 && (
        <section className="mt-14">
          <h2 className="text-sm font-medium tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
            Fitur utama
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {project.features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tombol aksi */}
      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        {stats?.url && (
          <a
            href={stats.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500"
          >
            <GithubIcon className="h-4 w-4" />
            Lihat di GitHub
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            <ArrowUpRightIcon className="h-4 w-4" />
            Demo Langsung
          </a>
        )}
        {!stats?.url && !project.demo && (
          <p className="text-sm text-zinc-400 italic">Detail repo ini belum tersedia.</p>
        )}
      </div>
    </article>
  );
}