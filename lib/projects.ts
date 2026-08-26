// ─────────────────────────────────────────────────────────────
// Hybrid data layer: GitHub API memasok SEMUA project otomatis.
//
// CARA KERJA:
// Repo publik milik akun `jarwisham` yang ditandai TOPIC
// "portofolio" di GitHub akan otomatis tampil di website
// (maksimal 1 jam setelah perubahan, lewat ISR).
// Tidak perlu mengedit file ini lagi.
//
// File ini kini hanya menyimpan TYPE & HELPER — array `projects`
// sengaja dikosongkan. Kalau suatu saat mau menonjolkan repo
// tertentu dengan cerita kustom (fitur, tagline khusus), tambahkan
// entri di sini: repo itu tetap diprioritaskan di atas hasil
// auto-discovery.
// ─────────────────────────────────────────────────────────────

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  /** Nama repo GitHub, format "owner/repo". Kosongkan untuk menyembunyikan stats. */
  github: string;
  stack: string[];
  year: string;
  features: ProjectFeature[];
  /** Kata kunci untuk filter — isi saja, tidak perlu rapi. */
  tags: string[];
  /** Link live demo/situs (mis. Vercel). Kosongkan jika tidak ada. */
  demo?: string;
  /** Kategori untuk grouping di halaman project. */
  category: "web" | "app" | "experiment";
}

// Kosong = 100% andalkan auto-discovery via topic "portofolio" di GitHub.
export const projects: Project[] = [];

export type ProjectCategory = Project["category"];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
