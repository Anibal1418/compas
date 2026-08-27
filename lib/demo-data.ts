export type LocationId = "naco" | "los-prados" | "bella-vista"

export type ScenarioId =
  | "base"
  | "sales-down-20"
  | "rent-up-15"
  | "sales-up-15"
  | "additional-employee"

export type RiskLevel = "Bajo" | "Moderado" | "Alto"

export type BusinessSection = "cash-flow" | "health"

export type ChatRole = "user" | "assistant"

export interface BusinessProfile {
  ownerName: string
  firstName: string
  initials: string
  businessName: string
  businessType: string
  city: string
  healthScore: number
  availableBalance: number
  monthlyIncome: number
  monthlyExpenses: number
  monthlyFreeCashFlow: number
  freeCashFlow: number
  monthlyGrowthRate: number
  growthRate: number
  growthPotential: "Alto" | "Medio" | "Bajo"
  healthStatus: "Excelente" | "Saludable" | "Atención"
  availableCash: number
  plannedInvestment: number
  requestedFinancing: number
}

export interface CashFlowMonth {
  month: string
  label: string
  income: number
  expenses: number
  freeCashFlow: number
  value: number
}

export interface CashProjection {
  days: 30 | 60 | 90
  balance: number
  value: number
}

export interface CashFlowData {
  income: number
  expenses: number
  freeCashFlow: number
  availableBalance: number
  growthRate: number
  history: readonly CashFlowMonth[]
  projections: readonly CashProjection[]
  reserveGoal: number
  reserveTarget: number
  reserveCoverageMonths: number
  daysToReserveGoal: number
  daysToTarget: number
  insight: string
  alert: string
}

export interface HealthMetric {
  id: "liquidity" | "income-stability" | "expense-control" | "payment-capacity" | "growth"
  label: string
  score: number
  description: string
}

export interface ExpansionLocation {
  id: LocationId
  name: string
  score: number
  rent: number
  demand: string
  competition: string
  risk: RiskLevel
  description: string
  summary: string
  financialExplanation: string
  financialFit: string
  x: number
  y: number
  mapX: number
  mapY: number
  recommended: boolean
}

export interface SimulationScenario {
  id: ScenarioId
  label: string
  shortLabel: string
  description: string
  score: number
  resilienceScore: number
  cashFlow: number
  monthlyCashFlow: number
  monthlyFlow: number
  flowLabel: string
  status: string
  risk: RiskLevel
  impact: string
  recommendation: string
  summary: string
  detail: string
  tone: "positive" | "warning" | "danger"
  chart: readonly number[]
  chartValues: readonly number[]
  recoveryMonths: number | null
}

export interface FinancingData {
  investment: number
  requestedAmount: number
  referenceAmount: number
  recommendedMin: number
  recommendedMax: number
  healthyPayment: number
  maxHealthyPayment: number
  estimatedPayment: number
  term: number
  termMonths: number
  status: "Precalificación estimada"
  evidence: readonly string[]
  disclaimer: string
}

export interface ChatPrompt {
  id: "expansion" | "location" | "sales-risk" | "financing" | "employee"
  question: string
  response: string
  answer: string
  keywords: readonly string[]
}

export interface ChatMessage {
  id: string
  role: ChatRole
  text: string
}

export const businessProfile: BusinessProfile = {
  ownerName: "Ernesto Matos",
  firstName: "Ernesto",
  initials: "EM",
  businessName: "Barbería Ernesto",
  businessType: "Barbería",
  city: "Santo Domingo",
  healthScore: 82,
  availableBalance: 126_400,
  monthlyIncome: 185_000,
  monthlyExpenses: 109_000,
  monthlyFreeCashFlow: 76_000,
  freeCashFlow: 76_000,
  monthlyGrowthRate: 14.2,
  growthRate: 14.2,
  growthPotential: "Alto",
  healthStatus: "Saludable",
  availableCash: 126_400,
  plannedInvestment: 550_000,
  requestedFinancing: 400_000,
}

