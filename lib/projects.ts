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
    slug: "coffee-shop-website",
    title: "Coffee Shop Landing",
    tagline: "Landing page dengan nuansa hangat & animasi mulus",
    description:
      "Website promosi kedai kopi dengan sistem menu interaktif, jam buka otomatis, dan integrasi Google Maps. Dibangun dengan fokus pada kecepatan loading dan estetika visual yang konsisten.",
    github: "jarwisham/sistem-kepegawaian",
    stack: ["Next.js", "Tailwind CSS", "TypeScript"],
    year: "2026",
    features: [
      {
        title: "Menu Interaktif",
        description: "Filter menu berdasarkan kategori dengan animasi transisi halus.",
      },
      {
        title: "Jam Buka Otomatis",
        description: "Badge buka/tutup yang berubah berdasarkan waktu server.",
      },
    ],
    tags: ["landing-page", "restaurant"],
    category: "web",
  },
  {
    slug: "weather-dashboard",
    title: "Weather Dashboard",
    tagline: "Visualisasi cuaca real-time dengan chart elegan",
    description:
      "Dashboard cuaca yang menampilkan prakiraan 7 hari dalam bentuk grafik interaktif. Data diambil dari Open-Meteo API dengan caching cerdas untuk menghemat request.",
    github: "ilham/weather-dashboard",
    stack: ["React", "TypeScript", "Chart.js"],
    year: "2025",
    features: [
      {
        title: "Forecast 7 Hari",
        description: "Grafik suhu, kelembapan, dan probabilitas hujan sekaligus.",
      },
      {
        title: "Search Lokasi",
        description: "Pencarian kota dengan autocomplete dan geolocation.",
      },
    ],
    tags: ["dashboard", "api"],
    category: "app",
  },
  {
    slug: "todo-ai",
    title: "Todo AI",
    tagline: "Aplikasi tugas dengan prioritas otomatis dari AI",
    description:
      "Aplikasi manajemen tugas yang menggunakan model bahasa untuk mengelompokkan dan memprioritaskan to-do list secara otomatis. Eksperimen integrasi AI di front-end.",
    github: "ilham/todo-ai",
    stack: ["Next.js", "TypeScript", "AI SDK"],
    year: "2025",
    features: [
      {
        title: "Prioritas AI",
        description: "AI mengurutkan tugas berdasarkan urgensi dan effort.",
      },
      {
        title: "Offline First",
        description: "LocalStorage sync dengan UI yang tetap responsif.",
      },
    ],
    tags: ["ai", "productivity"],
    category: "experiment",
  },
  {
    slug: "kanban-flow",
    title: "Kanban Flow",
    tagline: "Manajemen task visual dengan drag-and-drop intuitif",
    description:
      "Aplikasi produktivitas berbasis board kanban dengan interaksi drag-and-drop halus, manajemen label dinamis, dan persistensi lokal otomatis.",
    github: "ilham/kanban-flow",
    stack: ["React", "TypeScript", "Tailwind CSS", "dnd-kit"],
    year: "2026",
    features: [
      {
        title: "Smooth Drag & Drop",
        description: "Pindah task antar kolom secara instan dengan animasi natural.",
      },
      {
        title: "Label & Filter",
        description: "Kustomisasi warna tag dan pencarian tugas seketika.",
      },
    ],
    tags: ["productivity", "react", "kanban"],
    demo: "https://kanban-flow.vercel.app",
    category: "app",
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