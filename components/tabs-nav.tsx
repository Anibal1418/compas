"use client"

import { LayoutDashboard, Map, AlertTriangle, Landmark } from "lucide-react"
import { cn } from "@/lib/utils"

export type TabId = "dashboard" | "geo" | "risk" | "loans"

const tabs: { id: TabId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "geo", label: "Análisis Geoespacial", icon: Map },
  { id: "risk", label: "Simulación de Riesgo", icon: AlertTriangle },
  { id: "loans", label: "Mis Préstamos", icon: Landmark },
]

export function TabsNav({
  active,
  onChange,
}: {
  active: TabId
  onChange: (id: TabId) => void
}) {
  return (
    <nav className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-[1600px] gap-1 overflow-x-auto px-4 md:px-6">
        {tabs.map((tab) => {
          const isActive = tab.id === active
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                "relative flex shrink-0 items-center gap-2 px-4 py-3.5 text-sm font-medium transition-colors",
                isActive ? "text-violet" : "text-muted-foreground hover:text-foreground",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="size-4" />
              {tab.label}
              {isActive && (
                <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-violet" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
