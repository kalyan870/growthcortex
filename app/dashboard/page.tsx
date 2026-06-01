"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import DashboardLayout from "@/components/dashboard/sidebar"
import { analyzeStartup } from "@/lib/api"
import {
  Sparkles,
  Send,
  Target,
  Users,
  TrendingUp,
  Lightbulb,
  CheckCircle2,
  Loader2,
  BarChart3,
  Rocket,
} from "lucide-react"

export default function DashboardPage() {
  const [idea, setIdea] = useState("")
  const [audience, setAudience] = useState("")
  const [stage, setStage] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  async function handleAnalyze() {
    if (!idea.trim()) return
    setLoading(true)
    const data = await analyzeStartup({ idea, audience, stage })
    setResult(data)
    setLoading(false)
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">AI Founder Dashboard</h1>
          <p className="text-muted-foreground">
            Describe your startup and get instant AI-powered growth analysis.
          </p>
        </div>

        {/* Input Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Analyze Your Startup
            </CardTitle>
            <CardDescription>
              Tell us about your product and we&apos;ll generate a complete growth strategy.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">What is your startup idea?</label>
              <Textarea
                placeholder='e.g., "An AI resume analyzer that helps students optimize their resumes for job applications"'
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                rows={3}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Target audience (optional)</label>
                <Input
                  placeholder="e.g., College students, job seekers"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Product stage (optional)</label>
                <Input
                  placeholder="e.g., Idea, MVP, Launched"
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={handleAnalyze} disabled={loading || !idea.trim()}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Analyze My Startup
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <>
            {/* Growth Score */}
            <div className="grid gap-4 sm:grid-cols-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold gradient-text">{result.score}/100</div>
                  <p className="text-xs text-muted-foreground mt-1">Growth Score</p>
                  <Progress value={result.score} className="mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">{result.marketSize}</div>
                  <p className="text-xs text-muted-foreground mt-1">Market Size</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">{result.suggestions.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">Action Items</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">{result.growthRoadmap.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">Growth Phases</p>
                </CardContent>
              </Card>
            </div>

            {/* Positioning & Users */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Target className="h-4 w-4 text-primary" />
                    Positioning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{result.positioning}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-primary" />
                    Ideal Customer Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {result.targetUsers.map((u: string, i: number) => (
                      <Badge key={i} variant="secondary">
                        {u}
                      </Badge>
                    ))}
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
                <div className="space-y-4">
                  {result.growthRoadmap.map((phase: any, i: number) => (
                    <div key={i}>
                      <h4 className="mb-2 text-sm font-semibold">
                        Phase {i + 1}: {phase.phase}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {phase.tasks.map((task: string, j: number) => (
                          <Badge key={j} variant="outline" className="gap-1">
                            <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                            {task}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  Growth Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.suggestions.map((s: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 rounded-lg bg-accent/50 p-3">
                      <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                      <span className="text-sm">{s}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
