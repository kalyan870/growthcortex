import os
import json
from typing import Optional


class MarketAnalysisAgent:
    def __init__(self):
        self.client = None
        if os.getenv("OPENAI_API_KEY"):
            from openai import OpenAI
            self.client = OpenAI()

    async def analyze(self, idea: str, audience: str = "", stage: str = "") -> dict:
        if self.client:
            prompt = f"""Analyze this startup idea and provide a comprehensive growth analysis.

Startup Idea: {idea}
Target Audience: {audience or "Not specified"}
Product Stage: {stage or "Not specified"}

Return a JSON object with:
- score (0-100 growth potential score)
- marketSize (estimated market size)
- positioning (unique positioning statement)
- targetUsers (array of user segments)
- growthRoadmap (array of phases with tasks)
- suggestions (array of actionable growth suggestions)

Be specific and data-driven."""
            try:
                response = self.client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=[{"role": "user", "content": prompt}],
                    response_format={"type": "json_object"},
                    temperature=0.7,
                )
                return json.loads(response.choices[0].message.content)
            except Exception:
                pass

        return self._mock_analysis(idea)

    def _mock_analysis(self, idea: str) -> dict:
        return {
            "score": 82,
            "marketSize": "$2.4B",
            "positioning": f"Position {idea} as the most intuitive AI-powered solution for modern teams. Focus on simplicity and speed.",
            "targetUsers": [
                "Early-stage startup founders",
                "Solo entrepreneurs",
                "Small business owners",
                "Digital nomads",
            ],
            "growthRoadmap": [
                {
                    "phase": "Launch",
                    "tasks": [
                        "Build landing page with waitlist",
                        "Setup beta user recruitment",
                        "Product Hunt launch preparation",
                        "Initial content marketing push",
                    ],
                },
                {
                    "phase": "Growth",
                    "tasks": [
                        "Content marketing engine",
                        "Referral program implementation",
                        "SEO content strategy",
                        "Social media presence",
                    ],
                },
                {
                    "phase": "Scale",
                    "tasks": [
                        "Paid acquisition channels",
                        "Enterprise sales enablement",
                        "API and integrations",
                        "International expansion",
                    ],
                },
            ],
            "suggestions": [
                "Launch on Product Hunt with a compelling founder story",
                "Start a daily LinkedIn content engine targeting your ICP",
                "Design a viral referral loop with a freemium model",
                "Optimize onboarding for first-week activation",
                "Build in public on Twitter/X to attract early adopter",
            ],
        }
