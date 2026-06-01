"use client"

import Link from "next/link"
import { Sparkles, Heart, Github, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold">GrowthCortex</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Your 24/7 AI growth strategist for startups and solo founders.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Product</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link href="/pricing" className="block hover:text-foreground">Pricing</Link>
              <Link href="/login" className="block hover:text-foreground">Dashboard</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Company</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <span className="block">About</span>
              <span className="block">Blog</span>
              <span className="block">Contact</span>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Legal</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <span className="block">Privacy</span>
              <span className="block">Terms</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t pt-8 text-sm text-muted-foreground">
          <p>© 2026 GrowthCortex. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Heart className="h-4 w-4" />
          </div>
        </div>
      </div>
    </footer>
  )
}
