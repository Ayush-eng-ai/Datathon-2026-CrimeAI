function CrimeSearch() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-3xl font-bold text-white">Crime Search</h2>
      <p className="mt-2 text-slate-400">
        Search crime records by district, crime type, police station, year, and case status.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {["District", "Crime Type", "Year", "Case Status", "Police Station", "Search Keyword"].map(
          (item) => (
            <input
              key={item}
              placeholder={item}
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          )
        )}
      </div>

      <button className="mt-5 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950">
        Search Records
      </button>
    </div>
  )
}

export default CrimeSearch