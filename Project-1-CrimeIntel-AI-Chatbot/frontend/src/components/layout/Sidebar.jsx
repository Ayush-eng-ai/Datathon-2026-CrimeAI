import { NavLink } from "react-router-dom"

function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "AI Chat", path: "/chatbot", icon: "💬" },
    { name: "Crime Search", path: "/crime-search", icon: "🔍" },
    { name: "Case Summary", path: "/case-summary", icon: "📁" },
    { name: "PDF Reports", path: "/reports", icon: "📄" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
  ]

  return (
    <aside className="w-72 min-h-screen border-r border-slate-800 bg-slate-900 p-6">
      <h1 className="text-2xl font-bold text-cyan-400">CrimeIntel AI</h1>
      <p className="mt-2 text-sm text-slate-400">KSP Crime Database Assistant</p>

      <nav className="mt-8 space-y-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-cyan-500/10 text-cyan-300"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar