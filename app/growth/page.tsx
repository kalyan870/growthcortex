"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DashboardLayout from "@/components/dashboard/sidebar"
import { getGrowthExperiments } from "@/lib/api"
import { SkeletonList } from "@/components/ui/skeleton"
import {
  FlaskConical, Loader2, Sparkles, Target, ArrowRight,
  CheckCircle2, Clock, TrendingUp, Zap,
} from "lucide-react"

const categoryIcons: Record<string, any> = {
  Acquisition: TrendingUp,
  Conversion: Target,
  Retention: Clock,
  Monetization: Zap,
  Launch: Sparkles,
}

export default function GrowthPage() {
  const [idea, setIdea] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  async function handleGenerate() {
    if (!idea.trim()) return
    setLoading(true)
    setResult(null)
    const data = await getGrowthExperiments(idea)
    setResult(data)
    setLoading(false)
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Growth Experiments</h1>
          <p className="text-muted-foreground">
            AI-suggested growth experiments with viral loops, referral systems, retention plays, and monetization strategies.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-primary" />
              Generate Experiments
            </CardTitle>
            <CardDescription>
              Describe your startup and get data-driven growth experiments prioritized by impact.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Your startup idea</label>
              <Input
                placeholder="e.g., AI resume analyzer for students"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
              />
            </div>
            <Button onClick={handleGenerate} disabled={loading || !idea.trim()}>
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Experiments...</>
              ) : (
                <><Sparkles className="mr-2 h-4 w-4" /> Generate Experiments</>
              )}
            </Button>
          </CardContent>
        </Card>

        {loading && (
          <Card>
            <CardHeader><CardTitle className="text-sm">Designing experiments...</CardTitle></CardHeader>
            <CardContent><SkeletonList count={3} /></CardContent>
          </Card>
        )}

        {result && !loading && (
          <div className="grid gap-4">
            {result.experiments.map((exp: any) => {
              const CatIcon = categoryIcons[exp.category] || FlaskConical
              return (
                <Card key={exp.id} className="group transition-all hover:border-primary/30">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        exp.impact === "High" ? "bg-emerald-100 text-emerald-600" :
                        exp.impact === "Medium" ? "bg-amber-100 text-amber-600" :
                        "bg-blue-100 text-blue-600"
                      }`}>
                        <CatIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold">{exp.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{exp.description}</p>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <Badge variant={exp.impact === "High" ? "success" : exp.impact === "Medium" ? "warning" : "secondary"}>
                              {exp.impact}
                            </Badge>
                            <Badge variant="outline">{exp.effort}</Badge>
                          </div>
                        </div>

                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Steps</p>
                            <div className="space-y-1">
                              {exp.steps.map((step: string, i: number) => (
                                <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                  <span className="text-primary font-medium">{i + 1}.</span>
                                  {step}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Expected Outcome</p>
                            <div className="flex items-start gap-2 rounded-lg bg-emerald-50 p-2 text-xs text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400">
                              <TrendingUp className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                              {exp.expectedOutcome}
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">{exp.category}</Badge>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">ID: {exp.id}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {!result && !loading && (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <FlaskConical className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold">Discover your growth experiments</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                Enter your startup idea to get AI-generated viral loops, referral strategies, retention plays, and monetization experiments.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
