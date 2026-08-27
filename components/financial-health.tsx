"use client"

import { DollarSign, ShieldCheck, TrendingUp, ArrowRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

const cashFlow = [
  { m: "Ago", v: 38 },
  { m: "Sep", v: 41 },
  { m: "Oct", v: 36 },
  { m: "Nov", v: 44 },
  { m: "Dic", v: 52 },
  { m: "Ene", v: 45 },
]

export function FinancialHealth() {
  const max = Math.max(...cashFlow.map((d) => d.v))

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Card 1: Salud Operativa Real */}
      <section className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="mb-1 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-navy/10 text-navy">
            <DollarSign className="size-4" />
          </div>
          <div className="leading-tight">
            <h2 className="text-sm font-semibold text-foreground">Salud Operativa Real</h2>
            <p className="text-xs text-muted-foreground">Flujo de caja transaccional</p>
          </div>
        </div>

        <div className="mb-3 mt-3 flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold text-foreground">RD$ 45,000</div>
            <div className="text-xs text-muted-foreground">Promedio de ingresos reales / mes</div>
          </div>
          <span className="flex items-center gap-1 rounded-md bg-[#3fa796]/10 px-2 py-1 text-xs font-semibold text-[#2e7d70]">
            <TrendingUp className="size-3.5" />
            +11%
          </span>
        </div>

        {/* cash flow chart */}
        <div className="flex h-28 items-end gap-2">
          {cashFlow.map((d, i) => {
            const isLast = i === cashFlow.length - 1
            return (
              <div key={d.m} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                <div className="flex w-full flex-1 items-end">
                  <div
                    className={`w-full rounded-t-md transition-all ${isLast ? "bg-violet" : "bg-navy/20"}`}
                    style={{ height: `${(d.v / max) * 100}%` }}
                  />
                </div>
                <span className={`text-[10px] ${isLast ? "font-semibold text-violet" : "text-muted-foreground"}`}>
                  {d.m}
                </span>
              </div>
            )
          })}
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
          Reemplazo de estados financieros formales por flujo de caja transaccional real.
        </p>
      </section>

      {/* Card 2: Pre-aprobación */}
      <section className="flex flex-1 flex-col rounded-xl border border-navy/15 bg-card p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-orange/10 text-orange">
            <ShieldCheck className="size-4" />
          </div>
          <div className="leading-tight">
            <h2 className="text-sm font-semibold text-foreground">Pre-Aprobación Responsable</h2>
            <p className="text-xs text-muted-foreground">Banco Popular Dominicano</p>
          </div>
        </div>

        <div className="rounded-xl border border-orange/30 bg-orange/5 p-4">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Monto de crédito recomendado
          </span>
          <div className="mt-1 text-3xl font-bold text-orange">RD$ 500,000</div>
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-card/70 px-3 py-2">
            <Info className="mt-0.5 size-3.5 shrink-0 text-orange" />
            <p className="text-xs leading-relaxed text-foreground">
              Monto ajustado al 100% para proteger tu flujo de caja.
            </p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 text-center">
          <div className="rounded-lg border border-border bg-background p-2.5">
            <div className="text-sm font-bold text-foreground">36 meses</div>
            <div className="text-[10px] text-muted-foreground">Plazo sugerido</div>
          </div>
          <div className="rounded-lg border border-border bg-background p-2.5">
            <div className="text-sm font-bold text-foreground">RD$ 16,200</div>
            <div className="text-[10px] text-muted-foreground">Cuota estimada</div>
          </div>
        </div>

        <Button className="mt-4 w-full bg-orange font-semibold text-orange-foreground hover:bg-orange/90">
          Solicitar pre-aprobación formal
          <ArrowRight className="size-4" />
        </Button>
        <p className="mt-2 text-center text-[10px] text-muted-foreground">
          Sujeto a validación final de Banco Popular.
        </p>
      </section>
    </div>
  )
}
