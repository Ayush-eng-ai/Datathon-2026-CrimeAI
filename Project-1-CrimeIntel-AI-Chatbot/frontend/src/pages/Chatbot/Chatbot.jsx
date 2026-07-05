import Header from "../../components/layout/Header"
import ChatWindow from "../../components/chat/ChatWindow"
import ChatInput from "../../components/chat/ChatInput"

function Chatbot() {
  return (
    <div className="space-y-5">
      <Header />
      <ChatWindow />
      <ChatInput />
    </div>
  )
}

export default Chatbot