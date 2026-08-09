export const STORAGE_KEY = 'focus-board-react-tasks-v1'

export const priorityLabels = {
  high: '高',
  medium: '中',
  low: '低',
}

export const priorityWeights = {
  high: 0,
  medium: 1,
  low: 2,
}

export function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`
}

function getRelativeDate(daysFromToday) {
  const date = new Date()
  date.setDate(date.getDate() + daysFromToday)
  return date.toISOString().slice(0, 10)
}

export function createDemoTasks() {
  const now = Date.now()

  return [
    {
      id: createId(),
      title: 'ReactのState設計を確認する',
      priority: 'high',
      dueDate: getRelativeDate(1),
      completed: false,
      createdAt: now,
    },
    {
      id: createId(),
      title: 'コンポーネントの責務を整理する',
      priority: 'medium',
      dueDate: getRelativeDate(3),
      completed: false,
      createdAt: now - 1000,
    },
    {
      id: createId(),
      title: 'Propsでデータを受け渡す',
      priority: 'low',
      dueDate: getRelativeDate(-1),
      completed: true,
      createdAt: now - 2000,
    },
  ]
}

export function loadTasks() {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY)
    return storedTasks ? JSON.parse(storedTasks) : createDemoTasks()
  } catch {
    return createDemoTasks()
  }
}

export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export function formatDueDate(dueDate) {
  if (!dueDate) return null

  const due = new Date(`${dueDate}T00:00:00`)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dayDifference = Math.round((due - today) / 86400000)
  const formatted = new Intl.DateTimeFormat('ja-JP', {
    month: 'short',
    day: 'numeric',
  }).format(due)

  if (dayDifference < 0) return { label: `${formatted}（期限超過）`, overdue: true }
  if (dayDifference === 0) return { label: `${formatted}（今日）`, overdue: false }
  if (dayDifference === 1) return { label: `${formatted}（明日）`, overdue: false }
  return { label: formatted, overdue: false }
}

