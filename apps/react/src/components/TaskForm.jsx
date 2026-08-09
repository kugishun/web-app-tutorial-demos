import { useRef, useState } from 'react'

const initialForm = {
  title: '',
  priority: 'medium',
  dueDate: '',
}

export default function TaskForm({ onAdd }) {
  const [form, setForm] = useState(initialForm)
  const titleInputRef = useRef(null)

  function updateField(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.title.trim()) return

    onAdd({ ...form, title: form.title.trim() })
    setForm(initialForm)
    titleInputRef.current?.focus()
  }

  return (
    <aside className="task-creator">
      <div className="section-heading">
        <div>
          <p className="eyebrow">NEW TASK</p>
          <h2>タスクを追加</h2>
        </div>
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <label>
          タスク名
          <input
            ref={titleInputRef}
            name="title"
            type="text"
            maxLength="80"
            placeholder="例：発表資料を仕上げる"
            value={form.title}
            onChange={updateField}
            required
          />
        </label>

        <div className="form-row">
          <label>
            優先度
            <select name="priority" value={form.priority} onChange={updateField}>
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>
          </label>

          <label>
            期限
            <input
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={updateField}
            />
          </label>
        </div>

        <button className="button button-primary" type="submit">
          タスクを追加
        </button>
      </form>

      <div className="learning-note">
        <span>Reactでの観察ポイント</span>
        <p>Stateを変更すると、各コンポーネントの表示が自動的に再計算されます。</p>
      </div>
    </aside>
  )
}

