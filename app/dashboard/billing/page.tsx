'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { getSubscriptionStatus, redirectToPortal, redirectToCheckout } from '@/lib/stripe'

const content = {
  fr: {
    title: 'Mon abonnement',
    back: 'Retour au chat',
    loading: 'Chargement...',
    currentPlan: 'Plan actuel',
    free: {
      name: 'Gratuit',
      description: '5 analyses par mois',
    },
    pro: {
      name: 'Pro',
      description: 'Analyses illimitees',
    },
    status: {
      active: 'Actif',
      past_due: 'Paiement en retard',
      canceled: 'Annule',
      free: 'Gratuit',
    },
    renewsOn: 'Renouvellement le',
    upgrade: 'Passer Pro',
    manage: 'Gerer mon abonnement',
    manageDescription: 'Modifier ta carte, annuler ton abonnement, voir tes factures',
  },
  en: {
    title: 'My Subscription',
    back: 'Back to chat',
    loading: 'Loading...',
    currentPlan: 'Current plan',
    free: {
      name: 'Free',
      description: '5 analyses per month',
    },
    pro: {
      name: 'Pro',
      description: 'Unlimited analyses',
    },
    status: {
      active: 'Active',
      past_due: 'Past due',
      canceled: 'Canceled',
      free: 'Free',
    },
    renewsOn: 'Renews on',
    upgrade: 'Upgrade to Pro',
    manage: 'Manage subscription',
    manageDescription: 'Update your card, cancel subscription, view invoices',
  },
}

export default function BillingPage() {
  const { user } = useAuth()
  const { lang } = useLanguage()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [subscription, setSubscription] = useState<{
    status: string
    priceId: string | null
    currentPeriodEnd: string | null
  } | null>(null)

  const t = content[lang]

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    const fetchSubscription = async () => {
      try {
        const data = await getSubscriptionStatus(user.id)
        setSubscription(data)
      } catch (error) {
        console.error('Failed to fetch subscription:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubscription()
  }, [user, router])

  const handleManageSubscription = async () => {
    if (!user) return
    setActionLoading(true)
    try {
      await redirectToPortal(user.id)
    } catch (error) {
      console.error('Failed to open portal:', error)
      setActionLoading(false)
    }
  }

  const handleUpgrade = async () => {
    if (!user) return
    setActionLoading(true)
    try {
      await redirectToCheckout(user.id, user.email || '')
    } catch (error) {
      console.error('Failed to start checkout:', error)
      setActionLoading(false)
    }
  }

  if (!user) {
    return null
  }

  const isPro = subscription?.status === 'active'
  const statusKey = (subscription?.status || 'free') as keyof typeof t.status

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">{t.title}</h1>
          <Link
            href="/dashboard"
            className="text-slate-400 hover:text-white transition-colors"
          >
            {t.back}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center text-slate-400">{t.loading}</div>
        ) : (
          <div className="space-y-8">
            {/* Current Plan Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1">{t.currentPlan}</p>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {isPro ? t.pro.name : t.free.name}
                  </h2>
                  <p className="text-slate-400">
                    {isPro ? t.pro.description : t.free.description}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    isPro
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : subscription?.status === 'past_due'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-slate-700 text-slate-300'
                  }`}>
                    {t.status[statusKey] || statusKey}
                  </span>
                  {isPro && subscription?.currentPeriodEnd && (
                    <p className="text-slate-500 text-sm mt-2">
                      {t.renewsOn} {new Date(subscription.currentPeriodEnd).toLocaleDateString(lang === 'fr' ? 'fr-CA' : 'en-CA')}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid gap-4">
              {isPro ? (
                <button
                  onClick={handleManageSubscription}
                  disabled={actionLoading}
                  className="w-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-xl p-6 text-left transition-colors disabled:opacity-50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{t.manage}</h3>
                      <p className="text-slate-400 text-sm">{t.manageDescription}</p>
                    </div>
                    <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ) : (
                <button
                  onClick={handleUpgrade}
                  disabled={actionLoading}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 rounded-xl p-6 text-left transition-colors disabled:opacity-50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{t.upgrade}</h3>
                      <p className="text-emerald-100/70 text-sm">19.99$/mois</p>
                    </div>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
