import { useEffect, useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import PageHeader from "../../components/ui/PageHeader"
import StatCard from "../../components/ui/StatCard"
import GlassCard from "../../components/ui/GlassCard"

import { getDashboardStats } from "../../services/dashboardService"
import {
  getCaseStatusAnalytics,
  getCrimeByDistrict,
  getCrimeByType,
  getMonthlyTrend,
} from "../../services/analyticsService"

const pieColors = ["#22d3ee", "#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"]

function Dashboard() {
  const [stats, setStats] = useState([
    { title: "Total Cases", value: 0, change: "Live", icon: "📁" },
    { title: "Victims", value: 0, change: "Live", icon: "👤" },
    { title: "Accused", value: 0, change: "Live", icon: "⚖️" },
    { title: "Reports", value: 0, change: "Live", icon: "📄" },
  ])

  const [monthlyTrend, setMonthlyTrend] = useState([])
  const [crimeByDistrict, setCrimeByDistrict] = useState([])
  const [crimeByType, setCrimeByType] = useState([])
  const [caseStatus, setCaseStatus] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true)
        setError("")

        const [
          dashboardData,
          monthlyData,
          districtData,
          crimeTypeData,
          statusData,
        ] = await Promise.all([
          getDashboardStats(),
          getMonthlyTrend(),
          getCrimeByDistrict(),
          getCrimeByType(),
          getCaseStatusAnalytics(),
        ])

        setStats([
          {
            title: "Total Cases",
            value: dashboardData.total_cases ?? 0,
            change: "Live",
            icon: "📁",
          },
          {
            title: "Victims",
            value: dashboardData.total_victims ?? 0,
            change: "Live",
            icon: "👤",
          },
          {
            title: "Accused",
            value: dashboardData.total_accused ?? 0,
            change: "Live",
            icon: "⚖️",
          },
          {
            title: "Reports",
            value: dashboardData.total_reports ?? 0,
            change: "Live",
            icon: "📄",
          },
        ])

        setMonthlyTrend(
          (monthlyData.data || []).map((item) => ({
            ...item,
            period: `${item.month}/${item.year}`,
          }))
        )

        setCrimeByDistrict(districtData.data || [])
        setCrimeByType(crimeTypeData.data || [])
        setCaseStatus(statusData.data || [])
      } catch (err) {
        console.error("Dashboard analytics error:", err)
        setError(
          "Dashboard analytics load nahi ho pa rahi. Backend server aur analytics APIs check karo."
        )
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader
        label="CrimeVision Overview"
        title="Crime Intelligence Dashboard"
        description="Monitor live crime trends, district activity, case status and investigation insights."
      />

      {loading && (
        <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-cyan-300">
          Loading live dashboard analytics...
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
          {error}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <GlassCard>
          <h3 className="text-xl font-bold text-white">Monthly Crime Trend</h3>
          <p className="mt-2 text-sm text-slate-400">
            FIR registrations grouped by month and year.
          </p>

          <div className="mt-6 h-80 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
            {monthlyTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTrend}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(148, 163, 184, 0.15)"
                  />

                  <XAxis
                    dataKey="period"
                    stroke="#94a3b8"
                    tick={{ fontSize: 12 }}
                  />

                  <YAxis
                    allowDecimals={false}
                    stroke="#94a3b8"
                    tick={{ fontSize: 12 }}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#020617",
                      border: "1px solid rgba(34, 211, 238, 0.25)",
                      borderRadius: "12px",
                      color: "#ffffff",
                    }}
                  />

                  <Bar
                    dataKey="total_cases"
                    name="Total Cases"
                    fill="#22d3ee"
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-slate-500">
                No monthly crime data available.
              </div>
            )}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xl font-bold text-white">Case Status Distribution</h3>
          <p className="mt-2 text-sm text-slate-400">
            Live distribution of solved, open and investigation cases.
          </p>

          <div className="mt-6 h-80 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
            {caseStatus.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={caseStatus}
                    dataKey="total_cases"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={105}
                    paddingAngle={4}
                    label={({ status, total_cases }) =>
                      `${status}: ${total_cases}`
                    }
                  >
                    {caseStatus.map((item, index) => (
                      <Cell
                        key={`${item.status}-${index}`}
                        fill={pieColors[index % pieColors.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#020617",
                      border: "1px solid rgba(34, 211, 238, 0.25)",
                      borderRadius: "12px",
                      color: "#ffffff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-slate-500">
                No case status data available.
              </div>
            )}
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <GlassCard>
          <h3 className="text-xl font-bold text-white">Crime by District</h3>
          <p className="mt-2 text-sm text-slate-400">
            District-wise FIR distribution from PostgreSQL.
          </p>

          <div className="mt-6 h-80 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
            {crimeByDistrict.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={crimeByDistrict}
                  layout="vertical"
                  margin={{ left: 30 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(148, 163, 184, 0.15)"
                  />

                  <XAxis
                    type="number"
                    allowDecimals={false}
                    stroke="#94a3b8"
                  />

                  <YAxis
                    type="category"
                    dataKey="district"
                    width={110}
                    stroke="#94a3b8"
                    tick={{ fontSize: 11 }}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#020617",
                      border: "1px solid rgba(34, 211, 238, 0.25)",
                      borderRadius: "12px",
                      color: "#ffffff",
                    }}
                  />

                  <Bar
                    dataKey="total_cases"
                    name="Total Cases"
                    fill="#3b82f6"
                    radius={[0, 10, 10, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-slate-500">
                No district analytics available.
              </div>
            )}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xl font-bold text-white">Crime Type Signals</h3>
          <p className="mt-2 text-sm text-slate-400">
            Major crime categories ranked by case count.
          </p>

          <div className="mt-6 space-y-5">
            {crimeByType.map((item) => {
              const maximumCases = Math.max(
                ...crimeByType.map((crime) => crime.total_cases),
                1
              )

              const width = `${(item.total_cases / maximumCases) * 100}%`

              return (
                <div key={item.crime_type}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-300">{item.crime_type}</span>
                    <span className="text-cyan-300">
                      {item.total_cases} case(s)
                    </span>
                  </div>

                  <div className="h-3 rounded-full bg-slate-800">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                      style={{ width }}
                    />
                  </div>
                </div>
              )
            })}

            {!loading && crimeByType.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 text-center text-slate-500">
                No crime type analytics available.
              </div>
            )}
          </div>

          <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
            <p className="font-semibold text-cyan-300">Live Intelligence</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              All charts are generated from FastAPI analytics endpoints using
              live PostgreSQL aggregation results.
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

export default Dashboard