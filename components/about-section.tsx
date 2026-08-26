import { SectionHeading } from "./primitives";
import { GithubIcon, MailIcon, SparkleIcon, CheckIcon } from "./icons";

const HIGHLIGHTS = [
  {
    number: "3+",
    label: "Tahun Pengalaman",
    desc: "Membangun antarmuka web modern & responsif",
  },
  {
    number: "15+",
    label: "Proyek Selesai",
    desc: "Aplikasi web, landing page, dan sistem desain",
  },
  {
    number: "99%",
    label: "Performa Skor",
    desc: "Optimasi Lighthouse, SEO, dan aksesibilitas",
  },
];

const PRINCIPLES = [
  {
    title: "User-Centric Design",
    desc: "Setiap pixel dirancang untuk kemudahan dan kenyamanan pengguna saat bernavigasi.",
  },
  {
    title: "Clean & Scalable Code",
    desc: "Struktur kode modular berbasis TypeScript yang mudah dirawat dan dikembangkan.",
  },
  {
    title: "Fluid Micro-Interactions",
    desc: "Animasi halus dengan GSAP yang membuat web terasa hidup tanpa membebani performa.",
  },
  {
    title: "Performance First",
    desc: "Loading secepat kilat dengan Next.js App Router, caching efisien, dan Server Components.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-20">
      <SectionHeading eyebrow="Tentang Saya" title="Halo, saya Ilham — Front-End Developer" />

      <div className="grid gap-12 lg:grid-cols-12">
        {/* Kolom Kiri: Cerita & Bio */}
        <div className="space-y-6 text-zinc-600 dark:text-zinc-400 lg:col-span-7 leading-relaxed">
          <p className="text-lg font-normal text-zinc-800 dark:text-zinc-200">
            Saya seorang <strong className="font-semibold text-zinc-950 dark:text-white">Front-End Developer</strong> yang
            berdedikasi menciptakan pengalaman web yang cepat, intuitif, dan estetis. Bagi saya, web development bukan hanya
            menulis kode, tetapi meramu fungsionalitas dan keindahan visual.
          </p>

          <p>
            Keseharian saya berputar di ekosistem modern seperti <strong className="text-zinc-900 dark:text-zinc-100">React</strong>,{" "}
            <strong className="text-zinc-900 dark:text-zinc-100">Next.js</strong>,{" "}
            <strong className="text-zinc-900 dark:text-zinc-100">TypeScript</strong>, dan{" "}
            <strong className="text-zinc-900 dark:text-zinc-100">Tailwind CSS</strong>. Saya terbiasa mengimplementasikan animasi mikro
            interaktif menggunakan <strong className="text-zinc-900 dark:text-zinc-100">GSAP</strong> untuk memberi sentuhan elegan pada setiap halaman.
          </p>

          <p>
            Saya selalu bersemangat mempelajari arsitektur web modern, eksplorasi desain interaksi baru, serta membangun sistem yang mudah
            dikelola dan siap berkembang untuk jangka panjang.
          </p>

          {/* Quick contact / social buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-blue-500/30"
            >
              <MailIcon className="h-4 w-4" />
              Mari Berdiskusi
            </a>
            <a
              href="https://github.com/ilham"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Tersedia untuk freelance & full-time
            </span>
          </div>
        </div>

        {/* Kolom Kanan: Metrics Cards */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3.5">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item.label}
                className="group rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-5 transition-all duration-300 hover:border-zinc-300 hover:bg-white hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
                    {item.number}
                  </span>
                  <SparkleIcon className="h-4 w-4 text-zinc-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <h4 className="mt-1 font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.label}
                </h4>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nilai / Prinsip Kerja */}
      <div className="mt-16 pt-12 border-t border-zinc-200/60 dark:border-zinc-800/60">
        <h3 className="text-sm font-semibold tracking-widest text-zinc-400 uppercase dark:text-zinc-500 mb-6">
          Prinsip & Nilai Kerja
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-zinc-200/70 bg-white p-5 dark:border-zinc-800/70 dark:bg-zinc-900/60 shadow-xs"
            >
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                <CheckIcon className="h-4 w-4 shrink-0 stroke-[2.5]" />
                <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                  {p.title}
                </h4>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
