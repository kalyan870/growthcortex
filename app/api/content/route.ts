import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"
    const res = await fetch(`${BACKEND_URL}/api/content`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error("Backend error")
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    const body = await req.json()
    const platform = body.platform || "linkedin"

    const contentByPlatform: Record<string, any> = {
      linkedin: {
        content: [
          "I replaced a $5k/mo marketing agency with ONE AI tool. Here's the exact playbook:",
          "Most startups fail because they build features nobody asked for. Here's how to avoid it:",
          "We grew 300% in 90 days by doing this ONE thing differently:",
        ],
        hooks: ["Hook with specific numbers", "Use personal stories", "End with a question"],
        tips: ["Post daily for 30 days", "Reply to every comment", "Use carousel posts"],
        hashtags: ["#startup", "#growth", "#ai", "#founder", "#saas"],
      },
      twitter: {
        content: [
          "Hot take: Most startups don't need more features.\nThey need more users.",
          "Building in public is the new marketing. Here's exactly how to start:",
          "I spent $0 on marketing and got 1,000 users. Here's the exact strategy:",
        ],
        hooks: ["Start with a controversial take", "Use line breaks", "Thread for virality"],
        tips: ["Post 3-5x daily", "Use 1 image per tweet", "Quote tweet relevant accounts"],
        hashtags: ["#startup", "#buildinpublic", "#indiehacker", "#founder"],
      },
      blog: {
        content: [
          "How We Built a Product Users Love (Without VC Money)",
          "10 Growth Hacks That Actually Work in 2026 (Backed by Data)",
          "The Complete Guide to Startup Growth in the AI Era",
        ],
        hooks: ["Use 'How' and 'Guide' in titles", "Include numbers in headlines", "Target beginner keywords"],
        tips: ["Publish weekly", "Repurpose blog → LinkedIn → Twitter", "Include screenshots"],
        hashtags: ["#startup", "#growth", "#saas", "#entrepreneurship"],
      },
      email: {
        content: [
          "Subject: The growth strategy that changed everything\n\nI want to share something that completely changed how we think about growth...",
          "Subject: Your product is ready (are you?)\n\nYou've built something amazing. Now let's make sure people actually use it...",
          "Subject: 3 things every founder should know about growth\n\n1. Your first 100 users matter more than the next 10,000...",
        ],
        hooks: ["Personalize subject lines", "Keep under 150 words", "One clear CTA per email"],
        tips: ["Send Tuesday-Thursday morning", "A/B test subject lines", "Segment by behavior"],
        hashtags: [],
      },
    }

    return NextResponse.json(contentByPlatform[platform] || contentByPlatform.linkedin)
  }
}
