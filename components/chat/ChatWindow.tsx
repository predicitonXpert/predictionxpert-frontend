'use client'

import { useEffect, useRef, useState } from 'react'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { useChat } from '@/contexts/ChatContext'

export function ChatWindow() {
  const { messages, isStreaming, error, sendMessage, clearMessages, clearError } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const [lang, setLang] = useState<'en' | 'fr'>('en')

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const content = {
    en: {
      title: "PredictionXpert",
      subtitle: "Your sidekick for sports betting.",
      tagline: "Everything about sports betting. Just ask now.",
      clearChat: "Clear chat",
      suggestions: [
        {
          title: "Create a Parlay",
          desc: "Want to build a parlay? Tell me the sport, games you have in mind, or your risk level (safe, medium, long shot).",
          prompt: "I want to create a parlay. Help me build one for tonight's NHL games with medium risk.",
        },
        {
          title: "Analyze My Bet",
          desc: "Paste your bet slip and I'll analyze its value, risk, and whether I'd adjust anything.",
          prompt: "Can you analyze this bet for me? I have Maple Leafs -1.5 and Lakers moneyline.",
        },
        {
          title: "Live Game Help",
          desc: "What live game do you want help with? I'll guide you based on momentum and odds movement.",
          prompt: "What live betting opportunities are there right now in NHL or NBA?",
        },
        {
          title: "Player Props",
          desc: "Want prop ideas? Tell me the sport, bet type, or a player you have in mind.",
          prompt: "Give me some good player prop bets for tonight's NHL games.",
        },
        {
          title: "Learn Something",
          desc: "Want to learn betting concepts, terms, strategies, or how odds work? Ask anything.",
          prompt: "Explain how moneylines and spreads work in simple terms.",
        },
      ],
    },
    fr: {
      title: "PredictionXpert",
      subtitle: "Ton compagnon pour tes paris sportifs.",
      tagline: "Tout sur les paris sportifs. Pose tes questions maintenant.",
      clearChat: "Effacer",
      suggestions: [
        {
          title: "Creer un Parlay",
          desc: "Tu veux construire un parlay? Dis-moi le sport, les matchs ou ton niveau de risque (securitaire, moyen, long shot).",
          prompt: "Je veux creer un parlay. Aide-moi a en construire un pour les matchs NHL ce soir avec un risque moyen.",
        },
        {
          title: "Analyser mon pari",
          desc: "Colle ton billet de pari et je vais analyser sa valeur, son risque et si je ferais des ajustements.",
          prompt: "Peux-tu analyser ce pari? J'ai Maple Leafs -1.5 et Lakers moneyline.",
        },
        {
          title: "Match en direct",
          desc: "Quel match en direct veux-tu que j'analyse? Je t'aide selon le momentum et les mouvements de cotes.",
          prompt: "Quelles opportunites de paris live y a-t-il en ce moment en NHL ou NBA?",
        },
        {
          title: "Paris joueurs",
          desc: "Tu veux des idees de props joueurs? Dis-moi le sport, le type de pari ou les joueurs.",
          prompt: "Donne-moi de bons paris props joueurs pour les matchs NHL ce soir.",
        },
        {
          title: "Apprendre",
          desc: "Tu veux apprendre des concepts, termes, strategies ou comment fonctionnent les cotes? Pose ta question.",
          prompt: "Explique-moi comment les moneylines et les spreads fonctionnent en termes simples.",
        },
      ],
    },
  }

  const t = content[lang]

  return (
    <div className="flex h-full flex-col bg-black">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white">
              {t.title}
            </h2>
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="rounded border border-zinc-700 px-2 py-0.5 text-xs font-medium text-zinc-400 hover:bg-zinc-800"
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </button>
          </div>
          <p className="text-sm text-zinc-500">
            {t.subtitle}
          </p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearMessages}
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-800"
          >
            {t.clearChat}
          </button>
        )}
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-center justify-between bg-red-900/30 px-4 py-2">
          <p className="text-sm text-red-400">{error}</p>
          <button
            onClick={clearError}
            className="text-red-400 hover:text-red-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4"
      >
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-4">
            {/* Icon */}
            <div className="mb-6 rounded-full bg-zinc-900 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>

            {/* Tagline */}
            <p className="mb-8 text-center text-lg font-medium text-zinc-300">
              {t.tagline}
            </p>

            {/* Suggestion Cards */}
            <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
              {t.suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(suggestion.prompt)}
                  disabled={isStreaming}
                  className="group rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-left transition-all hover:border-zinc-700 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <h4 className="mb-1 font-semibold text-white group-hover:text-zinc-100">
                    {suggestion.title}
                  </h4>
                  <p className="text-sm text-zinc-500">
                    {suggestion.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                content={message.content}
                timestamp={message.timestamp}
                isStreaming={message.isStreaming}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <ChatInput
        onSend={sendMessage}
        disabled={isStreaming}
        placeholder={lang === 'en' ? 'Ask about sports betting...' : 'Pose ta question sur les paris sportifs...'}
      />
    </div>
  )
}
