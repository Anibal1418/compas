"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { TabsNav, type TabId } from "@/components/tabs-nav"
import { AiCfoChat } from "@/components/ai-cfo-chat"
import { ExpansionMap } from "@/components/expansion-map"
import { FinancialHealth } from "@/components/financial-health"
import { ImpactBanner } from "@/components/impact-banner"

export default function Page() {
  const [tab, setTab] = useState<TabId>("dashboard")

  return (
    <div className="min-h-dvh bg-background">
      <DashboardHeader />
      <TabsNav active={tab} onChange={setTab} />

      <main className="mx-auto max-w-[1600px] px-4 py-5 md:px-6">
        {tab === "dashboard" && (
          <div className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <div className="lg:sticky lg:top-[132px] lg:h-[calc(100dvh-152px)]">
                  <AiCfoChat />
                </div>
              </div>
              <div className="lg:col-span-6">
                <ExpansionMap />
              </div>
              <div className="lg:col-span-3">
                <FinancialHealth />
              </div>
            </div>
            <ImpactBanner />
          </div>
        )}

        {tab === "geo" && (
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <ExpansionMap />
            </div>
            <div className="lg:col-span-4">
              <div className="h-[calc(100dvh-172px)] min-h-[520px]">
                <AiCfoChat />
              </div>
            </div>
          </div>
        )}

        {tab === "risk" && (
          <div className="space-y-4">
            <ImpactBanner />
            <div className="grid gap-4 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <ExpansionMap />
              </div>
              <div className="lg:col-span-5">
                <div className="h-[calc(100dvh-172px)] min-h-[520px]">
                  <AiCfoChat />
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "loans" && (
          <div className="mx-auto grid max-w-4xl gap-4 lg:grid-cols-2">
            <FinancialHealth />
            <div className="flex flex-col gap-4">
              <ImpactBanner />
              <div className="min-h-[420px] flex-1">
                <AiCfoChat />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
