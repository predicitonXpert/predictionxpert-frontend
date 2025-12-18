'use client'

import { useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { useChat } from '@/contexts/ChatContext'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'

// Quick actions - simple user messages that trigger AI guidance
const SUGGESTIONS_FR = [
  {
    title: 'Créer un parlay',
    userMessage: "Je veux créer un parlay",
  },
  {
    title: 'Analyser mon pari',
    userMessage: "Je veux faire analyser mon pari",
  },
  {
    title: 'Match en direct',
    userMessage: "J'ai besoin d'aide pour un match en direct",
  },
  {
    title: 'Paris joueurs',
    userMessage: "Je cherche des idées de paris joueurs",
  },
  {
    title: 'Apprendre quelque chose',
    userMessage: "Je veux apprendre sur les paris sportifs",
  },
]

const SUGGESTIONS_EN = [
  {
    title: 'Create a Parlay',
    userMessage: "I want to create a parlay",
  },
  {
    title: 'Analyze My Bet',
    userMessage: "I want to analyze my bet",
  },
  {
    title: 'Live Game Help',
    userMessage: "I need help with a live game",
  },
  {
    title: 'Player Props',
    userMessage: "I'm looking for player prop ideas",
  },
  {
    title: 'Learn Something',
    userMessage: "I want to learn about sports betting",
  },
]

export function ChatWindow() {
  const { messages, isStreaming, error, sendMessage, clearMessages, clearError } = useChat()
  const { isPro } = useAuth()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { lang } = useLanguage()
  
  const SUGGESTIONS = lang === 'fr' ? SUGGESTIONS_FR : SUGGESTIONS_EN
  const chatPlaceholder = lang === 'fr' 
    ? 'Tout sur les paris sportifs. Pose tes questions maintenant.'
    : 'Everything about sports betting. Just ask now.'
  
  const texts = {
    fr: {
      free: 'Gratuit',
      upgradeToPro: 'Passer Pro',
      clear: 'Effacer',
    },
    en: {
      free: 'Free',
      upgradeToPro: 'Upgrade to Pro',
      clear: 'Clear',
    },
  }
  
  const t = texts[lang]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSuggestionClick = (userMessage: string) => {
    sendMessage(userMessage)
  }

  return (
    <div className="flex h-full min-h-[600px] flex-col rounded-xl md:rounded-2xl border-2 md:border-4 border-zinc-300 bg-zinc-50 shadow-lg md:shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-zinc-300 bg-zinc-100 px-3 md:px-4 py-2 md:py-3">
        <div className="flex items-center gap-3">
          {!isPro && (
            <div className="flex items-center gap-1.5 md:gap-2 rounded-lg bg-yellow-100 border border-yellow-300 px-2 md:px-3 py-1 md:py-1.5">
              <span className="text-xs font-medium text-yellow-800">{t.free}</span>
              <Link
                href="/dashboard/pricing"
                className="text-xs font-semibold text-yellow-700 hover:text-yellow-900 underline"
              >
                {t.upgradeToPro}
              </Link>
            </div>
          )}
        </div>
        {messages.length > 0 && (
            <button
            onClick={clearMessages}
            className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            {t.clear}
          </button>
        )}
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-center justify-between bg-red-100 border-b-2 border-red-300 px-4 py-2">
          <p className="text-sm text-red-700">{error}</p>
          <button onClick={clearError} className="text-red-600 hover:text-red-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-zinc-50 p-3 md:p-6 pt-4 pb-4 md:pt-6 md:pb-6 space-y-4 md:space-y-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center">
            <div className="mb-4 md:mb-6 rounded-full bg-zinc-200 p-2 md:p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-10 md:w-10 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="mb-6 md:mb-8 text-center text-sm md:text-lg text-zinc-800 font-medium px-4">
              {chatPlaceholder}
            </p>
            <div className="grid w-full max-w-2xl gap-3 md:gap-4 sm:grid-cols-2 px-4">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(s.userMessage)}
                  disabled={isStreaming}
                  className="rounded-xl border-2 border-zinc-300 bg-white p-3 md:p-4 text-left transition-all hover:border-zinc-400 hover:bg-zinc-50 hover:shadow-lg hover:shadow-zinc-300/50 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <h4 className="font-semibold text-sm md:text-base text-zinc-900">
                    {s.title}
                  </h4>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                role={msg.role}
                content={msg.content}
                timestamp={msg.timestamp}
                isStreaming={msg.isStreaming}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input with Disclaimer */}
      <div className="border-t-2 border-zinc-300 bg-zinc-100 p-3 md:p-4">
        <ChatInput onSend={sendMessage} disabled={isStreaming} placeholder={chatPlaceholder} />
        <p className="mt-1.5 md:mt-2 text-[10px] md:text-xs text-zinc-600 text-center leading-tight px-2">
          {lang === 'fr' 
            ? 'Le chat peut se tromper. Aucun résultat n\'est garanti. Les paris sportifs comportent des risques. 18+ Canada / 21+ USA. Assure-toi de respecter les lois de ta région. Jouez de façon responsable.'
            : 'The chat may make errors. No results are guaranteed. Sports betting involves risks. 18+ Canada / 21+ USA. Make sure to comply with your region\'s laws. Play responsibly.'}
        </p>
      </div>
    </div>
  )
}
