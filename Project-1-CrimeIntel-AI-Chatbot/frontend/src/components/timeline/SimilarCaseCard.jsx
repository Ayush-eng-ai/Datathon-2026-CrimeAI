function SimilarCaseCard({ item, onOpenTimeline }) {
  const similarity = Math.round(item.similarity_score || 0)

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/75 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
            Similar FIR
          </p>

          <h4 className="mt-2 font-semibold text-white">
            Crime No: {item.crime_no}
          </h4>

          <p className="mt-1 text-sm text-slate-400">
            Case No: {item.case_no}
          </p>
        </div>

        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
          {similarity}% Similar
        </span>
      </div>

      <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
        <div>
          <p className="text-slate-500">Crime Type</p>
          <p className="mt-1 text-slate-200">
            {item.crime_type || "Not available"}
          </p>
        </div>

        <div>
          <p className="text-slate-500">District</p>
          <p className="mt-1 text-slate-200">
            {item.district || "Not available"}
          </p>
        </div>

        <div>
          <p className="text-slate-500">Status</p>
          <p className="mt-1 text-slate-200">
            {item.status || "Not available"}
          </p>
        </div>

        <div>
          <p className="text-slate-500">Registered Date</p>
          <p className="mt-1 text-slate-200">
            {item.crime_registered_date || "Not available"}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          Match Reasons
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          {(item.match_reasons || []).map((reason, index) => (
            <span
              key={`${reason}-${index}`}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
            >
              {reason}
            </span>
          ))}

          {(item.match_reasons || []).length === 0 && (
            <span className="text-sm text-slate-500">
              No detailed match reason available.
            </span>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-400">
        {item.brief_facts || "No case facts available."}
      </p>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
          style={{ width: `${Math.min(similarity, 100)}%` }}
        />
      </div>

      <button
        type="button"
        onClick={() => onOpenTimeline(item.case_master_id)}
        className="mt-5 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20"
      >
        Open Similar Case Timeline
      </button>
    </div>
  )
}

export default SimilarCaseCard