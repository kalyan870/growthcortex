import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from api import AnalyticsRequest, AnalyzeRequest, CompetitorRequest, ContentRequest
from settings import cors_origins


class ApiModelTests(unittest.TestCase):
    def test_valid_startup_request(self):
        request = AnalyzeRequest(idea="A scheduling tool", audience="Small clinics")
        self.assertEqual(request.idea, "A scheduling tool")

    def test_rejects_empty_and_oversized_idea(self):
        with self.assertRaises(ValueError):
            AnalyzeRequest(idea="")
        with self.assertRaises(ValueError):
            AnalyzeRequest(idea="x" * 10_001)

    def test_rejects_invalid_content_platform(self):
        with self.assertRaises(ValueError):
            ContentRequest(idea="A post", platform="unknown")

    def test_bounds_analytics_payload_shape(self):
        with self.assertRaises(ValueError):
            AnalyticsRequest(metrics={str(index): index for index in range(101)})
        with self.assertRaises(ValueError):
            AnalyticsRequest(metrics={"visits": []})

    def test_bounds_competitor_domain_and_accepts_valid_input(self):
        self.assertEqual(CompetitorRequest(domain="example.com").domain, "example.com")
        with self.assertRaises(ValueError):
            CompetitorRequest(domain="x" * 254)

    def test_cors_uses_explicit_origins_and_discards_wildcard(self):
        self.assertEqual(
            cors_origins("https://a.example, *, http://localhost:3000/"),
            ["https://a.example", "http://localhost:3000"],
        )


if __name__ == "__main__":
    unittest.main()
