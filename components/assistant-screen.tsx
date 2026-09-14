"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Send, Sparkles } from "lucide-react"

import compasIsotipo from "@/components/Compas Isotipo.png"
import { getAssistantReply, initialChatMessages, suggestedQuestions } from "@/lib/demo-data"
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
    return getAssistantReply(question)
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
    <div className="min-h-full bg-comerza-canvas">
      <ScreenHeader
        title="Habla con Compás"
      />

      <div className="relative -mt-3 rounded-t-[20px] bg-comerza-canvas px-4 pb-5 pt-5">
        {messages.length === 1 && (
          <section className="mb-5" aria-labelledby="suggested-questions-title">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="size-4 text-comerza-orange" aria-hidden="true" />
              <h2 id="suggested-questions-title" className="text-sm font-bold text-primary">Preguntas sugeridas</h2>
            </div>
            <div className="space-y-2">
              {suggestedQuestions.map((prompt) => (
                <button
                  key={prompt.id}
                  type="button"
                  onClick={() => sendMessage(prompt.question)}
                  className="comerza-focus flex min-h-12 w-full items-center gap-3 rounded-xl border border-comerza-border bg-white px-3.5 py-2.5 text-left text-[13px] font-semibold leading-4 text-comerza-navy transition-colors hover:border-comerza-cyan hover:bg-comerza-cyan-soft focus-visible:outline-none"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center" aria-hidden="true">
                    <Image src={compasIsotipo} alt="" className="size-7 object-contain" />
                  </span>
                  <span className="flex-1">{prompt.question}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        <section
          className="space-y-4"
          aria-label="Conversación"
          aria-live="polite"
          aria-relevant="additions text"
          role="log"
        >
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-2.5 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              {message.role === "assistant" && (
                <span className="mt-1 flex size-8 shrink-0 items-center justify-center" aria-hidden="true">
                  <Image src={compasIsotipo} alt="" className="size-8 object-contain" />
                </span>
              )}
              <div
                className={
                  message.role === "user"
                    ? "max-w-[82%] rounded-[18px] rounded-br-md bg-primary px-3.5 py-3 text-sm leading-5 text-white"
                    : "max-w-[86%] rounded-xl rounded-tl-md border border-comerza-border bg-white px-3.5 py-3 text-sm leading-5 text-foreground"
                }
              >
                {message.text}
              </div>
            </div>
          ))}

          {thinking && (
            <div className="flex items-center gap-2.5" role="status" aria-label="Compás está analizando">
              <span className="flex size-8 shrink-0 items-center justify-center" aria-hidden="true">
                <Image src={compasIsotipo} alt="" className="size-8 object-contain" />
              </span>
              <span className="flex items-center gap-1 rounded-xl rounded-tl-md border border-comerza-border bg-white px-4 py-3">
                <span className="size-1.5 animate-bounce rounded-full bg-compas [animation-delay:-0.24s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-compas [animation-delay:-0.12s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-compas" />
              </span>
            </div>
          )}
          <div ref={endRef} />
        </section>

        <form onSubmit={handleSubmit} className="sticky bottom-2 z-10 -mx-1 mt-6 rounded-xl border border-comerza-border bg-white/95 p-2 shadow-[0_5px_18px_rgba(0,46,109,0.12)] backdrop-blur">
          <div className="flex items-center gap-2">
            <label htmlFor="compas-question" className="sr-only">Escribe una pregunta para Compás</label>
            <input
              id="compas-question"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Pregunta sobre tu negocio"
              className="h-11 min-w-0 flex-1 rounded-lg bg-comerza-canvas px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-comerza-cyan/40"
            />
            <button
              type="submit"
              disabled={!input.trim() || thinking}
              className="comerza-primary-action comerza-focus flex size-11 shrink-0 items-center justify-center rounded-lg transition-opacity hover:opacity-90 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Enviar pregunta"
            >
              <Send className="size-4.5" aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
