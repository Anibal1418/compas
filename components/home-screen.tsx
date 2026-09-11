"use client"

import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  MessageCircle,
  Scissors,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react"

import { DecisionProgress } from "@/components/decision-progress"
import { BrandMark } from "@/components/screen-header"
import {
  businessProfile,
  cashFlowData,
  financialReadiness,
  formatDop,
  type BusinessSection,
} from "@/lib/demo-data"

export type HomeScreenProps = {
  onOpenBusiness: (section: BusinessSection) => void
  onOpenGrowth: () => void
  onOpenAssistant: () => void
}

export function HomeScreen({
  onOpenBusiness,
  onOpenGrowth,
  onOpenAssistant,
}: HomeScreenProps) {
  const ninetyDayBalance = cashFlowData.projections.find(
    (projection) => projection.days === 90,
  )!.balance

  return (
    <div className="min-w-0 bg-comerza-canvas text-comerza-navy">
      <header className="comerza-header safe-top relative overflow-hidden px-5 pb-24">
        <div className="pointer-events-none absolute -right-14 -top-20 size-52 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-5 -top-8 size-32 rounded-full border border-white/10" />
        <div className="relative flex items-center justify-between">
          <BrandMark />
          <div
            className="flex size-11 items-center justify-center rounded-full bg-comerza-navy text-sm font-bold text-white ring-1 ring-white/60"
            aria-label={`Perfil de ${businessProfile.ownerName}`}
          >
            {businessProfile.initials}
          </div>
        </div>

        <div className="relative mt-8">
          <p className="text-sm font-semibold text-comerza-navy/75">
            Hola, {businessProfile.firstName}
          </p>
          <h1
            data-screen-title
            id="home-screen-title"
            tabIndex={-1}
            className="mt-1 max-w-xs text-[28px] font-bold leading-[1.14] tracking-[-0.03em] text-balance text-comerza-navy focus:outline-none"
          >
            Tu barbería está lista para evaluar su próximo paso.
          </h1>
        </div>
      </header>

      <div className="relative -mt-16 space-y-4 rounded-t-[20px] bg-comerza-canvas px-4 pb-7 pt-4">
        <section
          className="comerza-card overflow-hidden"
          aria-labelledby="business-summary-title"
        >
          <div className="flex items-center gap-3 border-b border-comerza-border px-4 py-3.5">
            <span className="flex size-10 items-center justify-center rounded-xl bg-comerza-cyan-soft text-comerza-cyan-dark">
              <Scissors className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h2
                id="business-summary-title"
                className="truncate text-[15px] font-bold text-comerza-navy"
              >
                {businessProfile.businessName}
              </h2>
              <p className="text-xs text-comerza-muted">Resumen de decisión</p>
            </div>
            <span className="ml-auto rounded-full bg-[#e7f5ef] px-2.5 py-1 text-xs font-bold text-[#0d7257]">
              En buen rumbo
            </span>
          </div>

          <div className="divide-y divide-comerza-border px-4">
            <SummaryMetric
              icon={ShieldCheck}
              label="Salud del negocio"
              value={`${businessProfile.healthScore}/100`}
              detail={businessProfile.healthStatus}
              tone="success"
            />
            <SummaryMetric
              icon={BarChart3}
              label="Caja a 90 días"
              value={formatDop(ninetyDayBalance)}
              detail="Positiva"
              tone="success"
            />
            <SummaryMetric
              icon={WalletCards}
              label="Preparación financiera"
              value={financialReadiness.status}
              detail="Estimación"
              tone="compas"
            />
          </div>
        </section>

        <DecisionProgress step={1} label="Observar" />

        <section
          className="comerza-card p-5"
          aria-labelledby="next-step-title"
        >
          <div className="flex items-start gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-comerza-cyan text-comerza-navy">
              <Sparkles className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-comerza-cyan-dark">
                Tu próximo paso
              </p>
              <h2
                id="next-step-title"
                className="mt-1 text-[18px] font-bold leading-6 text-comerza-navy"
              >
                Observa qué sostiene tu crecimiento
              </h2>
              <p className="mt-1.5 text-[13px] leading-5 text-comerza-muted">
                Comienza por tu salud financiera y sigue una ruta guiada hasta probar
                el financiamiento de una segunda ubicación.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onOpenBusiness("health")}
            className="comerza-primary-action comerza-focus mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold transition-colors"
          >
            Comenzar por mi salud
            <ArrowRight className="size-[18px]" aria-hidden="true" />
          </button>
        </section>

        <section
          className="rounded-2xl border border-[#f3c98e] bg-comerza-orange-soft p-4"
          aria-labelledby="proactive-signal-title"
        >
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-comerza-navy">
              <CheckCircle2 className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#7a4600]">Detección proactiva</p>
              <h2
                id="proactive-signal-title"
                className="mt-1 text-[16px] font-bold leading-5 text-comerza-navy"
              >
                Tu cuota saludable estimada llega hasta {formatDop(financialReadiness.maxHealthyPayment)}.
              </h2>
              <p className="mt-1.5 text-[13px] leading-5 text-[#654a25]">
                La señal combina tu salud actual y el flujo proyectado para mantener
                una cuota manejable para tu negocio.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenGrowth}
            className="comerza-focus mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-comerza-navy bg-white px-4 text-sm font-bold text-comerza-navy transition-colors hover:bg-[#fffaf1]"
          >
            Ver oportunidad detectada
            <Building2 className="size-[18px]" aria-hidden="true" />
          </button>
        </section>

        <button
          type="button"
          onClick={onOpenAssistant}
          className="comerza-focus flex min-h-[72px] w-full items-center gap-3 rounded-2xl bg-comerza-navy px-4 py-3.5 text-left text-white shadow-[0_4px_12px_rgba(0,46,109,0.16)]"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/15">
            <MessageCircle className="size-5" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-bold">Pregúntale a Compás</span>
            <span className="mt-0.5 block text-xs text-white/80">
              Consulta tus cifras y próximos pasos
            </span>
          </span>
          <ArrowRight className="size-5 shrink-0 text-white/80" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

function SummaryMetric({
  icon: Icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: typeof ShieldCheck
  label: string
  value: string
  detail: string
  tone: "success" | "compas"
}) {
  const toneClasses =
    tone === "success"
      ? "bg-[#e7f5ef] text-[#0d7257]"
      : "bg-comerza-cyan-soft text-comerza-cyan-dark"

  return (
    <div className="flex min-h-[78px] items-center gap-3 py-3">
      <span className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${toneClasses}`}>
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-medium text-comerza-muted">{label}</span>
        <span className="mt-0.5 block text-[17px] font-bold tracking-[-0.02em] text-comerza-navy">
          {value}
        </span>
      </span>
      <span className="shrink-0 rounded-full bg-[#f0f1f2] px-2.5 py-1 text-xs font-semibold text-comerza-muted">
        {detail}
      </span>
    </div>
  )
}
