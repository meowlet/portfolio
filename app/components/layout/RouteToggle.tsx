"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react/ssr";
import { useCallback, useSyncExternalStore } from "react";
import { ROUTE_KEY, ROUTE_EVENT, type Route } from "./sky-route";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> };
};

/**
 * Switching the sky is the one piece of state on the site, and it lives
 * on <html data-theme>, so this reads it from the DOM rather than
 * duplicating it. On a fine pointer the change arrives as a circle
 * opening from the button itself (a View Transition); everywhere else it
 * is a plain crossfade.
 */
export function RouteToggle() {
  const subscribe = useCallback((notify: () => void) => {
    window.addEventListener(ROUTE_EVENT, notify);
    return () => window.removeEventListener(ROUTE_EVENT, notify);
  }, []);

  const readRoute = (): Route =>
    document.documentElement.dataset.theme === "night" ? "night" : "day";

  const route = useSyncExternalStore(subscribe, readRoute, () => "day");

  function onToggle(event: React.MouseEvent<HTMLButtonElement>) {
    const root = document.documentElement;
    const next: Route = root.dataset.theme === "night" ? "day" : "night";

    const applyRoute = () => {
      root.dataset.theme = next;
      try {
        window.localStorage.setItem(ROUTE_KEY, next);
      } catch {
        /* private mode: the sky still changes, it just doesn't stick */
      }
      window.dispatchEvent(new Event(ROUTE_EVENT));
    };

    const doc = document as ViewTransitionDocument;
    const canWipe =
      typeof doc.startViewTransition === "function" &&
      window.matchMedia("(min-width: 48rem) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canWipe) {
      applyRoute();
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    root.style.setProperty(
      "--route-x",
      `${(((rect.left + rect.width / 2) / window.innerWidth) * 100).toFixed(2)}%`,
    );
    root.style.setProperty(
      "--route-y",
      `${(((rect.top + rect.height / 2) / window.innerHeight) * 100).toFixed(2)}%`,
    );
    root.classList.add("route-switching");

    const transition = doc.startViewTransition(applyRoute);
    transition.finished.finally(() => {
      root.classList.remove("route-switching");
    });
  }

  const nextLabel = route === "day" ? "night" : "day";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to the ${nextLabel} sky`}
      title={`Switch to the ${nextLabel} sky`}
      className="inline-flex items-center gap-2 border border-(--hairline-strong) px-2.5 py-1.5 transition-colors hover:border-deep"
    >
      <span
        className="relative inline-grid size-3.5 place-items-center"
        aria-hidden="true"
      >
        <SunIcon
          size={14}
          weight="regular"
          color="currentColor"
          className="route-glyph route-glyph--day col-start-1 row-start-1"
        />
        <MoonIcon
          size={14}
          weight="regular"
          color="currentColor"
          className="route-glyph route-glyph--night col-start-1 row-start-1"
        />
      </span>
      <span
        lang="ja"
        className="inline-flex gap-1 font-jp-mincho text-tiny leading-none"
      >
        <span className="route-glyph route-glyph--day" aria-hidden="true">
          晴
        </span>
        <span className="route-glyph route-glyph--night" aria-hidden="true">
          夜
        </span>
      </span>
    </button>
  );
}