export const cashFlowData: CashFlowData = {
  income: businessProfile.monthlyIncome,
  expenses: businessProfile.monthlyExpenses,
  freeCashFlow: businessProfile.monthlyFreeCashFlow,
  availableBalance: businessProfile.availableBalance,
  growthRate: businessProfile.monthlyGrowthRate,
  history: [
    { month: "Mar", label: "Mar", income: 162_000, expenses: 99_000, freeCashFlow: 63_000, value: 63_000 },
    { month: "Abr", label: "Abr", income: 166_000, expenses: 101_000, freeCashFlow: 65_000, value: 65_000 },
    { month: "May", label: "May", income: 170_000, expenses: 103_000, freeCashFlow: 67_000, value: 67_000 },
    { month: "Jun", label: "Jun", income: 175_000, expenses: 105_000, freeCashFlow: 70_000, value: 70_000 },
    { month: "Jul", label: "Jul", income: 180_000, expenses: 107_000, freeCashFlow: 73_000, value: 73_000 },
    { month: "Ago", label: "Ago", income: 185_000, expenses: 109_000, freeCashFlow: 76_000, value: 76_000 },
  ],
  projections: [
    { days: 30, balance: 202_400, value: 202_400 },
    { days: 60, balance: 278_400, value: 278_400 },
    { days: 90, balance: 354_400, value: 354_400 },
  ],
  reserveGoal: 327_000,
  reserveTarget: 327_000,
  reserveCoverageMonths: 3,
  daysToReserveGoal: 80,
  daysToTarget: 80,
  insight:
    "Tus ingresos crecen más rápido que tus gastos. Si mantienes el excedente actual, superarás una reserva de tres meses en unos 80 días.",
  alert:
    "Detectamos una posible reducción temporal de liquidez durante la segunda semana del próximo mes por la reposición de productos e insumos.",
}

export const healthMetrics: readonly HealthMetric[] = [
  {
    id: "liquidity",
    label: "Liquidez",
    score: 85,
    description: "Generas RD$76,000 libres al mes y tienes RD$126,400 disponibles.",
  },
  {
    id: "income-stability",
    label: "Estabilidad de ingresos",
    score: 79,
    description: "Ingresos consistentes durante los últimos seis meses.",
  },
  {
    id: "expense-control",
    label: "Control de gastos",
    score: 76,
    description: "Los gastos se mantienen estables mientras aumentan los ingresos.",
  },
  {
    id: "payment-capacity",
    label: "Capacidad de pago",
    score: 88,
    description: "Una cuota de hasta RD$17,500 protege tu operación mensual.",
  },
  {
    id: "growth",
    label: "Crecimiento",
    score: 84,
    description: "Tus ingresos aumentaron 14.2% en el período analizado.",
  },
]

export const locations: readonly ExpansionLocation[] = [
  {
    id: "naco",
    name: "Naco",
    score: 88,
    rent: 42_000,
    demand: "Muy alta",
    competition: "Alta",
    risk: "Moderado",
    description: "Buen tránsito y alto poder adquisitivo, con presión competitiva y un alquiler exigente.",
    summary: "Buen tránsito y alto poder adquisitivo, con presión competitiva y un alquiler exigente.",
    financialExplanation:
      "El alquiler consumiría cerca del 23% de tus ingresos actuales, por lo que necesitarías captar clientes con rapidez.",
    financialFit:
      "El alquiler consumiría cerca del 23% de tus ingresos actuales, por lo que necesitarías captar clientes con rapidez.",
    x: 31,
    y: 24,
    mapX: 31,
    mapY: 24,
    recommended: false,
  },
  {
    id: "los-prados",
    name: "Los Prados",
    score: 91,
    rent: 31_000,
    demand: "Alta",
    competition: "Media",
    risk: "Bajo",
    description: "La mejor relación entre demanda, competencia y costo para tu segunda barbería.",
    summary: "La mejor relación entre demanda, competencia y costo para tu segunda barbería.",
    financialExplanation:
      "El alquiler equivale a cerca del 17% de tus ingresos actuales y deja margen para una cuota responsable.",
    financialFit:
      "El alquiler equivale a cerca del 17% de tus ingresos actuales y deja margen para una cuota responsable.",
    x: 58,
    y: 47,
    mapX: 58,
    mapY: 47,
    recommended: true,
  },
  {
    id: "bella-vista",
    name: "Bella Vista",
    score: 84,
    rent: 47_000,
    demand: "Alta",
    competition: "Alta",
    risk: "Moderado",
    description: "Mercado atractivo, aunque el alquiler y la competencia reducen el margen inicial.",
    summary: "Mercado atractivo, aunque el alquiler y la competencia reducen el margen inicial.",
    financialExplanation:
      "El local consumiría cerca del 25% de tus ingresos actuales y alargaría la recuperación de la inversión.",
    financialFit:
      "El local consumiría cerca del 25% de tus ingresos actuales y alargaría la recuperación de la inversión.",
    x: 72,
    y: 73,
    mapX: 72,
    mapY: 73,
    recommended: false,
  },
]

