import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const res = await fetch(`${BACKEND_URL}/api/competitors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error("Backend error")
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({
      competitors: [
        { name: "Market Leader", pricing: "$49/mo", positioning: "Enterprise", weakness: "High price, complex setup" },
        { name: "New Challenger", pricing: "Free tier", positioning: "Consumer", weakness: "Limited features" },
        { name: "Legacy Solution", pricing: "$99/mo", positioning: "Full suite", weakness: "Outdated UX" },
      ],
      seoGaps: ["Long-tail keywords", "Comparison content", "Tutorials for beginners"],
      differentiation: "Focus on AI-native experience with zero setup time.",
    })
  }
}
