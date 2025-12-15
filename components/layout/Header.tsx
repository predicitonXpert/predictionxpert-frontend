'use client'

import { Logo } from './Logo'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'

const content = {
  fr: {
    nav: {
      login: 'Se connecter',
      signup: "S'inscrire",
      logout: 'Se déconnecter',
    },
    footer: {
      links: {
        disclaimer: 'Avertissement',
        terms: 'Conditions',
        privacy: 'Confidentialité',
      },
    },
  },
  en: {
    nav: {
      login: 'Login',
      signup: 'Sign up',
      logout: 'Logout',
    },
    footer: {
      links: {
        disclaimer: 'Disclaimer',
        terms: 'Terms',
        privacy: 'Privacy',
      },
    },
  },
}

export function Header() {
  const { lang, setLang } = useLanguage()
  const { user, signOut } = useAuth()
  const t = content[lang]

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <header className="border-b border-zinc-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <Link href={`/`} className="flex items-center space-x-2 h-16" aria-label="PredictionXpert Homepage">
          <Image src="/logo.png" alt="PredictionXpert" width={200} height={80} className="scale-60" priority />
          </Link>
        <div className="flex items-center gap-4">
          {/* Disclaimer Links */}
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
          {/* Language Toggle */}
          <div className="flex items-center bg-zinc-900 rounded-lg p-1 border border-zinc-700">
            <button
              onClick={() => setLang('fr')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                lang === 'fr'
                  ? 'bg-white text-black shadow-lg'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Français
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                lang === 'en'
                  ? 'bg-white text-black shadow-lg'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              English
            </button>
          </div>
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="px-6 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-zinc-200 transition-all hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5"
              >
                Chat
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white hover:text-zinc-300 transition-colors"
              >
                {t.nav.logout}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-white hover:text-zinc-300 transition-colors"
              >
                {t.nav.login}
              </Link>
              <Link
                href="/signup"
                className="px-6 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-zinc-200 transition-all hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5"
              >
                {t.nav.signup}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
