from pydantic import BaseModel
from typing import Optional


class AnalyzeRequest(BaseModel):
    idea: str
    audience: Optional[str] = ""
    stage: Optional[str] = ""
    goals: Optional[str] = ""


class CompetitorRequest(BaseModel):
    domain: str


class ContentRequest(BaseModel):
    idea: str
    platform: str = "linkedin"
    tone: Optional[str] = "professional"
    audience: Optional[str] = ""


class GrowthRequest(BaseModel):
    idea: str
    stage: Optional[str] = ""


class AnalyticsRequest(BaseModel):
    metrics: dict
    context: Optional[str] = ""
