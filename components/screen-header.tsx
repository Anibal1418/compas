"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

import comerzaLogo from "@/components/Comerza Logo.png"
import compasLogotipo from "@/components/Compas Logotipo.png"

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className="flex items-center gap-2.5"
      aria-label="Comerza con Compás"
      role="img"
    >
      <Image
        src={comerzaLogo}
        alt=""
        className="size-11 shrink-0 rounded-[11px] object-cover"
      />
      <span className="flex min-w-0 flex-col items-start">
        <Image
          src={compasLogotipo}
          alt=""
          className={compact ? "h-auto w-[102px]" : "h-auto w-[118px]"}
        />
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
    <header className="comerza-header safe-top relative overflow-hidden px-5 pb-6">
      <div className="relative flex min-h-11 items-center gap-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="-ml-2 flex size-11 items-center justify-center rounded-lg text-comerza-navy transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-comerza-navy"
            aria-label="Volver"
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
          </button>
        ) : (
          <BrandMark compact />
        )}
        {onBack && eyebrow && <span className="text-xs font-semibold text-comerza-navy/75">{eyebrow}</span>}
        <div className="ml-auto">{action}</div>
      </div>
      <div className="relative mt-5">
        {eyebrow && !onBack && (
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-comerza-navy/70">{eyebrow}</p>
        )}
        <h1
          className="text-[25px] font-bold leading-tight tracking-[-0.025em] text-balance text-comerza-navy outline-none"
          data-screen-title
          tabIndex={-1}
        >
          {title}
        </h1>
        {subtitle && <p className="mt-2 max-w-sm text-sm leading-5 text-comerza-navy/80">{subtitle}</p>}
      </div>
    </header>
  )
}
