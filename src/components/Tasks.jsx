import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import './Tasks.css'

function Tasks() {
  const { tasks, toggleTask, deleteTask } = useOutletContext()
  const [filter, setFilter] = useState('all')

  function getFilteredTasks() {
    if (filter === 'completed') {
      return tasks.filter(task => task.completed)
    }
    if (filter === 'pending') {
      return tasks.filter(task => !task.completed)
    }
    return tasks
  }

  const filteredTasks = getFilteredTasks()

  return (
    <div className="tasks">
      <h2>Tasks</h2>

      
      <div className="task-filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>

        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>

        <button
          className={filter === 'pending' ? 'active' : ''}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="empty">No tasks found.</p>
      ) : (
        <ul>
          {filteredTasks.map(task => (
            <li key={task.id} className={task.completed ? 'done' : ''}>
              <span onClick={() => toggleTask(task.id)}>
                {task.completed ? '✅' : '⬜'} {task.title}
              </span>

              <button onClick={() => deleteTask(task.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Tasks
