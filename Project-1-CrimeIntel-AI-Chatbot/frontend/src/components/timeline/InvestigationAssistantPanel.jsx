function InvestigationAssistantPanel({
  data,
  loading,
  error,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5 text-cyan-200">
        Generating investigation assistance...
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-5 text-red-300">
        {error}
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
            Victims
          </p>
          <p className="mt-2 text-2xl font-bold text-white">
            {data.case_entities?.victim_count ?? 0}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
            Accused
          </p>
          <p className="mt-2 text-2xl font-bold text-white">
            {data.case_entities?.accused_count ?? 0}
          </p>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Evidence Checklist
        </p>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {(data.evidence_checklist || []).map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300"
            >
              ✓ {item}
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Recommended Investigation Steps
        </p>

        <div className="mt-3 space-y-3">
          {(data.recommended_steps || []).map((step, index) => (
            <div
              key={`${step.title}-${index}`}
              className="rounded-2xl border border-white/10 bg-slate-950/70 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-semibold text-white">
                  {step.title}
                </p>

                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                  {step.priority}
                </span>
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Risk Alerts
        </p>

        <div className="mt-3 space-y-3">
          {(data.risk_alerts || []).map((alert, index) => {
            const level = alert.level || "Low"

            const className =
              level === "High"
                ? "border-red-400/20 bg-red-400/10 text-red-300"
                : level === "Medium"
                  ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
                  : "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"

            return (
              <div
                key={`${alert.message}-${index}`}
                className={`rounded-2xl border p-4 ${className}`}
              >
                <p className="text-sm font-semibold">
                  {level} Risk
                </p>
                <p className="mt-2 text-sm leading-6">
                  {alert.message}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.06] p-4 text-xs leading-5 text-cyan-200">
        {data.assistant_note}
      </div>
    </div>
  )
}

export default InvestigationAssistantPanel