import { useEffect, useMemo, useState } from 'react'
import EditDialog from './components/EditDialog.jsx'
import Summary from './components/Summary.jsx'
import TaskFilters from './components/TaskFilters.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import {
  createDemoTasks,
  createId,
  loadTasks,
  priorityWeights,
  saveTasks,
} from './data/tasks.js'

const initialFilters = {
  search: '',
  status: 'all',
  priority: 'all',
  sort: 'created',
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [filters, setFilters] = useState(initialFilters)
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

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

  function addTask(taskInput) {
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

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  function saveEditedTask(updatedTask) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    )
    setEditingTask(null)
  }

  function updateFilter(name, value) {
    setFilters((currentFilters) => ({ ...currentFilters, [name]: value }))
  }

  function resetDemo() {
    setTasks(createDemoTasks())
    setFilters(initialFilters)
    setEditingTask(null)
  }

  const completedCount = tasks.filter((task) => task.completed).length

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">REACT DEMO</p>
          <h1>Focus Board</h1>
          <p className="hero-copy">
            同じ機能を、Stateとコンポーネントを使って宣言的に構築しています。
          </p>
        </div>
        <button className="button button-ghost" type="button" onClick={resetDemo}>
          デモを初期状態に戻す
        </button>
      </header>

      <main>
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
      </main>

      {editingTask && (
        <EditDialog
          task={editingTask}
          onSave={saveEditedTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  )
}

