import { useEffect, useRef, useState } from 'react'

export default function EditDialog({ task, onSave, onClose }) {
  const dialogRef = useRef(null)
  const [form, setForm] = useState(task)

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  function updateField(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  function handleSubmit(event) {
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
          <div>
            <p className="eyebrow">EDIT TASK</p>
            <h2>タスクを編集</h2>
          </div>
          <button className="icon-button dialog-close" type="button" onClick={onClose}>
            <span aria-hidden="true">×</span>
            <span className="sr-only">閉じる</span>
          </button>
        </div>

        <label>
          タスク名
          <input
            name="title"
            type="text"
            maxLength="80"
            value={form.title}
            onChange={updateField}
            autoFocus
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

        <div className="dialog-actions">
          <button className="button button-secondary" type="button" onClick={onClose}>
            キャンセル
          </button>
          <button className="button button-primary" type="submit">
            変更を保存
          </button>
        </div>
      </form>
    </dialog>
  )
}

