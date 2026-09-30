import { Backdrop } from "@/app/components/sky/Backdrop";
import { hero } from "@/content/site";
import { HeroStage } from "./HeroStage";

/**
 * The book cover. Everything below the fold is measured against the
 * horizon line at the bottom of this section.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh flex-col overflow-hidden"
    >
      <Backdrop />

      <div className="wrap relative z-10 flex flex-1 flex-col justify-center pt-24 pb-[14vh] sm:pt-28 sm:pb-[20vh]">
        <div className="lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-14">
          <div>
            <HeroStage />

            <p className="mt-10 max-w-[24rem] font-serif text-small italic text-ink-soft sm:ml-auto sm:text-right lg:mt-12">
              {hero.epigraphEn}
            </p>
          </div>

          <p
            lang="ja"
            className="vertical-jp-lg mt-6 font-jp-mincho text-small tracking-[0.14em] text-ink-soft lg:mt-0 lg:self-end lg:text-[0.9rem] lg:leading-[1.4] lg:tracking-[0.16em]"
          >
            {hero.epigraphJp}
          </p>
        </div>
      </div>
    </section>
  );
}
