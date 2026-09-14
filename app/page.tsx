import Hero from "@/components/Hero";
import About from "@/components/About";
import HowIBuild from "@/components/HowIBuild";
import Projects from "@/components/Projects";
import CurrentProject from "@/components/CurrentProject";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <HowIBuild />
      <Projects />
      {/* <CurrentProject /> */}
      <Contact />
      <Footer />
    </main>
  );
}