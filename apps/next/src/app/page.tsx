import Link from 'next/link'

const technologies = [
  {
    name: 'JavaScript',
    kind: '言語',
    description: 'ブラウザやNode.jsで実行される処理を記述します。',
  },
  {
    name: 'TypeScript',
    kind: '言語の拡張',
    description: 'JavaScriptに型検査を加え、実行前に問題を発見しやすくします。',
  },
  {
    name: 'React',
    kind: 'UIライブラリ',
    description: 'StateからUIを宣言し、コンポーネントとして分割します。',
  },
  {
    name: 'Next.js',
    kind: 'フレームワーク',
    description: 'Reactにルーティングやサーバー実行などアプリ全体の構成を加えます。',
  },
]

export default function HomePage() {
  return (
    <main className="landing-shell">
      <section className="landing-hero">
        <div>
          <p className="eyebrow">NEXT.JS + TYPESCRIPT DEMO</p>
          <h1>UIからWebアプリケーションへ。</h1>
          <p className="landing-copy">
            このページはServer Componentです。操作が必要なタスク画面だけをClient
            Componentとして分離しています。
          </p>
          <div className="landing-actions">
            <Link className="button button-primary" href="/tasks">
              タスクアプリを開く
            </Link>
            <a
              className="button button-secondary"
              href="https://nextjs.org/docs/app"
              target="_blank"
              rel="noreferrer"
            >
              Next.js公式ドキュメント
            </a>
          </div>
        </div>
        <div className="server-card">
          <span>SERVER COMPONENT</span>
          <strong>app/page.tsx</strong>
          <p>Stateやイベントを持たないため、`use client`は必要ありません。</p>
        </div>
      </section>

      <section className="technology-grid" aria-labelledby="technology-title">
        <div className="technology-heading">
          <p className="eyebrow">TECHNOLOGY MAP</p>
          <h2 id="technology-title">それぞれの役割</h2>
        </div>
        <div className="technology-cards">
          {technologies.map((technology) => (
            <article key={technology.name} className="technology-card">
              <span>{technology.kind}</span>
              <h3>{technology.name}</h3>
              <p>{technology.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
