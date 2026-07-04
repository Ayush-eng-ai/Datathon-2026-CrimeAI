function MessageBubble({ type, message }) {
  const isUser = type === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xl rounded-xl p-4 ${
          isUser ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-100"
        }`}
      >
        {message}
      </div>
    </div>
  )
}

export default MessageBubble