function Header() {
  return (
    <header className="mb-6 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          CrimeIntel AI
        </p>
        <h2 className="mt-2 text-3xl font-black text-white">
          Intelligent Crime Chatbot
        </h2>
        <p className="mt-2 text-slate-400">
          Ask natural language questions about Karnataka crime records.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
          English ▾
        </button>
        <button className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
          Officer Mode
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
          🔔
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
          👤
        </button>
      </div>
    </header>
  )
}

export default Header