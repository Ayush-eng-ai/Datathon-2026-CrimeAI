import Header from "../../components/layout/Header"
import ChatWindow from "../../components/chat/ChatWindow"
import ChatInput from "../../components/chat/ChatInput"

function Chatbot() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <Header />
      <ChatWindow />
      <ChatInput />
    </div>
  )
}

export default Chatbot