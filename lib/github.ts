// ─────────────────────────────────────────────────────────────
// GitHub API — lapisan "live" dari sistem hybrid.
// Data repo ditarik saat build (server-side) dan di-fallback
// secara aman ke data lokal kalau API gagal.
// Caching (anti rate-limit) dilakukan di level fetch:
// `next: { revalidate: 3600 }` pada fetch di bawah — memori
// permintaan di-cache 1 jam di Data Cache Next.js.
// ─────────────────────────────────────────────────────────────

import type { Project } from "./projects";
import { getAllProjects } from "./projects";

export interface GitHubStats {
  stars: number;
  forks: number;
  language: string | null;
  description: string | null;
  pushedAt: string | null;
  topics: string[];
  url: string;
  archived: boolean;
}

export interface ProjectWithStats extends Project {
  githubStats: GitHubStats;
}

interface GitHubRepoResponse {
  stargazers_count?: number;
  forks_count?: number;
  language?: string | null;
  description?: string | null;
  pushed_at?: string | null;
  topics?: string[];
  html_url?: string;
  archived?: boolean;
}

const GITHUB_API = "https://api.github.com/repos";
const EMPTY_STATS: GitHubStats = {
  stars: 0,
  forks: 0,
  language: null,
  description: null,
  pushedAt: null,
  topics: [],
  url: "",
  archived: false,
};

const fmt = new Intl.NumberFormat("id-ID", { notation: "compact", maximumFractionDigits: 1 });

export function formatCount(n: number): string {
  return fmt.format(n);
}

/**
 * Tarik stats satu repo dari GitHub API.
 * Safe-guarded:
 *  - `owner` & `repo` di-sanitasi (hanya karakter aman) sebelum dipakai di URL.
 *  - Non-200 → lempar error → dipanggil dalam try/catch → fallback ke EMPTY_STATS.
 *  - Rate limit (403) → status message dibaca, lalu fallback.
 */
export async function fetchGitHubStats(ownerRepo: string): Promise<GitHubStats> {
  const [owner, repo] = ownerRepo.split("/");
  if (!owner || !repo) return EMPTY_STATS;

  const safeOwner = encodeURIComponent(owner.replace(/[^a-zA-Z0-9-]/g, ""));
  const safeRepo = encodeURIComponent(repo.replace(/[^a-zA-Z0-9-_.]/g, ""));

  const res = await fetch(`${GITHUB_API}/${safeOwner}/${safeRepo}`, {
    headers: { Accept: "application/vnd.github+json", "User-Agent": "portfolio-site" },
    // Next.js 16: fetch TIDAK di-cache secara default — wajib opt-in.
    // Revalidate 1 jam → hemat rate limit GitHub + halaman tetap fresh.
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`GitHub API ${res.status} untuk ${ownerRepo}`);
  }

  const data = (await res.json()) as GitHubRepoResponse;

  return {
    stars: data.stargazers_count ?? 0,
    forks: data.forks_count ?? 0,
    language: data.language ?? null,
    description: data.description ?? null,
    pushedAt: data.pushed_at ?? null,
    topics: data.topics ?? [],
    url: data.html_url ?? `https://github.com/${ownerRepo}`,
    archived: data.archived ?? false,
  };
}

/**
 * Gabungkan data project lokal dengan stats live GitHub.
 * Dipanggil di server (page.tsx / [slug]/page.tsx).
 * Kalau semua repo gagal di-fetch, project tetap tampil dengan stats kosong —
 * portfolio tidak pernah "mati" karena GitHub sedang down.
 */
export async function getProjectsWithStats(): Promise<ProjectWithStats[]> {
  const base = getAllProjects();

  const results = await Promise.allSettled(
    base.map(async (p) => ({
      project: p,
      stats: await fetchGitHubStats(p.github),
    }))
  );

  return results.map((r, i) =>
    r.status === "fulfilled"
      ? { ...r.value.project, githubStats: r.value.stats }
      : { ...base[i], githubStats: EMPTY_STATS } // repo gagal di-fetch → tampil tanpa stats
  );
}