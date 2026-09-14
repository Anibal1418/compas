"use client"

import type { KeyboardEvent } from "react"
import {
  ArrowRight,
  Building2,
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
import { ScreenHeader } from "@/components/screen-header"

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
      <ScreenHeader title="Oportunidades de crecimiento" />

      <div className="space-y-5 px-4 pt-5">
        <DecisionProgress label="Oportunidad" step={4} />

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
                <radialGradient id="growth-map-zone" cx="50%" cy="50%" r="50%">
                  <stop offset="0" stopColor="#18aebb" stopOpacity=".16" />
                  <stop offset="1" stopColor="#18aebb" stopOpacity="0" />
                </radialGradient>
                <pattern id="growth-small-streets" height="24" patternUnits="userSpaceOnUse" width="30">
                  <path d="M 30 0 L 0 0 0 24" fill="none" stroke="#cbd7e3" strokeWidth=".9" />
                </pattern>
              </defs>
              <rect fill="#edf2f7" height="300" width="360" />
              <rect fill="url(#growth-small-streets)" height="300" width="360" />
              <path d="M-10 276 C78 258 160 292 238 270 C292 254 330 247 370 236 L370 310 L-10 310Z" fill="url(#growth-map-water)" />
              <ellipse cx="76" cy="90" fill="url(#growth-map-zone)" rx="76" ry="62" />
              <ellipse cx="252" cy="66" fill="url(#growth-map-zone)" rx="76" ry="58" />
              <ellipse cx="173" cy="222" fill="url(#growth-map-zone)" rx="92" ry="66" />
              <path d="M302 -10 L370 -10 L370 58 C344 50 323 35 302 -10Z" fill="#d9eadc" />
              <path d="M120 176 L157 168 L174 197 L136 207Z" fill="#dcebdd" />
              <g fill="none" stroke="#fff" strokeLinecap="round">
                <path d="M-12 126 C72 116 145 137 218 121 C278 108 329 111 372 120" strokeWidth="11" />
                <path d="M-18 214 C68 195 126 181 194 154 C254 130 312 98 378 82" strokeWidth="12" />
                <path d="M105 -12 C91 65 102 137 128 190 C144 222 148 263 154 312" strokeWidth="10" />
                <path d="M286 -12 C270 57 273 112 287 166 C299 213 281 264 269 312" strokeWidth="9" />
                <path d="M-10 58 C68 72 151 61 218 51 C281 42 324 51 372 67" strokeWidth="7" />
              </g>
              <g fill="none" stroke="#8da5bb" strokeDasharray="2 5" strokeLinecap="round" strokeWidth="1.5">
                <path d="M-12 126 C72 116 145 137 218 121 C278 108 329 111 372 120" />
                <path d="M-18 214 C68 195 126 181 194 154 C254 130 312 98 378 82" />
                <path d="M105 -12 C91 65 102 137 128 190 C144 222 148 263 154 312" />
                <path d="M286 -12 C270 57 273 112 287 166 C299 213 281 264 269 312" />
                <path d="M-10 58 C68 72 151 61 218 51 C281 42 324 51 372 67" />
              </g>
            </svg>

            {orderedLocations.map((location, index) => {
              const selected = selectedLocationId === location.id
              return (
                <button
                  key={location.id}
                  aria-checked={selected}
                  aria-label={`${location.name}, compatibilidad ${location.compatibility}, ${location.score} de 100`}
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
                      "absolute size-9 rounded-full bg-comerza-cyan/15 transition-transform motion-reduce:transition-none",
                      selected && "scale-125 bg-comerza-cyan/25",
                    )}
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative flex size-8 items-center justify-center rounded-full bg-white text-comerza-cyan shadow-md transition-transform motion-reduce:transition-none",
                      selected && "scale-110",
                    )}
                  >
                    <MapPin className="size-4" strokeWidth={2.5} />
                  </span>
                  <span
                    className={cn(
                      "absolute left-1/2 top-[2.7rem] -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2 py-1 text-xs font-bold text-comerza-navy shadow-sm ring-1 ring-comerza-border",
                      selected && "ring-2 ring-comerza-cyan",
                    )}
                  >
                    {location.name}
                  </span>
                </button>
              )
            })}

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
                    selected && "bg-white ring-2 ring-comerza-cyan",
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
                        "comerza-icon-action mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg",
                      )}
                    >
                      <Building2 className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-comerza-navy">{location.name}</span>
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
          <div className="border-b border-comerza-border bg-white px-5 py-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.13em] text-comerza-navy">
                  Oportunidad seleccionada
                </p>
                <h2 className="mt-1 text-xl font-bold text-comerza-navy">{active.name}</h2>
                <p className="mt-1 text-sm text-comerza-muted">
                  Compatibilidad financiera {active.compatibility.toLowerCase()}
                </p>
              </div>
              <div
                aria-label={`Puntuación ${active.score} de 100`}
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={active.score}
                className="flex size-16 shrink-0 flex-col items-center justify-center rounded-xl bg-white ring-1 ring-comerza-border"
                role="progressbar"
              >
                <span className="text-2xl font-extrabold text-comerza-navy">{active.score}</span>
                <span className="text-xs text-comerza-muted">de 100</span>
              </div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-comerza-canvas">
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

            <div className="mt-5 rounded-xl border border-comerza-border bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-comerza-cyan-dark">
                Lectura financiera
              </p>
              <p className="mt-2 text-sm leading-6 text-comerza-muted">
                {active.financialExplanation}
              </p>
            </div>

            <div className="mt-4 rounded-xl border border-comerza-border bg-white p-4">
              <div className="flex items-center gap-2">
                <Landmark aria-hidden="true" className="size-4 text-comerza-orange" />
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
              className="comerza-primary-action comerza-focus mt-5 flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold transition active:translate-y-px motion-reduce:transition-none focus-visible:outline-none"
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
                <MessageCircle aria-hidden="true" className="size-4 text-comerza-cyan" />
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
        <span className="comerza-icon-display flex size-9 shrink-0 items-center justify-center rounded-lg">
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
        <Icon aria-hidden="true" className="size-4 shrink-0 text-comerza-orange" />
        <span>{label}</span>
      </dt>
      <dd className="text-sm font-bold text-comerza-navy">{value}</dd>
    </div>
  )
}
