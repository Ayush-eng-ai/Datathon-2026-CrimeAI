import { useEffect, useState } from "react"
import PageHeader from "../../components/ui/PageHeader"
import GlassCard from "../../components/ui/GlassCard"
import PrimaryButton from "../../components/ui/PrimaryButton"
import { searchCrimes } from "../../services/searchService"

function CrimeSearch() {
  const [keyword, setKeyword] = useState("")
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchRecords = async (searchKeyword = "") => {
    try {
      setLoading(true)
      setError("")

      const result = await searchCrimes({
        keyword: searchKeyword || undefined,
      })

      setRecords(result.data || [])
    } catch (err) {
      setError("Backend se crime records load nahi ho pa rahe. FastAPI server check karo.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecords()
  }, [])

  const handleSearch = () => {
    fetchRecords(keyword)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        label="Crime Database"
        title="Crime Search"
        description="Search crime records using district, crime type, police station, year, status, and keywords."
      />

      <GlassCard className="bg-[#050b16]/80">
        <div className="grid gap-4 md:grid-cols-3">
          <input
            placeholder="Search Keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="rounded-2xl border border-white/10 bg-slate-950/80 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/50"
          />

          {["District", "Crime Type", "Year", "Case Status", "Police Station"].map((item) => (
            <input
              key={item}
              placeholder={`${item} Coming Soon`}
              disabled
              className="rounded-2xl border border-white/10 bg-slate-950/50 px-5 py-4 text-slate-500 outline-none placeholder:text-slate-600"
            />
          ))}
        </div>

        <PrimaryButton className="mt-5" onClick={handleSearch}>
          {loading ? "Searching..." : "Search Records"}
        </PrimaryButton>

        {error && (
          <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}
      </GlassCard>

      <GlassCard>
        <h3 className="text-xl font-bold text-white">Live Crime Records</h3>

        <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-cyan-400/10 text-cyan-200">
              <tr>
                <th className="px-4 py-4">Crime No</th>
                <th className="px-4 py-4">Case No</th>
                <th className="px-4 py-4">Registered Date</th>
                <th className="px-4 py-4">Police Station ID</th>
                <th className="px-4 py-4">Status ID</th>
                <th className="px-4 py-4">Brief Facts</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {records.map((record) => (
                <tr key={record.case_master_id} className="bg-slate-950/50 text-slate-300">
                  <td className="px-4 py-4 font-semibold text-white">{record.crime_no}</td>
                  <td className="px-4 py-4">{record.case_no}</td>
                  <td className="px-4 py-4">{record.crime_registered_date}</td>
                  <td className="px-4 py-4">{record.police_station_id || "N/A"}</td>
                  <td className="px-4 py-4">{record.case_status_id || "N/A"}</td>
                  <td className="px-4 py-4 max-w-md text-slate-400">
                    {record.brief_facts || "No details available"}
                  </td>
                </tr>
              ))}

              {!loading && records.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-slate-400">
                    No crime records found.
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

export default CrimeSearch