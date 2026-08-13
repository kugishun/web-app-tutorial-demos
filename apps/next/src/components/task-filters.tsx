import type { TaskFilters as Filters } from '@/types/task'

type TaskFiltersProps = {
  filters: Filters
  onChange: <Name extends keyof Filters>(name: Name, value: Filters[Name]) => void
}

export default function TaskFilters({ filters, onChange }: TaskFiltersProps) {
  return (
    <div className="controls">
      <label className="search-field">
        <span className="sr-only">タスクを検索</span>
        <input
          type="search"
          placeholder="タスクを検索"
          value={filters.search}
          onChange={(event) => onChange('search', event.target.value)}
        />
      </label>
      <div className="filter-tabs" aria-label="状態で絞り込み">
        {([
          ['all', 'すべて'],
          ['active', '未完了'],
          ['completed', '完了'],
        ] as const).map(([value, label]) => (
          <button
            key={value}
            type="button"
            aria-pressed={filters.status === value}
            onClick={() => onChange('status', value)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="select-controls">
        <label>
          <span>優先度</span>
          <select
            value={filters.priority}
            onChange={(event) =>
              onChange('priority', event.target.value as Filters['priority'])
            }
          >
            <option value="all">すべて</option>
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </select>
        </label>
        <label>
          <span>並び順</span>
          <select
            value={filters.sort}
            onChange={(event) => onChange('sort', event.target.value as Filters['sort'])}
          >
            <option value="created">新しい順</option>
            <option value="due">期限が近い順</option>
            <option value="priority">優先度順</option>
          </select>
        </label>
      </div>
    </div>
  )
}
