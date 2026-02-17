import { useState } from 'react'
import './TaskModal.css'

function TaskModal({ onClose, onAddTask, members, projects }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [projectId, setProjectId] = useState('')

  function handleCreate() {
    if (!title) return alert('Task title required')

    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
      assignedTo,
      projectId
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

        {/* Assign Member */}
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

        {/* Select Project */}
        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        >
          <option value="">Select project</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>
              {project.name}
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