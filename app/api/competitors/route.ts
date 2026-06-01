import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"
    const res = await fetch(`${BACKEND_URL}/api/competitors`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error("Backend error")
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({
      competitors: [
        { name: "Market Leader Pro", pricing: "$49/mo", positioning: "Enterprise full-suite", weakness: "Complex 2-week setup", strength: "Brand trust", threat: "High" },
        { name: "Rising Challenger", pricing: "Free + $19/mo", positioning: "Consumer-friendly UX", weakness: "No API", strength: "Viral growth", threat: "Medium" },
        { name: "Legacy Platform", pricing: "$99/mo", positioning: "Industry standard", weakness: "Outdated UI", strength: "Existing user base", threat: "Low" },
      ],
      swot: {
        strengths: ["AI-native architecture", "Modern UX/UI", "Fast time-to-value", "Lower price point"],
        weaknesses: ["No brand recognition", "Smaller team", "Fewer integrations", "Limited case studies"],
        opportunities: ["Remote work trend", "AI adoption wave", "Unsolved pain in niche", "Creator economy growth"],
        threats: ["Big tech entering space", "Open-source alternatives", "Economic downturn", "Copycat competitors"],
      },
      pricingComparison: [
        { feature: "Core Product", us: "✓", leader: "✓", challenger: "✓", legacy: "✓" },
        { feature: "AI-Powered Insights", us: "✓ Native", leader: "✗ Manual", challenger: "✓ Basic", legacy: "✗" },
        { feature: "Real-time Analytics", us: "✓", leader: "✓ Premium", challenger: "✗", legacy: "✓ Add-on" },
        { feature: "API Access", us: "✓", leader: "✓ Enterprise", challenger: "✗", legacy: "✓ Extra $99" },
        { feature: "Onboarding Time", us: "3 min", leader: "2 weeks", challenger: "5 min", legacy: "1 week" },
        { feature: "Pricing", us: "$19/mo", leader: "$49/mo", challenger: "Free/$19", legacy: "$99/mo" },
      ],
      positioningGaps: [
        "No competitor offers 'zero-setup AI insights' as core message",
        "Market lacks a product targeting solo founders specifically",
        "All competitors ignore 'build in public' content workflow",
        "No one combines competitor analysis + content generation",
      ],
    })
  }
}
