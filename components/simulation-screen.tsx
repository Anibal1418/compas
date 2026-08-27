"use client"

import { useMemo, useState } from "react"
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  CircleDollarSign,
  Gauge,
  Lightbulb,
  MapPin,
} from "lucide-react"

import {
  financingData,
  locations,
  scenarios,
  type RiskLevel,
  type ScenarioId,
} from "@/lib/demo-data"
import { cn } from "@/lib/utils"

type SimulationScreenProps = {
  onFinancing?: () => void
}

const scenarioOrder: ScenarioId[] = [
  "base",
  "sales-down-20",
  "rent-up-15",
  "sales-up-15",
  "additional-employee",
]

const riskStyles: Record<RiskLevel, { badge: string; bar: string; chart: string }> = {
  Bajo: {
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
    bar: "bg-emerald-500",
    chart: "#13a675",
  },
  Moderado: {
    badge: "bg-amber-50 text-amber-700 ring-amber-600/15",
    bar: "bg-amber-500",
    chart: "#e99a16",
  },
  Alto: {
    badge: "bg-red-50 text-red-700 ring-red-600/15",
    bar: "bg-red-500",
    chart: "#df4d4d",
  },
}

const currency = new Intl.NumberFormat("es-DO", {
  style: "currency",
  currency: "DOP",
  maximumFractionDigits: 0,
})

const recommendedLocation = locations.find((location) => location.id === "los-prados")

