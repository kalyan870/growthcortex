import os
import json


class ContentGenerationAgent:
    def __init__(self):
        self.client = None
        if os.getenv("OPENAI_API_KEY"):
            from openai import OpenAI
            self.client = OpenAI()

    async def generate(self, idea: str, platform: str, tone: str = "professional") -> dict:
        if self.client:
            prompt = f"""Generate compelling marketing content for this startup.

Product: {idea}
Platform: {platform}
Tone: {tone}

Return a JSON object with:
- content (array of 2-3 content pieces optimized for the platform)
- hashtags (array of relevant hashtags)
- suggestions (array of optimization tips)

Make the content engaging and platform-appropriate."""
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

        return self._mock_content(platform)

    def _mock_content(self, platform: str) -> dict:
        content_map = {
            "linkedin": [
                "I built a startup with just AI tools. Here's the exact stack that saved us 200+ hours:",
                "The biggest mistake first-time founders make? Building features nobody actually asked for.",
                "We grew 300% in Q2 by doing ONE thing differently (it's not what you think).",
            ],
            "twitter": [
                "Hot take: Most startups don't need more features. They need more users.",
                "Building in public is the new marketing. Here's why every founder should try it:",
            ],
            "blog": [
                "How We Built a Product Users Love (Without VC Money)",
                "10 Growth Hacks That Actually Work in 2026 (Backed by Data)",
                "The Complete Guide to Startup Growth in the AI Era",
            ],
            "email": [
                "Subject: The growth strategy that changed everything",
                "Subject: Your product is ready (are you?)",
                "Subject: 3 things every founder should know about growth",
            ],
        }

        return {
            "content": content_map.get(platform, ["Generate engaging content about your startup"]),
            "hashtags": ["#startup", "#growth", "#ai", "#founder", "#saas", "#entrepreneurship"],
            "suggestions": [
                "Hook readers in the first 2 lines",
                "Include specific metrics or case studies",
                "End with a question to drive engagement",
                "Use emotional triggers (fear of missing out, aspiration)",
            ],
        }
