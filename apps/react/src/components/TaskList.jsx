import { formatDueDate, priorityLabels } from '../data/tasks.js'

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const dueDate = formatDueDate(task.dueDate)

  return (
    <li className={`task-item${task.completed ? ' is-completed' : ''}`}>
      <input
        className="task-checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`${task.title}を${task.completed ? '未完了' : '完了'}にする`}
      />

      <div className="task-content">
        <h3>{task.title}</h3>
        <div className="task-meta">
          <span className={`priority-badge priority-${task.priority}`}>
            優先度 {priorityLabels[task.priority]}
          </span>
          {dueDate && (
            <span
              className={`due-date${dueDate.overdue && !task.completed ? ' is-overdue' : ''}`}
            >
              {dueDate.label}
            </span>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button
          className="icon-button"
          type="button"
          onClick={() => onEdit(task)}
          aria-label={`${task.title}を編集`}
        >
          編集
        </button>
        <button
          className="icon-button icon-button-danger"
          type="button"
          onClick={() => onDelete(task.id)}
          aria-label={`${task.title}を削除`}
        >
          削除
        </button>
      </div>
    </li>
  )
}

export default function TaskList({ tasks, totalCount, onToggle, onEdit, onDelete }) {
  return (
    <>
      <p className="result-summary" aria-live="polite">
        {totalCount}件中 {tasks.length}件を表示
      </p>

      {tasks.length > 0 ? (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <div className="empty-icon" aria-hidden="true">✓</div>
          <h3>表示するタスクがありません</h3>
          <p>条件を変更するか、新しいタスクを追加してください。</p>
        </div>
      )}
    </>
  )
}

