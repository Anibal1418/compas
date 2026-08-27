"use client"

import { useState } from "react"
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CircleAlert,
  Landmark,
  Lightbulb,
  MapPin,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react"

import {
  businessProfile,
  cashFlowData,
  financingData,
  healthMetrics,
} from "@/lib/demo-data"

export type BusinessSection = "cashflow" | "health"

export type BusinessScreenProps = {
  section: BusinessSection
  onSectionChange: (section: BusinessSection) => void
  onOpenFinancing: () => void
  onGoGrow: () => void
}

type ProfileSource = {
  ownerName?: string
  owner?: string | { name?: string }
  businessName?: string
  business?: string | { name?: string }
  healthScore?: number
  availableBalance?: number
  monthlyIncome?: number
  monthlyExpenses?: number
  monthlyFreeCashFlow?: number
  growth?: number
  monthlyGrowth?: number
  monthlyGrowthRate?: number
  growthRate?: number
  growthPotential?: string
}

type CashFlowSource = {
  income?: number
  revenue?: number
  expenses?: number
  freeCashFlow?: number
  balance?: number
  availableBalance?: number
  reserve?: number
  cashReserve?: number
  growthRate?: number
  history?: ReadonlyArray<{
    month?: string
    label?: string
    income?: number
    expenses?: number
  }>
  projections?: ReadonlyArray<{
    days?: number
    amount?: number
    balance?: number
    value?: number
  }>
  reserveGoal?: number
  reserveTarget?: number
  daysToReserveGoal?: number
  daysToTarget?: number
  insight?: string
  alert?: string
}

type HealthMetricSource = {
  label?: string
  name?: string
  score?: number
  value?: number
}

type HealthSource = {
  score?: number
  potential?: string
  dimensions?: HealthMetricSource[]
  metrics?: HealthMetricSource[]
  recommendations?: string[]
}

type FinancingSource = {
  healthyPayment?: number
  maxHealthyPayment?: number
  maximumHealthyPayment?: number
}

const profileSource = businessProfile as unknown as ProfileSource
const cashSource = cashFlowData as unknown as CashFlowSource
const rawHealthSource = healthMetrics as unknown
const healthSource = (Array.isArray(rawHealthSource)
  ? { dimensions: rawHealthSource }
  : rawHealthSource) as HealthSource
const financingSource = financingData as unknown as FinancingSource

const ownerName =
  profileSource.ownerName ??
  (typeof profileSource.owner === "string"
    ? profileSource.owner
    : profileSource.owner?.name) ??
  "Ernesto Matos"

const businessName =
  profileSource.businessName ??
  (typeof profileSource.business === "string"
    ? profileSource.business
    : profileSource.business?.name) ??
  "Barbería Ernesto"

const monthlyIncome =
  cashSource.income ?? cashSource.revenue ?? profileSource.monthlyIncome ?? 185_000
const monthlyExpenses =
  cashSource.expenses ?? profileSource.monthlyExpenses ?? 109_000
const monthlyFreeCashFlow =
  cashSource.freeCashFlow ??
  profileSource.monthlyFreeCashFlow ??
  monthlyIncome - monthlyExpenses
const cashReserve =
  cashSource.reserve ??
  cashSource.cashReserve ??
  cashSource.balance ??
  cashSource.availableBalance ??
  profileSource.availableBalance ??
  126_400
const monthlyGrowth =
  cashSource.growthRate ??
  profileSource.growth ??
  profileSource.monthlyGrowth ??
  profileSource.monthlyGrowthRate ??
  profileSource.growthRate ??
  14.2
const healthScore = healthSource.score ?? profileSource.healthScore ?? 82
const healthyPayment =
  financingSource.healthyPayment ??
  financingSource.maxHealthyPayment ??
  financingSource.maximumHealthyPayment ??
  17_500

const fallbackHealthDimensions: Required<HealthMetricSource>[] = [
  { label: "Ingresos", name: "Ingresos", score: 88, value: 88 },
  { label: "Flujo de caja", name: "Flujo de caja", score: 86, value: 86 },
  { label: "Estabilidad", name: "Estabilidad", score: 78, value: 78 },
  { label: "Reserva", name: "Reserva", score: 72, value: 72 },
  { label: "Capacidad de pago", name: "Capacidad de pago", score: 84, value: 84 },
]

