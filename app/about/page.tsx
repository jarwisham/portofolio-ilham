import type { Metadata } from "next";
import { SectionHeading } from "../../components/primitives";
import { GithubIcon, MailIcon, SparkleIcon } from "../../components/icons";

export const metadata: Metadata = {
  title: "Tentang",
  description: "Kenalan dengan Ilham — front-end developer dari Indonesia.",
};

const TOOLS = ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Figma"];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-32 pb-24">
      <SectionHeading eyebrow="Tentang" title="Halo, saya Ilham" />

      <div className="space-y-5 leading-relaxed text-zinc-600 dark:text-zinc-400">
        <p>
          Saya <strong className="font-semibold text-zinc-900 dark:text-zinc-50">front-end developer</strong>{" "}
          yang fokus pada <em>craft</em>: performa, detail interaksi, dan pengalaman yang
          terasa mulus. Saya percaya web yang baik adalah web yang terasa ringan di
          mata dan cepat di tangan.
        </p>
        <p>
          Keseharian saya membangun antarmuka dengan React dan Next.js, merancang
          sistem desain yang konsisten, dan mengadopsi animasi dengan GSAP untuk
          membawa &ldquo;jiwa&rdquo; ke dalam produk digital.
        </p>
        <p>
          Ketika tidak sedang menulis kode, saya suka ngopi di kedai kecil, baca
          artikel tentang desain, dan eksplorasi tren web terbaru.
        </p>
      </div>

      <div className="mt-12">
        <h3 className="text-sm font-medium tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
          Alat yang saya pakai
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {TOOLS.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-3 sm:flex-row">
        <a
          href="https://github.com/ilham"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
        >
          <GithubIcon className="h-4 w-4" />
          GitHub Saya
        </a>
        <a
          href="mailto:halo@ilham.dev"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500"
        >
          <MailIcon className="h-4 w-4" />
          Hubungi Saya
        </a>
        <span className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-100 px-6 py-3 text-sm font-medium text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
          <SparkleIcon className="h-4 w-4" />
          Terbuka untuk kolaborasi
        </span>
      </div>
    </div>
  );
}