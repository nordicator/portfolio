"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import CopyEmailButton from "@/components/CopyEmailButton";
import Navbar from "@/components/Navbar";
import ProjectBox from "@/components/ProjectBox";
import ProjectModal from "@/components/ProjectModal";
import { CONTACT_EMAIL } from "@/lib/contact";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/data";

// ─── HEADER ──────────────────────────────────────────────────────────────────

function PageHeader() {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 px-6">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="blob blob-1" style={{ top: "-10%", right: "-8%", opacity: 0.65 }} />
        <div className="blob blob-3" style={{ bottom: "-5%", left: "3%", opacity: 0.45 }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
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
            style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(3.2rem, 10vw, 8rem)", color: "var(--clay-900)" }}
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

// ─── PROJECT LIST ─────────────────────────────────────────────────────────────

function ProjectList() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

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
          <ProjectBox key={p.id} project={p} index={i} onClick={() => setActiveProject(p)} />
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
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-60"
          style={{ color: "var(--clay-400)", fontFamily: "var(--font-body)" }}
        >
          <ArrowLeft size={13} />
          Back to home
        </Link>
        <p className="text-sm" style={{ color: "var(--clay-600)", fontFamily: "var(--font-mono)" }}>
          © 2026 Ayaan Sajjad
        </p>
        <CopyEmailButton
          ariaLabel="Copy contact email address"
          copiedChildren="Copied to clipboard"
          className="border-0 bg-transparent p-0 text-sm font-semibold transition-opacity hover:opacity-60 cursor-pointer"
          style={{ color: "var(--clay-400)", fontFamily: "var(--font-body)" }}
        >
          {CONTACT_EMAIL}
        </CopyEmailButton>
      </motion.div>
    </footer>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  return (
    <main>
      <Navbar activePage="projects" />
      <PageHeader />
      <ProjectList />
      <Footer />
    </main>
  );
}
