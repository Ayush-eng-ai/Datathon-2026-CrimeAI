function TimelineItem({ event, isLast }) {
  const isCurrent = event.status === "current"

  return (
    <div className="relative flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full border ${
            isCurrent
              ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-300"
              : "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
          }`}
        >
          {isCurrent ? "✓" : "●"}
        </div>

        {!isLast && (
          <div className="h-full min-h-16 w-px bg-gradient-to-b from-cyan-400/40 to-white/10" />
        )}
      </div>

      <div className="pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <h4 className="font-semibold text-white">{event.title}</h4>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isCurrent
                ? "bg-emerald-400/10 text-emerald-300"
                : "bg-cyan-400/10 text-cyan-300"
            }`}
          >
            {isCurrent ? "Current" : "Completed"}
          </span>
        </div>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          {event.description}
        </p>

        <p className="mt-2 text-xs text-slate-500">
          {event.event_date
            ? new Date(event.event_date).toLocaleString()
            : "Date not available"}
        </p>
      </div>
    </div>
  )
}

export default TimelineItem