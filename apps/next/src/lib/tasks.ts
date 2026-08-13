import type { Priority, Task } from '@/types/task'

export const STORAGE_KEY = 'focus-board-next-tasks-v1'

export const priorityLabels: Record<Priority, string> = {
  high: '高',
  medium: '中',
  low: '低',
}

export const priorityWeights: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
}

export function createId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`
}

function getRelativeDate(daysFromToday: number): string {
  const date = new Date()
  date.setDate(date.getDate() + daysFromToday)
  return date.toISOString().slice(0, 10)
}

export function createDemoTasks(): Task[] {
  const now = Date.now()

  return [
    {
      id: createId(),
      title: 'Server Componentの役割を確認する',
      priority: 'high',
      dueDate: getRelativeDate(1),
      completed: false,
      createdAt: now,
    },
    {
      id: createId(),
      title: 'TypeScriptの型エラーを試す',
      priority: 'medium',
      dueDate: getRelativeDate(3),
      completed: false,
      createdAt: now - 1000,
    },
    {
      id: createId(),
      title: 'App Routerでページを移動する',
      priority: 'low',
      dueDate: getRelativeDate(-1),
      completed: true,
      createdAt: now - 2000,
    },
  ]
}

export function loadTasks(): Task[] {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY)
    return storedTasks ? (JSON.parse(storedTasks) as Task[]) : createDemoTasks()
  } catch {
    return createDemoTasks()
  }
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export function formatDueDate(
  dueDate: string,
): { label: string; overdue: boolean } | null {
  if (!dueDate) return null

  const due = new Date(`${dueDate}T00:00:00`)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dayDifference = Math.round((due.getTime() - today.getTime()) / 86400000)
  const formatted = new Intl.DateTimeFormat('ja-JP', {
    month: 'short',
    day: 'numeric',
  }).format(due)

  if (dayDifference < 0) return { label: `${formatted}（期限超過）`, overdue: true }
  if (dayDifference === 0) return { label: `${formatted}（今日）`, overdue: false }
  if (dayDifference === 1) return { label: `${formatted}（明日）`, overdue: false }
  return { label: formatted, overdue: false }
}
