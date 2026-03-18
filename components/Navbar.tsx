"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import CopyEmailButton from "@/components/CopyEmailButton";

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

export default function Navbar({ activePage }: { activePage?: "home" | "projects" }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div
        className="flex items-center gap-1 px-3 py-2 rounded-full border transition-all duration-300"
        style={{
          background: scrolled ? "rgba(251,245,236,0.92)" : "rgba(251,245,236,0.7)",
          backdropFilter: "blur(16px)",
          borderColor: "rgba(223,196,168,0.8)",
          boxShadow: scrolled ? "0 6px 28px rgba(44,14,10,0.1)" : "0 2px 10px rgba(44,14,10,0.05)",
        }}
      >
        <Link
          href="/fun"
          className="flex items-center justify-center w-8 h-8 rounded-full font-bold mr-1 transition-all hover:scale-105 select-none"
          style={{ background: "var(--clay-500)", color: "#FAF0E6", fontFamily: "var(--font-display)", fontSize: "1.05rem" }}
        >
          A
        </Link>
        <NavLink href="/" label="Home" active={activePage === "home"} />
        <NavLink href="/projects" label="Projects" active={activePage === "projects"} />
        <CopyEmailButton
          ariaLabel="Copy contact email address"
          copiedChildren={
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
              Copied!
            </>
          }
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold ml-1 hover:opacity-90 transition-opacity cursor-pointer"
          style={{ background: "var(--clay-500)", color: "#FAF0E6", fontFamily: "var(--font-body)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
          Contact
        </CopyEmailButton>
      </div>
    </motion.nav>
  );
}
