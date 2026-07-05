function CrimeSearch() {
  const records = [
    {
      id: "KSP-CR-2024-001",
      type: "Cyber Crime",
      district: "Bengaluru",
      station: "Whitefield PS",
      status: "Under Investigation",
      risk: "High",
    },
    {
      id: "KSP-CR-2024-002",
      type: "Theft",
      district: "Mysuru",
      station: "Lakshmipuram PS",
      status: "Solved",
      risk: "Medium",
    },
    {
      id: "KSP-CR-2024-003",
      type: "Robbery",
      district: "Mangaluru",
      station: "Central PS",
      status: "Open",
      risk: "High",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Crime Database
        </p>
        <h2 className="mt-2 text-3xl font-black text-white">Crime Search</h2>
        <p className="mt-2 text-slate-400">
          Search crime records using district, crime type, police station, year, status, and keywords.
        </p>
      </div>

      <div className="rounded-3xl border border-cyan-400/10 bg-[#050b16]/80 p-6">
        <div className="grid gap-4 md:grid-cols-3">
          {["District", "Crime Type", "Year", "Case Status", "Police Station", "Search Keyword"].map(
            (item) => (
              <input
                key={item}
                placeholder={item}
                className="rounded-2xl border border-white/10 bg-slate-950/80 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/50"
              />
            )
          )}
        </div>

        <button className="mt-5 rounded-2xl bg-cyan-400 px-7 py-4 font-bold text-slate-950 hover:bg-cyan-300">
          Search Records
        </button>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
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
      </div>
    </div>
  )
}

export default CrimeSearch