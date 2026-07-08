import { useState } from "react"

import Header from "../../components/layout/Header"
import ChatWindow from "../../components/chat/ChatWindow"
import ChatInput from "../../components/chat/ChatInput"
import { sendChatMessage } from "../../services/chatService"

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      title: "CrimeIntel AI",
      message: "Hello Officer! 👋 How can I assist you today?",
    },
  ])

  const [loading, setLoading] = useState(false)

  const handleSendMessage = async (text) => {
    if (!text.trim()) return

    const userMessage = {
      type: "user",
      message: text,
    }

    setMessages((prev) => [...prev, userMessage])
    setLoading(true)

    try {
      const response = await sendChatMessage(text)

      const botMessage = {
        type: "bot",
        title: "CrimeIntel AI",
        message: response.data.answer,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          title: "CrimeIntel AI",
          message: "Backend se response nahi aa pa raha. FastAPI server check karo.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      <Header />
      <ChatWindow messages={messages} loading={loading} />
      <ChatInput onSendMessage={handleSendMessage} loading={loading} />
    </div>
  )
}

export default Chatbot