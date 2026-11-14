from typing import Literal, Optional

from pydantic import BaseModel, Field


class AnalyzeRequest(BaseModel):
    idea: str = Field(min_length=1, max_length=10_000)
    audience: Optional[str] = Field(default="", max_length=2_000)
    stage: Optional[str] = Field(default="", max_length=200)
    goals: Optional[str] = Field(default="", max_length=2_000)


class CompetitorRequest(BaseModel):
    domain: str = Field(min_length=1, max_length=253)


class ContentRequest(BaseModel):
    idea: str = Field(min_length=1, max_length=10_000)
    platform: Literal["linkedin", "twitter", "blog", "email"] = "linkedin"
    tone: Optional[str] = Field(default="professional", max_length=100)
    audience: Optional[str] = Field(default="", max_length=2_000)


class GrowthRequest(BaseModel):
    idea: str = Field(min_length=1, max_length=10_000)
    stage: Optional[str] = Field(default="", max_length=200)


class AnalyticsRequest(BaseModel):
    metrics: dict[str, str | int | float | bool] = Field(max_length=100)
    context: Optional[str] = Field(default="", max_length=4_000)
