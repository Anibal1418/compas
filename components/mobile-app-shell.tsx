import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export interface MobileAppShellProps {
  children: ReactNode
  header?: ReactNode
  bottomNav?: ReactNode
  className?: string
  contentClassName?: string
  contentId?: string
  contentLabel?: string
}

export function MobileAppShell({
  children,
  header,
  bottomNav,
  className,
  contentClassName,
  contentId = "app-content",
  contentLabel = "Contenido principal",
}: MobileAppShellProps) {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center overflow-hidden bg-[#e8edf5] min-[431px]:p-4">
      <div
        className={cn(
          "relative flex h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-[#f5f7fb]",
          "min-[431px]:h-[calc(100dvh-2rem)] min-[431px]:max-h-[932px] min-[431px]:rounded-[2rem]",
          "min-[431px]:border min-[431px]:border-white/80 min-[431px]:shadow-[0_24px_70px_rgba(2,51,115,0.18)]",
          className,
        )}
        data-mobile-app-shell
      >
        {header ? <div className="z-20 shrink-0">{header}</div> : null}

        <main
          id={contentId}
          aria-label={contentLabel}
          className={cn(
            "min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain scroll-smooth",
            "motion-reduce:scroll-auto",
            contentClassName,
          )}
        >
          {children}
        </main>

        {bottomNav ? <div className="z-30 shrink-0">{bottomNav}</div> : null}
      </div>
    </div>
  )
}
