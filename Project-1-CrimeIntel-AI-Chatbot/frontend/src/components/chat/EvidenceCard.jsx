function EvidenceCard({ source, index }) {
  const relevance = Math.round(
    (source.relevance_score || 0) * 100
  )

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
            Evidence Source {index + 1}
          </p>

          <p className="mt-2 font-semibold text-white">
            Crime No: {source.crime_no || "Not available"}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Case No: {source.case_no || "Not available"}
          </p>
        </div>

        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
          {relevance}% Relevant
        </span>
      </div>

      <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
        <div>
          <span className="text-slate-500">District</span>
          <p className="mt-1 text-slate-200">
            {source.district || "Not available"}
          </p>
        </div>

        <div>
          <span className="text-slate-500">Police Station</span>
          <p className="mt-1 text-slate-200">
            {source.police_station || "Not available"}
          </p>
        </div>

        <div>
          <span className="text-slate-500">Crime Type</span>
          <p className="mt-1 text-slate-200">
            {source.crime_sub_head ||
              source.crime_head ||
              "Not available"}
          </p>
        </div>

        <div>
          <span className="text-slate-500">Status</span>
          <p className="mt-1 text-slate-200">
            {source.status || "Not available"}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <span className="text-sm text-slate-500">Case Facts</span>

        <p className="mt-2 text-sm leading-6 text-slate-300">
          {source.brief_facts || "No case facts available."}
        </p>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
          style={{ width: `${relevance}%` }}
        />
      </div>
    </div>
  )
}

export default EvidenceCard