export function SimulationScreen({ onFinancing }: SimulationScreenProps) {
  const [activeId, setActiveId] = useState<ScenarioId>("base")

  const orderedScenarios = useMemo(
    () =>
      scenarioOrder
        .map((id) => scenarios.find((scenario) => scenario.id === id))
        .filter((scenario): scenario is (typeof scenarios)[number] => Boolean(scenario)),
    [],
  )
  const active =
    orderedScenarios.find((scenario) => scenario.id === activeId) ??
    orderedScenarios[0]

  if (!active) return null

  const tone = riskStyles[active.risk]

  return (
    <div className="min-h-full bg-[#f4f7fb] pb-8 text-[#092957]">
      <header className="rounded-b-[2rem] bg-gradient-to-br from-[#073c82] via-[#07529a] to-[#0788b9] px-5 pb-8 pt-[max(1.5rem,env(safe-area-inset-top))] text-white shadow-[0_16px_40px_rgba(3,51,115,0.2)]">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/14 ring-1 ring-white/20">
            <Gauge aria-hidden="true" className="size-5" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100">
              Prueba tu decisión
            </p>
            <h1 className="text-[1.65rem] font-bold leading-tight">Simular apertura</h1>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-white/11 p-4 ring-1 ring-white/18">
          <div className="flex items-center gap-2 text-sm font-bold">
            <MapPin className="size-4 text-[#ffc15b]" />
            Nueva barbería en Los Prados
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <p className="text-[11px] text-blue-100">Inversión estimada</p>
              <p className="mt-0.5 text-base font-bold">{currency.format(financingData.investment)}</p>
            </div>
            <div>
              <p className="text-[11px] text-blue-100">Financiamiento</p>
              <p className="mt-0.5 text-base font-bold">{currency.format(financingData.requestedAmount)}</p>
            </div>
            <div>
              <p className="text-[11px] text-blue-100">Cuota estimada</p>
              <p className="mt-0.5 text-base font-bold">{currency.format(financingData.estimatedPayment)}</p>
            </div>
            <div>
              <p className="text-[11px] text-blue-100">Alquiler mensual</p>
              <p className="mt-0.5 text-base font-bold">{currency.format(recommendedLocation?.rent ?? 31_000)}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="space-y-5 px-4 pt-5">
        <fieldset>
          <legend className="px-1 text-lg font-bold text-[#082d63]">¿Qué podría cambiar?</legend>
          <p className="mt-1 px-1 text-xs leading-5 text-[#607891]">
            Elige un escenario para recalcular el flujo y la resiliencia.
          </p>

          <div className="mt-3 space-y-2.5" role="radiogroup">
            {orderedScenarios.map((scenario) => {
              const selected = scenario.id === activeId
              return (
                <button
                  key={scenario.id}
                  aria-checked={selected}
                  className={cn(
                    "flex min-h-14 w-full touch-manipulation items-center gap-3 rounded-2xl bg-white px-4 py-3 text-left shadow-[0_6px_20px_rgba(8,45,99,0.06)] ring-1 ring-[#dbe5f0] transition motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0b6bb8]/25",
                    selected && "bg-[#edf6ff] ring-2 ring-[#0b64ad]",
                  )}
                  onClick={() => setActiveId(scenario.id)}
                  role="radio"
                  type="button"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-[#9aafc3] bg-white",
                      selected && "border-[#0b64ad]",
                    )}
                  >
                    {selected && <span className="size-2.5 rounded-full bg-[#0b64ad]" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-[#12365f]">{scenario.label}</span>
                    <span className="mt-0.5 block text-xs leading-5 text-[#647d94]">
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
          className="overflow-hidden rounded-[1.6rem] bg-white shadow-[0_10px_30px_rgba(8,45,99,0.09)] ring-1 ring-[#dbe5f0]"
        >
          <div className="bg-[#082f68] p-5 text-white">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.13em] text-blue-200">
                  Resultado estimado
                </p>
                <h2 id="result-title" className="mt-1 text-xl font-bold">
                  {active.shortLabel}
                </h2>
              </div>
              <span className={cn("rounded-full px-3 py-1.5 text-xs font-bold ring-1", tone.badge)}>
                Riesgo {active.risk.toLowerCase()}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-[auto_1fr] items-center gap-4">
              <ScoreRing value={active.score} />
              <div>
                <p className="text-xs text-blue-200">Flujo mensual estimado</p>
                <p
                  className={cn(
                    "mt-1 text-2xl font-extrabold",
                    active.cashFlow < 0 ? "text-[#ff9e9e]" : "text-white",
                  )}
                >
                  {active.cashFlow > 0 ? "+" : ""}
                  {currency.format(active.cashFlow)}
                </p>
                <p className="mt-1 text-xs leading-5 text-blue-100">{active.status}</p>
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="size-4 text-[#0b5aa3]" />
                <h3 className="text-sm font-bold text-[#12365f]">Impacto en seis meses</h3>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-[#70859a]">
                Flujo mensual
              </span>
            </div>

            <ScenarioChart color={tone.chart} values={active.chart} />
            <p className="mt-2 text-sm leading-6 text-[#49657f]">{active.impact}</p>

            {active.recoveryMonths != null && (
              <div className="mt-4 flex min-h-11 items-center gap-3 rounded-xl border border-[#e0e8f1] px-3 py-2.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#edf4fb] text-[#0b5aa3]">
                  <CalendarClock className="size-4" />
                </span>
                <div>
                  <p className="text-[11px] font-medium text-[#70859a]">Recuperación estimada</p>
                  <p className="mt-0.5 text-sm font-bold text-[#12365f]">
                    {active.recoveryMonths} meses
                  </p>
                </div>
              </div>
            )}

            <div className="mt-4 rounded-2xl bg-[#fff7e9] p-4 ring-1 ring-[#f5dfb7]">
              <div className="flex gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#f39200] text-white">
                  <Lightbulb className="size-4" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#9a5700]">
                    Recomendación Compás
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-[#654b25]">{active.recommendation}</p>
                </div>
              </div>
            </div>

            <button
              className="mt-5 flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-xl bg-[#f39200] px-4 text-sm font-bold text-white shadow-[0_8px_20px_rgba(243,146,0,0.28)] transition active:translate-y-px motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#f39200]/35"
              onClick={onFinancing}
              type="button"
            >
              Ver financiamiento responsable
              <ArrowRight className="size-4" />
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

function ScoreRing({ value }: { value: number }) {
  return (
    <div
      aria-label={`Resiliencia ${value} de 100`}
      className="grid size-[86px] shrink-0 place-items-center rounded-full p-[7px]"
      role="img"
      style={{
        background: `conic-gradient(#56d5b0 ${value * 3.6}deg, rgba(255,255,255,.16) 0deg)`,
      }}
    >
      <div className="flex size-full flex-col items-center justify-center rounded-full bg-[#082f68]">
        <span className="text-2xl font-extrabold leading-none">{value}</span>
        <span className="mt-1 text-[9px] font-semibold uppercase tracking-wide text-blue-200">
          resiliencia
        </span>
      </div>
    </div>
  )
}

function ScenarioChart({ color, values }: { color: string; values: readonly number[] }) {
  const maxAbsolute = Math.max(...values.map((value) => Math.abs(value)), 1)
  const baseline = 88
  const step = 284 / Math.max(values.length, 1)
  const barWidth = Math.min(30, step - 8)

  return (
    <div className="mt-4 rounded-2xl bg-[#f6f8fb] px-2 py-3 ring-1 ring-[#e4eaf1]">
      <svg
        aria-label={`Proyección mensual: ${values.map((value) => currency.format(value)).join(", ")}`}
        className="h-36 w-full"
        preserveAspectRatio="none"
        role="img"
        viewBox="0 0 320 132"
      >
        <line stroke="#c9d4df" strokeDasharray="3 4" x1="18" x2="310" y1={baseline} y2={baseline} />
        <text fill="#8294a7" fontSize="8" x="2" y={baseline + 3}>
          0
        </text>
        {values.map((value, index) => {
          const height = (Math.abs(value) / maxAbsolute) * (value >= 0 ? 65 : 31)
          const x = 24 + index * step + (step - barWidth) / 2
          const y = value >= 0 ? baseline - height : baseline
          return (
            <g key={`${index}-${value}`}>
              <rect
                fill={value < 0 ? "#df4d4d" : color}
                height={Math.max(height, 2)}
                rx="5"
                width={barWidth}
                x={x}
                y={y}
              />
              <text
                fill="#637a91"
                fontSize="8"
                fontWeight="600"
                textAnchor="middle"
                x={x + barWidth / 2}
                y="126"
              >
                M{index + 1}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
