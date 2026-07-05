function Dashboard() {
  const stats = [
    { title: "Total Cases", value: "24,580", change: "+12.5%", icon: "📁" },
    { title: "Solved Cases", value: "18,240", change: "+8.2%", icon: "✅" },
    { title: "High Risk Zones", value: "42", change: "+5", icon: "📍" },
    { title: "Repeat Offenders", value: "1,284", change: "+3.1%", icon: "⚠️" },
  ]

  const trends = [
    { crime: "Cyber Crime", value: "High", width: "88%" },
    { crime: "Theft", value: "Medium", width: "62%" },
    { crime: "Robbery", value: "High", width: "74%" },
    { crime: "NDPS", value: "Medium", width: "55%" },
  ]

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          CrimeVision Overview
        </p>
        <h2 className="mt-2 text-3xl font-black text-white">
          Crime Intelligence Dashboard
        </h2>
        <p className="mt-2 text-slate-400">
          Monitor crime trends, district risk, repeat offenders, and investigation insights.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-cyan-400/10 bg-[#050b16]/80 p-6 shadow-[0_0_45px_rgba(14,165,233,0.06)]"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-2xl">
                {item.icon}
              </div>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                {item.change}
              </span>
            </div>

            <p className="mt-5 text-sm text-slate-400">{item.title}</p>
            <h3 className="mt-2 text-3xl font-black text-white">{item.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-xl font-bold text-white">Crime Trend Preview</h3>
          <p className="mt-2 text-sm text-slate-400">
            Placeholder chart area for yearly and monthly crime analysis.
          </p>

          <div className="mt-6 flex h-72 items-end gap-4 rounded-2xl border border-white/10 bg-slate-950/70 p-6">
            {[45, 68, 52, 80, 74, 92, 63, 88].map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-cyan-500 to-blue-400"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-slate-500">M{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-xl font-bold text-white">Crime Risk Signals</h3>

          <div className="mt-6 space-y-5">
            {trends.map((item) => (
              <div key={item.crime}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-300">{item.crime}</span>
                  <span className="text-cyan-300">{item.value}</span>
                </div>

                <div className="h-3 rounded-full bg-slate-800">
                  <div
                    className="h-3 rounded-full bg-cyan-400"
                    style={{ width: item.width }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-5">
            <p className="font-semibold text-red-300">Anomaly Alert</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Cyber crime cases show a sudden increase compared to the previous period.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard