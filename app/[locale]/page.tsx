import Hero from "@/app/components/home/Hero";
import About from "@/app/components/home/About";
import Projects from "@/app/components/home/Projects";
import Skills from "@/app/components/home/Skills";
import Contact from "@/app/components/home/Contact";
import CoverDesign from "@/app/components/home/CoverDesign";

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <CoverDesign />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}
