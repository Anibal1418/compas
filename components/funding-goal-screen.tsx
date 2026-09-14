"use client"

import { useRef, type KeyboardEvent } from "react"
import {
  ArrowRight,
  Building2,
  PackageOpen,
  ReceiptText,
  WalletCards,
} from "lucide-react"

import { DecisionProgress } from "@/components/decision-progress"
import { ScreenHeader } from "@/components/screen-header"
import {
  fundingMatches,
  fundingPlans,
  type FundingNeedId,
} from "@/lib/demo-data"
import { cn } from "@/lib/utils"

type FundingGoalScreenProps = {
  selectedNeedId: FundingNeedId
  onNeedChange: (needId: FundingNeedId) => void
  onContinue: () => void
}

const needIcons = {
  location: Building2,
  equipment: PackageOpen,
  "working-capital": WalletCards,
  receivables: ReceiptText,
} satisfies Record<FundingNeedId, typeof Building2>

export function FundingGoalScreen({
  selectedNeedId,
  onNeedChange,
  onContinue,
}: FundingGoalScreenProps) {
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([])
  const selectedPlan = fundingPlans[selectedNeedId]

  function moveSelection(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | undefined
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % fundingMatches.length
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + fundingMatches.length) % fundingMatches.length
    } else if (event.key === "Home") {
      nextIndex = 0
    } else if (event.key === "End") {
      nextIndex = fundingMatches.length - 1
    }

    if (nextIndex === undefined) return
    event.preventDefault()
    onNeedChange(fundingMatches[nextIndex].needId)
    requestAnimationFrame(() => optionRefs.current[nextIndex]?.focus())
  }

  return (
    <div className="min-h-full bg-comerza-canvas pb-8 text-comerza-navy">
      <ScreenHeader
        title="¿Qué quieres financiar?"
      />

      <div className="space-y-5 px-4 pt-5">
        <DecisionProgress step={4} label="Elegir" />

        <div
          aria-label="Necesidad que deseas evaluar"
          className="space-y-3"
          role="radiogroup"
        >
          {fundingMatches.map((match, index) => {
            const Icon = needIcons[match.needId]
            const plan = fundingPlans[match.needId]
            const selected = match.needId === selectedNeedId

            return (
              <button
                key={match.needId}
                ref={(node) => {
                  optionRefs.current[index] = node
                }}
                aria-checked={selected}
                className={cn(
                  "comerza-focus flex min-h-[88px] w-full items-start gap-3 rounded-xl border bg-white p-4 text-left transition-colors",
                  selected
                    ? "border-comerza-cyan bg-white ring-1 ring-comerza-cyan"
                    : "border-comerza-border hover:border-comerza-cyan",
                )}
                onClick={() => onNeedChange(match.needId)}
                onKeyDown={(event) => moveSelection(event, index)}
                role="radio"
                tabIndex={selected ? 0 : -1}
                type="button"
              >
                <span className="comerza-icon-action flex size-11 shrink-0 items-center justify-center rounded-xl">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold">{plan.shortTitle}</span>
                  <span className="mt-1 block text-xs leading-5 text-comerza-muted">
                    {plan.description}
                  </span>
                  <span className="mt-2 block text-xs font-bold text-comerza-cyan-dark">
                    {match.product.name}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1 size-4 rounded-full border-2",
                    selected ? "border-[5px] border-comerza-cyan" : "border-[#9dafbf]",
                  )}
                />
              </button>
            )
          })}
        </div>

        <button
          className="comerza-primary-action comerza-focus flex min-h-12 w-full items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold"
          onClick={onContinue}
          type="button"
        >
          Continuar con {selectedPlan.shortTitle.toLowerCase()}
          <ArrowRight aria-hidden="true" className="size-4" />
        </button>

        <p className="px-2 text-center text-xs leading-5 text-comerza-muted">
          Elige el objetivo que mejor responda a la necesidad actual de tu negocio.
        </p>
      </div>
    </div>
  )
}
