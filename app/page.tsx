import { Chapter } from "@/app/components/chapters/Chapter";
import { Hero } from "@/app/components/hero/Hero";
import { Fragments } from "@/app/components/interlude/Fragments";
import { Contact } from "@/app/components/letter/Contact";
import { Path } from "@/app/components/path/Path";
import { chapters } from "@/content/site";

export default function Home() {
  const [googleChan, srHotel] = chapters;

  return (
    <main id="main" className="flex flex-1 flex-col">
      <Hero />
      <Chapter chapter={googleChan} anchor="work" />
      <Chapter chapter={srHotel} anchor="sr-hotel" band="wash" />
      <Fragments />
      <Path />
      <Contact />
    </main>
  );
}
