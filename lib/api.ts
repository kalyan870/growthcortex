const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

interface AnalysisRequest {
  idea: string
  audience?: string
  stage?: string
  goals?: string
}

interface ContentRequest {
  idea: string
  platform: "linkedin" | "twitter" | "blog" | "email"
  tone?: string
}

interface AnalyticsRequest {
  metrics: Record<string, number | string>
  context?: string
}

async function fetchAPI(endpoint: string, body: unknown) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    return await res.json()
  } catch {
    return null
  }
}

export async function analyzeStartup(data: AnalysisRequest) {
  const result = await fetchAPI("/api/analyze", data)
  if (result) return result
  return getMockAnalysis(data.idea)
}

export async function getCompetitors(domain: string) {
  const result = await fetchAPI("/api/competitors", { domain })
  if (result) return result
  return getMockCompetitors(domain)
}

export async function generateContent(data: ContentRequest) {
  const result = await fetchAPI("/api/content", data)
  if (result) return result
  return getMockContent(data)
}

export async function getGrowthExperiments(idea: string) {
  const result = await fetchAPI("/api/growth", { idea })
  if (result) return result
  return getMockExperiments(idea)
}

export async function analyzeMetrics(data: AnalyticsRequest) {
  const result = await fetchAPI("/api/analytics", data)
  if (result) return result
  return getMockInsights(data.metrics)
}

function getMockAnalysis(idea: string) {
  return {
    score: 78,
    scoreBreakdown: {
      marketClarity: 82,
      seoReadiness: 65,
      monetization: 71,
      viralPotential: 88,
    },
    marketSize: "$2.4B",
    positioning: `Position your ${idea} as the most user-friendly AI-native solution for modern professionals who value speed and simplicity over bloated enterprise tools.`,
    tagline: `${idea} — The intelligent way to [core benefit] in minutes, not days.`,
    targetUsers: [
      "Early-stage startup founders (0–50 employees)",
      "Solo entrepreneurs building in public",
      "Small business owners with limited marketing budgets",
      "Digital nomads and indie hackers",
    ],
    growthRoadmap: [
      { phase: "Launch (Week 1–2)", tasks: ["Build MVP landing page with waitlist", "Set up beta user recruitment pipeline", "Prepare Product Hunt launch assets", "Publish 3 founder story posts on LinkedIn"] },
      { phase: "Growth (Month 1–2)", tasks: ["Launch referral program with freemium tier", "Start weekly SEO blog content engine", "Build Twitter/X presence with daily threads", "Collect and showcase early testimonials"] },
      { phase: "Scale (Month 3+)", tasks: ["Expand to paid acquisition (LinkedIn/TikTok)", "Enterprise sales enablement package", "API marketplace for integrations", "International expansion (top 5 markets)"] },
    ],
    suggestions: [
      { action: "Launch on Product Hunt with a compelling founder story", impact: "High", effort: "Medium", category: "Launch" },
      { action: "Publish 3 comparison blogs targeting 'best AI resume tools' and 'resume AI for students'", impact: "High", effort: "Low", category: "SEO" },
      { action: "Start a daily LinkedIn content engine — 1 post/day for 30 days", impact: "Medium", effort: "High", category: "Content" },
      { action: "Design a viral referral loop: give 1 month free per successful referral", impact: "High", effort: "Low", category: "Growth" },
      { action: "Optimize onboarding to get users to 'aha moment' in under 3 minutes", impact: "High", effort: "Medium", category: "Product" },
    ],
    metrics: {
      weeklyTraffic: "1,200",
      conversionRate: "3.2%",
      activeUsers: "340",
      mrr: "$2,400",
    },
  }
}

