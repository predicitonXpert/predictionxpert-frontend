'use client'

interface ChatMessageProps {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isStreaming?: boolean
}

export function ChatMessage({ role, content, timestamp, isStreaming }: ChatMessageProps) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div
        className={`max-w-[80%] rounded-2xl px-5 py-4 shadow-lg ${
          isUser
            ? 'bg-gradient-to-br from-blue-100 to-blue-50 text-zinc-900 border-2 border-blue-200 shadow-blue-200/50'
            : 'bg-white text-zinc-900 border-2 border-zinc-200 shadow-zinc-200/50'
        }`}
      >
        <p className={`text-xs font-semibold mb-2 ${isUser ? 'text-blue-700' : 'text-zinc-600'}`}>
          {isUser ? 'Toi' : 'PredictionXpert'}
        </p>
        <div className="text-base whitespace-pre-wrap leading-relaxed text-zinc-900">
          {content || (isStreaming ? '' : 'Pas de réponse')}
          {isStreaming && (
            <span className="inline-flex gap-1 ml-2 align-middle">
              <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          )}
        </div>
        <p className={`text-xs mt-3 ${isUser ? 'text-blue-600' : 'text-zinc-500'}`}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  )
}
