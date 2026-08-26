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

interface GitHubUserRepoResponse extends GitHubRepoResponse {
  name?: string;
  full_name?: string;
  created_at?: string | null;
  fork?: boolean;
}

const GITHUB_API = "https://api.github.com/repos";

// Akun GitHub sumber repo — bisa dioverride lewat env GITHUB_USERNAME.
const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? "jarwisham";

// Repo fork tidak ditampilkan sebagai project otomatis.
const EXCLUDE_FORKS = true;

// Saklar auto-discovery: hanya repo publik yang punya TOPIC ini di GitHub
// yang otomatis muncul di portofolio. Bisa dioverride lewat env PORTFOLIO_TOPIC.
const PORTFOLIO_TOPIC = (process.env.PORTFOLIO_TOPIC ?? "portofolio").toLowerCase();
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

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-site",
  };
  // Token opsional (env GITHUB_TOKEN) — wajib untuk repo privat,
  // sekaligus menaikkan kuota rate limit dari 60 jadi 5.000/jam.
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(`${GITHUB_API}/${safeOwner}/${safeRepo}`, {
    headers,
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
 * Ambil SEMUA repo publik milik GITHUB_USERNAME, urut terbaru didorong.
 * Dipakai untuk auto-discovery: repo baru yang di-push ke GitHub otomatis
 * muncul di portofolio tanpa perlu edit kode.
 */
async function fetchAllUserRepos(): Promise<GitHubUserRepoResponse[]> {
  const safeUser = encodeURIComponent(GITHUB_USERNAME.replace(/[^a-zA-Z0-9-]/g, ""));

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-site",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(
    `https://api.github.com/users/${safeUser}/repos?sort=pushed&per_page=100`,
    { headers, next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error(`GitHub API ${res.status} untuk user ${GITHUB_USERNAME}`);
  }

  return (await res.json()) as GitHubUserRepoResponse[];
}

/** "clone_simrs" → "Clone Simrs", "sistem-kepegawaian" → "Sistem Kepegawaian". */
function prettifyRepoName(name: string): string {
  return name
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Gabungkan kurasi manual (lib/projects.ts) dengan auto-discovery repo GitHub:
 *  - Repo yang sudah dikurasi → pakai cerita/manual apa adanya.
 *  - Repo lain yang publik → dibuatkan kartu otomatis HANYA jika punya
 *    topic "portofolio" (atau nilai PORTFOLIO_TOPIC) di repo GitHub-nya.
 * Kalau API gagal, tetap tampilkan kurasi manual saja — situs tidak pernah mati.
 */
export async function getPortfolioProjects(): Promise<ProjectWithStats[]> {
  const curated = await getProjectsWithStats();

  try {
    const repos = await fetchAllUserRepos();
    const known = new Set(curated.map((p) => p.github.toLowerCase()));

    const auto: ProjectWithStats[] = repos
      .filter(
        (r) =>
          r.name &&
          r.full_name &&
          !r.archived &&
          !(EXCLUDE_FORKS && r.fork) &&
          !known.has(r.full_name.toLowerCase()) &&
          // Hanya repo yang ditandai topic "portofolio" yang tampil otomatis.
          (r.topics ?? []).some((t) => t.toLowerCase() === PORTFOLIO_TOPIC)
      )
      .map((r) => ({
        slug: r.name!,
        title: prettifyRepoName(r.name!),
        tagline: r.description || `Repo open-source dari akun GitHub ${GITHUB_USERNAME}.`,
        description:
          r.description ||
          `Proyek ini ditarik otomatis dari GitHub. Tambahkan deskripsi di repo (atau daftarkan manual di lib/projects.ts) supaya ceritanya lebih menarik.`,
        github: r.full_name!,
        stack: r.language ? [r.language] : [],
        year: String(r.created_at ? new Date(r.created_at).getFullYear() : new Date().getFullYear()),
        features: [],
        tags: r.topics ?? [],
        category: "experiment",
        githubStats: {
          stars: r.stargazers_count ?? 0,
          forks: r.forks_count ?? 0,
          language: r.language ?? null,
          description: r.description ?? null,
          pushedAt: r.pushed_at ?? null,
          topics: r.topics ?? [],
          url: r.html_url ?? `https://github.com/${r.full_name}`,
          archived: r.archived ?? false,
        },
      }));

    // Kurasi dulu (unggulan), lalu sisanya urut terbaru aktivitas.
    return [...curated, ...auto];
  } catch {
    return curated;
  }
}

/** Cari satu project (kurasi + otomatis) berdasarkan slug. */
export async function getPortfolioProjectBySlug(
  slug: string
): Promise<ProjectWithStats | undefined> {
  const all = await getPortfolioProjects();
  return all.find((p) => p.slug === slug);
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

  return results.map((r, i) => {
    if (r.status === "fulfilled") {
      return { ...r.value.project, githubStats: r.value.stats };
    }
    // Repo gagal di-fetch (privat tanpa token / rate limit / GitHub down)
    // → tampil tanpa stats, tapi link ke repo tetap hidup.
    return {
      ...base[i],
      githubStats: { ...EMPTY_STATS, url: `https://github.com/${base[i].github}` },
    };
  });
}