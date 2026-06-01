"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import DashboardLayout from "@/components/dashboard/sidebar"
import { getCompetitors } from "@/lib/api"
import { Search, TrendingUp, Loader2, AlertTriangle, DollarSign, FileSearch } from "lucide-react"

export default function CompetitorsPage() {
  const [domain, setDomain] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  async function handleSearch() {
    if (!domain.trim()) return
    setLoading(true)
    const data = await getCompetitors(domain)
    setResult(data)
    setLoading(false)
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Competitor Intelligence</h1>
          <p className="text-muted-foreground">
            Enter your market domain and get comprehensive competitor analysis.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Analyze Your Market
            </CardTitle>
            <CardDescription>
              Describe your product category to identify competitors, gaps, and opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Product domain</label>
              <Input
                placeholder="e.g., AI mock interview platform, SaaS analytics tool..."
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
            </div>
            <Button onClick={handleSearch} disabled={loading || !domain.trim()}>
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
              ) : (
                <><Search className="mr-2 h-4 w-4" /> Find Competitors</>
              )}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <>
            {/* Competitor Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Competitor Landscape</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.competitors.map((c: any, i: number) => (
                    <div key={i} className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{c.name}</h4>
                          <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-3.5 w-3.5" />
                              {c.pricing}
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className="h-3.5 w-3.5" />
                              {c.positioning}
                            </span>
                          </div>
                        </div>
                        <Badge variant="warning" className="flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          {c.weakness}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* SEO Gaps & Differentiation */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <FileSearch className="h-4 w-4 text-primary" />
                    SEO Gaps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {result.seoGaps.map((gap: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 rounded-lg bg-accent/50 p-2 text-sm">
                        <span className="mt-0.5 text-primary">•</span>
                        {gap}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                    Your Differentiation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{result.differentiation}</p>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
