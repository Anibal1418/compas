"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Bot, Compass, Send, Sparkles } from "lucide-react"
import { chatPrompts, getChatResponse, initialChatMessages } from "@/lib/demo-data"
import { ScreenHeader } from "@/components/screen-header"

type ChatMessage = {
  id: number
  role: "assistant" | "user"
  text: string
}

const welcomeMessage: ChatMessage = {
  id: 1,
  role: "assistant",
  text: initialChatMessages[0]?.text ?? "Hola, Ernesto. ¿Qué decisión quieres evaluar?",
}

export function AssistantScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage])
  const [input, setInput] = useState("")
  const [thinking, setThinking] = useState(false)
  const messageId = useRef(2)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }, [messages, thinking])

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  function respond(question: string) {
    return getChatResponse(question)
  }

  function sendMessage(text: string) {
    const cleanText = text.trim()
    if (!cleanText || thinking) return

    setMessages((current) => [...current, { id: messageId.current++, role: "user", text: cleanText }])
    setInput("")
    setThinking(true)

    timer.current = setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: messageId.current++, role: "assistant", text: respond(cleanText) },
      ])
      setThinking(false)
    }, 650)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="min-h-full bg-background">
      <ScreenHeader
        eyebrow="Tu guía financiera"
        title="Habla con Compás"
        subtitle="Respuestas simuladas usando la situación actual de tu barbería."
        action={(
          <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1.5 text-[11px] font-semibold text-white">
            <span className="size-1.5 rounded-full bg-[#79e5d2]" />
            Disponible
          </span>
        )}
      />

      <main className="relative -mt-3 rounded-t-[24px] bg-background px-4 pb-5 pt-5">
        {messages.length === 1 && (
          <section className="mb-5" aria-labelledby="suggested-questions-title">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="size-4 text-compas" aria-hidden="true" />
              <h2 id="suggested-questions-title" className="text-sm font-bold text-primary">Preguntas sugeridas</h2>
            </div>
            <div className="space-y-2">
              {chatPrompts.map((prompt) => (
                <button
                  key={prompt.id}
                  type="button"
                  onClick={() => sendMessage(prompt.question)}
                  className="flex min-h-12 w-full items-center gap-3 rounded-2xl border border-border bg-white px-3.5 py-2.5 text-left text-[13px] font-semibold leading-4 text-primary shadow-sm transition-colors hover:border-[#a8c6d9] hover:bg-[#f8fbfd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-compas-soft text-compas">
                    <Compass className="size-4" aria-hidden="true" />
                  </span>
                  <span className="flex-1">{prompt.question}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="space-y-4" aria-label="Conversación" aria-live="polite">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-2.5 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              {message.role === "assistant" && (
                <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-xl bg-compas text-white shadow-sm">
                  <Bot className="size-4" aria-hidden="true" />
                </span>
              )}
              <div
                className={
                  message.role === "user"
                    ? "max-w-[82%] rounded-[18px] rounded-br-md bg-primary px-3.5 py-3 text-sm leading-5 text-white"
                    : "max-w-[86%] rounded-[18px] rounded-tl-md border border-[#cde8eb] bg-white px-3.5 py-3 text-sm leading-5 text-foreground shadow-sm"
                }
              >
                {message.text}
              </div>
            </div>
          ))}

          {thinking && (
            <div className="flex items-center gap-2.5" role="status" aria-label="Compás está analizando">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-compas text-white">
                <Bot className="size-4" aria-hidden="true" />
              </span>
              <span className="flex items-center gap-1 rounded-[18px] rounded-tl-md border border-[#cde8eb] bg-white px-4 py-3 shadow-sm">
                <span className="size-1.5 animate-bounce rounded-full bg-compas [animation-delay:-0.24s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-compas [animation-delay:-0.12s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-compas" />
              </span>
            </div>
          )}
          <div ref={endRef} />
        </section>

        <form onSubmit={handleSubmit} className="sticky bottom-2 z-10 -mx-1 mt-6 rounded-[20px] border border-border bg-white/95 p-2 shadow-[0_8px_28px_rgba(16,38,75,0.14)] backdrop-blur">
          <div className="flex items-center gap-2">
            <label htmlFor="compas-question" className="sr-only">Escribe una pregunta para Compás</label>
            <input
              id="compas-question"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Pregunta sobre tu negocio"
              className="h-11 min-w-0 flex-1 rounded-xl bg-secondary px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30"
            />
            <button
              type="submit"
              disabled={!input.trim() || thinking}
              className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-orange text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Enviar pregunta"
            >
              <Send className="size-4.5" aria-hidden="true" />
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
