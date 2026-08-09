export default function Summary({ tasks }) {
  const total = tasks.length
  const completed = tasks.filter((task) => task.completed).length
  const active = total - completed
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <section className="summary-grid" aria-label="タスクの概要">
      <article className="summary-card summary-card-primary">
        <span>進捗</span>
        <strong>{progress}%</strong>
        <div className="progress-track" aria-hidden="true">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </article>
      <article className="summary-card">
        <span>すべて</span>
        <strong>{total}</strong>
      </article>
      <article className="summary-card">
        <span>未完了</span>
        <strong>{active}</strong>
      </article>
      <article className="summary-card">
        <span>完了</span>
        <strong>{completed}</strong>
      </article>
    </section>
  )
}

