import { useState, useEffect } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom'
import './Tasks.css'

function Tasks() {
  const { tasks, projects, toggleTask, deleteTask, updateTask } = useOutletContext()
  const [searchParams] = useSearchParams()

  const statusQuery = searchParams.get('status')

  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [search, setSearch] = useState('')

  const [activeSubtaskTaskId, setActiveSubtaskTaskId] = useState(null)
  const [subtaskInput, setSubtaskInput] = useState('')
  const [expandedTasks, setExpandedTasks] = useState({})

  useEffect(() => {
    if (statusQuery) setStatusFilter(statusQuery)
  }, [statusQuery])

  function getProjectName(projectId) {
    const project = projects.find(
      p => p._id?.toString() === projectId?.toString()
    )
    return project ? project.name : 'No Project'
  }

  function toggleSubtask(task, index) {
    const updatedSubtasks = task.subtasks.map((sub, i) =>
      i === index ? { ...sub, completed: !sub.completed } : sub
    )
    updateTask(task._id, { subtasks: updatedSubtasks })
  }

  function handleAddSubtask(task) {
    if (!subtaskInput.trim()) return

    const updatedSubtasks = [
      ...(task.subtasks || []),
      { title: subtaskInput, completed: false }
    ]

    updateTask(task._id, { subtasks: updatedSubtasks })

    setSubtaskInput('')
    setActiveSubtaskTaskId(null)
  }

  function toggleExpand(taskId) {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }))
  }

  function getFilteredTasks() {
    let filtered = tasks

    if (statusFilter === 'completed')
      filtered = filtered.filter(t => t.completed)

    if (statusFilter === 'pending')
      filtered = filtered.filter(t => !t.completed)

    if (priorityFilter !== 'all')
      filtered = filtered.filter(t => t.priority === priorityFilter)

    if (search.trim() !== '')
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase())
      )

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
        onChange={e => setSearch(e.target.value)}
      />

      <div className="task-filters">
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
          <option value="all">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {filteredTasks.map(task => (
            <li key={task._id} className="task-card">
              <div className="task-header">
                <div>
                  <h4>{task.title}</h4>
                  <span className={`priority ${task.priority}`}>
                    {task.priority}
                  </span>
                  <p>Project: {getProjectName(task.projectId)}</p>
                </div>

                <div>
                  <button onClick={() => toggleTask(task._id)}>
                    {task.completed ? 'Undo' : 'Done'}
                  </button>
                  <button onClick={() => deleteTask(task._id)}>
                    Delete
                  </button>
                </div>
              </div>

              {/* ===== Subtask Toggle Button ===== */}
              <div className="subtask-section">
                <button
                  className="subtask-toggle"
                  onClick={() => toggleExpand(task._id)}
                >
                  {expandedTasks[task._id] ? 'Hide Subtasks' : 'View Subtasks'}
                </button>

                {expandedTasks[task._id] && (
                  <div className="subtask-content">

                    {/* Subtask List */}
                    {task.subtasks?.length > 0 && (
                      <ul>
                        {task.subtasks.map((sub, index) => (
                          <li key={index}>
                            <input
                              type="checkbox"
                              checked={sub.completed}
                              onChange={() => toggleSubtask(task, index)}
                            />
                            <span
                              style={{
                                textDecoration: sub.completed
                                  ? 'line-through'
                                  : 'none',
                                marginLeft: '6px'
                              }}
                            >
                              {sub.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Add Subtask Button */}
                    {activeSubtaskTaskId !== task._id ? (
                      <button
                        className="add-subtask-btn"
                        onClick={() => setActiveSubtaskTaskId(task._id)}
                      >
                        + Add Subtask
                      </button>
                    ) : (
                      <div className="subtask-input-box">
                        <input
                          type="text"
                          placeholder="Enter subtask..."
                          value={subtaskInput}
                          onChange={e => setSubtaskInput(e.target.value)}
                        />
                        <button onClick={() => handleAddSubtask(task)}>
                          Save
                        </button>
                        <button onClick={() => setActiveSubtaskTaskId(null)}>
                          Cancel
                        </button>
                      </div>
                    )}

                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Tasks