import { ImageResponse } from "next/og";
import { hero, siteMeta } from "@/content/site";

export const alt = siteMeta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The card: paper, one band of sky, the name, the headline. Drawn with
 * the renderer's own font so the build never depends on a network call.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7fbfe",
          color: "#14212c",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#a63a2e",
              color: "#ffffff",
              fontSize: 26,
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.3)",
            }}
          >
            猫
          </div>
          <div style={{ fontSize: 30, letterSpacing: -0.5 }}>
            {siteMeta.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 56, lineHeight: 1.15, maxWidth: 900 }}>
            {hero.headline}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 26,
              color: "#4e6678",
              maxWidth: 820,
            }}
          >
            {hero.sub}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ height: 1, background: "#9dc3df", width: "100%" }} />
          <div
            style={{
              marginTop: 22,
              height: 96,
              width: "100%",
              background: "linear-gradient(to bottom, #e4f1fb, #f8fcff)",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
