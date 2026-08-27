"use client"

import { useEffect, useState } from "react"
import { AssistantScreen } from "@/components/assistant-screen"
import { BottomNav, type BottomNavId } from "@/components/bottom-nav"
import { BusinessScreen, type BusinessSection } from "@/components/business-screen"
import { FinancingScreen } from "@/components/financing-screen"
import { GrowthScreen } from "@/components/growth-screen"
import { HomeScreen } from "@/components/home-screen"
import { MobileAppShell } from "@/components/mobile-app-shell"
import { SimulationScreen } from "@/components/simulation-screen"

type ScreenId = BottomNavId | "financing"

export default function Page() {
  const [screen, setScreen] = useState<ScreenId>("home")
  const [businessSection, setBusinessSection] = useState<BusinessSection>("cashflow")
  const [financingReturnScreen, setFinancingReturnScreen] = useState<BottomNavId>("simulate")

  useEffect(() => {
    document.getElementById("compas-app-content")?.scrollTo({ top: 0, behavior: "smooth" })
  }, [screen, businessSection])

  function navigate(nextScreen: BottomNavId) {
    setScreen(nextScreen)
  }

  function openBusiness(section: BusinessSection) {
    setBusinessSection(section)
    setScreen("business")
  }

  function openFinancing(from: BottomNavId) {
    setFinancingReturnScreen(from)
    setScreen("financing")
  }

  return (
    <MobileAppShell
      contentId="compas-app-content"
      contentLabel="Aplicación Compás"
      bottomNav={
        screen !== "financing" ? (
          <BottomNav active={screen} onChange={navigate} />
        ) : undefined
      }
    >
      {screen === "home" && (
        <HomeScreen
          onOpenCashFlow={() => openBusiness("cashflow")}
          onOpenHealth={() => openBusiness("health")}
          onOpenGrow={() => navigate("grow")}
          onOpenSimulate={() => navigate("simulate")}
          onOpenAssistant={() => navigate("compass")}
        />
      )}

      {screen === "business" && (
        <BusinessScreen
          section={businessSection}
          onSectionChange={setBusinessSection}
          onOpenFinancing={() => openFinancing("business")}
          onGoGrow={() => navigate("grow")}
        />
      )}

      {screen === "grow" && <GrowthScreen onSimulate={() => navigate("simulate")} />}

      {screen === "simulate" && (
        <SimulationScreen onFinancing={() => openFinancing("simulate")} />
      )}

      {screen === "compass" && <AssistantScreen />}

      {screen === "financing" && (
        <FinancingScreen onBack={() => setScreen(financingReturnScreen)} />
      )}
    </MobileAppShell>
  )
}
