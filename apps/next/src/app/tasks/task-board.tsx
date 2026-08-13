'use client'

import { useEffect, useMemo, useState } from 'react'
import EditDialog from '@/components/edit-dialog'
import Summary from '@/components/summary'
import TaskFilters from '@/components/task-filters'
import TaskForm from '@/components/task-form'
import TaskList from '@/components/task-list'
import {
  createDemoTasks,
  createId,
  loadTasks,
  priorityWeights,
  saveTasks,
} from '@/lib/tasks'
import type { Task, TaskFilters as Filters, TaskInput } from '@/types/task'

const initialFilters: Filters = {
  search: '',
  status: 'all',
  priority: 'all',
  sort: 'created',
}

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filters, setFilters] = useState<Filters>(initialFilters)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setTasks(loadTasks())
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated) saveTasks(tasks)
  }, [isHydrated, tasks])

  const visibleTasks = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLocaleLowerCase('ja')

    return tasks
      .filter((task) => {
        const matchesSearch = task.title.toLocaleLowerCase('ja').includes(normalizedSearch)
        const matchesStatus =
          filters.status === 'all' ||
          (filters.status === 'active' && !task.completed) ||
          (filters.status === 'completed' && task.completed)
        const matchesPriority =
          filters.priority === 'all' || task.priority === filters.priority

        return matchesSearch && matchesStatus && matchesPriority
      })
      .sort((firstTask, secondTask) => {
        if (filters.sort === 'due') {
          if (!firstTask.dueDate) return 1
          if (!secondTask.dueDate) return -1
          return firstTask.dueDate.localeCompare(secondTask.dueDate)
        }

        if (filters.sort === 'priority') {
          return priorityWeights[firstTask.priority] - priorityWeights[secondTask.priority]
        }

        return secondTask.createdAt - firstTask.createdAt
      })
  }, [filters, tasks])

  function addTask(taskInput: TaskInput): void {
    setTasks((currentTasks) => [
      {
        id: createId(),
        ...taskInput,
        completed: false,
        createdAt: Date.now(),
      },
      ...currentTasks,
    ])
  }

  function toggleTask(taskId: string): void {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function deleteTask(taskId: string): void {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  function saveEditedTask(updatedTask: Task): void {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    )
    setEditingTask(null)
  }

  function updateFilter<Name extends keyof Filters>(name: Name, value: Filters[Name]): void {
    setFilters((currentFilters) => ({ ...currentFilters, [name]: value }))
  }

  function resetDemo(): void {
    setTasks(createDemoTasks())
    setFilters(initialFilters)
    setEditingTask(null)
  }

  const completedCount = tasks.filter((task) => task.completed).length

  if (!isHydrated) {
    return <div className="loading-panel">ブラウザに保存したタスクを読み込んでいます…</div>
  }

  return (
    <>
      <div className="board-toolbar">
        <span>型: Task[]</span>
        <button className="button button-ghost" type="button" onClick={resetDemo}>
          デモを初期状態に戻す
        </button>
      </div>

      <Summary tasks={tasks} />

      <section className="workspace">
        <TaskForm onAdd={addTask} />

        <section className="task-panel" aria-labelledby="task-list-title">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">TASKS</p>
              <h2 id="task-list-title">タスク一覧</h2>
            </div>
            <button
              className="text-button"
              type="button"
              disabled={completedCount === 0}
              onClick={() =>
                setTasks((currentTasks) =>
                  currentTasks.filter((task) => !task.completed),
                )
              }
            >
              完了済みを削除
            </button>
          </div>

          <TaskFilters filters={filters} onChange={updateFilter} />
          <TaskList
            tasks={visibleTasks}
            totalCount={tasks.length}
            onToggle={toggleTask}
            onEdit={setEditingTask}
            onDelete={deleteTask}
          />
        </section>
      </section>

      {editingTask && (
        <EditDialog
          task={editingTask}
          onSave={saveEditedTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </>
  )
}
