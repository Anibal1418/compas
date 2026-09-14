"use client"

import type { KeyboardEvent } from "react"
import {
  ArrowRight,
  BarChart3,
  Lightbulb,
  MapPin,
  MessageCircle,
  PackageOpen,
  ReceiptText,
  ShieldAlert,
  WalletCards,
} from "lucide-react"

import {
  calculateScenarioResult,
  formatDop,
  fundingPlans,
  getScenarioDefinitions,
  locations,
  type FundingNeedId,
  type LocationId,
  type RiskLevel,
  type ScenarioId,
} from "@/lib/demo-data"
import { cn } from "@/lib/utils"
import { DecisionProgress } from "@/components/decision-progress"
import { ScreenHeader } from "@/components/screen-header"

type SimulationScreenProps = {
  selectedNeedId: FundingNeedId
  selectedLocationId: LocationId
  selectedScenarioId: ScenarioId
  onScenarioChange: (scenarioId: ScenarioId) => void
  onBack: () => void
  onRecommendation: () => void
  onOpenAssistant?: () => void
}

const riskStyles: Record<RiskLevel, { badge: string; chart: string }> = {
  Bajo: {
    badge: "bg-emerald-100 text-emerald-900 ring-emerald-300",
    chart: "#00aeb6",
  },
  Moderado: {
    badge: "bg-amber-100 text-amber-950 ring-amber-300",
    chart: "#d98a0b",
  },
  Alto: {
    badge: "bg-red-100 text-red-900 ring-red-300",
    chart: "#d63f48",
  },
}

