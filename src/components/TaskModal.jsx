import { useState } from 'react'
import './TaskModal.css'

function TaskModal({ onClose, onAddTask, members, projects }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [projectId, setProjectId] = useState('')
  const [priority, setPriority] = useState('Medium')

  // ✅ Subtask state
  const [subtasks, setSubtasks] = useState([])
  const [subtaskInput, setSubtaskInput] = useState('')

  function addSubtask() {
    if (!subtaskInput.trim()) return

    setSubtasks([
      ...subtasks,
      { title: subtaskInput, completed: false }
    ])

    setSubtaskInput('')
  }

  function removeSubtask(index) {
    setSubtasks(subtasks.filter((_, i) => i !== index))
  }

  function handleCreate() {
    if (!title.trim()) return alert('Task title required')
    if (!projectId) return alert('Please select a project')

    const newTask = {
      title,
      description,
      assignedTo,
      projectId,
      priority,
      completed: false,
      subtasks // ✅ send subtasks to backend
    }

    onAddTask(newTask)
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Create New Task</h3>

        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <select
          value={assignedTo}
          onChange={e => setAssignedTo(e.target.value)}
        >
          <option value="">Assign Member</option>
          {members.map(member => (
            <option key={member._id} value={member.name}>
              {member.name}
            </option>
          ))}
        </select>

        <select
          value={projectId}
          onChange={e => setProjectId(e.target.value)}
        >
          <option value="">Select Project</option>
          {projects.map(project => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>

        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        {/* ✅ Subtask Section */}
        <div style={{ marginTop: '10px' }}>
          <input
            type="text"
            placeholder="Add subtask"
            value={subtaskInput}
            onChange={e => setSubtaskInput(e.target.value)}
          />
          <button type="button" onClick={addSubtask}>
            Add Subtask
          </button>

          {subtasks.length > 0 && (
            <ul style={{ marginTop: '10px' }}>
              {subtasks.map((sub, index) => (
                <li key={index}>
                  {sub.title}
                  <button
                    type="button"
                    onClick={() => removeSubtask(index)}
                    style={{ marginLeft: '10px' }}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleCreate}>Create</button>
        </div>
      </div>
    </div>
  )
}

export default TaskModal