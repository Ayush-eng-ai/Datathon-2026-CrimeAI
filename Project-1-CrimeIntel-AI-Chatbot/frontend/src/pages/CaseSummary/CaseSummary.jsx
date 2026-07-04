function CaseSummary() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-3xl font-bold text-white">Case Summary</h2>
      <p className="mt-2 text-slate-400">
        Generate AI-powered summaries from FIRs and crime case records.
      </p>

      <textarea
        className="mt-6 h-60 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-cyan-400"
        placeholder="Paste FIR or case details here..."
      />

      <button className="mt-5 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950">
        Generate Summary
      </button>
    </div>
  )
}

export default CaseSummary