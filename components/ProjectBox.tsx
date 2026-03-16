"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";

export default function ProjectBox({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        layoutId={`card-${project.id}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
        className="card-lift relative rounded-3xl overflow-hidden border cursor-pointer"
        style={{ background: project.cardBg, borderColor: "rgba(223,196,168,0.5)", borderRadius: "1.5rem" }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(); }}
        aria-label={`View ${project.name} project details`}
        transition={{ layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
      >
        {/* Glow */}
        <div
          className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-all duration-700"
          style={{
            background: project.accent,
            opacity: hovered ? 0.4 : 0.2,
            transform: hovered ? "scale(1.5) translate(10%,-10%)" : "scale(1) translate(15%,-15%)",
          }}
        />

        <div className="relative z-10 p-7 md:p-8" style={{ minHeight: "260px" }}>
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
                  border: `1px solid ${project.accent}35`,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {project.type}
              </span>
            </div>
            <motion.div
              animate={{ x: hovered ? 0 : -4, y: hovered ? 0 : 4, opacity: hovered ? 1 : 0.3 }}
              transition={{ duration: 0.2 }}
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ background: project.accent, color: "white" }}
            >
              <ArrowUpRight size={16} />
            </motion.div>
          </div>

          <h3
            className="leading-tight mb-2"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", color: "var(--clay-900)" }}
          >
            {project.name}
          </h3>
          <p
            className="text-sm mb-5 leading-relaxed"
            style={{ color: "var(--clay-600)", fontFamily: "var(--font-body)" }}
          >
            {project.tagline}
          </p>

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
    </motion.div>
  );
}
