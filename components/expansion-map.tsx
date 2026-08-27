"use client"

import { useState } from "react"
import { MapPin, Footprints, Swords, TrendingUp, Layers } from "lucide-react"
import { cn } from "@/lib/utils"

type Location = {
  id: string
  name: string
  x: number
  y: number
  score: number
  traffic: string
  competition: string
  profit: string
  tone: "good" | "warn" | "bad"
}

const locations: Location[] = [
  {
    id: "l4",
    name: "Local #4 — Av. Correa y Cidrón",
    x: 34,
    y: 42,
    score: 88,
    traffic: "Alto (12,000 pers/día)",
    competition: "Moderada (2 barberías a 500m)",
    profit: "+35% en 6 meses",
    tone: "good",
  },
  {
    id: "l2",
    name: "Local #2 — Zona A, Los Prados",
    x: 62,
    y: 30,
    score: 81,
    traffic: "Alto (9,400 pers/día)",
    competition: "Baja (1 barbería a 500m)",
    profit: "+28% en 6 meses",
    tone: "good",
  },
  {
    id: "l7",
    name: "Local #7 — Zona Universitaria",
    x: 72,
    y: 66,
    score: 54,
    traffic: "Muy alto (18,000 pers/día)",
    competition: "Saturada (7 barberías a 500m)",
    profit: "-8% en 6 meses",
    tone: "bad",
  },
  {
    id: "l5",
    name: "Local #5 — Av. Independencia",
    x: 22,
    y: 72,
    score: 69,
    traffic: "Medio (6,200 pers/día)",
    competition: "Moderada (3 barberías a 500m)",
    profit: "+14% en 6 meses",
    tone: "warn",
  },
]

const toneStyles: Record<Location["tone"], { dot: string; ring: string; text: string; bar: string }> = {
  good: { dot: "bg-[#3fa796]", ring: "ring-[#3fa796]/40", text: "text-[#2e7d70]", bar: "bg-[#3fa796]" },
  warn: { dot: "bg-orange", ring: "ring-orange/40", text: "text-orange", bar: "bg-orange" },
  bad: { dot: "bg-destructive", ring: "ring-destructive/40", text: "text-destructive", bar: "bg-destructive" },
}

export function ExpansionMap() {
  const [activeId, setActiveId] = useState("l4")
  const active = locations.find((l) => l.id === activeId)!
  const tone = toneStyles[active.tone]

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3.5">
        <MapPin className="size-4 text-navy" />
        <h2 className="text-sm font-semibold text-foreground">Mapa de Viabilidad de Expansión</h2>
        <span className="ml-auto flex items-center gap-1.5 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
          <Layers className="size-3.5" />
          Santo Domingo
        </span>
      </div>

      {/* Map canvas */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#eef1f6]">
        <svg viewBox="0 0 100 62" className="h-full w-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Mapa esquemático con zonas de viabilidad comercial">
          {/* heat zones */}
          <defs>
            <radialGradient id="heatGood" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3fa796" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#3fa796" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="heatBad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f45a20" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f45a20" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="heatMid" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#5e63db" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#5e63db" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="34" cy="26" r="26" fill="url(#heatGood)" />
          <circle cx="72" cy="40" r="24" fill="url(#heatBad)" />
          <circle cx="22" cy="46" r="20" fill="url(#heatMid)" />

          {/* street grid */}
          <g stroke="#c9cfd8" strokeWidth="0.5">
            {Array.from({ length: 7 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 10 + 4} x2="100" y2={i * 10 + 4} />
            ))}
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 10} y1="0" x2={i * 10} y2="62" />
            ))}
          </g>
          {/* main avenues */}
          <g stroke="#a7b0bd" strokeWidth="1.2">
            <line x1="0" y1="34" x2="100" y2="30" />
            <line x1="48" y1="0" x2="52" y2="62" />
          </g>

          {/* markers */}
          {locations.map((loc) => {
            const t = toneStyles[loc.tone]
            const isActive = loc.id === activeId
            return (
              <g
                key={loc.id}
                transform={`translate(${loc.x}, ${(loc.y / 100) * 62})`}
                className="cursor-pointer"
                onClick={() => setActiveId(loc.id)}
              >
                {isActive && <circle r="4.5" className={cn("animate-pulse", t.dot)} fill="currentColor" opacity="0.25" />}
                <circle
                  r={isActive ? 2.6 : 2}
                  className={t.dot}
                  fill="currentColor"
                  stroke="#ffffff"
                  strokeWidth="0.8"
                />
              </g>
            )
          })}
        </svg>

        {/* legend */}
        <div className="absolute bottom-3 left-3 flex flex-col gap-1 rounded-lg border border-border bg-card/90 px-3 py-2 text-xs backdrop-blur">
          <span className="mb-0.5 font-semibold text-foreground">Score de viabilidad</span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="size-2 rounded-full bg-[#3fa796]" /> Óptimo (80+)
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="size-2 rounded-full bg-orange" /> Precaución (60–79)
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="size-2 rounded-full bg-destructive" /> Alto riesgo (&lt;60)
          </span>
        </div>
      </div>

      {/* Highlighted location card */}
      <div className="flex-1 border-t border-border p-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Ubicación seleccionada</span>
            <h3 className="text-base font-bold text-foreground text-pretty">{active.name}</h3>
          </div>
          <div className="flex shrink-0 flex-col items-center rounded-xl border border-border bg-background px-3 py-2">
            <span className={cn("text-2xl font-bold leading-none", tone.text)}>{active.score}</span>
            <span className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">/ 100</span>
          </div>
        </div>

        {/* score bar */}
        <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div className={cn("h-full rounded-full transition-all", tone.bar)} style={{ width: `${active.score}%` }} />
        </div>

        <div className="grid gap-2.5 sm:grid-cols-3">
          <Metric icon={Footprints} label="Tráfico peatonal" value={active.traffic} />
          <Metric icon={Swords} label="Competencia cercana" value={active.competition} />
          <Metric icon={TrendingUp} label="Proyección rentabilidad" value={active.profit} tone={active.tone} />
        </div>
      </div>
    </section>
  )
}

function Metric({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Footprints
  label: string
  value: string
  tone?: Location["tone"]
}) {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <div className="mb-1.5 flex items-center gap-1.5 text-muted-foreground">
        <Icon className="size-3.5" />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p
        className={cn(
          "text-sm font-semibold text-foreground",
          tone === "good" && "text-[#2e7d70]",
          tone === "bad" && "text-destructive",
        )}
      >
        {value}
      </p>
    </div>
  )
}
