'use client'

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="text-lg text-zinc-600 dark:text-zinc-400">Chargement...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
            PredictionXpert
          </h1>
          <button
            onClick={signOut}
            className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            Déconnexion
          </button>
        </div>
        
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h2 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Bienvenue, {user.email}!
          </h2>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Vous êtes maintenant connecté à PredictionXpert.
          </p>
        </div>
        
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Link
            href="/dashboard"
            className="flex h-12 w-full items-center justify-center rounded-full bg-black px-5 text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200 md:w-[158px]"
          >
            Tableau de bord
          </Link>
        </div>
      </main>
    </div>
  );
}
