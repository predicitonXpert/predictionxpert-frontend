'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function SignupPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [postalCodeError, setPostalCodeError] = useState<string | null>(null)
  const [validatingPostalCode, setValidatingPostalCode] = useState(false)
  const [legalAccepted, setLegalAccepted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validatePostalCode = async (code: string): Promise<boolean> => {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    if (!mapboxToken) {
      console.error('Mapbox token not found')
      return true // Allow submission if token is missing
    }

    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(code)}.json?country=ca&types=postcode&access_token=${mapboxToken}`
    )
    const data = await response.json()

    return data.features && data.features.length > 0
  }
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setPostalCodeError(null)

    try {
      // Validate postal code with Mapbox
      setValidatingPostalCode(true)
      const isValidPostalCode = await validatePostalCode(postalCode)
      setValidatingPostalCode(false)

      if (!isValidPostalCode) {
        setPostalCodeError('Code postal invalide. Veuillez entrer un code postal canadien valide.')
        setLoading(false)
        return
      }

      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) throw authError

      // If user is created, update the users table with username and legal acceptance
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('users')
          .update({
            username,
            email,
            postal_code: postalCode,
            legal_accepted_at: new Date().toISOString(),
          })
          .eq('id', authData.user.id)

        if (profileError) {
          console.error('Error updating user profile:', profileError)
          // Continue anyway as the user is created
        }
      }

      router.push('/dashboard')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'An error occurred during signup')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-zinc-900">
        <h1 className="mb-6 text-3xl font-semibold text-black dark:text-zinc-50">
          Créer un compte
        </h1>
        
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-black shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50"
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-black shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-black shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50"
              placeholder="••••••••"
            />
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Minimum 6 caractères
            </p>
          </div>

          <div>
            <label
              htmlFor="postalCode"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Code postal
            </label>
            <input
              id="postalCode"
              type="text"
              value={postalCode}
              onChange={(e) => {
                setPostalCode(e.target.value.toUpperCase())
                setPostalCodeError(null)
              }}
              required
              className={`mt-1 block w-full rounded-md border bg-white px-3 py-2 text-black shadow-sm focus:outline-none dark:bg-zinc-800 dark:text-zinc-50 ${
                postalCodeError
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500 dark:border-zinc-600'
              }`}
              placeholder="A1A 1A1"
            />
            {postalCodeError && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {postalCodeError}
              </p>
            )}
          </div>

          <div className="flex items-start gap-3">
            <input
              id="legalAccepted"
              type="checkbox"
              checked={legalAccepted}
              onChange={(e) => setLegalAccepted(e.target.checked)}
              required
              className="mt-1 h-4 w-4 rounded border-zinc-300 text-black focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800"
            />
            <label
              htmlFor="legalAccepted"
              className="text-xs text-zinc-600 dark:text-zinc-400"
            >
              <span className="font-semibold text-red-600 dark:text-red-400">(Obligatoire)</span>{' '}
              Je confirme avoir 18 ans ou plus, respecter les lois de ma région concernant les paris sportifs, et comprendre que PredictionXpert ne garantit aucun résultat, peut faire des erreurs et doit être utilisé de façon responsable.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !legalAccepted}
            className="w-full rounded-md bg-black px-4 py-2 font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
          >
            {loading ? (validatingPostalCode ? 'Vérification du code postal...' : 'Création...') : 'Créer un compte'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Déjà un compte ?{' '}
          <Link
            href="/login"
            className="font-medium text-black hover:underline dark:text-zinc-50"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}
