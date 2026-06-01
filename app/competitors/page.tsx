"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/dashboard/sidebar"
import { SkeletonTable, SkeletonList } from "@/components/ui/skeleton"
import { getCompetitors } from "@/lib/api"
import { Search, Loader2, TrendingUp, AlertTriangle, DollarSign, Shield, Target, Zap, Layers, Sparkles } from "lucide-react"

export default function CompetitorsPage() {
  const [domain, setDomain] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  async function handleSearch() {
    if (!domain.trim()) return
    setLoading(true)
    setResult(null)
    const data = await getCompetitors(domain)
    setResult(data)
    setLoading(false)
  }

  const strengths = ["AI-native architecture", "Modern UX/UI", "Fast time-to-value", "Lower price point"]
  const weaknesses = ["No brand recognition", "Smaller team", "Fewer integrations", "Limited case studies"]
  const opportunities = ["Remote work trend", "AI adoption wave", "Unsolved pain in niche", "Creator economy growth"]
  const threats = ["Big tech entering space", "Open-source alternatives", "Economic downturn", "Copycat competitors"]

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Competitor Intelligence</h1>
          <p className="text-muted-foreground">
            AI-powered competitor discovery, SWOT analysis, pricing comparison, and positioning gap detection.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Analyze Your Market
            </CardTitle>
            <CardDescription>
              Enter your product domain to identify competitors, analyze positioning, and find gaps.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Product domain</label>
              <Input
                placeholder="e.g., AI mock interview platform, SaaS analytics tool"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
            </div>
            <Button onClick={handleSearch} disabled={loading || !domain.trim()}>
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing Market...</>
              ) : (
                <><Search className="mr-2 h-4 w-4" /> Find Competitors</>
              )}
            </Button>
          </CardContent>
        </Card>

        {loading && (
          <Card>
            <CardHeader><CardTitle className="text-sm">Scanning competitor landscape...</CardTitle></CardHeader>
            <CardContent><SkeletonTable rows={3} /><div className="mt-6"><SkeletonList count={4} /></div></CardContent>
          </Card>
        )}

        {result && !loading && (
          <Tabs defaultValue="competitors" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="competitors" className="gap-2"><Search className="h-4 w-4" /> Discovery</TabsTrigger>
              <TabsTrigger value="swot" className="gap-2"><Shield className="h-4 w-4" /> SWOT</TabsTrigger>
              <TabsTrigger value="pricing" className="gap-2"><DollarSign className="h-4 w-4" /> Pricing</TabsTrigger>
              <TabsTrigger value="gaps" className="gap-2"><Target className="h-4 w-4" /> Gaps</TabsTrigger>
            </TabsList>

            {/* Competitor Discovery */}
            <TabsContent value="competitors">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Competitor Landscape</CardTitle>
                  <CardDescription>Key players in your market</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.competitors.map((c: any, i: number) => (
                      <div key={i} className="rounded-lg border p-4 transition-all hover:border-primary/30">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{c.name}</h4>
                              <Badge variant={c.threat === "High" ? "destructive" : c.threat === "Medium" ? "warning" : "secondary"}>
                                {c.threat} Threat
                              </Badge>
                            </div>
                            <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" /> {c.pricing}</span>
                              <span className="flex items-center gap-1"><TrendingUp className="h-3.5 w-3.5" /> {c.positioning}</span>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2 text-xs">
                              <Badge variant="warning" className="gap-1"><AlertTriangle className="h-3 w-3" /> Weakness: {c.weakness}</Badge>
                              <Badge variant="success" className="gap-1"><Shield className="h-3 w-3" /> Strength: {c.strength}</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SWOT Analysis */}
            <TabsContent value="swot">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">SWOT Analysis</CardTitle>
                  <CardDescription>Your position relative to competitors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-900 dark:bg-emerald-950/20">
                      <h4 className="flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                        <Shield className="h-4 w-4" /> Strengths
                      </h4>
                      <div className="mt-2 space-y-2">
                        {strengths.map((s, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />{s}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-lg border border-red-200 bg-red-50/50 p-4 dark:border-red-900 dark:bg-red-950/20">
                      <h4 className="flex items-center gap-2 text-sm font-semibold text-red-700 dark:text-red-400">
                        <AlertTriangle className="h-4 w-4" /> Weaknesses
                      </h4>
                      <div className="mt-2 space-y-2">
                        {weaknesses.map((w, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400">
                            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />{w}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900 dark:bg-blue-950/20">
                      <h4 className="flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-400">
                        <Zap className="h-4 w-4" /> Opportunities
                      </h4>
                      <div className="mt-2 space-y-2">
                        {opportunities.map((o, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-blue-600 dark:text-blue-400">
                            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />{o}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900 dark:bg-amber-950/20">
                      <h4 className="flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-400">
                        <Target className="h-4 w-4" /> Threats
                      </h4>
                      <div className="mt-2 space-y-2">
                        {threats.map((t, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-amber-600 dark:text-amber-400">
                            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />{t}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pricing Comparison */}
            <TabsContent value="pricing">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Pricing & Feature Comparison</CardTitle>
                  <CardDescription>How you stack up against competitors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 pr-4 text-left font-medium">Feature</th>
                          <th className="py-2 px-4 text-left font-medium text-primary">You</th>
                          <th className="py-2 px-4 text-left font-medium">Market Leader</th>
                          <th className="py-2 px-4 text-left font-medium">Challenger</th>
                          <th className="py-2 pl-4 text-left font-medium">Legacy</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.pricingComparison.map((row: any, i: number) => (
                          <tr key={i} className="border-b last:border-0">
                            <td className="py-3 pr-4 font-medium">{row.feature}</td>
                            <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400">{row.us}</td>
                            <td className="py-3 px-4 text-muted-foreground">{row.leader}</td>
                            <td className="py-3 px-4 text-muted-foreground">{row.challenger}</td>
                            <td className="py-3 pl-4 text-muted-foreground">{row.legacy}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Positioning Gaps */}
            <TabsContent value="gaps">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Positioning Gaps & Opportunities</CardTitle>
                  <CardDescription>Underserved areas in the market</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.positioningGaps.map((gap: string, i: number) => (
                      <div key={i} className="flex items-start gap-3 rounded-lg border p-4 transition-all hover:border-primary/30">
                        <Target className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <div>
                          <p className="text-sm">{gap}</p>
                          <Badge variant="success" className="mt-1 text-xs">Opportunity</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {!result && !loading && (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold">Discover your competitive landscape</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                Enter your market domain to get AI-powered competitor discovery, SWOT analysis, pricing comparisons, and positioning gap detection.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
