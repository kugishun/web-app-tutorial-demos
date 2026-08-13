import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Focus Board Next',
    template: '%s | Focus Board Next',
  },
  description: 'TypeScriptとNext.jsで作成したタスク管理アプリの教材デモ',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <header className="site-header">
          <Link className="site-brand" href="/">
            Focus Board <span>Next</span>
          </Link>
          <nav aria-label="メインナビゲーション">
            <Link href="/">概要</Link>
            <Link href="/tasks">タスク</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}
