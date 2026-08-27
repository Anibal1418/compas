"use client"

import { AlertTriangle, ShieldCheck } from "lucide-react"

export function ImpactBanner() {
  return (
    <section className="grid gap-3 rounded-xl border border-border bg-card p-4 shadow-sm md:grid-cols-[1fr_auto_1fr] md:items-stretch">
      {/* Without */}
      <div className="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
          <AlertTriangle className="size-5" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-destructive">Sin COMPÁS</h3>
          <p className="text-sm leading-relaxed text-foreground">
            Riesgo alto de quiebra en 12 meses por sobreendeudamiento y expansión mal ubicada.
          </p>
        </div>
      </div>

      <div className="hidden items-center justify-center md:flex">
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
          vs
        </span>
      </div>

      {/* With */}
      <div className="flex items-start gap-3 rounded-lg border border-[#3fa796]/25 bg-[#3fa796]/5 p-4">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#3fa796]/10 text-[#2e7d70]">
          <ShieldCheck className="size-5" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[#2e7d70]">Con COMPÁS</h3>
          <p className="text-sm leading-relaxed text-foreground">
            Crecimiento sostenible protegido, con inversión ajustada al flujo de caja real del negocio.
          </p>
        </div>
      </div>
    </section>
  )
}
