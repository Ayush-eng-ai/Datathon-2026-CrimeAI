


import { useEffect, useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import CrimeMap from "../../components/map/CrimeMap"

import {
  getCaseStatusAnalytics,
  getCrimeByDistrict,
  getCrimeByType,
  getDashboardSummary,
  getMonthlyTrend,
} from "../../services/analyticsService"

const pieColors = [
  "#22d3ee",
  "#818cf8",
  "#f59e0b",
  "#34d399",
  "#f87171",
  "#a78bfa",
]

function Dashboard() {
  const [summary, setSummary] = useState({
    total_cases: 0,
    solved_cases: 0,
    open_cases: 0,
    under_investigation: 0,
  })

  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const [districtData, setDistrictData] = useState([])
  const [crimeTypeData, setCrimeTypeData] = useState([])
  const [monthlyData, setMonthlyData] = useState([])
  const [statusData, setStatusData] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true)
        setError("")

        const [
          summaryResponse,
          districtResponse,
          crimeTypeResponse,
          monthlyResponse,
          statusResponse,
        ] = await Promise.all([
          getDashboardSummary(),
          getCrimeByDistrict(),
          getCrimeByType(),
          getMonthlyTrend(),
          getCaseStatusAnalytics(),
        ])

        setSummary(summaryResponse)

        setDistrictData(
          districtResponse.data || []
        )

        setCrimeTypeData(
          crimeTypeResponse.data || []
        )

        setStatusData(
          statusResponse.data || []
        )

        setMonthlyData(
          (monthlyResponse.data || []).map((item) => ({
            ...item,
            period: `${item.month}/${item.year}`,
          }))
        )
      } catch (err) {
        console.error(err)
        setError("Dashboard analytics load nahi ho pa rahi.")
      } finally {
        setLoading(false)
      }
    }

    loadAnalytics()
  }, [])

  const cards = [
    {
      label: "Total Cases",
      value: summary.total_cases,
      description: "All FIR Records",
      icon: "📂",
      color: "from-cyan-500 to-blue-600",
      trend: "+12%",
    },
    {
      label: "Solved Cases",
      value: summary.solved_cases,
      description: "Successfully Resolved",
      icon: "✅",
      color: "from-emerald-500 to-green-600",
      trend: "+8%",
    },
    {
      label: "Open Cases",
      value: summary.open_cases,
      description: "Pending Investigation",
      icon: "🚨",
      color: "from-orange-500 to-red-500",
      trend: "-2%",
    },
    {
      label: "Under Investigation",
      value: summary.under_investigation,
      description: "Active Investigation",
      icon: "🕵️",
      color: "from-violet-500 to-purple-600",
      trend: "+5%",
    },
  ]

  const topDistrict = districtData.length
    ? districtData.reduce((prev, current) =>
        current.total_cases > prev.total_cases ? current : prev
      )
    : null

  const topCrimeType = crimeTypeData.length
    ? crimeTypeData.reduce((prev, current) =>
        current.total_cases > prev.total_cases ? current : prev
      )
    : null

  const solvedPercentage =
    summary.total_cases > 0
      ? ((summary.solved_cases / summary.total_cases) * 100).toFixed(1)
      : 0

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-6 py-4 text-cyan-200">
          Loading live crime analytics...
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Crime Intelligence Platform
          </p>

          <h1 className="mt-2 text-4xl font-extrabold text-white">
            Live Analytics Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            AI-powered real-time crime intelligence generated directly from PostgreSQL FIR records.
          </p>

        </div>

        <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 px-6 py-5 backdrop-blur-xl">

          <p className="text-xs uppercase tracking-widest text-cyan-300">
            AI SYSTEM STATUS
          </p>

          <h3 className="mt-2 text-2xl font-bold text-white">
            🟢 ONLINE
          </h3>

          <p className="mt-2 text-sm text-slate-300">
            Database Connected
          </p>

          <p className="text-sm text-slate-300">
            Analytics Active
          </p>

          <p className="text-sm text-slate-300">
            Investigation Engine Ready
          </p>
          <p className="mt-4 text-sm font-medium text-cyan-200">
            {currentTime.toLocaleString()}
          </p>

        </div>

      </div>

      
      <div className="mt-5 space-y-2">

        <div className="flex justify-between">
          <span className="text-slate-400">Database</span>
          <span className="text-emerald-400">🟢 Connected</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Analytics API</span>
          <span className="text-emerald-400">🟢 Running</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">AI Engine</span>
          <span className="text-yellow-400">🟡 Rule Based</span>
        </div>

      </div>

      {error && (
        <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-red-300">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`rounded-3xl bg-gradient-to-br ${card.color} p-[1px] shadow-xl`}
          >
            <div className="rounded-3xl bg-slate-950/90 p-6 backdrop-blur-xl">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-400">
                    {card.label}
                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-white">
                    {card.value}
                  </h2>

                </div>

                <div className="text-5xl">
                  {card.icon}
                </div>

              </div>

              <div className="mt-6 flex items-center justify-between">

                <p className="text-sm text-slate-400">
                  {card.description}
                </p>

                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400">
                  {card.trend}
                </span>

              </div>

            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-3">

        <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-6">

          <p className="text-xs uppercase tracking-widest text-cyan-300">
            🏆 Top Crime District
          </p>

          <h2 className="mt-3 text-2xl font-bold text-white">
            {topDistrict?.district || "N/A"}
          </h2>

          <p className="mt-2 text-slate-300">
            {topDistrict?.total_cases || 0} Registered Cases
          </p>

        </div>

        <div className="rounded-3xl border border-violet-500/20 bg-violet-500/10 p-6">

          <p className="text-xs uppercase tracking-widest text-violet-300">
            🚨 Highest Crime Type
          </p>

          <h2 className="mt-3 text-2xl font-bold text-white">
            {topCrimeType?.crime_type || "N/A"}
          </h2>

          <p className="mt-2 text-slate-300">
            {topCrimeType?.total_cases || 0} Cases
          </p>

        </div>

        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6">

          <p className="text-xs uppercase tracking-widest text-emerald-300">
            ✅ Solved Rate
          </p>

          <h2 className="mt-3 text-2xl font-bold text-white">
            {solvedPercentage}%
          </h2>

          <p className="mt-2 text-slate-300">
            Cases Successfully Closed
          </p>

        </div>

      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard
          title="Monthly Crime Trend"
          subtitle="Registered FIRs by month"
        >
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={monthlyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e293b"
              />

              <XAxis
                dataKey="period"
                stroke="#94a3b8"
              />

              <YAxis
                allowDecimals={false}
                stroke="#94a3b8"
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#020617",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                }}
              />

              <Line
                type="monotone"
                dataKey="total_cases"
                name="Cases"
                stroke="#22d3ee"
                strokeWidth={3}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Case Status Distribution"
          subtitle="Current investigation status"
        >
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="total_cases"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={105}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`${entry.status}-${index}`}
                    fill={pieColors[index % pieColors.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#020617",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                }}
              />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Crime Type Distribution"
          subtitle="Cases grouped by major crime category"
        >
          <ResponsiveContainer width="100%" height={360}>
            <BarChart
              data={crimeTypeData}
              layout="vertical"
              margin={{
                left: 25,
                right: 20,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e293b"
              />

              <XAxis
                type="number"
                allowDecimals={false}
                stroke="#94a3b8"
              />

              <YAxis
                type="category"
                dataKey="crime_type"
                width={120}
                stroke="#94a3b8"
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#020617",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                }}
              />

              <Bar
                dataKey="total_cases"
                name="Cases"
                fill="#818cf8"
                radius={[0, 8, 8, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="District Crime Ranking"
          subtitle="Highest number of FIRs by district"
        >
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={districtData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e293b"
              />

              <XAxis
                dataKey="district"
                stroke="#94a3b8"
              />

              <YAxis
                allowDecimals={false}
                stroke="#94a3b8"
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#020617",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                }}
              />

              <Bar
                dataKey="total_cases"
                name="Cases"
                fill="#34d399"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div>
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Geospatial Intelligence
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Interactive Crime Map
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            District-level crime activity and location intelligence.
          </p>
        </div>

        <CrimeMap />
      </div>
    </div>
  )
}

function ChartCard({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {subtitle}
        </p>
      </div>

      {children}
    </div>
  )
}

export default Dashboard