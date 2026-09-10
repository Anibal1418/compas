"use client"

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react"
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CircleAlert,
  Landmark,
  Lightbulb,
  MapPin,
  MessageCircle,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react"

import { DecisionProgress } from "@/components/decision-progress"
import {
  businessProfile,
  cashFlowData,
  financialReadiness,
  formatDop,
  healthMetrics,
  type BusinessSection,
} from "@/lib/demo-data"

export type BusinessScreenProps = {
  activeSection: BusinessSection
  onSectionChange: (section: BusinessSection) => void
  onOpenGrowth: () => void
  onOpenAssistant: () => void
}

const sections: ReadonlyArray<{
  id: BusinessSection
  label: string
  step: 1 | 2 | 3
  stage: string
}> = [
  { id: "health", label: "Salud", step: 1, stage: "Observar" },
  { id: "cashflow", label: "Flujo", step: 2, stage: "Predecir" },
  { id: "readiness", label: "Preparación", step: 3, stage: "Evaluar" },
]

export function BusinessScreen({
  activeSection,
  onSectionChange,
  onOpenGrowth,
  onOpenAssistant,
}: BusinessScreenProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const currentSection = sections.find((section) => section.id === activeSection)!

  const moveTabFocus = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    let nextIndex: number | undefined

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % sections.length
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + sections.length) % sections.length
    } else if (event.key === "Home") {
      nextIndex = 0
    } else if (event.key === "End") {
      nextIndex = sections.length - 1
    }

    if (nextIndex === undefined) return

    event.preventDefault()
    const nextSection = sections[nextIndex]
    onSectionChange(nextSection.id)
    requestAnimationFrame(() => tabRefs.current[nextIndex]?.focus())
  }

  return (
    <div className="min-w-0 bg-comerza-canvas pb-7 text-comerza-navy">
      <header className="comerza-header safe-top px-5 pb-8">
        <p className="text-xs font-semibold text-comerza-navy/70">
          {businessProfile.businessName}
        </p>
        <h1
          data-screen-title
          id="business-screen-title"
          tabIndex={-1}
          className="mt-1 text-[26px] font-bold tracking-[-0.04em] focus:outline-none"
        >
          Mi negocio
        </h1>
        <p className="mt-1 text-sm leading-5 text-comerza-navy/75">
          Observa tus cifras, proyecta la caja y evalúa tu preparación.
        </p>
      </header>

      <div className="relative -mt-4 px-4">
        <div
          className="grid grid-cols-3 rounded-xl border border-comerza-border bg-white p-1 shadow-[0_4px_14px_rgba(0,46,109,0.08)]"
          role="tablist"
          aria-label="Secciones de Mi negocio"
        >
          {sections.map((section, index) => {
            const selected = activeSection === section.id

            return (
              <button
                key={section.id}
                ref={(element) => {
                  tabRefs.current[index] = element
                }}
                id={`business-tab-${section.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="business-section-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => onSectionChange(section.id)}
                onKeyDown={(event) => moveTabFocus(event, index)}
                className={`comerza-focus min-h-11 rounded-lg px-1.5 text-xs font-bold outline-none transition-colors ${
                  selected
                    ? "bg-comerza-navy text-white"
                    : "text-comerza-muted hover:bg-comerza-canvas"
                }`}
              >
                {section.label}
              </button>
            )
          })}
        </div>

        <DecisionProgress
          step={currentSection.step}
          label={currentSection.stage}
          className="mt-4"
        />

        <div
          id="business-section-panel"
          role="tabpanel"
          aria-labelledby={`business-tab-${activeSection}`}
          tabIndex={0}
          className="mt-4 outline-none focus-visible:ring-2 focus-visible:ring-comerza-cyan-dark focus-visible:ring-offset-2"
        >
          {activeSection === "health" && (
            <HealthView onContinue={() => onSectionChange("cashflow")} />
          )}
          {activeSection === "cashflow" && (
            <CashFlowView onContinue={() => onSectionChange("readiness")} />
          )}
          {activeSection === "readiness" && (
            <ReadinessView onContinue={onOpenGrowth} />
          )}
        </div>

        <button
          type="button"
          onClick={onOpenAssistant}
          className="comerza-focus mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-comerza-navy bg-white px-4 text-sm font-bold text-comerza-navy outline-none transition-colors hover:bg-comerza-cyan-soft"
        >
          <MessageCircle className="size-[18px]" aria-hidden="true" />
          Preguntarle a Compás sobre mis cifras
        </button>
      </div>
    </div>
  )
}

function HealthView({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="space-y-4">
      <section
        className="comerza-card p-5"
        aria-labelledby="health-overview-title"
      >
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-comerza-cyan-dark">
          Señales observadas
        </p>
        <div className="mt-3 flex items-center gap-4">
          <HealthRing score={businessProfile.healthScore} />
          <div className="min-w-0 flex-1">
            <h2
              id="health-overview-title"
              className="text-[20px] font-bold tracking-[-0.025em] text-comerza-navy"
            >
              Saludable y estable
            </h2>
            <p className="mt-1 text-[13px] leading-5 text-comerza-muted">
              Tu barbería tiene una base sólida para evaluar una segunda ubicación
              sin comprometer la operación actual.
            </p>
            <span className="mt-2 inline-flex min-h-8 items-center rounded-full bg-comerza-cyan-soft px-3 text-xs font-bold text-comerza-cyan-dark">
              Potencial {businessProfile.growthPotential.toLowerCase()}
            </span>
          </div>
        </div>
      </section>

      <section
        className="comerza-card p-5"
        aria-labelledby="health-dimensions-title"
      >
        <h2 id="health-dimensions-title" className="text-[17px] font-bold text-comerza-navy">
          Cinco dimensiones
        </h2>
        <div className="mt-4 space-y-4">
          {healthMetrics.map((metric) => (
            <div key={metric.id}>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[13px] font-semibold text-comerza-navy/85">
                  {metric.label}
                </span>
                <span className="text-xs font-bold text-comerza-navy">
                  {metric.score}/100
                </span>
              </div>
              <div
                className="mt-2 h-2.5 overflow-hidden rounded-full bg-comerza-canvas"
                role="progressbar"
                aria-label={metric.label}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={metric.score}
              >
                <div
                  className="h-full rounded-full bg-comerza-cyan"
                  style={{ width: `${metric.score}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs leading-[18px] text-comerza-muted">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="rounded-xl border border-comerza-cyan/35 bg-comerza-cyan-soft p-4"
        aria-labelledby="health-recommendations-title"
      >
        <div className="flex items-center gap-2 text-comerza-cyan-dark">
          <Sparkles className="size-[18px]" aria-hidden="true" />
          <h2 id="health-recommendations-title" className="text-[15px] font-bold">
            Antes de crecer
          </h2>
        </div>
        <ul className="mt-3 space-y-2.5">
          <Recommendation>Conserva una reserva para proteger la barbería actual.</Recommendation>
          <Recommendation>Valida alquiler, demanda y competencia antes de firmar.</Recommendation>
          <Recommendation>Mantén una cuota mensual dentro de tu capacidad observada.</Recommendation>
        </ul>
      </section>

      <PrimaryAction onClick={onContinue}>
        Predecir mi flujo de caja
      </PrimaryAction>
    </div>
  )
}

function CashFlowView({ onContinue }: { onContinue: () => void }) {
  const horizons = cashFlowData.projections
  const [days, setDays] = useState<30 | 60 | 90>(30)
  const horizonRefs = useRef<Array<HTMLButtonElement | null>>([])
  const selectedProjection = horizons.find((projection) => projection.days === days)!
  const reserveProgress = Math.min(
    100,
    Math.round((businessProfile.availableCash / cashFlowData.reserveTarget) * 100),
  )

  const moveHorizonFocus = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    let nextIndex: number | undefined

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % horizons.length
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + horizons.length) % horizons.length
    } else if (event.key === "Home") {
      nextIndex = 0
    } else if (event.key === "End") {
      nextIndex = horizons.length - 1
    }

    if (nextIndex === undefined) return

    event.preventDefault()
    const nextDays = horizons[nextIndex].days
    setDays(nextDays)
    requestAnimationFrame(() => horizonRefs.current[nextIndex]?.focus())
  }

  return (
    <div className="space-y-4">
      <section
        className="comerza-card p-5"
        aria-labelledby="cashflow-title"
      >
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-comerza-cyan-soft text-comerza-cyan-dark">
            <BarChart3 className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-comerza-cyan-dark">
              Flujo mensual actual
            </p>
            <h2 id="cashflow-title" className="mt-0.5 text-[23px] font-bold text-comerza-navy">
              {formatDop(businessProfile.freeCashFlow)} libres
            </h2>
          </div>
        </div>

        <div className="mt-4 divide-y divide-comerza-border">
          <MetricRow
            icon={<TrendingUp className="size-5" aria-hidden="true" />}
            label="Ingresos"
            value={formatDop(businessProfile.monthlyIncome)}
            detail={`+${businessProfile.growthRate}% reciente`}
          />
          <MetricRow
            icon={<Wallet className="size-5" aria-hidden="true" />}
            label="Gastos"
            value={formatDop(businessProfile.monthlyExpenses)}
            detail="Operación actual"
          />
          <MetricRow
            icon={<PiggyBank className="size-5" aria-hidden="true" />}
            label="Disponible"
            value={formatDop(businessProfile.availableCash)}
            detail="Reserva actual"
            accent
          />
        </div>

        <CashFlowChart />
      </section>

      <section
        className="comerza-card p-5"
        aria-labelledby="projection-title"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-comerza-cyan-dark">
              Proyección
            </p>
            <h2 id="projection-title" className="mt-1 text-[17px] font-bold text-comerza-navy">
              Caja disponible
            </h2>
          </div>
          <span className="rounded-full bg-comerza-cyan-soft px-2.5 py-1 text-xs font-bold text-comerza-cyan-dark">
            Positiva
          </span>
        </div>

        <div
          className="mt-4 grid grid-cols-3 gap-1 rounded-lg bg-comerza-canvas p-1"
          role="radiogroup"
          aria-label="Horizonte de proyección"
        >
          {horizons.map((projection, index) => {
            const checked = days === projection.days
            return (
              <button
                key={projection.days}
                ref={(element) => {
                  horizonRefs.current[index] = element
                }}
                type="button"
                role="radio"
                aria-checked={checked}
                tabIndex={checked ? 0 : -1}
                onClick={() => setDays(projection.days)}
                onKeyDown={(event) => moveHorizonFocus(event, index)}
                className={`comerza-focus min-h-11 rounded-md text-xs font-bold outline-none transition-colors ${
                  checked
                    ? "bg-comerza-navy text-white"
                    : "text-comerza-muted"
                }`}
              >
                {projection.days} días
              </button>
            )
          })}
        </div>

        <div className="mt-4 rounded-xl border border-comerza-cyan/25 bg-comerza-cyan-soft p-4 text-center" aria-live="polite">
          <p className="text-xs font-medium text-comerza-muted">Balance proyectado</p>
          <p className="mt-1 text-[28px] font-extrabold tracking-[-0.04em] text-comerza-navy">
            {formatDop(selectedProjection.balance)}
          </p>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="font-semibold text-comerza-navy/85">Reserva de tres meses</span>
            <span className="font-bold text-comerza-navy">
              {formatDop(cashFlowData.reserveTarget)}
            </span>
          </div>
          <div
            className="mt-2 h-2.5 overflow-hidden rounded-full bg-comerza-canvas"
            role="progressbar"
            aria-label="Progreso de la reserva de tres meses"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={reserveProgress}
          >
            <div
              className="h-full rounded-full bg-comerza-cyan"
              style={{ width: `${reserveProgress}%` }}
            />
          </div>
          <p className="mt-2 text-xs leading-[18px] text-comerza-muted">
            Al ritmo actual podrías alcanzarla en aproximadamente {cashFlowData.daysToTarget} días.
          </p>
        </div>
      </section>

      <InsightCard
        icon={<Lightbulb className="size-5" aria-hidden="true" />}
        title="Lectura de Compás"
        text={cashFlowData.insight}
        tone="info"
      />
      <InsightCard
        icon={<CircleAlert className="size-5" aria-hidden="true" />}
        title="Punto a vigilar"
        text={cashFlowData.alert}
        tone="warning"
      />

      <PrimaryAction onClick={onContinue}>
        Evaluar mi preparación
      </PrimaryAction>
    </div>
  )
}

function ReadinessView({ onContinue }: { onContinue: () => void }) {
  const ninetyDayBalance = cashFlowData.projections.find(
    (projection) => projection.days === 90,
  )!.balance

  return (
    <div className="space-y-4">
      <section
        className="comerza-card overflow-hidden"
        aria-labelledby="readiness-title"
      >
        <div className="border-b border-comerza-cyan/25 bg-comerza-cyan-soft p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-comerza-cyan text-comerza-navy">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-comerza-cyan-dark">
                Preparación estimada
              </p>
              <h2 id="readiness-title" className="mt-0.5 text-[24px] font-bold text-comerza-navy">
                {financialReadiness.status}
              </h2>
            </div>
          </div>
          <p className="mt-3 text-[13px] leading-5 text-comerza-muted">
            {financialReadiness.summary}
          </p>
        </div>

        <div className="divide-y divide-comerza-border px-5">
          <EvidenceRow
            icon={<ShieldCheck className="size-5" aria-hidden="true" />}
            label="Salud observada"
            value={`${businessProfile.healthScore}/100`}
          />
          <EvidenceRow
            icon={<BarChart3 className="size-5" aria-hidden="true" />}
            label="Caja proyectada a 90 días"
            value={formatDop(ninetyDayBalance)}
          />
          <EvidenceRow
            icon={<Landmark className="size-5" aria-hidden="true" />}
            label="Rango a evaluar"
            value={`${formatDop(financialReadiness.rangeMin)}–${formatDop(financialReadiness.rangeMax)}`}
          />
        </div>
      </section>

      <section
        className="rounded-xl border border-comerza-orange/30 bg-comerza-orange-soft p-5"
        aria-labelledby="healthy-payment-title"
      >
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-comerza-navy">
            <Wallet className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-semibold text-comerza-muted">Cuota mensual máxima saludable</p>
            <h2 id="healthy-payment-title" className="mt-1 text-[25px] font-extrabold tracking-[-0.035em] text-comerza-navy">
              {formatDop(financialReadiness.maxHealthyPayment)}
            </h2>
            <p className="mt-1.5 text-xs leading-[18px] text-comerza-muted">
              Mantenerte dentro de este límite ayuda a proteger tu operación actual.
            </p>
          </div>
        </div>
      </section>

      <div className="rounded-xl border border-comerza-orange/35 bg-comerza-orange-soft p-4 text-xs leading-[18px] text-[#65430b]">
        <div className="flex items-start gap-2.5">
          <CircleAlert className="mt-0.5 size-[18px] shrink-0 text-[#9a5700]" aria-hidden="true" />
          <p>Este rango mantiene la cuota dentro de la capacidad mensual observada de tu negocio.</p>
        </div>
      </div>

      <PrimaryAction onClick={onContinue}>
        Identificar oportunidades
      </PrimaryAction>
    </div>
  )
}

function HealthRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 39
  const dash = (score / 100) * circumference

  return (
    <div
      className="relative size-[112px] shrink-0"
      role="progressbar"
      aria-label="Salud del negocio"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={score}
    >
      <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="50" cy="50" r="39" fill="none" stroke="#e5e7eb" strokeWidth="9" />
        <circle
          cx="50"
          cy="50"
          r="39"
          fill="none"
          stroke="#00aeb6"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[28px] font-extrabold leading-none text-comerza-navy">{score}</span>
        <span className="mt-1 text-xs font-bold text-comerza-muted">de 100</span>
      </div>
    </div>
  )
}

