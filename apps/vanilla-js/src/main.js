import './style.css'

const STORAGE_KEY = 'focus-board-tasks-v1'

const priorityLabels = {
  high: '高',
  medium: '中',
  low: '低',
}

const priorityWeights = {
  high: 0,
  medium: 1,
  low: 2,
}

const elements = {
  taskForm: document.querySelector('#task-form'),
  taskTitle: document.querySelector('#task-title'),
  taskPriority: document.querySelector('#task-priority'),
  taskDueDate: document.querySelector('#task-due-date'),
  taskList: document.querySelector('#task-list'),
  emptyState: document.querySelector('#empty-state'),
  searchInput: document.querySelector('#search-input'),
  statusFilters: document.querySelector('#status-filters'),
  priorityFilter: document.querySelector('#priority-filter'),
  sortOrder: document.querySelector('#sort-order'),
  clearCompleted: document.querySelector('#clear-completed'),
  resetDemo: document.querySelector('#reset-demo'),
  resultSummary: document.querySelector('#result-summary'),
  totalCount: document.querySelector('#total-count'),
  activeCount: document.querySelector('#active-count'),
  completedCount: document.querySelector('#completed-count'),
  progressValue: document.querySelector('#progress-value'),
  progressBar: document.querySelector('#progress-bar'),
  editDialog: document.querySelector('#edit-dialog'),
  editForm: document.querySelector('#edit-form'),
  editTaskId: document.querySelector('#edit-task-id'),
  editTitle: document.querySelector('#edit-title'),
  editPriority: document.querySelector('#edit-priority'),
  editDueDate: document.querySelector('#edit-due-date'),
  closeDialog: document.querySelector('#close-dialog'),
  cancelEdit: document.querySelector('#cancel-edit'),
}

