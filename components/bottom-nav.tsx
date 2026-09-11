"use client"

import Image from "next/image"
import { AlertTriangle, Landmark, LayoutDashboard, MapPin, type LucideIcon } from "lucide-react"

import compasIsotipo from "@/components/Compas Isotipo.png"
import { cn } from "@/lib/utils"

export type BottomNavId = "home" | "business" | "grow" | "simulate" | "compass"

export type MainScreenId = BottomNavId

export type AppScreenId = BottomNavId | "funding-plan" | "stress-test" | "financing" | "handoff"

export interface BottomNavItem {
  id: BottomNavId
  label: string
  icon?: LucideIcon
}

export const bottomNavItems: readonly BottomNavItem[] = [
  { id: "home", label: "Inicio", icon: LayoutDashboard },
  { id: "business", label: "Mi negocio", icon: Landmark },
  { id: "grow", label: "Crecer", icon: MapPin },
  { id: "simulate", label: "Simular", icon: AlertTriangle },
  { id: "compass", label: "Compás" },
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
        "border-t border-comerza-border bg-white px-1 pt-1 shadow-[0_-2px_8px_rgba(0,46,109,0.06)]",
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
                "text-xs font-medium leading-none transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-comerza-navy focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                isActive ? "font-bold text-comerza-navy" : "text-[#687282] hover:text-comerza-navy",
              )}
            >
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded-lg transition-colors",
                  isActive ? "bg-comerza-cyan-soft text-comerza-cyan-dark" : "bg-transparent",
                )}
                aria-hidden="true"
              >
                {item.id === "compass" ? (
                  <Image
                    src={compasIsotipo}
                    alt=""
                    className="size-[22px] object-contain"
                  />
                ) : Icon ? (
                  <Icon className="size-[18px]" strokeWidth={isActive ? 2.4 : 2} />
                ) : null}
              </span>
              <span className="max-w-full truncate">{item.label}</span>
              {isActive ? (
                <span
                  className="absolute inset-x-5 -top-1 h-0.5 rounded-full bg-comerza-cyan"
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
