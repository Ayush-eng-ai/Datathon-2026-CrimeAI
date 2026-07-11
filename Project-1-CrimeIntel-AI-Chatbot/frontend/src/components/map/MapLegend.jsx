function MapLegend() {
  const items = [
    {
      label: "High Risk",
      className: "bg-red-500",
    },
    {
      label: "Medium Risk",
      className: "bg-amber-400",
    },
    {
      label: "Low Risk",
      className: "bg-emerald-400",
    },
  ]

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-3 py-2 text-xs text-slate-300"
        >
          <span
            className={`h-3 w-3 rounded-full ${item.className}`}
          />
          {item.label}
        </div>
      ))}
    </div>
  )
}

export default MapLegend