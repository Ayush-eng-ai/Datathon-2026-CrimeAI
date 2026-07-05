function CaseSummary() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          AI Case Intelligence
        </p>
        <h2 className="mt-2 text-3xl font-black text-white">Case Summary</h2>
        <p className="mt-2 text-slate-400">
          Generate concise AI-powered summaries from FIRs and crime case records.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-cyan-400/10 bg-[#050b16]/80 p-6">
          <label className="text-sm font-semibold text-cyan-300">
            FIR / Case Details
          </label>

          <textarea
            className="mt-4 h-80 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/80 p-5 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/50"
            placeholder="Paste FIR or case details here..."
          />

          <div className="mt-5 flex flex-wrap gap-3">
            <button className="rounded-2xl bg-cyan-400 px-7 py-4 font-bold text-slate-950 hover:bg-cyan-300">
              Generate Summary
            </button>

            <button className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-6 py-4 font-semibold text-cyan-200 hover:bg-cyan-400/20">
              Export PDF
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-xl font-bold text-white">AI Generated Summary</h3>

          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
              <p className="font-semibold text-cyan-300">Case Overview</p>
              <p className="mt-2">
                The case summary will highlight key facts, crime type, location,
                involved persons, and investigation status.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
              <p className="font-semibold text-cyan-300">Key Entities</p>
              <p className="mt-2">
                Suspects, victims, police station, district, date, and related
                records will be extracted here.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
              <p className="font-semibold text-cyan-300">Investigation Notes</p>
              <p className="mt-2">
                AI will provide a structured summary to help officers quickly
                understand long FIR documents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaseSummary