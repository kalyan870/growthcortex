import os
import json


class CompetitorAnalysisAgent:
    def __init__(self):
        self.client = None
        if os.getenv("OPENAI_API_KEY"):
            from openai import OpenAI
            self.client = OpenAI()

    async def analyze(self, domain: str) -> dict:
        if self.client:
            prompt = f"""Analyze the competitive landscape for this product domain.

Domain: {domain}

Return a JSON object with:
- competitors (array of {name, pricing, positioning, weakness})
- seoGaps (array of SEO content opportunities)
- differentiation (unique positioning recommendation)

Be specific with real-world competitive analysis."""
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

        return self._mock_analysis(domain)

    def _mock_analysis(self, domain: str) -> dict:
        return {
            "competitors": [
                {
                    "name": "Market Leader",
                    "pricing": "$49/mo",
                    "positioning": "Enterprise-focused with full feature suite",
                    "weakness": "Complex setup, high churn for small teams",
                },
                {
                    "name": "New Challenger",
                    "pricing": "Free tier + $19/mo",
                    "positioning": "Consumer-friendly, modern UX",
                    "weakness": "Limited integrations and advanced features",
                },
                {
                    "name": "Legacy Solution",
                    "pricing": "$99/mo",
                    "positioning": "Industry standard, comprehensive",
                    "weakness": "Outdated interface, slow innovation",
                },
            ],
            "seoGaps": [
                "Long-tail keywords specific to your niche",
                "Comparison content (vs. competitors)",
                "Beginner tutorials and how-to guides",
                "Case studies with real ROI data",
            ],
            "differentization": "Focus on AI-native experience with zero learning curve and instant value delivery.",
        }
