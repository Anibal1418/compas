"use client"

import { ArrowRight, CircleAlert, Landmark, ShieldCheck, WalletCards } from "lucide-react"

import { DecisionProgress } from "@/components/decision-progress"
import { ScreenHeader } from "@/components/screen-header"
import { formatDop, fundingPlans, type FundingNeedId } from "@/lib/demo-data"
import { cn } from "@/lib/utils"

type FundingPlanScreenProps = {
  needId: Exclude<FundingNeedId, "location">
  prerequisiteConfirmed: boolean | null
  recurringCardSales: boolean | null
  onPrerequisiteChange: (value: boolean) => void
  onRecurringCardSalesChange: (value: boolean) => void
  onBack: () => void
  onSimulate: () => void
}

export function FundingPlanScreen({
  needId,
  prerequisiteConfirmed,
  recurringCardSales,
  onPrerequisiteChange,
  onRecurringCardSalesChange,
  onBack,
  onSimulate,
}: FundingPlanScreenProps) {
  const plan = fundingPlans[needId]
  const needsCardAnswer = needId === "working-capital"
  const canContinue = prerequisiteConfirmed === true && (!needsCardAnswer || recurringCardSales !== null)
  const canAct = prerequisiteConfirmed === false || canContinue

  return (
    <div className="min-h-full bg-comerza-canvas pb-8 text-comerza-navy">
      <ScreenHeader
        eyebrow="Configura el caso"
        title={plan.title}
        subtitle="Revisa los datos de tu plan antes de evaluar su impacto en la caja."
        onBack={onBack}
      />

      <div className="space-y-5 px-4 pt-5">
        <DecisionProgress step={4} label="Configurar" />

        <section className="comerza-card overflow-hidden" aria-labelledby="plan-summary-title">
          <div className="border-b border-comerza-border bg-comerza-cyan-soft p-5">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-comerza-cyan-dark">
              Plan seleccionado
            </p>
            <h2 id="plan-summary-title" className="mt-1 text-xl font-bold">
              {plan.shortTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-comerza-muted">{plan.description}</p>
          </div>
          <dl className="divide-y divide-comerza-border px-5">
            <PlanRow label={plan.totalLabel} value={formatDop(plan.totalInvestment)} />
            {plan.ownContribution > 0 ? (
              <PlanRow label="Aporte propio previsto" value={formatDop(plan.ownContribution)} />
            ) : null}
            <PlanRow label="Financiamiento a evaluar" value={formatDop(plan.financingAmount)} />
            <PlanRow
              label={plan.monthlyCommitmentLabel}
              value={plan.monthlyCommitment > 0 ? formatDop(plan.monthlyCommitment) : "No estimada"}
            />
          </dl>
        </section>

        <ConfirmationQuestion
          label={plan.prerequisiteQuestion ?? "¿Deseas evaluar este caso?"}
          help={plan.prerequisiteHelp}
          value={prerequisiteConfirmed}
          onChange={onPrerequisiteChange}
        />

        {needsCardAnswer ? (
          <ConfirmationQuestion
            label="¿Recibes ventas recurrentes mediante tarjetas?"
            help="Esta información permite identificar si AVANCE puede complementar tu plan."
            value={recurringCardSales}
            onChange={onRecurringCardSalesChange}
          />
        ) : null}

        {prerequisiteConfirmed === false ? (
          <section className="rounded-xl border border-comerza-orange/35 bg-comerza-orange-soft p-4">
            <div className="flex gap-3">
              <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#9a5700]" />
              <div>
                <h2 className="text-sm font-bold">Necesitamos confirmar esta información</h2>
                <p className="mt-1 text-xs leading-5 text-[#65430b]">
                  Para evaluar el plan, confirma primero que esta necesidad corresponde a tu negocio.
                </p>
              </div>
            </div>
          </section>
        ) : null}

        <button
          className="comerza-primary-action comerza-focus flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold disabled:cursor-not-allowed disabled:bg-[#b7c1cb] disabled:shadow-none"
          disabled={!canAct}
          onClick={prerequisiteConfirmed === false ? onBack : onSimulate}
          type="button"
        >
          {prerequisiteConfirmed === false ? "Elige otra necesidad" : "Probar este financiamiento"}
          {canContinue ? <ArrowRight aria-hidden="true" className="size-4" /> : null}
        </button>

        <div className="flex items-start gap-2 rounded-xl border border-comerza-border bg-white p-4 text-xs leading-5 text-comerza-muted">
          <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-comerza-cyan-dark" />
          La reserva mensual ayuda a medir tu capacidad de pago; la cuota final dependerá de la evaluación del producto.
        </div>
      </div>
    </div>
  )
}

function ConfirmationQuestion({
  label,
  help,
  value,
  onChange,
}: {
  label: string
  help?: string
  value: boolean | null
  onChange: (value: boolean) => void
}) {
  return (
    <fieldset className="comerza-card p-4">
      <legend className="sr-only">{label}</legend>
      <p className="text-sm font-bold leading-5 text-comerza-navy">{label}</p>
      {help ? <p className="mt-1 text-xs leading-5 text-comerza-muted">{help}</p> : null}
      <div aria-label={label} className="mt-3 grid grid-cols-2 gap-2" role="radiogroup">
        {[true, false].map((option) => {
          const selected = value === option
          return (
            <button
              key={String(option)}
              aria-checked={selected}
              className={cn(
                "comerza-focus min-h-11 rounded-lg border text-sm font-bold",
                selected
                  ? "border-comerza-cyan bg-comerza-cyan-soft text-comerza-navy"
                  : "border-comerza-border bg-white text-comerza-muted",
              )}
              onClick={() => onChange(option)}
              onKeyDown={(event) => {
                if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
                  event.preventDefault()
                  const group = event.currentTarget.parentElement
                  onChange(!option)
                  requestAnimationFrame(() => {
                    group?.querySelector<HTMLButtonElement>(`[aria-checked="true"]`)
                      ?.focus()
                  })
                }
              }}
              role="radio"
              tabIndex={selected || value === null && option ? 0 : -1}
              type="button"
            >
              {option ? "Sí" : "No"}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

function PlanRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-h-14 items-center gap-3 py-3">
      <dt className="flex min-w-0 flex-1 items-center gap-2 text-xs font-medium text-comerza-muted">
        {label === "Financiamiento a evaluar" ? (
          <Landmark aria-hidden="true" className="size-4 shrink-0 text-comerza-navy" />
        ) : (
          <WalletCards aria-hidden="true" className="size-4 shrink-0 text-comerza-navy" />
        )}
        {label}
      </dt>
      <dd className="text-right text-sm font-bold text-comerza-navy">{value}</dd>
    </div>
  )
}
