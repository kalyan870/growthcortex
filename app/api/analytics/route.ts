import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  return NextResponse.json({
    summary: "Your retention rate drops 12% in week 2, indicating an onboarding friction point where users haven't reached the 'aha moment'.",
    issues: [
      "Week 2 drop-off: Users aren't experiencing core value within first session",
      "CAC ($45) is 30% above industry benchmark for SaaS",
      "60% drop at pricing page suggests pricing confusion or lack of trust signals",
    ],
    recommendations: [
      "Simplify onboarding to a 3-step wizard with progress indicator",
      "Implement a 7-day email drip campaign highlighting key features",
      "Add social proof and money-back guarantee on pricing page",
      "Reduce CAC by focusing on organic content marketing instead of paid ads",
    ],
  })
}
