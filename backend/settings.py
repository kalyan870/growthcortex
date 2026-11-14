import os


DEFAULT_CORS_ORIGINS = (
    "https://startup-growth-copilot.vercel.app",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
)


def cors_origins(raw: str | None = None) -> list[str]:
    """Return explicit trusted browser origins; never enable wildcard credentials."""
    configured = os.getenv("CORS_ORIGINS", "") if raw is None else raw
    values = configured.split(",") if configured.strip() else DEFAULT_CORS_ORIGINS
    return [origin.strip().rstrip("/") for origin in values if origin.strip() and origin.strip() != "*"]
