// import { useEffect, useState } from "react"
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Cell,
//   Pie,
//   PieChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts"

// import PageHeader from "../../components/ui/PageHeader"
// import StatCard from "../../components/ui/StatCard"
// import GlassCard from "../../components/ui/GlassCard"

// import { getDashboardStats } from "../../services/dashboardService"
// import {
//   getCaseStatusAnalytics,
//   getCrimeByDistrict,
//   getCrimeByType,
//   getMonthlyTrend,
// } from "../../services/analyticsService"
// import CrimeMap from "../../components/map/CrimeMap"

// const pieColors = ["#22d3ee", "#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"]

// function Dashboard() {
//   const [stats, setStats] = useState([
//     { title: "Total Cases", value: 0, change: "Live", icon: "📁" },
//     { title: "Victims", value: 0, change: "Live", icon: "👤" },
//     { title: "Accused", value: 0, change: "Live", icon: "⚖️" },
//     { title: "Reports", value: 0, change: "Live", icon: "📄" },
//   ])

//   const [monthlyTrend, setMonthlyTrend] = useState([])
//   const [crimeByDistrict, setCrimeByDistrict] = useState([])
//   const [crimeByType, setCrimeByType] = useState([])
//   const [caseStatus, setCaseStatus] = useState([])

//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState("")

//   useEffect(() => {
//     const loadDashboard = async () => {
//       try {
//         setLoading(true)
//         setError("")

//         const [
//           dashboardData,
//           monthlyData,
//           districtData,
//           crimeTypeData,
//           statusData,
//         ] = await Promise.all([
//           getDashboardStats(),
//           getMonthlyTrend(),
//           getCrimeByDistrict(),
//           getCrimeByType(),
//           getCaseStatusAnalytics(),
//         ])

//         setStats([
//           {
//             title: "Total Cases",
//             value: dashboardData.total_cases ?? 0,
//             change: "Live",
//             icon: "📁",
//           },
//           {
//             title: "Victims",
//             value: dashboardData.total_victims ?? 0,
//             change: "Live",
//             icon: "👤",
//           },
//           {
//             title: "Accused",
//             value: dashboardData.total_accused ?? 0,
//             change: "Live",
//             icon: "⚖️",
//           },
//           {
//             title: "Reports",
//             value: dashboardData.total_reports ?? 0,
//             change: "Live",
//             icon: "📄",
//           },
//         ])

//         setMonthlyTrend(
//           (monthlyData.data || []).map((item) => ({
//             ...item,
//             period: `${item.month}/${item.year}`,
//           }))
//         )

//         setCrimeByDistrict(districtData.data || [])
//         setCrimeByType(crimeTypeData.data || [])
//         setCaseStatus(statusData.data || [])
//       } catch (err) {
//         console.error("Dashboard analytics error:", err)
//         setError(
//           "Dashboard analytics load nahi ho pa rahi. Backend server aur analytics APIs check karo."
//         )
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadDashboard()
//   }, [])

//   return (
//     <div className="space-y-6">
//       <PageHeader
//         label="CrimeVision Overview"
//         title="Crime Intelligence Dashboard"
//         description="Monitor live crime trends, district activity, case status and investigation insights."
//       />

//       {loading && (
//         <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-cyan-300">
//           Loading live dashboard analytics...
//         </div>
//       )}

//       {error && (
//         <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
//           {error}
//         </div>
//       )}

//       <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
//         {stats.map((item) => (
//           <StatCard key={item.title} {...item} />
//         ))}
//       </div>

//       <div className="grid gap-6 xl:grid-cols-2">
//         <GlassCard>
//           <h3 className="text-xl font-bold text-white">Monthly Crime Trend</h3>
//           <p className="mt-2 text-sm text-slate-400">
//             FIR registrations grouped by month and year.
//           </p>

//           <div className="mt-6 h-80 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
//             {monthlyTrend.length > 0 ? (
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={monthlyTrend}>
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     stroke="rgba(148, 163, 184, 0.15)"
//                   />

//                   <XAxis
//                     dataKey="period"
//                     stroke="#94a3b8"
//                     tick={{ fontSize: 12 }}
//                   />

//                   <YAxis
//                     allowDecimals={false}
//                     stroke="#94a3b8"
//                     tick={{ fontSize: 12 }}
//                   />

//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "#020617",
//                       border: "1px solid rgba(34, 211, 238, 0.25)",
//                       borderRadius: "12px",
//                       color: "#ffffff",
//                     }}
//                   />

//                   <Bar
//                     dataKey="total_cases"
//                     name="Total Cases"
//                     fill="#22d3ee"
//                     radius={[10, 10, 0, 0]}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="flex h-full items-center justify-center text-slate-500">
//                 No monthly crime data available.
//               </div>
//             )}
//           </div>
//         </GlassCard>

//         <GlassCard>
//           <h3 className="text-xl font-bold text-white">Case Status Distribution</h3>
//           <p className="mt-2 text-sm text-slate-400">
//             Live distribution of solved, open and investigation cases.
//           </p>

