export type BusinessSection = "health" | "cashflow" | "readiness"

export type LocationId = "naco" | "los-prados" | "bella-vista"

export type ScenarioId =
  | "expected"
  | "sales-down-10"
  | "costs-up-15"
  | "sales-down-20"
  | "equipment-maintenance"
  | "working-capital-extended"
  | "receivables-delay"

export type FundingNeedId =
  | "location"
  | "equipment"
  | "working-capital"
  | "receivables"

export type FinancialProductId =
  | "commercial-loan"
  | "financial-leasing"
  | "crediflex-popular"
  | "factoring-with-recourse"
  | "avance"

export type RiskLevel = "Bajo" | "Moderado" | "Alto"
export type ResultTone = "positive" | "warning" | "danger"
export type ChatRole = "user" | "assistant"

export interface BusinessProfile {
  ownerName: string
  firstName: string
  initials: string
  businessName: string
  businessType: string
  city: string
  healthScore: number
  healthStatus: "Saludable"
  availableCash: number
  monthlyIncome: number
  monthlyExpenses: number
  freeCashFlow: number
  growthRate: number
  growthPotential: "Alto"
}

export interface CashFlowMonth {
  label: string
  income: number
  expenses: number
  freeCashFlow: number
}

export interface CashProjection {
  days: 30 | 60 | 90
  balance: number
}

export interface CashFlowData {
  history: readonly CashFlowMonth[]
  projections: readonly CashProjection[]
  reserveTarget: number
  reserveCoverageMonths: number
  daysToTarget: number
  insight: string
  alert: string
}

export interface HealthMetric {
  id:
    | "liquidity"
    | "income-stability"
    | "expense-control"
    | "payment-capacity"
    | "growth"
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
  compatibility: "Alta" | "Media"
  summary: string
  financialExplanation: string
  mapX: number
  mapY: number
  recommended: boolean
}

export interface FinancialReadiness {
  status: "Favorable"
  rangeMin: number
  rangeMax: number
  maxHealthyPayment: number
  summary: string
  disclaimer: string
}

export interface FundingPlan {
  needId: FundingNeedId
  title: string
  shortTitle: string
  description: string
  totalLabel: string
  totalInvestment: number
  ownContribution: number
  financingAmount: number
  monthlyCommitment: number
  monthlyCommitmentLabel: string
  prerequisiteQuestion?: string
  prerequisiteHelp?: string
  resultMetricLabel: string
}

export interface ScenarioDefinition {
  id: ScenarioId
  label: string
  shortLabel: string
  description: string
  incomeFactor: number
  expenseFactor: number
  additionalCashOutflow: number
}

export interface ScenarioResult {
  id: ScenarioId
  label: string
  needId: FundingNeedId
  locationId?: LocationId
  monthlyIncome: number
  monthlyExpenses: number
  fixedMonthlyCost: number
  monthlyCommitment: number
  resultMetricLabel: string
  monthlyFlow: number
  resilienceScore: number
  status: "Saludable" | "Sostenible con precaución" | "No sostenible"
  risk: RiskLevel
  tone: ResultTone
  impact: string
  impactAmount: number
  recommendation: string
  chartValues: readonly number[]
  isSustainable: boolean
}

export interface FinancialProduct {
  id: FinancialProductId
  name: string
  summary: string
  fit: string
}

export interface FundingAlternative {
  product: FinancialProduct
  explanation: string
  validationNote: string
}

export interface FundingMatch {
  needId: FundingNeedId
  label: string
  product: FinancialProduct
  explanation: string
  alternative?: FundingAlternative
}

export interface SuggestedQuestion {
  id:
    | "readiness"
    | "capacity"
    | "second-location"
    | "product"
    | "sales-drop"
    | "equipment"
  question: string
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
  healthStatus: "Saludable",
  availableCash: 126_400,
  monthlyIncome: 185_000,
  monthlyExpenses: 109_000,
  freeCashFlow: 76_000,
  growthRate: 14.2,
  growthPotential: "Alto",
}

