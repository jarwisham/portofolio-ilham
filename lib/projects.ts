// ─────────────────────────────────────────────────────────────
// Hybrid data layer: kamu yang kurasi project (cerita & metadata),
// GitHub API yang memasok data live (stars, bahasa, last update).
//
// CARA PAKAI:
// 1. Ganti `github` dengan nama repo-mu (format: "owner/repo") —
//    bagian ini otomatis menarik stats live dari GitHub.
// 2. Isi `title`, `description`, `highlights`, `stack`, `year`,
//    `slug` manual — inilah "cerita" yang bikin portfolio-mu beda
//    dari sekadar daftar repo.
// 3. Tambah screenshot di /public/projects/<slug>.png (opsional).
// 4. Push project-mu ke GitHub, lalu deploy ulang (atau tunggu
//    revalidasi otomatis) — stats akan mengikuti.
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

export const projects: Project[] = [
  {
    slug: "sistem-kepegawaian",
    title: "Sistem Kepegawaian",
    tagline: "Aplikasi manajemen data pegawai berbasis Laravel",
    description:
      "Sistem informasi kepegawaian untuk mengelola data pegawai — pencatatan, pencarian, hingga pembaruan status kepegawaian. Dibangun dengan Laravel dan Blade sebagai latihan membangun aplikasi CRUD yang utuh.",
    github: "jarwisham/sistem-kepegawaian",
    stack: ["PHP", "Laravel", "Blade", "MySQL"],
    year: "2026",
    features: [
      {
        title: "CRUD Pegawai",
        description: "Tambah, ubah, hapus, dan cari data pegawai lewat antarmuka admin.",
      },
      {
        title: "Autentikasi",
        description: "Login dan pembatasan akses bawaan Laravel untuk halaman administrasi.",
      },
    ],
    tags: ["laravel", "crud", "php"],
    category: "app",
  },
  {
    slug: "clone-simrs",
    title: "Clone SIMRS",
    tagline: "Replikasi antarmuka sistem informasi rumah sakit",
    description:
      "Proyek replikasi tampilan SIMRS (Sistem Informasi Manajemen Rumah Sakit) untuk mempelajari pola UI aplikasi medis yang padat data — tabel rekam, navigasi modul, dan alur kerja petugas. Dibangun di atas Laravel + Blade.",
    github: "jarwisham/clone_simrs",
    stack: ["PHP", "Laravel", "Blade"],
    year: "2026",
    features: [
      {
        title: "UI Aplikasi Medis",
        description: "Replikasi layout modul-modul rumah sakit dengan Blade templating.",
      },
      {
        title: "Alur Data Pasien",
        description: "Simulasi alur registrasi dan rekam medis ala sistem SIMRS nyata.",
      },
    ],
    tags: ["laravel", "simrs", "healthcare"],
    category: "web",
  },
  {
    slug: "projek1",
    title: "Projek 1",
    tagline: "Halaman web statis pertama dengan HTML murni",
    description:
      "Eksperimen awal membangun halaman web menggunakan HTML tanpa framework — fokus pada struktur dokumen, semantic markup, dan styling dasar sebagai fondasi sebelum masuk ke framework modern.",
    github: "jarwisham/projek1",
    stack: ["HTML", "CSS"],
    year: "2026",
    features: [
      {
        title: "Semantic HTML",
        description: "Struktur halaman ditulis dengan elemen semantik, bukan div bertumpuk.",
      },
      {
        title: "Tanpa Framework",
        description: "Murni HTML & CSS untuk memahami dasar sebelum pakai tooling.",
      },
    ],
    tags: ["html", "css", "pemula"],
    category: "experiment",
  },
];

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
