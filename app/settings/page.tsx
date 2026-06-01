"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import DashboardLayout from "@/components/dashboard/sidebar"
import { Settings as SettingsIcon, User, Bell, Key, CreditCard, Palette, Globe, LogOut, Save } from "lucide-react"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account, preferences, and integrations.</p>
        </div>

        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-primary" />
              Profile
            </CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input defaultValue="Solo Founder" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input defaultValue="founder@startup.com" type="email" />
              </div>
            </div>
            <Button size="sm" className="gap-2"><Save className="h-4 w-4" /> Save Changes</Button>
          </CardContent>
        </Card>

        {/* API Key */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Key className="h-4 w-4 text-primary" />
              API Keys
            </CardTitle>
            <CardDescription>Connect your OpenAI key for enhanced AI features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">OpenAI API Key</label>
              <div className="flex gap-2">
                <Input type="password" placeholder="sk-..." className="flex-1" />
                <Button variant="outline" size="sm">Connect</Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Your key is stored securely and never shared. Without a key, the app uses demo data.
            </p>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Bell className="h-4 w-4 text-primary" />
              Notifications
            </CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Weekly growth report", "New competitor detected", "Content generation complete", "AI insights ready"].map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-sm">{item}</span>
                <Badge variant="secondary" className="cursor-pointer">On</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm text-destructive">
              <LogOut className="h-4 w-4" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Delete Account</p>
              <p className="text-xs text-muted-foreground">Permanently delete your account and data</p>
            </div>
            <Button variant="destructive" size="sm">Delete</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
