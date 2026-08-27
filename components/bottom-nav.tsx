"use client"

import { AlertTriangle, Compass, Landmark, LayoutDashboard, MapPin } from "lucide-react"

import { cn } from "@/lib/utils"

export type BottomNavId = "home" | "business" | "grow" | "simulate" | "compass"

export type MainScreenId = BottomNavId

export type AppScreenId = BottomNavId | "financing"

export interface BottomNavItem {
  id: BottomNavId
  label: string
  icon: typeof LayoutDashboard
}

export const bottomNavItems: readonly BottomNavItem[] = [
  { id: "home", label: "Inicio", icon: LayoutDashboard },
  { id: "business", label: "Mi negocio", icon: Landmark },
  { id: "grow", label: "Crecer", icon: MapPin },
  { id: "simulate", label: "Simular", icon: AlertTriangle },
  { id: "compass", label: "Compás", icon: Compass },
]

export interface BottomNavProps {
  active: BottomNavId
  onChange: (id: BottomNavId) => void
  className?: string
  ariaLabel?: string
}

export function BottomNav({
  active,
  onChange,
  className,
  ariaLabel = "Navegación principal",
}: BottomNavProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        "border-t border-[#dfe5ee] bg-white/95 px-1 pt-1 shadow-[0_-8px_24px_rgba(2,51,115,0.06)] backdrop-blur-md",
        "pb-[calc(env(safe-area-inset-bottom)+0.375rem)]",
        className,
      )}
    >
      <div className="grid grid-cols-5">
        {bottomNavItems.map((item) => {
          const Icon = item.icon
          const isActive = item.id === active

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              aria-current={isActive ? "page" : undefined}
              aria-label={item.label}
              className={cn(
                "relative flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5",
                "text-[10px] font-medium leading-none transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f39200] focus-visible:ring-offset-1",
                isActive ? "text-[#023373]" : "text-[#657083] hover:text-[#023373]",
              )}
            >
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded-lg transition-colors",
                  isActive ? "bg-[#e8f0fb]" : "bg-transparent",
                )}
                aria-hidden="true"
              >
                <Icon className="size-[18px]" strokeWidth={isActive ? 2.4 : 2} />
              </span>
              <span className="max-w-full truncate">{item.label}</span>
              {isActive ? (
                <span
                  className="absolute inset-x-5 -top-1 h-0.5 rounded-full bg-[#f39200]"
                  aria-hidden="true"
                />
              ) : null}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
