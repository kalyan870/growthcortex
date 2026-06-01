import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  return NextResponse.json({
    experiments: [
      {
        title: "Viral Referral Loop",
        description: "Give existing users 1 month free for every referral who converts",
        impact: "High",
        effort: "Low",
        category: "Growth",
      },
      {
        title: "Social Proof Notifications",
        description: "Show real-time activity notifications (signups, purchases)",
        impact: "Medium",
        effort: "Low",
        category: "Conversion",
      },
      {
        title: "Personalized Onboarding",
        description: "3-email sequence with personalized tips based on user behavior",
        impact: "High",
        effort: "Medium",
        category: "Retention",
      },
      {
        title: "Pricing Page A/B Test",
        description: "Test money-back guarantee vs. free trial on pricing page",
        impact: "High",
        effort: "Low",
        category: "Conversion",
      },
    ],
  })
}
