'use client'

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [lang, setLang] = useState<'en' | 'fr'>('en');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-lg text-zinc-400">
          {lang === 'en' ? 'Loading...' : 'Chargement...'}
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const content = {
    en: {
      slogan: "Your sidekick for sports betting.",
      tagline: "Everything about sports betting. Just ask now.",
      howItWorks: "How it works",
      howItWorksDesc: "Whether you're just starting, betting regularly, or already sharp, we're here to support your sports betting journey.",
      steps: [
        { num: "1", title: "Create your account", desc: "Sign up in seconds" },
        { num: "2", title: "Ask anything", desc: "Just type anything about sports betting, the chat answers instantly." },
        { num: "3", title: "Get clear guidance", desc: "No confusing stats, no overload, just simple explanations and smart insights." },
        { num: "4", title: "Bet smarter over time", desc: "The more you use it, the easier betting becomes." },
      ],
      whyTitle: "Why PredictionXpert",
      whyContent: [
        "Sports betting can be overwhelming. Too many stats, too much noise, and way too many \"experts\" yelling different opinions. PredictionXpert cuts through all of that.",
        "This isn't another dashboard or pick service. It's a conversation. You ask, it answers instantly.",
        "Before the game, during the game, and especially in live betting when timing matters most, we're here.",
        "Props, parlays, spreads, live bets — ask as the game unfolds.",
        "Simple like ChatGPT, but actually built for sports betting.",
        "Your shortcut to understanding bets without reading 1,000 stats.",
      ],
      whyBottom: [
        "Learn faster, Bet smarter with us.",
        "Sports betting shouldn't be complicated. We keep it simple for you.",
        "No waiting — we answer in seconds, 24/7.",
      ],
      startChat: "Start Chat",
      signOut: "Sign out",
    },
    fr: {
      slogan: "Ton compagnon pour tes paris sportifs.",
      tagline: "Tout sur les paris sportifs. Pose tes questions maintenant.",
      howItWorks: "Comment ça marche",
      howItWorksDesc: "Que tu commences, que tu mises régulièrement ou que tu sois déjà expérimenté, on est là pour t'accompagner dans tes paris sportifs.",
      steps: [
        { num: "1", title: "Crée ton compte", desc: "Inscription en quelques secondes, rien de compliqué." },
        { num: "2", title: "Pose ta question", desc: "Écris n'importe quoi sur les paris sportifs, le chat répond instantanément." },
        { num: "3", title: "Reçois des réponses claires", desc: "Pas de statistiques confuses ni d'informations inutiles, juste des explications simples et utiles." },
        { num: "4", title: "Parie plus intelligemment avec le temps", desc: "Plus tu l'utilises, plus tout devient facile." },
      ],
      whyTitle: "Pourquoi PredictionXpert",
      whyContent: [
        "Les paris sportifs peuvent devenir compliqués. Trop de statistiques et trop \"d'experts\" qui disent tous quelque chose de différent. PredictionXpert simplifie tout ça.",
        "Ce n'est pas une autre plateforme complexe ou un service de picks. C'est une conversation. Tu poses une question et tu reçois une réponse instantanément.",
        "Avant le match, pendant, et surtout en direct quand le timing est important, le chat est là.",
        "Props joueurs, parlays, spreads, paris live — pose tes questions au fur et à mesure que le match avance.",
        "Simple comme ChatGPT, mais réellement conçu pour les paris sportifs.",
        "Ton raccourci pour comprendre les paris sans lire 1 000 statistiques.",
      ],
      whyBottom: [
        "Apprends plus vite, parie plus intelligemment.",
        "Les paris sportifs ne devraient pas être compliqués. On rend ça simple pour toi.",
        "Pas d'attente. Le chat répond en quelques secondes, 24/7.",
      ],
      startChat: "Commencer",
      signOut: "Déconnexion",
    },
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-black font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-black">
                <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white">PredictionXpert</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </button>
            <button
              onClick={signOut}
              className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
            >
              {t.signOut}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            PredictionXpert
          </h1>
          <p className="mt-4 text-xl text-zinc-400 sm:text-2xl">
            {t.slogan}
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-zinc-500">
            {t.tagline}
          </p>
          <div className="mt-10">
            <Link
              href="/dashboard"
              className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-lg font-semibold text-black transition-all hover:bg-zinc-200 hover:scale-105"
            >
              {t.startChat}
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="border-t border-zinc-800 bg-zinc-950 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t.howItWorks}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-zinc-400">
              {t.howItWorksDesc}
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {t.steps.map((step, index) => (
              <div key={index} className="relative rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl font-bold text-black">
                  {step.num}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-400">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why PredictionXpert Section */}
      <section className="border-t border-zinc-800 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            {t.whyTitle}
          </h2>
          <div className="mt-12 space-y-6">
            {t.whyContent.map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed text-zinc-400">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            {t.whyBottom.map((line, index) => (
              <p key={index} className="mb-2 text-lg font-medium text-white last:mb-0">
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-zinc-800 bg-zinc-950 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {lang === 'en' ? 'Ready to bet smarter?' : 'Prêt à parier plus intelligemment?'}
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            {t.tagline}
          </p>
          <div className="mt-8">
            <Link
              href="/dashboard"
              className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-lg font-semibold text-black transition-all hover:bg-zinc-200 hover:scale-105"
            >
              {t.startChat}
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-black py-8">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} PredictionXpert. {lang === 'en' ? 'All rights reserved.' : 'Tous droits réservés.'}
          </p>
        </div>
      </footer>
    </div>
  );
}
