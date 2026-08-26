"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Hero halaman utama — "banner" ala Apple:
 * teks besar muncul dengan fade-up natural saat scroll,
 * disertai efek blur-to-sharp (mask) yang halus.
 *
 * Menggunakan useGSAP (pola resmi GSAP untuk Next.js):
 *  - scope otomatis ke ref (.hero) → aman dari StrictMode double-invoke.
 *  - cleanup otomatis via useGSAP's revert saat unmount.
 */
export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Anti-FOUC: elemen sudah tersembunyi via CSS (html.js [data-hero-fade]),
      // jadi pakai gsap.set → gsap.to (tanpa immediateRender) — tidak ada flash
      // terlihat-dulu.
      // Fade-up progresif: eyebrow → sub → CTA (stagger alami)
      gsap.set("[data-hero-fade]", { y: 40, opacity: 0 });
      gsap.to("[data-hero-fade]", {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.2,
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });

      // Blur mask pada headline: dari blur(12px) → tajam
      gsap.set("[data-hero-title]", { y: 24, filter: "blur(12px)", opacity: 0.4 });
      gsap.to("[data-hero-title]", {
        filter: "blur(0px)",
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "power3.out",
        delay: 0.45,
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
      ScrollTrigger.refresh();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="mx-auto flex max-w-5xl flex-col items-center px-5 pt-40 pb-28 text-center">
      <p
        data-hero-fade
        className="mb-6 text-sm font-medium tracking-widest text-zinc-500 uppercase dark:text-zinc-400"
      >
        Front-End Developer
      </p>
      <h1
        data-hero-title
        className="max-w-4xl text-5xl leading-[1.05] font-semibold tracking-tight text-zinc-900 sm:text-7xl dark:text-zinc-50"
      >
        Membangun web yang cepat, indah,
        <br className="hidden sm:block" />
        <span className="text-zinc-400 dark:text-zinc-500">dan bermakna.</span>
      </h1>
      <p
        data-hero-fade
        className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
      >
        Saya Ilham, front-end developer dari Indonesia. Fokus pada performa, detail interaksi,
        dan pengalaman pengguna yang mulus — dari kode pertama hingga deploy.
      </p>
      <div
        data-hero-fade
        className="mt-10 flex flex-col gap-3 sm:flex-row"
      >
        <a
          href="#projects"
          className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-blue-500/30"
        >
          Lihat Proyek
        </a>
        <a
          href="#about"
          className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
        >
          Tentang Saya
        </a>
      </div>
    </section>
  );
}