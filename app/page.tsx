import type { Metadata } from "next";
import Hero from "../components/hero";
import AboutSection from "../components/about-section";
import ProjectsSection from "../components/projects-section";
import SkillsSection from "../components/skills-section";
import ContactSection from "../components/contact-section";
import { getPortfolioProjects } from "../lib/github";

export const metadata: Metadata = {
  title: "Ilham — Front-End Developer",
  description:
    "Portofolio Ilham, front-end developer dari Indonesia. Membangun web cepat, indah, dan bermakna dengan Next.js, React, Tailwind CSS, dan GSAP.",
};

export default async function HomePage() {
  const allProjects = await getPortfolioProjects();

  return (
    <div className="relative overflow-hidden">
      {/* 1. Hero Section */}
      <div id="top">
        <Hero />
      </div>

      {/* 2. About Section */}
      <div className="border-t border-zinc-100 dark:border-zinc-900/80">
        <AboutSection />
      </div>

      {/* 3. Projects Section */}
      <div className="border-t border-zinc-100 dark:border-zinc-900/80 bg-zinc-50/30 dark:bg-zinc-900/20">
        <ProjectsSection projects={allProjects} />
      </div>

      {/* 4. Skills Section */}
      <div className="border-t border-zinc-100 dark:border-zinc-900/80">
        <SkillsSection />
      </div>

      {/* 5. Contact Section */}
      <div className="border-t border-zinc-100 dark:border-zinc-900/80 bg-zinc-50/30 dark:bg-zinc-900/20 pb-16">
        <ContactSection />
      </div>
    </div>
  );
}