const fallbackRecommendations = [
  "Preserva al menos RD$80,000 mientras completas una reserva de tres meses.",
  "Mantén los gastos fijos por debajo del 45% de tus ingresos.",
  "Evalúa financiamiento entre RD$350,000 y RD$450,000.",
  "Compara ubicaciones antes de comprometerte con un alquiler.",
]

const fallbackHistory = [
  { label: "Mar", income: 143_000, expenses: 101_000 },
  { label: "Abr", income: 151_000, expenses: 105_000 },
  { label: "May", income: 158_000, expenses: 103_000 },
  { label: "Jun", income: 169_000, expenses: 107_000 },
  { label: "Jul", income: 177_000, expenses: 108_000 },
  { label: "Ago", income: monthlyIncome, expenses: monthlyExpenses },
]

const history =
  cashSource.history && cashSource.history.length >= 2
    ? cashSource.history.map((item, index) => ({
        label: item.label ?? item.month ?? fallbackHistory[index]?.label ?? `${index + 1}`,
        income: item.income ?? fallbackHistory[index]?.income ?? monthlyIncome,
        expenses: item.expenses ?? fallbackHistory[index]?.expenses ?? monthlyExpenses,
      }))
    : fallbackHistory

const fallbackHorizons: Record<30 | 60 | 90, number> = {
  30: 202_400,
  60: 278_400,
  90: 354_400,
}

const money = new Intl.NumberFormat("es-DO", {
  maximumFractionDigits: 0,
})

function formatMoney(value: number) {
  return `RD$ ${money.format(value)}`
}

function getProjection(days: 30 | 60 | 90) {
  const projection = cashSource.projections?.find((item) => item.days === days)
  return (
    projection?.amount ??
    projection?.balance ??
    projection?.value ??
    fallbackHorizons[days]
  )
}

function Chart() {
  const min = 80_000
  const max = 200_000
  const left = 14
  const right = 330
  const top = 16
  const bottom = 124
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
    <div className="mt-5" role="img" aria-label="Ingresos y gastos de los últimos seis meses">
      <div className="mb-3 flex items-center gap-4 text-[11px] font-semibold text-[#5d6880]">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#1178c7]" />
          Ingresos
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#f59a23]" />
          Gastos
        </span>
      </div>
      <svg
        className="h-auto w-full overflow-visible"
        viewBox="0 0 344 158"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="business-income-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#159ad6" stopOpacity="0.25" />
            <stop offset="1" stopColor="#159ad6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[36, 80, 124].map((y) => (
          <line
            key={y}
            x1="14"
            x2="330"
            y1={y}
            y2={y}
            stroke="#dfe7f1"
            strokeDasharray="3 5"
          />
        ))}
        <polygon points={incomeArea} fill="url(#business-income-area)" />
        <polyline
          points={expensePoints}
          fill="none"
          stroke="#f59a23"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <polyline
          points={incomePoints}
          fill="none"
          stroke="#1178c7"
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
              stroke="#1178c7"
              strokeWidth="2"
            />
            <text
              x={xFor(index)}
              y="151"
              fill="#6d7890"
              fontSize="10"
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

