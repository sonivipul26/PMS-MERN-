import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import './Tasks.css'

function Tasks() {
  const { tasks, toggleTask, deleteTask, projects } = useOutletContext()

  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  function getProjectName(projectId) {
    const project = projects.find(p => p.id == projectId)
    return project ? project.name : 'No Project'
  }

  function getFilteredTasks() {
    let filtered = tasks

    if (filter === 'completed') {
      filtered = filtered.filter(task => task.completed)
    }

    if (filter === 'pending') {
      filtered = filtered.filter(task => !task.completed)
    }

    if (search.trim() !== '') {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    return filtered
  }

  const filteredTasks = getFilteredTasks()

  return (
    <div className="tasks">
      <h2>Tasks</h2>

      <input
        type="text"
        placeholder="Search tasks..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="task-filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>

      {filteredTasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {filteredTasks.map(task => (
            <li key={task.id} className={task.completed ? 'done' : ''}>
              <div>
                <span onClick={() => toggleTask(task.id)}>
                  {task.completed ? '✅' : '⬜'} {task.title}
                </span>

                {task.assignedTo && (
                  <p className="assigned">
                    Assigned to: {task.assignedTo}
                  </p>
                )}

                <p className="project">
                  Project: {getProjectName(task.projectId)}
                </p>
              </div>

              <button onClick={() => deleteTask(task.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Tasks