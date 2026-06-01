"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/dashboard/sidebar"
import { generateContent } from "@/lib/api"
import {
  FileText,
  Linkedin,
  Twitter,
  Mail,
  BookOpen,
  Loader2,
  Copy,
  Check,
  Sparkles,
} from "lucide-react"

const platforms = [
  { id: "linkedin", label: "LinkedIn", icon: Linkedin },
  { id: "twitter", label: "X / Twitter", icon: Twitter },
  { id: "blog", label: "Blog", icon: BookOpen },
  { id: "email", label: "Email", icon: Mail },
]

export default function ContentPage() {
  const [idea, setIdea] = useState("")
  const [platform, setPlatform] = useState("linkedin")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [copied, setCopied] = useState<string | null>(null)

  async function handleGenerate() {
    if (!idea.trim()) return
    setLoading(true)
    const data = await generateContent({ idea, platform: platform as any })
    setResult(data)
    setLoading(false)
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Content Studio</h1>
          <p className="text-muted-foreground">
            Generate platform-optimized content for your startup in seconds.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Generate Content
            </CardTitle>
            <CardDescription>
              Describe your product and choose a platform for optimized content.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={platform} onValueChange={setPlatform}>
              <TabsList className="grid w-full grid-cols-4">
                {platforms.map((p) => {
                  const Icon = p.icon
                  return (
                    <TabsTrigger key={p.id} value={p.id} className="gap-2">
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{p.label}</span>
                    </TabsTrigger>
                  )
                })}
              </TabsList>
            </Tabs>

            <div className="space-y-2">
              <label className="text-sm font-medium">What is your startup about?</label>
              <Textarea
                placeholder="e.g., AI-powered resume analyzer for students..."
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                rows={2}
              />
            </div>
            <Button onClick={handleGenerate} disabled={loading || !idea.trim()}>
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
              ) : (
                <><Sparkles className="mr-2 h-4 w-4" /> Generate Content</>
              )}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-primary" />
                  Generated Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.content.map((item: string, i: number) => (
                  <div
                    key={i}
                    className="group relative rounded-lg border bg-card p-4 transition-all hover:border-primary/30"
                  >
                    <p className="text-sm">{item}</p>
                    <button
                      onClick={() => handleCopy(item)}
                      className="absolute right-2 top-2 rounded-md p-1.5 opacity-0 transition-opacity hover:bg-accent group-hover:opacity-100"
                    >
                      {copied === item ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Suggested Hashtags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {result.hashtags.map((tag: string, i: number) => (
                      <Badge key={i} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Optimization Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {result.suggestions.map((s: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <Sparkles className="mt-0.5 h-3.5 w-3.5 text-amber-500" />
                        {s}
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