export const cashFlowData: CashFlowData = {
  history: [
    { label: "Mar", income: 162_000, expenses: 99_000, freeCashFlow: 63_000 },
    { label: "Abr", income: 166_000, expenses: 101_000, freeCashFlow: 65_000 },
    { label: "May", income: 170_000, expenses: 103_000, freeCashFlow: 67_000 },
    { label: "Jun", income: 175_000, expenses: 105_000, freeCashFlow: 70_000 },
    { label: "Jul", income: 180_000, expenses: 107_000, freeCashFlow: 73_000 },
    { label: "Ago", income: 185_000, expenses: 109_000, freeCashFlow: 76_000 },
  ],
  projections: [
    { days: 30, balance: 202_400 },
    { days: 60, balance: 278_400 },
    { days: 90, balance: 354_400 },
  ],
  reserveTarget: 327_000,
  reserveCoverageMonths: 3,
  daysToTarget: 80,
  insight:
    "Tus ingresos crecen más rápido que tus gastos. Si conservas el excedente actual, alcanzarás una reserva de tres meses en aproximadamente 80 días.",
  alert:
    "La reposición de productos e insumos puede reducir temporalmente la liquidez durante la segunda semana del próximo mes.",
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
    description: "Los ingresos han sido consistentes durante los últimos seis meses.",
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
    description: "Una cuota de hasta RD$17,500 protege la operación mensual.",
  },
  {
    id: "growth",
    label: "Crecimiento",
    score: 84,
    description: "Los ingresos aumentaron 14.2% en el período analizado.",
  },
]

const locationById: Record<LocationId, ExpansionLocation> = {
  naco: {
    id: "naco",
    name: "Naco",
    score: 88,
    rent: 42_000,
    demand: "Muy alta",
    competition: "Alta",
    risk: "Moderado",
    compatibility: "Media",
    summary:
      "Buen tránsito y alto poder adquisitivo, con presión competitiva y un alquiler exigente.",
    financialExplanation:
      "El alquiler representa cerca del 23% de los ingresos actuales y reduce el margen disponible para la cuota.",
    mapX: 31,
    mapY: 24,
    recommended: false,
  },
  "los-prados": {
    id: "los-prados",
    name: "Los Prados",
    score: 91,
    rent: 31_000,
    demand: "Alta",
    competition: "Media",
    risk: "Bajo",
    compatibility: "Alta",
    summary:
      "La mejor relación entre demanda, competencia y costo para una segunda barbería.",
    financialExplanation:
      "El alquiler representa cerca del 17% de los ingresos actuales y conserva margen para una cuota responsable.",
    mapX: 58,
    mapY: 47,
    recommended: true,
  },
  "bella-vista": {
    id: "bella-vista",
    name: "Bella Vista",
    score: 84,
    rent: 47_000,
    demand: "Alta",
    competition: "Alta",
    risk: "Moderado",
    compatibility: "Media",
    summary:
      "Mercado atractivo, aunque el alquiler y la competencia reducen el margen inicial.",
    financialExplanation:
      "El alquiler representa cerca del 25% de los ingresos actuales y exige validar mejor la demanda antes de avanzar.",
    mapX: 72,
    mapY: 73,
    recommended: false,
  },
}

export const locations: readonly ExpansionLocation[] = [
  locationById.naco,
  locationById["los-prados"],
  locationById["bella-vista"],
]

export const financialReadiness: FinancialReadiness = {
  status: "Favorable",
  rangeMin: 350_000,
  rangeMax: 450_000,
  maxHealthyPayment: 17_500,
  summary:
    "La salud de 82/100 y el flujo proyectado permiten evaluar el plan sin comprometer el margen operativo esperado.",
  disclaimer:
    "Sujeto a evaluación y aprobación de Banco Popular.",
}

export const fundingPlans: Record<FundingNeedId, FundingPlan> = {
  location: {
    needId: "location",
    title: "Abrir una segunda barbería",
    shortTitle: "Abrir local",
    description: "Evalúa ubicación, alquiler y capacidad para sostener una segunda barbería.",
    totalLabel: "Inversión estimada",
    totalInvestment: 550_000,
    ownContribution: 150_000,
    financingAmount: 400_000,
    monthlyCommitment: 15_800,
    monthlyCommitmentLabel: "Cuota estimada",
    resultMetricLabel: "Flujo mensual estimado",
  },
  equipment: {
    needId: "equipment",
    title: "Comprar equipos de barbería",
    shortTitle: "Comprar equipos",
    description: "Prueba un paquete de sillones, herramientas y equipos para fortalecer la operación.",
    totalLabel: "Equipos estimados",
    totalInvestment: 220_000,
    ownContribution: 40_000,
    financingAmount: 180_000,
    monthlyCommitment: 9_000,
    monthlyCommitmentLabel: "Reserva mensual",
    prerequisiteQuestion: "¿Los equipos que deseas adquirir están identificados?",
    prerequisiteHelp: "El paquete de equipos identificado tiene un valor de RD$220,000.",
    resultMetricLabel: "Flujo mensual estimado",
  },
  "working-capital": {
    needId: "working-capital",
    title: "Fortalecer el capital de trabajo",
    shortTitle: "Capital de trabajo",
    description: "Evalúa un colchón temporal para inventario, nómina y gastos operativos.",
    totalLabel: "Colchón operativo",
    totalInvestment: 180_000,
    ownContribution: 0,
    financingAmount: 180_000,
    monthlyCommitment: 9_000,
    monthlyCommitmentLabel: "Reserva mensual",
    prerequisiteQuestion: "¿La necesidad está vinculada a gastos temporales de la operación?",
    prerequisiteHelp: "La necesidad operativa temporal definida es de RD$180,000.",
    resultMetricLabel: "Flujo mensual estimado",
  },
  receivables: {
    needId: "receivables",
    title: "Convertir facturas por cobrar en liquidez",
    shortTitle: "Facturas por cobrar",
    description: "Evalúa el efecto de anticipar liquidez sobre facturas comerciales pendientes.",
    totalLabel: "Cartera por cobrar",
    totalInvestment: 160_000,
    ownContribution: 0,
    financingAmount: 120_000,
    monthlyCommitment: 0,
    monthlyCommitmentLabel: "Cuota por definir",
    prerequisiteQuestion: "¿Tu negocio tiene facturas emitidas pendientes de cobro?",
    prerequisiteHelp: "Tu cartera por cobrar es de RD$160,000 y buscas disponer de RD$120,000.",
    resultMetricLabel: "Colchón de caja del mes",
  },
}

const scenarioById: Record<ScenarioId, ScenarioDefinition> = {
  expected: {
    id: "expected",
    label: "Esperado",
    shortLabel: "Esperado",
    description: "Mantiene el nivel observado de ingresos y costos operativos.",
    incomeFactor: 1,
    expenseFactor: 1,
    additionalCashOutflow: 0,
  },
  "sales-down-10": {
    id: "sales-down-10",
    label: "Ventas −10%",
    shortLabel: "Ventas −10%",
    description: "Prueba una caída moderada de los ingresos mensuales.",
    incomeFactor: 0.9,
    expenseFactor: 1,
    additionalCashOutflow: 0,
  },
  "costs-up-15": {
    id: "costs-up-15",
    label: "Costos operativos +15%",
    shortLabel: "Costos +15%",
    description: "Aumenta 15% los costos operativos actuales de RD$109,000.",
    incomeFactor: 1,
    expenseFactor: 1.15,
    additionalCashOutflow: 0,
  },
  "sales-down-20": {
    id: "sales-down-20",
    label: "Ventas −20%",
    shortLabel: "Ventas −20%",
    description: "Somete el plan a una caída fuerte de los ingresos mensuales.",
    incomeFactor: 0.8,
    expenseFactor: 1,
    additionalCashOutflow: 0,
  },
  "equipment-maintenance": {
    id: "equipment-maintenance",
    label: "Mantenimiento adicional",
    shortLabel: "Mantenimiento",
    description: "Añade RD$12,000 de mantenimiento e instalación durante el mes.",
    incomeFactor: 1,
    expenseFactor: 1,
    additionalCashOutflow: 12_000,
  },
  "working-capital-extended": {
    id: "working-capital-extended",
    label: "Necesidad por un mes más",
    shortLabel: "Un mes adicional",
    description: "Prueba un uso operativo adicional de RD$30,000 durante el mes.",
    incomeFactor: 1,
    expenseFactor: 1,
    additionalCashOutflow: 30_000,
  },
  "receivables-delay": {
    id: "receivables-delay",
    label: "25% de la cartera se retrasa",
    shortLabel: "Cobro retrasado",
    description: "Reduce RD$40,000 del colchón del mes por retrasos de cobro.",
    incomeFactor: 1,
    expenseFactor: 1,
    additionalCashOutflow: 40_000,
  },
}