function getMockCompetitors(domain: string) {
  return {
    competitors: [
      { name: "Market Leader Pro", pricing: "$49/mo", positioning: "Enterprise full-suite", weakness: "Complex setup, 2-week onboarding", strength: "Brand trust, feature depth", threat: "High" },
      { name: "Rising Challenger", pricing: "Free + $19/mo pro", positioning: "Consumer-friendly UX", weakness: "No API, limited integrations", strength: "Viral growth, modern UI", threat: "Medium" },
      { name: "Legacy Platform", pricing: "$99/mo", positioning: "Industry standard since 2018", weakness: "Outdated interface, slow updates", strength: "Existing user base, compliance", threat: "Low" },
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
      "No competitor offers 'zero-setup AI insights' as a core message",
      "Market lacks a product targeting solo founders specifically",
      "All competitors ignore the 'build in public' content workflow",
      "No one combines competitor analysis + content generation in one flow",
    ],
  }
}

function getMockContent(data: ContentRequest) {
  const contentByPlatform: Record<string, { posts: string[], hooks: string[], tips: string[] }> = {
    linkedin: {
      posts: [
        "I replaced a $5k/mo marketing agency with ONE AI tool. Here's the exact playbook:",
        "Most startups fail because they build features nobody asked for. Here's how to avoid it:",
        "We grew 300% in 90 days by doing this ONE thing differently (it's not what you think):",
        "The $0 growth strategy that got us our first 100 paying users:",
      ],
      hooks: [
        "Hook readers with a specific number in the first line",
        "Use 'I' and 'we' — personal stories outperform corporate content",
        "End with a question to drive comments",
      ],
      tips: ["Post daily for 30 days", "Reply to every comment within 1 hour", "Use carousel posts for higher reach"],
    },
    twitter: {
      posts: [
        "Hot take: Most startups don't need more features.\nThey need more users.\n\nHere's why:",
        "Building in public is the new marketing.\n\nHere's exactly how to start:",
        "I spent $0 on marketing and got 1,000 users.\n\nHere's the exact strategy:",
      ],
      hooks: ["Start with a controversial take", "Use line breaks for readability", "Thread: structure for virality"],
      tips: ["Post 3-5x daily", "Use 1 image per tweet", "Quote tweet relevant accounts"],
    },
    blog: {
      posts: [
        "How We Built a Product Users Love (Without VC Money)",
        "10 Growth Hacks That Actually Work in 2026 (Backed by Data)",
        "The Complete Guide to Startup Growth in the AI Era",
        "From 0 to 1,000 Users: A Step-by-Step Growth Playbook",
      ],
      hooks: ["Use 'How' and 'Guide' in titles", "Include specific numbers in headlines", "Target beginner-level keywords"],
      tips: ["Publish weekly on a schedule", "Repurpose blog → LinkedIn → Twitter", "Include screenshots and data"],
    },
    email: {
      posts: [
        "Subject: The growth strategy that changed everything\n\nHey {{name}},\n\nI want to share something that completely changed how we think about growth...",
        "Subject: Your product is ready (are you?)\n\n{{name}}, you've built something amazing. Now let's make sure people actually use it...",
        "Subject: 3 things every founder should know about growth\n\n1. Your first 100 users matter more than the next 10,000...",
      ],
      hooks: ["Personalize subject lines with {{name}}", "Keep emails under 150 words", "One clear CTA per email"],
      tips: ["Send Tuesday–Thursday morning", "A/B test subject lines", "Segment by user behavior"],
    },
  }

  const platformData = contentByPlatform[data.platform] || contentByPlatform.linkedin

  return {
    content: platformData.posts,
    hooks: platformData.hooks,
    tips: platformData.tips,
    hashtags: ["#startup", "#growth", "#ai", "#founder", "#saas", "#entrepreneurship", "#buildinpublic"],
    platform: data.platform,
  }
}

