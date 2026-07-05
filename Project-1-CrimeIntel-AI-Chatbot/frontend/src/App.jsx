import { Routes, Route, Navigate } from "react-router-dom"
import Sidebar from "./components/layout/Sidebar"
import Dashboard from "./pages/Dashboard/Dashboard"
import Chatbot from "./pages/Chatbot/Chatbot"
import CrimeSearch from "./pages/CrimeSearch/CrimeSearch"
import CaseSummary from "./pages/CaseSummary/CaseSummary"
import Reports from "./pages/Reports/Reports"
import Settings from "./pages/Settings/Settings"

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020617] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.15),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.12),transparent_35%)]"></div>

      <Sidebar />

      <main className="relative ml-72 min-h-screen p-6">
        <Routes>
          <Route path="/" element={<Navigate to="/chatbot" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/crime-search" element={<CrimeSearch />} />
          <Route path="/case-summary" element={<CaseSummary />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  )
}

export default App