export function SimulationScreen({
  selectedNeedId,
  selectedLocationId,
  selectedScenarioId,
  onScenarioChange,
  onBack,
  onRecommendation,
  onOpenAssistant,
}: SimulationScreenProps) {
  const plan = fundingPlans[selectedNeedId]
  const location = selectedNeedId === "location"
    ? locations.find((item) => item.id === selectedLocationId)
    : undefined
  const orderedScenarios = getScenarioDefinitions(selectedNeedId)
  const activeScenario = orderedScenarios.find((scenario) => scenario.id === selectedScenarioId)

  if (!activeScenario || selectedNeedId === "location" && !location) return null

  const result = calculateScenarioResult(selectedNeedId, selectedScenarioId, selectedLocationId)
  const tone = riskStyles[result.risk]
  const NeedIcon = selectedNeedId === "location"
    ? MapPin
    : selectedNeedId === "equipment"
      ? PackageOpen
      : selectedNeedId === "working-capital"
        ? WalletCards
        : ReceiptText

  function handleScenarioKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) {
    const key = event.key
    if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"].includes(key)) {
      return
    }

    event.preventDefault()
    const group = event.currentTarget.closest('[role="radiogroup"]')
    let nextIndex = currentIndex

    if (key === "ArrowDown" || key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % orderedScenarios.length
    } else if (key === "ArrowUp" || key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + orderedScenarios.length) % orderedScenarios.length
    } else if (key === "Home") {
      nextIndex = 0
    } else if (key === "End") {
      nextIndex = orderedScenarios.length - 1
    }

    const nextScenario = orderedScenarios[nextIndex]
    onScenarioChange(nextScenario.id)
    requestAnimationFrame(() => {
      group
        ?.querySelector<HTMLButtonElement>(`[data-scenario-option="${nextScenario.id}"]`)
        ?.focus()
    })
  }

  return (
    <div className="min-h-full bg-comerza-canvas pb-8 text-comerza-navy">
      <ScreenHeader title="Prueba tu financiamiento" onBack={onBack} />

      <div className="space-y-5 px-4 pt-5">
        <DecisionProgress label="Probar" step={5} />

        <section className="comerza-card p-4">
          <div className="flex items-center gap-2 text-sm font-bold">
            <NeedIcon aria-hidden="true" className="size-4 text-comerza-orange" />
            {selectedNeedId === "location" && location
              ? `Segunda barbería en ${location.name}`
              : plan.title}
          </div>
          <dl className="mt-3 space-y-2.5">
            <SummaryRow label={plan.totalLabel} value={formatDop(plan.totalInvestment)} />
            <SummaryRow label="Financiamiento a evaluar" value={formatDop(plan.financingAmount)} />
            <SummaryRow
              label={plan.monthlyCommitmentLabel}
              value={plan.monthlyCommitment > 0 ? formatDop(plan.monthlyCommitment) : "No estimada"}
            />
            {location ? <SummaryRow label="Alquiler mensual" value={formatDop(location.rent)} /> : null}
          </dl>
        </section>

        <fieldset>
          <legend className="px-1 text-lg font-bold text-comerza-navy">¿Qué podría cambiar?</legend>
          <p className="mt-1 px-1 text-xs leading-5 text-comerza-muted">
            Elige un escenario para recalcular el efecto del plan sobre la caja del negocio.
          </p>

          <div
            aria-label="Escenario para la prueba de financiamiento"
            className="mt-3 space-y-2.5"
            role="radiogroup"
          >
            {orderedScenarios.map((scenario, index) => {
              const selected = scenario.id === selectedScenarioId
              return (
                <button
                  key={scenario.id}
                  aria-checked={selected}
                  className={cn(
                    "comerza-focus flex min-h-14 w-full touch-manipulation items-center gap-3 rounded-xl bg-white px-4 py-3 text-left shadow-[0_3px_12px_rgba(0,46,109,0.06)] ring-1 ring-comerza-border transition motion-reduce:transition-none focus-visible:outline-none",
                    selected && "bg-white ring-2 ring-comerza-cyan",
                  )}
                  data-scenario-option={scenario.id}
                  onClick={() => onScenarioChange(scenario.id)}
                  onKeyDown={(event) => handleScenarioKeyDown(event, index)}
                  role="radio"
                  tabIndex={selected ? 0 : -1}
                  type="button"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-comerza-muted bg-white",
                      selected && "border-comerza-cyan",
                    )}
                  >
                    {selected && <span className="size-2.5 rounded-full bg-comerza-cyan" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-comerza-navy">{scenario.label}</span>
                    <span className="mt-0.5 block text-xs leading-5 text-comerza-muted">
                      {scenario.description}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </fieldset>

        <section
          aria-labelledby="result-title"
          aria-live="polite"
          className="comerza-card overflow-hidden"
        >
          <div className="border-b border-comerza-border bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 id="result-title" className="text-xl font-bold text-comerza-navy">
                  Resultado {activeScenario.shortLabel}
                </h2>
              </div>
              <span className={cn("rounded-full px-3 py-1.5 text-xs font-bold ring-1", tone.badge)}>
                Riesgo {result.risk.toLowerCase()}
              </span>
            </div>

            <div className="mt-5 flex items-center gap-4">
              <ScoreRing color={tone.chart} value={result.resilienceScore} />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-comerza-muted">{result.resultMetricLabel}</p>
                <p
                  className={cn(
                    "mt-1 break-words text-2xl font-extrabold",
                    result.monthlyFlow < 0 ? "text-[#b72f38]" : "text-comerza-navy",
                  )}
                >
                  {result.monthlyFlow > 0 ? "+" : ""}
                  {formatDop(result.monthlyFlow)}
                </p>
                <p className="mt-1 text-xs leading-5 text-comerza-muted">{result.status}</p>
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <BarChart3 aria-hidden="true" className="size-4 text-comerza-orange" />
                <h3 className="text-sm font-bold text-comerza-navy">Impacto en seis meses</h3>
              </div>
              <span className="text-xs font-semibold text-comerza-muted">{result.resultMetricLabel}</span>
            </div>

            <ScenarioChart color={tone.chart} values={result.chartValues} />
            <p className="mt-2 text-sm leading-6 text-comerza-muted">{result.impact}</p>

            <div
              className={cn(
                "mt-4 rounded-2xl p-4 ring-1",
                result.isSustainable
                  ? "border border-comerza-border bg-white ring-0"
                  : "comerza-warning-panel ring-0",
              )}
            >
              <div className="flex gap-3">
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-xl",
                    result.isSustainable
                      ? "comerza-icon-display"
                      : "bg-[#c8343d] text-white",
                  )}
                >
                  {result.isSustainable ? (
                    <Lightbulb aria-hidden="true" className="size-4" />
                  ) : (
                    <ShieldAlert aria-hidden="true" className="size-4" />
                  )}
                </span>
                <div>
                  <p
                    className={cn(
                      "text-xs font-bold uppercase tracking-[0.12em]",
                      result.isSustainable ? "text-comerza-navy" : "text-[#9d242c]",
                    )}
                  >
                    {result.isSustainable ? "Recomendación Compás" : "Conclusión protectora"}
                  </p>
                  <p
                    className={cn(
                      "mt-1.5 text-sm leading-6",
                      result.isSustainable ? "text-comerza-muted" : "text-[#76252b]",
                    )}
                  >
                    {result.recommendation}
                  </p>
                  {!result.isSustainable && (
                    <p className="mt-2 text-sm font-semibold leading-6 text-[#76252b]">
                      Con flujo negativo, Compás pausa el paso de solicitud para proteger la
                      operación actual.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {result.isSustainable ? (
              <button
                className="comerza-primary-action comerza-focus mt-5 flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold transition active:translate-y-px motion-reduce:transition-none focus-visible:outline-none"
                onClick={onRecommendation}
                type="button"
              >
                Ver recomendación de producto
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
            ) : (
              <button
                className="mt-5 flex min-h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-[#dce3ea] px-4 text-sm font-bold text-[#52677b]"
                disabled
                type="button"
              >
                <ShieldAlert aria-hidden="true" className="size-4" />
                Solicitud pausada en este escenario
              </button>
            )}

            {onOpenAssistant && (
              <button
                className="comerza-focus mt-2 flex min-h-11 w-full touch-manipulation items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold text-comerza-navy focus-visible:outline-none"
                onClick={onOpenAssistant}
                type="button"
              >
                <MessageCircle aria-hidden="true" className="size-4 text-comerza-cyan" />
                Consultar este escenario
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-h-7 items-center justify-between gap-3 text-xs">
      <dt>{label}</dt>
      <dd className="text-right font-bold">{value}</dd>
    </div>
  )
}

function ScoreRing({ color, value }: { color: string; value: number }) {
  return (
    <div
      aria-label={`Resiliencia ${value} de 100`}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={value}
      className="grid size-[86px] shrink-0 place-items-center rounded-full p-[7px]"
      role="progressbar"
      style={{ background: `conic-gradient(${color} ${value * 3.6}deg, #e3e5e7 0deg)` }}
    >
      <div className="flex size-full flex-col items-center justify-center rounded-full bg-white text-comerza-navy">
        <span className="text-2xl font-extrabold leading-none">{value}</span>
        <span className="mt-1 text-xs font-semibold text-comerza-muted">de 100</span>
      </div>
    </div>
  )
}

function ScenarioChart({ color, values }: { color: string; values: readonly number[] }) {
  const maxAbsolute = Math.max(...values.map((value) => Math.abs(value)), 1)
  const baseline = 86
  const step = 282 / Math.max(values.length, 1)
  const barWidth = Math.min(30, step - 8)

  return (
    <div className="mt-4 rounded-xl border border-comerza-border bg-white px-2 py-3">
      <svg
        aria-label={`Proyección mensual: ${values.map((value) => formatDop(value)).join(", ")}`}
        className="h-36 w-full"
        preserveAspectRatio="none"
        role="img"
        viewBox="0 0 320 132"
      >
        <line stroke="#a9afb7" strokeDasharray="3 4" x1="18" x2="310" y1={baseline} y2={baseline} />
        <text fill="#566477" fontSize="12" fontWeight="600" x="2" y={baseline - 4}>
          0
        </text>
        {values.map((value, index) => {
          const height = (Math.abs(value) / maxAbsolute) * (value >= 0 ? 62 : 30)
          const x = 24 + index * step + (step - barWidth) / 2
          const y = value >= 0 ? baseline - height : baseline
          return (
            <g key={`${index}-${value}`}>
              <rect
                fill={value < 0 ? "#d63f48" : color}
                height={Math.max(height, 2)}
                rx="5"
                width={barWidth}
                x={x}
                y={y}
              />
              <text fill="#566477" fontSize="12" fontWeight="600" textAnchor="middle" x={x + barWidth / 2} y="126">
                M{index + 1}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
