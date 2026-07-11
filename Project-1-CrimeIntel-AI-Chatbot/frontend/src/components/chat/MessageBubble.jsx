import IntentCard from "./IntentCard"
import EvidenceCard from "./EvidenceCard"

function MessageBubble({
  type,
  title,
  message,
  intent,
  sources = [],
  totalMatches = 0,
  loading = false,
}) {
  const isUser = type === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`${
          isUser ? "max-w-xl" : "w-full max-w-4xl"
        } rounded-2xl px-5 py-4 ${
          isUser
            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
            : "border border-white/10 bg-white/[0.06] text-slate-100"
        }`}
      >
        {title && (
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-bold text-cyan-300">
              {title}
            </p>

            {!isUser && intent && (
              <span className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-xs text-slate-400">
                {totalMatches} FIR source(s)
              </span>
            )}
          </div>
        )}

        <p className="whitespace-pre-line leading-7">
          {message}
        </p>

        {loading && (
          <div className="mt-4 flex items-center gap-2 text-sm text-cyan-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300 [animation-delay:150ms]" />
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300 [animation-delay:300ms]" />
            <span className="ml-2">
              Searching police database...
            </span>
          </div>
        )}

        {!isUser && intent && (
          <IntentCard intent={intent} />
        )}

        {!isUser && sources.length > 0 && (
          <div className="mt-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Grounded FIR Evidence
              </p>

              <span className="text-xs text-slate-500">
                {sources.length} source(s)
              </span>
            </div>

            <div className="space-y-3">
              {sources.map((source, index) => (
                <EvidenceCard
                  key={
                    source.case_master_id ||
                    `${source.crime_no}-${index}`
                  }
                  source={source}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        {!isUser && intent && (
          <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3 text-xs leading-5 text-emerald-200">
            Grounded response: This answer is based only on FIR
            evidence retrieved from PostgreSQL.
          </div>
        )}
      </div>
    </div>
  )
}

export default MessageBubble