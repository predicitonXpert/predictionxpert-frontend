'use client'

interface SuggestionCardProps {
  title: string
  description: string
  onClick: () => void
  disabled?: boolean
}

export function SuggestionCard({ title, description, onClick, disabled }: SuggestionCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="group rounded-xl border border-zinc-200 bg-white p-4 text-left transition-all hover:border-zinc-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
    >
      <h4 className="mb-1 font-semibold text-zinc-900 group-hover:text-zinc-700">
        {title}
      </h4>
      <p className="text-sm text-zinc-500">{description}</p>
    </button>
  )
}
