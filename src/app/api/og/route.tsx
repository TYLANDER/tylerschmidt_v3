import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    // Dynamic params
    const title = searchParams.get("title") || "Tyler Schmidt"
    const subtitle = searchParams.get("subtitle") || "Product Designer"

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(circle at 20% 80%, rgba(0, 102, 255, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 20%, rgba(0, 255, 127, 0.1) 0%, transparent 40%), radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 70%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            maxWidth: "900px",
            padding: "0 60px",
          }}
        >
          <h1
            style={{
              fontSize: "84px",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1,
              marginBottom: "24px",
              letterSpacing: "-0.03em",
              textShadow: "0 0 40px rgba(0, 102, 255, 0.3)",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "36px",
              color: "#a0a0a0",
              lineHeight: 1.3,
              fontWeight: 500,
              letterSpacing: "-0.01em",
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "40px",
            width: "160px",
            height: "160px",
            border: "4px solid #0066FF",
            borderRadius: "12px",
            opacity: 0.3,
            filter: "blur(1px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "40px",
            width: "140px",
            height: "140px",
            backgroundColor: "#00FF7F",
            borderRadius: "70px",
            opacity: 0.2,
            filter: "blur(2px)",
          }}
        />
        {/* Additional design element */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "600px",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>,
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e) {
    console.error("OG Image generation failed:", e)
    return new Response(`Failed to generate image`, {
      status: 500,
    })
  }
}
