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
  ChevronRight,
  Star,
  Rocket,
  Search,
  MessageSquare,
  Shield,
  Layers,
} from "lucide-react"
import { motion } from "framer-motion"
import Navbar from "@/components/landing/navbar"
import Footer from "@/components/landing/footer"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,hsl(262,83%,92%),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl"
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              AI-Powered Growth Platform
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Your{" "}
              <span className="gradient-text">24/7 AI Growth Strategist</span>{" "}
              for Startups
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              GrowthCortex analyzes your product, market, and metrics — then
              gives you growth experiments, marketing content, and a launch
              strategy. Like having a world-class growth team in one dashboard.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="xl" asChild>
                <Link href="/login">
                  Start Growing <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="/login">
                  See Demo <Rocket className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> No credit card
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Free to start
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Cancel anytime
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-4">How It Works</Badge>
            <h2 className="text-3xl font-bold">From Idea to Growth in Minutes</h2>
            <p className="mt-4 text-muted-foreground">
              Just describe your startup and let AI do the rest.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                icon: MessageSquare,
                title: "Describe Your Idea",
                desc: "Tell us about your product, audience, and goals in plain English.",
              },
              {
                icon: Brain,
                title: "AI Analyzes Everything",
                desc: "Our agents analyze market fit, competitors, content gaps, and growth opportunities.",
              },
              {
                icon: TrendingUp,
                title: "Get Your Growth Plan",
                desc: "Receive a complete strategy with experiments, content, and launch roadmap.",
              },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeIn}>
                <Card className="h-full border-0 bg-background shadow-sm transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg gradient-bg">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-4 font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="text-3xl font-bold">Everything You Need to Grow</h2>
            <p className="mt-4 text-muted-foreground">
              A complete growth stack powered by AI agents.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Search,
                title: "Competitor Intelligence",
                desc: "AI scans your market, finds competitors, and reveals their weaknesses.",
              },
              {
                icon: FileText,
                title: "Content Generation",
                desc: "Generate LinkedIn posts, Twitter threads, blogs, and emails in your brand voice.",
              },
              {
                icon: Zap,
                title: "Growth Experiments",
                desc: "Get data-driven growth experiments prioritized by impact and effort.",
              },
              {
                icon: BarChart3,
                title: "Analytics Explainer",
                desc: "Upload metrics and get plain-English explanations and fix recommendations.",
              },
              {
                icon: Users,
                title: "Launch Strategy",
                desc: "Step-by-step launch roadmap with timelines and tactical checklists.",
              },
              {
                icon: Layers,
                title: "AI Dashboard",
                desc: "Central workspace with health score, roadmap, and real-time suggestions.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
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

      {/* Demo Preview */}
      <section className="border-t bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="secondary" className="mb-4">Live Demo</Badge>
              <h2 className="text-3xl font-bold">
                See It in Action
              </h2>
              <p className="mt-4 text-muted-foreground">
                Type &ldquo;I built an AI resume analyzer for students&rdquo; and watch
                GrowthCortex generate market analysis, content strategy, and a
                launch plan instantly.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Real-time competitor analysis",
                  "Instant content generation",
                  "Growth experiment suggestions",
                  "Launch roadmap with timeline",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="mt-6" asChild>
                <Link href="/login">
                  Try It Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-xl border bg-card p-4 shadow-xl">
                <div className="flex items-center gap-2 border-b pb-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex-1 text-center text-xs text-muted-foreground">
                    growthcortex.app/dashboard
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-4 flex items-center gap-3 rounded-lg bg-accent p-3">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">
                      AI Resume Analyzer for Students
                    </span>
                    <Badge className="ml-auto">Score: 82</Badge>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Market Size", value: "$1.8B" },
                      { label: "ICP", value: "College students, career centers" },
                      { label: "Top Channel", value: "TikTok organic" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-2 text-sm">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-emerald-50 p-3 text-center text-sm dark:bg-emerald-950/30">
                      <div className="font-semibold text-emerald-600 dark:text-emerald-400">3</div>
                      <div className="text-xs text-muted-foreground">Experiments</div>
                    </div>
                    <div className="rounded-lg bg-purple-50 p-3 text-center text-sm dark:bg-purple-950/30">
                      <div className="font-semibold text-purple-600 dark:text-purple-400">5</div>
                      <div className="text-xs text-muted-foreground">Content Pieces</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-xl bg-primary/10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">Pricing</Badge>
            <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-muted-foreground">
              Start free, upgrade as you grow.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                name: "Free",
                price: "$0",
                desc: "Perfect for trying out",
                features: ["1 startup analysis", "Basic content generation", "Growth score", "Community access"],
              },
              {
                name: "Pro",
                price: "$19",
                desc: "For serious founders",
                features: ["Unlimited analysis", "AI content engine", "Competitor tracking", "Analytics explainer", "Priority support"],
                popular: true,
              },
              {
                name: "Growth",
                price: "$49",
                desc: "For scaling startups",
                features: ["Everything in Pro", "API access", "Custom agents", "Team collaboration", "Dedicated support"],
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className={`relative h-full ${
                    plan.popular
                      ? "border-primary shadow-lg ring-1 ring-primary"
                      : "shadow-sm"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="px-4 py-1">Most Popular</Badge>
                    </div>
                  )}
                  <CardContent className={`p-6 ${plan.popular ? "pt-8" : ""}`}>
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">/month</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{plan.desc}</p>
                    <ul className="mt-6 space-y-3">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button className="mt-6 w-full" variant={plan.popular ? "default" : "outline"} asChild>
                      <Link href="/login">
                        {plan.popular ? "Start Free Trial" : "Get Started"}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4">Get Started</Badge>
            <h2 className="text-3xl font-bold">
              Ready to Grow Your Startup?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Join founders who use AI to make smarter growth decisions. Start free, no credit card required.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="xl" asChild>
                <Link href="/login">
                  Start Growing Free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="/login">
                  <Star className="mr-2 h-5 w-5" /> Book a Demo
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
