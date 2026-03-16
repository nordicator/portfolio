"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowUpRight, X, Github, ExternalLink } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    name: "BetterTA",
    fullName: "BetterTeachAssist",
    tagline: "Modern grade portal for YRDSB students",
    url: "https://betterta.ca",
    displayUrl: "betterta.ca",
    year: "2025",
    status: "Live",
    description:
      "A mobile application for York Region District School Board students that replaces the clunky official TeachAssist portal with a fast, modern, actually enjoyable interface. Grade tracking should feel good — so we rebuilt it from scratch.",
    features: [
      "Modern, clean interface for viewing grades and courses",
      "Grade prediction powered by your historical data",
      "Course and school-level analytics dashboard",
      "Class chatrooms for connecting with classmates",
      "YRAA integration for sports rankings and game schedules",
      "Optional anonymous data sharing mode",
      "Native widgets for iOS and Android",
    ],
    tech: ["React Native", "Expo", "TypeScript", "Supabase", "Go"],
    team: [
      { name: "Ayaan", github: "https://github.com/nordicator" },
      { name: "Awsaf", github: "https://github.com/CDX-1" },
    ],
    accent: "#C4714B",
    cardBg: "#F0DDD0",
    type: "Mobile App",
  },
  {
    id: 2,
    name: "Ralph",
    fullName: "Ralph — AI Guide Dog",
    tagline: "Autonomous robot for visual navigation assistance",
    url: null,
    displayUrl: null,
    repoUrl: "https://github.com/CDX-1/ralph",
    year: "2026",
    status: "DeltaHacks 12",
    description:
      "An autonomous robot car that uses computer vision and machine learning to help people with visual impairments navigate their environment. Built at DeltaHacks 12 at McMaster University — 48 hours, four people, one moving robot.",
    features: [
      "Divides camera view into 5 columns for spatial analysis",
      "Real-time object detection with YOLOv8",
      "Depth estimation using MiDaS to judge distance to obstacles",
      "Risk assessment per object and navigation path planning",
      "Autonomous motor control via Raspberry Pi 5",
      "Emergency braking when hazards are detected",
    ],
    tech: ["Python", "YOLOv8", "MiDaS", "Raspberry Pi 5", "OpenCV"],
    team: [
      { name: "Ayaan", github: "https://github.com/nordicator" },
      { name: "Awsaf", github: "https://github.com/CDX-1" },
      { name: "Dinesh", github: "https://github.com/Crackle2K" },
      { name: "Richard", github: "https://github.com/richardliuu" },
    ],
    accent: "#B8926A",
    cardBg: "#EDE0CE",
    type: "Robotics / ML",
  },
];

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div
        className="flex items-center gap-1 px-3 py-2 rounded-full border"
        style={{
          background: "rgba(251,245,236,0.92)",
          backdropFilter: "blur(16px)",
          borderColor: "rgba(223,196,168,0.8)",
          boxShadow: "0 4px 20px rgba(44,14,10,0.08)",
        }}
      >
        <Link
          href="/"
          className="flex items-center justify-center w-8 h-8 rounded-full font-bold mr-1 transition-all hover:scale-105 select-none"
          style={{ background: "var(--clay-500)", color: "#FAF0E6", fontFamily: "var(--font-display)", fontSize: "1.05rem" }}
        >
          A
        </Link>
        <NavLink href="/" label="Home" />
        <NavLink href="/projects" label="Projects" active />
        <a
          href="mailto:contact@ayaansajjad.ca"
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold ml-1 hover:opacity-90 transition-opacity"
          style={{ background: "var(--clay-500)", color: "#FAF0E6", fontFamily: "var(--font-body)" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block"
            style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          Contact
        </a>
      </div>
    </motion.nav>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-black/5"
      style={{
        color: active ? "var(--clay-500)" : "var(--clay-800)",
        fontFamily: "var(--font-body)",
        background: active ? "rgba(196,113,75,0.1)" : undefined,
      }}
    >
      {label}
    </Link>
  );
}

// ─── HEADER ──────────────────────────────────────────────────────────────────

