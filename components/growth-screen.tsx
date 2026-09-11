"use client"

import type { KeyboardEvent } from "react"
import {
  ArrowRight,
  Building2,
  Check,
  CircleDollarSign,
  Landmark,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Store,
  Users,
  WalletCards,
} from "lucide-react"

import {
  formatDop,
  fundingPlans,
  locations,
  type LocationId,
  type RiskLevel,
} from "@/lib/demo-data"
import { cn } from "@/lib/utils"
import { DecisionProgress } from "@/components/decision-progress"

type GrowthScreenProps = {
  selectedLocationId: LocationId
  onLocationChange: (locationId: LocationId) => void
  onSimulate: () => void
  onOpenAssistant?: () => void
}

const locationOrder: readonly LocationId[] = ["naco", "los-prados", "bella-vista"]
const orderedLocations = locationOrder
  .map((id) => locations.find((location) => location.id === id))
  .filter((location): location is (typeof locations)[number] => location !== undefined)

const riskStyles: Record<RiskLevel, { badge: string; dot: string }> = {
  Bajo: {
    badge: "bg-emerald-50 text-emerald-800 ring-emerald-700/20",
    dot: "bg-emerald-600",
  },
  Moderado: {
    badge: "bg-amber-50 text-amber-900 ring-amber-700/20",
    dot: "bg-amber-600",
  },
  Alto: {
    badge: "bg-red-50 text-red-800 ring-red-700/20",
    dot: "bg-red-600",
  },
}

