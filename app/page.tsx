'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Logo } from '@/components/layout'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  fr: {
    nav: {
      login: 'Se connecter',
      signup: "S'inscrire",
      logout: 'Se déconnecter',
    },
    hero: {
      title: 'Ton compagnon pour tes paris sportifs',
      subtitle: 'Tout sur les paris sportifs. Pose tes questions maintenant.',
      cta: 'Commencer à chatter',
      ctaChat: 'Commencer à chatter',
      ctaSecondary: 'En savoir plus',
    },
    liveGameMode: {
      title: 'Live Game Mode',
      subtitle: 'Parce que les meilleurs paris se font pendant le match',
      description: 'Le Live Game Mode te permet de poser des questions en temps réel, pendant que le match se joue. Momentum, changements de cotes, situations clés — le chat t\'aide à y voir clair au bon moment.',
      cta: 'Essayer le Live Game Mode',
    },
    howItWorks: {
      title: 'Comment ça marche',
      subtitle: 'Que tu commences, que tu mises régulièrement ou que tu sois déjà expérimenté, on est là pour t\'accompagner dans tes paris sportifs.',
      steps: [
        {
          emoji: '1️⃣',
          title: 'Crée ton compte',
          description: 'Inscription en quelques secondes, rien de compliqué.',
        },
        {
          emoji: '2️⃣',
          title: 'Pose ta question',
          description: 'Écris n\'importe quoi sur les paris sportifs, le chat répond instantanément.',
        },
        {
          emoji: '3️⃣',
          title: 'Reçois des réponses claires',
          description: 'Pas de statistiques confuses ni d\'informations inutiles, juste des explications simples et utiles.',
        },
        {
          emoji: '4️⃣',
          title: 'Parie plus intelligemment avec le temps',
          description: 'Plus tu l\'utilises, plus tout devient facile.',
        },
      ],
    },
    why: {
      title: 'Pourquoi PredictionXpert',
      description: 'Les paris sportifs peuvent devenir compliqués. Trop de statistiques et trop "d\'experts" qui disent tous quelque chose de différent. PredictionXpert simplifie tout ça.',
      points: [
        'Ce n\'est pas une autre plateforme complexe ou un service de picks. C\'est une conversation. Tu poses une question et tu reçois une réponse instantanément.',
        'Avant le match, pendant, et surtout en direct quand le timing est important, le chat est là.',
        'Props joueurs, parlays, spreads, paris live, pose tes questions au fur et à mesure que le match avance.',
        'Simple comme ChatGPT, mais réellement conçu pour les paris sportifs.',
        'Ton raccourci pour comprendre les paris sans lire 1 000 statistiques.',
        'Apprends plus vite, parie plus intelligemment.',
        'Les paris sportifs ne devraient pas être compliqués. On rend ça simple pour toi.',
        'Pas d\'attente. Le chat répond en quelques secondes, 24/7.',
      ],
      cta: {
        title: 'Prêt à améliorer tes paris ?',
        subtitle: 'Rejoins des milliers d\'utilisateurs qui font des paris plus intelligents',
        button: 'Commencer maintenant',
      },
    },
    pricing: {
      title: 'Abonnement',
      subtitle: 'Choisis le plan qui te convient',
      free: {
        name: 'Gratuit',
        price: '0$',
        period: '/mois',
        features: [
          '5 analyses par mois',
          'Accès aux cotes de base',
          'Support communautaire',
        ],
        cta: 'Commencer gratuitement',
      },
      pro: {
        name: 'Pro',
        price: '19.99$',
        period: '/mois',
        features: [
          'Analyses illimitées',
          'Live Game Mode',
          'Cotes en temps réel',
          'Analyses approfondies',
          'Support prioritaire',
        ],
        cta: 'Passer Pro',
        popular: true,
      },
    },
    footer: {
      links: {
        disclaimer: 'Avertissement',
        terms: 'Conditions',
        privacy: 'Confidentialité',
      },
      copyright: '© 2024 PredictionXpert. Tous droits réservés.',
      disclaimer: 'PredictionXpert ne garantit aucun résultat et peut contenir des erreurs. Les paris sportifs comportent des risques. Service réservé aux 18 ans et plus (ou selon les lois de votre région). Utilisez la plateforme de façon responsable.',
    },
  },
  en: {
    nav: {
      login: 'Login',
      signup: 'Sign up',
      logout: 'Logout',
    },
    hero: {
      title: 'your sidekick for sports betting',
      subtitle: 'Everything about sports betting. Just ask now.',
      cta: 'Start chatting',
      ctaChat: 'Start chatting',
      ctaSecondary: 'Learn more',
    },
    liveGameMode: {
      title: 'Live Game Mode',
      subtitle: 'Because the best bets are made during the match',
      description: 'Live Game Mode lets you ask questions in real-time, while the game is being played. Momentum, odds changes, key situations — the chat helps you see clearly at the right moment.',
      cta: 'Try Live Game Mode',
    },
    howItWorks: {
      title: 'How it works',
      subtitle: 'Whether you\'re just starting, betting regularly, or already sharp, we\'re here to support your sports betting journey.',
      steps: [
        {
          emoji: '1️⃣',
          title: 'Create your account',
          description: 'Sign up in seconds',
        },
        {
          emoji: '2️⃣',
          title: 'Ask anything',
          description: 'Just type anything about sports betting, the chat answers instantly.',
        },
        {
          emoji: '3️⃣',
          title: 'Get clear guidance',
          description: 'No confusing stats, no overload, just simple explanations and smart insights.',
        },
        {
          emoji: '4️⃣',
          title: 'Bet smarter over time',
          description: 'The more you use it, the easier betting becomes.',
        },
      ],
    },
    why: {
      title: 'Why PredictionXpert',
      description: 'Sports betting can be overwhelming. Too many stats, too much noise, and way too many "experts" yelling different opinions. PredictionXpert cuts through all of that.',
      points: [
        'This isn\'t another dashboard or pick service. It\'s a conversation. You ask, it answers instantly.',
        'Before the game, during the game, and especially in live betting when timing matters most, we\'re here.',
        'Props, parlays, spreads, live bets, ask as the game unfolds.',
        'Simple like ChatGPT, but actually built for sports betting.',
        'Your shortcut to understanding bets without reading 1,000 stats.',
        'Learn faster, Bet smarter with us.',
        'Sports betting shouldn\'t be complicated. We keep it simple for you.',
        'No waiting, we answers in seconds, 24/7.',
      ],
      cta: {
        title: 'Ready to improve your bets?',
        subtitle: 'Join thousands of users making smarter bets',
        button: 'Start now',
      },
    },
    pricing: {
      title: 'Subscription',
      subtitle: 'Choose the plan that suits you',
      free: {
        name: 'Free',
        price: '$0',
        period: '/month',
        features: [
          '5 analyses per month',
          'Access to basic odds',
          'Community support',
        ],
        cta: 'Start for free',
      },
      pro: {
        name: 'Pro',
        price: '$19.99',
        period: '/month',
        features: [
          'Unlimited analyses',
          'Live Game Mode',
          'Real-time odds',
          'Deep analyses',
          'Priority support',
        ],
        cta: 'Go Pro',
        popular: true,
      },
    },
        footer: {
          links: {
            disclaimer: 'Disclaimer',
            terms: 'Terms',
            privacy: 'Privacy',
          },
          copyright: '© 2024 PredictionXpert. All rights reserved.',
          disclaimer: 'PredictionXpert does not guarantee results and may contain errors. Sports betting involves risk. For users 18+ (or according to local laws). Use responsibly.',
        },
  },
}