function Recommendation({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-[13px] leading-5 text-comerza-muted">
      <CheckCircle2 className="mt-0.5 size-[17px] shrink-0 text-comerza-cyan-dark" aria-hidden="true" />
      <span>{children}</span>
    </li>
  )
}

function MetricRow({
  icon,
  label,
  value,
  detail,
  accent = false,
}: {
  icon: ReactNode
  label: string
  value: string
  detail: string
  accent?: boolean
}) {
  return (
    <div className="flex min-h-[72px] items-center gap-3 py-3">
      <span
        className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
          accent
            ? "bg-comerza-orange-soft text-[#a45c00]"
            : "bg-comerza-cyan-soft text-comerza-cyan-dark"
        }`}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-medium text-comerza-muted">{label}</span>
        <span className="mt-0.5 block text-[17px] font-bold tracking-[-0.02em] text-comerza-navy">
          {value}
        </span>
      </span>
      <span className="max-w-[92px] text-right text-xs leading-4 text-comerza-muted">
        {detail}
      </span>
    </div>
  )
}

function CashFlowChart() {
  const history = cashFlowData.history
  const min = 90_000
  const max = 195_000
  const left = 17
  const right = 327
  const top = 16
  const bottom = 126
  const xFor = (index: number) =>
    left + (index * (right - left)) / (history.length - 1)
  const yFor = (value: number) =>
    bottom - ((value - min) / (max - min)) * (bottom - top)
  const incomePoints = history
    .map((item, index) => `${xFor(index)},${yFor(item.income)}`)
    .join(" ")
  const expensePoints = history
    .map((item, index) => `${xFor(index)},${yFor(item.expenses)}`)
    .join(" ")
  const incomeArea = `${left},${bottom} ${incomePoints} ${right},${bottom}`

  return (
    <div
      className="mt-5"
      role="img"
      aria-label="Ingresos y gastos de los últimos seis meses; los ingresos mantienen una tendencia positiva"
    >
      <div className="mb-2 flex items-center gap-4 text-xs font-semibold text-comerza-muted">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-comerza-navy" />
          Ingresos
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-comerza-orange" />
          Gastos
        </span>
      </div>
      <svg
        className="h-auto w-full overflow-visible"
        viewBox="0 0 344 170"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="business-income-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#00bcc4" stopOpacity="0.2" />
            <stop offset="1" stopColor="#00bcc4" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[38, 82, 126].map((y) => (
          <line
            key={y}
            x1={left}
            x2={right}
            y1={y}
            y2={y}
            stroke="#dcdfe3"
            strokeDasharray="3 5"
          />
        ))}
        <polygon points={incomeArea} fill="url(#business-income-area)" />
        <polyline
          points={expensePoints}
          fill="none"
          stroke="#ff8a00"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <polyline
          points={incomePoints}
          fill="none"
          stroke="#002e6d"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
        {history.map((item, index) => (
          <g key={item.label}>
            <circle
              cx={xFor(index)}
              cy={yFor(item.income)}
              r={index === history.length - 1 ? 4 : 2.5}
              fill="#fff"
              stroke="#002e6d"
              strokeWidth="2"
            />
            <text
              x={xFor(index)}
              y="158"
              fill="#566477"
              fontSize="12"
              textAnchor="middle"
            >
              {item.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

function InsightCard({
  icon,
  title,
  text,
  tone,
}: {
  icon: ReactNode
  title: string
  text: string
  tone: "info" | "warning"
}) {
  const toneClasses =
    tone === "info"
      ? "border-comerza-cyan/35 bg-comerza-cyan-soft text-comerza-cyan-dark"
      : "border-comerza-orange/35 bg-comerza-orange-soft text-[#8a5000]"

  return (
    <section className={`rounded-xl border p-4 ${toneClasses}`}>
      <div className="flex items-start gap-3">
        <span className="mt-0.5 shrink-0">{icon}</span>
        <div>
          <h2 className="text-[15px] font-bold">{title}</h2>
          <p className="mt-1 text-[13px] leading-5 text-comerza-muted">{text}</p>
        </div>
      </div>
    </section>
  )
}

function EvidenceRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex min-h-[72px] items-center gap-3 py-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-comerza-cyan-soft text-comerza-cyan-dark">
        {icon}
      </span>
      <span className="min-w-0 flex-1 text-xs font-medium text-comerza-muted">{label}</span>
      <span className="max-w-[165px] text-right text-[14px] font-bold leading-5 text-comerza-navy">
        {value}
      </span>
    </div>
  )
}

function PrimaryAction({
  onClick,
  children,
}: {
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="comerza-primary-action comerza-focus flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold outline-none transition-colors"
    >
      {children}
      <ArrowRight className="size-[18px]" aria-hidden="true" />
    </button>
  )
}
