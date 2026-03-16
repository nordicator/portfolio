"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ArrowUpRight, ArrowLeft } from "lucide-react";
import type { Project } from "@/lib/data";

export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.classList.add("modal-open");
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  return (
    <motion.div
      layoutId={`card-${project.id}`}
      className="fixed inset-0 z-[200] overflow-y-auto"
      style={{ background: project.cardBg, scrollbarWidth: "none", borderRadius: 0 }}
      transition={{ layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.15 }}
      >
        {/* Ambient glow */}
        <div
          className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
          style={{ background: project.accent, opacity: 0.1, transform: "translate(35%, -35%)" }}
        />

        {/* Back button */}
        <div className="px-6 md:px-12 pt-8">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-opacity hover:opacity-60"
            style={{ color: "var(--clay-700)", fontFamily: "var(--font-mono)" }}
          >
            <ArrowLeft size={13} />
            Back
          </button>
        </div>

        {/* Page content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-14 md:py-20">

          {/* Hero header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14"
          >
            <div className="flex items-center gap-2 mb-5 flex-wrap">
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: project.accent, fontFamily: "var(--font-mono)" }}
              >
                {project.year}
              </span>
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                style={{
                  background: `${project.accent}1A`,
                  color: project.accent,
                  border: `1px solid ${project.accent}35`,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {project.status}
              </span>
            </div>
            <h1
              className="leading-[0.9] mb-5"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(3rem, 9vw, 7rem)",
                color: "var(--clay-900)",
                letterSpacing: "-0.02em",
              }}
            >
              {project.fullName}
            </h1>
            <p
              className="text-base md:text-lg"
              style={{ color: "var(--clay-600)", fontFamily: "var(--font-body)" }}
            >
              {project.tagline}
            </p>
          </motion.div>

          <div className="h-px w-full mb-14" style={{ background: `${project.accent}25` }} />

          {/* Two-column body */}
          <div className="grid md:grid-cols-3 gap-10 md:gap-16 items-start">

            {/* Left: main content */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-2 space-y-12"
            >
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-5"
                  style={{ color: project.accent, fontFamily: "var(--font-mono)" }}
                >
                  Overview
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "var(--clay-700)", fontFamily: "var(--font-body)" }}
                >
                  {project.description}
                </p>
              </div>

              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-6"
                  style={{ color: project.accent, fontFamily: "var(--font-mono)" }}
                >
                  What it does
                </p>
                <ol className="space-y-5">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span
                        className="mt-0.5 text-xs font-bold shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{
                          background: `${project.accent}20`,
                          color: project.accent,
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {i + 1}
                      </span>
                      <span
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--clay-700)", fontFamily: "var(--font-body)" }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>

            {/* Right: sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="md:sticky md:top-24 space-y-8"
            >
              {/* Tech Stack */}
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: project.accent, fontFamily: "var(--font-mono)" }}
                >
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold"
                      style={{
                        background: `${project.accent}15`,
                        color: project.accent,
                        border: `1px solid ${project.accent}35`,
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Team */}
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: project.accent, fontFamily: "var(--font-mono)" }}
                >
                  Team
                </p>
                <div className="space-y-2">
                  {project.team.map((m) => (
                    <div key={m.name} className="flex items-center gap-2">
                      <a
                        href={m.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 flex-1 px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all hover:scale-[1.02]"
                        style={{
                          background: "rgba(44,14,10,0.04)",
                          borderColor: `${project.accent}28`,
                          color: "var(--clay-700)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        <Github size={12} />
                        {m.name}
                      </a>
                      {m.linkedin && (
                        <a
                          href={m.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-9 h-9 rounded-xl border transition-all hover:scale-[1.02] shrink-0"
                          style={{
                            background: "rgba(44,14,10,0.04)",
                            borderColor: `${project.accent}28`,
                            color: "var(--clay-700)",
                          }}
                          aria-label={`${m.name} on LinkedIn`}
                        >
                          <Linkedin size={12} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-1">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-2xl font-bold text-sm transition-all hover:gap-4"
                    style={{
                      background: project.accent,
                      color: "white",
                      fontFamily: "var(--font-body)",
                      boxShadow: `0 6px 24px ${project.accent}45`,
                    }}
                  >
                    Visit {project.displayUrl}
                    <ArrowUpRight size={15} />
                  </a>
                ) : project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-2xl font-bold text-sm transition-all hover:gap-4"
                    style={{
                      background: project.accent,
                      color: "white",
                      fontFamily: "var(--font-body)",
                      boxShadow: `0 6px 24px ${project.accent}45`,
                    }}
                  >
                    View on GitHub
                    <ArrowUpRight size={15} />
                  </a>
                ) : null}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
