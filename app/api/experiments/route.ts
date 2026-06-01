import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  return NextResponse.json({
    experiments: [
      {
        id: "viral-referral",
        title: "Viral Referral Loop",
        description: "Give existing users 1 month free for every referral who converts to paid. Create a dashboard showing referral status.",
        impact: "High", effort: "Low", category: "Acquisition",
        steps: ["Implement referral tracking with unique links", "Create referral dashboard for users", "Launch with email notification to all users", "A/B test referral incentive amounts"],
        expectedOutcome: "3-5x reduction in CAC within 60 days",
      },
      {
        id: "social-proof",
        title: "Social Proof Notifications",
        description: "Show real-time activity notifications ('12 people signed up today') to build trust and urgency.",
        impact: "Medium", effort: "Low", category: "Conversion",
        steps: ["Add notification bar to landing page", "Show live signup counter", "Display recent user avatars", "Add testimonial rotation widget"],
        expectedOutcome: "15-25% improvement in signup conversion",
      },
      {
        id: "onboarding-drip",
        title: "Personalized Onboarding Sequence",
        description: "3-email automated drip campaign with personalized tips based on user behavior during signup.",
        impact: "High", effort: "Medium", category: "Retention",
        steps: ["Map user actions to email triggers", "Write 3-email sequence with progressive value", "Add behavior-based branching logic", "Measure week-1 activation rate"],
        expectedOutcome: "40% improvement in week-1 retention",
      },
      {
        id: "pricing-ab",
        title: "Pricing Page A/B Test",
        description: "Test money-back guarantee vs. free trial on pricing page to reduce friction.",
        impact: "High", effort: "Low", category: "Monetization",
        steps: ["Create variant A: 30-day money back", "Create variant B: 14-day free trial", "Split traffic 50/50", "Measure conversion rate over 2 weeks"],
        expectedOutcome: "20-35% increase in paid conversions",
      },
      {
        id: "community-led",
        title: "Community-Led Growth",
        description: "Build a Slack/Discord community with exclusive content, Q&A, and early access to features.",
        impact: "Medium", effort: "Medium", category: "Retention",
        steps: ["Create Discord server with onboarding channel", "Invite first 100 users personally", "Host weekly AMA sessions", "Create 'community-only' feature requests"],
        expectedOutcome: "25% higher LTV for community members",
      },
      {
        id: "producthunt-launch",
        title: "Product Hunt Launch Strategy",
        description: "Coordinated Product Hunt launch with pre-launch audience building and post-launch follow-up.",
        impact: "High", effort: "High", category: "Launch",
        steps: ["Build PH audience 2 weeks before launch", "Prepare launch assets (GIFs, description, makers)", "Coordinate with PH makers for support", "Post-launch: engage all comments within 1 hour"],
        expectedOutcome: "500-2000 upvotes, 10k+ visits on launch day",
      },
    ],
  })
}
