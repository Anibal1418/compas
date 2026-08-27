"use client"

import { Compass, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-navy text-navy-foreground">
      <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-4 py-3 md:px-6">
        {/* Logo + co-branding */}
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-orange text-orange-foreground shadow-sm">
            <Compass className="size-6" strokeWidth={2.4} />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight">COMPÁS</span>
              <span className="hidden rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/70 sm:inline">
                Powered by Banco Popular
              </span>
            </div>
            <span className="text-xs text-white/60">Director de Finanzas Virtual</span>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Button className="hidden bg-orange font-semibold text-orange-foreground shadow-sm hover:bg-orange/90 sm:inline-flex">
            <Plus className="size-4" />
            Simular Nueva Expansión
          </Button>

          {/* User profile badge */}
          <div className="flex items-center gap-3 rounded-full bg-white/10 py-1 pl-1 pr-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-violet text-sm font-bold text-violet-foreground">
              EM
            </div>
            <div className="hidden leading-tight sm:block">
              <div className="text-sm font-semibold">Ernesto Matos</div>
              <div className="text-xs text-white/60">Barbería</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