function MetricRow({
  icon,
  label,
  value,
  detail,
  accent = false,
}: {
  icon: React.ReactNode
  label: string
  value: string
  detail: string
  accent?: boolean
}) {
  return (
    <div className="flex min-h-16 items-center gap-3 py-3 first:pt-0 last:pb-0 [&+&]:border-t [&+&]:border-[#e5ebf3]">
      <span
        className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
          accent ? "bg-[#e7f8f4] text-[#168575]" : "bg-[#edf5fb] text-[#07558f]"
        }`}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-medium text-[#667187]">{label}</span>
        <span className="mt-0.5 block text-lg font-bold tracking-[-0.02em] text-[#082c63]">
          {value}
        </span>
      </span>
      <span className="max-w-[76px] text-right text-[10px] leading-4 text-[#758096]">
        {detail}
      </span>
    </div>
  )
}

function CashFlowView({ onShowHealth }: { onShowHealth: () => void }) {
  const [days, setDays] = useState<30 | 60 | 90>(30)
  const projectedBalance = getProjection(days)
  const targetReserve =
    cashSource.reserveGoal ?? cashSource.reserveTarget ?? monthlyExpenses * 3
  const daysToReserve = cashSource.daysToReserveGoal ?? cashSource.daysToTarget ?? 80
  const reserveProgress = Math.min(100, Math.round((cashReserve / targetReserve) * 100))

  return (
    <div className="space-y-4">
      <section className="rounded-[24px] border border-[#e1e8f0] bg-white p-5 shadow-[0_10px_30px_rgba(4,45,96,0.07)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#087cb9]">
              Agosto 2026
            </p>
            <h2 className="mt-1 text-xl font-bold tracking-[-0.03em] text-[#082c63]">
              Tu dinero en movimiento
            </h2>
          </div>
          <span className="flex h-8 shrink-0 items-center gap-1 rounded-full bg-[#e8f7f2] px-2.5 text-xs font-bold text-[#177a6c]">
            <TrendingUp className="size-3.5" aria-hidden="true" />
            +{monthlyGrowth}%
          </span>
        </div>

        <div className="mt-5 rounded-2xl bg-[#f6f9fc] px-4 py-3">
          <MetricRow
            icon={<TrendingUp className="size-5" aria-hidden="true" />}
            label="Ingresos"
            value={formatMoney(monthlyIncome)}
            detail="Entradas del mes"
          />
          <MetricRow
            icon={<Wallet className="size-5" aria-hidden="true" />}
            label="Gastos"
            value={formatMoney(monthlyExpenses)}
            detail="Salidas del mes"
          />
          <MetricRow
            accent
            icon={<PiggyBank className="size-5" aria-hidden="true" />}
            label="Flujo libre"
            value={formatMoney(monthlyFreeCashFlow)}
            detail="Disponible para decidir"
          />
        </div>

        <Chart />
      </section>

      <section className="overflow-hidden rounded-[24px] bg-[linear-gradient(145deg,#063c79,#07599b)] p-5 text-white shadow-[0_12px_28px_rgba(5,55,112,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-white/70">Balance disponible</p>
            <p className="mt-1 text-[28px] font-bold tracking-[-0.04em]">
              {formatMoney(cashReserve)}
            </p>
          </div>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/12">
            <Wallet className="size-5" aria-hidden="true" />
          </span>
        </div>
        <div className="mt-5 flex items-end justify-between text-xs">
          <span className="text-white/75">Meta de reserva · 3 meses</span>
          <span className="font-bold">{reserveProgress}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-[#ffad32]"
            style={{ width: `${reserveProgress}%` }}
          />
        </div>
        <p className="mt-2 text-[11px] leading-4 text-white/65">
          Meta {formatMoney(targetReserve)} · puedes alcanzarla en unos {daysToReserve} días si conservas tu excedente.
        </p>
      </section>

      <section className="rounded-[24px] border border-[#e1e8f0] bg-white p-5 shadow-[0_10px_30px_rgba(4,45,96,0.06)]">
        <div className="flex items-center gap-2">
          <BarChart3 className="size-5 text-[#07558f]" aria-hidden="true" />
          <h2 className="font-bold text-[#082c63]">Así crecería tu caja</h2>
        </div>
        <p className="mt-1 text-xs leading-5 text-[#667187]">
          Proyección si mantienes el flujo libre mensual actual.
        </p>

        <div className="mt-4 grid grid-cols-3 rounded-xl bg-[#eef3f8] p-1" role="group" aria-label="Horizonte de proyección">
          {([30, 60, 90] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={days === option}
              onClick={() => setDays(option)}
              className={`min-h-11 rounded-lg px-2 text-sm font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#f59a23] focus-visible:ring-offset-2 ${
                days === option
                  ? "bg-white text-[#073b77] shadow-sm"
                  : "text-[#6b768b]"
              }`}
            >
              {option} días
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-[#dce8f4] bg-[#f5faff] p-4 text-center" aria-live="polite">
          <p className="text-xs font-medium text-[#667187]">Balance proyectado</p>
          <p className="mt-1 text-[26px] font-bold tracking-[-0.04em] text-[#07558f]">
            {formatMoney(projectedBalance)}
          </p>
          <p className="mt-1 text-[11px] text-[#748096]">
            +{formatMoney(projectedBalance - cashReserve)} frente a hoy
          </p>
        </div>
      </section>

      <aside className="rounded-[20px] border border-[#cde8e2] bg-[#effaf7] p-4">
        <div className="flex gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#d9f2ec] text-[#177a6c]">
            <Lightbulb className="size-[18px]" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-[#0a594f]">Insight de Compás</h3>
            <p className="mt-1 text-xs leading-5 text-[#376b64]">
              {cashSource.insight ??
                `Tu negocio genera ${formatMoney(monthlyFreeCashFlow)} libres al mes. Es una base sólida para crecer sin perder estabilidad.`}
            </p>
          </div>
        </div>
      </aside>

      <aside className="rounded-[20px] border border-[#f3d9b2] bg-[#fff8ed] p-4">
        <div className="flex gap-3">
          <CircleAlert className="mt-0.5 size-5 shrink-0 text-[#d77a0d]" aria-hidden="true" />
          <div>
            <h3 className="text-sm font-bold text-[#8b500d]">Cuida tu reserva</h3>
            <p className="mt-1 text-xs leading-5 text-[#805e32]">
              {cashSource.alert ??
                "Hoy cubres cerca de 1.2 meses de gastos. Completa la meta de tres meses antes de asumir compromisos mayores."}
            </p>
          </div>
        </div>
      </aside>

      <button
        type="button"
        onClick={onShowHealth}
        className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#f7941d] px-5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(247,148,29,0.24)] outline-none transition-transform active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-[#082c63] focus-visible:ring-offset-2 motion-reduce:transition-none"
      >
        Ver salud de mi negocio
        <ArrowRight className="size-[18px]" aria-hidden="true" />
      </button>
    </div>
  )
}

function ScoreRing() {
  return (
    <div className="relative size-36 shrink-0" role="img" aria-label={`Salud financiera: ${healthScore} de 100`}>
      <svg className="size-full -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="50" fill="none" stroke="#e1e9f1" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          pathLength="100"
          stroke="#149b8e"
          strokeDasharray={`${healthScore} ${100 - healthScore}`}
          strokeLinecap="round"
          strokeWidth="10"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[34px] font-bold leading-none tracking-[-0.05em] text-[#082c63]">
          {healthScore}
        </span>
        <span className="mt-1 text-[11px] font-semibold text-[#718096]">de 100</span>
      </div>
    </div>
  )
}

function HealthView({
  onOpenFinancing,
  onGoGrow,
}: Pick<BusinessScreenProps, "onOpenFinancing" | "onGoGrow">) {
  const sourceMetrics = healthSource.dimensions ?? healthSource.metrics
  const dimensions =
    sourceMetrics && sourceMetrics.length >= 5
      ? sourceMetrics.slice(0, 5).map((metric, index) => ({
          label: metric.label ?? metric.name ?? fallbackHealthDimensions[index].label,
          score: metric.score ?? metric.value ?? fallbackHealthDimensions[index].score,
        }))
      : fallbackHealthDimensions.map((metric) => ({
          label: metric.label,
          score: metric.score,
        }))
  const recommendations =
    healthSource.recommendations?.length
      ? healthSource.recommendations.slice(0, 4)
      : fallbackRecommendations

  return (
    <div className="space-y-4">
      <section className="rounded-[24px] border border-[#e1e8f0] bg-white p-5 shadow-[0_10px_30px_rgba(4,45,96,0.07)]">
        <div className="flex flex-col items-center text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#e9f8f4] px-3 py-1.5 text-xs font-bold text-[#14796d]">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Potencial {healthSource.potential ?? profileSource.growthPotential ?? "alto"}
          </span>
          <ScoreRing />
          <h2 className="mt-4 text-xl font-bold tracking-[-0.03em] text-[#082c63]">
            Tu barbería está saludable
          </h2>
          <p className="mt-2 max-w-[292px] text-sm leading-5 text-[#667187]">
            Tienes una operación rentable y capacidad para prepararte para una segunda ubicación.
          </p>
        </div>
      </section>

      <section className="rounded-[24px] border border-[#e1e8f0] bg-white p-5 shadow-[0_10px_30px_rgba(4,45,96,0.06)]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-5 text-[#07558f]" aria-hidden="true" />
          <h2 className="font-bold text-[#082c63]">Tus cinco señales</h2>
        </div>
        <div className="mt-5 space-y-5">
          {dimensions.map((dimension) => {
            const normalizedScore = Math.max(0, Math.min(100, dimension.score))
            return (
              <div key={dimension.label}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-[#243b5a]">{dimension.label}</span>
                  <span className="text-xs font-bold tabular-nums text-[#07558f]">
                    {normalizedScore}/100
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-[#e8eef4]">
                  <div
                    className={`h-full rounded-full ${
                      normalizedScore >= 80 ? "bg-[#149b8e]" : "bg-[#f0a02d]"
                    }`}
                    style={{ width: `${normalizedScore}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="rounded-[24px] border border-[#dce7f2] bg-[#f7fafe] p-5">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="size-5 text-[#148779]" aria-hidden="true" />
          <h2 className="font-bold text-[#082c63]">Próximos pasos recomendados</h2>
        </div>
        <ol className="mt-4 space-y-4">
          {recommendations.map((recommendation, index) => (
            <li key={recommendation} className="flex gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-[#07558f] shadow-sm">
                {index + 1}
              </span>
              <p className="pt-0.5 text-sm leading-5 text-[#4d5c72]">{recommendation}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-[24px] bg-[linear-gradient(145deg,#063c79,#07599b)] p-5 text-white shadow-[0_12px_28px_rgba(5,55,112,0.18)]">
        <div className="flex gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/12">
            <Landmark className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#8ed4f4]">
              Financiamiento responsable
            </p>
            <h2 className="mt-1 text-lg font-bold">Tu flujo permite evaluar opciones</h2>
          </div>
        </div>
        <p className="mt-4 text-sm leading-5 text-white/75">
          Una cuota de hasta {formatMoney(healthyPayment)} al mes protege tu operación actual. La oferta final está sujeta a evaluación del Banco Popular.
        </p>
        <button
          type="button"
          onClick={onOpenFinancing}
          className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#f7941d] px-4 text-sm font-bold text-white outline-none transition-transform active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#07558f] motion-reduce:transition-none"
        >
          Ver precalificación
          <ArrowRight className="size-[18px]" aria-hidden="true" />
        </button>
      </section>

      <button
        type="button"
        onClick={onGoGrow}
        className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border border-[#bdd5e8] bg-white px-5 text-sm font-bold text-[#07558f] outline-none transition-colors hover:bg-[#f3f8fc] focus-visible:ring-2 focus-visible:ring-[#f59a23] focus-visible:ring-offset-2"
      >
        <MapPin className="size-[18px]" aria-hidden="true" />
        Explorar dónde crecer
      </button>
    </div>
  )
}

export function BusinessScreen({
  section,
  onSectionChange,
  onOpenFinancing,
  onGoGrow,
}: BusinessScreenProps) {
  return (
    <div className="min-w-0 bg-[#f3f6f9] pb-6 text-[#172b4d]">
      <header className="bg-[linear-gradient(145deg,#063a78,#0876b5)] px-5 pb-8 pt-[max(1.5rem,env(safe-area-inset-top))] text-white">
        <p className="text-xs font-medium text-white/70">{businessName}</p>
        <h1 className="mt-1 text-[26px] font-bold tracking-[-0.04em]">Mi negocio</h1>
        <p className="mt-1 text-sm text-white/75">Las decisiones de {ownerName.split(" ")[0]}, respaldadas por sus números.</p>
      </header>

      <div className="relative -mt-4 px-4">
        <div
          className="grid grid-cols-2 rounded-2xl border border-[#e0e8f0] bg-white p-1.5 shadow-[0_8px_24px_rgba(4,45,96,0.11)]"
          role="tablist"
          aria-label="Secciones de mi negocio"
        >
          <button
            type="button"
            role="tab"
            aria-selected={section === "cashflow"}
            aria-controls="business-section-panel"
            onClick={() => onSectionChange("cashflow")}
            className={`min-h-11 rounded-xl px-2 text-sm font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#f59a23] ${
              section === "cashflow"
                ? "bg-[#07558f] text-white shadow-sm"
                : "text-[#657188]"
            }`}
          >
            Flujo de caja
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={section === "health"}
            aria-controls="business-section-panel"
            onClick={() => onSectionChange("health")}
            className={`min-h-11 rounded-xl px-2 text-sm font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#f59a23] ${
              section === "health"
                ? "bg-[#07558f] text-white shadow-sm"
                : "text-[#657188]"
            }`}
          >
            Salud
          </button>
        </div>

        <div id="business-section-panel" role="tabpanel" className="mt-4">
          {section === "cashflow" ? (
            <CashFlowView onShowHealth={() => onSectionChange("health")} />
          ) : (
            <HealthView
              onOpenFinancing={onOpenFinancing}
              onGoGrow={onGoGrow}
            />
          )}
        </div>
      </div>
    </div>
  )
}
