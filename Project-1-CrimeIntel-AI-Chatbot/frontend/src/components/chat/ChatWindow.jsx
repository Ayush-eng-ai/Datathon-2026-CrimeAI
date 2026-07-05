import MessageBubble from "./MessageBubble"

function ChatWindow() {
  const messages = [
    {
      type: "bot",
      title: "CrimeIntel AI",
      message: "Hello Officer! 👋 How can I assist you today?",
    },
    {
      type: "user",
      message: "Show crimes in Bengaluru in 2024.",
    },
    {
      type: "bot",
      title: "CrimeIntel AI",
      message:
        "I can help retrieve crime records, summarize cases, identify hotspots, and generate PDF reports.",
    },
  ]

  const prompts = [
    "Show crimes in Bengaluru in 2024",
    "Find cyber crime cases",
    "Summary of recent theft cases",
    "Generate report of NDPS cases",
  ]

  return (
    <section className="rounded-3xl border border-cyan-400/10 bg-[#050b16]/80 p-6 shadow-[0_0_60px_rgba(14,165,233,0.08)]">
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div>
          <div className="h-[380px] space-y-4 overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/80 p-5">
            {messages.map((item, index) => (
              <MessageBubble
                key={index}
                type={item.type}
                title={item.title}
                message={item.message}
              />
            ))}
          </div>

          <div className="mt-5">
            <p className="text-sm font-semibold text-cyan-300">
              Suggested Prompts
            </p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {prompts.map((prompt) => (
                <button
                  key={prompt}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-200"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative hidden overflow-hidden rounded-3xl border border-cyan-400/10 bg-gradient-to-br from-cyan-400/10 via-blue-500/5 to-purple-500/10 p-6 xl:block">
          <div className="absolute right-10 top-10 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl"></div>
          <div className="relative flex h-full flex-col items-center justify-center text-center">
            <div className="flex h-44 w-44 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-5xl font-black text-cyan-300 shadow-[0_0_80px_rgba(34,211,238,0.25)]">
              AI
            </div>
            <h3 className="mt-6 text-2xl font-bold text-white">
              Investigation Intelligence
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Natural language search, case summaries, multilingual support, and report generation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChatWindow