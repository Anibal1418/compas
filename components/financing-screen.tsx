"use client"

import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  RefreshCw,
  ShieldCheck,
} from "lucide-react"

import { DecisionProgress } from "@/components/decision-progress"
import { ScreenHeader } from "@/components/screen-header"
import {
  calculateScenarioResult,
  financialReadiness,
  formatDop,
  fundingMatches,
  fundingPlans,
  locations,
  type FundingNeedId,
  type LocationId,
  type ScenarioId,
} from "@/lib/demo-data"

type FinancingScreenProps = {
  needId: FundingNeedId
  locationId: LocationId
  scenarioId: ScenarioId
  showAvanceAlternative: boolean
  onBack: () => void
  onContinue: () => void
}

export function FinancingScreen({
  needId,
  locationId,
  scenarioId,
  showAvanceAlternative,
  onBack,
  onContinue,
}: FinancingScreenProps) {
  const match = fundingMatches.find((item) => item.needId === needId)!
  const plan = fundingPlans[needId]
  const location = locations.find((item) => item.id === locationId)!
  const result = calculateScenarioResult(needId, scenarioId, locationId)
  const alternative = needId === "working-capital" && showAvanceAlternative
    ? match.alternative
    : undefined
  const caseDetail = needId === "location"
    ? `${location.name} · ${result.label}`
    : `${plan.shortTitle} · ${result.label}`

  return (
    <div className="min-h-full bg-comerza-canvas pb-10 text-comerza-navy">
      <ScreenHeader
        eyebrow="Producto recomendado"
        title="Financiamiento para tu plan"
        subtitle="Compás conecta tu necesidad con el producto que mejor se ajusta a tu plan."
        onBack={onBack}
      />

      <div className="space-y-5 px-4 pt-5">
        <DecisionProgress step={6} label="Recomendar" />

        <section aria-live="polite" className="comerza-card overflow-hidden">
          <div className="border-b border-comerza-cyan/25 bg-comerza-cyan-soft px-5 py-3.5 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-comerza-cyan-dark">
              <BadgeCheck aria-hidden="true" className="size-4" />
              Recomendación para tu plan
            </span>
          </div>

          <div className="p-5">
            <span className="flex size-12 items-center justify-center rounded-xl bg-comerza-cyan-soft text-comerza-cyan-dark">
              <BriefcaseBusiness aria-hidden="true" className="size-6" />
            </span>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-comerza-muted">
              Producto recomendado
            </p>
            <h2 className="mt-1 text-2xl font-extrabold leading-tight text-comerza-navy">
              {match.product.name}
            </h2>
            <p className="mt-3 text-sm leading-6 text-comerza-muted">{match.explanation}</p>
            <p className="mt-2 text-xs leading-5 text-comerza-muted">{match.product.fit}</p>

            <div className="mt-5 rounded-xl border border-comerza-navy bg-comerza-navy p-4 text-white">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-white/70">Monto a evaluar</p>
                  <p className="mt-1 text-xl font-extrabold text-white">
                    {formatDop(plan.financingAmount)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-white/70">{plan.monthlyCommitmentLabel}</p>
                  <p className="mt-1 text-lg font-extrabold text-comerza-cyan">
                    {plan.monthlyCommitment > 0 ? formatDop(plan.monthlyCommitment) : "No estimada"}
                  </p>
                </div>
              </div>
              <p className="mt-3 border-t border-white/20 pt-3 text-xs leading-5 text-white/75">
                {caseDetail} · {formatDop(result.monthlyFlow)} de margen estimado.
              </p>
            </div>

            {alternative ? (
              <div className="mt-4 rounded-xl border border-comerza-border bg-comerza-canvas p-4">
                <div className="flex items-start gap-3">
                  <RefreshCw aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-comerza-cyan-dark" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-comerza-muted">
                      Alternativa contextual
                    </p>
                    <h3 className="mt-1 text-base font-bold text-comerza-navy">
                      {alternative.product.name}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-comerza-muted">
                      {alternative.explanation}
                    </p>
                    <p className="mt-2 text-xs font-semibold leading-5 text-[#76500f]">
                      {alternative.validationNote}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section className="rounded-xl border border-comerza-cyan/35 bg-comerza-cyan-soft p-4">
          <div className="flex gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-comerza-cyan text-comerza-navy">
              <ShieldCheck aria-hidden="true" className="size-5" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-comerza-navy">Tu plan muestra capacidad favorable</h2>
              <p className="mt-1.5 text-xs leading-5 text-comerza-muted">
                El escenario conserva flujo positivo y se mantiene dentro de la capacidad observada. {financialReadiness.disclaimer}
              </p>
            </div>
          </div>
        </section>

        <div>
          <button
            className="comerza-primary-action comerza-focus flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold"
            onClick={onContinue}
            type="button"
          >
            Preparar resumen para evaluación
            <ArrowRight aria-hidden="true" className="size-4" />
          </button>
          <p className="mt-3 px-2 text-center text-xs leading-5 text-comerza-muted">
            Sujeto a evaluación y aprobación de Banco Popular.
          </p>
        </div>
      </div>
    </div>
  )
}
