import TimelineItem from "./TimelineItem"
import SimilarCaseCard from "./SimilarCaseCard"
import InvestigationAssistantPanel from "./InvestigationAssistantPanel"

function TimelineModal({
  isOpen,
  onClose,
  timeline,
  loading,
  error,
  recommendations = [],
  recommendationsLoading = false,
  recommendationsError = "",
  onOpenSimilarCase,
  investigationData,
  investigationLoading = false,
  investigationError = "",
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-cyan-400/20 bg-[#050b16] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Investigation Workflow
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              Case Timeline
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10"
          >
            Close
          </button>
        </div>

        {loading && (
          <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5 text-cyan-200">
            Loading investigation timeline...
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-5 text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && timeline && (
          <>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: "Crime No",
                  value: timeline.crime_no,
                },
                {
                  label: "Case No",
                  value: timeline.case_no,
                },
                {
                  label: "Crime Type",
                  value: timeline.crime_type,
                },
                {
                  label: "Status",
                  value: timeline.current_status,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-slate-950/70 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                    {item.label}
                  </p>

                  <p className="mt-2 font-semibold text-white">
                    {item.value || "Not available"}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  District
                </p>
                <p className="mt-2 text-slate-200">
                  {timeline.district || "Not available"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  Police Station
                </p>
                <p className="mt-2 text-slate-200">
                  {timeline.police_station || "Not available"}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Brief Facts
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {timeline.brief_facts || "No brief facts available."}
              </p>
            </div>

            <div className="mt-8">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-bold text-white">
                  Investigation Timeline
                </h3>

                <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs text-slate-400">
                  {timeline.total_events || 0} event(s)
                </span>
              </div>

              <div>
                {(timeline.events || []).map((event, index) => (
                  <TimelineItem
                    key={`${event.event_type}-${index}`}
                    event={event}
                    isLast={index === timeline.events.length - 1}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.06] p-4 text-xs leading-5 text-cyan-200">
              Timeline Source: {timeline.timeline_source}
            </div>

            <div className="mt-8">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                    AI Historical Intelligence
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-white">
                    Similar Case Recommendations
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    Weighted matching based on crime type, district,
                    investigation status and narrative keywords.
                  </p>
                </div>

                <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs text-slate-400">
                  {recommendations.length} recommendation(s)
                </span>
              </div>

              {recommendationsLoading && (
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5 text-cyan-200">
                  Comparing this FIR with historical cases...
                </div>
              )}

              {recommendationsError && (
                <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-5 text-red-300">
                  {recommendationsError}
                </div>
              )}

              {!recommendationsLoading &&
                !recommendationsError &&
                recommendations.length > 0 && (
                  <div className="grid gap-4 xl:grid-cols-2">
                    {recommendations.map((item) => (
                      <SimilarCaseCard
                        key={item.case_master_id}
                        item={item}
                        onOpenTimeline={onOpenSimilarCase}
                      />
                    ))}
                  </div>
                )}

              {!recommendationsLoading &&
                !recommendationsError &&
                recommendations.length === 0 && (
                  <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 text-center text-slate-400">
                    No similar historical cases found.
                  </div>
                )}
            </div>
            <div className="mt-8">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  AI Decision Support
                </p>

                <h3 className="mt-2 text-xl font-bold text-white">
                  Investigation Assistant
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Evidence checklist, suggested investigation actions and rule-based risk alerts.
                </p>
              </div>

              <InvestigationAssistantPanel
                data={investigationData}
                loading={investigationLoading}
                error={investigationError}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default TimelineModal