const state = {
  tasks: loadTasks(),
  search: '',
  status: 'all',
  priority: 'all',
  sort: 'created',
}

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`
}

function getRelativeDate(daysFromToday) {
  const date = new Date()
  date.setDate(date.getDate() + daysFromToday)
  return date.toISOString().slice(0, 10)
}

function createDemoTasks() {
  const now = Date.now()

  return [
    {
      id: createId(),
      title: 'React移行前の構成を確認する',
      priority: 'high',
      dueDate: getRelativeDate(1),
      completed: false,
      createdAt: now,
    },
    {
      id: createId(),
      title: 'DOM更新箇所を洗い出す',
      priority: 'medium',
      dueDate: getRelativeDate(3),
      completed: false,
      createdAt: now - 1000,
    },
    {
      id: createId(),
      title: 'Viteで開発サーバーを起動する',
      priority: 'low',
      dueDate: getRelativeDate(-1),
      completed: true,
      createdAt: now - 2000,
    },
  ]
}

function loadTasks() {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY)
    return storedTasks ? JSON.parse(storedTasks) : createDemoTasks()
  } catch {
    return createDemoTasks()
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks))
}

function getVisibleTasks() {
  const normalizedSearch = state.search.trim().toLocaleLowerCase('ja')

  return state.tasks
    .filter((task) => {
      const matchesSearch = task.title.toLocaleLowerCase('ja').includes(normalizedSearch)
      const matchesStatus =
        state.status === 'all' ||
        (state.status === 'active' && !task.completed) ||
        (state.status === 'completed' && task.completed)
      const matchesPriority = state.priority === 'all' || task.priority === state.priority

      return matchesSearch && matchesStatus && matchesPriority
    })
    .sort((firstTask, secondTask) => {
      if (state.sort === 'due') {
        if (!firstTask.dueDate) return 1
        if (!secondTask.dueDate) return -1
        return firstTask.dueDate.localeCompare(secondTask.dueDate)
      }

      if (state.sort === 'priority') {
        return priorityWeights[firstTask.priority] - priorityWeights[secondTask.priority]
      }

      return secondTask.createdAt - firstTask.createdAt
    })
}

function formatDueDate(dueDate) {
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

function createTaskElement(task) {
  const item = document.createElement('li')
  item.className = `task-item${task.completed ? ' is-completed' : ''}`
  item.dataset.taskId = task.id

  const checkbox = document.createElement('input')
  checkbox.className = 'task-checkbox'
  checkbox.type = 'checkbox'
  checkbox.checked = task.completed
  checkbox.dataset.action = 'toggle'
  checkbox.setAttribute('aria-label', `${task.title}を${task.completed ? '未完了' : '完了'}にする`)

  const content = document.createElement('div')
  content.className = 'task-content'

  const title = document.createElement('h3')
  title.textContent = task.title

  const meta = document.createElement('div')
  meta.className = 'task-meta'

  const priority = document.createElement('span')
  priority.className = `priority-badge priority-${task.priority}`
  priority.textContent = `優先度 ${priorityLabels[task.priority]}`
  meta.append(priority)

  const dueDate = formatDueDate(task.dueDate)
  if (dueDate) {
    const due = document.createElement('span')
    due.className = `due-date${dueDate.overdue && !task.completed ? ' is-overdue' : ''}`
    due.textContent = dueDate.label
    meta.append(due)
  }

  content.append(title, meta)

  const actions = document.createElement('div')
  actions.className = 'task-actions'

  const editButton = document.createElement('button')
  editButton.className = 'icon-button'
  editButton.type = 'button'
  editButton.dataset.action = 'edit'
  editButton.textContent = '編集'
  editButton.setAttribute('aria-label', `${task.title}を編集`)

  const deleteButton = document.createElement('button')
  deleteButton.className = 'icon-button icon-button-danger'
  deleteButton.type = 'button'
  deleteButton.dataset.action = 'delete'
  deleteButton.textContent = '削除'
  deleteButton.setAttribute('aria-label', `${task.title}を削除`)

  actions.append(editButton, deleteButton)
  item.append(checkbox, content, actions)

  return item
}

function renderSummary() {
  const total = state.tasks.length
  const completed = state.tasks.filter((task) => task.completed).length
  const active = total - completed
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100)

  elements.totalCount.textContent = total
  elements.activeCount.textContent = active
  elements.completedCount.textContent = completed
  elements.progressValue.textContent = `${progress}%`
  elements.progressBar.style.width = `${progress}%`
  elements.clearCompleted.disabled = completed === 0
}

function renderTasks() {
  const visibleTasks = getVisibleTasks()
  const fragment = document.createDocumentFragment()

  visibleTasks.forEach((task) => {
    fragment.append(createTaskElement(task))
  })

  elements.taskList.replaceChildren(fragment)
  elements.emptyState.hidden = visibleTasks.length > 0
  elements.resultSummary.textContent = `${state.tasks.length}件中 ${visibleTasks.length}件を表示`
  renderSummary()
}

function addTask({ title, priority, dueDate }) {
  state.tasks.unshift({
    id: createId(),
    title: title.trim(),
    priority,
    dueDate,
    completed: false,
    createdAt: Date.now(),
  })
  saveTasks()
  renderTasks()
}

function updateTask(taskId, updates) {
  state.tasks = state.tasks.map((task) =>
    task.id === taskId ? { ...task, ...updates } : task,
  )
  saveTasks()
  renderTasks()
}

function deleteTask(taskId) {
  state.tasks = state.tasks.filter((task) => task.id !== taskId)
  saveTasks()
  renderTasks()
}

function openEditDialog(taskId) {
  const task = state.tasks.find((candidate) => candidate.id === taskId)
  if (!task) return

  elements.editTaskId.value = task.id
  elements.editTitle.value = task.title
  elements.editPriority.value = task.priority
  elements.editDueDate.value = task.dueDate
  elements.editDialog.showModal()
  elements.editTitle.focus()
}

elements.taskForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const formData = new FormData(elements.taskForm)
  const title = formData.get('title')
  if (typeof title !== 'string' || !title.trim()) return

  addTask({
    title,
    priority: formData.get('priority'),
    dueDate: formData.get('dueDate'),
  })

  elements.taskForm.reset()
  elements.taskPriority.value = 'medium'
  elements.taskTitle.focus()
})

elements.taskList.addEventListener('click', (event) => {
  const actionElement = event.target.closest('[data-action]')
  const taskItem = event.target.closest('[data-task-id]')
  if (!actionElement || !taskItem) return

  const taskId = taskItem.dataset.taskId
  const action = actionElement.dataset.action

  if (action === 'toggle') {
    const task = state.tasks.find((candidate) => candidate.id === taskId)
    if (task) updateTask(taskId, { completed: !task.completed })
  }

  if (action === 'edit') openEditDialog(taskId)
  if (action === 'delete') deleteTask(taskId)
})

elements.searchInput.addEventListener('input', (event) => {
  state.search = event.target.value
  renderTasks()
})

elements.statusFilters.addEventListener('click', (event) => {
  const button = event.target.closest('[data-status]')
  if (!button) return

  state.status = button.dataset.status
  elements.statusFilters.querySelectorAll('[data-status]').forEach((filterButton) => {
    filterButton.setAttribute('aria-pressed', String(filterButton === button))
  })
  renderTasks()
})

elements.priorityFilter.addEventListener('change', (event) => {
  state.priority = event.target.value
  renderTasks()
})

elements.sortOrder.addEventListener('change', (event) => {
  state.sort = event.target.value
  renderTasks()
})

elements.clearCompleted.addEventListener('click', () => {
  state.tasks = state.tasks.filter((task) => !task.completed)
  saveTasks()
  renderTasks()
})

elements.resetDemo.addEventListener('click', () => {
  state.tasks = createDemoTasks()
  state.search = ''
  state.status = 'all'
  state.priority = 'all'
  state.sort = 'created'

  elements.searchInput.value = ''
  elements.priorityFilter.value = 'all'
  elements.sortOrder.value = 'created'
  elements.statusFilters.querySelectorAll('[data-status]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.status === 'all'))
  })

  saveTasks()
  renderTasks()
})

elements.editForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const formData = new FormData(elements.editForm)
  const title = formData.get('title')
  if (typeof title !== 'string' || !title.trim()) return

  updateTask(formData.get('id'), {
    title: title.trim(),
    priority: formData.get('priority'),
    dueDate: formData.get('dueDate'),
  })
  elements.editDialog.close()
})

elements.closeDialog.addEventListener('click', () => elements.editDialog.close())
elements.cancelEdit.addEventListener('click', () => elements.editDialog.close())

elements.editDialog.addEventListener('click', (event) => {
  if (event.target === elements.editDialog) elements.editDialog.close()
})

renderTasks()

