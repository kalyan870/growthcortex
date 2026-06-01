const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface AnalysisRequest {
  idea: string;
  audience?: string;
  stage?: string;
  goals?: string;
}

interface ContentRequest {
  idea: string;
  platform: "linkedin" | "twitter" | "blog" | "email";
  tone?: string;
}

interface AnalyticsRequest {
  metrics: Record<string, number | string>;
  context?: string;
}

async function fetchAPI(endpoint: string, body: unknown) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return await res.json();
  } catch {
    return null;
  }
}

export async function analyzeStartup(data: AnalysisRequest) {
  const result = await fetchAPI("/api/analyze", data);
  if (result) return result;
  return getMockAnalysis(data.idea);
}

export async function getCompetitors(domain: string) {
  const result = await fetchAPI("/api/competitors", { domain });
  if (result) return result;
  return getMockCompetitors(domain);
}

export async function generateContent(data: ContentRequest) {
  const result = await fetchAPI("/api/content", data);
  if (result) return result;
  return getMockContent(data);
}

export async function getGrowthExperiments(idea: string) {
  const result = await fetchAPI("/api/growth", { idea });
  if (result) return result;
  return getMockExperiments(idea);
}

export async function analyzeMetrics(data: AnalyticsRequest) {
  const result = await fetchAPI("/api/analytics", data);
  if (result) return result;
  return getMockInsights(data.metrics);
}

function getMockAnalysis(idea: string) {
  return {
    score: 78,
    marketSize: "$2.4B",
   竞争力: [
      { name: "Competitor A", strength: 7 },
      { name: "Competitor B", strength: 5 },
      { name: "Competitor C", strength: 3 },
    ],
    positioning: `Position your ${idea} as the most user-friendly solution for modern teams.`,
    targetUsers: [
      "Early-stage startup founders",
      "Solo entrepreneurs",
      "Small business owners",
    ],
    growthRoadmap: [
      { phase: "Launch", tasks: ["Landing page", "Waitlist", "Beta users"] },
      { phase: "Growth", tasks: ["Content marketing", "Referral program", "SEO"] },
      { phase: "Scale", tasks: ["Paid ads", "Enterprise", "API"] },
    ],
    suggestions: [
      "Launch on Product Hunt",
      "Create LinkedIn thought leadership content",
      "Build a referral program",
    ],
  };
}

function getMockCompetitors(domain: string) {
  return {
    competitors: [
      {
        name: "Main Competitor",
        pricing: "$29/mo",
        positioning: "Enterprise-focused",
        weakness: "Poor UX for small teams",
      },
      {
        name: "New Entrant",
        pricing: "Free tier available",
        positioning: "Consumer-first",
        weakness: "Limited features",
      },
      {
        name: "Legacy Player",
        pricing: "$99/mo",
        positioning: "Full suite",
        weakness: "Outdated interface",
      },
    ],
    seoGaps: [
      "Long-tail keywords in your niche",
      "Comparison content",
      "Tutorial content for beginners",
    ],
    differentiation: "Focus on AI-first experience with zero learning curve.",
  };
}

function getMockContent(data: ContentRequest) {
  const posts: Record<string, string[]> = {
    linkedin: [
      "🧵 I built a startup with just AI tools. Here's the exact stack:",
      "The biggest mistake founders make? Building features nobody asked for.",
      "We grew 300% in 3 months doing this ONE thing differently.",
    ],
    twitter: [
      "Hot take: Most startups don't need more features. They need more users.",
      "Building in public is the new marketing. Here's why:",
    ],
    blog: [
      "How We Built a Product Users Love (Without VC Money)",
      "10 Growth Hacks That Actually Work in 2026",
    ],
    email: ["Subject: The growth strategy that changed everything"],
  };
  return {
    content: posts[data.platform] || ["Generate engaging content about your startup"],
    hashtags: ["#startup", "#growth", "#ai", "#founder"],
    suggestions: ["Add a hook in the first line", "Include a case study"],
  };
}

function getMockExperiments(idea: string) {
  return [
    {
      title: "Referral Loop",
      description: "Give existing users a month free for every referral",
      impact: "high",
      effort: "low",
    },
    {
      title: "Social Proof Popup",
      description: "Show real-time user activity notifications",
      impact: "medium",
      effort: "low",
    },
    {
      title: "Onboarding Sequence",
      description: "3-email automated onboarding with personalized tips",
      impact: "high",
      effort: "medium",
    },
  ];
}

function getMockInsights(metrics: Record<string, number | string>) {
  return {
    summary: "Your retention rate shows a 12% drop in week 2, indicating an onboarding friction point.",
    issues: [
      "Week 2 drop-off suggests users aren't finding core value",
      "CAC is 30% above industry benchmark",
      "Conversion funnel loses 60% at pricing page",
    ],
    recommendations: [
      "Simplify onboarding to 3 steps",
      "Add a 7-day email drip campaign",
      "Test a money-back guarantee on pricing page",
    ],
  };
}
