from fastapi import APIRouter
from api import AnalyzeRequest
from agents.market_agent import MarketAnalysisAgent

router = APIRouter()


@router.post("")
async def analyze_startup(req: AnalyzeRequest):
    agent = MarketAnalysisAgent()
    result = await agent.analyze(req.idea, req.audience, req.stage)
    return result
