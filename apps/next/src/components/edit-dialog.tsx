import { useEffect, useRef, useState } from 'react'
import type { Task } from '@/types/task'

type EditDialogProps = {
  task: Task
  onSave: (task: Task) => void
  onClose: () => void
}

export default function EditDialog({ task, onSave, onClose }: EditDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [form, setForm] = useState<Task>(task)

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal()
  }, [])

  function updateField<Name extends keyof Task>(name: Name, value: Task[Name]): void {
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    if (!form.title.trim()) return
    onSave({ ...form, title: form.title.trim() })
  }

  return (
    <dialog
      ref={dialogRef}
      className="edit-dialog"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="dialog-heading">
          <div><p className="eyebrow">EDIT TASK</p><h2>タスクを編集</h2></div>
          <button className="icon-button dialog-close" type="button" onClick={onClose} aria-label="閉じる">×</button>
        </div>
        <label>
          タスク名
          <input
            type="text"
            maxLength={80}
            value={form.title}
            onChange={(event) => updateField('title', event.target.value)}
            autoFocus
            required
          />
        </label>
        <div className="form-row">
          <label>
            優先度
            <select
              value={form.priority}
              onChange={(event) => updateField('priority', event.target.value as Task['priority'])}
            >
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>
          </label>
          <label>
            期限
            <input type="date" value={form.dueDate} onChange={(event) => updateField('dueDate', event.target.value)} />
          </label>
        </div>
        <div className="dialog-actions">
          <button className="button button-secondary" type="button" onClick={onClose}>キャンセル</button>
          <button className="button button-primary" type="submit">変更を保存</button>
        </div>
      </form>
    </dialog>
  )
}
