/**
 * The hanko: a square red mark with one kanji, 猫, for meowsica. It is
 * the whole budget for the accent colour, and it appears exactly twice
 * in the page (the wordmark and the footer).
 *
 * Swapping the mark is a one line change: pass a different `glyph`, or
 * set `siteMeta.name` for the wordmark it sits next to.
 */
export function Seal({
  glyph = "猫",
  size = "1.4rem",
  className = "",
}: {
  glyph?: string;
  size?: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-grid shrink-0 place-items-center bg-seal leading-none text-white select-none ${className}`}
      style={{
        inlineSize: size,
        blockSize: size,
        fontSize: `calc(${size} * 0.58)`,
        boxShadow: "inset 0 0 0 1px rgb(255 255 255 / 0.3)",
      }}
    >
      <span className="font-jp-mincho">{glyph}</span>
    </span>
  );
}
