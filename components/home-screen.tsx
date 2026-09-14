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
import { ScreenHeader } from "@/components/screen-header"
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
      <ScreenHeader title={`Hola ${businessProfile.firstName}`} />

      <div className="space-y-4 bg-comerza-canvas px-4 pb-7 pt-5">
        <DecisionProgress step={1} label="Observar" />

        <section
          className="comerza-card overflow-hidden"
          aria-labelledby="business-summary-title"
        >
          <div className="flex items-center gap-3 border-b border-comerza-border px-4 py-3.5">
            <span className="comerza-icon-display flex size-10 items-center justify-center rounded-xl">
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

        <section
          className="comerza-card p-5"
          aria-labelledby="next-step-title"
        >
          <div className="flex items-start gap-3">
            <span className="comerza-icon-action flex size-11 shrink-0 items-center justify-center rounded-xl">
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
            className="comerza-primary-action comerza-focus mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg px-5 text-sm font-bold transition-colors"
          >
            Comenzar por mi salud
            <ArrowRight className="size-[18px]" aria-hidden="true" />
          </button>
        </section>

        <section
          className="comerza-card p-4"
          aria-labelledby="proactive-signal-title"
        >
          <div className="flex items-start gap-3">
            <span className="comerza-icon-action flex size-10 shrink-0 items-center justify-center rounded-xl">
              <CheckCircle2 className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-comerza-navy">Detección proactiva</p>
              <h2
                id="proactive-signal-title"
                className="mt-1 text-[16px] font-bold leading-5 text-comerza-navy"
              >
                Tu cuota saludable estimada llega hasta {formatDop(financialReadiness.maxHealthyPayment)}.
              </h2>
              <p className="mt-1.5 text-[13px] leading-5 text-comerza-muted">
                La señal combina tu salud actual y el flujo proyectado para mantener
                una cuota manejable para tu negocio.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenGrowth}
            className="comerza-primary-action comerza-focus mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold transition-colors"
          >
            Ver oportunidad detectada
            <Building2 className="size-[18px]" aria-hidden="true" />
          </button>
        </section>

        <button
          type="button"
          onClick={onOpenAssistant}
          className="comerza-card comerza-focus flex min-h-[72px] w-full items-center gap-3 px-4 py-3.5 text-left text-comerza-navy"
        >
          <span className="comerza-icon-action flex size-11 shrink-0 items-center justify-center rounded-xl">
            <MessageCircle className="size-5" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-bold">Pregúntale a Compás</span>
            <span className="mt-0.5 block text-xs text-comerza-muted">
              Consulta tus cifras y próximos pasos
            </span>
          </span>
          <ArrowRight className="size-5 shrink-0 text-comerza-cyan" aria-hidden="true" />
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
  return (
    <div className="flex min-h-[78px] items-center gap-3 py-3">
      <span
        className="comerza-icon-display flex size-10 shrink-0 items-center justify-center rounded-lg"
        data-tone={tone}
      >
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
