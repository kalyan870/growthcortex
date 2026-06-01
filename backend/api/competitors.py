from fastapi import APIRouter
from api import CompetitorRequest
from agents.competitor_agent import CompetitorAnalysisAgent

router = APIRouter()


@router.post("")
async def analyze_competitors(req: CompetitorRequest):
    agent = CompetitorAnalysisAgent()
    result = await agent.analyze(req.domain)
    return result
