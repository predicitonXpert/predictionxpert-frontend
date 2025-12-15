'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  fr: {
    text: 'Ce site utilise des témoins (cookies) et des données analytiques afin d\'assurer le fonctionnement du service et d\'améliorer ses performances. En poursuivant votre navigation, vous acceptez l\'utilisation des témoins.',
    accept: 'Accepter',
  },
  en: {
    text: 'We use cookies and analytics to operate the platform and improve performance. By continuing to use this website, you agree to our use of cookies.',
    accept: 'Accept',
  },
}

export function CookieBanner() {
  const [show, setShow] = useState(false)
  const { lang } = useLanguage()

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      setShow(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShow(false)
  }

  if (!show) return null

  const t = content[lang]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 border-t border-zinc-800 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white flex-1">{t.text}</p>
          <button
            onClick={handleAccept}
            className="px-6 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-zinc-200 transition-all whitespace-nowrap"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  )
}

