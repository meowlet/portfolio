import type { ReactNode } from "react";

/**
 * Cloud silhouettes.
 *
 * Each cloud is a set of overlapping ellipses sharing ONE opaque fill,
 * drawn in one blurred group. Overlapping shapes of the same colour have
 * no visible internal edges, so you see a single silhouette - and where
 * two lobes cross they meet at an angle, which is what gives a cumulus
 * its notched shoulder instead of the even scalloped border you get from
 * chaining arcs end to end.
 *
 * The flat base is a very wide, very shallow ellipse rather than a
 * rectangle, so the bottom edge is soft and slightly curved.
 *
 * A second copy of the same shapes, dropped 12 units and filled with the
 * shade colour, sits behind as the shadowed underside.
 *
 * The blur is an SVG filter, so it scales with the viewBox: the clouds
 * are the same softness at 360px and at 1920px, and a cloud can never be
 * cut off by its own box the way a background gradient tile can. It is a
 * deliberately wide blur (stdDeviation 15 on a 700 unit box): the point
 * is weather, not a drawing of a cloud.
 */

const SHAPES = {
  /* A cumulus: round lobes over a short base roll. The base is
     deliberately much narrower than the cloud, so the bottom tapers up
     at both ends instead of drawing a bar across it. */
  cumulus: (
    <>
      <ellipse cx="350" cy="200" rx="150" ry="30" />
      <ellipse cx="240" cy="180" rx="80" ry="54" />
      <ellipse cx="272" cy="128" rx="56" ry="42" />
      <ellipse cx="350" cy="154" rx="104" ry="74" />
      <ellipse cx="466" cy="178" rx="84" ry="56" />
    </>
  ),
  /* a smaller one: one lobe, two shoulders */
  puff: (
    <>
      <ellipse cx="330" cy="198" rx="110" ry="26" />
      <ellipse cx="250" cy="180" rx="62" ry="44" />
      <ellipse cx="350" cy="156" rx="88" ry="66" />
      <ellipse cx="440" cy="184" rx="64" ry="42" />
    </>
  ),
  /* a low bank: the far, flat kind */
  bank: (
    <>
      <ellipse cx="350" cy="200" rx="210" ry="24" />
      <ellipse cx="190" cy="186" rx="78" ry="30" />
      <ellipse cx="330" cy="180" rx="96" ry="36" />
      <ellipse cx="466" cy="188" rx="82" ry="30" />
    </>
  ),
} as const;

type Variant = keyof typeof SHAPES;

function Cloud({ name, variant }: { name: string; variant: Variant }) {
  const filterId = `cloud-soft-${name}`;
  const shape: ReactNode = SHAPES[variant];

  return (
    <span className={`cloud cloud--${name}`}>
      <svg viewBox="0 0 700 300" focusable="false">
        <defs>
          <filter
            id={filterId}
            x="-15%"
            y="-40%"
            width="130%"
            height="180%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="30" />
          </filter>
        </defs>
        <g
          className="cloud__shade"
          filter={`url(#${filterId})`}
          transform="translate(0 12)"
        >
          {shape}
        </g>
        <g className="cloud__body" filter={`url(#${filterId})`}>
          {shape}
        </g>
      </svg>
    </span>
  );
}

export function Clouds() {
  return (
    <div className="clouds" aria-hidden="true">
      <Cloud name="a" variant="cumulus" />
      <Cloud name="b" variant="puff" />
      <Cloud name="c" variant="cumulus" />
      <Cloud name="d" variant="puff" />
      <Cloud name="e" variant="bank" />
      <Cloud name="f" variant="puff" />
    </div>
  );
}
