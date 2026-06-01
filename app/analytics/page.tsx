"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/dashboard/sidebar"
import { SkeletonList } from "@/components/ui/skeleton"
import { analyzeMetrics } from "@/lib/api"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3, Upload, TrendingDown, AlertTriangle, Lightbulb,
  Loader2, FileText, Activity, Users, Target, ArrowDown,
} from "lucide-react"

export default function AnalyticsPage() {
  const [inputMode, setInputMode] = useState("text")
  const [metricsText, setMetricsText] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  async function handleAnalyze() {
    if (!metricsText.trim()) return
    setLoading(true)
    setResult(null)
    const data = await analyzeMetrics({
      metrics: { raw: metricsText },
      context: "Growth metrics analysis",
    })
    setResult(data)
    setLoading(false)
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics AI</h1>
          <p className="text-muted-foreground">
            Upload your metrics and get AI-powered funnel analysis, retention insights, and action recommendations.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Upload Your Metrics
            </CardTitle>
            <CardDescription>
              Paste your metrics or upload a CSV for AI analysis.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={inputMode} onValueChange={setInputMode}>
              <TabsList>
                <TabsTrigger value="text" className="gap-2"><FileText className="h-4 w-4" /> Paste Metrics</TabsTrigger>
                <TabsTrigger value="csv" className="gap-2"><Upload className="h-4 w-4" /> Upload CSV</TabsTrigger>
              </TabsList>
              <TabsContent value="text">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your metrics</label>
                  <Textarea
                    placeholder={`e.g.,\n- 10,000 website visitors\n- 1,200 signups\n- 360 activated users\n- 250 week-1 retained\n- 120 week-4 retained\n- 45 paying users\n- CAC: $45\n- 30% activation rate`}
                    value={metricsText}
                    onChange={(e) => setMetricsText(e.target.value)}
                    rows={5}
                    className="resize-none"
                  />
                </div>
              </TabsContent>
              <TabsContent value="csv">
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-8">
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Drop CSV or click to browse</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Button onClick={handleAnalyze} disabled={loading || !metricsText.trim()}>
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing Metrics...</>
              ) : (
                <><Activity className="mr-2 h-4 w-4" /> Analyze Metrics</>
              )}
            </Button>
          </CardContent>
        </Card>

        {loading && (
          <Card>
            <CardHeader><CardTitle className="text-sm">Analyzing your metrics...</CardTitle></CardHeader>
            <CardContent><SkeletonList count={4} /></CardContent>
          </Card>
        )}

        {result && !loading && (
          <>
            {/* Summary */}
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{result.summary}</p>
              </CardContent>
            </Card>

            {/* Funnel Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <ArrowDown className="h-4 w-4 text-primary" />
                  Conversion Funnel
                </CardTitle>
                <CardDescription>Track where users drop off</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {result.funnel.stages.map((stage: any, i: number) => {
                    const barWidth = (stage.percentage / Math.max(...result.funnel.stages.map((s: any) => s.percentage))) * 100
                    const dropOff = i > 0 ? ((result.funnel.stages[i - 1].value - stage.value) / result.funnel.stages[i - 1].value * 100).toFixed(0) : null
                    return (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{stage.label}</span>
                            <Badge variant="secondary" className="text-xs">{stage.value.toLocaleString()}</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{stage.percentage}%</span>
                            {dropOff && Number(dropOff) > 10 && (
                              <Badge variant="warning" className="text-xs">{dropOff}% drop-off</Badge>
                            )}
                          </div>
                        </div>
                        <div className="relative h-8 w-full overflow-hidden rounded-lg bg-muted">
                          <div
                            className="h-full rounded-lg transition-all duration-500"
                            style={{
                              width: `${barWidth}%`,
                              background: i < 2 ? "hsl(142, 76%, 36%)" : i < 4 ? "hsl(38, 92%, 50%)" : "hsl(0, 84%, 60%)"
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Issues & Recommendations */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    Issues Detected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.issues.map((issue: any, i: number) => (
                      <div key={i} className="flex items-start gap-3 rounded-lg border p-3">
                        <TrendingDown className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">{issue.problem || issue}</p>
                          {issue.severity && (
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant={issue.severity === "Critical" ? "destructive" : issue.severity === "High" ? "warning" : "secondary"} className="text-xs">
                                {issue.severity}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{issue.metric}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Lightbulb className="h-4 w-4 text-emerald-500" />
                    Recommended Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.recommendations.map((rec: any, i: number) => (
                      <div key={i} className="flex items-start gap-3 rounded-lg border p-3 transition-all hover:border-emerald-200">
                        <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">{rec.action || rec}</p>
                          {rec.impact && (
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant={rec.impact === "High" ? "success" : "warning"} className="text-xs">
                                {rec.impact} Impact
                              </Badge>
                              <span className="text-xs text-muted-foreground">{rec.timeline}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {!result && !loading && (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <BarChart3 className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold">Analyze your metrics</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                Paste your startup metrics and get AI-powered funnel analysis, retention insights, and prioritized action recommendations.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
