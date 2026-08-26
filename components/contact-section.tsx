"use client";

import { useState } from "react";
import { SectionHeading } from "./primitives";
import { MailIcon, GithubIcon, LinkedInIcon, CopyIcon, CheckIcon, SparkleIcon, SendIcon } from "./icons";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "halo@ilham.dev";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-20">
      <SectionHeading
        eyebrow="Kontak & Kolaborasi"
        title="Mari Terhubung & Bangun Sesuatu yang Hebat"
      />

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Kolom Kiri: Contact Cards & Email copy */}
        <div className="space-y-6 lg:col-span-6">
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">
            Saya selalu terbuka untuk mendiskusikan peluang proyek baru, tawaran kerja sama tim,
            atau sekadar berbagi ide seputar front-end development dan desain interaktif.
          </p>

          {/* Direct Email Card */}
          <div className="rounded-3xl border border-zinc-200/80 bg-zinc-50/50 p-6 dark:border-zinc-800/80 dark:bg-zinc-900/40">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Email Langsung
            </span>
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <a
                href={`mailto:${email}`}
                className="text-lg font-bold text-zinc-900 dark:text-zinc-50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {email}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 shadow-2xs transition-all hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
              >
                {copied ? (
                  <>
                    <CheckIcon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="h-3.5 w-3.5" />
                    Salin Email
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="https://github.com/ilham"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 rounded-2xl border border-zinc-200/80 bg-white p-4 transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/80 dark:hover:border-zinc-700"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                <GithubIcon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">GitHub</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">github.com/ilham</p>
              </div>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 rounded-2xl border border-zinc-200/80 bg-white p-4 transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/80 dark:hover:border-zinc-700"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <LinkedInIcon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">LinkedIn</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Koneksi Profesional</p>
              </div>
            </a>
          </div>

          {/* Status Box */}
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-4 text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <p className="text-xs font-medium">
              Sedang menerima proyek baru & terbuka untuk tawaran kerja full-time/kontrak.
            </p>
          </div>
        </div>

        {/* Kolom Kanan: Direct Send Inquiry Form */}
        <div className="lg:col-span-6 rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800/80 dark:bg-zinc-900/90">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg">
              Kirim Pesan Cepat
            </h3>
            <SparkleIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const name = (form.elements.namedItem("name") as HTMLInputElement).value;
              const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
              const subject = encodeURIComponent(`Pesan dari ${name} via Portfolio`);
              const body = encodeURIComponent(`Nama: ${name}\n\nPesan:\n${message}`);
              window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="contact-name" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Nama Anda
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                placeholder="mis. Budi Santoso"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Pesan / Pertanyaan
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                placeholder="Ceritakan tentang proyek atau tujuan kolaborasi Anda..."
                className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-zinc-800 active:scale-[0.99] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <SendIcon className="h-4 w-4" />
              Kirim via Email Client
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
