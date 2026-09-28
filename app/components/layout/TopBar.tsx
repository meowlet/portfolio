import Link from "next/link";
import { nav, siteMeta } from "@/content/site";
import { Seal } from "@/app/components/ui/Seal";
import { RouteToggle } from "./RouteToggle";

/**
 * A thin bar, not a header: the wordmark, the four sections, the résumé,
 * and the day/night route. Section links collapse below md, because the
 * page is one scroll anyway.
 */
export function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-(--hairline) bg-(--veil) backdrop-blur-md">
      <div className="wrap flex h-14 items-center justify-between gap-4">
        <Link
          href="/#top"
          className="flex shrink-0 items-center gap-2.5 text-[1.0625rem] leading-none font-medium whitespace-nowrap"
        >
          <Seal />
          <span>{siteMeta.name}</span>
        </Link>

        <nav aria-label="Sections" className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex items-baseline gap-1.5 text-small whitespace-nowrap text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
              <span
                lang="ja"
                className="hidden font-jp-mincho text-tiny opacity-80 lg:inline"
              >
                {item.jp}
              </span>
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={siteMeta.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--quiet hidden lg:inline-flex"
          >
            View résumé
          </a>
          <RouteToggle />
        </div>
      </div>
    </header>
  );
}
