"use client"

import type { ReactNode } from "react"
import { ArrowLeft, Compass } from "lucide-react"

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5" aria-label="Compás, una experiencia de App Popular">
      <span className="flex size-10 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/20">
        <Compass className="size-5" strokeWidth={2.2} aria-hidden="true" />
      </span>
      <span className="leading-none">
        <span className="block text-[17px] font-bold tracking-[-0.02em] text-white">Compás</span>
        {!compact && <span className="mt-1 block text-[11px] font-medium text-white/70">Dentro de App Popular</span>}
      </span>
    </div>
  )
}

export function ScreenHeader({
  title,
  eyebrow,
  subtitle,
  onBack,
  action,
}: {
  title: string
  eyebrow?: string
  subtitle?: string
  onBack?: () => void
  action?: ReactNode
}) {
  return (
    <header className="safe-top relative overflow-hidden bg-[linear-gradient(145deg,#00356c_0%,#005993_58%,#0086a2_130%)] px-5 pb-7 text-white">
      <div className="pointer-events-none absolute -right-12 -top-16 size-40 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -right-6 -top-8 size-24 rounded-full border border-white/10" />
      <div className="relative flex min-h-11 items-center gap-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="-ml-2 flex size-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Volver"
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
          </button>
        ) : (
          <BrandMark compact />
        )}
        {onBack && eyebrow && <span className="text-xs font-semibold text-white/70">{eyebrow}</span>}
        <div className="ml-auto">{action}</div>
      </div>
      <div className="relative mt-5">
        {eyebrow && !onBack && (
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/65">{eyebrow}</p>
        )}
        <h1 className="text-[26px] font-bold leading-tight tracking-[-0.035em] text-balance">{title}</h1>
        {subtitle && <p className="mt-2 max-w-sm text-sm leading-5 text-white/80">{subtitle}</p>}
      </div>
    </header>
  )
}
