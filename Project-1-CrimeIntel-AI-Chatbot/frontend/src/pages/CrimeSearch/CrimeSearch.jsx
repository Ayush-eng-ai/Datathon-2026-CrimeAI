import PageHeader from "../../components/ui/PageHeader"
import GlassCard from "../../components/ui/GlassCard"
import PrimaryButton from "../../components/ui/PrimaryButton"

function CrimeSearch() {
  const records = [
    { id: "KSP-CR-2024-001", type: "Cyber Crime", district: "Bengaluru", station: "Whitefield PS", status: "Under Investigation", risk: "High" },
    { id: "KSP-CR-2024-002", type: "Theft", district: "Mysuru", station: "Lakshmipuram PS", status: "Solved", risk: "Medium" },
    { id: "KSP-CR-2024-003", type: "Robbery", district: "Mangaluru", station: "Central PS", status: "Open", risk: "High" },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        label="Crime Database"
        title="Crime Search"
        description="Search crime records using district, crime type, police station, year, status, and keywords."
      />

      <GlassCard className="bg-[#050b16]/80">
        <div className="grid gap-4 md:grid-cols-3">
          {["District", "Crime Type", "Year", "Case Status", "Police Station", "Search Keyword"].map((item) => (
            <input
              key={item}
              placeholder={item}
              className="rounded-2xl border border-white/10 bg-slate-950/80 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/50"
            />
          ))}
        </div>

        <PrimaryButton className="mt-5">
          Search Records
        </PrimaryButton>
      </GlassCard>

      <GlassCard>
        <h3 className="text-xl font-bold text-white">Recent Crime Records</h3>

        <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-cyan-400/10 text-cyan-200">
              <tr>
                <th className="px-4 py-4">Case ID</th>
                <th className="px-4 py-4">Crime Type</th>
                <th className="px-4 py-4">District</th>
                <th className="px-4 py-4">Police Station</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Risk</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {records.map((record) => (
                <tr key={record.id} className="bg-slate-950/50 text-slate-300">
                  <td className="px-4 py-4 font-semibold text-white">{record.id}</td>
                  <td className="px-4 py-4">{record.type}</td>
                  <td className="px-4 py-4">{record.district}</td>
                  <td className="px-4 py-4">{record.station}</td>
                  <td className="px-4 py-4">{record.status}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-red-500/10 px-3 py-1 text-red-300">
                      {record.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}

export default CrimeSearch