const scenarioIdsByNeed: Record<FundingNeedId, readonly ScenarioId[]> = {
  location: ["expected", "sales-down-10", "costs-up-15", "sales-down-20"],
  equipment: ["expected", "sales-down-10", "equipment-maintenance", "sales-down-20"],
  "working-capital": ["expected", "sales-down-10", "working-capital-extended", "sales-down-20"],
  receivables: ["expected", "sales-down-10", "receivables-delay", "sales-down-20"],
}

export function getScenarioDefinitions(needId: FundingNeedId): readonly ScenarioDefinition[] {
  return scenarioIdsByNeed[needId].map((id) => scenarioById[id])
}

const financialProducts: Record<FinancialProductId, FinancialProduct> = {
  "commercial-loan": {
    id: "commercial-loan",
    name: "Préstamo Comercial",
    summary: "Financiamiento para necesidades e iniciativas de desarrollo del negocio.",
    fit:
      "Se ajusta a la inversión definida para abrir el local, con un monto y una cuota alineados al plan.",
  },
  "financial-leasing": {
    id: "financial-leasing",
    name: "Leasing Financiero",
    summary: "Arrendamiento financiero para adquirir bienes que apoyen la operación.",
    fit:
      "Se ajusta a la compra de equipos identificables que fortalecerán la operación de la barbería.",
  },
  "crediflex-popular": {
    id: "crediflex-popular",
    name: "Crediflex Popular",
    summary: "Línea de crédito revolvente vinculada a una cuenta corriente.",
    fit:
      "Se ajusta a necesidades variables de capital de trabajo y liquidez operativa.",
  },
  "factoring-with-recourse": {
    id: "factoring-with-recourse",
    name: "Factoring con Recursos",
    summary: "Alternativa para convertir cuentas por cobrar del negocio en liquidez.",
    fit:
      "Se ajusta a negocios que venden a crédito y mantienen facturas pendientes de cobro.",
  },
  avance: {
    id: "avance",
    name: "AVANCE",
    summary: "Opción para comercios con ventas recurrentes por tarjetas.",
    fit:
      "Puede complementar tu capital de trabajo cuando mantienes ventas recurrentes por tarjetas.",
  },
}

export const fundingMatches: readonly FundingMatch[] = [
  {
    needId: "location",
    label: "Abrir local",
    product: financialProducts["commercial-loan"],
    explanation:
      "El Préstamo Comercial es la opción que mejor se ajusta al plan de la ubicación seleccionada y a los resultados de las cuatro pruebas.",
  },
  {
    needId: "equipment",
    label: "Comprar equipos de barbería",
    product: financialProducts["financial-leasing"],
    explanation:
      "El Leasing Financiero es la opción que mejor se ajusta al paquete de equipos y a los resultados de las cuatro pruebas.",
  },
  {
    needId: "working-capital",
    label: "Capital de trabajo",
    product: financialProducts["crediflex-popular"],
    explanation:
      "Crediflex Popular es la opción que mejor se ajusta al colchón operativo y a los resultados de las cuatro pruebas.",
    alternative: {
      product: financialProducts.avance,
      explanation:
        "AVANCE se presenta como alternativa contextual cuando existen ventas recurrentes por tarjetas.",
      validationNote:
        "Banco Popular confirmará su disponibilidad y las condiciones aplicables a tu negocio.",
    },
  },
  {
    needId: "receivables",
    label: "Facturas por cobrar",
    product: financialProducts["factoring-with-recourse"],
    explanation:
      "Factoring con Recursos es la opción que mejor se ajusta a la necesidad de liquidez y a los resultados de las cuatro pruebas.",
  },
]

