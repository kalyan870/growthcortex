__import__("os").environ.setdefault("DJANGO_SETTINGS_MODULE", "none")
# vercel adapter for fastapi
from main import app as handler