export function GrowthScreen({
  selectedLocationId,
  onLocationChange,
  onSimulate,
  onOpenAssistant,
}: GrowthScreenProps) {
  const investmentPlan = fundingPlans.location
  const active = orderedLocations.find((location) => location.id === selectedLocationId)

  if (!active) return null

  function handleLocationKeyDown(
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
      nextIndex = (currentIndex + 1) % orderedLocations.length
    } else if (key === "ArrowUp" || key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + orderedLocations.length) % orderedLocations.length
    } else if (key === "Home") {
      nextIndex = 0
    } else if (key === "End") {
      nextIndex = orderedLocations.length - 1
    }

    const nextLocation = orderedLocations[nextIndex]
    onLocationChange(nextLocation.id)
    requestAnimationFrame(() => {
      group
        ?.querySelector<HTMLButtonElement>(`[data-location-option="${nextLocation.id}"]`)
        ?.focus()
    })
  }

  return (
    <div className="min-h-full bg-comerza-canvas pb-8 text-comerza-navy">
      <header className="comerza-header px-5 pb-7 pt-[max(1.5rem,env(safe-area-inset-top))]">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/45 ring-1 ring-comerza-navy/10">
            <MapPin aria-hidden="true" className="size-5" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-comerza-navy/65">
              Segunda barbería
            </p>
            <h1
              className="text-[1.65rem] font-bold leading-tight outline-none"
              data-screen-title
              id="growth-title"
              tabIndex={-1}
            >
              Oportunidades de crecimiento
            </h1>
          </div>
        </div>
        <p className="mt-4 max-w-sm text-sm leading-6 text-comerza-navy/75">
          Comparamos demanda, competencia, alquiler y el margen que dejaría cada zona para
          el plan de Ernesto.
        </p>
        <DecisionProgress className="mt-5 border-comerza-navy/10 bg-white/70" label="Oportunidad" step={4} />
      </header>

      <div className="space-y-5 px-4 pt-5">
        <section aria-labelledby="map-title">
          <div className="mb-3 flex items-end justify-between gap-3 px-1">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-comerza-muted">
                Santo Domingo
              </p>
              <h2 id="map-title" className="mt-0.5 text-lg font-bold text-comerza-navy">
                Mapa de oportunidad
              </h2>
            </div>
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-comerza-navy ring-1 ring-comerza-border">
              3 zonas
            </span>
          </div>

          <div
            aria-label="Selecciona una zona en el mapa"
            className="relative h-[300px] overflow-hidden rounded-xl bg-[#e8e9e7] shadow-[0_4px_14px_rgba(0,46,109,0.08)] ring-1 ring-comerza-border"
            role="radiogroup"
          >
            <svg
              aria-label="Mapa esquemático de Naco, Los Prados y Bella Vista"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
              role="img"
              viewBox="0 0 360 300"
            >
              <defs>
                <linearGradient id="growth-map-water" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#dceff5" />
                  <stop offset="1" stopColor="#c5e2eb" />
                </linearGradient>
                <radialGradient id="growth-map-opportunity" cx="50%" cy="50%" r="50%">
                  <stop offset="0" stopColor="#66c8a6" stopOpacity=".42" />
                  <stop offset="1" stopColor="#66c8a6" stopOpacity="0" />
                </radialGradient>
                <pattern id="growth-small-streets" height="30" patternUnits="userSpaceOnUse" width="36">
                  <path d="M 36 0 L 0 0 0 30" fill="none" stroke="#cbd7e3" strokeWidth="1" />
                </pattern>
              </defs>
              <rect fill="#edf2f7" height="300" width="360" />
              <rect fill="url(#growth-small-streets)" height="300" width="360" />
              <path d="M-10 248 C90 218 178 270 370 212 L370 310 L-10 310Z" fill="url(#growth-map-water)" />
              <circle cx="188" cy="138" fill="url(#growth-map-opportunity)" r="104" />
              <g fill="none" stroke="#fff" strokeLinecap="round">
                <path d="M-12 74 C86 112 196 64 372 104" strokeWidth="12" />
                <path d="M82 -12 C112 76 90 172 124 312" strokeWidth="11" />
                <path d="M264 -12 C222 82 288 174 232 312" strokeWidth="9" />
                <path d="M-10 192 C92 166 192 218 370 162" strokeWidth="8" />
              </g>
              <g fill="none" stroke="#8da5bb" strokeDasharray="2 5" strokeLinecap="round" strokeWidth="1.5">
                <path d="M-12 74 C86 112 196 64 372 104" />
                <path d="M82 -12 C112 76 90 172 124 312" />
                <path d="M264 -12 C222 82 288 174 232 312" />
                <path d="M-10 192 C92 166 192 218 370 162" />
              </g>
              <text fill="#5d7389" fontSize="12" fontWeight="600" x="12" y="288">
                Av. 27 de Febrero
              </text>
            </svg>

            {orderedLocations.map((location, index) => {
              const selected = selectedLocationId === location.id
              return (
                <button
                  key={location.id}
                  aria-checked={selected}
                  aria-label={`${location.name}, compatibilidad ${location.compatibility}, ${location.score} de 100${location.recommended ? ", recomendada" : ""}`}
                  className="comerza-focus group absolute z-10 flex min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full outline-none"
                  data-location-option={location.id}
                  onClick={() => onLocationChange(location.id)}
                  onKeyDown={(event) => handleLocationKeyDown(event, index)}
                  role="radio"
                  style={{ left: `${location.mapX}%`, top: `${location.mapY}%` }}
                  tabIndex={selected ? 0 : -1}
                  type="button"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute size-9 rounded-full bg-comerza-navy/15 transition-transform motion-reduce:transition-none",
                      selected && "scale-125 bg-comerza-cyan/25",
                    )}
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative flex size-8 items-center justify-center rounded-full border-[3px] border-white bg-comerza-navy text-white shadow-md transition-transform motion-reduce:transition-none",
                      selected && "scale-110 bg-comerza-cyan text-comerza-navy",
                    )}
                  >
                    <MapPin className="size-4" strokeWidth={2.5} />
                  </span>
                  <span
                    className={cn(
                      "absolute left-1/2 top-[2.7rem] -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2 py-1 text-xs font-bold text-comerza-navy shadow-sm ring-1 ring-comerza-border",
                      !selected && "sr-only",
                    )}
                  >
                    {location.name}
                  </span>
                </button>
              )
            })}

            <div className="absolute bottom-3 right-3 rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold text-comerza-muted shadow-sm backdrop-blur-sm">
              <span className="mr-1.5 inline-block size-2 rounded-full bg-comerza-cyan" />
              Mayor oportunidad
            </div>
          </div>
        </section>

        <section aria-labelledby="zones-title">
          <div className="mb-3 flex items-center justify-between gap-3 px-1">
            <h2 id="zones-title" className="text-lg font-bold text-comerza-navy">
              Compara las zonas
            </h2>
            <span className="text-xs text-comerza-muted">Usa toque o flechas</span>
          </div>
          <div aria-label="Selecciona una zona para comparar" className="space-y-3" role="radiogroup">
            {orderedLocations.map((location, index) => {
              const selected = selectedLocationId === location.id
              const tone = riskStyles[location.risk]

              return (
                <button
                  key={location.id}
                  aria-checked={selected}
                  className={cn(
                    "comerza-focus min-h-11 w-full touch-manipulation rounded-xl bg-white p-4 text-left shadow-[0_3px_12px_rgba(0,46,109,0.06)] ring-1 ring-comerza-border transition motion-reduce:transition-none focus-visible:outline-none",
                    selected && "bg-comerza-cyan-soft ring-2 ring-comerza-cyan",
                  )}
                  data-location-option={location.id}
                  onClick={() => onLocationChange(location.id)}
                  onKeyDown={(event) => handleLocationKeyDown(event, index)}
                  role="radio"
                  tabIndex={selected ? 0 : -1}
                  type="button"
                >
                  <span className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-comerza-canvas text-comerza-navy",
                        selected && "bg-comerza-cyan text-comerza-navy",
                      )}
                    >
                      <Building2 className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-comerza-navy">{location.name}</span>
                        {location.recommended && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-comerza-orange-soft px-2 py-1 text-xs font-bold text-[#824900]">
                            <Check aria-hidden="true" className="size-3" /> Recomendada
                          </span>
                        )}
                      </span>
                      <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-comerza-muted">
                        <span>{formatDop(location.rent)}/mes</span>
                        <span className={cn("inline-flex items-center gap-1.5", tone.badge)}>
                          <span aria-hidden="true" className={cn("size-1.5 rounded-full", tone.dot)} />
                          Riesgo {location.risk.toLowerCase()}
                        </span>
                      </span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block text-xl font-extrabold text-comerza-navy">{location.score}</span>
                      <span className="block text-xs font-medium text-comerza-muted">de 100</span>
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        <section
          aria-live="polite"
          className="comerza-card overflow-hidden"
        >
          <div className="bg-comerza-navy px-5 py-5 text-white">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.13em] text-comerza-cyan">
                  Oportunidad seleccionada
                </p>
                <h2 className="mt-1 text-xl font-bold">{active.name}</h2>
                <p className="mt-1 text-sm text-white/75">
                  Compatibilidad financiera {active.compatibility.toLowerCase()}
                </p>
              </div>
              <div
                aria-label={`Puntuación ${active.score} de 100`}
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={active.score}
                className="flex size-16 shrink-0 flex-col items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20"
                role="progressbar"
              >
                <span className="text-2xl font-extrabold">{active.score}</span>
                <span className="text-xs text-white/70">de 100</span>
              </div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-comerza-cyan transition-[width] duration-500 motion-reduce:transition-none"
                style={{ width: `${active.score}%` }}
              />
            </div>
          </div>

          <div className="p-5">
            <p className="text-sm leading-6 text-comerza-muted">{active.summary}</p>

            <dl className="mt-5 space-y-3">
              <DetailRow icon={Store} label="Alquiler mensual" value={formatDop(active.rent)} />
              <DetailRow icon={Users} label="Demanda estimada" value={active.demand} />
              <DetailRow icon={Building2} label="Competencia" value={active.competition} />
              <DetailRow icon={ShieldCheck} label="Nivel de riesgo" value={active.risk} />
            </dl>

            <div className="mt-5 rounded-xl bg-comerza-cyan-soft p-4 ring-1 ring-comerza-cyan/30">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-comerza-cyan-dark">
                Lectura financiera
              </p>
              <p className="mt-2 text-sm leading-6 text-comerza-muted">
                {active.financialExplanation}
              </p>
            </div>

            <div className="mt-4 rounded-xl bg-comerza-canvas p-4 ring-1 ring-comerza-border">
              <div className="flex items-center gap-2">
                <Landmark aria-hidden="true" className="size-4 text-comerza-navy" />
                <h3 className="text-sm font-bold text-comerza-navy">Plan de inversión</h3>
              </div>
              <dl className="mt-3 divide-y divide-comerza-border">
                <PlanRow icon={CircleDollarSign} label="Inversión estimada" value={formatDop(investmentPlan.totalInvestment)} />
                <PlanRow icon={WalletCards} label="Aporte propio previsto" value={formatDop(investmentPlan.ownContribution)} />
                <PlanRow icon={Landmark} label="Financiamiento a evaluar" value={formatDop(investmentPlan.financingAmount)} />
              </dl>
              <p className="mt-3 text-xs leading-5 text-comerza-muted">
                El aporte es capital previsto para el plan; no se descuenta de la reserva actual.
              </p>
            </div>

            <button
              className="comerza-primary-action comerza-focus mt-5 flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition active:translate-y-px motion-reduce:transition-none focus-visible:outline-none"
              onClick={onSimulate}
              type="button"
            >
              Probar financiamiento en {active.name}
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>

            {onOpenAssistant && (
              <button
                className="comerza-focus mt-2 flex min-h-11 w-full touch-manipulation items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold text-comerza-navy focus-visible:outline-none"
                onClick={onOpenAssistant}
                type="button"
              >
                <MessageCircle aria-hidden="true" className="size-4" />
                Preguntar a Compás
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

function DetailRow({ icon: Icon, label, value }: { icon: typeof Store; label: string; value: string }) {
  return (
    <div className="flex min-h-11 items-center gap-3 rounded-xl border border-comerza-border px-3 py-2.5">
      <dt className="flex min-w-0 flex-1 items-center gap-3 text-xs font-medium text-comerza-muted">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-comerza-cyan-soft text-comerza-cyan-dark">
          <Icon aria-hidden="true" className="size-4" />
        </span>
        <span>{label}</span>
      </dt>
      <dd className="text-right text-sm font-bold text-comerza-navy">{value}</dd>
    </div>
  )
}

function PlanRow({ icon: Icon, label, value }: { icon: typeof CircleDollarSign; label: string; value: string }) {
  return (
    <div className="flex min-h-12 items-center gap-3 py-2.5 first:pt-0 last:pb-0">
      <dt className="flex flex-1 items-center gap-3 text-xs font-medium text-comerza-muted">
        <Icon aria-hidden="true" className="size-4 shrink-0 text-comerza-navy" />
        <span>{label}</span>
      </dt>
      <dd className="text-sm font-bold text-comerza-navy">{value}</dd>
    </div>
  )
}
