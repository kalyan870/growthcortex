import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const res = await fetch(`${BACKEND_URL}/api/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error("Backend error")
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({
      score: 82,
      marketSize: "$2.4B",
      positioning: "Position your product as the most intuitive AI-powered solution for modern teams.",
      targetUsers: ["Early-stage founders", "Solo entrepreneurs", "Small business owners"],
      growthRoadmap: [
        { phase: "Launch", tasks: ["Build landing page", "Setup waitlist", "Recruit beta users", "Product Hunt launch"] },
        { phase: "Growth", tasks: ["Content marketing", "Referral program", "SEO optimization", "Social media"] },
        { phase: "Scale", tasks: ["Paid acquisition", "Enterprise sales", "API marketplace", "International"] },
      ],
      suggestions: [
        "Launch on Product Hunt with a compelling story",
        "Create LinkedIn thought leadership content daily",
        "Build a referral program with viral mechanics",
        "Optimize onboarding for first-week retention",
      ],
    })
  }
}
