import { Routes, Route, Navigate } from "react-router-dom"
import Sidebar from "./components/layout/Sidebar"
import Dashboard from "./pages/Dashboard/Dashboard"
import Chatbot from "./pages/Chatbot/Chatbot"
import Reports from "./pages/Reports/Reports"
import Settings from "./pages/Settings/Settings"

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/chatbot" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App