//           <div className="mt-6 h-80 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
//             {caseStatus.length > 0 ? (
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={caseStatus}
//                     dataKey="total_cases"
//                     nameKey="status"
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={65}
//                     outerRadius={105}
//                     paddingAngle={4}
//                     label={({ status, total_cases }) =>
//                       `${status}: ${total_cases}`
//                     }
//                   >
//                     {caseStatus.map((item, index) => (
//                       <Cell
//                         key={`${item.status}-${index}`}
//                         fill={pieColors[index % pieColors.length]}
//                       />
//                     ))}
//                   </Pie>

//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "#020617",
//                       border: "1px solid rgba(34, 211, 238, 0.25)",
//                       borderRadius: "12px",
//                       color: "#ffffff",
//                     }}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="flex h-full items-center justify-center text-slate-500">
//                 No case status data available.
//               </div>
//             )}
//           </div>
//         </GlassCard>
//       </div>

//       <div className="grid gap-6 xl:grid-cols-2">
//         <GlassCard>
//           <h3 className="text-xl font-bold text-white">Crime by District</h3>
//           <p className="mt-2 text-sm text-slate-400">
//             District-wise FIR distribution from PostgreSQL.
//           </p>

//           <div className="mt-6 h-80 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
//             {crimeByDistrict.length > 0 ? (
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart
//                   data={crimeByDistrict}
//                   layout="vertical"
//                   margin={{ left: 30 }}
//                 >
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     stroke="rgba(148, 163, 184, 0.15)"
//                   />

//                   <XAxis
//                     type="number"
//                     allowDecimals={false}
//                     stroke="#94a3b8"
//                   />

//                   <YAxis
//                     type="category"
//                     dataKey="district"
//                     width={110}
//                     stroke="#94a3b8"
//                     tick={{ fontSize: 11 }}
//                   />

//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "#020617",
//                       border: "1px solid rgba(34, 211, 238, 0.25)",
//                       borderRadius: "12px",
//                       color: "#ffffff",
//                     }}
//                   />

//                   <Bar
//                     dataKey="total_cases"
//                     name="Total Cases"
//                     fill="#3b82f6"
//                     radius={[0, 10, 10, 0]}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="flex h-full items-center justify-center text-slate-500">
//                 No district analytics available.
//               </div>
//             )}
//           </div>
//         </GlassCard>

//         <GlassCard>
//           <h3 className="text-xl font-bold text-white">Crime Type Signals</h3>
//           <p className="mt-2 text-sm text-slate-400">
//             Major crime categories ranked by case count.
//           </p>

//           <div className="mt-6 space-y-5">
//             {crimeByType.map((item) => {
//               const maximumCases = Math.max(
//                 ...crimeByType.map((crime) => crime.total_cases),
//                 1
//               )

//               const width = `${(item.total_cases / maximumCases) * 100}%`

//               return (
//                 <div key={item.crime_type}>
//                   <div className="mb-2 flex justify-between text-sm">
//                     <span className="text-slate-300">{item.crime_type}</span>
//                     <span className="text-cyan-300">
//                       {item.total_cases} case(s)
//                     </span>
//                   </div>

//                   <div className="h-3 rounded-full bg-slate-800">
//                     <div
//                       className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
//                       style={{ width }}
//                     />
//                   </div>
//                 </div>
//               )
//             })}

//             {!loading && crimeByType.length === 0 && (
//               <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 text-center text-slate-500">
//                 No crime type analytics available.
//               </div>
//             )}
//           </div>

//           <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
//             <p className="font-semibold text-cyan-300">Live Intelligence</p>
//             <p className="mt-2 text-sm leading-6 text-slate-300">
//               All charts are generated from FastAPI analytics endpoints using
//               live PostgreSQL aggregation results.
//             </p>
//           </div>
//         </GlassCard>
        
//       </div>
//       <GlassCard>
//           <div className="mb-6">
//             <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
//               Geospatial Intelligence
//             </p>

//             <h3 className="mt-2 text-2xl font-bold text-white">
//               Karnataka Crime Intelligence Map
//             </h3>

//             <p className="mt-2 text-sm leading-6 text-slate-400">
//               Explore live FIR locations, crime types, investigation
//               status and risk levels using PostgreSQL coordinates.
//             </p>
//           </div>

//           <CrimeMap />
//         </GlassCard>
//     </div>
//   )
// }

// export default Dashboard


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
      description: "All FIR records",
    },
    {
      label: "Solved Cases",
      value: summary.solved_cases,
      description: "Successfully resolved",
    },
    {
      label: "Open Cases",
      value: summary.open_cases,
      description: "Pending investigation",
    },
    {
      label: "Under Investigation",
      value: summary.under_investigation,
      description: "Currently active",
    },
  ]

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
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
          Crime Intelligence Platform
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white">
          Live Analytics Dashboard
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Real-time insights generated from PostgreSQL FIR records.
        </p>
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
            className="rounded-2xl border border-white/10 bg-slate-950/70 p-5"
          >
            <p className="text-sm text-slate-400">
              {card.label}
            </p>

            <p className="mt-3 text-3xl font-bold text-white">
              {card.value}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              {card.description}
            </p>
          </div>
        ))}
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