import { useEffect, useState } from "react"

import PageHeader from "../../components/ui/PageHeader"
import GlassCard from "../../components/ui/GlassCard"
import PrimaryButton from "../../components/ui/PrimaryButton"

import { createPDFReport, getReports } from "../../services/reportService"

function Reports() {
  const [reports, setReports] = useState([])
  const [reportTitle, setReportTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const loadReports = async () => {
    try {
      setLoading(true)
      setError("")

      const response = await getReports()
      setReports(response.data || [])
    } catch (err) {
      setError("Reports load nahi ho pa rahe. FastAPI server check karo.")
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateReport = async () => {
    if (!reportTitle.trim()) {
      setError("Please enter report title first.")
      return
    }

    try {
      setLoading(true)
      setError("")

      await createPDFReport(reportTitle)
      setReportTitle("")
      await loadReports()
    } catch (err) {
      setError("PDF report placeholder create nahi ho pa raha.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadReports()
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader
        label="PDF Report Center"
        title="Reports"
        description="Generate, download and manage AI generated crime reports."
      />

      <GlassCard>
        <div className="grid gap-4 md:grid-cols-[1fr_auto_auto]">
          <input
            value={reportTitle}
            onChange={(e) => setReportTitle(e.target.value)}
            placeholder="Enter report title..."
            className="rounded-2xl border border-white/10 bg-slate-950/80 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/50"
          />

          <PrimaryButton onClick={handleGenerateReport} disabled={loading}>
            {loading ? "Processing..." : "Generate New Report"}
          </PrimaryButton>

          <PrimaryButton variant="outline">
            Export All PDFs
          </PrimaryButton>
        </div>

        {error && (
          <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}
      </GlassCard>

      <GlassCard>
        <h3 className="text-xl font-bold text-white">Generated Reports</h3>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left">
            <thead className="bg-cyan-400/10 text-cyan-200">
              <tr>
                <th className="px-5 py-4">Report</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">File Path</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {reports.map((item) => (
                <tr
                  key={item.report_id}
                  className="bg-slate-950/60 text-slate-300"
                >
                  <td className="px-5 py-5 font-semibold text-white">
                    {item.report_title}
                  </td>

                  <td className="px-5 py-5">{item.report_type}</td>

                  <td className="px-5 py-5">{item.file_path || "N/A"}</td>

                  <td className="px-5 py-5">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="px-5 py-5">
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
                      Generated
                    </span>
                  </td>
                </tr>
              ))}

              {!loading && reports.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-5 py-8 text-center text-slate-400">
                    No reports generated yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}

export default Reports