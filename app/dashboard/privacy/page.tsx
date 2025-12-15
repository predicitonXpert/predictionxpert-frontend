'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  fr: {
    title: 'Politique de Confidentialité',
    lastUpdated: 'Dernière mise à jour : Décembre 2025',
    intro:
      'Cette Politique de Confidentialité explique comment PredictionXpert (« nous », « notre », « la plateforme ») collecte, utilise, conserve et protège vos données lorsque vous utilisez notre site Web ou nos services.',
    agreement:
      'En créant un compte ou en utilisant PredictionXpert, vous acceptez les pratiques décrites ci-dessous.',
    sections: [
      {
        title: '1. Informations que nous collectons',
        content: [
          'Nous pouvons collecter les informations suivantes lorsque vous utilisez la plateforme :',
          {
            subtitle: 'Informations de compte',
            items: [
              'Adresse courriel',
              'Mot de passe (chiffré et jamais stocké en clair)',
            ],
          },
          {
            subtitle: 'Données d\'utilisation et d\'interaction',
            items: [
              'Questions envoyées au chat',
              'Messages, actions, préférences enregistrées',
              'Historique d\'interaction (pour personnalisation)',
            ],
          },
          {
            subtitle: 'Données techniques',
            items: [
              'Adresse IP',
              'Type de navigateur',
              'Données système',
              'Témoins (cookies) et données analytiques',
            ],
          },
          {
            subtitle: 'Informations de paiement',
            items: [
              'Les paiements et abonnements sont traités via Stripe',
              'Nous ne stockons jamais les informations complètes de carte de crédit ou facturation',
            ],
          },
        ],
      },
      {
        title: '2. Comment nous utilisons vos données',
        content: [
          'Vos données peuvent être utilisées pour :',
          'Offrir et améliorer le service PredictionXpert',
          'Personnaliser l\'expérience utilisateur',
          'Maintenir la sécurité et la stabilité de la plateforme',
          'Gérer les paiements et abonnements',
          'Offrir du soutien technique et client',
          'Analyser l\'utilisation et les performances du service',
          'Nous ne vendons ni ne louons vos données à des tiers.',
        ],
      },
      {
        title: '3. Services tiers',
        content: [
          'Nous pouvons utiliser des services externes pour le traitement, les paiements ou l\'analyse, incluant :',
          'Stripe (paiements)',
          'Google Analytics (analyse d\'utilisation)',
          'Fournisseurs de modèles d\'IA (ex. OpenAI) pour générer les réponses',
          'Ces services peuvent traiter certaines données sous leurs propres politiques de confidentialité.',
        ],
      },
      {
        title: '4. Durée de conservation des données',
        content: [
          'Nous conservons vos données uniquement pendant :',
          'La période d\'utilisation active du compte',
          'Les délais requis pour des raisons légales ou de sécurité',
          'Vous pouvez demander la suppression de vos données en tout temps (voir Section 7).',
        ],
      },
      {
        title: '5. Sécurité',
        content: [
          'Nous utilisons des méthodes conformes aux standards de l\'industrie, dont :',
          'Chiffrement',
          'Authentification sécurisée',
          'Accès restreint aux données',
          'Cependant, aucune plateforme ne peut garantir une sécurité absolue. Vous utilisez PredictionXpert à vos propres risques.',
        ],
      },
      {
        title: '6. Exigence d\'âge',
        content: [
          'PredictionXpert est uniquement destiné aux utilisateurs respectant les exigences légales de paris sportifs dans leur région. En utilisant la plateforme, vous confirmez respecter les lois applicables.',
          'Nous ne collectons pas volontairement de données auprès de personnes qui ne sont pas légalement autorisées à utiliser des outils liés aux paris.',
        ],
      },
      {
        title: '7. Vos droits',
        content: [
          'Vous avez le droit de :',
          'Accéder aux données associées à votre compte',
          'Mettre à jour vos informations',
          'Demander la suppression de votre compte ou de vos données',
          'Pour faire une demande : info@mordusport.ca',
        ],
      },
      {
        title: '8. Modifications de cette politique',
        content: [
          'Nous pouvons mettre à jour cette Politique de Confidentialité au besoin. La version la plus récente sera toujours affichée sur cette page.',
          'Nous encourageons les utilisateurs à consulter les mises à jour périodiquement.',
        ],
      },
      {
        title: '9. Contact',
        content: [
          'Pour toute question ou demande légale :',
          '📩 info@mordusport.ca',
        ],
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: Dec 2025',
    intro:
      'This Privacy Policy explains how PredictionXpert ("we", "our", "the platform") collects, stores, uses, and protects your data when you use our website or services.',
    agreement: 'By creating an account or using PredictionXpert, you agree to the practices described below.',
    sections: [
      {
        title: '1. Information We Collect',
        content: [
          'We may collect the following information when you use the platform:',
          {
            subtitle: 'Account Information',
            items: ['Email address', 'Password (encrypted and never stored in plain text)'],
          },
          {
            subtitle: 'Usage & Interaction Data',
            items: [
              'Questions you ask the chat',
              'Messages, actions, favorite settings',
              'Interaction history (for personalization)',
            ],
          },
          {
            subtitle: 'Device & Technical Data',
            items: [
              'IP address',
              'Browser type',
              'System data',
              'Cookies and usage analytics',
            ],
          },
          {
            subtitle: 'Payment Information',
            items: [
              'Subscription/payment details are processed through Stripe.',
              'We do not store any full billing or credit card information.',
            ],
          },
        ],
      },
      {
        title: '2. How We Use Your Data',
        content: [
          'We use your information to:',
          'Provide and improve the PredictionXpert service',
          'Personalize user experience',
          'Maintain platform security',
          'Process payments and subscriptions',
          'Provide customer support',
          'Analyze usage trends and performance',
          'We do not sell or rent your data to third parties.',
        ],
      },
      {
        title: '3. Third-Party Services',
        content: [
          'We may use third-party tools for analytics, payments, and functionality, including:',
          'Stripe (payments)',
          'Google Analytics (usage data)',
          'AI model providers (OpenAI or equivalent) to generate responses',
          'These services may process limited user data under their own privacy policies.',
        ],
      },
      {
        title: '4. How Long We Keep Your Data',
        content: [
          'We retain data only as long as necessary for:',
          'Active account usage',
          'Legal or security requirements',
          'You may request deletion of your data at any time (see Section 7).',
        ],
      },
      {
        title: '5. Security',
        content: [
          'We use industry-standard methods to protect your information, including:',
          'Encryption',
          'Secure authentication',
          'Limited access to stored data',
          'However, no platform can guarantee 100% security. You use PredictionXpert at your own risk.',
        ],
      },
      {
        title: '6. Age Requirement',
        content: [
          'PredictionXpert is only available to users who meet the legal age and gambling requirements applicable in their region. By using the platform, you confirm that you comply with these local regulations.',
          'We do not knowingly collect or store information from individuals who are not legally permitted to use betting-related tools.',
        ],
      },
      {
        title: '7. Your Rights',
        content: [
          'You may request to:',
          'Access your stored data',
          'Update information',
          'Request account or data deletion',
          'To make a request, contact: info@mordusport.ca',
        ],
      },
      {
        title: '8. Changes to This Policy',
        content: [
          'We may update this Privacy Policy occasionally. The most recent version will always be available on this page.',
          'We encourage users to review updates periodically.',
        ],
      },
      {
        title: '9. Contact',
        content: ['For questions or legal inquiries: info@mordusport.ca'],
      },
    ],
  },
}

export default function PrivacyPage() {
  const { lang } = useLanguage()
  const t = content[lang]

  const renderContent = (content: any[]): React.ReactNode => {
    return content.map((item, index) => {
      if (typeof item === 'string') {
        return (
          <p key={index} className="text-white leading-relaxed mb-3">
            {item}
          </p>
        )
      }
      if (item.subtitle) {
        return (
          <div key={index} className="mb-4">
            <h4 className="text-lg font-semibold text-white mb-2">{item.subtitle}</h4>
            <ul className="list-disc list-inside space-y-2 text-white ml-4">
              {item.items.map((subItem: string, subIndex: number) => (
                <li key={subIndex}>{subItem}</li>
              ))}
            </ul>
          </div>
        )
      }
      return null
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{t.title}</h1>
        <p className="text-zinc-400 mb-8">{t.lastUpdated}</p>

        <div className="space-y-6 mb-8">
          <p className="text-white leading-relaxed">{t.intro}</p>
          <p className="text-white leading-relaxed">{t.agreement}</p>
        </div>

        <div className="space-y-8">
          {t.sections.map((section, index) => (
            <section
              key={index}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold mb-4 text-white">{section.title}</h2>
              <div className="space-y-3">{renderContent(section.content)}</div>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}

