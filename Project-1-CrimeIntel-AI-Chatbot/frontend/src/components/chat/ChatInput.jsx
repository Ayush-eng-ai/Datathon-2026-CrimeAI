function ChatInput() {
  return (
    <div className="mt-5 flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-3 md:flex-row">
      <input
        className="flex-1 rounded-2xl border border-transparent bg-slate-950/80 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/50"
        placeholder="Type your message..."
      />

      <button className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white transition hover:bg-white/10">
        🎤
      </button>

      <button className="rounded-2xl bg-cyan-400 px-7 py-4 font-bold text-slate-950 transition hover:bg-cyan-300">
        Send
      </button>

      <button className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-6 py-4 font-semibold text-cyan-200 transition hover:bg-cyan-400/20">
        Export PDF
      </button>
    </div>
  )
}

export default ChatInput