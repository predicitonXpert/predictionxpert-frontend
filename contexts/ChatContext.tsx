'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isStreaming?: boolean
}

interface ChatContextType {
  messages: Message[]
  isStreaming: boolean
  error: string | null
  sendMessage: (content: string) => Promise<void>
  clearMessages: () => void
  clearError: () => void
}

const ChatContext = createContext<ChatContextType>({
  messages: [],
  isStreaming: false,
  error: null,
  sendMessage: async () => {},
  clearMessages: () => {},
  clearError: () => {},
})

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isStreaming) return

    setError(null)

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setIsStreaming(true)

    // Create placeholder for assistant message
    const assistantMessageId = crypto.randomUUID()
    let assistantContent = ''

    setMessages(prev => [
      ...prev,
      {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      },
    ])

    try {
      // Build conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }))

      console.log('[Chat] Sending request to:', `${API_BASE_URL}/api/chat`)

      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
        },
        body: JSON.stringify({
          message: content.trim(),
          conversationHistory,
        }),
      })

      console.log('[Chat] Response status:', response.status)
      console.log('[Chat] Response ok:', response.ok)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
      }

      if (!response.body) {
        throw new Error('No response body')
      }

      console.log('[Chat] Starting to read stream...')

      // Use EventSource-like parsing with fetch
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      try {
        while (true) {
          const { done, value } = await reader.read()

          if (done) {
            console.log('[Chat] Stream ended')
            break
          }

          const chunk = decoder.decode(value, { stream: true })
          console.log('[Chat] Received chunk:', chunk.length, 'bytes')
          buffer += chunk

          // Process complete SSE messages (split by double newline)
          const parts = buffer.split('\n\n')
          buffer = parts.pop() || '' // Keep incomplete part in buffer

          for (const part of parts) {
            const lines = part.split('\n')
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const jsonStr = line.slice(6)
                  console.log('[Chat] Parsing:', jsonStr.substring(0, 50))
                  const data = JSON.parse(jsonStr)

                  if (data.type === 'content' && data.content) {
                    assistantContent += data.content

                    // Update assistant message with new content
                    setMessages(prev =>
                      prev.map(msg =>
                        msg.id === assistantMessageId
                          ? { ...msg, content: assistantContent }
                          : msg
                      )
                    )
                  } else if (data.type === 'error') {
                    throw new Error(data.error || 'Unknown error')
                  } else if (data.type === 'done') {
                    console.log('[Chat] Stream done, final content length:', assistantContent.length)
                    // Mark message as complete
                    setMessages(prev =>
                      prev.map(msg =>
                        msg.id === assistantMessageId
                          ? { ...msg, isStreaming: false }
                          : msg
                      )
                    )
                  }
                } catch (parseError) {
                  console.warn('Failed to parse SSE data:', line, parseError)
                }
              }
            }
          }
        }
      } finally {
        reader.releaseLock()
      }

      // Ensure message is marked as complete
      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantMessageId
            ? { ...msg, isStreaming: false }
            : msg
        )
      )
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message'
      setError(errorMessage)

      // Update assistant message to show error
      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                content: 'Sorry, I encountered an error. Please try again.',
                isStreaming: false,
              }
            : msg
        )
      )
    } finally {
      setIsStreaming(false)
    }
  }, [messages, isStreaming])

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return (
    <ChatContext.Provider
      value={{
        messages,
        isStreaming,
        error,
        sendMessage,
        clearMessages,
        clearError,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => useContext(ChatContext)
