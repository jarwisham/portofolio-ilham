import type { ReactNode } from "react";

// Badge / tag kecil yang dipakai di kartu project & header.
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
      {children}
    </span>
  );
}

// Judul section dengan aksen kecil di atasnya (gaya Apple: label kecil + title besar).
export function SectionHeading({
  eyebrow,
  title,
  className = "",
}: {
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`mb-12 ${className}`}>
      <p className="mb-3 text-sm font-medium tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        {title}
      </h2>
    </div>
  );
}