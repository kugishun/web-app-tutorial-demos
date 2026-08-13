export type Priority = 'high' | 'medium' | 'low'

export type Task = {
  id: string
  title: string
  priority: Priority
  dueDate: string
  completed: boolean
  createdAt: number
}

export type TaskInput = Pick<Task, 'title' | 'priority' | 'dueDate'>

export type TaskFilters = {
  search: string
  status: 'all' | 'active' | 'completed'
  priority: 'all' | Priority
  sort: 'created' | 'due' | 'priority'
}
