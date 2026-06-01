from fastapi import APIRouter
from api import AnalyticsRequest
from agents.analytics_agent import AnalyticsAgent

router = APIRouter()


@router.post("")
async def analyze_metrics(req: AnalyticsRequest):
    agent = AnalyticsAgent()
    result = await agent.analyze(req.metrics, req.context)
    return result