function getMockExperiments(idea: string) {
  return {
    experiments: [
      {
        id: "viral-referral",
        title: "Viral Referral Loop",
        description: "Give existing users 1 month free for every referral who converts to paid. Create a dashboard showing referral status.",
        impact: "High",
        effort: "Low",
        category: "Acquisition",
        steps: ["Implement referral tracking with unique links", "Create referral dashboard for users", "Launch with email notification to all users", "A/B test referral incentive amounts"],
        expectedOutcome: "3-5x reduction in CAC within 60 days",
      },
      {
        id: "social-proof",
        title: "Social Proof Notifications",
        description: "Show real-time activity notifications (e.g., '12 people signed up today') to build trust and urgency.",
        impact: "Medium",
        effort: "Low",
        category: "Conversion",
        steps: ["Add notification bar to landing page", "Show live signup counter", "Display recent user avatars", "Add testimonial rotation widget"],
        expectedOutcome: "15-25% improvement in signup conversion",
      },
      {
        id: "onboarding-drip",
        title: "Personalized Onboarding Sequence",
        description: "3-email automated drip campaign with personalized tips based on user behavior during signup.",
        impact: "High",
        effort: "Medium",
        category: "Retention",
        steps: ["Map user actions to email triggers", "Write 3-email sequence with progressive value", "Add behavior-based branching logic", "Measure week-1 activation rate"],
        expectedOutcome: "40% improvement in week-1 retention",
      },
      {
        id: "pricing-ab",
        title: "Pricing Page A/B Test",
        description: "Test money-back guarantee vs. free trial on pricing page to reduce friction.",
        impact: "High",
        effort: "Low",
        category: "Monetization",
        steps: ["Create variant A: 30-day money back", "Create variant B: 14-day free trial", "Split traffic 50/50", "Measure conversion rate over 2 weeks"],
        expectedOutcome: "20-35% increase in paid conversions",
      },
      {
        id: "community-led",
        title: "Community-Led Growth",
        description: "Build a Slack/Discord community with exclusive content, Q&A, and early access to features.",
        impact: "Medium",
        effort: "Medium",
        category: "Retention",
        steps: ["Create Discord server with onboarding channel", "Invite first 100 users personally", "Host weekly AMA sessions", "Create 'community-only' feature requests"],
        expectedOutcome: "25% higher LTV for community members",
      },
      {
        id: "producthunt-launch",
        title: "Product Hunt Launch Strategy",
        description: "Coordinated Product Hunt launch with pre-launch audience building and post-launch follow-up.",
        impact: "High",
        effort: "High",
        category: "Launch",
        steps: ["Build PH audience 2 weeks before launch", "Prepare launch assets (GIFs, description, makers)", "Coordinate with PH makers for support", "Post-launch: engage all comments within 1 hour"],
        expectedOutcome: "500-2000 upvotes, 10k+ visits on launch day",
      },
    ],
  }
}

function getMockInsights(metrics: Record<string, number | string>) {
  return {
    summary: "Your retention rate drops 12% in week 2, indicating users aren't reaching the 'aha moment' quickly enough. The primary bottleneck is onboarding complexity.",
    funnel: {
      stages: [
        { label: "Website Visitors", value: 10000, percentage: 100 },
        { label: "Signups", value: 1200, percentage: 12 },
        { label: "Activation", value: 360, percentage: 3.6 },
        { label: "Week 1 Retained", value: 250, percentage: 2.5 },
        { label: "Week 4 Retained", value: 120, percentage: 1.2 },
        { label: "Paying Users", value: 45, percentage: 0.45 },
      ],
    },
    issues: [
      { problem: "Week 2 retention drops 12% — users not reaching core value", severity: "Critical", metric: "12% drop" },
      { problem: "CAC ($45) is 30% above SaaS industry benchmark ($35)", severity: "High", metric: "$45 CAC" },
      { problem: "60% drop at pricing page — pricing confusion or lack of trust", severity: "High", metric: "60% drop-off" },
      { problem: "Activation rate (30%) is below 40% benchmark", severity: "Medium", metric: "30% activation" },
    ],
    recommendations: [
      { action: "Simplify onboarding to a 3-step wizard with progress indicator", impact: "High", timeline: "1 week" },
      { action: "Implement 7-day email drip campaign highlighting key features", impact: "High", timeline: "2 weeks" },
      { action: "Add social proof (testimonials, case studies) on pricing page", impact: "Medium", timeline: "3 days" },
      { action: "A/B test money-back guarantee vs. free trial on pricing page", impact: "High", timeline: "2 weeks" },
      { action: "Shift 30% ad budget from paid to organic content marketing", impact: "Medium", timeline: "1 month" },
    ],
  }
}
