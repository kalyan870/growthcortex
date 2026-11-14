from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.analyze import router as analyze_router
from api.competitors import router as competitors_router
from api.content import router as content_router
from api.growth import router as growth_router
from api.analytics import router as analytics_router
from settings import cors_origins

app = FastAPI(title="GrowthCortex API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins(),
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

app.include_router(analyze_router, prefix="/api/analyze", tags=["analyze"])
app.include_router(competitors_router, prefix="/api/competitors", tags=["competitors"])
app.include_router(content_router, prefix="/api/content", tags=["content"])
app.include_router(growth_router, prefix="/api/growth", tags=["growth"])
app.include_router(analytics_router, prefix="/api/analytics", tags=["analytics"])


@app.get("/")
async def root():
    return {"message": "GrowthCortex API is running", "version": "1.0.0"}


@app.get("/health")
async def health():
    return {"status": "healthy"}
