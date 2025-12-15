'use client'

import { useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { useChat } from '@/contexts/ChatContext'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'

// Mock function to check if user is Pro - replace with actual logic
function useIsPro() {
  const { user } = useAuth()
  // TODO: Replace with actual subscription check
  return false // For now, assume user is not Pro
}

// Quick actions - titles only, with intro messages that the agent will write
const SUGGESTIONS_FR = [
  {
    title: 'Créer un parlay',
    introMessage: "Tu veux construire un parlay ? Dis-moi quel sport ou quelle ligue (NHL, NBA, NFL, etc.). Dis-moi aussi les matchs que tu as déjà en tête. Ou dis-moi quel niveau de risque tu veux (sécuritaire, moyen ou long shot).",
  },
  {
    title: 'Analyser mon pari',
    introMessage: "Écris moi ton billet de pari et je vais analyser sa valeur, son risque, si ça fait du sens et si je fais des ajustements.",
  },
  {
    title: 'Match en direct',
    introMessage: "Quel match en direct veux-tu que j'analyse en ce moment ? Je vais t'aider selon le momentum, les mouvements de côtes et les fenêtres de paris live.",
  },
  {
    title: 'Paris joueurs',
    introMessage: "Tu veux des idées de props joueurs ? Dis-moi le sport, le type de pari ou les joueurs que tu as en tête.",
  },
  {
    title: 'Apprendre quelque chose',
    introMessage: "Tu veux apprendre un terme, une stratégie, un concept ou comprendre comment fonctionnent certains paris ? Pose ta question.",
  },
]

const SUGGESTIONS_EN = [
  {
    title: 'Create a Parlay',
    introMessage: "Want to build a parlay? Tell me which sport or league (NHL, NBA, NFL, etc.). Tell me which games you already have in mind. Or tell me what type of risk you want (safe, medium, long shot).",
  },
  {
    title: 'Analyze My Bet',
    introMessage: "Paste your bet slip and I'll analyze its value, risk, what makes sense, and whether I'd adjust anything.",
  },
  {
    title: 'Live Game Help',
    introMessage: "What live game do you want help with right now? I'll guide you based on momentum, odds movement, and live betting windows.",
  },
  {
    title: 'Player Props',
    introMessage: "Want prop ideas? Tell me the sport, the type of bet, or a player you have in mind.",
  },
  {
    title: 'Learn Something',
    introMessage: "Want to learn betting concepts, terms, strategies, or how odds work? Ask anything.",
  },
]

export function ChatWindow() {
  const { messages, isStreaming, error, sendMessage, clearMessages, clearError } = useChat()
  const isPro = useIsPro()
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

  const handleSuggestionClick = (introMessage: string) => {
    // Send the intro message that the agent will write
    sendMessage(introMessage)
  }

  return (
    <div className="flex h-full min-h-[600px] flex-col rounded-2xl border-4 border-zinc-300 bg-zinc-50 shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-zinc-300 bg-zinc-100 px-4 py-3">
        <div className="flex items-center gap-3">
          {!isPro && (
            <div className="flex items-center gap-2 rounded-lg bg-yellow-100 border border-yellow-300 px-3 py-1.5">
              <span className="text-xs font-medium text-yellow-800">{t.free}</span>
              <Link
                href="/#pricing"
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
            className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
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
      <div className="flex-1 overflow-y-auto bg-zinc-50 p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center">
            <div className="mb-6 rounded-full bg-zinc-200 p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="mb-8 text-center text-lg text-zinc-800 font-medium">
              {chatPlaceholder}
            </p>
            <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(s.introMessage)}
                  disabled={isStreaming}
                  className="rounded-xl border-2 border-zinc-300 bg-white p-4 text-left transition-all hover:border-zinc-400 hover:bg-zinc-50 hover:shadow-lg hover:shadow-zinc-300/50 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <h4 className="font-semibold text-zinc-900">
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
      <div className="border-t-2 border-zinc-300 bg-zinc-100 p-4">
        <ChatInput onSend={sendMessage} disabled={isStreaming} placeholder={chatPlaceholder} />
        <p className="mt-2 text-xs text-zinc-600 text-center">
          {lang === 'fr' 
            ? 'Le chat peut se tromper. Aucun résultat n\'est garanti. Les paris sportifs comportent des risques. 18+ Canada / 21+ USA. Assure-toi de respecter les lois de ta région. Jouez de façon responsable.'
            : 'The chat may make errors. No results are guaranteed. Sports betting involves risks. 18+ Canada / 21+ USA. Make sure to comply with your region\'s laws. Play responsibly.'}
        </p>
      </div>
    </div>
  )
}
