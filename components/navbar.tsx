"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const NAV_LINKS = [
  { href: "#about", label: "About", id: "about" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#contact", label: "Contact", id: "contact" },
] as const;

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  // Monitor scroll position untuk efek glassmorphism dinamis (selalu muncul saat scroll atas, bawah, maupun diam)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer untuk menandai link navbar yang sedang aktif
  useEffect(() => {
    const sectionIds = ["about", "projects", "skills", "contact"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    // Di halaman selain home (mis. /projects/[slug]) section anchor tidak ada —
    // navigasikan kembali ke home dengan hash agar menu tetap berfungsi.
    if (!isHome) {
      setActiveSection("");
      router.push(href === "#top" ? "/" : `/${href}`);
      return;
    }

    if (href === "#" || href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("");
      return;
    }

    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      // Selaraskan hash URL tanpa trigger lompatan ulang —
      // supaya refresh tetap di section yang sama.
      history.replaceState(null, "", href);
      setActiveSection(targetId);
    }
  };

  return (
    <header
      ref={headerRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 transition-all duration-300"
    >
      <nav
        className={`oh-nav pointer-events-auto flex h-12 items-center gap-1 rounded-full border px-2 sm:px-3 shadow-lg backdrop-blur-xl transition-all duration-300 ${
          isScrolled
            ? "border-zinc-200/90 bg-white/90 shadow-zinc-950/10 dark:border-zinc-800/90 dark:bg-zinc-950/90"
            : "border-zinc-200/60 bg-white/70 shadow-zinc-950/5 dark:border-zinc-800/60 dark:bg-zinc-950/70"
        }`}
      >
        <a
          href="#top"
          onClick={(e) => handleScrollTo(e, "#top")}
          className="px-2.5 py-1 text-sm font-semibold tracking-tight text-zinc-900 transition-colors hover:text-blue-600 dark:text-zinc-50 dark:hover:text-blue-400"
        >
          ilham<span className="text-blue-600 dark:text-blue-400">.dev</span>
        </a>

        <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />

        <div className="flex items-center gap-0.5">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                aria-current={isActive ? "page" : undefined}
                className={`relative rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </nav>
    </header>
  );
}