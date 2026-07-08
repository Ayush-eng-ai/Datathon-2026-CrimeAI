import { useState } from "react"

import PageHeader from "../../components/ui/PageHeader"
import GlassCard from "../../components/ui/GlassCard"
import PrimaryButton from "../../components/ui/PrimaryButton"

import { generateSummary } from "../../services/summaryService"

function CaseSummary() {
  const [caseText, setCaseText] = useState("")
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleGenerateSummary = async () => {
    if (!caseText.trim()) {
      setError("Please paste FIR or case details first.")
      return
    }

    try {
      setLoading(true)
      setError("")

      const response = await generateSummary(caseText)
      setSummary(response.data.generated_summary)
    } catch (err) {
      setError("Backend se summary generate nahi ho pa rahi. FastAPI server check karo.")
    } finally {
      setLoading(false)
    }
  }

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
            value={caseText}
            onChange={(e) => setCaseText(e.target.value)}
            className="mt-4 h-80 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/80 p-5 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/50"
            placeholder="Paste FIR or case details here..."
          />

          {error && (
            <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            <PrimaryButton onClick={handleGenerateSummary}>
              {loading ? "Generating..." : "Generate Summary"}
            </PrimaryButton>

            <PrimaryButton variant="outline">
              Export PDF
            </PrimaryButton>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xl font-bold text-white">AI Generated Summary</h3>

          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
              <p className="font-semibold text-cyan-300">Case Overview</p>
              <p className="mt-2">
                {summary || "AI generated summary will appear here after processing."}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
              <p className="font-semibold text-cyan-300">Key Entities</p>
              <p className="mt-2">
                Victim, accused, location, offence category, and timeline extraction will be added in the next AI phase.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
              <p className="font-semibold text-cyan-300">Investigation Notes</p>
              <p className="mt-2">
                Investigation recommendations and legal section mapping will be added after RAG/LLM integration.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

export default CaseSummary