function createChartValues(monthlyFlow: number): readonly number[] {
  const factors =
    monthlyFlow >= 0
      ? [0.55, 0.68, 0.79, 0.87, 0.94, 1]
      : [0.22, 0.4, 0.58, 0.74, 0.88, 1]
  return factors.map((factor) => Math.round(monthlyFlow * factor))
}

function getResilienceScore(monthlyFlow: number): number {
  if (monthlyFlow < 0) {
    return Math.max(20, Math.round(38 + monthlyFlow / 975))
  }

  if (monthlyFlow < financialReadiness.maxHealthyPayment) {
    return Math.round(55 + monthlyFlow / 1_500)
  }

  return Math.min(95, Math.round(70 + monthlyFlow / 2_433))
}

function getRecommendation(
  needId: FundingNeedId,
  scenarioId: ScenarioId,
  planTitle: string,
  monthlyFlow: number,
): string {
  if (monthlyFlow < 0) {
    return `No avances con ${planTitle.toLowerCase()} bajo este escenario. Reduce el monto o fortalece la reserva antes de reevaluar.`
  }

  if (scenarioId === "sales-down-10") {
    return "El plan conserva flujo positivo, pero conviene monitorear las ventas y proteger la reserva durante los primeros meses."
  }

  if (scenarioId === "sales-down-20") {
    return "Incluso con una caída fuerte de ventas el flujo permanece positivo; conserva la reserva y revisa el desempeño cada mes."
  }

  if (scenarioId !== "expected") {
    return `El caso conserva flujo positivo ante la prueba específica de ${fundingPlans[needId].shortTitle.toLowerCase()}; valida los supuestos antes de avanzar.`
  }

  return "El plan mantiene un margen saludable después de los compromisos mensuales considerados."
}

export function calculateScenarioResult(
  needId: FundingNeedId,
  scenarioId: ScenarioId,
  locationId: LocationId = "los-prados",
): ScenarioResult {
  const plan = fundingPlans[needId]
  const availableScenarios = scenarioIdsByNeed[needId]
  const normalizedScenarioId = availableScenarios.includes(scenarioId) ? scenarioId : "expected"
  const location = needId === "location" ? locationById[locationId] : undefined
  const scenario = scenarioById[normalizedScenarioId]
  const monthlyIncome = Math.round(
    businessProfile.monthlyIncome * scenario.incomeFactor,
  )
  const monthlyExpenses = Math.round(
    businessProfile.monthlyExpenses * scenario.expenseFactor,
  )
  const monthlyFlow =
    monthlyIncome -
    monthlyExpenses -
    (location?.rent ?? 0) -
    plan.monthlyCommitment -
    scenario.additionalCashOutflow
  const expectedFlow =
    businessProfile.monthlyIncome -
    businessProfile.monthlyExpenses -
    (location?.rent ?? 0) -
    plan.monthlyCommitment
  const impactAmount = monthlyFlow - expectedFlow
  const isSustainable = monthlyFlow >= 0
  const isHealthy = monthlyFlow >= financialReadiness.maxHealthyPayment
  const status = isHealthy
    ? "Saludable"
    : isSustainable
      ? "Sostenible con precaución"
      : "No sostenible"
  const risk: RiskLevel = isHealthy ? "Bajo" : isSustainable ? "Moderado" : "Alto"
  const tone: ResultTone = isHealthy ? "positive" : isSustainable ? "warning" : "danger"

  return {
    id: scenario.id,
    label: scenario.label,
    needId,
    locationId: location?.id,
    monthlyIncome,
    monthlyExpenses,
    fixedMonthlyCost: location?.rent ?? 0,
    monthlyCommitment: plan.monthlyCommitment,
    resultMetricLabel: plan.resultMetricLabel,
    monthlyFlow,
    resilienceScore: getResilienceScore(monthlyFlow),
    status,
    risk,
    tone,
    impact:
      impactAmount === 0
        ? "Punto de referencia"
        : `${formatDop(impactAmount)} frente al escenario esperado`,
    impactAmount,
    recommendation: getRecommendation(needId, scenario.id, plan.title, monthlyFlow),
    chartValues: createChartValues(monthlyFlow),
    isSustainable,
  }
}

