import './Projects.css'

function Projects() {
  const projects = [
    { id: 1, name: 'TaskFlow App', status: 'In Progress' },
    { id: 2, name: 'Portfolio Website', status: 'Completed' },
    { id: 3, name: 'E-commerce UI', status: 'Pending' }
  ]

  return (
    <div className="projects">
      <h2>Projects</h2>

      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Projects
