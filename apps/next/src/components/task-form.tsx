import { useRef, useState } from 'react'
import type { TaskInput } from '@/types/task'

const initialForm: TaskInput = {
  title: '',
  priority: 'medium',
  dueDate: '',
}

type TaskFormProps = {
  onAdd: (task: TaskInput) => void
}

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [form, setForm] = useState<TaskInput>(initialForm)
  const titleInputRef = useRef<HTMLInputElement>(null)

  function updateField<Name extends keyof TaskInput>(name: Name, value: TaskInput[Name]): void {
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    if (!form.title.trim()) return

    onAdd({ ...form, title: form.title.trim() })
    setForm(initialForm)
    titleInputRef.current?.focus()
  }

  return (
    <aside className="task-creator">
      <div className="section-heading">
        <div><p className="eyebrow">NEW TASK</p><h2>タスクを追加</h2></div>
      </div>
      <form className="task-form" onSubmit={handleSubmit}>
        <label>
          タスク名
          <input
            ref={titleInputRef}
            type="text"
            maxLength={80}
            placeholder="例：型エラーを確認する"
            value={form.title}
            onChange={(event) => updateField('title', event.target.value)}
            required
          />
        </label>
        <div className="form-row">
          <label>
            優先度
            <select
              value={form.priority}
              onChange={(event) =>
                updateField('priority', event.target.value as TaskInput['priority'])
              }
            >
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>
          </label>
          <label>
            期限
            <input
              type="date"
              value={form.dueDate}
              onChange={(event) => updateField('dueDate', event.target.value)}
            />
          </label>
        </div>
        <button className="button button-primary" type="submit">タスクを追加</button>
      </form>
      <div className="learning-note">
        <span>TypeScriptでの観察ポイント</span>
        <p>`onAdd`へ渡せる値はTaskInput型で決まり、誤った値はビルド時に検出されます。</p>
      </div>
    </aside>
  )
}
