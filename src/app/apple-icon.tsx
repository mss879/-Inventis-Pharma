import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS masks the corners of apple-touch-icons, so this is intentionally
// full-bleed (orange field + white medical cross).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#ff6600",
          display: "flex",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            background: "#ffffff",
            borderRadius: 8,
            left: 76,
            top: 36,
            width: 28,
            height: 108,
          }}
        />
        <div
          style={{
            position: "absolute",
            background: "#ffffff",
            borderRadius: 8,
            left: 36,
            top: 76,
            width: 108,
            height: 28,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
