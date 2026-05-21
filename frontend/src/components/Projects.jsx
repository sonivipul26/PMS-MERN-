import { useState, useEffect } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom'
import './Projects.css'

function Projects() {
  const { projects, addProject, deleteProject } = useOutletContext()
  const [searchParams] = useSearchParams()

  const statusQuery = searchParams.get('status')

  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [status, setStatus] = useState('Active')

  useEffect(() => {
    if (statusQuery) {
      setStatusFilter(statusQuery)
    }
  }, [statusQuery])

  function getFilteredProjects() {
    let filtered = projects

    if (statusFilter !== 'all')
      filtered = filtered.filter(p => p.status === statusFilter)

    if (search.trim() !== '')
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )

    return filtered
  }

  function handleCreate() {
    if (!name.trim()) return alert('Project name required')
    addProject({ name, status })
    setShowModal(false)
    setName('')
  }

  const filteredProjects = getFilteredProjects()

  return (
    <div className="projects">
      <h2>Projects</h2>

      <button onClick={() => setShowModal(true)}>
        + Add Project
      </button>

      <input
        type="text"
        placeholder="Search projects..."
        className="search-input"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="project-filters">
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
        </select>
      </div>

      {filteredProjects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul className="project-list">
          {filteredProjects.map(project => (
            <li key={project._id} className="project-card">
              <div>
                <h4>{project.name}</h4>
                <span className={`status-badge ${project.status}`}>
                  {project.status}
                </span>
              </div>
              <button
                className="delete-btn"
                onClick={() => deleteProject(project._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Create Project</h3>

            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Project Name"
            />

            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>

            <button onClick={() => setShowModal(false)}>Cancel</button>
            <button onClick={handleCreate}>Create</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects