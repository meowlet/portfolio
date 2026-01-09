import Hero from "@/app/components/home/Hero";
import About from "@/app/components/home/About";
import Projects from "@/app/components/home/Projects";
import Skills from "@/app/components/home/Skills";
import Contact from "@/app/components/home/Contact";
import CoverDesign from "@/app/components/home/CoverDesign";
import Experience from "../components/home/Experience";

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <CoverDesign />
      <Contact />
    </>
  );
}
