"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import DashboardLayout from "@/components/dashboard/sidebar"
import { SkeletonCard, SkeletonList } from "@/components/ui/skeleton"
import { analyzeStartup } from "@/lib/api"
import {
  Sparkles, Send, Target, Users, TrendingUp, Lightbulb, CheckCircle2,
  Loader2, BarChart3, Rocket, Brain, DollarSign, Globe, Activity,
} from "lucide-react"

export default function DashboardPage() {
  const [idea, setIdea] = useState("")
  const [audience, setAudience] = useState("")
  const [stage, setStage] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [analyzed, setAnalyzed] = useState(false)

  async function handleAnalyze() {
    if (!idea.trim()) return
    setLoading(true)
    setAnalyzed(true)
    setResult(null)
    const data = await analyzeStartup({ idea, audience, stage })
    setResult(data)
    setLoading(false)
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Startup Overview</h1>
          <p className="text-muted-foreground">
            Describe your startup below. The AI will analyze and generate your complete growth strategy.
          </p>
        </div>

        {/* Input Card */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Brain className="h-5 w-5 text-primary" />
              AI Startup Analyzer
            </CardTitle>
            <CardDescription>
              Tell us about your product. Get instant AI-powered positioning, roadmap, and growth strategy.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">What is your startup about?</label>
              <Textarea
                placeholder='e.g., "An AI resume analyzer that helps students optimize their resumes for job applications"'
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Target audience</label>
                <Input placeholder="e.g., College students, job seekers" value={audience} onChange={(e) => setAudience(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Product stage</label>
                <Input placeholder="e.g., Idea, MVP, Launched" value={stage} onChange={(e) => setStage(e.target.value)} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleAnalyze} disabled={loading || !idea.trim()} size="lg">
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> AI is Analyzing...</>
                ) : (
                  <><Sparkles className="mr-2 h-4 w-4" /> Analyze My Startup</>
                )}
              </Button>
              {result && (
                <Badge variant="success" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Analysis Complete
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-4">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
            <Card>
              <CardHeader><CardTitle className="text-sm">Analyzing your startup...</CardTitle></CardHeader>
              <CardContent>
                <SkeletonList count={3} />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <>
            {/* Metrics Snapshot */}
            <div className="grid gap-4 sm:grid-cols-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Activity className="mx-auto h-4 w-4 text-muted-foreground mb-1" />
                  <div className="text-2xl font-bold">{result.metrics.weeklyTraffic}</div>
                  <p className="text-xs text-muted-foreground">Weekly Traffic</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="mx-auto h-4 w-4 text-muted-foreground mb-1" />
                  <div className="text-2xl font-bold">{result.metrics.activeUsers}</div>
                  <p className="text-xs text-muted-foreground">Active Users</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="mx-auto h-4 w-4 text-muted-foreground mb-1" />
                  <div className="text-2xl font-bold">{result.metrics.conversionRate}</div>
                  <p className="text-xs text-muted-foreground">Conversion Rate</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <DollarSign className="mx-auto h-4 w-4 text-muted-foreground mb-1" />
                  <div className="text-2xl font-bold">{result.metrics.mrr}</div>
                  <p className="text-xs text-muted-foreground">Monthly Revenue</p>
                </CardContent>
              </Card>
            </div>

            {/* Growth Score with Breakdown */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Rocket className="h-4 w-4 text-primary" />
                    Growth Readiness Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-4 mb-4">
                    <div className="text-5xl font-bold gradient-text">{result.score}</div>
                    <div className="text-sm text-muted-foreground mb-1">/100</div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Market Clarity", value: result.scoreBreakdown.marketClarity },
                      { label: "SEO Readiness", value: result.scoreBreakdown.seoReadiness },
                      { label: "Monetization", value: result.scoreBreakdown.monetization },
                      { label: "Viral Potential", value: result.scoreBreakdown.viralPotential },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{item.label}</span>
                          <span className="font-medium">{item.value}%</span>
                        </div>
                        <Progress value={item.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Target className="h-4 w-4 text-primary" />
                    Positioning & ICP
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Tagline</p>
                    <p className="text-sm text-muted-foreground italic">&ldquo;{result.tagline}&rdquo;</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Positioning</p>
                    <p className="text-sm text-muted-foreground">{result.positioning}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Ideal Customer Profile</p>
                    <div className="flex flex-wrap gap-2">
                      {result.targetUsers.map((u: string, i: number) => (
                        <Badge key={i} variant="secondary" className="text-xs">{u}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Growth Roadmap */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Rocket className="h-4 w-4 text-primary" />
                  Growth Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-3">
                  {result.growthRoadmap.map((phase: any, i: number) => (
                    <div key={i} className="rounded-lg border p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white ${i === 0 ? 'bg-emerald-500' : i === 1 ? 'bg-amber-500' : 'bg-blue-500'}`}>
                          {i + 1}
                        </span>
                        <h4 className="font-semibold text-sm">{phase.phase}</h4>
                      </div>
                      <div className="space-y-2">
                        {phase.tasks.map((task: string, j: number) => (
                          <div key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                            {task}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  AI Action Recommendations
                </CardTitle>
                <CardDescription>Prioritized by impact and effort</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.suggestions.map((s: any, i: number) => (
                    <div key={i} className="flex items-start gap-4 rounded-lg border p-4 transition-all hover:border-primary/30">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                        <Lightbulb className="h-4 w-4 text-amber-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{s.action}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <Badge variant={s.impact === "High" ? "success" : s.impact === "Medium" ? "warning" : "secondary"} className="text-xs">
                            {s.impact} Impact
                          </Badge>
                          <Badge variant="outline" className="text-xs">{s.effort} Effort</Badge>
                          <span className="text-xs text-muted-foreground">{s.category}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Empty state */}
        {!analyzed && !loading && (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Brain className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold">Ready to analyze your startup?</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                Enter your startup idea above and let AI generate your complete growth strategy — including positioning, roadmap, and actionable recommendations.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
