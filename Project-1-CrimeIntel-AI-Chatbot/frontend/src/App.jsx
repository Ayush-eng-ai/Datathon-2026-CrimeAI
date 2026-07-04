import Sidebar from "./components/layout/Sidebar"
import Header from "./components/layout/Header"
import ChatWindow from "./components/chat/ChatWindow"
import ChatInput from "./components/chat/ChatInput"

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <Header />
            <ChatWindow />
            <ChatInput />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App