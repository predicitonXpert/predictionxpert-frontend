'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/layout'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  fr: {
    title: 'Bienvenue dans Pro !',
    subtitle: 'Ton abonnement est maintenant actif',
    description: 'Tu as maintenant acces a toutes les fonctionnalites Pro, incluant les analyses illimitees et le Live Game Mode.',
    cta: 'Commencer a chatter',
    secondary: 'Voir mon abonnement',
  },
  en: {
    title: 'Welcome to Pro!',
    subtitle: 'Your subscription is now active',
    description: 'You now have access to all Pro features, including unlimited analyses and Live Game Mode.',
    cta: 'Start chatting',
    secondary: 'View my subscription',
  },
}

export default function CheckoutSuccessPage() {
  const { user } = useAuth()
  const { lang } = useLanguage()
  const router = useRouter()

  const t = content[lang]

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Logo size="md" />
        </div>

        {/* Content */}
        <h1 className="text-3xl font-bold text-white mb-2">{t.title}</h1>
        <p className="text-xl text-emerald-400 mb-4">{t.subtitle}</p>
        <p className="text-slate-400 mb-8">{t.description}</p>

        {/* CTAs */}
        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="block w-full py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold transition-colors"
          >
            {t.cta}
          </Link>
          <Link
            href="/dashboard/billing"
            className="block w-full py-3 px-6 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
          >
            {t.secondary}
          </Link>
        </div>
      </div>
    </div>
  )
}
