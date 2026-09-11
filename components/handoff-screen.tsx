"use client"

import { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  FileCheck2,
  Landmark,
  ShieldCheck,
  TrendingUp,
  X,
} from "lucide-react"

import { DecisionProgress } from "@/components/decision-progress"
import { ScreenHeader } from "@/components/screen-header"
import { formatDop } from "@/lib/demo-data"

type HandoffScreenProps = {
  healthScore: number
  projectedCash: number
  planTitle: string
  evaluatedContext: string
  resultMetricLabel: string
  scenarioLabel: string
  monthlyFlow: number
  productName: string
  financingAmount: number
  onBack: () => void
}

const focusableSelector = [
  "button:not([disabled])",
  "[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",")

export function HandoffScreen({
  healthScore,
  projectedCash,
  planTitle,
  evaluatedContext,
  resultMetricLabel,
  scenarioLabel,
  monthlyFlow,
  productName,
  financingAmount,
  onBack,
}: HandoffScreenProps) {
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const launchButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!confirmationOpen) return

    const background = contentRef.current
    background?.setAttribute("inert", "")
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus())

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        setConfirmationOpen(false)
        return
      }

      if (event.key !== "Tab") return
      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
      ).filter((element) => !element.hasAttribute("disabled"))
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.removeEventListener("keydown", handleKeyDown)
      background?.removeAttribute("inert")
      window.requestAnimationFrame(() => launchButtonRef.current?.focus())
    }
  }, [confirmationOpen])

  return (
    <div className="min-h-full bg-comerza-canvas text-comerza-navy">
      <div ref={contentRef} aria-hidden={confirmationOpen || undefined}>
        <ScreenHeader
          eyebrow="Resumen para evaluación"
          title="Compás preparó tu resumen"
          subtitle="Revisa los datos de tu plan antes de enviar la solicitud."
          onBack={onBack}
        />

        <div className="space-y-5 px-4 pb-10 pt-5">
          <DecisionProgress step={7} label="Solicitar" />

          <section className="comerza-card overflow-hidden">
            <div className="flex items-center gap-3 border-b border-comerza-cyan/25 bg-comerza-cyan-soft px-5 py-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-comerza-cyan text-comerza-navy">
                <FileCheck2 aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-comerza-muted">
                  Listo para revisar
                </p>
                <h2 className="mt-1 text-lg font-extrabold text-comerza-navy">
                  {planTitle}
                </h2>
              </div>
            </div>

            <dl className="divide-y divide-comerza-border px-5">
              <SummaryRow
                icon={ShieldCheck}
                label="Salud del negocio"
                value={`${healthScore}/100`}
                detail="Señal observada"
              />
              <SummaryRow
                icon={TrendingUp}
                label="Caja proyectada a 90 días"
                value={formatDop(projectedCash)}
                detail="Proyección de Compás"
              />
              <SummaryRow
                icon={BriefcaseBusiness}
                label="Plan evaluado"
                value={evaluatedContext}
                detail={`${scenarioLabel}: ${formatDop(monthlyFlow)} · ${resultMetricLabel.toLowerCase()}`}
              />
              <SummaryRow
                icon={Landmark}
                label="Producto recomendado"
                value={productName}
                detail={`${formatDop(financingAmount)} a evaluar`}
              />
            </dl>
          </section>

          <section className="rounded-xl border border-comerza-orange/35 bg-comerza-orange-soft p-4">
            <div className="flex gap-3">
              <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#9a5b00]" />
              <div>
                <h2 className="text-sm font-bold text-[#714500]">Antes de continuar</h2>
                <p className="mt-1.5 text-xs leading-5 text-[#6c5738]">
                  Confirma que el producto, el monto y los datos del plan correspondan a lo que
                  necesita tu negocio.
                </p>
              </div>
            </div>
          </section>

          <div>
            <button
              ref={launchButtonRef}
              className="comerza-primary-action comerza-focus flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition active:translate-y-px motion-reduce:transition-none focus-visible:outline-none"
              onClick={() => setConfirmationOpen(true)}
              type="button"
            >
              Solicitar evaluación de Banco Popular
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
            <p className="mt-3 px-2 text-center text-xs leading-5 text-comerza-muted">
              Banco Popular revisará estos datos como parte de la evaluación de tu solicitud.
            </p>
          </div>
        </div>
      </div>

      {confirmationOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-[#001b48]/60 backdrop-blur-[2px] sm:p-4"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setConfirmationOpen(false)
          }}
        >
          <div
            ref={dialogRef}
            aria-describedby="handoff-confirmation-description"
            aria-labelledby="handoff-confirmation-title"
            aria-modal="true"
            className="w-full max-w-[430px] rounded-t-2xl bg-white px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 shadow-2xl sm:rounded-2xl"
            role="dialog"
          >
            <div aria-hidden="true" className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-[#d5dee8]" />
            <div className="flex justify-end">
              <button
                ref={closeButtonRef}
                aria-label="Cerrar confirmación"
                className="comerza-focus flex size-11 touch-manipulation items-center justify-center rounded-full bg-comerza-canvas text-comerza-navy focus-visible:outline-none"
                onClick={() => setConfirmationOpen(false)}
                type="button"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>

            <div className="mx-auto flex size-16 items-center justify-center rounded-xl bg-comerza-cyan-soft text-comerza-cyan-dark">
              <CheckCircle2 aria-hidden="true" className="size-8" />
            </div>
            <div className="mt-4 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-comerza-cyan-dark">
                Solicitud registrada
              </p>
              <h2 id="handoff-confirmation-title" className="mt-2 text-xl font-extrabold text-comerza-navy">
                Solicitud recibida
              </h2>
              <p
                id="handoff-confirmation-description"
                className="mx-auto mt-3 max-w-sm text-sm leading-6 text-comerza-muted"
              >
                Banco Popular revisará la información de tu negocio y te contactará para
                continuar con el proceso.
              </p>
            </div>

            <div className="mt-5 rounded-xl bg-comerza-canvas p-4 text-center ring-1 ring-comerza-border">
              <p className="text-xs font-semibold text-comerza-muted">Resumen de la solicitud</p>
              <p className="mt-1 text-lg font-extrabold text-comerza-navy">
                {productName} · {formatDop(financingAmount)}
              </p>
            </div>

            <button
              className="comerza-primary-action comerza-focus mt-5 min-h-12 w-full touch-manipulation rounded-xl px-4 text-sm font-bold focus-visible:outline-none"
              onClick={() => setConfirmationOpen(false)}
              type="button"
            >
              Volver a mi resumen
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function SummaryRow({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof ShieldCheck
  label: string
  value: string
  detail: string
}) {
  return (
    <div className="flex items-center gap-3 py-4">
      <dt className="flex min-w-0 flex-1 items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-comerza-cyan-soft text-comerza-cyan-dark">
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <span className="min-w-0">
          <span className="block text-xs font-semibold text-comerza-muted">{label}</span>
          <span className="mt-0.5 block text-xs leading-5 text-comerza-muted">{detail}</span>
        </span>
      </dt>
      <dd className="max-w-[46%] text-right text-sm font-extrabold leading-5 text-comerza-navy">
        {value}
      </dd>
    </div>
  )
}
