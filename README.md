# Aozora

A portfolio for Ngo Van Anh Kiet, built as a small book: a sky, a few chapters,
and the systems underneath them. A fan homage to 素晴らしき日々～不連続存在～.
No official assets, artwork, or audio from any work are used here.

## Stack

- Next.js 16 (App Router, React 19) with Cache Components enabled
- TypeScript, strict
- Tailwind CSS v4, CSS-first tokens in `app/globals.css`
- No animation library. The load sequence, the drifting clouds, the diagram
  draw-in and the route wipe are all CSS plus one IntersectionObserver.
- `@phosphor-icons/react` (SSR entry) for the two external-link arrows
- Fonts self-hosted in `app/fonts/`, latin subset only. Both families are
  SIL OFL 1.1; the licence text ships next to the files.
  (Google serves both Newsreader and Zen Kaku Gothic New as hundreds of
  unicode-range slices, and `next/font/google` pulls every one of them.)

## Run it

```bash
bun install
bun dev          # http://localhost:3000
bun run build    # production build, all routes prerendered
bun run lint
```

## Where things live

```
app/
  layout.tsx              fonts, metadata, the route script, the chrome
  page.tsx                one page: hero, two chapters, interlude, path, letter
  globals.css             tokens, sky, type, motion. The design system.
  fonts/                  self-hosted latin subsets, OFL licences
  opengraph-image.tsx     1200x630 card, drawn with next/og
  not-found.tsx           the cloud that drifted off
  components/
    sky/                  the sky and its clouds
    hero/                 hero shell + the load sequence (client)
    chapters/             chapter frame + data-driven diagrams (client)
    interlude/            the fragments grid and the reflection
    path/                 experience, education, stack
    letter/               contact
    layout/               top bar, footer, route toggle, easter egg
    ui/                   seal, text link
content/
  site.ts                 every visible string
  resume.ts               work history, education, stack
public/
  cv.pdf                  ADD THIS. The résumé button points at it.
```

## The 晴 / 夜 route

The sky has two routes. The day sky is the default; the night sky is stored in
`localStorage` under `aozora-route` and applied by an inline script in `<head>`
so the correct sky paints before anything else. On a fine pointer the switch
arrives as a circle opening from the button (View Transitions); elsewhere it is
a plain crossfade.

## Notes for the next edit

- Every visible string lives in `content/`. Nothing is hard-coded in components.
- Section anchors in the nav are absolute (`/#work`), not bare (`#work`): the
  bar also renders on the 404 page, where a bare hash only appends to the dead
  URL and nothing moves. The hero CTA can stay relative, since the hero only
  exists on the home page.
- The browser scrollbar is hidden on purpose (`html { scrollbar-width: none }` in
  `globals.css`), so the sky runs to the window edge. The page still scrolls by
  wheel, touch, and keyboard. `package.json` carries a `browserslist`, and the
  CSS minifier drops `scrollbar-width` without it, so leave that in place.
- The mark is 猫 in a red hanko, sitting next to the wordmark `meowsica`.
  Change the glyph in `app/components/ui/Seal.tsx` (and in `app/icon.svg` plus
  `app/opengraph-image.tsx`, which draw it as a literal), or point
  `siteMeta.name` at something else.
- No em-dashes anywhere in the copy. Keep it that way.
- The sky is six clouds (`app/components/sky/Clouds.tsx`). Each is a set of
  overlapping ellipses sharing one opaque fill inside one blurred group:
  same-colour overlaps hide their own edges, so you read a single silhouette,
  and lobes that cross at an angle give the notched shoulder a real cumulus
  has. Chaining arcs end to end instead gives an even scalloped border that
  reads as a cog. The shade copy dropped 12 units behind the mass is the
  underside; the blur is an SVG filter so it scales with the viewBox.
- Keep the sky's lower band a little blue (`--sky-low`). A near-white sky
  swallows white clouds and leaves only their shading, which reads as bars.
- `content/site.ts` has a `TODO` for the Discord invite link in chapter 01.
  It is left out on purpose: the URL needs the application id.
- The diagrams are constellations (`app/components/chapters/Diagram.tsx`).
  A star is a piece of the system, and every star is the same four point
  sparkle at a different size: `magnitude` sets how bright and how large, and
  `kind` decides the tier (path reads brightest, support softer, external
  faintest). Edges with kind `path` are solid and arrowed, anything
  else is dashed and unarrowed. Array order in `stars` is the reading order,
  and it drives the stagger: stars appear one by one and each line draws once
  its far end has landed. Add a `twinkle: true` star sparingly; it only
  animates on the night route.
- Radius scale is 0 everywhere. Circles are for marks only.
- Motion budget: one hero sequence, drifting clouds, one diagram draw-in per
  chapter, the route wipe. Anything else needs a reason.