export const suggestedQuestions: readonly SuggestedQuestion[] = [
  {
    id: "readiness",
    question: "¿Estoy preparado para financiar el crecimiento?",
    answer:
      "Tu preparación es favorable: la salud es 82/100 y la caja proyectada llega a RD$354,400 en 90 días. Puedes avanzar a evaluar el financiamiento que necesita tu negocio.",
    keywords: ["preparado", "preparacion", "listo", "favorable", "evaluar"],
  },
  {
    id: "capacity",
    question: "¿Cuál es mi capacidad mensual?",
    answer:
      "La cuota máxima saludable estimada es RD$17,500 al mes. El plan usa RD$15,800 para conservar margen operativo.",
    keywords: ["capacidad", "cuota", "mensual", "pagar", "pago"],
  },
  {
    id: "second-location",
    question: "¿Dónde conviene abrir la segunda ubicación?",
    answer:
      "Los Prados obtiene 91/100 y compatibilidad alta. Su alquiler de RD$31,000 representa cerca del 17% de tus ingresos actuales.",
    keywords: ["segunda", "ubicacion", "local", "zona", "prados", "naco", "bella vista"],
  },
  {
    id: "product",
    question: "¿Qué producto encaja con el nuevo local?",
    answer:
      "Para abrir el local, Compás recomienda un Préstamo Comercial por RD$400,000. La solicitud estará sujeta a evaluación y aprobación de Banco Popular.",
    keywords: ["producto", "prestamo", "financiamiento", "financiar", "credito"],
  },
  {
    id: "sales-drop",
    question: "¿Qué pasa si bajan las ventas?",
    answer:
      "Con ventas 10% menores quedarían RD$10,700 mensuales y el plan sería sostenible con precaución. Con una caída de 20% habría un déficit de RD$7,800, así que Compás detendría la solicitud.",
    keywords: ["ventas", "bajan", "caida", "10", "20", "riesgo", "deficit"],
  },
  {
    id: "equipment",
    question: "¿Y si quiero comprar equipos de barbería?",
    answer:
      "Para comprar equipos de barbería, Compás recomienda Leasing Financiero. Evaluaremos el valor de los equipos y la capacidad mensual del negocio para definir el monto.",
    keywords: ["equipos", "equipo", "maquinas", "sillones", "leasing"],
  },
]

export const initialChatMessages: readonly ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    text: "Hola, Ernesto. Soy Compás. Puedo explicarte tu preparación, capacidad mensual y las pruebas del plan para Los Prados.",
  },
]

const fallbackAssistantReply =
  "Puedo orientarte sobre preparación financiera, capacidad mensual, la segunda ubicación, productos, caídas de ventas o compra de equipos."

function normalizeForMatching(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
}

export function getAssistantReply(input: string): string {
  const normalizedInput = normalizeForMatching(input)
  const exactMatch = suggestedQuestions.find(
    (item) => normalizeForMatching(item.question) === normalizedInput,
  )

  if (exactMatch) return exactMatch.answer

  const topicPriority: readonly SuggestedQuestion["id"][] = [
    "equipment",
    "sales-drop",
    "capacity",
    "readiness",
    "product",
    "second-location",
  ]
  const match = topicPriority
    .map((id) => suggestedQuestions.find((item) => item.id === id)!)
    .find((item) =>
      item.keywords.some((keyword) =>
        normalizedInput.includes(normalizeForMatching(keyword)),
      ),
    )

  return match?.answer ?? fallbackAssistantReply
}

export function formatDop(value: number): string {
  const sign = value < 0 ? "−" : ""
  return `${sign}RD$${Math.abs(Math.round(value)).toLocaleString("en-US")}`
}
