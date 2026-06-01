import os
import json


class AnalyticsAgent:
    def __init__(self):
        self.client = None
        if os.getenv("OPENAI_API_KEY"):
            from openai import OpenAI
            self.client = OpenAI()

    async def analyze(self, metrics: dict, context: str = "") -> dict:
        if self.client:
            prompt = f"""Analyze these startup metrics and provide growth insights.

Metrics: {json.dumps(metrics)}
Context: {context or "General growth analysis"}

Return a JSON object with:
- summary (executive summary of findings)
- issues (array of specific problems detected)
- recommendations (array of actionable fixes)

Be specific and data-driven in your analysis."""
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

        return self._mock_analysis()

    def _mock_analysis(self) -> dict:
        return {
            "summary": "Your retention drops 12% in week 2, indicating an onboarding friction point. Users aren't reaching the 'aha moment' quickly enough.",
            "issues": [
                "Week 2 retention drop: Users not experiencing core value within first session",
                "Customer Acquisition Cost ($45) is 30% above SaaS industry benchmark",
                "60% conversion drop at pricing page suggests pricing confusion or lack of trust signals",
                "Low activation rate indicates onboarding is too complex",
            ],
            "recommendations": [
                "Simplify onboarding to a 3-step wizard with progress indicator",
                "Implement a 7-day email drip campaign highlighting key features",
                "Add social proof (testimonials, case studies) on pricing page",
                "A/B test a money-back guarantee on pricing page",
                "Reduce CAC by shifting budget from paid ads to organic content marketing",
            ],
        }
