function StatCard({ title, value, change, icon }) {
  return (
    <div className="rounded-3xl border border-cyan-400/10 bg-[#050b16]/80 p-6 shadow-[0_0_45px_rgba(14,165,233,0.06)]">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-2xl">
          {icon}
        </div>

        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
          {change}
        </span>
      </div>

      <p className="mt-5 text-sm text-slate-400">{title}</p>
      <h3 className="mt-2 text-3xl font-black text-white">{value}</h3>
    </div>
  )
}

export default StatCard