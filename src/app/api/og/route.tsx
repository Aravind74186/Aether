import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "Building Practical Technology for the Next Generation";
    const category = searchParams.get("category") || "Aether Technologies";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#070b14",
            padding: "60px 80px",
            fontFamily: "sans-serif",
            border: "8px solid #1e293b",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "#1e3a8a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#60a5fa",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              &gt;_
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: "bold", color: "#ffffff" }}>
                Aether Technologies
              </span>
              <span style={{ fontSize: "14px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "2px" }}>
                {category}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "900px" }}>
            <span
              style={{
                fontSize: "46px",
                fontWeight: "bold",
                color: "#f8fafc",
                lineHeight: 1.2,
              }}
            >
              {title}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "2px solid #1e293b",
              paddingTop: "24px",
            }}
          >
            <span style={{ fontSize: "18px", color: "#60a5fa", fontFamily: "monospace" }}>
              Small startup today. Building reliable technology for tomorrow.
            </span>
            <span style={{ fontSize: "18px", color: "#94a3b8", fontFamily: "monospace" }}>
              aethertech.example.com
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response("Failed to generate Open Graph image", { status: 500 });
  }
}
