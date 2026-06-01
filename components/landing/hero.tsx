"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  TrendingUp,
  FileText,
  Users,
  BarChart3,
  Zap,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Rocket,
  Search,
  Target,
  Layers,
  Play,
} from "lucide-react"
import { motion } from "framer-motion"
import Navbar from "@/components/landing/navbar"
import Footer from "@/components/landing/footer"

const fadeIn = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const stagger = { animate: { transition: { staggerChildren: 0.1 } } }

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero - "AI Operating System for Startup Growth" */}
      <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,hsl(262,83%,92%),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-4xl">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              AI Operating System for Startup Growth
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Your <span className="gradient-text">AI Growth Copilot</span> for Building and Scaling Startups
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
              GrowthCortex is an intelligent copilot that analyzes your product, market, and metrics — then generates growth experiments, marketing content, and a launch strategy. Like having a world-class growth team in one dashboard.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="xl" asChild>
                <Link href="/login">
                  Launch Your AI Growth Strategy <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="/login">
                  <Play className="mr-2 h-5 w-5" /> Watch Demo
                </Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> No credit card</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Free to start</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> AI-powered insights</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="border-t bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Badge variant="secondary" className="mb-4">The Problem</Badge>
              <h2 className="text-3xl font-bold">Why Most Startups Fail to Grow</h2>
              <p className="mt-4 text-muted-foreground">
                Early-stage founders struggle with fragmented tools, no marketing budget, and zero data-driven strategy. They waste hours switching between tools instead of growing their business.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Can't afford a growth team or marketing agency",
                  "No clear strategy — just random tactics",
                  "Waste time on tools that don't connect",
                  "Building features nobody asked for",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive/10 text-xs text-destructive">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Badge variant="secondary" className="mb-4">The Solution</Badge>
              <h2 className="text-3xl font-bold">One AI Copilot for Everything</h2>
              <p className="mt-4 text-muted-foreground">
                GrowthCortex replaces 5+ tools with one intelligent system. Just describe your startup, and AI handles the rest — from competitor analysis to content generation.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "AI analyzes your product, market, and metrics",
                  "Automated competitor intelligence & gap analysis",
                  "Content generation optimized for every platform",
                  "Data-driven growth experiments & launch strategy",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workflow - The Magic Moment */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">The Flow</Badge>
            <h2 className="text-3xl font-bold">From Idea to Strategy in 10 Seconds</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Describe your startup once. The AI instantly generates your entire growth ecosystem.
            </p>
          </div>

          <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }} className="mt-12">
            <div className="relative">
              <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-primary via-primary/50 to-transparent hidden lg:block" />

              {[
                { step: "1", icon: Brain, title: "Input Your Startup Idea", desc: '"AI resume analyzer for students"', color: "bg-primary" },
                { step: "2", icon: Search, title: "AI Analyzes Everything", desc: "Market fit, competitors, content gaps, growth opportunities", color: "bg-purple-500" },
                { step: "3", icon: Target, title: "Dashboard Generated", desc: "Growth score, positioning, ICP, & actionable roadmap", color: "bg-pink-500" },
                { step: "4", icon: Zap, title: "Growth Strategy Ready", desc: "Competitor intel + content + experiments → launch plan", color: "bg-emerald-500" },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeIn} className="relative pl-0 lg:pl-20 pb-12 last:pb-0">
                  <div className={`absolute left-0 top-0 hidden h-16 w-16 items-center justify-center rounded-2xl ${item.color} text-white shadow-lg lg:flex`}>
                    <item.icon className="h-7 w-7" />
                  </div>
                  <div className="rounded-xl border bg-card p-6 shadow-sm ml-0 lg:ml-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary lg:hidden">{item.step}</span>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="text-3xl font-bold">Your Complete Growth Stack</h2>
            <p className="mt-4 text-muted-foreground">One integrated system. Five powerful AI agents.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Search, title: "Competitor Intelligence", desc: "AI discovers competitors, runs SWOT analysis, compares pricing, and finds positioning gaps in your market." },
              { icon: FileText, title: "AI Content Studio", desc: "Generate LinkedIn posts, Twitter threads, SEO blogs, and email campaigns adapted to your brand voice." },
              { icon: Zap, title: "Growth Experiments", desc: "Get data-driven growth experiments — viral loops, referral systems, retention plays — prioritized by impact." },
              { icon: BarChart3, title: "Analytics AI", desc: "Upload metrics and get plain-English analysis of retention issues, funnel bottlenecks, and fix recommendations." },
              { icon: Target, title: "Startup Analyzer", desc: "Instant growth score with breakdown: market clarity, SEO readiness, monetization, and viral potential." },
              { icon: Layers, title: "Unified Dashboard", desc: "Central workspace with health score, roadmap, metrics snapshot, and real-time AI recommendations." },
            ].map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="group h-full cursor-default transition-all hover:border-primary/20 hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Preview - The Magic Moment */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">Live Preview</Badge>
            <h2 className="text-3xl font-bold">The Magic Moment</h2>
            <p className="mt-4 text-muted-foreground">Type your startup idea. Watch the AI generate your entire growth strategy in seconds.</p>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10 mx-auto max-w-4xl">
            <div className="rounded-xl border bg-card shadow-xl overflow-hidden">
              <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 text-center text-xs text-muted-foreground">growthcortex.app/dashboard</div>
              </div>
              <div className="p-6">
                <div className="mb-6 flex items-center gap-3 rounded-lg border bg-accent/30 p-4">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">I built an AI resume analyzer for college students</span>
                  <Badge className="ml-auto">Growth Score: 78/100</Badge>
                </div>

                <div className="grid gap-4 sm:grid-cols-4 mb-6">
                  {[
                    { label: "Market Size", value: "$2.4B" },
                    { label: "ICP", value: "Students" },
                    { label: "Top Channel", value: "TikTok" },
                    { label: "Experiments", value: "6 Ready" },
                  ].map((item, i) => (
                    <div key={i} className="rounded-lg border p-3 text-center">
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                      <div className="text-lg font-bold">{item.value}</div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Search className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold">Competitors</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span>Market Leader</span><span className="text-muted-foreground">$49/mo</span></div>
                      <div className="flex justify-between"><span>New Challenger</span><span className="text-muted-foreground">Free</span></div>
                      <div className="flex justify-between"><span>Legacy Platform</span><span className="text-muted-foreground">$99/mo</span></div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold">Content</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> 4 LinkedIn posts</div>
                      <div className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> 2 Twitter threads</div>
                      <div className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> 3 email campaigns</div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Rocket className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold">Roadmap</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Launch (Week 1)</div>
                      <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-500" /> Growth (Month 1)</div>
                      <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-blue-500" /> Scale (Month 3)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Badge variant="secondary" className="mb-4">Get Started</Badge>
            <h2 className="text-3xl font-bold">Ready to Build Your Growth Strategy?</h2>
            <p className="mt-4 text-muted-foreground">
              Join founders who use AI to make smarter growth decisions. No credit card required.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="xl" asChild>
                <Link href="/login">
                  Launch Your AI Growth Strategy <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="/login">
                  See It in Action <Play className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
