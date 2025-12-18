'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import { getSubscriptionStatus } from '@/lib/stripe'

interface SubscriptionInfo {
  status: string
  priceId: string | null
  currentPeriodEnd: string | null
}

interface AuthContextType {
  user: User | null
  loading: boolean
  subscription: SubscriptionInfo | null
  isPro: boolean
  signOut: () => Promise<void>
  refreshSubscription: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  subscription: null,
  isPro: false,
  signOut: async () => {},
  refreshSubscription: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null)
  const supabase = createClient()

  const fetchSubscription = useCallback(async (userId: string) => {
    try {
      const data = await getSubscriptionStatus(userId)
      setSubscription(data)
    } catch (error) {
      console.error('Failed to fetch subscription:', error)
      setSubscription({ status: 'free', priceId: null, currentPeriodEnd: null })
    }
  }, [])

  const refreshSubscription = useCallback(async () => {
    if (user) {
      await fetchSubscription(user.id)
    }
  }, [user, fetchSubscription])

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchSubscription(session.user.id)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription: authSubscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchSubscription(session.user.id)
      } else {
        setSubscription(null)
      }
      setLoading(false)
    })

    return () => authSubscription.unsubscribe()
  }, [supabase, fetchSubscription])

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSubscription(null)
  }

  const isPro = subscription?.status === 'active'

  return (
    <AuthContext.Provider value={{ user, loading, subscription, isPro, signOut, refreshSubscription }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
