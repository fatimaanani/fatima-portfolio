"use client";

import { useState } from "react";

import Hero from "@/components/Hero";
import About from "@/components/About";
import HowIBuild from "@/components/HowIBuild";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <LoadingScreen onComplete={() => setIntroDone(true)} />

      <main>
        <Hero startTyping={introDone} />
        <About />
        <HowIBuild />
        <Projects />
        {/* <CurrentProject /> */}
        <Contact />
        <Footer />
      </main>
    </>
  );
}