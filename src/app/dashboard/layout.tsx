import { Sidebar } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/themes/mode-toggle"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar>
        <div className="flex h-full flex-col gap-4">
          <div className="flex items-center justify-between px-4 py-2">
            <h2 className="text-lg font-semibold">Analytics Dashboard</h2>
            <ModeToggle />
          </div>
          <nav className="flex flex-col gap-2 px-2">
            <a href="/dashboard" className="px-2 py-1 hover:bg-accent rounded">
              Overview
            </a>
            <a href="/dashboard/sentiment" className="px-2 py-1 hover:bg-accent rounded">
              Sentiment Analysis
            </a>
            <a href="/dashboard/trends" className="px-2 py-1 hover:bg-accent rounded">
              Trending Topics
            </a>
            <a href="/dashboard/metrics" className="px-2 py-1 hover:bg-accent rounded">
              Engagement Metrics
            </a>
          </nav>
        </div>
      </Sidebar>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
} 