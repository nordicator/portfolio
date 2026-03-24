"use client";

import { ReactNode } from "react";
import { TransitionProvider } from "@/components/TransitionProvider";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return <TransitionProvider>{children}</TransitionProvider>;
}
