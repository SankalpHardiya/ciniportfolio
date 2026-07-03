"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-8 0C5.27.65 4.09 1 4.09 1A5.07 5.07 0 0 0 4 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 18.13V22" />
  </svg>
);

const ExternalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 3h3v3" />
    <path d="M11 13 21 3" />
    <path d="M21 14v7H3V3h7" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </svg>
);

const projects = [
  {
    id: 1,
    title: "AI Resume Analyzer",
    image: "/project-1.jpg",
    github: "https://github.com/SankalpHardiya/airesumeh",
    live: "https://airesumeh.vercel.app/",
    description: "AI Resume Analyzer is a full-stack SaaS application that helps job seekers optimize resumes using AI-powered ATS analysis, keyword detection, resume rewriting, analytics, and version tracking.\n\nTech Stack: React • Express • MongoDB • Gemini AI • JWT",
  },
  {
    id: 2,
    title: "Herbal Garden",
    image: "/project-2.jpg",
    github: "https://github.com/SankalpHardiya/Minor-Project",
    live: "https://herbalgarden0.netlify.app/",
    description: "Interactive educational website showcasing medicinal plants with beautiful UI, search functionality, responsive layouts and engaging animations.\n\nTech Stack: React • HTML • CSS • JavaScript",
  },
  {
    id: 3,
    title: "Finance Dashboard",
    image: "/project-3.jpg",
    github: "https://github.com/SankalpHardiya/finance-dashboard",
    live: "https://financedashboard-kappa.vercel.app/",
    description: "Modern financial dashboard featuring analytics, role-based access, interactive charts, CSV export and responsive design.\n\nTech Stack: React • Material UI • Recharts",
  },
  {
    id: 4,
    title: "Inkspire",
    image: "/project-4.jpg",
    github: "https://github.com/SankalpHardiya/Inkspire",
    live: "https://quotesapp-frontend-v2.netlify.app/",
    description: "Community-driven quote platform with authentication, dashboards, likes, CRUD operations and elegant UI animations.\n\nTech Stack: Next.js • TypeScript • PostgreSQL • Prisma",
  },
];

export default function PortfolioSection() {
  const [selected, setSelected] = useState<any>(null);

  return (
    <section className="flex justify-center bg-background py-12 sm:py-20 lg:py-28 transition-colors duration-300 overflow-hidden">
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-8">
        <div className="text-center mb-12 sm:mb-20 lg:mb-24">
          <p className="font-mono tracking-[0.2em] sm:tracking-[0.4em] text-xs text-muted-foreground mb-3">
            SELECTED WORKS
          </p>
          <h2 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl lg:text-7xl">
            PROJECTS
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-16 lg:gap-x-20 lg:gap-y-28">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="flex justify-center w-full"
            >
              <motion.div
                whileHover={{ rotate: 1, transition: { duration: 0.25 } }}
                onClick={() => setSelected(project)}
                // FIXED: Changed from w-[500px] to w-full max-w-[500px]
                className="group relative w-full max-w-[500px] cursor-pointer"
              >
                {/* Back Paper */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-border bg-card rotate-[-7deg] -translate-y-4 transition-all duration-300 group-hover:-rotate-[11deg] group-hover:-translate-y-6" />

                {/* Middle Paper */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-border bg-card rotate-[7deg] translate-y-4 transition-all duration-300 group-hover:rotate-[11deg] group-hover:translate-y-6" />

                {/* Main Card */}
                <div className="relative rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-border bg-card p-3 sm:p-6 shadow-2xl transition-colors duration-300">
                  <div className="overflow-hidden rounded-xl sm:rounded-2xl border-2 sm:border-4 border-border bg-muted">
                    <img
                      src={project.image}
                      alt={project.title}
                      // FIXED: Dynamic image height based on screen size
                      className="h-[250px] sm:h-[300px] lg:h-[340px] w-full object-contain bg-card transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 sm:mt-6 flex items-center justify-between pr-2">
                    <h3 className="font-[family-name:var(--font-bebas)] text-3xl sm:text-4xl lg:text-5xl tracking-wide leading-tight">
                      {project.title}
                    </h3>
                    <motion.div
                      whileHover={{ x: 4, y: -4 }}
                      className="text-3xl sm:text-4xl lg:text-5xl"
                    >
                      ↗
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 80 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 80 }}
              transition={{ duration: 0.35 }}
              // FIXED: Changed to flex-col on mobile, md:flex-row on desktop
              className="relative flex flex-col md:flex-row w-full max-w-5xl lg:max-w-7xl max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl md:rounded-[32px] bg-card shadow-2xl border border-border transition-colors duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 sm:right-6 sm:top-6 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-foreground text-background transition hover:scale-110"
              >
                <CloseIcon />
              </button>

              {/* Image Section */}
              {/* FIXED: Changed w-1/2 to w-full on mobile, md:w-1/2 on desktop */}
              <div className="flex w-full md:w-1/2 items-center justify-center bg-muted p-6 sm:p-10 transition-colors duration-300">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="max-h-[50vh] md:max-h-[85vh] w-full object-contain"
                />
              </div>

              {/* Content Section */}
              {/* FIXED: Changed w-1/2 to w-full on mobile, md:w-1/2 on desktop */}
              <div className="flex w-full md:w-1/2 flex-col justify-center p-8 sm:p-12 md:p-16">
                <p className="mb-4 font-mono text-xs tracking-[0.35em] text-muted-foreground">
                  FEATURED PROJECT
                </p>
                <h2 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl lg:text-7xl leading-none">
                  {selected.title}
                </h2>
                
                <p className="mt-6 sm:mt-8 whitespace-pre-line text-base sm:text-lg leading-8 sm:leading-9 text-foreground">
                  {selected.description}
                </p>

                {/* FIXED: Stack buttons on mobile */}
                <div className="mt-8 sm:mt-14 flex flex-col sm:flex-row gap-4 sm:gap-5">
                  <a
                    href={selected.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 rounded-full bg-foreground text-background px-8 py-4 font-[family-name:var(--font-bebas)] text-2xl tracking-wider transition hover:scale-105"
                  >
                    <GithubIcon />
                    GITHUB
                  </a>
                  <a
                    href={selected.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 rounded-full border-2 border-foreground px-8 py-4 font-[family-name:var(--font-bebas)] text-2xl tracking-wider transition hover:bg-foreground hover:text-background"
                  >
                    <ExternalIcon />
                    LIVE
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}