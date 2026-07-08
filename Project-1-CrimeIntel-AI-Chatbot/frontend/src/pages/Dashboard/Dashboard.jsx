import { useEffect, useState } from "react"

import PageHeader from "../../components/ui/PageHeader"
import StatCard from "../../components/ui/StatCard"
import GlassCard from "../../components/ui/GlassCard"

import { getDashboardStats } from "../../services/dashboardService"

function Dashboard() {
  const [stats, setStats] = useState([
    { title: "Total Cases", value: 0, change: "Live", icon: "📁" },
    { title: "Victims", value: 0, change: "Live", icon: "👤" },
    { title: "Accused", value: 0, change: "Live", icon: "⚖️" },
    { title: "Reports", value: 0, change: "Live", icon: "📄" },
  ])

const [loading, setLoading] = useState(true)

  const trends = [
    { crime: "Cyber Crime", value: "High", width: "88%" },
    { crime: "Theft", value: "Medium", width: "62%" },
    { crime: "Robbery", value: "High", width: "74%" },
    { crime: "NDPS", value: "Medium", width: "55%" },
  ]

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboardStats()

        setStats([
          {
            title: "Total Cases",
            value: data.total_cases,
            change: "Live",
            icon: "📁",
          },
          {
            title: "Victims",
            value: data.total_victims,
            change: "Live",
            icon: "👤",
          },
          {
            title: "Accused",
            value: data.total_accused,
            change: "Live",
            icon: "⚖️",
          },
          {
            title: "Reports",
            value: data.total_reports,
            change: "Live",
            icon: "📄",
          },
        ])
      } catch (error) {
        console.error("Dashboard API Error:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  return (
    <div className="space-y-6">
      {loading && (
        <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-cyan-300">
          Loading dashboard analytics...
        </div>
      )}
      <PageHeader
        label="CrimeVision Overview"
        title="Crime Intelligence Dashboard"
        description="Monitor crime trends, district risk, repeat offenders, and investigation insights."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassCard>
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
        </GlassCard>

        <GlassCard>
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
        </GlassCard>
      </div>
    </div>
  )
}

export default Dashboard