export default function HomePage() {
  const { lang, setLang } = useLanguage()
  const { user, signOut } = useAuth()
  const t = content[lang]
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    await signOut()
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 h-16" aria-label="PredictionXpert Homepage">
          <Image src="/logo.png" alt="PredictionXpert" width={200} height={80} className="scale-80" priority />
        </Link>        
         
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
            {/* Disclaimer Links - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/dashboard/disclaimer"
                className="text-sm text-white hover:text-zinc-300 transition-colors"
              >
                {t.footer.links.disclaimer}
              </Link>
              <Link
                href="/dashboard/terms"
                className="text-sm text-white hover:text-zinc-300 transition-colors"
              >
                {t.footer.links.terms}
              </Link>
              <Link
                href="/dashboard/privacy"
                className="text-sm text-white hover:text-zinc-300 transition-colors"
              >
                {t.footer.links.privacy}
              </Link>
            </div>
            {/* Language Toggle - Compact on mobile */}
            <div className="flex items-center bg-zinc-900 rounded-lg p-0.5 sm:p-1 border border-zinc-700">
              <button
                onClick={() => setLang('fr')}
                className={`px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  lang === 'fr'
                    ? 'bg-white text-black shadow-lg'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  lang === 'en'
                    ? 'bg-white text-black shadow-lg'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
            {/* Desktop buttons - Hidden on mobile */}
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="hidden md:block px-6 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-zinc-200 transition-all hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5"
                >
                  Chat
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden md:block px-4 py-2 text-sm font-medium text-white hover:text-zinc-300 transition-colors"
                >
                  {t.nav.logout}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden md:block px-4 py-2 text-sm font-medium text-white hover:text-zinc-300 transition-colors"
                >
                  {t.nav.login}
                </Link>
                <Link
                  href="/signup"
                  className="hidden md:block px-6 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-zinc-200 transition-all hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5"
                >
                  {t.nav.signup}
                </Link>
              </>
            )}
            
            {/* Hamburger menu button - Mobile only */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white hover:text-zinc-300 transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-zinc-800 bg-black">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 bg-white text-black rounded-lg text-sm font-medium hover:bg-zinc-200 transition-all text-center"
                  >
                    Chat
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 text-sm font-medium text-white hover:text-zinc-300 transition-colors text-center"
                  >
                    {t.nav.logout}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-white hover:text-zinc-300 transition-colors text-center"
                  >
                    {t.nav.login}
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 bg-white text-black rounded-lg text-sm font-medium hover:bg-zinc-200 transition-all text-center"
                  >
                    {t.nav.signup}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 pt-16 md:pt-20 text-center min-h-[80vh] md:h-[80vh] flex flex-col justify-center items-center">
        <div className="mb-8 hidden md:flex justify-center">
        <div className="flex items-center space-x-2 h-16" aria-label="PredictionXpert Homepage">
          <Image src="/logo.png" alt="PredictionXpert" width={400} height={80} className="scale-100" priority />
          </div>        </div>
        <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
          {t.hero.title}
        </h1>
            <p className="text-2xl md:text-3xl text-white mb-12 max-w-3xl mx-auto font-medium">
          {t.hero.subtitle}
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center w-full max-w-md md:max-w-none">
          <Link
            href={user ? "/dashboard" : "/signup"}
            className="px-8 py-4 bg-white text-black rounded-lg text-lg font-semibold hover:bg-zinc-200 transition-all hover:shadow-[0_20px_50px_rgba(255,255,255,0.4)] hover:-translate-y-2 hover:scale-105 text-center"
          >
            {user ? t.hero.ctaChat : t.hero.cta}
          </Link>
          <Link
            href="#how-it-works"
            className="px-8 py-4 border-2 border-white text-white rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-all hover:shadow-[0_20px_50px_rgba(255,255,255,0.3)] hover:-translate-y-2 hover:scale-105 text-center"
          >
            {t.hero.ctaSecondary}
          </Link>
        </div>
      </section>

      {/* Live Game Mode Section */}
      <section className="relative bg-gradient-to-r from-purple-900/70 via-blue-900/70 to-purple-900/70 py-24 border-y-2 border-purple-700/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-purple-600/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.3),transparent_50%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-[0_4px_20px_rgba(139,92,246,0.5)]">
              {t.liveGameMode.title}
            </h2>
            <p className="text-2xl text-white mb-6 font-medium">{t.liveGameMode.subtitle}</p>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed">
              {t.liveGameMode.description}
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-lg font-semibold hover:from-purple-500 hover:to-blue-500 transition-all hover:shadow-[0_20px_50px_rgba(139,92,246,0.6)] hover:-translate-y-2 hover:scale-105"
            >
              {t.liveGameMode.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {t.howItWorks.title}
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              {t.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {t.howItWorks.steps.map((step, index) => (
              <div
                key={index}
                className="bg-black border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 hover:shadow-xl hover:shadow-zinc-900/50 transition-all hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{step.emoji}</div>
                <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
                <p className="text-white">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why PredictionXpert Section */}
      <section id="why" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {t.why.title}
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto mb-12">
              {t.why.description}
            </p>
          </div>

          {/* Grille avec bulles shadow boxing */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {t.why.points.map((point, index) => {
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-2 border-zinc-700 rounded-2xl p-6 md:p-8 hover:shadow-[0_12px_30px_rgba(139,92,246,0.6),0_6px_12px_rgba(59,130,246,0.5)] hover:border-purple-600 hover:-translate-y-2 transition-all duration-300"
                  >
                    <p className="text-lg md:text-xl text-white leading-relaxed">{point}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA Box */}
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-zinc-900 to-zinc-800 border-2 border-zinc-700 rounded-2xl p-8 text-center">
            <h3 className="text-3xl font-bold mb-4 text-white">{t.why.cta.title}</h3>
            <p className="text-xl text-zinc-300 mb-8">{t.why.cta.subtitle}</p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-white text-black rounded-lg text-lg font-semibold hover:bg-zinc-200 transition-all hover:shadow-[0_20px_50px_rgba(255,255,255,0.4)] hover:-translate-y-2 hover:scale-105"
            >
              {t.why.cta.button}
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {t.pricing.title}
            </h2>
            <p className="text-xl text-white">{t.pricing.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-black border-2 border-zinc-800 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-2 text-white">{t.pricing.free.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{t.pricing.free.price}</span>
                <span className="text-white">{t.pricing.free.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {t.pricing.free.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-white">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block w-full text-center px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-black transition-all hover:shadow-[0_15px_40px_rgba(255,255,255,0.3)] hover:-translate-y-1"
              >
                {t.pricing.free.cta}
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-zinc-900 to-black border-2 border-white rounded-xl p-8 relative">
              {t.pricing.pro.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-sm font-semibold">
                  Populaire
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2 text-white">{t.pricing.pro.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{t.pricing.pro.price}</span>
                <span className="text-white">{t.pricing.pro.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {t.pricing.pro.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-white">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block w-full text-center px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-zinc-200 transition-all hover:shadow-[0_15px_40px_rgba(255,255,255,0.4)] hover:-translate-y-1 hover:scale-105"
              >
                {t.pricing.pro.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex gap-6">
                <Link
                  href="/dashboard/disclaimer"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  {t.footer.links.disclaimer}
                </Link>
                <Link
                  href="/dashboard/terms"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  {t.footer.links.terms}
                </Link>
                <Link
                  href="/dashboard/privacy"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  {t.footer.links.privacy}
                </Link>
              </div>
              <p className="text-zinc-400 text-xs max-w-3xl">{t.footer.disclaimer}</p>
              <p className="text-zinc-400 text-sm">{t.footer.copyright}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

