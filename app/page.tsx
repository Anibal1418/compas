"use client"

import { useEffect, useState } from "react"

import { AssistantScreen } from "@/components/assistant-screen"
import { BottomNav, type BottomNavId } from "@/components/bottom-nav"
import { BusinessScreen } from "@/components/business-screen"
import { FinancingScreen } from "@/components/financing-screen"
import { FundingGoalScreen } from "@/components/funding-goal-screen"
import { FundingPlanScreen } from "@/components/funding-plan-screen"
import { GrowthScreen } from "@/components/growth-screen"
import { HandoffScreen } from "@/components/handoff-screen"
import { HomeScreen } from "@/components/home-screen"
import { MobileAppShell } from "@/components/mobile-app-shell"
import { SimulationScreen } from "@/components/simulation-screen"
import {
  businessProfile,
  calculateScenarioResult,
  cashFlowData,
  fundingMatches,
  fundingPlans,
  locations,
  type BusinessSection,
  type FundingNeedId,
  type LocationId,
  type ScenarioId,
} from "@/lib/demo-data"

type NonLocationNeedId = Exclude<FundingNeedId, "location">
type DetailScreenId = "funding-plan" | "stress-test" | "financing" | "handoff"
type ScreenId = BottomNavId | DetailScreenId

const screenLabels: Record<ScreenId, string> = {
  home: "Inicio",
  business: "Mi negocio",
  grow: "Oportunidades de crecimiento",
  simulate: "Elegir financiamiento",
  compass: "Habla con Compás",
  "funding-plan": "Configurar caso",
  "stress-test": "Prueba tu financiamiento",
  financing: "Recomendación de producto",
  handoff: "Resumen para evaluación",
}

const initialPrerequisites: Record<NonLocationNeedId, boolean | null> = {
  equipment: null,
  "working-capital": null,
  receivables: null,
}

function getBottomNavActive(screen: ScreenId): BottomNavId | undefined {
  if (screen === "financing" || screen === "handoff") return undefined
  if (screen === "funding-plan" || screen === "stress-test") return "simulate"
  return screen
}

