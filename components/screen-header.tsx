"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

import compasLogotipo from "@/components/Compas Logotipo.png"

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className="flex items-center"
      aria-label="Compás"
      role="img"
    >
      <Image
        src={compasLogotipo}
        alt=""
        className={compact ? "h-auto w-[108px]" : "h-auto w-32"}
      />
    </div>
  )
}

export function ScreenHeader({
  title,
  onBack,
  action,
}: {
  title: string
  onBack?: () => void
  action?: ReactNode
}) {
  return (
    <header className="comerza-header safe-top relative overflow-hidden px-5 pb-6">
      <div className="relative flex min-h-11 items-center gap-3">
        <BrandMark compact />
        <div className="ml-auto">{action}</div>
      </div>
      <div className="relative mt-5 flex items-center gap-2">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="-ml-2 flex size-11 shrink-0 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Volver"
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
          </button>
        ) : null}
        <h1
          className="text-[25px] font-bold leading-tight tracking-[-0.025em] text-balance text-white outline-none"
          data-screen-title
          tabIndex={-1}
        >
          {title}
        </h1>
      </div>
    </header>
  )
}
