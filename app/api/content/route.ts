import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const res = await fetch(`${BACKEND_URL}/api/content`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error("Backend error")
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    const platform = req.json().then((d: any) => d.platform).catch(() => "linkedin")
    const posts: Record<string, string[]> = {
      linkedin: [
        "I built a startup with just AI tools. Here's the exact stack:",
        "The biggest mistake founders make? Building features nobody asked for.",
        "We grew 300% in 3 months by doing ONE thing differently.",
      ],
      twitter: [
        "Hot take: Most startups don't need more features. They need more users.",
        "Building in public is the new marketing. Here's why:",
      ],
      blog: ["How We Built a Product Users Love (Without VC Money)", "10 Growth Hacks That Actually Work in 2026"],
      email: ["Subject: The growth strategy that changed everything"],
    }
    return NextResponse.json({
      content: posts[await platform] || ["Generate engaging content about your startup"],
      hashtags: ["#startup", "#growth", "#ai", "#founder", "#saas"],
      suggestions: ["Add a hook in the first line", "Include a case study", "Use emotional triggers"],
    })
  }
}
