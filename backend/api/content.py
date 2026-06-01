from fastapi import APIRouter
from api import ContentRequest
from agents.content_agent import ContentGenerationAgent

router = APIRouter()


@router.post("")
async def generate_content(req: ContentRequest):
    agent = ContentGenerationAgent()
    result = await agent.generate(req.idea, req.platform, req.tone)
    return result
