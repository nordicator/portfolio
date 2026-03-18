"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { copyTextToClipboard } from "@/lib/clipboard";
import { CONTACT_EMAIL } from "@/lib/contact";

type CopyEmailButtonProps = {
  ariaLabel?: string;
  children?: ReactNode;
  className?: string;
  copiedAriaLabel?: string;
  copiedChildren?: ReactNode;
  copiedTitle?: string;
  email?: string;
  style?: CSSProperties;
  title?: string;
};

export default function CopyEmailButton({
  ariaLabel,
  children,
  className,
  copiedAriaLabel,
  copiedChildren,
  copiedTitle,
  email = CONTACT_EMAIL,
  style,
  title,
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const resetTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  async function handleClick() {
    const didCopy = await copyTextToClipboard(email);

    if (!didCopy) {
      return;
    }

    setCopied(true);

    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
  }

  const content = copied ? copiedChildren ?? children ?? email : children ?? email;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={copied ? copiedAriaLabel ?? `Copied ${email} to clipboard` : ariaLabel ?? `Copy ${email} to clipboard`}
      title={copied ? copiedTitle ?? "Copied to clipboard" : title ?? `Copy ${email} to clipboard`}
      className={className}
      style={style}
    >
      {content}
    </button>
  );
}
