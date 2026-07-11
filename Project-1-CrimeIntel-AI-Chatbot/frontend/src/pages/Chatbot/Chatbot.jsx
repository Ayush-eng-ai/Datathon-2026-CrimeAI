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
      intent: null,
      sources: [],
      totalMatches: 0,
    },
  ])

  const [loading, setLoading] = useState(false)

  const handleSendMessage = async (text) => {
    const cleanText = text.trim()

    if (!cleanText || loading) return

    const userMessage = {
      type: "user",
      message: cleanText,
    }

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ])

    setLoading(true)

    try {
      const response = await sendChatMessage(cleanText)
      const responseData = response.data

      const botMessage = {
        type: "bot",
        title: "CrimeIntel AI",
        message: responseData.answer,
        intent: responseData.intent || null,
        sources: responseData.sources || [],
        totalMatches: responseData.total_matches || 0,
      }

      setMessages((previousMessages) => [
        ...previousMessages,
        botMessage,
      ])
    } catch (error) {
      console.error("Chat API Error:", error)

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          type: "bot",
          title: "CrimeIntel AI",
          message:
            "Backend se response nahi aa pa raha. FastAPI server aur database connection check karo.",
          intent: null,
          sources: [],
          totalMatches: 0,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      <Header />

      <ChatWindow
        messages={messages}
        loading={loading}
        onPromptClick={handleSendMessage}
      />

      <ChatInput
        onSendMessage={handleSendMessage}
        loading={loading}
      />
    </div>
  )
}

export default Chatbot