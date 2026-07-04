import MessageBubble from "./MessageBubble"

function ChatWindow() {
  const messages = [
    {
      type: "bot",
      message: "Hello Officer, ask me anything about crime records.",
    },
    {
      type: "user",
      message: "Show murder cases in Bengaluru district.",
    },
    {
      type: "bot",
      message:
        "I found related crime records. You can filter by year, police station, crime type, or case status.",
    },
  ]

  return (
    <div className="h-[430px] space-y-4 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950 p-5">
      {messages.map((item, index) => (
        <MessageBubble key={index} type={item.type} message={item.message} />
      ))}
    </div>
  )
}

export default ChatWindow