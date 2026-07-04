function Header() {
  return (
    <header className="mb-6 flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold text-white">Intelligent Crime Chatbot</h2>
        <p className="mt-1 text-slate-400">
          Ask natural language questions about crime records.
        </p>
      </div>

      <div className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
        Officer Mode
      </div>
    </header>
  )
}

export default Header