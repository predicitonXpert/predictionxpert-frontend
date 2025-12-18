'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/layout'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { redirectToCheckout } from '@/lib/stripe'

const content = {
  fr: {
    nav: {
      login: 'Se connecter',
      signup: "S'inscrire",
      back: 'Retour',
    },
    title: 'Choisis ton plan',
    subtitle: 'Commence gratuitement ou passe Pro pour des analyses illimitees',
    free: {
      name: 'Gratuit',
      price: '0$',
      period: '/mois',
      description: 'Pour decouvrir PredictionXpert',
      features: [
        '5 analyses par mois',
        'Acces aux cotes de base',
        'Support communautaire',
      ],
      cta: 'Commencer gratuitement',
      current: 'Plan actuel',
    },
    pro: {
      name: 'Pro',
      price: '19.99$',
      period: '/mois',
      description: 'Pour les parieurs serieux',
      badge: 'Populaire',
      features: [
        'Analyses illimitees',
        'Live Game Mode',
        'Cotes en temps reel',
        'Analyses approfondies',
        'Support prioritaire',
      ],
      cta: 'Passer Pro',
      current: 'Plan actuel',
    },
    loading: 'Chargement...',
    loginRequired: 'Connecte-toi pour t\'abonner',
  },
  en: {
    nav: {
      login: 'Log in',
      signup: 'Sign up',
      back: 'Back',
    },
    title: 'Choose your plan',
    subtitle: 'Start free or go Pro for unlimited analysis',
    free: {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'To discover PredictionXpert',
      features: [
        '5 analyses per month',
        'Basic odds access',
        'Community support',
      ],
      cta: 'Start for free',
      current: 'Current plan',
    },
    pro: {
      name: 'Pro',
      price: '$19.99',
      period: '/month',
      description: 'For serious bettors',
      badge: 'Popular',
      features: [
        'Unlimited analyses',
        'Live Game Mode',
        'Real-time odds',
        'Deep analysis',
        'Priority support',
      ],
      cta: 'Go Pro',
      current: 'Current plan',
    },
    loading: 'Loading...',
    loginRequired: 'Log in to subscribe',
  },
}

export default function PricingPage() {
  const { user } = useAuth()
  const { lang } = useLanguage()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const t = content[lang]

  const handleSubscribe = async () => {
    if (!user) {
      router.push('/login')
      return
    }

    setLoading(true)
    setError(null)

    try {
      await redirectToCheckout(user.id, user.email || '')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }

  const handleFreePlan = () => {
    if (!user) {
      router.push('/signup')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
     
      {/* Main Content */}
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-slate-400">
              {t.subtitle}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-md mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-center">
              {error}
            </div>
          )}

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{t.free.name}</h3>
                <p className="text-slate-400">{t.free.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-bold text-white">{t.free.price}</span>
                <span className="text-slate-400">{t.free.period}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {t.free.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-slate-300">
                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleFreePlan}
                className="w-full py-3 px-6 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
              >
                {t.free.cta}
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-emerald-900/50 to-slate-800/50 backdrop-blur-sm border-2 border-emerald-500/50 rounded-2xl p-8 relative">
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">
                  {t.pro.badge}
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{t.pro.name}</h3>
                <p className="text-slate-400">{t.pro.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-bold text-white">{t.pro.price}</span>
                <span className="text-slate-400">{t.pro.period}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {t.pro.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-slate-300">
                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="w-full py-3 px-6 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
              >
                {loading ? t.loading : (user ? t.pro.cta : t.loginRequired)}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
