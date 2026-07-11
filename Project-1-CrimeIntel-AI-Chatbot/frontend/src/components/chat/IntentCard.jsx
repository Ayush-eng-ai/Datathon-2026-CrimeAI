import AIConfidenceBadge from "./AIConfidenceBadge"

function IntentCard({ intent }) {
  if (!intent) return null

  const chips = [
    ...(intent.crime_types || []).map((item) => ({
      label: item,
      icon: "🚨",
    })),
    ...(intent.locations || []).map((item) => ({
      label: item,
      icon: "📍",
    })),
  ]

  if (intent.status) {
    chips.push({
      label: intent.status,
      icon: "📂",
    })
  }

  if (intent.year) {
    chips.push({
      label: intent.year,
      icon: "📅",
    })
  }

  return (
    <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.06] p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            AI Query Understanding
          </p>

          <p className="mt-1 text-sm font-semibold capitalize text-white">
            Intent: {intent.intent?.replaceAll("_", " ") || "crime search"}
          </p>
        </div>

        <AIConfidenceBadge confidence={intent.confidence} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {chips.map((chip, index) => (
          <span
            key={`${chip.label}-${index}`}
            className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1.5 text-xs capitalize text-slate-300"
          >
            {chip.icon} {chip.label}
          </span>
        ))}

        {chips.length === 0 && (
          <span className="text-sm text-slate-400">
            No specific filters detected.
          </span>
        )}
      </div>
    </div>
  )
}

export default IntentCard