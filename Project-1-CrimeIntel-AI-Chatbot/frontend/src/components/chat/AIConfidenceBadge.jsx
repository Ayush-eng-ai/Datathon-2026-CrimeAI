function AIConfidenceBadge({ confidence = 0 }) {
  const percentage = Math.round(confidence * 100)

  let badgeClass =
    "border-red-400/30 bg-red-400/10 text-red-300"

  if (percentage >= 80) {
    badgeClass =
      "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
  } else if (percentage >= 60) {
    badgeClass =
      "border-amber-400/30 bg-amber-400/10 text-amber-300"
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${badgeClass}`}
    >
      Confidence: {percentage}%
    </span>
  )
}

export default AIConfidenceBadge