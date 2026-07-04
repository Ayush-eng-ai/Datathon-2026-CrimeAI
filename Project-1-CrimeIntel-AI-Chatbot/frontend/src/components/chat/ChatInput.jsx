function ChatInput() {
  return (
    <div className="mt-6 flex gap-3">
      <input
        className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
        placeholder="Ask about crime data..."
      />

      <button className="rounded-xl border border-slate-700 px-5 py-3 text-white">
        🎤
      </button>

      <button className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950">
        Send
      </button>

      <button className="rounded-xl border border-slate-700 px-6 py-3 text-white">
        Export PDF
      </button>
    </div>
  )
}

export default ChatInput