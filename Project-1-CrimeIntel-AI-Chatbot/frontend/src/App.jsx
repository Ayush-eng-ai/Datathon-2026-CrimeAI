import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
        <aside className="w-72 border-r border-slate-800 bg-slate-900 p-6">
          <h1 className="text-2xl font-bold text-cyan-400">
            CrimeIntel AI
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            KSP Crime Database Chatbot
          </p>

          <nav className="mt-8 space-y-3">
            <p className="rounded-lg bg-cyan-500/10 px-4 py-3 text-cyan-300">
              AI Chat
            </p>
            <p className="rounded-lg px-4 py-3 text-slate-300">
              Crime Search
            </p>
            <p className="rounded-lg px-4 py-3 text-slate-300">
              PDF Reports
            </p>
            <p className="rounded-lg px-4 py-3 text-slate-300">
              Settings
            </p>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-3xl font-bold">
              Intelligent Crime Chatbot
            </h2>

            <p className="mt-2 text-slate-400">
              Ask natural language questions about crime records.
            </p>

            <div className="mt-8 h-96 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="mb-4 max-w-xl rounded-xl bg-slate-800 p-4">
                Hello Officer, ask me anything about crime records.
              </div>

              <div className="ml-auto max-w-xl rounded-xl bg-cyan-600 p-4">
                Show murder cases in Bengaluru district.
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <input
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
                placeholder="Ask about crime data..."
              />

              <button className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950">
                Send
              </button>

              <button className="rounded-xl border border-slate-700 px-6 py-3">
                Export PDF
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App