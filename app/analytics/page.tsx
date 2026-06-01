"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/dashboard/sidebar"
import { analyzeMetrics } from "@/lib/api"
import {
  BarChart3,
  Upload,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  Loader2,
  FileText,
  Activity,
} from "lucide-react"

export default function AnalyticsPage() {
  const [inputMode, setInputMode] = useState("text")
  const [metricsText, setMetricsText] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  async function handleAnalyze() {
    if (!metricsText.trim()) return
    setLoading(true)
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
          <h1 className="text-2xl font-bold">Analytics Explainer</h1>
          <p className="text-muted-foreground">
            Paste your metrics and get AI-powered insights and recommendations.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Upload Your Metrics
            </CardTitle>
            <CardDescription>
              Describe your current metrics or paste data for AI analysis.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={inputMode} onValueChange={setInputMode}>
              <TabsList>
                <TabsTrigger value="text" className="gap-2">
                  <FileText className="h-4 w-4" /> Paste Metrics
                </TabsTrigger>
                <TabsTrigger value="csv" className="gap-2">
                  <Upload className="h-4 w-4" /> Upload CSV
                </TabsTrigger>
              </TabsList>
              <TabsContent value="text">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your metrics</label>
                  <Textarea
                    placeholder={`e.g.,\n- 1000 signups last month\n- 30% activation rate\n- 12% week 2 retention\n- CAC: $45\n- 60% drop at pricing page`}
                    value={metricsText}
                    onChange={(e) => setMetricsText(e.target.value)}
                    rows={5}
                  />
                </div>
              </TabsContent>
              <TabsContent value="csv">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Upload CSV file</label>
                  <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-8">
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Drop your CSV file here or click to browse
                      </p>
                    </div>
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

        {result && (
          <>
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
                    {result.issues.map((issue: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 rounded-lg bg-destructive/5 p-3 text-sm">
                        <TrendingDown className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                        {issue}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Lightbulb className="h-4 w-4 text-emerald-500" />
                    Recommended Fixes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.recommendations.map((rec: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 rounded-lg bg-emerald-50 p-3 text-sm dark:bg-emerald-950/20">
                        <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                        {rec}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
