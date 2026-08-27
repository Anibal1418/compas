"use client"

import { useEffect, useRef, useState } from "react"
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  CircleDollarSign,
  FileCheck2,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react"

import { financingData } from "@/lib/demo-data"

type FinancingScreenProps = {
  onBack?: () => void
}

const currency = new Intl.NumberFormat("es-DO", {
  style: "currency",
  currency: "DOP",
  maximumFractionDigits: 0,
})

export function FinancingScreen({ onBack }: FinancingScreenProps) {
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const launchButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!confirmationOpen) return

    closeButtonRef.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setConfirmationOpen(false)
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [confirmationOpen])

  const closeConfirmation = () => {
    setConfirmationOpen(false)
    window.requestAnimationFrame(() => launchButtonRef.current?.focus())
  }

  return (
    <div className="min-h-full bg-[#f4f7fb] pb-12 text-[#092957]">
      <header className="rounded-b-[2rem] bg-gradient-to-br from-[#073c82] via-[#07529a] to-[#0788b9] px-5 pb-9 pt-[max(1rem,env(safe-area-inset-top))] text-white shadow-[0_16px_40px_rgba(3,51,115,0.2)]">
        <button
          aria-label="Volver a la simulación"
          className="-ml-2 flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-full text-white transition hover:bg-white/10 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
          onClick={onBack}
          type="button"
        >
          <ArrowLeft className="size-5" />
        </button>

        <div className="mt-3 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100">
              Próximo paso
            </p>
            <h1 className="mt-1 text-[1.65rem] font-bold leading-tight">Financiamiento</h1>
            <p className="mt-3 text-sm leading-6 text-blue-50">
              Una referencia responsable basada en el flujo real de la barbería.
            </p>
          </div>
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/14 ring-1 ring-white/20">
            <CircleDollarSign aria-hidden="true" className="size-6" />
          </span>
        </div>
      </header>

      <main className="space-y-5 px-4 pt-5">
        <section className="overflow-hidden rounded-[1.6rem] bg-white shadow-[0_10px_30px_rgba(8,45,99,0.09)] ring-1 ring-[#dbe5f0]">
          <div className="bg-[#fff7e8] px-5 py-3.5 text-center ring-1 ring-inset ring-[#f7dfb3]">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#945800]">
              <Sparkles className="size-4" /> {financingData.status}
            </span>
          </div>

          <div className="p-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#607891]">
              Rango recomendado
            </p>
            <p className="mt-2 text-[1.65rem] font-extrabold leading-tight text-[#082f68]">
              {currency.format(financingData.recommendedMin)}
              <span className="mx-1.5 text-[#9aabbb]">–</span>
              {currency.format(financingData.recommendedMax)}
            </p>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#526d86]">
              La inversión de {currency.format(financingData.investment)} combina
              capital propio con {currency.format(financingData.requestedAmount)} de
              financiamiento.
            </p>

            <div className="mt-5 rounded-2xl bg-[#edf5fd] p-4 text-left ring-1 ring-[#d8e8f8]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold text-[#607891]">Cuota estimada</p>
                  <p className="mt-1 text-xl font-extrabold text-[#0b5aa3]">
                    {currency.format(financingData.estimatedPayment)}
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#70859a]">
                    durante {financingData.term} meses
                  </p>
                </div>
                <div className="h-12 w-px bg-[#ccdeef]" aria-hidden="true" />
                <div className="text-right">
                  <p className="text-[11px] font-semibold text-[#607891]">Máximo saludable</p>
                  <p className="mt-1 text-base font-extrabold text-[#14775b]">
                    {currency.format(financingData.healthyPayment)}
                  </p>
                  <p className="mt-0.5 text-[11px] font-medium text-[#14775b]">Dentro del límite</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[1.6rem] bg-white p-5 shadow-[0_10px_30px_rgba(8,45,99,0.08)] ring-1 ring-[#dbe5f0]">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf3fc] text-[#0b5aa3]">
              <FileCheck2 className="size-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#607891]">
                Evidencias
              </p>
              <h2 className="mt-0.5 text-lg font-bold text-[#082d63]">Lo que respalda el rango</h2>
            </div>
          </div>

          <ul className="mt-5 space-y-3">
            {financingData.evidence.map((evidence) => (
              <li key={evidence} className="flex gap-3 text-sm leading-6 text-[#49657f]">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <span>{evidence}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl bg-[#eef6ff] p-4 ring-1 ring-[#d8e9fb]">
          <div className="flex gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#0b5aa3] text-white">
              <ShieldCheck className="size-4" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-[#12365f]">Precalificación responsable</h2>
              <p className="mt-1.5 text-xs leading-5 text-[#526d86]">
                Esta orientación no constituye una aprobación ni una oferta de crédito.
                {" "}
                {financingData.disclaimer}
              </p>
            </div>
          </div>
        </section>

        <div>
          <button
            ref={launchButtonRef}
            className="flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-xl bg-[#f39200] px-4 text-sm font-bold text-white shadow-[0_8px_20px_rgba(243,146,0,0.28)] transition active:translate-y-px motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#f39200]/35"
            onClick={() => setConfirmationOpen(true)}
            type="button"
          >
            Solicitar evaluación
            <CheckCircle2 className="size-4" />
          </button>
          <p className="mt-3 px-3 text-center text-[11px] leading-5 text-[#70859a]">
            Este prototipo no recopila ni envía datos personales o financieros.
          </p>
        </div>
      </main>

      {confirmationOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-[#001b48]/55 p-0 backdrop-blur-[2px] sm:p-4"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) closeConfirmation()
          }}
        >
          <section
            aria-describedby="financing-confirmation-description"
            aria-labelledby="financing-confirmation-title"
            aria-modal="true"
            className="w-full max-w-[430px] rounded-t-[2rem] bg-white px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 shadow-2xl sm:rounded-[2rem]"
            role="dialog"
          >
            <div aria-hidden="true" className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-[#d5dee8]" />
            <div className="flex justify-end">
              <button
                ref={closeButtonRef}
                aria-label="Cerrar confirmación"
                className="flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-full bg-[#f0f4f8] text-[#315575] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0b6bb8]/25"
                onClick={closeConfirmation}
                type="button"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-[#eaf8f3] text-[#16825f]">
              <CheckCircle2 className="size-8" />
            </div>
            <div className="mt-4 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#16825f]">
                Demostración completada
              </p>
              <h2 id="financing-confirmation-title" className="mt-2 text-xl font-extrabold text-[#082d63]">
                Tu solicitud no fue enviada
              </h2>
              <p
                id="financing-confirmation-description"
                className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#526d86]"
              >
                En una experiencia real, Banco Popular validaría tus datos antes de
                presentar una oferta. Aquí solo mostramos cómo sería ese próximo paso.
              </p>
            </div>

            <div className="mt-5 rounded-2xl bg-[#f4f7fb] p-4 ring-1 ring-[#e0e8f1]">
              <p className="text-xs font-semibold text-[#607891]">Referencia simulada</p>
              <div className="mt-2 flex items-end justify-between gap-4">
                <p className="text-lg font-extrabold text-[#082d63]">
                  {currency.format(financingData.requestedAmount)}
                </p>
                <p className="text-right text-xs font-medium text-[#526d86]">
                  Hasta {financingData.term} meses
                </p>
              </div>
            </div>

            <button
              className="mt-5 min-h-12 w-full touch-manipulation rounded-xl bg-[#0b5aa3] px-4 text-sm font-bold text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0b6bb8]/30"
              onClick={closeConfirmation}
              type="button"
            >
              Entendido
            </button>
          </section>
        </div>
      )}
    </div>
  )
}
