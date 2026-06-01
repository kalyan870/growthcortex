from fastapi import APIRouter
from api import GrowthRequest
from agents.growth_agent import GrowthExperimentAgent

router = APIRouter()


@router.post("")
async def get_growth_experiments(req: GrowthRequest):
    agent = GrowthExperimentAgent()
    result = await agent.suggest(req.idea, req.stage)
    return result
