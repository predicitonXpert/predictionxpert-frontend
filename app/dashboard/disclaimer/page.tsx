'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  fr: {
    title: 'Avertissement',
    legal: {
      title: 'Avis légal',
      company: 'PredictionXpert est exploité par (Prédiction EXPERT inc.).',
      content: [
        'Le contenu disponible sur cette plateforme, incluant les outils, textes, analyses et réponses générées par l\'IA, est fourni uniquement à des fins d\'information et de divertissement et ne constitue pas des conseils de paris, financiers ou juridiques.',
        'Nous ne garantissons pas l\'exactitude de l\'information fournie et ne sommes pas responsables des décisions prises ou des pertes liées à l\'utilisation de la plateforme.',
        'Toutes les marques, logos et noms commerciaux affichés sur le site appartiennent à leurs propriétaires respectifs. PredictionXpert n\'est affilié à aucun bookmaker, équipe, ligue ou organisation sportive officielle.',
        'Les utilisateurs sont responsables de vérifier que l\'utilisation de la plateforme est légale dans leur région.',
        'L\'utilisation de ce service implique l\'acceptation de nos Termes et Conditions et de notre Politique de confidentialité.',
      ],
      contact: 'Pour toute question ou demande légale :',
      email: 'info@mordusport.ca',
    },
  },
  en: {
    title: 'Disclaimer',
    legal: {
      title: 'Legal Notice',
      company: 'PredictionXpert is operated by (Prédiction EXPERT inc.).',
      content: [
        'The content available on this website, including tools, text, analysis, and AI-generated responses, is provided for informational and entertainment purposes only and does not constitute betting advice, financial guidance, or legal recommendations.',
        'We do not guarantee the accuracy of the information provided and we are not responsible for decisions made or losses resulting from the use of the platform.',
        'All trademarks, logos, and brand names appearing on this platform belong to their respective owners. PredictionXpert is not affiliated with any sportsbook, team, league, or official sports organization.',
        'Users are responsible for ensuring they comply with applicable laws in their region before using the platform.',
        'Use of this service implies acceptance of our Terms & Conditions and Privacy Policy.',
      ],
      contact: 'For questions or legal inquiries, you may contact us at:',
      email: 'info@mordusport.ca',
    },
  },
}

export default function DisclaimerPage() {
  const { lang } = useLanguage()
  const t = content[lang]

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">{t.title}</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">{t.legal.title}</h2>
            <p className="text-white mb-4">{t.legal.company}</p>
            <div className="space-y-4 text-white">
              {t.legal.content.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="mt-6 text-white">
              {t.legal.contact}{' '}
              <a
                href={`mailto:${t.legal.email}`}
                className="text-blue-400 hover:text-blue-300 underline"
              >
                {t.legal.email}
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}

