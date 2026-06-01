import os
import json


class GrowthExperimentAgent:
    def __init__(self):
        self.client = None
        if os.getenv("OPENAI_API_KEY"):
            from openai import OpenAI
            self.client = OpenAI()

    async def suggest(self, idea: str, stage: str = "") -> dict:
        if self.client:
            prompt = f"""Suggest growth experiments for this startup.

Product: {idea}
Stage: {stage or "Not specified"}

Return a JSON object with:
- experiments (array of {title, description, impact: "High"/"Medium"/"Low", effort: "High"/"Medium"/"Low", category})

Be creative and suggest concrete, actionable experiments."""
            try:
                response = self.client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=[{"role": "user", "content": prompt}],
                    response_format={"type": "json_object"},
                    temperature=0.8,
                )
                return json.loads(response.choices[0].message.content)
            except Exception:
                pass

        return {
            "experiments": [
                {
                    "title": "Viral Referral Loop",
                    "description": "Give existing users 1 month free for every referral who converts to paid",
                    "impact": "High",
                    "effort": "Low",
                    "category": "Acquisition",
                },
                {
                    "title": "Social Proof Notifications",
                    "description": "Show real-time activity notifications (X people signed up today)",
                    "impact": "Medium",
                    "effort": "Low",
                    "category": "Conversion",
                },
                {
                    "title": "Personalized Onboarding Sequence",
                    "description": "3-email drip with personalized tips based on user behavior data",
                    "impact": "High",
                    "effort": "Medium",
                    "category": "Retention",
                },
                {
                    "title": "Pricing Page A/B Test",
                    "description": "Test money-back guarantee vs. free trial on pricing page",
                    "impact": "High",
                    "effort": "Low",
                    "category": "Conversion",
                },
                {
                    "title": "Community-Led Growth",
                    "description": "Build a Slack/Discord community with exclusive content and support",
                    "impact": "Medium",
                    "effort": "Medium",
                    "category": "Retention",
                },
            ]
        }
