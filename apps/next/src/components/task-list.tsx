import { formatDueDate, priorityLabels } from '@/lib/tasks'
import type { Task } from '@/types/task'

type TaskListProps = {
  tasks: Task[]
  totalCount: number
  onToggle: (taskId: string) => void
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
}

export default function TaskList({
  tasks,
  totalCount,
  onToggle,
  onEdit,
  onDelete,
}: TaskListProps) {
  return (
    <>
      <p className="result-summary" aria-live="polite">
        {totalCount}件中 {tasks.length}件を表示
      </p>
      {tasks.length > 0 ? (
        <ul className="task-list">
          {tasks.map((task) => {
            const dueDate = formatDueDate(task.dueDate)
            return (
              <li key={task.id} className={`task-item${task.completed ? ' is-completed' : ''}`}>
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
                      <span className={`due-date${dueDate.overdue && !task.completed ? ' is-overdue' : ''}`}>
                        {dueDate.label}
                      </span>
                    )}
                  </div>
                </div>
                <div className="task-actions">
                  <button className="icon-button" type="button" onClick={() => onEdit(task)}>編集</button>
                  <button className="icon-button icon-button-danger" type="button" onClick={() => onDelete(task.id)}>削除</button>
                </div>
              </li>
            )
          })}
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