export const scenarios: readonly SimulationScenario[] = [
  {
    id: "base",
    label: "Escenario base",
    shortLabel: "Base",
    description: "Operación esperada en Los Prados con alquiler y cuota estimada.",
    score: 82,
    resilienceScore: 82,
    cashFlow: 29_200,
    monthlyCashFlow: 29_200,
    monthlyFlow: 29_200,
    flowLabel: "RD$29,200",
    status: "Sostenible",
    risk: "Bajo",
    impact: "Punto de referencia",
    recommendation: "Puedes avanzar conservando la reserva y una cuota por debajo de RD$17,500.",
    summary: "Operación esperada en Los Prados con alquiler y cuota estimada.",
    detail: "Puedes avanzar conservando la reserva y una cuota por debajo de RD$17,500.",
    tone: "positive",
    chart: [18_000, 22_000, 25_000, 27_000, 28_000, 29_200],
    chartValues: [18_000, 22_000, 25_000, 27_000, 28_000, 29_200],
    recoveryMonths: 19,
  },
  {
    id: "sales-down-20",
    label: "Ventas −20%",
    shortLabel: "Ventas −20%",
    description: "Prueba de estrés si las ventas tardan en despegar.",
    score: 38,
    resilienceScore: 38,
    cashFlow: -7_800,
    monthlyCashFlow: -7_800,
    monthlyFlow: -7_800,
    flowLabel: "−RD$7,800",
    status: "Déficit mensual",
    risk: "Alto",
    impact: "−RD$37,000 frente al escenario base",
    recommendation: "No abras sin ampliar la reserva o reducir el monto financiado.",
    summary: "Prueba de estrés si las ventas tardan en despegar.",
    detail: "No abras sin ampliar la reserva o reducir el monto financiado.",
    tone: "danger",
    chart: [-2_000, -4_000, -5_500, -6_500, -7_200, -7_800],
    chartValues: [-2_000, -4_000, -5_500, -6_500, -7_200, -7_800],
    recoveryMonths: null,
  },
  {
    id: "rent-up-15",
    label: "Alquiler +15%",
    shortLabel: "Alquiler +15%",
    description: "El alquiler de Los Prados aumenta de RD$31,000 a RD$35,650.",
    score: 70,
    resilienceScore: 70,
    cashFlow: 24_550,
    monthlyCashFlow: 24_550,
    monthlyFlow: 24_550,
    flowLabel: "RD$24,550",
    status: "Margen reducido",
    risk: "Moderado",
    impact: "−RD$4,650 frente al escenario base",
    recommendation: "Negocia un contrato con ajuste gradual antes de firmar.",
    summary: "El alquiler de Los Prados aumenta de RD$31,000 a RD$35,650.",
    detail: "Negocia un contrato con ajuste gradual antes de firmar.",
    tone: "warning",
    chart: [16_000, 19_000, 21_000, 22_500, 23_800, 24_550],
    chartValues: [16_000, 19_000, 21_000, 22_500, 23_800, 24_550],
    recoveryMonths: 22,
  },
  {
    id: "sales-up-15",
    label: "Ventas +15%",
    shortLabel: "Ventas +15%",
    description: "La nueva ubicación supera la expectativa inicial de ventas.",
    score: 94,
    resilienceScore: 94,
    cashFlow: 56_950,
    monthlyCashFlow: 56_950,
    monthlyFlow: 56_950,
    flowLabel: "RD$56,950",
    status: "Favorable",
    risk: "Bajo",
    impact: "+RD$27,750 frente al escenario base",
    recommendation: "Reinvierte parte del excedente y mantén intacta la reserva operativa.",
    summary: "La nueva ubicación supera la expectativa inicial de ventas.",
    detail: "Reinvierte parte del excedente y mantén intacta la reserva operativa.",
    tone: "positive",
    chart: [34_000, 39_000, 45_000, 50_000, 54_000, 56_950],
    chartValues: [34_000, 39_000, 45_000, 50_000, 54_000, 56_950],
    recoveryMonths: 10,
  },
  {
    id: "additional-employee",
    label: "Empleado adicional",
    shortLabel: "+1 empleado",
    description: "Añade un costo mensual estimado de RD$28,000.",
    score: 55,
    resilienceScore: 55,
    cashFlow: 1_200,
    monthlyCashFlow: 1_200,
    monthlyFlow: 1_200,
    flowLabel: "RD$1,200",
    status: "Colchón mínimo",
    risk: "Moderado",
    impact: "−RD$28,000 frente al escenario base",
    recommendation: "Espera dos meses de operación antes de contratar para validar la demanda real.",
    summary: "Añade un costo mensual estimado de RD$28,000.",
    detail: "Espera dos meses de operación antes de contratar para validar la demanda real.",
    tone: "warning",
    chart: [200, 400, 600, 800, 1_000, 1_200],
    chartValues: [200, 400, 600, 800, 1_000, 1_200],
    recoveryMonths: null,
  },
]

