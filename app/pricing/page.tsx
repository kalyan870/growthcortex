"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import Navbar from "@/components/landing/navbar"
import Footer from "@/components/landing/footer"

const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "Perfect for trying out GrowthCortex",
    features: [
      "1 startup analysis",
      "Basic content generation",
      "Growth score",
      "Community access",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    desc: "For serious founders who want to grow fast",
    popular: true,
    features: [
      "Unlimited startup analysis",
      "AI content engine (all platforms)",
      "Competitor tracking & alerts",
      "Analytics explainer",
      "Growth experiments",
      "Priority email support",
    ],
  },
  {
    name: "Growth",
    price: "$49",
    desc: "For scaling startups and teams",
    features: [
      "Everything in Pro",
      "API access",
      "Custom AI agents",
      "Team collaboration (up to 5)",
      "Dedicated account manager",
      "Custom integrations",
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <Badge variant="secondary" className="mb-4">Pricing</Badge>
          <h1 className="text-3xl font-bold sm:text-4xl">Simple, Transparent Pricing</h1>
          <p className="mt-4 text-muted-foreground">
            Start free. Upgrade when you need more power.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
                          <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Button
                      className="mt-6 w-full"
                      variant={plan.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href="/login">
                        {plan.popular ? "Start Free Trial" : "Get Started"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
