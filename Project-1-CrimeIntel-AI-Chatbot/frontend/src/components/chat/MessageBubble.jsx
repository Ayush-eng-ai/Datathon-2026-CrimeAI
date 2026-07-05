function MessageBubble({ type, title, message }) {
  const isUser = type === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xl rounded-2xl px-5 py-4 ${
          isUser
            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
            : "border border-white/10 bg-white/10 text-slate-100"
        }`}
      >
        {title && <p className="mb-1 text-sm font-bold text-cyan-300">{title}</p>}
        <p className="leading-7">{message}</p>
      </div>
    </div>
  )
}

export default MessageBubble