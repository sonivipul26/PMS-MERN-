import { useState } from 'react'
import './TaskModal.css'

function TaskModal({ onClose, onAddTask, members }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assignedTo, setAssignedTo] = useState('')

  function handleCreate() {
    if (!title) return alert('Task title required')

    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
      assignedTo
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
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Assign member dropdown */}
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="">Assign to member</option>
          {members.map(member => (
            <option key={member.id} value={member.name}>
              {member.name}
            </option>
          ))}
        </select>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="create-btn" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskModal