"use client";

import { useId, useState } from "react";
import { footer } from "@/content/site";

/**
 * 不連続: the one place on the site where the type splits into colour
 * channels. It stays out of the way until someone looks for it.
 */
export function EasterEgg() {
  const [open, setOpen] = useState(false);
  const noteId = useId();

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={noteId}
        lang="ja"
        className="glyph-split font-jp-mincho text-small text-ink-soft"
      >
        {footer.easterEggLabel}
      </button>

      {open ? (
        <div id={noteId} className="mt-3 max-w-xs">
          <p className="text-tiny text-ink-soft">{footer.easterEggNote}</p>
          <dl className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1.5 text-tiny">
            {footer.easterEggStats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-ink-soft">{stat.label}</dt>
                <dd className="font-serif text-[1.0625rem]">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </div>
  );
}
