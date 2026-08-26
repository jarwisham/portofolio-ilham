import Link from "next/link";
import type { ProjectWithStats } from "../lib/github";
import { formatCount } from "../lib/github";
import { ArrowRightIcon, ForkIcon, StarIcon } from "./icons";
import { Badge } from "./primitives";

/**
 * Kartu project — perpaduan data lokal (cerita) + stats live GitHub.
 * Kalau repo tidak punya stats (fallback), badge stats disembunyikan
 * supaya kartu tetap bersih.
 */
export default function ProjectCard({ project }: { project: ProjectWithStats }) {
  const s = project.githubStats;
  // `githubStats` diisi dari EMPTY_STATS hanya kalau fetch GAGAL (repo belum ada /
  // rate limit / GitHub down). Kalau fetch berhasil — meski stars/forks 0 —
  // tampilkan stats apa adanya (url repo pasti ada).
  const hasStats = !!s.url;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:shadow-zinc-950/80"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400">
            {project.title}
          </h3>
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">{project.tagline}</p>
        </div>
        <ArrowRightIcon className="mt-1 h-4 w-4 shrink-0 text-zinc-300 transition-all group-hover:translate-x-1 group-hover:text-blue-500 dark:text-zinc-600 dark:group-hover:text-blue-400" />
      </div>

      <p className="line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {project.description}
      </p>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
        {project.stack.slice(0, 3).map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-zinc-100 pt-4 text-xs text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
        <span>{project.year}</span>
        {project.github ? (
          hasStats ? (
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <StarIcon className="h-3.5 w-3.5" />
                {formatCount(s.stars)}
              </span>
              <span className="inline-flex items-center gap-1">
                <ForkIcon className="h-3.5 w-3.5" />
                {formatCount(s.forks)}
              </span>
              {s.language && (
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  {s.language}
                </span>
              )}
            </div>
          ) : (
            <span className="italic">menunggu repo di GitHub</span>
          )
        ) : (
          <span className="italic">demo di situs ini</span>
        )}
      </div>
    </Link>
  );
}