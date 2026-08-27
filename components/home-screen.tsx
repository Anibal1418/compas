"use client"

import {
  ArrowRight,
  BarChart3,
  Compass,
  MapPinned,
  MessageCircle,
  Scissors,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  WalletCards,
} from "lucide-react"
import { businessProfile, formatDop } from "@/lib/demo-data"
import { BrandMark } from "@/components/screen-header"

type HomeScreenProps = {
  onOpenCashFlow: () => void
  onOpenHealth: () => void
  onOpenGrow: () => void
  onOpenSimulate: () => void
  onOpenAssistant: () => void
}

const capabilities = [
  {
    id: "cashflow",
    title: "Anticipa tu efectivo",
    description: "Mira cómo podría evolucionar tu caja en 30, 60 y 90 días.",
    label: "Flujo de caja",
    icon: BarChart3,
    tone: "bg-[#e7f3fb] text-[#00689e]",
  },
  {
    id: "health",
    title: "Conoce tu preparación",
    description: "Entiende qué está fuerte y qué debes cuidar antes de crecer.",
    label: "Salud del negocio",
    icon: ShieldCheck,
    tone: "bg-success-soft text-success",
  },
  {
    id: "grow",
    title: "Compara dónde crecer",
    description: "Cruza demanda, alquiler y la capacidad financiera de tu negocio.",
    label: "Dónde crecer",
    icon: MapPinned,
    tone: "bg-compas-soft text-compas",
  },
  {
    id: "simulate",
    title: "Prueba antes de decidir",
    description: "Visualiza cómo respondería tu barbería ante distintos escenarios.",
    label: "Simular escenarios",
    icon: SlidersHorizontal,
    tone: "bg-warning-soft text-warning",
  },
] as const

