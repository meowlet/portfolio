"use client";

import { useEffect, useId, useRef } from "react";
import type { CSSProperties } from "react";
import type { DiagramEdge, DiagramSpec, DiagramStar, StarMagnitude } from "@/content/site";

/**
 * The system, drawn as a constellation.
 *
 * Stars are the pieces of the system, sized by magnitude and coloured by
 * tier: the request path reads brightest, the machinery supporting it is
 * softer, and anything outside the platform is faintest. Lines between
 * them are the links, and each family of link wears its own coat: the
 * request path travels solid blue, the platform underneath it runs dashed
 * amber, and whatever crosses the boundary is dotted violet. A small
 * caption on a line names what travels it. The whole chart assembles in
 * reading order the first time the chapter is on screen, because that is
 * what the drawing means: how the thing was put together.
 *
 * All of the animation is CSS. This component only measures the paths
 * and flips data-state, so it costs almost nothing to ship.
 *
 * Below md the same data is rendered as a list, which is also the text
 * equivalent of the picture.
 */

const SPARKLE: Record<StarMagnitude, number> = { 1: 5, 2: 7, 3: 9 };
const GLOW_SCALE = 2.8;
const LINK_CLEARANCE = 6;

/**
 * A four point star, the shape of a sparkle: points on the axes, sides
 * pinched toward the middle. Drawn from a formula rather than a fixed
 * path so every magnitude is the same figure at a different size.
 */
