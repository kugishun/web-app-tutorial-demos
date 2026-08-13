import type { Metadata } from 'next'
import TaskBoard from './task-board'

export const metadata: Metadata = {
  title: 'タスク管理',
}

export default function TasksPage() {
  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">NEXT.JS CLIENT COMPONENT</p>
          <h1>Focus Board</h1>
          <p className="hero-copy">
            ページはServer Component、操作可能なボードはClient Componentです。
          </p>
        </div>
        <div className="boundary-note">
          <strong>Server → Client</strong>
          <span>page.tsx → task-board.tsx</span>
        </div>
      </header>
      <TaskBoard />
    </main>
  )
}
