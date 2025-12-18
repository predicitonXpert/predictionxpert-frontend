'use client'

import Link from 'next/link'
import { Logo } from '@/components/layout'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  fr: {
    title: 'Paiement annule',
    subtitle: 'Pas de soucis, tu peux reessayer quand tu veux',
    description: 'Ton abonnement n\'a pas ete active. Si tu as des questions, n\'hesite pas a nous contacter.',
    cta: 'Retour aux tarifs',
    secondary: 'Retour a l\'accueil',
  },
  en: {
    title: 'Payment cancelled',
    subtitle: 'No worries, you can try again anytime',
    description: 'Your subscription was not activated. If you have any questions, feel free to contact us.',
    cta: 'Back to pricing',
    secondary: 'Back to home',
  },
}

export default function CheckoutCancelPage() {
  const { lang } = useLanguage()

  const t = content[lang]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Cancel Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto bg-slate-700/50 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Logo size="md" />
        </div>

        {/* Content */}
        <h1 className="text-3xl font-bold text-white mb-2">{t.title}</h1>
        <p className="text-xl text-slate-400 mb-4">{t.subtitle}</p>
        <p className="text-slate-500 mb-8">{t.description}</p>

        {/* CTAs */}
        <div className="space-y-4">
          <Link
            href="/pricing"
            className="block w-full py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold transition-colors"
          >
            {t.cta}
          </Link>
          <Link
            href="/"
            className="block w-full py-3 px-6 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
          >
            {t.secondary}
          </Link>
        </div>
      </div>
    </div>
  )
}