export function HomeScreen({
  onOpenCashFlow,
  onOpenHealth,
  onOpenGrow,
  onOpenSimulate,
  onOpenAssistant,
}: HomeScreenProps) {
  const handlers = {
    cashflow: onOpenCashFlow,
    health: onOpenHealth,
    grow: onOpenGrow,
    simulate: onOpenSimulate,
  }

  return (
    <div className="bg-background">
      <header className="safe-top relative overflow-hidden bg-[linear-gradient(145deg,#00356c_0%,#005b94_62%,#00889f_145%)] px-5 pb-24 text-white">
        <div className="pointer-events-none absolute -right-14 -top-20 size-52 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-5 -top-8 size-32 rounded-full border border-white/10" />
        <div className="relative flex items-center justify-between">
          <BrandMark />
          <div className="flex size-11 items-center justify-center rounded-full bg-white/15 text-sm font-bold ring-1 ring-white/20" aria-label="Perfil de Ernesto Matos">
            EM
          </div>
        </div>

        <div className="relative mt-9">
          <p className="text-sm font-medium text-white/75">Hola, {businessProfile.firstName}</p>
          <h1 className="mt-1 max-w-xs text-[29px] font-bold leading-[1.14] tracking-[-0.04em] text-balance">
            Veamos cómo está creciendo tu barbería.
          </h1>
        </div>
      </header>

      <main className="relative -mt-16 space-y-5 rounded-t-[28px] bg-background px-4 pb-7 pt-4">
        <section className="overflow-hidden rounded-[22px] border border-white/70 bg-white shadow-[0_12px_30px_rgba(11,52,91,0.10)]" aria-labelledby="business-summary-title">
          <div className="flex items-center gap-3 border-b border-border/80 px-4 py-3.5">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-secondary text-primary">
              <Scissors className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2 id="business-summary-title" className="text-[15px] font-bold text-foreground">{businessProfile.businessName}</h2>
              <p className="text-xs text-muted-foreground">Resumen de hoy</p>
            </div>
            <span className="ml-auto rounded-full bg-success-soft px-2.5 py-1 text-xs font-bold text-success">{businessProfile.healthStatus}</span>
          </div>

          <div className="flex items-center gap-4 px-4 py-5">
            <HealthRing score={businessProfile.healthScore} />
            <div className="min-w-0 flex-1 space-y-3">
              <SummaryRow icon={WalletCards} label="Disponible" value={formatDop(businessProfile.availableCash)} />
              <SummaryRow icon={TrendingUp} label="Crecimiento" value={`+${businessProfile.growthRate}%`} valueClass="text-success" />
              <SummaryRow icon={Compass} label="Potencial" value={businessProfile.growthPotential} valueClass="text-compas" />
            </div>
          </div>
        </section>

        <section className="rounded-[20px] border border-[#c9e9ed] bg-[linear-gradient(135deg,#e7f7f8_0%,#f4fbfc_100%)] p-4" aria-labelledby="recommendation-title">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-compas text-white shadow-sm">
              <Sparkles className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-compas">Recomendación de Compás</p>
              <h2 id="recommendation-title" className="mt-1 text-[16px] font-bold leading-5 text-primary">Puedes comenzar a evaluar una expansión.</h2>
              <p className="mt-1.5 text-sm leading-5 text-muted-foreground">
                Tus ingresos crecen de forma estable. Compara ubicaciones y prueba los riesgos antes de comprometerte.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="capabilities-title">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold text-compas">Tu ruta de crecimiento</p>
              <h2 id="capabilities-title" className="mt-0.5 text-xl font-bold tracking-[-0.025em] text-primary">¿Qué quieres evaluar?</h2>
            </div>
            <span className="text-xs text-muted-foreground">4 análisis</span>
          </div>

          <div className="space-y-3">
            {capabilities.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={handlers[item.id]}
                  className="group flex min-h-[104px] w-full items-center gap-3.5 rounded-[20px] border border-border bg-card p-4 text-left shadow-[0_4px_16px_rgba(14,48,78,0.045)] transition duration-200 hover:-translate-y-0.5 hover:border-[#b9cfdf] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <span className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${item.tone}`}>
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">{item.label}</span>
                    <span className="mt-0.5 block text-[16px] font-bold text-primary">{item.title}</span>
                    <span className="mt-1 block text-[13px] leading-[18px] text-muted-foreground">{item.description}</span>
                  </span>
                  <ArrowRight className="size-5 shrink-0 text-[#91a2b5] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </button>
              )
            })}
          </div>
        </section>

        <button
          type="button"
          onClick={onOpenAssistant}
          className="flex min-h-[76px] w-full items-center gap-3 rounded-[20px] bg-primary px-4 py-3.5 text-left text-white shadow-[0_8px_22px_rgba(0,59,115,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/15">
            <MessageCircle className="size-5" aria-hidden="true" />
          </span>
          <span className="flex-1">
            <span className="block text-[15px] font-bold">Habla con Compás</span>
            <span className="mt-0.5 block text-xs text-white/70">Pregunta con tus datos en contexto</span>
          </span>
          <ArrowRight className="size-5 text-white/70" aria-hidden="true" />
        </button>
      </main>
    </div>
  )
}

function HealthRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 39
  const dash = (score / 100) * circumference

  return (
    <div className="relative size-[108px] shrink-0" aria-label={`Salud del negocio: ${score} de 100`}>
      <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="50" cy="50" r="39" fill="none" stroke="#e8eef3" strokeWidth="9" />
        <circle
          cx="50"
          cy="50"
          r="39"
          fill="none"
          stroke="#117f61"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[27px] font-extrabold leading-none text-primary">{score}</span>
        <span className="mt-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">de 100</span>
      </div>
    </div>
  )
}

function SummaryRow({
  icon: Icon,
  label,
  value,
  valueClass = "text-foreground",
}: {
  icon: typeof WalletCards
  label: string
  value: string
  valueClass?: string
}) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <Icon className="size-4 shrink-0 text-[#7d91a5]" aria-hidden="true" />
      <span className="min-w-0 flex-1 text-xs text-muted-foreground">{label}</span>
      <span className={`shrink-0 text-sm font-bold ${valueClass}`}>{value}</span>
    </div>
  )
}