export const financingData: FinancingData = {
  investment: businessProfile.plannedInvestment,
  requestedAmount: businessProfile.requestedFinancing,
  referenceAmount: businessProfile.requestedFinancing,
  recommendedMin: 350_000,
  recommendedMax: 450_000,
  healthyPayment: 17_500,
  maxHealthyPayment: 17_500,
  estimatedPayment: 15_800,
  term: 36,
  termMonths: 36,
  status: "Precalificación estimada",
  evidence: [
    "Ingresos mensuales observados de RD$185,000",
    "Flujo libre mensual de RD$76,000",
    "Crecimiento reciente de 14.2%",
    "Salud financiera de 82/100",
  ],
  disclaimer: "Precalificación informativa, sujeta a evaluación del Banco Popular.",
}

export const chatPrompts: readonly ChatPrompt[] = [
  {
    id: "expansion",
    question: "¿Puedo abrir una segunda barbería?",
    response:
      "Sí, Ernesto. Tu flujo libre de RD$76,000 y tu salud de 82/100 respaldan una expansión gradual. Conserva la reserva y prioriza Los Prados.",
    answer:
      "Sí, Ernesto. Tu flujo libre de RD$76,000 y tu salud de 82/100 respaldan una expansión gradual. Conserva la reserva y prioriza Los Prados.",
    keywords: ["abrir", "segunda", "expandir", "expansion", "crecer", "nuevo local"],
  },
  {
    id: "location",
    question: "¿Cuál ubicación me conviene?",
    response:
      "Los Prados obtiene 91/100: combina demanda alta, competencia media y un alquiler de RD$31,000, cerca del 17% de tus ingresos actuales.",
    answer:
      "Los Prados obtiene 91/100: combina demanda alta, competencia media y un alquiler de RD$31,000, cerca del 17% de tus ingresos actuales.",
    keywords: ["ubicacion", "zona", "prados", "naco", "bella vista", "donde"],
  },
  {
    id: "sales-risk",
    question: "¿Qué pasa si las ventas bajan 20%?",
    response:
      "Con ventas 20% menores tendrías un déficit aproximado de RD$7,800 al mes. Es un escenario de riesgo alto: conviene ampliar la reserva antes de abrir.",
    answer:
      "Con ventas 20% menores tendrías un déficit aproximado de RD$7,800 al mes. Es un escenario de riesgo alto: conviene ampliar la reserva antes de abrir.",
    keywords: ["ventas", "bajan", "bajar", "20", "riesgo", "deficit"],
  },
  {
    id: "financing",
    question: "¿Cuánto financiamiento es saludable?",
    response:
      "El rango responsable estimado es RD$350,000–RD$450,000, con una cuota máxima saludable de RD$17,500. Está sujeto a evaluación del Banco Popular.",
    answer:
      "El rango responsable estimado es RD$350,000–RD$450,000, con una cuota máxima saludable de RD$17,500. Está sujeto a evaluación del Banco Popular.",
    keywords: ["financiamiento", "prestamo", "credito", "cuota", "banco", "financiar"],
  },
  {
    id: "employee",
    question: "¿Puedo contratar otro empleado?",
    response:
      "Un empleado de RD$28,000 dejaría solo RD$1,200 de colchón mensual en la nueva operación. Espera dos meses para confirmar la demanda.",
    answer:
      "Un empleado de RD$28,000 dejaría solo RD$1,200 de colchón mensual en la nueva operación. Espera dos meses para confirmar la demanda.",
    keywords: ["empleado", "contratar", "barbero", "personal", "nomina"],
  },
]

export const initialChatMessages: readonly ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    text: "Hola, Ernesto. Soy Compás. Puedo ayudarte a entender el flujo de tu barbería y evaluar tu próxima expansión.",
  },
]

const fallbackChatResponse =
  "Puedo orientarte sobre tu flujo de caja, la salud de la barbería, ubicaciones, escenarios de riesgo y financiamiento. Elige una sugerencia o incluye uno de esos temas en tu pregunta."

function normalizeForMatching(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
}

export function getChatResponse(input: string): string {
  const normalizedInput = normalizeForMatching(input)
  const match = chatPrompts.find((prompt) =>
    prompt.keywords.some((keyword) => normalizedInput.includes(normalizeForMatching(keyword))),
  )

  return match?.response ?? fallbackChatResponse
}

export function formatDop(value: number): string {
  const sign = value < 0 ? "−" : ""
  return `${sign}RD$${Math.abs(Math.round(value)).toLocaleString("en-US")}`
}
