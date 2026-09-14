import type { Metadata } from "next";

import {
  Space_Grotesk,
  Manrope,
  IBM_Plex_Mono,
} from "next/font/google";

import GlobalSparkleTrail from "@/components/GlobalSparkleTrail";
import ScrollToTopOnRefresh from "@/components/ScrollToTopOnRefresh";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Fatima Anani | Portfolio",
  description:
    "Portfolio of Fatima Anani, a Computer Science graduate building thoughtful web, mobile, and AI-powered experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${manrope.variable} ${ibmPlexMono.variable}`}
      >
        <ScrollToTopOnRefresh />
        <GlobalSparkleTrail />

        {children}
      </body>
    </html>
  );
} 