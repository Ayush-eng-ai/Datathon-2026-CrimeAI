import PageHeader from "../../components/ui/PageHeader"
import GlassCard from "../../components/ui/GlassCard"
import PrimaryButton from "../../components/ui/PrimaryButton"

function CaseSummary() {
  return (
    <div className="space-y-6">
      <PageHeader
        label="AI Case Intelligence"
        title="Case Summary"
        description="Generate concise AI-powered summaries from FIRs and crime case records."
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="bg-[#050b16]/80">
          <label className="text-sm font-semibold text-cyan-300">
            FIR / Case Details
          </label>

          <textarea
            className="mt-4 h-80 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/80 p-5 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/50"
            placeholder="Paste FIR or case details here..."
          />

          <div className="mt-5 flex flex-wrap gap-3">
            <PrimaryButton>
              Generate Summary
            </PrimaryButton>

            <PrimaryButton variant="outline">
              Export PDF
            </PrimaryButton>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xl font-bold text-white">AI Generated Summary</h3>

          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
            {["Case Overview", "Key Entities", "Investigation Notes"].map((title) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
                <p className="font-semibold text-cyan-300">{title}</p>
                <p className="mt-2">
                  AI output will appear here after backend and RAG integration.
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

export default CaseSummary