export default function Footer() {
  return (
    <footer className="border-t border-zinc-200/60 py-12 dark:border-zinc-800/60">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Ilham — Front-End Developer
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} Dibangun dengan Next.js, Tailwind CSS & GSAP. Single Page Portfolio.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs text-zinc-500 dark:text-zinc-400">
          <a
            href="#about"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            About
          </a>
          <a
            href="#projects"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            Projects
          </a>
          <a
            href="#skills"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            Skills
          </a>
          <a
            href="#contact"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            Contact
          </a>
          <a
            href="https://github.com/ilham"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            GitHub
          </a>
          <a
            href="mailto:halo@ilham.dev"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}