function sparkle(cx: number, cy: number, r: number, pinch = 4.2, steps = 64) {
  const points: string[] = [];
  for (let i = 0; i < steps; i += 1) {
    const t = (i / steps) * Math.PI * 2;
    const c = Math.cos(t);
    const s = Math.sin(t);
    const x = cx + r * Math.sign(c) * Math.abs(c) ** pinch;
    const y = cy + r * Math.sign(s) * Math.abs(s) ** pinch;
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return `${points.join(" ")} Z`;
}

function glowRadius(magnitude: StarMagnitude) {
  return SPARKLE[magnitude] * GLOW_SCALE;
}

/**
 * Every link stops this far from the star it meets, head and tail alike,
 * so a line never grows out of one star while floating off the other.
 */
function linkGap(magnitude: StarMagnitude) {
  return glowRadius(magnitude) + LINK_CLEARANCE;
}

export function Diagram({ spec }: { spec: DiagramSpec }) {
  const ref = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const glowId = `glow-${uid}`;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.dataset.state = "drawn";
      return;
    }

    // hand each path its own length, so the dash can travel exactly once
    node.querySelectorAll<SVGGeometryElement>("[data-draw]").forEach((el) => {
      const length =
        typeof el.getTotalLength === "function" ? el.getTotalLength() : 0;
      if (length > 0) el.style.setProperty("--draw-length", String(length));
    });
    node.dataset.state = "measuring";

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        node.dataset.state = "drawn";
        observer.disconnect();
      },
      { threshold: 0.3 },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const star = (id: string) => spec.stars.find((item) => item.id === id);
  const order = (id: string) =>
    Math.max(
      0,
      spec.stars.findIndex((item) => item.id === id),
    );

  /** the caption on a line, unless the star already says as much */
  const caption = (id: string, edge?: DiagramEdge) => {
    const item = star(id);
    if (!item?.label || !edge?.label) return null;
    if (edge.label === item.sub) return null;
    if (item.label.toLowerCase().includes(edge.label.toLowerCase())) return null;
    return edge.label;
  };

  /** what arrives at this star, named on its line */
  const arrivesAt = (id: string, kind: DiagramEdge["kind"]) =>
    caption(
      id,
      spec.edges.find((item) => item.to === id && item.kind === kind),
    );

  /** what the star sends onward, when nothing arrives to name it instead */
  const departsFrom = (id: string, kind: DiagramEdge["kind"]) =>
    caption(
      id,
      spec.edges.find((item) => item.from === id && item.kind === kind),
    );

  return (
    <div ref={ref} className="diagram">
      <svg
        role="img"
        aria-label={spec.ariaLabel}
        viewBox={`0 0 ${spec.width} ${spec.height}`}
        className="hidden w-full md:block"
      >
        <defs>
          <radialGradient id={glowId}>
            <stop offset="0%" className="star-glow-inner" />
            <stop offset="38%" className="star-glow-mid" />
            <stop offset="100%" className="star-glow-outer" />
          </radialGradient>
        </defs>

        {/* links first, so the stars sit on top of them */}
        {spec.edges.map((edge) => {
          const from = star(edge.from);
          const to = star(edge.to);
          if (!from || !to) return null;

          const index = Math.max(order(edge.from), order(edge.to));
          const dx = to.x - from.x;
          const dy = to.y - from.y;
          const length = Math.hypot(dx, dy) || 1;
          const unitX = dx / length;
          const unitY = dy / length;
          const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
          // rounded, so the server and the browser agree on the transform
          const turn = Math.round(angle * 100) / 100;

          // the line leaves and arrives the same distance clear of its stars
          const startGap = linkGap(from.magnitude);
          const endGap = linkGap(to.magnitude);
          const x1 = from.x + unitX * startGap;
          const y1 = from.y + unitY * startGap;
          const x2 = to.x - unitX * endGap;
          const y2 = to.y - unitY * endGap;

          const style = { "--i": index } as CSSProperties;

          return (
            <g key={`${edge.from}-${edge.to}`}>
              <line
                {...(edge.kind === "path" ? { "data-draw": true } : { "data-appear": true })}
                style={style}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className={`edge edge--${edge.kind}`}
                strokeWidth="1.25"
                strokeLinecap={edge.kind === "external" ? "round" : undefined}
                strokeDasharray={
                  edge.kind === "path"
                    ? undefined
                    : edge.kind === "support"
                      ? "6 5"
                      : "0.5 5"
                }
              />
              {/* the head is drawn, not a marker, so it always wears the line's own colour */}
              {edge.arrow !== "none" ? (
                <path
                  data-arrow
                  style={style}
                  className={`arrow arrow--${edge.kind}`}
                  d="M-3.6 -3.6 L0 0 L-3.6 3.6"
                  transform={`translate(${x2} ${y2}) rotate(${turn})`}
                />
              ) : null}
              {edge.arrow === "both" ? (
                <path
                  data-arrow
                  style={style}
                  className={`arrow arrow--${edge.kind}`}
                  d="M-3.6 -3.6 L0 0 L-3.6 3.6"
                  transform={`translate(${x1} ${y1}) rotate(${turn + 180})`}
                />
              ) : null}
              {edge.label && edge.labelAt ? (
                <text
                  data-edge-label
                  style={style}
                  className="edge-label font-sans"
                  x={edge.labelAt.x}
                  y={edge.labelAt.y}
                  textAnchor="middle"
                >
                  {edge.label}
                </text>
              ) : null}
            </g>
          );
        })}

        {/* the stars, in reading order */}
        {spec.stars.map((item, index) => {
          const above = (item.labelPlace ?? "above") === "above";
          const labelY = above ? item.y - 32 : item.y + 30;
          const subY = above ? item.y - 17 : item.y + 45;

          return (
            <g
              key={item.id}
              data-appear
              style={{ "--i": index } as CSSProperties}
              className={`star star--${item.kind}${item.twinkle ? " star--twinkle" : ""}`}
            >
              <circle
                className="star__glow"
                cx={item.x}
                cy={item.y}
                r={glowRadius(item.magnitude)}
                fill={`url(#${glowId})`}
              />
              <path
                className="star__spark"
                d={sparkle(item.x, item.y, SPARKLE[item.magnitude])}
              />
              <text
                className="star__label font-serif"
                x={item.x}
                y={labelY}
                textAnchor="middle"
              >
                {item.label}
              </text>
              {item.sub ? (
                <text
                  className="star__sub font-sans"
                  x={item.x}
                  y={subY}
                  textAnchor="middle"
                >
                  {item.sub}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>

      {/* the same chart as text, for small screens and for screen readers */}
      <div className="md:hidden">
        <p className="text-tiny text-ink-soft">Request path</p>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-small">
          {spec.stars
            .filter((item: DiagramStar) => item.kind === "path")
            .map((item) => {
              const link = arrivesAt(item.id, "path");
              return (
                <li key={item.id}>
                  {item.label}
                  {item.sub ? (
                    <span className="text-ink-soft">, {item.sub}</span>
                  ) : null}
                  {link ? (
                    <span className="text-ink-soft">, {link}</span>
                  ) : null}
                </li>
              );
            })}
        </ol>

        {spec.stars.some((item: DiagramStar) => item.kind === "support") ? (
          <>
            <p className="mt-6 text-tiny text-ink-soft">
              Also part of the platform
            </p>
            <ul className="mt-3 space-y-2 text-small">
              {spec.stars
                .filter((item: DiagramStar) => item.kind === "support")
                .map((item) => {
                  const link =
                    arrivesAt(item.id, "support") ??
                    departsFrom(item.id, "support");
                  return (
                    <li key={item.id}>
                      {item.label}
                      {item.sub ? (
                        <span className="text-ink-soft">, {item.sub}</span>
                      ) : null}
                      {link ? (
                        <span className="text-ink-soft">, {link}</span>
                      ) : null}
                    </li>
                  );
                })}
            </ul>
          </>
        ) : null}

        {spec.stars.some((item: DiagramStar) => item.kind === "external") ? (
          <>
            <p className="mt-6 text-tiny text-ink-soft">Across the boundary</p>
            <p className="mt-3 text-small">
              {spec.stars
                .filter((item: DiagramStar) => item.kind === "external")
                .map((item) => item.label)
                .join(" ⇄ ")}
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}