export default function Page() {
  const [screen, setScreen] = useState<ScreenId>("home")
  const [businessSection, setBusinessSection] = useState<BusinessSection>("health")
  const [selectedLocationId, setSelectedLocationId] = useState<LocationId>("los-prados")
  const [selectedScenarioId, setSelectedScenarioId] = useState<ScenarioId>("expected")
  const [selectedNeedId, setSelectedNeedId] = useState<FundingNeedId>("location")
  const [prerequisites, setPrerequisites] = useState(initialPrerequisites)
  const [recurringCardSales, setRecurringCardSales] = useState<boolean | null>(null)

  const selectedLocation = locations.find((location) => location.id === selectedLocationId)!
  const selectedPlan = fundingPlans[selectedNeedId]
  const selectedScenario = calculateScenarioResult(
    selectedNeedId,
    selectedScenarioId,
    selectedLocationId,
  )
  const evaluatedProduct = fundingMatches.find((match) => match.needId === selectedNeedId)!.product
  const projectedCashAt90Days = cashFlowData.projections.find(
    (projection) => projection.days === 90,
  )!.balance
  const bottomNavActive = getBottomNavActive(screen)

  useEffect(() => {
    const content = document.getElementById("compas-app-content")
    content?.scrollTo({ top: 0 })

    const focusFrame = window.requestAnimationFrame(() => {
      content?.querySelector<HTMLElement>("[data-screen-title]")?.focus({ preventScroll: true })
    })
    return () => window.cancelAnimationFrame(focusFrame)
  }, [screen])

  useEffect(() => {
    if (screen === "business") {
      document.getElementById("compas-app-content")?.scrollTo({ top: 0 })
    }
  }, [businessSection, screen])

  function navigate(nextScreen: BottomNavId) {
    if (nextScreen === "business") setBusinessSection("health")
    setScreen(nextScreen)
  }

  function openBusiness(section: BusinessSection) {
    setBusinessSection(section)
    setScreen("business")
  }

  function selectNeed(needId: FundingNeedId) {
    if (needId !== selectedNeedId) setSelectedScenarioId("expected")
    setSelectedNeedId(needId)
  }

  function continueFromGoal() {
    setScreen(selectedNeedId === "location" ? "grow" : "funding-plan")
  }

  function openDetectedLocation() {
    selectNeed("location")
    setScreen("grow")
  }

  function openLocalSimulation() {
    selectNeed("location")
    setScreen("stress-test")
  }

  function openRecommendation() {
    if (!selectedScenario.isSustainable) return
    setScreen("financing")
  }

  function updatePrerequisite(needId: NonLocationNeedId, value: boolean) {
    setPrerequisites((current) => ({ ...current, [needId]: value }))
  }

  const evaluatedContext = selectedNeedId === "location"
    ? selectedLocation.name
    : selectedPlan.shortTitle

  return (
    <MobileAppShell
      contentId="compas-app-content"
      contentLabel="Aplicación Compás"
      bottomNav={
        bottomNavActive ? <BottomNav active={bottomNavActive} onChange={navigate} /> : undefined
      }
    >
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Pantalla: {screenLabels[screen]}
      </p>

      {screen === "home" && (
        <HomeScreen
          onOpenBusiness={openBusiness}
          onOpenGrowth={openDetectedLocation}
          onOpenAssistant={() => setScreen("compass")}
        />
      )}

      {screen === "business" && (
        <BusinessScreen
          activeSection={businessSection}
          onSectionChange={setBusinessSection}
          onOpenGrowth={() => setScreen("simulate")}
          onOpenAssistant={() => setScreen("compass")}
        />
      )}

      {screen === "grow" && (
        <GrowthScreen
          selectedLocationId={selectedLocationId}
          onLocationChange={setSelectedLocationId}
          onSimulate={openLocalSimulation}
          onOpenAssistant={() => setScreen("compass")}
        />
      )}

      {screen === "simulate" && (
        <FundingGoalScreen
          selectedNeedId={selectedNeedId}
          onNeedChange={selectNeed}
          onContinue={continueFromGoal}
        />
      )}

      {screen === "funding-plan" && selectedNeedId !== "location" && (
        <FundingPlanScreen
          needId={selectedNeedId}
          prerequisiteConfirmed={prerequisites[selectedNeedId]}
          recurringCardSales={recurringCardSales}
          onPrerequisiteChange={(value) => updatePrerequisite(selectedNeedId, value)}
          onRecurringCardSalesChange={setRecurringCardSales}
          onBack={() => setScreen("simulate")}
          onSimulate={() => setScreen("stress-test")}
        />
      )}

      {screen === "stress-test" && (
        <SimulationScreen
          selectedNeedId={selectedNeedId}
          selectedLocationId={selectedLocationId}
          selectedScenarioId={selectedScenarioId}
          onScenarioChange={setSelectedScenarioId}
          onBack={() => setScreen(selectedNeedId === "location" ? "grow" : "funding-plan")}
          onRecommendation={openRecommendation}
          onOpenAssistant={() => setScreen("compass")}
        />
      )}

      {screen === "compass" && <AssistantScreen />}

      {screen === "financing" && (
        <FinancingScreen
          needId={selectedNeedId}
          locationId={selectedLocationId}
          scenarioId={selectedScenarioId}
          showAvanceAlternative={recurringCardSales === true}
          onBack={() => setScreen("stress-test")}
          onContinue={() => setScreen("handoff")}
        />
      )}

      {screen === "handoff" && (
        <HandoffScreen
          healthScore={businessProfile.healthScore}
          projectedCash={projectedCashAt90Days}
          planTitle={selectedPlan.title}
          evaluatedContext={evaluatedContext}
          resultMetricLabel={selectedScenario.resultMetricLabel}
          scenarioLabel={selectedScenario.label}
          monthlyFlow={selectedScenario.monthlyFlow}
          productName={evaluatedProduct.name}
          financingAmount={selectedPlan.financingAmount}
          onBack={() => setScreen("financing")}
        />
      )}
    </MobileAppShell>
  )
}
