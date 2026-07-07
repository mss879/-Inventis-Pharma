import { ImageResponse } from "next/og";

export const alt = "Inventis Pharma — Smart Biomedical Solutions & Medical Device Distributor in Sri Lanka";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#141416",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Orange glow accent */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 520,
            background: "#ff6600",
            opacity: 0.18,
            display: "flex",
          }}
        />

        {/* Brand lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              width: 108,
              height: 108,
              borderRadius: 28,
              background: "#ff6600",
              display: "flex",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", background: "#fff", borderRadius: 6, left: 45, top: 22, width: 18, height: 64 }} />
            <div style={{ position: "absolute", background: "#fff", borderRadius: 6, left: 22, top: 45, width: 64, height: 18 }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 44, fontWeight: 800, color: "#ffffff", letterSpacing: -1 }}>
              Inventis Pharma
            </div>
            <div style={{ fontSize: 22, color: "#ff6600", fontWeight: 700, letterSpacing: 4, textTransform: "uppercase" }}>
              Pvt Ltd
            </div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 68, fontWeight: 800, color: "#ffffff", lineHeight: 1.08, letterSpacing: -2, maxWidth: 900 }}>
            Smart Biomedical Solutions & Sourcing
          </div>
          <div style={{ fontSize: 30, color: "#a1a1aa", maxWidth: 860, lineHeight: 1.3 }}>
            Sri Lanka&apos;s leading importer of dialysis consumables, rehabilitation aids, homecare & surgical equipment.
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 26, color: "#ff6600", fontWeight: 700 }}>inventispharma.org</div>
          <div style={{ fontSize: 22, color: "#71717a" }}>NMRA · ITI · SLS Certified Sourcing</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
