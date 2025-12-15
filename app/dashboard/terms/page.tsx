'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  fr: {
    title: 'Termes et Conditions',
    sections: [
      {
        icon: '📋',
        title: 'Mises à jour des termes',
        subtitle: 'Politique de modification',
        content: 'Les présents termes et conditions peuvent être modifiés sans préavis à la discrétion du Fournisseur.',
      },
      {
        icon: '⚠️',
        title: 'Restrictions d\'âge',
        subtitle: 'Accès réservé aux utilisateurs ayant l\'âge légal',
        content: 'Ce service est uniquement destiné aux utilisateurs qui ont atteint l\'âge légal pour utiliser des plateformes liées aux paris sportifs, selon les lois de leur région. Les mineurs n\'ont pas le droit d\'utiliser ce service. Nous ne ciblons ni ne collectons volontairement de données auprès d\'utilisateurs n\'ayant pas l\'âge requis.',
      },
      {
        icon: '⛔',
        title: 'Restrictions d\'utilisation des données',
        subtitle: 'Utilisation interdite',
        content: 'Il est interdit d\'utiliser les données fournies par PredictionXpert afin de créer, entraîner ou améliorer (directement ou indirectement) un produit ou service similaire ou concurrent.',
      },
      {
        icon: '📈',
        title: 'Politique de tarification',
        subtitle: 'Modifications des prix',
        content: 'Le Fournisseur peut modifier les tarifs d\'abonnement. Un avis préalable sera envoyé. Les modifications entreront en vigueur au prochain cycle de facturation. L\'utilisateur peut annuler avant la prise d\'effet d\'une augmentation. Si l\'utilisateur continue d\'utiliser le service après l\'application d\'un nouveau tarif, cela constitue une acceptation implicite. S\'il refuse, il doit se désabonner avant que la modification devienne effective.',
      },
      {
        icon: '🔄',
        title: 'Conditions d\'abonnement',
        subtitle: 'Renouvellement automatique',
        content: 'Tous les abonnements sont renouvelés automatiquement. La facturation peut être mensuelle, bihebdomadaire ou hebdomadaire. En cas d\'échec de paiement, des tentatives supplémentaires peuvent être effectuées. L\'utilisateur doit annuler son ancien abonnement avant d\'en souscrire un nouveau, sinon plusieurs abonnements pourraient être actifs simultanément.',
      },
      {
        icon: '📋',
        title: 'Responsabilités de l\'utilisateur',
        subtitle: 'Vos obligations',
        content: 'L\'utilisateur doit : Respecter les conditions des sites de bookmakers. Respecter les lois applicables dans sa région. Ne pas partager, revendre ou distribuer les informations fournies par PredictionXpert. Utiliser les informations uniquement pour ses propres paris personnels. Toute violation peut entraîner une résiliation immédiate de l\'abonnement et des recours juridiques possibles.',
      },
      {
        icon: '🔍',
        title: 'Exactitude de l\'information',
        subtitle: 'Avertissement sur la qualité des données',
        content: 'Aucune garantie quant à l\'exactitude ou l\'exhaustivité des informations fournies. Des erreurs techniques, variations d\'odds ou retards peuvent survenir. Les bookmakers peuvent modifier ou annuler des paris selon leurs propres règles. La disponibilité, couverture et exactitude des données peuvent varier et ne sont pas garanties.',
      },
      {
        icon: '🚨',
        title: 'Clause de non-responsabilité',
        subtitle: 'Avis important',
        content: 'Aucun gain n\'est garanti. Le Fournisseur ne peut être tenu responsable de pertes financières ou dommages directs/indirects liés à l\'utilisation du service. Toute décision de pari appartient entièrement à l\'utilisateur. Les informations fournies ne doivent pas être interprétées comme des conseils de paris professionnels.',
      },
      {
        icon: '🚫',
        title: 'Résiliation',
        subtitle: '',
        content: 'PredictionXpert se réserve le droit de suspendre ou de mettre fin à l\'accès de tout utilisateur ne respectant pas les présents Termes.',
      },
      {
        icon: '🆘',
        title: 'Soutien au jeu responsable',
        subtitle: '',
        content: 'Si vous croyez avoir un problème de jeu, des ressources sont disponibles : 🇨🇦 Canada : 1-866-531-2600 🇺🇸 États-Unis : 1-800-522-4700 (ligne nationale)',
      },
    ],
  },
  en: {
    title: 'Terms and Conditions',
    sections: [
      {
        icon: '📋',
        title: 'Terms Updates',
        subtitle: 'Change Policy',
        content: 'Terms subject to change without prior notice. These terms and conditions is subject to change without prior notice at the discretion of the Provider.',
      },
      {
        icon: '⚠️',
        title: 'Age Restrictions',
        subtitle: '18+ Only',
        content: 'Must be over 18 years of age to use this service. Underage gambling is against the law. This content is not intended for an audience under 18 years of age. You need to be over 18 years of age to use this website and any of the Providers products and/or Services.',
      },
      {
        icon: '⛔',
        title: 'Data Usage Restrictions',
        subtitle: 'Prohibited Uses',
        content: 'Don\'t use data to create, train or improve a competing product or service. Don\'t use data to create, train or improve (directly or indirectly) a similar or competing product or service.',
      },
      {
        icon: '📈',
        title: 'Pricing Policy',
        subtitle: 'Price Changes',
        content: 'Provider may change subscription prices. Advance notice will be provided. Changes take effect next billing cycle. Right to cancel before price increase. The Provider may change the price for subscriptions, recurring payments and pre-paid periods (periods not yet paid for) from time to time, and will communicate any price changes to the User in advance and, if applicable, how to accept those changes. Price changes for will take effect at the start of the next subscription period following the date of the price change. The User accepts the new price by continuing to use the Service after the price change takes effect. If the User does not agree with the price changes, the User has the right to reject the change by unsubscribing from the paid Service prior to the price change going into effect. Please therefore make sure you read any such notification of price changes carefully.',
      },
      {
        icon: '🔄',
        title: 'Subscription Terms',
        subtitle: 'Automatic Renewal',
        content: 'All subscriptions renew automatically. Monthly, bi-weekly, or weekly billing cycles. Retry schedule for failed payments. Cancel old subscription before upgrading. All subscriptions renew automatically ("recurring") after the initial period. The recurring subscription will renew monthly or equivalent (bi-weekly or weekly) until the User cancels the subscription and recurring payment. Recurring subscriptions may have a retry-schedule if collection of a recurring payment fails, meaning that the Providers 3rd party payment providers may try to collect failed recurring payments more than once. If you intend to upgrade or buy a new subscription, please note that you have to cancel your old subscription. Otherwise you may end up having two active subscriptions at the same time.',
      },
      {
        icon: '📋',
        title: 'User Responsibilities',
        subtitle: 'Your Obligations',
        content: 'Comply with bookmaker terms and conditions. Follow laws and regulations in your country. Do not share or sell provided information. Use information only for personal betting. The Provider has no responsibility for bets placed or other actions taken at bookmakers\' web sites. It is the responsibility of the User to comply with the bookmakers\' terms and conditions, and the laws and regulations in their respective country regarding gambling and sports betting. The User may not sell, or pass on in any way, to any person or persons, any information supplied by the Provider. The information provided by the Provider can only be used to place bets with established bookmakers or betting exchanges. A breach of this agreement will lead to an immediate termination of User subscription and possible legal action.',
      },
      {
        icon: '🔍',
        title: 'Information Accuracy',
        subtitle: 'Data Quality Notice',
        content: 'No guarantee of information correctness. Potential scanning errors may occur. Odds may change after alerts. Bookmaker settlement rules may vary. While we strive very hard to present accurate and useful information, the Provider makes no guarantee of the correctness of information delivered. Our Service might display potential palpable errors. These bets may be voided by the relevant bookmaker. Please check bets advised by the Service before placing the bet in case the odds have changed since the original alert or there has been a scanning error. The User must also be aware that bookmakers have different settlement rules (including possible postponements) on various sports, which can result in voided bets and loss of stake. Bookmaker, sport and odds coverage may decrease temporarily due to the constant changes outside the Providers control. The Provider does not guarantee any availability or accuracy.',
      },
      {
        icon: '🚨',
        title: 'Risk Disclaimer',
        subtitle: 'Important Notice',
        content: 'No guarantee of winnings from value bets. Provider not responsible for losses. Risks involved with every betting transaction. Information should not be construed as betting advice. The Provider can in no way be held responsible for any losses or consequential losses arising from the use of this Service. The user must be aware that there are risks involved with every sports betting transaction, and the Provider does not guarantee winnings from presented value bets. Presented odds and bets should not be construed as betting advice.',
      },
      {
        icon: '🚫',
        title: 'Termination',
        subtitle: '',
        content: 'PredictionXpert may suspend or terminate access to the platform at any time if a user violates these Terms.',
      },
      {
        icon: '🆘',
        title: 'Support for Responsible Gambling',
        subtitle: '',
        content: 'If you believe you may have a gambling problem, seek help. Resources include: Canada: 1-866-531-2600 USA: 1-800-522-4700 (National Hotline)',
      },
    ],
  },
}

export default function TermsPage() {
  const { lang } = useLanguage()
  const t = content[lang]

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-white">{t.title}</h1>

        <div className="space-y-8">
          {t.sections.map((section, index) => (
            <section
              key={index}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{section.icon}</span>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2 text-white">{section.title}</h2>
                  {section.subtitle && (
                    <h3 className="text-lg font-semibold mb-4 text-zinc-300">
                      {section.subtitle}
                    </h3>
                  )}
                  <p className="text-white leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}

