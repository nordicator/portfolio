import { Code2, Smartphone, Terminal, Layers, Palette, Monitor } from "lucide-react";

export type TeamMember = {
  name: string;
  github: string;
  linkedin?: string;
};

export type Project = {
  id: number;
  name: string;
  fullName: string;
  tagline: string;
  url: string | null;
  displayUrl: string | null;
  repoUrl?: string;
  year: string;
  status: string;
  description: string;
  features: string[];
  tech: string[];
  team: TeamMember[];
  accent: string;
  cardBg: string;
  type: string;
};

export const projects: Project[] = [
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
      { name: "Ayaan", github: "https://github.com/nordicator", linkedin: "https://linkedin.com/in/ayaan-sajjad" },
      { name: "Awsaf", github: "https://github.com/CDX-1", linkedin: "https://linkedin.com/in/awsaf-syed" },
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
      "Risk assessment per object and navigation path",
      "Autonomous path planning and motor control",
      "Emergency braking when hazards are detected",
    ],
    tech: ["Python", "YOLOv8", "MiDaS", "Raspberry Pi 5", "OpenCV"],
    team: [
      { name: "Ayaan", github: "https://github.com/nordicator", linkedin: "https://linkedin.com/in/ayaan-sajjad" },
      { name: "Awsaf", github: "https://github.com/CDX-1", linkedin: "https://linkedin.com/in/awsaf-syed" },
      { name: "Dinesh", github: "https://github.com/Crackle2K", linkedin: "https://linkedin.com/in/dsinnath" },
      { name: "Richard", github: "https://github.com/richardliuu", linkedin: "https://linkedin.com/in/richard-liu-37b70232a" },
    ],
    accent: "#B8926A",
    cardBg: "#EDE0CE",
    type: "Robotics / ML",
  },
];

export const skills = [
  { label: "TypeScript", icon: Code2 },
  { label: "JavaScript", icon: Code2 },
  { label: "React Native", icon: Smartphone },
  { label: "Expo", icon: Smartphone },
  { label: "Linux", icon: Terminal },
  { label: "Full Stack", icon: Layers },
  { label: "UI Design", icon: Palette },
  { label: "Web Dev", icon: Monitor },
];

export const marqueeItems = [
  "Full Stack", "React Native", "TypeScript", "Expo", "Linux",
  "UI Design", "Python", "Mobile Dev", "Open Source", "Go",
];
