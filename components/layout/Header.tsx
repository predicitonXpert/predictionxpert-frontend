'use client'

import { useState } from 'react'
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    await signOut()
    setIsMenuOpen(false)
  }

  return (
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
  )
}
