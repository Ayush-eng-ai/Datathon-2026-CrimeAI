import { NavLink } from "react-router-dom"

function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "⌂" },
    { name: "AI Chat", path: "/chatbot", icon: "◆" },
    { name: "Crime Search", path: "/crime-search", icon: "⌕" },
    { name: "Case Summary", path: "/case-summary", icon: "▣" },
    { name: "PDF Reports", path: "/reports", icon: "▤" },
    { name: "Settings", path: "/settings", icon: "⚙" },
  ]

  return (
    <aside className="fixed left-0 top-0 z-20 h-screen w-72 border-r border-cyan-400/10 bg-[#07111f]/95 px-5 py-6 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-xl text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.25)]">
          AI
        </div>

        <div>
          <h1 className="text-xl font-black tracking-wide text-white">
            CrimeIntel <span className="text-cyan-400">AI</span>
          </h1>
          <p className="text-xs text-slate-400">KSP Crime Assistant</p>
        </div>
      </div>

      <nav className="mt-10 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                isActive
                  ? "bg-cyan-400/15 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.12)]"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-300">
              {item.icon}
            </span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-6 left-5 right-5 rounded-2xl border border-cyan-400/10 bg-white/5 p-4">
        <p className="text-xs text-slate-400">System Status</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]"></span>
          <p className="text-sm font-semibold text-slate-200">Frontend Online</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar