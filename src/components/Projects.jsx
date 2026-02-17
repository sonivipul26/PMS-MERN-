import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import './Projects.css'

function Projects() {
  const { projects, addProject, deleteProject } = useOutletContext()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('Active')

  function handleAddProject() {
    if (!name) return alert('Project name required')

    const newProject = {
      id: Date.now(),
      name,
      description,
      status
    }

    addProject(newProject)
    setName('')
    setDescription('')
    setStatus('Active')
  }

  return (
    <div className="projects">
      <h2>Projects</h2>

      <div className="add-project">
        <input
          type="text"
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Active</option>
          <option>Completed</option>
          <option>On Hold</option>
        </select>

        <button onClick={handleAddProject}>Add</button>
      </div>

      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <ul>
          {projects.map(project => (
            <li key={project.id}>
              <div>
                <strong>{project.name}</strong>
                <p>{project.description}</p>
                <span className={`status ${project.status}`}>
                  {project.status}
                </span>
              </div>

              <button onClick={() => deleteProject(project.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Projects