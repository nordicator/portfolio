import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ayaan Sajjad — Full Stack & Designer",
  description: "Portfolio of Ayaan Sajjad — full stack developer and designer building thoughtful digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
