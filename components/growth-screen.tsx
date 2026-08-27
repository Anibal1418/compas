"use client"

import { useMemo, useState } from "react"
import {
  ArrowRight,
  Building2,
  Check,
  MapPin,
  ShieldCheck,
  Store,
  Users,
} from "lucide-react"

import { locations, type LocationId, type RiskLevel } from "@/lib/demo-data"
import { cn } from "@/lib/utils"

type GrowthScreenProps = {
  onSimulate?: () => void
}

const locationOrder: LocationId[] = ["naco", "los-prados", "bella-vista"]

const riskStyles: Record<RiskLevel, { badge: string; dot: string }> = {
  Bajo: {
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
    dot: "bg-emerald-500",
  },
  Moderado: {
    badge: "bg-amber-50 text-amber-700 ring-amber-600/15",
    dot: "bg-amber-500",
  },
  Alto: {
    badge: "bg-red-50 text-red-700 ring-red-600/15",
    dot: "bg-red-500",
  },
}

const currency = new Intl.NumberFormat("es-DO", {
  style: "currency",
  currency: "DOP",
  maximumFractionDigits: 0,
})

export function GrowthScreen({ onSimulate }: GrowthScreenProps) {
  const [activeId, setActiveId] = useState<LocationId>("los-prados")

  const orderedLocations = useMemo(
    () =>
      locationOrder
        .map((id) => locations.find((location) => location.id === id))
        .filter((location): location is (typeof locations)[number] => Boolean(location)),
    [],
  )
  const active =
    orderedLocations.find((location) => location.id === activeId) ??
    orderedLocations[0]

  if (!active) return null

  return (
    <div className="min-h-full bg-[#f4f7fb] pb-8 text-[#092957]">
      <header className="rounded-b-[2rem] bg-gradient-to-br from-[#073c82] via-[#07529a] to-[#0788b9] px-5 pb-8 pt-[max(1.5rem,env(safe-area-inset-top))] text-white shadow-[0_16px_40px_rgba(3,51,115,0.2)]">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/14 ring-1 ring-white/20">
            <MapPin aria-hidden="true" className="size-5" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100">
              Oportunidades
            </p>
            <h1 className="text-[1.65rem] font-bold leading-tight">Dónde crecer</h1>
          </div>
        </div>
        <p className="mt-4 max-w-sm text-sm leading-6 text-blue-50">
          Comparamos demanda, competencia y alquiler para encontrar la zona más
          saludable para la próxima barbería de Ernesto.
        </p>
      </header>

      <main className="space-y-5 px-4 pt-5">
        <section aria-labelledby="map-title">
          <div className="mb-3 flex items-end justify-between gap-3 px-1">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#53708f]">
                Santo Domingo
              </p>
              <h2 id="map-title" className="mt-0.5 text-lg font-bold text-[#082d63]">
                Mapa de oportunidad
              </h2>
            </div>
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#315575] shadow-sm ring-1 ring-[#dbe5f0]">
              3 zonas
            </span>
          </div>

          <div className="relative h-[300px] overflow-hidden rounded-[1.6rem] bg-[#e8eef5] shadow-[0_10px_28px_rgba(8,45,99,0.1)] ring-1 ring-[#d6e1ec]">
            <svg
              aria-label="Mapa esquemático de Naco, Los Prados y Bella Vista"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
              role="img"
              viewBox="0 0 360 300"
            >
              <defs>
                <linearGradient id="map-water" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#dceff5" />
                  <stop offset="1" stopColor="#c5e2eb" />
                </linearGradient>
                <radialGradient id="map-opportunity" cx="50%" cy="50%" r="50%">
                  <stop offset="0" stopColor="#66c8a6" stopOpacity=".42" />
                  <stop offset="1" stopColor="#66c8a6" stopOpacity="0" />
                </radialGradient>
                <pattern id="small-streets" height="30" patternUnits="userSpaceOnUse" width="36">
                  <path d="M 36 0 L 0 0 0 30" fill="none" stroke="#cbd7e3" strokeWidth="1" />
                </pattern>
              </defs>
              <rect fill="#edf2f7" height="300" width="360" />
              <rect fill="url(#small-streets)" height="300" width="360" />
              <path d="M-10 248 C90 218 178 270 370 212 L370 310 L-10 310Z" fill="url(#map-water)" />
              <circle cx="188" cy="138" fill="url(#map-opportunity)" r="104" />
              <g fill="none" stroke="#fff" strokeLinecap="round">
                <path d="M-12 74 C86 112 196 64 372 104" strokeWidth="12" />
                <path d="M82 -12 C112 76 90 172 124 312" strokeWidth="11" />
                <path d="M264 -12 C222 82 288 174 232 312" strokeWidth="9" />
                <path d="M-10 192 C92 166 192 218 370 162" strokeWidth="8" />
              </g>
              <g fill="none" stroke="#9fb2c5" strokeDasharray="2 5" strokeLinecap="round" strokeWidth="1.5">
                <path d="M-12 74 C86 112 196 64 372 104" />
                <path d="M82 -12 C112 76 90 172 124 312" />
                <path d="M264 -12 C222 82 288 174 232 312" />
                <path d="M-10 192 C92 166 192 218 370 162" />
              </g>
              <text fill="#8a9db0" fontSize="10" fontWeight="600" x="12" y="288">
                Av. 27 de Febrero
              </text>
            </svg>

            {orderedLocations.map((location) => {
              const selected = activeId === location.id
              return (
                <button
                  key={location.id}
                  aria-label={`${location.name}, score ${location.score} de 100${location.recommended ? ", recomendada" : ""}`}
                  aria-pressed={selected}
                  className="group absolute z-10 flex min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full outline-none focus-visible:ring-4 focus-visible:ring-[#f59b23]/40"
                  onClick={() => setActiveId(location.id)}
                  style={{ left: `${location.x}%`, top: `${location.y}%` }}
                  type="button"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute size-9 rounded-full bg-[#073c82]/15 transition-transform motion-reduce:transition-none",
                      selected && "scale-125 bg-[#f59b23]/20",
                    )}
                  />
                  <span
                    className={cn(
                      "relative flex size-8 items-center justify-center rounded-full border-[3px] border-white bg-[#0b5aa3] text-white shadow-lg transition-transform motion-reduce:transition-none",
                      selected && "scale-110 bg-[#f39200]",
                    )}
                  >
                    <MapPin className="size-4" strokeWidth={2.5} />
                  </span>
                  <span
                    className={cn(
                      "absolute left-1/2 top-[2.7rem] -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-2 py-1 text-[10px] font-bold text-[#082d63] shadow-md ring-1 ring-[#dbe5f0]",
                      !selected && "sr-only",
                    )}
                  >
                    {location.name}
                  </span>
                </button>
              )
            })}

            <div className="absolute bottom-3 right-3 rounded-xl bg-white/92 px-3 py-2 text-[10px] font-semibold text-[#53708f] shadow-sm backdrop-blur-sm">
              <span className="mr-1.5 inline-block size-2 rounded-full bg-emerald-500" />
              Mayor oportunidad
            </div>
          </div>
        </section>

        <section aria-labelledby="zones-title">
          <div className="mb-3 flex items-center justify-between px-1">
            <h2 id="zones-title" className="text-lg font-bold text-[#082d63]">
              Compara las zonas
            </h2>
            <span className="text-xs text-[#607891]">Toca para explorar</span>
          </div>
          <div className="space-y-3">
            {orderedLocations.map((location) => {
              const selected = activeId === location.id
              const tone = riskStyles[location.risk]

              return (
                <button
                  key={location.id}
                  aria-pressed={selected}
                  className={cn(
                    "min-h-11 w-full touch-manipulation rounded-2xl bg-white p-4 text-left shadow-[0_7px_22px_rgba(8,45,99,0.07)] ring-1 ring-[#dbe5f0] transition motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0b6bb8]/25",
                    selected && "ring-2 ring-[#0b64ad]",
                  )}
                  onClick={() => setActiveId(location.id)}
                  type="button"
                >
                  <span className="flex items-start gap-3">
                    <span
                      className={cn(
                        "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf2fb] text-[#0b5aa3]",
                        selected && "bg-[#0b5aa3] text-white",
                      )}
                    >
                      <Building2 className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-[#082d63]">{location.name}</span>
                        {location.recommended && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#fff4df] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#9a5700]">
                            <Check className="size-3" /> Recomendada
                          </span>
                        )}
                      </span>
                      <span className="mt-2 flex items-center gap-3 text-xs text-[#5d748c]">
                        <span>{currency.format(location.rent)}/mes</span>
                        <span aria-hidden="true">•</span>
                        <span className={cn("inline-flex items-center gap-1.5", tone.badge)}>
                          <span className={cn("size-1.5 rounded-full", tone.dot)} />
                          Riesgo {location.risk.toLowerCase()}
                        </span>
                      </span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block text-xl font-extrabold text-[#0b5aa3]">{location.score}</span>
                      <span className="block text-[10px] font-medium text-[#71869b]">de 100</span>
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        <section
          aria-live="polite"
          className="overflow-hidden rounded-[1.6rem] bg-white shadow-[0_10px_30px_rgba(8,45,99,0.09)] ring-1 ring-[#dbe5f0]"
        >
          <div className="bg-[#082f68] px-5 py-5 text-white">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.13em] text-blue-200">
                  Zona seleccionada
                </p>
                <h2 className="mt-1 text-xl font-bold">{active.name}</h2>
              </div>
              <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-white/12 ring-1 ring-white/20">
                <span className="text-2xl font-extrabold">{active.score}</span>
                <span className="text-[10px] text-blue-100">/ 100</span>
              </div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#41d3aa] to-[#f9bd4a] transition-[width] duration-500 motion-reduce:transition-none"
                style={{ width: `${active.score}%` }}
              />
            </div>
          </div>

          <div className="p-5">
            <p className="text-sm leading-6 text-[#49657f]">{active.description}</p>

            <dl className="mt-5 space-y-3">
              <DetailRow icon={Store} label="Alquiler mensual" value={currency.format(active.rent)} />
              <DetailRow icon={Users} label="Demanda estimada" value={active.demand} />
              <DetailRow icon={Building2} label="Competencia" value={active.competition} />
              <DetailRow icon={ShieldCheck} label="Nivel de riesgo" value={active.risk} />
            </dl>

            <div className="mt-5 rounded-2xl bg-[#eef6ff] p-4 ring-1 ring-[#d8e9fb]">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0b5aa3]">
                Lectura financiera
              </p>
              <p className="mt-2 text-sm leading-6 text-[#315575]">
                {active.financialExplanation}
              </p>
            </div>

            <button
              className="mt-5 flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-xl bg-[#f39200] px-4 text-sm font-bold text-white shadow-[0_8px_20px_rgba(243,146,0,0.28)] transition active:translate-y-px motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#f39200]/35"
              onClick={onSimulate}
              type="button"
            >
              {active.id === "los-prados"
                ? "Simular apertura en Los Prados"
                : "Simular opción recomendada en Los Prados"}
              <ArrowRight className="size-4" />
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Store
  label: string
  value: string
}) {
  return (
    <div className="flex min-h-11 items-center gap-3 rounded-xl border border-[#e0e8f1] px-3 py-2.5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#edf4fb] text-[#0b5aa3]">
        <Icon aria-hidden="true" className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <dt className="text-[11px] font-medium text-[#70859a]">{label}</dt>
        <dd className="mt-0.5 text-sm font-bold text-[#12365f]">{value}</dd>
      </div>
    </div>
  )
}
