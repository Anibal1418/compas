"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Bot, Send, Sparkles, MapPin, ShieldCheck } from "lucide-react"

type Message = {
  id: number
  role: "user" | "ai"
  text: string
  highlight?: { label: string; value: string }[]
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "user",
    text: "¿Puedo abrir un nuevo local en la Zona Universitaria?",
  },
  {
    id: 2,
    role: "ai",
    text: "Ernesto, analicé tus ingresos reales de la barbería. Abrir en la Zona Universitaria con RD$800k es ALTO RIESGO. Te sugerimos la Zona A con RD$500k de inversión.",
    highlight: [
      { label: "Zona Universitaria", value: "RD$800k · Alto riesgo" },
      { label: "Zona A (recomendada)", value: "RD$500k · Sostenible" },
    ],
  },
]

const cannedReply =
  "Basado en tu flujo de caja transaccional real (RD$45,000/mes), mantener la inversión en RD$500,000 protege tu liquidez al 100%. La Zona A ofrece el mejor balance entre tráfico peatonal y competencia moderada."

export function AiCfoChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [thinking, setThinking] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, thinking])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", text }])
    setInput("")
    setThinking(true)
    setTimeout(() => {
      setThinking(false)
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "ai", text: cannedReply }])
    }, 1100)
  }

  return (
    <section
      className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      aria-label="Asistente de finanzas COMPÁS"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-violet/5 px-4 py-3.5">
        <div className="relative flex size-9 items-center justify-center rounded-lg bg-violet text-violet-foreground shadow-[0_0_0_4px_rgba(94,99,219,0.15)]">
          <Bot className="size-5" />
        </div>
        <div className="leading-tight">
          <h2 className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            CFO Virtual
            <Sparkles className="size-3.5 text-violet" />
          </h2>
          <p className="text-xs text-muted-foreground">Asistente financiero con IA</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-violet/10 px-2.5 py-1 text-xs font-medium text-violet">
          <span className="size-1.5 animate-pulse rounded-full bg-violet" />
          En línea
        </span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.map((m) =>
          m.role === "user" ? (
            <div key={m.id} className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-navy px-3.5 py-2.5 text-sm text-navy-foreground">
                {m.text}
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex gap-2.5">
              <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-violet/10 text-violet">
                <Bot className="size-4" />
              </div>
              <div className="max-w-[88%] space-y-2.5">
                <div className="rounded-2xl rounded-tl-sm border border-violet/20 bg-violet/5 px-3.5 py-2.5 text-sm leading-relaxed text-foreground">
                  {m.text}
                </div>
                {m.highlight && (
                  <div className="grid gap-2">
                    {m.highlight.map((h, i) => (
                      <div
                        key={h.label}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs ${
                          i === 0
                            ? "border-orange/30 bg-orange/5 text-foreground"
                            : "border-violet/30 bg-violet/5 text-foreground"
                        }`}
                      >
                        {i === 0 ? (
                          <MapPin className="size-3.5 shrink-0 text-orange" />
                        ) : (
                          <ShieldCheck className="size-3.5 shrink-0 text-violet" />
                        )}
                        <span className="font-medium">{h.label}</span>
                        <span className="ml-auto text-muted-foreground">{h.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ),
        )}

        {thinking && (
          <div className="flex gap-2.5">
            <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-violet/10 text-violet">
              <Bot className="size-4" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-violet/20 bg-violet/5 px-4 py-3">
              <span className="size-2 animate-bounce rounded-full bg-violet [animation-delay:-0.3s]" />
              <span className="size-2 animate-bounce rounded-full bg-violet [animation-delay:-0.15s]" />
              <span className="size-2 animate-bounce rounded-full bg-violet" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-border bg-card p-3">
        <div className="flex items-end gap-2 rounded-xl border border-border bg-background px-3 py-2 focus-within:border-violet focus-within:ring-2 focus-within:ring-violet/20">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Hazle una pregunta a tu Director de Finanzas Virtual..."
            className="flex-1 bg-transparent py-1 text-sm text-foreground outline-none placeholder:text-muted-foreground"
            aria-label="Escribe tu pregunta"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet text-violet-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            aria-label="Enviar pregunta"
          >
            <Send className="size-4" />
          </button>
        </div>
      </form>
    </section>
  )
}
