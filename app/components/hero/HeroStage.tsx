import { hero } from "@/content/site";

/**
 * The hero copy, and the only load sequence on the site: four lines
 * arriving in reading order, once. Plain CSS, so it starts at first
 * paint rather than after hydration, and so there is no script to fail.
 */
export function HeroStage() {
  return (
    <div>
      <p className="rise text-small text-ink-soft" style={{ "--i": 0 } as React.CSSProperties}>
        {hero.homageNote.lead}{" "}
        <span lang="ja" className="font-jp-mincho">
          {hero.homageNote.title}
        </span>
      </p>

      <h1
        className="rise mt-5 max-w-248 font-serif text-display"
        style={{ "--i": 1 } as React.CSSProperties}
      >
        {hero.headline}
      </h1>

      <p
        className="rise mt-6 max-w-184 text-lead text-ink-soft"
        style={{ "--i": 2 } as React.CSSProperties}
      >
        {hero.sub}
      </p>

      <div
        className="rise mt-9 flex flex-wrap gap-3"
        style={{ "--i": 3 } as React.CSSProperties}
      >
        <a href={hero.primaryCta.href} className="btn btn--primary">
          {hero.primaryCta.label}
        </a>
        <a
          href={hero.secondaryCta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--quiet"
        >
          {hero.secondaryCta.label}
        </a>
      </div>
    </div>
  );
}
