import { Clouds } from "./Clouds";

/**
 * The sky. Pure CSS gradients, no raster art: stars, a sun glow that
 * becomes a crescent moon on the night route, drifting clouds, and the
 * horizon the rest of the page is measured against. The horizon is a
 * gradient only, never a rule, so it holds at every zoom.
 */
export function Backdrop() {
  return (
    <div className="sky" aria-hidden="true">
      <div className="sky__stars" />
      <div className="sky__luminary" />
      <div className="sky__moon" />
      <Clouds />
      <div className="horizon" />
    </div>
  );
}