function PageHeader() {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 px-6">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="blob blob-1" style={{ top: "-10%", right: "-8%", opacity: 0.65 }} />
        <div className="blob blob-3" style={{ bottom: "-5%", left: "3%", opacity: 0.45 }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-8 transition-opacity hover:opacity-60"
            style={{ color: "var(--clay-500)", fontFamily: "var(--font-mono)" }}
          >
            <ArrowLeft size={11} />
            Back
          </Link>
        </motion.div>

        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="leading-[0.88] tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(3.2rem, 10vw, 8rem)",
              color: "var(--clay-900)",
            }}
          >
            My Work
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="text-base leading-relaxed max-w-lg mt-5"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
        >
          A collection of things I&apos;ve built — some at hackathons, some just because I couldn&apos;t
          let the idea go. Click any project to see the full breakdown.
        </motion.p>
      </div>
    </section>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────

function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof projects)[0];
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.classList.add("modal-open");
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  const repoUrl = "repoUrl" in project ? (project as { repoUrl?: string }).repoUrl : undefined;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-6"
      style={{ background: "rgba(28,15,10,0.72)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl rounded-t-3xl md:rounded-3xl overflow-y-auto"
        style={{
          background: project.cardBg,
          maxHeight: "90vh",
          boxShadow: "0 -20px 80px rgba(28,15,10,0.3)",
          scrollbarWidth: "none",
          overscrollBehavior: "contain",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner glow */}
        <div
          className="absolute top-0 right-0 w-60 h-60 rounded-full blur-3xl pointer-events-none"
          style={{ background: project.accent, opacity: 0.18, transform: "translate(30%,-30%)" }}
        />

        <div className="relative z-10 p-8 md:p-10">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: "rgba(44,14,10,0.08)", color: "var(--clay-700)" }}
            aria-label="Close"
          >
            <X size={16} />
          </button>

          {/* Header */}
          <div className="pr-12 mb-6">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: project.accent, fontFamily: "var(--font-mono)" }}
              >
                {project.year}
              </span>
              <span
                className="px-2 py-0.5 rounded-full text-xs font-semibold"
                style={{
                  background: `${project.accent}1A`,
                  color: project.accent,
                  border: `1px solid ${project.accent}38`,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {project.status}
              </span>
              <span
                className="px-2 py-0.5 rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(44,14,10,0.07)",
                  color: "var(--clay-600)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {project.type}
              </span>
            </div>
            <h2
              className="leading-tight mb-2"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
                color: "var(--clay-900)",
              }}
            >
              {project.fullName}
            </h2>
            <p className="text-sm font-semibold" style={{ color: "var(--clay-600)", fontFamily: "var(--font-body)" }}>
              {project.tagline}
            </p>
          </div>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-7"
            style={{ color: "var(--clay-700)", fontFamily: "var(--font-body)" }}
          >
            {project.description}
          </p>

          {/* Features */}
          <div className="mb-7">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: project.accent, fontFamily: "var(--font-mono)" }}
            >
              Features
            </p>
            <ul className="space-y-2.5">
              {project.features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-relaxed"
                  style={{ color: "var(--clay-700)", fontFamily: "var(--font-body)" }}
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: project.accent }}
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="mb-7">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: project.accent, fontFamily: "var(--font-mono)" }}
            >
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: `${project.accent}14`,
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
          <div className="mb-8">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: project.accent, fontFamily: "var(--font-mono)" }}
            >
              Team
            </p>
            <div className="flex flex-wrap gap-2">
              {project.team.map((m) => (
                <a
                  key={m.name}
                  href={m.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all hover:scale-105"
                  style={{
                    background: "rgba(44,14,10,0.05)",
                    borderColor: "var(--border)",
                    color: "var(--clay-700)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <Github size={11} />
                  {m.name}
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3 flex-wrap">
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all hover:gap-4"
                style={{
                  background: project.accent,
                  color: "white",
                  fontFamily: "var(--font-body)",
                  boxShadow: `0 4px 20px ${project.accent}45`,
                }}
              >
                <ExternalLink size={14} />
                Visit {project.displayUrl}
                <ArrowUpRight size={14} />
              </a>
            ) : (
              repoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all hover:gap-4"
                  style={{
                    background: project.accent,
                    color: "white",
                    fontFamily: "var(--font-body)",
                    boxShadow: `0 4px 20px ${project.accent}45`,
                  }}
                >
                  <Github size={14} />
                  View on GitHub
                  <ArrowUpRight size={14} />
                </a>
              )
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── PROJECT CARD (BOX) ───────────────────────────────────────────────────────

function ProjectBox({
  project,
  index,
  onClick,
}: {
  project: (typeof projects)[0];
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="card-lift relative rounded-3xl overflow-hidden border"
      style={{ background: project.cardBg, borderColor: "rgba(223,196,168,0.5)" }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(); }}
      aria-label={`View ${project.name} project details`}
    >
      {/* Glow blob */}
      <div
        className="absolute top-0 right-0 w-52 h-52 rounded-full blur-3xl pointer-events-none transition-all duration-700"
        style={{
          background: project.accent,
          opacity: hovered ? 0.38 : 0.18,
          transform: hovered ? "scale(1.5) translate(10%,-10%)" : "scale(1) translate(15%,-15%)",
        }}
      />

      <div className="relative z-10 p-7 md:p-9">
        {/* Top row: badges + arrow */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: project.accent, fontFamily: "var(--font-mono)" }}
            >
              {project.year}
            </span>
            <span
              className="px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{
                background: `${project.accent}18`,
                color: project.accent,
                border: `1px solid ${project.accent}38`,
                fontFamily: "var(--font-mono)",
              }}
            >
              {project.type}
            </span>
            <span
              className="px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(44,14,10,0.06)",
                color: "var(--clay-600)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {project.status}
            </span>
          </div>

          <motion.div
            animate={{ x: hovered ? 0 : -4, y: hovered ? 0 : 4, opacity: hovered ? 1 : 0.28 }}
            transition={{ duration: 0.2 }}
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ background: project.accent, color: "white" }}
          >
            <ArrowUpRight size={16} />
          </motion.div>
        </div>

        {/* Name */}
        <h3
          className="leading-tight mb-2"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            color: "var(--clay-900)",
          }}
        >
          {project.name}
        </h3>

        {/* Tagline */}
        <p
          className="text-sm mb-5 leading-relaxed"
          style={{ color: "var(--clay-600)", fontFamily: "var(--font-body)" }}
        >
          {project.tagline}
        </p>

        {/* Description preview */}
        <p
          className="text-sm leading-relaxed mb-6 line-clamp-2"
          style={{ color: "var(--clay-500)", fontFamily: "var(--font-body)" }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
              style={{
                background: `${project.accent}14`,
                color: project.accent,
                border: `1px solid ${project.accent}30`,
                fontFamily: "var(--font-mono)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── PROJECT LIST ─────────────────────────────────────────────────────────────

function ProjectList() {
  const [activeProject, setActiveProject] = useState<(typeof projects)[0] | null>(null);

  return (
    <section className="px-6 pb-24 max-w-5xl mx-auto">
      <div className="h-px w-full mb-10" style={{ background: "var(--border)" }} />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="text-xs font-semibold uppercase tracking-widest mb-8"
        style={{ color: "var(--clay-500)", fontFamily: "var(--font-mono)" }}
      >
        {projects.length} Projects
      </motion.p>

      <div className="grid sm:grid-cols-2 gap-5">
        {projects.map((p, i) => (
          <ProjectBox
            key={p.id}
            project={p}
            index={i}
            onClick={() => setActiveProject(p)}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="relative overflow-hidden px-6 pt-20 pb-10" style={{ background: "var(--clay-900)" }}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-56 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "var(--clay-500)" }}
      />
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-60"
          style={{ color: "var(--clay-400)", fontFamily: "var(--font-body)" }}
        >
          <ArrowLeft size={13} />
          Back to home
        </Link>
        <p className="text-sm" style={{ color: "var(--clay-600)", fontFamily: "var(--font-mono)" }}>
          © 2025 Ayaan Sajjad
        </p>
        <a
          href="mailto:contact@ayaansajjad.ca"
          className="text-sm font-semibold transition-opacity hover:opacity-60"
          style={{ color: "var(--clay-400)", fontFamily: "var(--font-body)" }}
        >
          contact@ayaansajjad.ca
        </a>
      </div>
    </footer>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  return (
    <main>
      <Navbar />
      <PageHeader />
      <ProjectList />
      <Footer />
    </main>
  );
}
