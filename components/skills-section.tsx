"use client";

import { SectionHeading } from "./primitives";
import { CodeIcon, LayersIcon, TerminalIcon, SparkleIcon } from "./icons";

interface SkillItem {
  name: string;
  level: string;
  tag: string;
  description: string;
}

interface SkillCategory {
  category: string;
  icon: React.ReactNode;
  summary: string;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend Development",
    icon: <CodeIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
    summary: "Membangun antarmuka modern, interaktif, dan performan tinggi.",
    skills: [
      { name: "React / Next.js", level: "Expert", tag: "App Router & SSR", description: "Komponen modular, Server Actions, & optimasi rendering" },
      { name: "TypeScript", level: "Advanced", tag: "Type Safety", description: "Arsitektur kode kokoh dengan static typing ketat" },
      { name: "Tailwind CSS", level: "Expert", tag: "Design System", description: "Styling responsif, tema dinamis & utilitas presisi" },
      { name: "GSAP Animation", level: "Advanced", tag: "Micro-interactions", description: "ScrollTrigger, timeline animasi, dan transisi halus" },
      { name: "HTML5 & Modern CSS", level: "Expert", tag: "Semantic & a11y", description: "Aksesibilitas ramah pembaca layar & SEO-ready" },
    ],
  },
  {
    category: "Backend & Data Flow",
    icon: <LayersIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />,
    summary: "Integrasi API, validasi data server, dan arsitektur fullstack.",
    skills: [
      { name: "Node.js & REST API", level: "Intermediate", tag: "API Design", description: "Pembuatan endpoint RESTful & manipulasi data" },
      { name: "Server Actions", level: "Advanced", tag: "Next.js", description: "Mutasi data tanpa endpoint boilerplate" },
      { name: "Zod Schema", level: "Advanced", tag: "Data Validation", description: "Validasi runtime data aman di client & server" },
      { name: "Database / Storage", level: "Intermediate", tag: "SQLite / Postgres", description: "Manajemen state persisten & query relational" },
    ],
  },
  {
    category: "Tools, Workflow & Design",
    icon: <TerminalIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />,
    summary: "Tooling modern untuk efisiensi kolaborasi dan deployment.",
    skills: [
      { name: "Git & GitHub", level: "Advanced", tag: "Version Control", description: "Branching workflow, pull request, & release" },
      { name: "Figma to Code", level: "Advanced", tag: "UI/UX Translation", description: "Konversi desain presisi pixel menjadi kode fungsional" },
      { name: "Vercel & CI/CD", level: "Advanced", tag: "Deployment", description: "Continuous integration, domain, & analytics" },
      { name: "Lighthouse & SEO", level: "Advanced", tag: "Optimization", description: "Audit performa, Core Web Vitals, & meta tag" },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-20">
      <SectionHeading
        eyebrow="Keahlian & Teknologi"
        title="Tech Stack & Alat yang Saya Kuasai"
      />

      <div className="grid gap-8 lg:grid-cols-3">
        {SKILL_CATEGORIES.map((category) => (
          <div
            key={category.category}
            className="flex flex-col rounded-3xl border border-zinc-200/80 bg-zinc-50/40 p-6 transition-all duration-300 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
          >
            {/* Header Kategori */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-xs border border-zinc-200/70 dark:bg-zinc-800 dark:border-zinc-700">
                {category.icon}
              </div>
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg">
                {category.category}
              </h3>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
              {category.summary}
            </p>

            {/* List Skill */}
            <div className="flex flex-col gap-3 mt-auto">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="rounded-2xl border border-zinc-200/60 bg-white p-3.5 transition-colors hover:border-zinc-300 dark:border-zinc-800/60 dark:bg-zinc-900/90 dark:hover:border-zinc-700"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                      {skill.name}
                    </span>
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                      {skill.tag}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Baris Badge Cepat */}
      <div className="mt-12 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 p-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4 flex items-center justify-center gap-2">
          <SparkleIcon className="h-3.5 w-3.5" />
          Semua Ekosistem & Library Favorit
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            "Next.js 15",
            "React 19",
            "TypeScript",
            "Tailwind CSS v4",
            "GSAP",
            "Zod",
            "ESLint",
            "PostCSS",
            "Figma",
            "Git",
            "GitHub",
            "Vercel",
            "Node.js",
            "REST API",
            "Date-fns",
            "Lucide/Custom SVG",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full border border-zinc-200 bg-white px-3.5 py-1 text-xs font-medium text-zinc-700 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
