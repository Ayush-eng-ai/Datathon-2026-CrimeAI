function Sidebar() {
  return (
    <aside className="w-72 min-h-screen border-r border-slate-800 bg-slate-900 p-6">
      <h1 className="text-2xl font-bold text-cyan-400">CrimeIntel AI</h1>
      <p className="mt-2 text-sm text-slate-400">KSP Crime Database Chatbot</p>

      <nav className="mt-8 space-y-3">
        {["AI Chat", "Crime Search", "PDF Reports", "Settings"].map((item, index) => (
          <div
            key={item}
            className={`rounded-lg px-4 py-3 ${
              index === 0
                ? "bg-cyan-500/10 text-cyan-300"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            {item}
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar