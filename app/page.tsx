"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProjectBox from "@/components/ProjectBox";
import ProjectModal from "@/components/ProjectModal";
import { projects, skills, marqueeItems } from "@/lib/data";
import type { Project } from "@/lib/data";

// ─── LOADER ──────────────────────────────────────────────────────────────────

function Loader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 400);
    const t2 = setTimeout(() => setPhase("out"),  1900);
    const t3 = setTimeout(() => onDone(),         2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  const chars1 = "AYAAN".split("");
  const chars2 = "SAJJAD".split("");

  return (
    <motion.div
      animate={{ opacity: phase === "out" ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: "var(--clay-950)", zIndex: 9999 }}
    >
      <div style={{ overflow: "hidden", paddingBottom: "0.15em" }}>
        <div style={{ display: "flex" }}>
          {chars1.map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: "110%" }}
              animate={{ y: phase !== "in" ? 0 : "110%" }}
              transition={{ delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(3.5rem, 10vw, 7rem)",
                color: "var(--clay-50)",
                display: "inline-block",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {ch}
            </motion.span>
          ))}
        </div>
      </div>

      <div style={{ overflow: "hidden", paddingBottom: "0.15em", marginBottom: "2.5rem" }}>
        <div style={{ display: "flex" }}>
          {chars2.map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: "110%" }}
              animate={{ y: phase !== "in" ? 0 : "110%" }}
              transition={{ delay: 0.12 + i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(3.5rem, 10vw, 7rem)",
                color: "var(--clay-500)",
                display: "inline-block",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {ch}
            </motion.span>
          ))}
        </div>
      </div>

      <div style={{ width: 140, height: "2px", background: "rgba(255,255,255,0.1)", borderRadius: 999, overflow: "hidden", position: "relative" }}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: phase !== "in" ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "absolute", inset: 0, background: "var(--clay-500)", transformOrigin: "left", borderRadius: 999 }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: phase !== "in" ? 0.35 : 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--clay-400)", marginTop: "1rem", letterSpacing: "0.13em" }}
      >
        TORONTO, ON
      </motion.p>
    </motion.div>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200 hover:scale-105"
      style={{ borderColor: "var(--border)", color: "var(--clay-700)", background: "rgba(245,232,216,0.5)" }}
    >
      {icon}
    </a>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const blob1Y = useTransform(scrollY, [0, 600], [0, -100]);
  const blob2Y = useTransform(scrollY, [0, 600], [0, -160]);
  const blob3Y = useTransform(scrollY, [0, 600], [0, -70]);
  const contentY = useTransform(scrollY, [0, 600], [0, -60]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 px-6 text-center">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div className="blob blob-1" style={{ top: "5%", left: "-10%", y: blob1Y }} />
        <motion.div className="blob blob-2" style={{ top: "50%", right: "-8%", y: blob2Y }} />
        <motion.div className="blob blob-3" style={{ bottom: "8%", left: "28%", y: blob3Y }} />
      </div>

      <motion.div style={{ y: contentY }} className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="select-none mb-0"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(4rem, 14vw, 11.5rem)",
            color: "var(--clay-900)",
            letterSpacing: "-0.02em",
            lineHeight: 0.92,
          }}
        >
          Ayaan
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="select-none mb-7"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(4rem, 14vw, 11.5rem)",
            color: "var(--clay-500)",
            letterSpacing: "-0.02em",
            lineHeight: 0.92,
          }}
        >
          Sajjad
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-sm font-semibold uppercase tracking-widest mb-4"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
        >
          16 year old developer &middot; Toronto
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-base leading-relaxed max-w-sm mb-8"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
        >
          Building things that probably don&apos;t need to exist, but do anyway.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <SocialLink href="https://github.com/nordicator" icon={<Github size={17} />} label="GitHub" />
          <SocialLink href="https://linkedin.com/in/ayaan-sajjad" icon={<Linkedin size={17} />} label="LinkedIn" />
          <SocialLink href="mailto:contact@ayaansajjad.ca" icon={<Mail size={17} />} label="Email" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-8 flex flex-col items-center gap-2"
        style={{ color: "var(--clay-300)" }}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-10 rounded-full"
          style={{ background: "linear-gradient(to bottom, var(--clay-300), transparent)" }}
        />
      </motion.div>
    </section>
  );
}

// ─── MARQUEE ─────────────────────────────────────────────────────────────────

function MarqueeStrip() {
  const doubled = [...marqueeItems, ...marqueeItems];
  return (
    <div
      className="w-full overflow-hidden py-4 border-y"
      style={{ borderColor: "var(--border)", background: "var(--clay-100)" }}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="mx-8 text-xs font-semibold uppercase tracking-widest whitespace-nowrap"
            style={{
              color: i % 3 === 0 ? "var(--clay-500)" : i % 3 === 1 ? "var(--clay-700)" : "#8FA67A",
              fontFamily: "var(--font-mono)",
            }}
          >
            {item}
            <span className="mx-8 inline-block w-1 h-1 rounded-full align-middle" style={{ background: "var(--clay-300)" }} />
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section className="relative px-6 py-24 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--clay-500)", fontFamily: "var(--font-mono)" }}>
            About
          </p>
          <h2
            className="leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(2.2rem, 5vw, 3.2rem)", color: "var(--clay-900)" }}
          >
            Hey, I&apos;m <em style={{ color: "var(--clay-500)" }}>Ayaan</em>.
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
            I build things that excite me — which, honestly, could be anything. A robot that helps
            blind people navigate. A mobile app that makes a terrible grade portal actually usable.
            Whatever it is, it starts with a stupid idea I can&apos;t stop thinking about and ends
            (somehow) with working software.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
            I&apos;m 16, based in Toronto, and I care a lot about craft — both how things work and
            how they feel to use. There&apos;s something about making something from nothing, under
            pressure, that I genuinely love. The weirder the project, the better.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "var(--clay-500)", fontFamily: "var(--font-mono)" }}>
            Stack &amp; Skills
          </p>
          <div className="grid grid-cols-2 gap-3">
            {skills.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.04 * i, duration: 0.45 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-200 hover:scale-[1.02] cursor-default"
                  style={{ background: "var(--clay-100)", borderColor: "var(--border)" }}
                >
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0" style={{ background: "rgba(196,113,75,0.14)", color: "var(--clay-600)" }}>
                    <Icon size={14} strokeWidth={2} />
                  </div>
                  <span className="text-sm font-semibold" style={{ color: "var(--clay-800)", fontFamily: "var(--font-body)" }}>
                    {skill.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FEATURED PROJECTS ───────────────────────────────────────────────────────

function FeaturedProjects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section className="px-6 py-16 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--clay-500)", fontFamily: "var(--font-mono)" }}>
          Featured Work
        </p>
        <h2 className="leading-tight" style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "var(--clay-900)" }}>
          Things I&apos;ve <em style={{ color: "var(--clay-500)" }}>built</em>
        </h2>
        <p className="text-sm mt-2 max-w-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
          Click a project to see the full breakdown.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-5 mb-8">
        {projects.map((p, i) => (
          <ProjectBox key={p.id} project={p} index={i} onClick={() => setActiveProject(p)} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="flex justify-center"
      >
        <Link
          href="/projects"
          className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:gap-5 hover:shadow-xl"
          style={{ background: "var(--clay-500)", color: "#FAF0E6", fontFamily: "var(--font-body)", boxShadow: "0 4px 22px rgba(196,113,75,0.28)" }}
        >
          View all projects
          <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </motion.div>

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
    <footer className="relative overflow-hidden px-6 pt-24 pb-12" style={{ background: "var(--clay-900)" }}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[280px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "var(--clay-500)" }}
      />
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--clay-400)", fontFamily: "var(--font-mono)" }}>
            Let&apos;s work together
          </p>
          <h2 className="leading-tight mb-7" style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(3rem, 9vw, 7rem)", color: "var(--clay-50)" }}>
            Say <em style={{ color: "var(--clay-400)" }}>hello.</em>
          </h2>
          <a
            href="mailto:contact@ayaansajjad.ca"
            className="inline-block text-base font-semibold hover-link transition-opacity hover:opacity-75"
            style={{ color: "var(--clay-300)", fontFamily: "var(--font-body)" }}
          >
            contact@ayaansajjad.ca
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col items-center gap-5 pt-7 border-t md:grid md:grid-cols-3"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <p className="text-sm" style={{ color: "var(--clay-600)", fontFamily: "var(--font-mono)" }}>
            © 2026 Ayaan Sajjad
          </p>
          <p className="text-sm flex items-center justify-center gap-2" style={{ color: "var(--clay-600)", fontFamily: "var(--font-mono)" }}>
            Member of{" "}
            <a href="https://smallwoken.ca" target="_blank" rel="noopener noreferrer" className="hover-link transition-opacity hover:opacity-75" style={{ color: "var(--clay-400)", fontFamily: "var(--font-body)" }}>
              Smallwoken
            </a>
          </p>
          <div className="flex items-center justify-end gap-6">
            {[
              { label: "GitHub", href: "https://github.com/nordicator" },
              { label: "LinkedIn", href: "https://linkedin.com/in/ayaan-sajjad" },
              { label: "Cosmos", href: "https://cosmos.so/nordicator" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold hover-link transition-opacity hover:opacity-75"
                style={{ color: "var(--clay-400)", fontFamily: "var(--font-body)" }}
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <AnimatePresence>{!loaded && <Loader onDone={() => setLoaded(true)} />}</AnimatePresence>

      <div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: loaded ? 1 : 0 }} transition={{ duration: 0.3 }}>
          <Navbar />
        </motion.div>

        <Hero />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: loaded ? 1 : 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <MarqueeStrip />
          <AboutSection />
          <FeaturedProjects />
          <Footer />
        </motion.div>
      </div>
    </>
  );
}
